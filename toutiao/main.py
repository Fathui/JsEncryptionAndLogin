#!/usr/bin/env python
# -*- coding:utf-8 -*-
import execjs
import requests
import time

sess = requests.session()
with open(r'get_as_cp.js') as f:
    ctx = execjs.compile(f.read())

url = 'https://www.toutiao.com/api/pc/feed/'

ua = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 ' \
     '(KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
headers = {
    'accept': 'text/javascript, text/html, application/xml, text/xml, */*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    'pragma': 'no-cache',
    'referer': 'https://www.toutiao.com/',
    'user-agent': ua,
    'x-requested-with': 'XMLHttpRequest'
}
sess.headers.update(headers)


def make_params(be_hot_time):
    params = {
        'category': '__all__',
        'tadrequire': 'true',
        'utm_source': 'toutiao',
        'widen': '1',
        '_signature': '',
        'as': '',
        'cp': '',
    }
    if int(be_hot_time) == 0:
        params['min_behot_time'] = '0'
    else:
        params['max_behot_time'] = str(be_hot_time)
    
    t = ctx.call('get_as_cp')
    params.update(t)
    _signature = ctx.call('get_signature', be_hot_time, ua)
    params['_signature'] = _signature
    return params


def main():
    first_params = make_params('0')
    res = sess.get(url, params=first_params)
    first_page_data = res.json()
    for data in first_page_data['data']:
        title = data['title']
        dt = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(data['behot_time'])))
        print('{}: {}'.format(title, dt))
    print('-' * 80)

    time.sleep(3)
    
    next_hot_time = first_page_data['next']['max_behot_time']
    next_params = make_params(next_hot_time)
    res2 = sess.get(url, params=next_params)
    next_page_data = res2.json()

    for data in next_page_data['data']:
        title = data['title']
        dt = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(int(data['behot_time'])))
        print('{}: {}'.format(title, dt))
    print('-' * 80)


if __name__ == '__main__':
    main()
