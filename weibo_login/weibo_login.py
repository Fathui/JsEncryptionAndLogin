#!/usr/bin/env python
# -*- coding:utf-8 -*-


import requests
import time
import json
import base64
import rsa
import binascii

# cookie保存地址
cookies_file = 'weibo_cookie.json'


def get_user_name(name):
    """Base64编码用户名"""

    return base64.b64encode(name.encode('utf-8'))


def get_password(password, n, e='10001'):
    """RSA加密用户密码"""

    pub_key = rsa.PublicKey(int(n, 16), int(e, 16))
    crypto = rsa.encrypt(password.encode('utf8'), pub_key)
    return binascii.b2a_hex(crypto)


def load_cookies():
    """从文件中导入cookie"""

    with open(cookies_file) as f:
        cookies = requests.utils.cookiejar_from_dict(json.load(f))
        return cookies


def save_cookies(cookies):
    """保存cookie到本地"""

    with open(cookies_file, 'w') as f:
        json.dump(requests.utils.dict_from_cookiejar(cookies), f)


class WeiboLogin:

    def __init__(self, user, password):
        self.headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) '
                                      'Chrome/41.0.2228.0 Safari/537.36'}
        self.session = requests.session()
        self.user = user
        self.password = password

    def get_request(self, url):
        """处理重复的get请求"""

        res = self.session.get(url, headers=self.headers)
        assert res.status_code == 200, "failed to request {}, status_code is {}".format(url, res.status_code)
        return res

    def pre_login(self):
        """预登陆，获取nonce, pubkey, rsakv等加密密码所需参数"""

        pre_url = 'https://login.sina.com.cn/sso/prelogin.php?entry=weibo&' \
                  'su=&rsakt=mod&client=ssologin.js(v1.4.19)&_={}'.format(int(time.time() * 1000))
        res = self.get_request(pre_url)
        pre_data_dict = res.json()
        nonce = pre_data_dict['nonce']
        pubkey = pre_data_dict['pubkey']
        rsakv = pre_data_dict['rsakv']
        return nonce, pubkey, rsakv

    def sso_login(self, nonce, rsakv, sp, su):
        """第二步，post加密后的账号密码"""

        form_data = {'encoding': 'UTF-8',
                     'entry': 'weibo',
                     'from': '',
                     'gateway': '1',
                     'nonce': nonce,
                     'pagerefer': 'https://login.sina.com.cn/crossdomain2.php?action=logout&'
                                  'r=https%3A%2F%2Fweibo.com%2Flogout.php%3Fbackurl%3D%252F',
                     'prelt': '22',
                     'pwencode': 'rsa2',
                     'qrcode_flag': 'false',
                     'returntype': 'META',
                     'rsakv': rsakv,
                     'savestate': '7',
                     'servertime': int(time.time()),
                     'service': 'miniblog',
                     'sp': sp,
                     'sr': '1920*1080',
                     'su': su,
                     'url': 'https://weibo.com/ajaxlogin.php?framelogin=1&'
                            'callback=parent.sinaSSOController.feedBackUrlCallBack',
                     'useticket': '1',
                     'vsnf': '1'}
        login_url = 'https://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.19)&_={}'.format(
            int(time.time() * 1000))
        res = self.session.post(login_url, headers=self.headers, data=form_data)
        return res.text

    def close(self):
        self.session.close()

    def login(self):
        """模拟登陆主函数"""

        # 第一步，获取nonce, pubkey, rsakv等加密密码所需参数
        nonce, pubkey, rsakv = self.pre_login()

        # base64编码账号名
        name = get_user_name(self.user)
        # 加密密码所需文本格式
        password = str(int(time.time())) + '\t' + str(nonce) + '\n' + str(self.password)
        # rsa加密密码
        password = get_password(password, pubkey)

        # 第二步，post参数，保存cookie
        self.sso_login(nonce, rsakv, password, name)
        save_cookies(self.session.cookies)

        # # 第二步，post加密后的账号密码，获取第三步所需链接
        # sso_login_data = self.sso_login(nonce, rsakv, password, name)
        # cross_url = sso_login_data.split('location.replace("')[1].split('");', maxsplit=1)[0]
        #
        # # 第三步，获取第四步所需链接
        # cross_data_res = self.get_request(cross_url)
        # ajax_login_url = cross_data_res.text.split("location.replace('")[1].split("');", maxsplit=1)[0]
        #
        # # 第四步，请求链接并保存cookie
        # res = self.get_request(ajax_login_url)
        # if res.status_code == 200:
        #     save_cookies(self.session.cookies)


if __name__ == '__main__':
    user_name = ''
    pass_word = ''
    weibo_login = WeiboLogin(user_name, pass_word)
    weibo_login.login()
    weibo_login.close()
