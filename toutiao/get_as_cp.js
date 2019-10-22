function anonymous() {
    function e(e, a, r) {
        return (b[e] || (b[e] = t("x,y", "return x " + e + " y")))(r, a)
    }
    function a(e, a, r) {
        return (k[r] || (k[r] = t("x,y", "return new x[y](" + Array(r + 1).join(",x[++y]").substr(1) + ")")))(e, a)
    }
    function r(e, a, r) {
        var n, t, s = {}, b = s.d = r ? r.d + 1 : 0;
        for (s["$" + b] = s,
        t = 0; t < b; t++)
            s[n = "$" + t] = r[n];
        for (t = 0,
        b = s.length = a.length; t < b; t++)
            s[t] = a[t];
        return c(e, 0, s)
    }
    function c(t, b, k) {
        function u(e) {
            v[x++] = e
        }
        function f() {
            return g = t.charCodeAt(b++) - 32,
            t.substring(b, b += g)
        }
        function l() {
            try {
                y = c(t, b, k)
            } catch (e) {
                h = e,
                y = l
            }
        }
        for (var h, y, d, g, v = [], x = 0; ; )
            switch (g = t.charCodeAt(b++) - 32) {
            case 1:
                u(!v[--x]);
                break;
            case 4:
                v[x++] = f();
                break;
            case 5:
                u(function(e) {
                    var a = 0
                      , r = e.length;
                    return function() {
                        var c = a < r;
                        return c && u(e[a++]),
                        c
                    }
                }(v[--x]));
                break;
            case 6:
                y = v[--x],
                u(v[--x](y));
                break;
            case 8:
                if (g = t.charCodeAt(b++) - 32,
                l(),
                b += g,
                g = t.charCodeAt(b++) - 32,
                y === c)
                    b += g;
                else if (y !== l)
                    return y;
                break;
            case 9:
                v[x++] = c;
                break;
            case 10:
                u(s(v[--x]));
                break;
            case 11:
                y = v[--x],
                u(v[--x] + y);
                break;
            case 12:
                for (y = f(),
                d = [],
                g = 0; g < y.length; g++)
                    d[g] = y.charCodeAt(g) ^ g + y.length;
                u(String.fromCharCode.apply(null, d));
                break;
            case 13:
                y = v[--x],
                h = delete v[--x][y];
                break;
            case 14:
                v[x++] = t.charCodeAt(b++) - 32;
                break;
            case 59:
                u((g = t.charCodeAt(b++) - 32) ? (y = x,
                v.slice(x -= g, y)) : []);
                break;
            case 61:
                u(v[--x][t.charCodeAt(b++) - 32]);
                break;
            case 62:
                g = v[--x],
                k[0] = 65599 * k[0] + k[1].charCodeAt(g) >>> 0;
                break;
            case 65:
                h = v[--x],
                y = v[--x],
                v[--x][y] = h;
                break;
            case 66:
                u(e(t[b++], v[--x], v[--x]));
                break;
            case 67:
                y = v[--x],
                d = v[--x],
                u((g = v[--x]).x === c ? r(g.y, y, k) : g.apply(d, y));
                break;
            case 68:
                u(e((g = t[b++]) < "<" ? (b--,
                f()) : g + g, v[--x], v[--x]));
                break;
            case 70:
                u(!1);
                break;
            case 71:
                v[x++] = n;
                break;
            case 72:
                v[x++] = +f();
                break;
            case 73:
                u(parseInt(f(), 36));
                break;
            case 75:
                if (v[--x]) {
                    b++;
                    break
                }
            case 74:
                g = t.charCodeAt(b++) - 32 << 16 >> 16,
                b += g;
                break;
            case 76:
                u(k[t.charCodeAt(b++) - 32]);
                break;
            case 77:
                y = v[--x],
                u(v[--x][y]);
                break;
            case 78:
                g = t.charCodeAt(b++) - 32,
                u(a(v, x -= g + 1, g));
                break;
            case 79:
                g = t.charCodeAt(b++) - 32,
                u(k["$" + g]);
                break;
            case 81:
                h = v[--x],
                v[--x][f()] = h;
                break;
            case 82:
                u(v[--x][f()]);
                break;
            case 83:
                h = v[--x],
                k[t.charCodeAt(b++) - 32] = h;
                break;
            case 84:
                v[x++] = !0;
                break;
            case 85:
                v[x++] = void 0;
                break;
            case 86:
                u(v[x - 1]);
                break;
            case 88:
                h = v[--x],
                y = v[--x],
                v[x++] = h,
                v[x++] = y;
                break;
            case 89:
                u(function() {
                    function e() {
                        return r(e.y, arguments, k)
                    }
                    return e.y = f(),
                    e.x = c,
                    e
                }());
                break;
            case 90:
                v[x++] = null;
                break;
            case 91:
                v[x++] = h;
                break;
            case 93:
                h = v[--x];
                break;
            case 0:
                return v[--x];
            default:
                u((g << 16 >> 16) - 16)
            }
    }
    var n = this
      , t = n.Function
      , s = Object.keys || function(e) {
        var a = {}
          , r = 0;
        for (var c in e)
            a[r++] = c;
        return a.length = r,
        a
    }
      , b = {}
      , k = {};
    return r
};

var test = function(e) {
    "use strict";
    function r(e, t) {
        var i = (65535 & e) + (65535 & t)
          , n = (e >> 16) + (t >> 16) + (i >> 16);
        return n << 16 | 65535 & i
    }
    function a(e, t) {
        return e << t | e >>> 32 - t
    }
    function s(e, t, i, n, o, s) {
        return r(a(r(r(t, e), r(n, s)), o), i)
    }
    function l(e, t, i, n, o, r, a) {
        return s(t & i | ~t & n, e, t, o, r, a)
    }
    function c(e, t, i, n, o, r, a) {
        return s(t & n | i & ~n, e, t, o, r, a)
    }
    function d(e, t, i, n, o, r, a) {
        return s(t ^ i ^ n, e, t, o, r, a)
    }
    function f(e, t, i, n, o, r, a) {
        return s(i ^ (t | ~n), e, t, o, r, a)
    }
    function u(e, t) {
        e[t >> 5] |= 128 << t % 32,
        e[(t + 64 >>> 9 << 4) + 14] = t;
        var i, n, o, a, s, u = 1732584193, h = -271733879, p = -1732584194, g = 271733878;
        for (i = 0; i < e.length; i += 16)
            n = u,
            o = h,
            a = p,
            s = g,
            u = l(u, h, p, g, e[i], 7, -680876936),
            g = l(g, u, h, p, e[i + 1], 12, -389564586),
            p = l(p, g, u, h, e[i + 2], 17, 606105819),
            h = l(h, p, g, u, e[i + 3], 22, -1044525330),
            u = l(u, h, p, g, e[i + 4], 7, -176418897),
            g = l(g, u, h, p, e[i + 5], 12, 1200080426),
            p = l(p, g, u, h, e[i + 6], 17, -1473231341),
            h = l(h, p, g, u, e[i + 7], 22, -45705983),
            u = l(u, h, p, g, e[i + 8], 7, 1770035416),
            g = l(g, u, h, p, e[i + 9], 12, -1958414417),
            p = l(p, g, u, h, e[i + 10], 17, -42063),
            h = l(h, p, g, u, e[i + 11], 22, -1990404162),
            u = l(u, h, p, g, e[i + 12], 7, 1804603682),
            g = l(g, u, h, p, e[i + 13], 12, -40341101),
            p = l(p, g, u, h, e[i + 14], 17, -1502002290),
            h = l(h, p, g, u, e[i + 15], 22, 1236535329),
            u = c(u, h, p, g, e[i + 1], 5, -165796510),
            g = c(g, u, h, p, e[i + 6], 9, -1069501632),
            p = c(p, g, u, h, e[i + 11], 14, 643717713),
            h = c(h, p, g, u, e[i], 20, -373897302),
            u = c(u, h, p, g, e[i + 5], 5, -701558691),
            g = c(g, u, h, p, e[i + 10], 9, 38016083),
            p = c(p, g, u, h, e[i + 15], 14, -660478335),
            h = c(h, p, g, u, e[i + 4], 20, -405537848),
            u = c(u, h, p, g, e[i + 9], 5, 568446438),
            g = c(g, u, h, p, e[i + 14], 9, -1019803690),
            p = c(p, g, u, h, e[i + 3], 14, -187363961),
            h = c(h, p, g, u, e[i + 8], 20, 1163531501),
            u = c(u, h, p, g, e[i + 13], 5, -1444681467),
            g = c(g, u, h, p, e[i + 2], 9, -51403784),
            p = c(p, g, u, h, e[i + 7], 14, 1735328473),
            h = c(h, p, g, u, e[i + 12], 20, -1926607734),
            u = d(u, h, p, g, e[i + 5], 4, -378558),
            g = d(g, u, h, p, e[i + 8], 11, -2022574463),
            p = d(p, g, u, h, e[i + 11], 16, 1839030562),
            h = d(h, p, g, u, e[i + 14], 23, -35309556),
            u = d(u, h, p, g, e[i + 1], 4, -1530992060),
            g = d(g, u, h, p, e[i + 4], 11, 1272893353),
            p = d(p, g, u, h, e[i + 7], 16, -155497632),
            h = d(h, p, g, u, e[i + 10], 23, -1094730640),
            u = d(u, h, p, g, e[i + 13], 4, 681279174),
            g = d(g, u, h, p, e[i], 11, -358537222),
            p = d(p, g, u, h, e[i + 3], 16, -722521979),
            h = d(h, p, g, u, e[i + 6], 23, 76029189),
            u = d(u, h, p, g, e[i + 9], 4, -640364487),
            g = d(g, u, h, p, e[i + 12], 11, -421815835),
            p = d(p, g, u, h, e[i + 15], 16, 530742520),
            h = d(h, p, g, u, e[i + 2], 23, -995338651),
            u = f(u, h, p, g, e[i], 6, -198630844),
            g = f(g, u, h, p, e[i + 7], 10, 1126891415),
            p = f(p, g, u, h, e[i + 14], 15, -1416354905),
            h = f(h, p, g, u, e[i + 5], 21, -57434055),
            u = f(u, h, p, g, e[i + 12], 6, 1700485571),
            g = f(g, u, h, p, e[i + 3], 10, -1894986606),
            p = f(p, g, u, h, e[i + 10], 15, -1051523),
            h = f(h, p, g, u, e[i + 1], 21, -2054922799),
            u = f(u, h, p, g, e[i + 8], 6, 1873313359),
            g = f(g, u, h, p, e[i + 15], 10, -30611744),
            p = f(p, g, u, h, e[i + 6], 15, -1560198380),
            h = f(h, p, g, u, e[i + 13], 21, 1309151649),
            u = f(u, h, p, g, e[i + 4], 6, -145523070),
            g = f(g, u, h, p, e[i + 11], 10, -1120210379),
            p = f(p, g, u, h, e[i + 2], 15, 718787259),
            h = f(h, p, g, u, e[i + 9], 21, -343485551),
            u = r(u, n),
            h = r(h, o),
            p = r(p, a),
            g = r(g, s);
        return [u, h, p, g]
    }
    function h(e) {
        var t, i = "";
        for (t = 0; t < 32 * e.length; t += 8)
            i += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
        return i
    }
    function p(e) {
        var t, i = [];
        for (i[(e.length >> 2) - 1] = void 0,
        t = 0; t < i.length; t += 1)
            i[t] = 0;
        for (t = 0; t < 8 * e.length; t += 8)
            i[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
        return i
    }
    function g(e) {
        return h(u(p(e), 8 * e.length))
    }
    function m(e, t) {
        var i, n, o = p(e), r = [], a = [];
        for (r[15] = a[15] = void 0,
        o.length > 16 && (o = u(o, 8 * e.length)),
        i = 0; i < 16; i += 1)
            r[i] = 909522486 ^ o[i],
            a[i] = 1549556828 ^ o[i];
        return n = u(r.concat(p(t)), 512 + 8 * t.length),
        h(u(a.concat(n), 640))
    }
    function _(e) {
        var t, i, n = "0123456789abcdef", o = "";
        for (i = 0; i < e.length; i += 1)
            t = e.charCodeAt(i),
            o += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
        return o
    }
    function b(e) {
        return unescape(encodeURIComponent(e))
    }
    function F(e) {
        return g(b(e))
    }
    function v(e) {
        return _(F(e))
    }
    function y(e, t) {
        return m(b(e), b(t))
    }
    function w(e, t) {
        return _(y(e, t))
    }
    function x(e, t, i) {
        return t ? i ? y(t, e) : w(t, e) : i ? F(e) : v(e)
    }
    return x(e);
};

function get_as_cp() {
    var e = Math.floor((new Date).getTime() / 1e3)
      , t = e.toString(16).toUpperCase()
      , i = (0, test)(e).toString().toUpperCase();
    if (8 != t.length)
        return {
            as: "479BB4B7254C150",
            cp: "7E0AC8874BB0985"
        };
    for (var n = i.slice(0, 5), o = i.slice(-5), r = "", s = 0; s < 5; s++)
        r += n[s] + t[s];
    for (var l = "", c = 0; c < 5; c++)
        l += t[c + 3] + o[c];
    return {
        as: "A1" + r + t.slice(-3),
        cp: t.slice(0, 3) + l + "E1"
    }
}

function get_values(e, _my_ua, behot_time) {
    var t = (0, get_as_cp)()
        , i = 0;
    if ("refresh" === e) {
        i = 0;
    }else{
        i = behot_time;
    }
    global.navigator = {};
    // global.navigator.userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36";
    global.navigator.userAgent = _my_ua;

    var r = anonymous();
    r('gr$Daten Иb/s!l y͒yĹg,(lfi~ah`{mv,-n|jqewVxp{rvmmx,&effkx[!cs"l".Pq%widthl"@q&heightl"vr*getContextx$"2d[!cs#l#,*;?|u.|uc{uq$fontl#vr(fillTextx$$龘ฑภ경2<[#c}l#2q*shadowBlurl#1q-shadowOffsetXl#$$limeq+shadowColorl#vr#arcx88802[%c}l#vr&strokex[ c}l"v,)}eOmyoZB]mx[ cs!0s$l$Pb<k7l l!r&lengthb%^l$1+s$jl  s#i$1ek1s$gr#tack4)zgr#tac$! +0o![#cj?o ]!l$b%s"o ]!l"l$b*b^0d#>>>s!0s%yA0s"l"l!r&lengthb<k+l"^l"1+s"jl  s&l&z0l!$ +["cs\'(0l#i\'1ps9wxb&s() &{s)/s(gr&Stringr,fromCharCodes)0s*yWl ._b&s o!])l l Jb<k$.aj;l .Tb<k$.gj/l .^b<k&i"-4j!+& s+yPo!]+s!l!l Hd>&l!l Bd>&+l!l <d>&+l!l 6d>&+l!l &+ s,y=o!o!]/q"13o!l q"10o!],l 2d>& s.{s-yMo!o!]0q"13o!]*Ld<l 4d#>>>b|s!o!l q"10o!],l!& s/yIo!o!].q"13o!],o!]*Jd<l 6d#>>>b|&o!]+l &+ s0l-l!&l-l!i\'1z141z4b/@d<l"b|&+l-l(l!b^&+l-l&zl\'g,)gk}ejo{cm,)|yn~Lij~em["cl$b%@d<l&zl\'l $ +["cl$b%b|&+l-l%8d<@b|l!b^&+ q$sign ', [_ = {}]);

    var n = (0, _.sign)(i + "");
    if (i === 0){
        var params = {
            category: "__all__",
            utm_source: "toutiao",
            widen: 1,
            tadrequire: 'true',
            as: t.as,
            cp: t.cp,
            _signature: n,
            min_behot_time: i,
        };
    }else {
        var params = {
            category: "__all__",
            utm_source: "toutiao",
            widen: 1,
            tadrequire: 'true',
            as: t.as,
            cp: t.cp,
            _signature: n,
            max_behot_time: i,
        };
    }

    return params
}


// x = get_values('loadmore', '1571648908');
// x = get_values('refresh');
// //
// //
// console.log(x)