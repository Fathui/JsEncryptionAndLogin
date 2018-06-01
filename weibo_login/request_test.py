#!/usr/bin/env python
# -*- coding:utf-8 -*-

import requests
from weibo_login import load_cookies

session = requests.session()
session.cookies = load_cookies()

url = '微博首页'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) '
                         'Chrome/30.0.1599.17 Safari/537.36'}
res = session.get(url, headers=headers)
print(res.text)


