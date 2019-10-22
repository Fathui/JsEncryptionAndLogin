#!/usr/bin/env python
# -*- coding:utf-8 -*-
import execjs
import requests
import time

sess = requests.session()
with open(r'get_as_cp.js') as f:
    ctx = execjs.compile(f.read())

ua = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 ' \
     '(KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
headers = {
    'accept': 'text/javascript, text/html, application/xml, text/xml, */*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'content-type': 'application/x-www-form-urlencoded',
    'pragma': 'no-cache',
    # 'referer': 'https://www.toutiao.com/ch/news_game/',
    'user-agent': ua,
    'x-requested-with': 'XMLHttpRequest'
}
sess.headers.update(headers)
url = 'https://www.toutiao.com/api/pc/feed/'


def _get_data_from_page(_req_type, _ua, _hot_time):
    params = ctx.call('get_values', _req_type, _ua, _hot_time)
    res = sess.get(url, params=params)
    return res.json()
    
    
def main():
    first_req_type = 'refresh'
    first_hot_time = '0'

    first_page_data = _get_data_from_page(first_req_type, ua, first_hot_time)

    for data in first_page_data['data']:
        print(data['title'])
    print('-' * 80)

    time.sleep(3)
    next_req_type = 'loadmore'
    next_hot_time = first_page_data['next']['max_behot_time']

    next_page_data = _get_data_from_page(next_req_type, ua, next_hot_time)
    for data in next_page_data['data']:
        print(data['title'])
    print('-' * 80)


if __name__ == '__main__':
    main()
