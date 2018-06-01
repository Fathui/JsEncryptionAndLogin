**博客链接：https://www.jianshu.com/p/b312a9afc12b**

**使用方法：更改weibo_login.py中的user_name，pass_word为自己的账号密码，直接运行，cookie将保存至当前文件夹**

**测试方法：更改request_test.py中的url为你的微博首页（其他需要登录才能看到的网页也可以），运行，如果输出你的微博名，表示登录成功**


**首先了解一下微博登录流程（fiddler或chrome）**
*ps1: 如果你使用fiddler，那么正常完成网页端登录即可，如果使用chrome，可输入错误密码，因为正确登录的话chrome不显示返回参数，原因未知，这里以chrome为例*  

打开chrome的元素审查，点击右上角的登录按钮，弹出登录框，随便输入一个错误的账号密码（记得勾上Preserve log）

![登录入口.png](https://upload-images.jianshu.io/upload_images/11202986-9c76c9862ccc2faa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

找到post链接

![post.png](https://upload-images.jianshu.io/upload_images/11202986-e65e148d49297b64.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

退出并重复，对比两次post参数的不同，可基本确认重点参数为nonce（变化）与rsakv（不变），另外根据参数名字猜测su为用户名，sp为密码（加密后的）。继续抓包，发现在每次登录之前，也就是点击右上角的登录的时候，网页会返回nonce、rsakv与一个pubkey， 那么接下来就只需要找到用户名与密码的加密方式了

点击进入post链接对应的js源码（Initiator栏），格式化代码，打上断点并点击登录

![打上断点后点击登录.png](https://upload-images.jianshu.io/upload_images/11202986-b0bc716fc1f4da5e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在右边的参数栏（Local栏）查看f参数，发现这时候账号密码已经是加密过的了，那么我们要进一步找到f参数是怎么来的

![参数栏.png](https://upload-images.jianshu.io/upload_images/11202986-3aadfca687785545.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在当前函数中，可以找到一行代码为var f = makeXMLRequestQuery(a, b, c, d)，那么这里就是f的出处了，点击进入makeXMLRequestQuery函数

![点击进入函数.png](https://upload-images.jianshu.io/upload_images/11202986-52b27faaaa4b75ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


*ps2: 点击进入函数的方法，需要debugger刚好运行到或者已经运行过这一行（当前函数），善用F8，将鼠标放在函数名上，或者选中函数名，会出现函数的链接，点击即可，如上图*

![makeXMLRequestQuery函数.png](https://upload-images.jianshu.io/upload_images/11202986-1d4484c8f1ba946e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

发现makeXMLRequestQuery中又有一个var f = makeRequest(a, b, c, d)，且这个f正好是makeXMLRequestQuery的输出，在var f = makeRequest(a, b, c, d)这行打上断点并重新进入debugger模式，点击进入makeRequest函数（直接搜索也可以）

![makeRequest函数.png](https://upload-images.jianshu.io/upload_images/11202986-06e62494a3ea9166.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到su，sp均在这个函数内生成，将e.su = sinaSSOEncoder.base64.encode(urlencode(a))这行打上断点，点击进入sinaSSOEncoder.base64.encode函数，发现是一系列的转换与计算，但名字是base64，那么顺其自然就想到python库代替了

![sinaSSOEncoder.base64.encode函数.png](https://upload-images.jianshu.io/upload_images/11202986-5b20d322bcc7458a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

python中base64
```
import base64

def get_user_name(name):
    """Base64编码用户名"""

    return base64.b64encode(name.encode('utf-8'))
```
对比后发现与js加密结果一致，那么用户名的处理到此结束，接下来处理密码

![encrypt函数.png](https://upload-images.jianshu.io/upload_images/11202986-43c78322ff04a439.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

从js代码中可以看到sp的加密有两种可能，直接打上断点，多试几次后发现目前都是进入第一种加密方式，也就是rsa2这里，如果不小心点进f.encrypt函数，那么接下来就是无穷无尽的调用与计算了，仔细观察一下，发现是rsa加密的，搜索一下python中rsa加密的方式，最终得到如下处理：
```
import rsa
import binascii

def get_password(message, n, e='10001'):
    """RSA加密用户密码"""

    pub_key = rsa.PublicKey(int(n, 16), int(e, 16))
    crypto = rsa.encrypt(message.encode('utf8'), pub_key)
    return binascii.b2a_hex(crypto)
```

*ps3: 需要注意的几点：*
1. 从js代码中f.setPublic(me.rsaPubkey, "10001")可以看出，并非直接导入公匙，而是通过（n,e）生成，所以python中rsa也需要使用这种方式而不是直接导入；
2. 最终被加密的并不是原始密码，而是[me.servertime, me.nonce].join("\t") + "\n" + b，其中b为原始密码，如果不知道js怎么转换成python代码，可以直接在chrome浏览器中的Console中输出结果


**找齐了参数，那么就可以进行模拟登陆了，代码在这里https://github.com/Fathui/weibo_login**

*ps4：其实post之后， 并不是直接跳转到微博主页，而是返回一个crossdomain的连接，请求crossdomain链接后又返回一个链接····几经跳转之后才会进入微博主页，但是经过测试，只要完成第二步post参数，保存cookie到本地后，再使用该cookie进行请求，已经是登录状态了。*  

*ps5：post参数时，returntype选择META和TEXT是不一样的，不信你试试*










