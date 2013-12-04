/*
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
window.undefined = window.undefined;
Ext = {version: "3.4.0", versionDetail: {major: 3, minor: 4, patch: 0}};
Ext.apply = function (d, e, b) {
    if (b) {
        Ext.apply(d, b)
    }
    if (d && e && typeof e == "object") {
        for (var a in e) {
            d[a] = e[a]
        }
    }
    return d
};
(function () {
    var g = 0, u = Object.prototype.toString, v = navigator.userAgent.toLowerCase(), A = function (e) {
        return e.test(v)
    }, i = document, n = i.documentMode, l = i.compatMode == "CSS1Compat", C = A(/opera/), h = A(/\bchrome\b/), w = A(/webkit/), z = !h && A(/safari/), f = z && A(/applewebkit\/4/), b = z && A(/version\/3/), D = z && A(/version\/4/), t = !C && A(/msie/), r = t && (A(/msie 7/) || n == 7), q = t && (A(/msie 8/) && n != 7), p = t && A(/msie 9/), s = t && !r && !q && !p, o = !w && A(/gecko/), d = o && A(/rv:1\.8/), a = o && A(/rv:1\.9/), x = t && !l, B = A(/windows|win32/), k = A(/macintosh|mac os x/), j = A(/adobeair/), m = A(/linux/), c = /^https/i.test(window.location.protocol);
    if (s) {
        try {
            i.execCommand("BackgroundImageCache", false, true)
        } catch (y) {
        }
    }
    Ext.apply(Ext, {SSL_SECURE_URL: c && t ? 'javascript:""' : "about:blank", isStrict: l, isSecure: c, isReady: false, enableForcedBoxModel: false, enableGarbageCollector: true, enableListenerCollection: false, enableNestedListenerRemoval: false, USE_NATIVE_JSON: false, applyIf: function (E, F) {
        if (E) {
            for (var e in F) {
                if (!Ext.isDefined(E[e])) {
                    E[e] = F[e]
                }
            }
        }
        return E
    }, id: function (e, E) {
        e = Ext.getDom(e, true) || {};
        if (!e.id) {
            e.id = (E || "ext-gen") + (++g)
        }
        return e.id
    }, extend: function () {
        var E = function (G) {
            for (var F in G) {
                this[F] = G[F]
            }
        };
        var e = Object.prototype.constructor;
        return function (L, I, K) {
            if (typeof I == "object") {
                K = I;
                I = L;
                L = K.constructor != e ? K.constructor : function () {
                    I.apply(this, arguments)
                }
            }
            var H = function () {
            }, J, G = I.prototype;
            H.prototype = G;
            J = L.prototype = new H();
            J.constructor = L;
            L.superclass = G;
            if (G.constructor == e) {
                G.constructor = I
            }
            L.override = function (F) {
                Ext.override(L, F)
            };
            J.superclass = J.supr = (function () {
                return G
            });
            J.override = E;
            Ext.override(L, K);
            L.extend = function (F) {
                return Ext.extend(L, F)
            };
            return L
        }
    }(), override: function (e, F) {
        if (F) {
            var E = e.prototype;
            Ext.apply(E, F);
            if (Ext.isIE && F.hasOwnProperty("toString")) {
                E.toString = F.toString
            }
        }
    }, namespace: function () {
        var G = arguments.length, H = 0, E, F, e, J, I, K;
        for (; H < G; ++H) {
            e = arguments[H];
            J = arguments[H].split(".");
            K = window[J[0]];
            if (K === undefined) {
                K = window[J[0]] = {}
            }
            I = J.slice(1);
            E = I.length;
            for (F = 0; F < E; ++F) {
                K = K[I[F]] = K[I[F]] || {}
            }
        }
        return K
    }, urlEncode: function (I, H) {
        var F, E = [], G = encodeURIComponent;
        Ext.iterate(I, function (e, J) {
            F = Ext.isEmpty(J);
            Ext.each(F ? e : J, function (K) {
                E.push("&", G(e), "=", (!Ext.isEmpty(K) && (K != e || !F)) ? (Ext.isDate(K) ? Ext.encode(K).replace(/"/g, "") : G(K)) : "")
            })
        });
        if (!H) {
            E.shift();
            H = ""
        }
        return H + E.join("")
    }, urlDecode: function (F, E) {
        if (Ext.isEmpty(F)) {
            return{}
        }
        var I = {}, H = F.split("&"), J = decodeURIComponent, e, G;
        Ext.each(H, function (K) {
            K = K.split("=");
            e = J(K[0]);
            G = J(K[1]);
            I[e] = E || !I[e] ? G : [].concat(I[e]).concat(G)
        });
        return I
    }, urlAppend: function (e, E) {
        if (!Ext.isEmpty(E)) {
            return e + (e.indexOf("?") === -1 ? "?" : "&") + E
        }
        return e
    }, toArray: function () {
        return t ? function (F, I, G, H) {
            H = [];
            for (var E = 0, e = F.length; E < e; E++) {
                H.push(F[E])
            }
            return H.slice(I || 0, G || H.length)
        } : function (e, F, E) {
            return Array.prototype.slice.call(e, F || 0, E || e.length)
        }
    }(), isIterable: function (e) {
        if (Ext.isArray(e) || e.callee) {
            return true
        }
        if (/NodeList|HTMLCollection/.test(u.call(e))) {
            return true
        }
        return((typeof e.nextNode != "undefined" || e.item) && Ext.isNumber(e.length))
    }, each: function (H, G, F) {
        if (Ext.isEmpty(H, true)) {
            return
        }
        if (!Ext.isIterable(H) || Ext.isPrimitive(H)) {
            H = [H]
        }
        for (var E = 0, e = H.length; E < e; E++) {
            if (G.call(F || H[E], H[E], E, H) === false) {
                return E
            }
        }
    }, iterate: function (F, E, e) {
        if (Ext.isEmpty(F)) {
            return
        }
        if (Ext.isIterable(F)) {
            Ext.each(F, E, e);
            return
        } else {
            if (typeof F == "object") {
                for (var G in F) {
                    if (F.hasOwnProperty(G)) {
                        if (E.call(e || F, G, F[G], F) === false) {
                            return
                        }
                    }
                }
            }
        }
    }, getDom: function (F, E) {
        if (!F || !i) {
            return null
        }
        if (F.dom) {
            return F.dom
        } else {
            if (typeof F == "string") {
                var G = i.getElementById(F);
                if (G && t && E) {
                    if (F == G.getAttribute("id")) {
                        return G
                    } else {
                        return null
                    }
                }
                return G
            } else {
                return F
            }
        }
    }, getBody: function () {
        return Ext.get(i.body || i.documentElement)
    }, getHead: function () {
        var e;
        return function () {
            if (e == undefined) {
                e = Ext.get(i.getElementsByTagName("head")[0])
            }
            return e
        }
    }(), removeNode: t && !q ? function () {
        var e;
        return function (E) {
            if (E && E.tagName != "BODY") {
                (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(E, true) : Ext.EventManager.removeAll(E);
                e = e || i.createElement("div");
                e.appendChild(E);
                e.innerHTML = "";
                delete Ext.elCache[E.id]
            }
        }
    }() : function (e) {
        if (e && e.parentNode && e.tagName != "BODY") {
            (Ext.enableNestedListenerRemoval) ? Ext.EventManager.purgeElement(e, true) : Ext.EventManager.removeAll(e);
            e.parentNode.removeChild(e);
            delete Ext.elCache[e.id]
        }
    }, isEmpty: function (E, e) {
        return E === null || E === undefined || ((Ext.isArray(E) && !E.length)) || (!e ? E === "" : false)
    }, isArray: function (e) {
        return u.apply(e) === "[object Array]"
    }, isDate: function (e) {
        return u.apply(e) === "[object Date]"
    }, isObject: function (e) {
        return !!e && Object.prototype.toString.call(e) === "[object Object]"
    }, isPrimitive: function (e) {
        return Ext.isString(e) || Ext.isNumber(e) || Ext.isBoolean(e)
    }, isFunction: function (e) {
        return u.apply(e) === "[object Function]"
    }, isNumber: function (e) {
        return typeof e === "number" && isFinite(e)
    }, isString: function (e) {
        return typeof e === "string"
    }, isBoolean: function (e) {
        return typeof e === "boolean"
    }, isElement: function (e) {
        return e ? !!e.tagName : false
    }, isDefined: function (e) {
        return typeof e !== "undefined"
    }, isOpera: C, isWebKit: w, isChrome: h, isSafari: z, isSafari3: b, isSafari4: D, isSafari2: f, isIE: t, isIE6: s, isIE7: r, isIE8: q, isIE9: p, isGecko: o, isGecko2: d, isGecko3: a, isBorderBox: x, isLinux: m, isWindows: B, isMac: k, isAir: j});
    Ext.ns = Ext.namespace
})();
Ext.ns("Ext.util", "Ext.lib", "Ext.data", "Ext.supports");
Ext.elCache = {};
Ext.apply(Function.prototype, {createInterceptor: function (b, a) {
    var c = this;
    return !Ext.isFunction(b) ? this : function () {
        var e = this, d = arguments;
        b.target = e;
        b.method = c;
        return(b.apply(a || e || window, d) !== false) ? c.apply(e || window, d) : null
    }
}, createCallback: function () {
    var a = arguments, b = this;
    return function () {
        return b.apply(window, a)
    }
}, createDelegate: function (c, b, a) {
    var d = this;
    return function () {
        var f = b || arguments;
        if (a === true) {
            f = Array.prototype.slice.call(arguments, 0);
            f = f.concat(b)
        } else {
            if (Ext.isNumber(a)) {
                f = Array.prototype.slice.call(arguments, 0);
                var e = [a, 0].concat(b);
                Array.prototype.splice.apply(f, e)
            }
        }
        return d.apply(c || window, f)
    }
}, defer: function (c, e, b, a) {
    var d = this.createDelegate(e, b, a);
    if (c > 0) {
        return setTimeout(d, c)
    }
    d();
    return 0
}});
Ext.applyIf(String, {format: function (b) {
    var a = Ext.toArray(arguments, 1);
    return b.replace(/\{(\d+)\}/g, function (c, d) {
        return a[d]
    })
}});
Ext.applyIf(Array.prototype, {indexOf: function (b, c) {
    var a = this.length;
    c = c || 0;
    c += (c < 0) ? a : 0;
    for (; c < a; ++c) {
        if (this[c] === b) {
            return c
        }
    }
    return -1
}, remove: function (b) {
    var a = this.indexOf(b);
    if (a != -1) {
        this.splice(a, 1)
    }
    return this
}});
Ext.util.TaskRunner = function (e) {
    e = e || 10;
    var f = [], a = [], b = 0, g = false, d = function () {
        g = false;
        clearInterval(b);
        b = 0
    }, h = function () {
        if (!g) {
            g = true;
            b = setInterval(i, e)
        }
    }, c = function (j) {
        a.push(j);
        if (j.onStop) {
            j.onStop.apply(j.scope || j)
        }
    }, i = function () {
        var l = a.length, n = new Date().getTime();
        if (l > 0) {
            for (var p = 0; p < l; p++) {
                f.remove(a[p])
            }
            a = [];
            if (f.length < 1) {
                d();
                return
            }
        }
        for (var p = 0, o, k, m, j = f.length; p < j; ++p) {
            o = f[p];
            k = n - o.taskRunTime;
            if (o.interval <= k) {
                m = o.run.apply(o.scope || o, o.args || [++o.taskRunCount]);
                o.taskRunTime = n;
                if (m === false || o.taskRunCount === o.repeat) {
                    c(o);
                    return
                }
            }
            if (o.duration && o.duration <= (n - o.taskStartTime)) {
                c(o)
            }
        }
    };
    this.start = function (j) {
        f.push(j);
        j.taskStartTime = new Date().getTime();
        j.taskRunTime = 0;
        j.taskRunCount = 0;
        h();
        return j
    };
    this.stop = function (j) {
        c(j);
        return j
    };
    this.stopAll = function () {
        d();
        for (var k = 0, j = f.length; k < j; k++) {
            if (f[k].onStop) {
                f[k].onStop()
            }
        }
        f = [];
        a = []
    }
};
Ext.TaskMgr = new Ext.util.TaskRunner();
if (typeof jQuery == "undefined") {
    throw"Unable to load Ext, jQuery not found."
}
(function () {
    var b;
    Ext.lib.Dom = {getViewWidth: function (d) {
        return d ? Math.max(jQuery(document).width(), jQuery(window).width()) : jQuery(window).width()
    }, getViewHeight: function (d) {
        return d ? Math.max(jQuery(document).height(), jQuery(window).height()) : jQuery(window).height()
    }, isAncestor: function (e, f) {
        var d = false;
        e = Ext.getDom(e);
        f = Ext.getDom(f);
        if (e && f) {
            if (e.contains) {
                return e.contains(f)
            } else {
                if (e.compareDocumentPosition) {
                    return !!(e.compareDocumentPosition(f) & 16)
                } else {
                    while (f = f.parentNode) {
                        d = f == e || d
                    }
                }
            }
        }
        return d
    }, getRegion: function (d) {
        return Ext.lib.Region.getRegion(d)
    }, getY: function (d) {
        return this.getXY(d)[1]
    }, getX: function (d) {
        return this.getXY(d)[0]
    }, getXY: function (f) {
        var e, j, l, m, i = (document.body || document.documentElement);
        f = Ext.getDom(f);
        if (f == i) {
            return[0, 0]
        }
        if (f.getBoundingClientRect) {
            l = f.getBoundingClientRect();
            m = c(document).getScroll();
            return[Math.round(l.left + m.left), Math.round(l.top + m.top)]
        }
        var n = 0, k = 0;
        e = f;
        var d = c(f).getStyle("position") == "absolute";
        while (e) {
            n += e.offsetLeft;
            k += e.offsetTop;
            if (!d && c(e).getStyle("position") == "absolute") {
                d = true
            }
            if (Ext.isGecko) {
                j = c(e);
                var o = parseInt(j.getStyle("borderTopWidth"), 10) || 0;
                var g = parseInt(j.getStyle("borderLeftWidth"), 10) || 0;
                n += g;
                k += o;
                if (e != f && j.getStyle("overflow") != "visible") {
                    n += g;
                    k += o
                }
            }
            e = e.offsetParent
        }
        if (Ext.isSafari && d) {
            n -= i.offsetLeft;
            k -= i.offsetTop
        }
        if (Ext.isGecko && !d) {
            var h = c(i);
            n += parseInt(h.getStyle("borderLeftWidth"), 10) || 0;
            k += parseInt(h.getStyle("borderTopWidth"), 10) || 0
        }
        e = f.parentNode;
        while (e && e != i) {
            if (!Ext.isOpera || (e.tagName != "TR" && c(e).getStyle("display") != "inline")) {
                n -= e.scrollLeft;
                k -= e.scrollTop
            }
            e = e.parentNode
        }
        return[n, k]
    }, setXY: function (d, e) {
        d = Ext.fly(d, "_setXY");
        d.position();
        var f = d.translatePoints(e);
        if (e[0] !== false) {
            d.dom.style.left = f.left + "px"
        }
        if (e[1] !== false) {
            d.dom.style.top = f.top + "px"
        }
    }, setX: function (e, d) {
        this.setXY(e, [d, false])
    }, setY: function (d, e) {
        this.setXY(d, [false, e])
    }};
    function c(d) {
        if (!b) {
            b = new Ext.Element.Flyweight()
        }
        b.dom = d;
        return b
    }

    Ext.lib.Event = {getPageX: function (d) {
        d = d.browserEvent || d;
        return d.pageX
    }, getPageY: function (d) {
        d = d.browserEvent || d;
        return d.pageY
    }, getXY: function (d) {
        d = d.browserEvent || d;
        return[d.pageX, d.pageY]
    }, getTarget: function (d) {
        return d.target
    }, on: function (h, d, g, f, e) {
        jQuery(h).bind(d, g)
    }, un: function (f, d, e) {
        jQuery(f).unbind(d, e)
    }, purgeElement: function (d) {
        jQuery(d).unbind()
    }, preventDefault: function (d) {
        d = d.browserEvent || d;
        if (d.preventDefault) {
            d.preventDefault()
        } else {
            d.returnValue = false
        }
    }, stopPropagation: function (d) {
        d = d.browserEvent || d;
        if (d.stopPropagation) {
            d.stopPropagation()
        } else {
            d.cancelBubble = true
        }
    }, stopEvent: function (d) {
        this.preventDefault(d);
        this.stopPropagation(d)
    }, onAvailable: function (j, e, d) {
        var i = new Date();
        var g = function () {
            if (i.getElapsed() > 10000) {
                clearInterval(h)
            }
            var f = document.getElementById(j);
            if (f) {
                clearInterval(h);
                e.call(d || window, f)
            }
        };
        var h = setInterval(g, 50)
    }, resolveTextNode: Ext.isGecko ? function (e) {
        if (!e) {
            return
        }
        var d = HTMLElement.prototype.toString.call(e);
        if (d == "[xpconnect wrapped native prototype]" || d == "[object XULElement]") {
            return
        }
        return e.nodeType == 3 ? e.parentNode : e
    } : function (d) {
        return d && d.nodeType == 3 ? d.parentNode : d
    }, getRelatedTarget: function (e) {
        e = e.browserEvent || e;
        var d = e.relatedTarget;
        if (!d) {
            if (e.type == "mouseout") {
                d = e.toElement
            } else {
                if (e.type == "mouseover") {
                    d = e.fromElement
                }
            }
        }
        return this.resolveTextNode(d)
    }};
    Ext.lib.Ajax = function () {
        var d = function (f) {
            return function (h, g) {
                if ((g == "error" || g == "timeout") && f.failure) {
                    f.failure.call(f.scope || window, e(f, h))
                } else {
                    if (f.success) {
                        f.success.call(f.scope || window, e(f, h))
                    }
                }
            }
        };
        var e = function (f, l) {
            var h = {}, j, g, i;
            try {
                j = l.getAllResponseHeaders();
                Ext.each(j.replace(/\r\n/g, "\n").split("\n"), function (m) {
                    g = m.indexOf(":");
                    if (g >= 0) {
                        i = m.substr(0, g).toLowerCase();
                        if (m.charAt(g + 1) == " ") {
                            ++g
                        }
                        h[i] = m.substr(g + 1)
                    }
                })
            } catch (k) {
            }
            return{responseText: l.responseText, responseXML: l.responseXML, argument: f.argument, status: l.status, statusText: l.statusText, getResponseHeader: function (m) {
                return h[m.toLowerCase()]
            }, getAllResponseHeaders: function () {
                return j
            }}
        };
        return{request: function (l, i, f, j, g) {
            var k = {type: l, url: i, data: j, timeout: f.timeout, complete: d(f)};
            if (g) {
                var h = g.headers;
                if (g.xmlData) {
                    k.data = g.xmlData;
                    k.processData = false;
                    k.type = (l ? l : (g.method ? g.method : "POST"));
                    if (!h || !h["Content-Type"]) {
                        k.contentType = "text/xml"
                    }
                } else {
                    if (g.jsonData) {
                        k.data = typeof g.jsonData == "object" ? Ext.encode(g.jsonData) : g.jsonData;
                        k.processData = false;
                        k.type = (l ? l : (g.method ? g.method : "POST"));
                        if (!h || !h["Content-Type"]) {
                            k.contentType = "application/json"
                        }
                    }
                }
                if (h) {
                    k.beforeSend = function (n) {
                        for (var m in h) {
                            if (h.hasOwnProperty(m)) {
                                n.setRequestHeader(m, h[m])
                            }
                        }
                    }
                }
            }
            jQuery.ajax(k)
        }, formRequest: function (j, i, g, k, f, h) {
            jQuery.ajax({type: Ext.getDom(j).method || "POST", url: i, data: jQuery(j).serialize() + (k ? "&" + k : ""), timeout: g.timeout, complete: d(g)})
        }, isCallInProgress: function (f) {
            return false
        }, abort: function (f) {
            return false
        }, serializeForm: function (f) {
            return jQuery(f.dom || f).serialize()
        }}
    }();
    Ext.lib.Anim = function () {
        var d = function (e, f) {
            var g = true;
            return{stop: function (h) {
            }, isAnimated: function () {
                return g
            }, proxyCallback: function () {
                g = false;
                Ext.callback(e, f)
            }}
        };
        return{scroll: function (h, f, j, k, e, g) {
            var i = d(e, g);
            h = Ext.getDom(h);
            if (typeof f.scroll.to[0] == "number") {
                h.scrollLeft = f.scroll.to[0]
            }
            if (typeof f.scroll.to[1] == "number") {
                h.scrollTop = f.scroll.to[1]
            }
            i.proxyCallback();
            return i
        }, motion: function (h, f, i, j, e, g) {
            return this.run(h, f, i, j, e, g)
        }, color: function (h, f, j, k, e, g) {
            var i = d(e, g);
            i.proxyCallback();
            return i
        }, run: function (g, q, j, p, h, s, r) {
            var l = d(h, s), m = Ext.fly(g, "_animrun");
            var f = {};
            for (var i in q) {
                switch (i) {
                    case"points":
                        var n, u;
                        m.position();
                        if (n = q.points.by) {
                            var t = m.getXY();
                            u = m.translatePoints([t[0] + n[0], t[1] + n[1]])
                        } else {
                            u = m.translatePoints(q.points.to)
                        }
                        f.left = u.left;
                        f.top = u.top;
                        if (!parseInt(m.getStyle("left"), 10)) {
                            m.setLeft(0)
                        }
                        if (!parseInt(m.getStyle("top"), 10)) {
                            m.setTop(0)
                        }
                        if (q.points.from) {
                            m.setXY(q.points.from)
                        }
                        break;
                    case"width":
                        f.width = q.width.to;
                        if (q.width.from) {
                            m.setWidth(q.width.from)
                        }
                        break;
                    case"height":
                        f.height = q.height.to;
                        if (q.height.from) {
                            m.setHeight(q.height.from)
                        }
                        break;
                    case"opacity":
                        f.opacity = q.opacity.to;
                        if (q.opacity.from) {
                            m.setOpacity(q.opacity.from)
                        }
                        break;
                    case"left":
                        f.left = q.left.to;
                        if (q.left.from) {
                            m.setLeft(q.left.from)
                        }
                        break;
                    case"top":
                        f.top = q.top.to;
                        if (q.top.from) {
                            m.setTop(q.top.from)
                        }
                        break;
                    case"callback":
                    case"scope":
                    case"xy":
                        break;
                    default:
                        f[i] = q[i].to;
                        if (q[i].from) {
                            m.setStyle(i, q[i].from)
                        }
                        break
                }
            }
            jQuery(g).animate(f, j * 1000, undefined, l.proxyCallback);
            return l
        }}
    }();
    Ext.lib.Region = function (f, g, d, e) {
        this.top = f;
        this[1] = f;
        this.right = g;
        this.bottom = d;
        this.left = e;
        this[0] = e
    };
    Ext.lib.Region.prototype = {contains: function (d) {
        return(d.left >= this.left && d.right <= this.right && d.top >= this.top && d.bottom <= this.bottom)
    }, getArea: function () {
        return((this.bottom - this.top) * (this.right - this.left))
    }, intersect: function (h) {
        var f = Math.max(this.top, h.top);
        var g = Math.min(this.right, h.right);
        var d = Math.min(this.bottom, h.bottom);
        var e = Math.max(this.left, h.left);
        if (d >= f && g >= e) {
            return new Ext.lib.Region(f, g, d, e)
        } else {
            return null
        }
    }, union: function (h) {
        var f = Math.min(this.top, h.top);
        var g = Math.max(this.right, h.right);
        var d = Math.max(this.bottom, h.bottom);
        var e = Math.min(this.left, h.left);
        return new Ext.lib.Region(f, g, d, e)
    }, constrainTo: function (d) {
        this.top = this.top.constrain(d.top, d.bottom);
        this.bottom = this.bottom.constrain(d.top, d.bottom);
        this.left = this.left.constrain(d.left, d.right);
        this.right = this.right.constrain(d.left, d.right);
        return this
    }, adjust: function (f, e, d, g) {
        this.top += f;
        this.left += e;
        this.right += g;
        this.bottom += d;
        return this
    }};
    Ext.lib.Region.getRegion = function (g) {
        var i = Ext.lib.Dom.getXY(g);
        var f = i[1];
        var h = i[0] + g.offsetWidth;
        var d = i[1] + g.offsetHeight;
        var e = i[0];
        return new Ext.lib.Region(f, h, d, e)
    };
    Ext.lib.Point = function (d, e) {
        if (Ext.isArray(d)) {
            e = d[1];
            d = d[0]
        }
        this.x = this.right = this.left = this[0] = d;
        this.y = this.top = this.bottom = this[1] = e
    };
    Ext.lib.Point.prototype = new Ext.lib.Region();
    if (Ext.isIE) {
        function a() {
            var d = Function.prototype;
            delete d.createSequence;
            delete d.defer;
            delete d.createDelegate;
            delete d.createCallback;
            delete d.createInterceptor;
            window.detachEvent("onunload", a)
        }

        window.attachEvent("onunload", a)
    }
})();