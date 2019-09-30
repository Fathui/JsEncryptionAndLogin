#!/usr/bin/env python
# -*- coding:utf-8 -*-


import requests
import re
import execjs

url = 'https://gz.meituan.com/meishi/api/poi/getPoiList'

city_name = "广州"

params = {
    '_token': '',
    'areaId': '0',
    'cateId': '0',
    'cityName': city_name,
    'dinnerCountAttrId': '',
    'optimusCode': '10',
    'originUrl': '',
    'page': '1',
    'partner': '126',
    'platform': '1',
    'riskLevel': '1',
    'sort': '',
    'userId': '',
    'uuid': ''
}


f_url = 'https://gz.meituan.com/meishi/'

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,'
              'image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'gz.meituan.com',
    'Pragma': 'no-cache',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 '
                  '(KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
}
res = requests.get(f_url, headers=headers)

uuid_list = re.findall(r'\"uuid\":\"([a-zA-Z0-9-]*)\",', res.text)
uuid = uuid_list[0]
params['uuid'] = uuid

with open(r'Reload.js') as f:
    ctx = execjs.compile(f.read())
    
p_url = "https://gz.meituan.com/meishi/api/poi/getPoiList?" \
        "cityName=广州&cateId=0&areaId=0&sort=&dinnerCountAttrId=&" \
        "page=9" \
        "&userId=&uuid=3bbbee35f2a14ea5b77f.1569404999.1.0.0&platform=1&partner=126" \
        "&originUrl=https://gz.meituan.com/meishi/pn9/&riskLevel=1&optimusCode=10"
_token = ctx.call("reload", p_url)
params['_token'] = _token

res2 = requests.get(url, params=params, headers=headers)

for data in res2.json()['data']['poiInfos']:
    print(data['title'])


