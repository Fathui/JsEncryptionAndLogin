import json
import random
import requests
import time
import execjs
from lxml import html

f_text = """
function e(e) {
        for (var t = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], a = "CAS", o = 0; o < e; o++) {
            var i = Math.ceil(51 * Math.random());
            a += t[i]
        }
        return a
    }
"""
ctx = execjs.compile(f_text)

_token = ctx.call("e", 15)

url = "https://hotels.ctrip.com/domestic/cas/oceanball" + "?callback=" + _token + "&_=" + str(int(time.time() * 1000))

res = requests.get(url)

t1 = """var Image = function(){};
var window = {};
window.Image = function () {};
window.navigator = {
    "appCodeName":"Mozilla",
    "appName":"Netscape",
    "language":"zh-CN",
    "platform":"Win32",
};
window.navigator.userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36";
var navigator = window.navigator;
window.location = {};
// window.location.href = "";
var location = window.location;
window.window = window;
window.window.Math = Math;
window.window.toString = toString;
window.RegExp = RegExp;
window.window.encodeURIComponent = encodeURIComponent;
window.window.JSON = JSON;
window.window.Function = Function;
window.window.Date = Date;
window.screen = {'colorDepth': 24};
window.window.String = String;
window.window.Object = Object;
window.window.escape = escape;

window.openDatabase = Function;
window.navigator.plugins = {};

window.document = {
    body:{innerHTML:"0", div: "", span: ""},
    documentElement:{
        attributes:{webdriver: false, selenium: false, driver:false},
        getAttribute: function (x) {return document.documentElement["attributes"][x]},
    },
    createElement:function(x){return {innerHTML:"0"}},
};
var document = window.document;

var plugins = {};

""" + 'var o = "{_token}";'.format(_token=_token) + """
var _res;
window[o] = function(e) {
        var res_ = e();
        _res = res_;
        return;
};

"""

t2 = res.text.replace("(function()", 'var get_token = function()', 1).replace(')();', '')

tt = t1 + t2 + """
\nvar get_result = function(){get_token(); return _res};
"""

# print(tt)

ctx2 = execjs.compile(tt)
eleven = ctx2.call("get_result")

url = 'https://hotels.ctrip.com/Domestic/Tool/AjaxHotelList.aspx'
headers = {...}

data = {...}
res2 = requests.post(url, headers=headers, data=data)
data = res2.json()['hotelList']

tree = html.fromstring(data)
price_xpath = '//div[@class="hotel_price "]/a/span/text()'
name_xpath = '//h2[@class="hotel_name"]/a/@title'
for name, price in zip(tree.xpath(name_xpath), tree.xpath(price_xpath)):
    print('{}> {}'.format(name, price))
