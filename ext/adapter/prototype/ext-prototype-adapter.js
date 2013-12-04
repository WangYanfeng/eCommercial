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
(function () {
    var e, a = Prototype.Version.split("."), h = (parseInt(a[0], 10) >= 2) || (parseInt(a[1], 10) >= 7) || (parseInt(a[2], 10) >= 1), g = {}, d = function (i, j) {
        if (i && i.firstChild) {
            while (j) {
                if (j === i) {
                    return true
                }
                j = j.parentNode;
                if (j && (j.nodeType != 1)) {
                    j = null
                }
            }
        }
        return false
    }, b = function (i) {
        return !d(i.currentTarget, Ext.lib.Event.getRelatedTarget(i))
    };
    Ext.lib.Dom = {getViewWidth: function (i) {
        return i ? this.getDocumentWidth() : this.getViewportWidth()
    }, getViewHeight: function (i) {
        return i ? this.getDocumentHeight() : this.getViewportHeight()
    }, getDocumentHeight: function () {
        var i = (document.compatMode != "CSS1Compat") ? document.body.scrollHeight : document.documentElement.scrollHeight;
        return Math.max(i, this.getViewportHeight())
    }, getDocumentWidth: function () {
        var i = (document.compatMode != "CSS1Compat") ? document.body.scrollWidth : document.documentElement.scrollWidth;
        return Math.max(i, this.getViewportWidth())
    }, getViewportHeight: function () {
        var i = self.innerHeight;
        var j = document.compatMode;
        if ((j || Ext.isIE) && !Ext.isOpera) {
            i = (j == "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight
        }
        return i
    }, getViewportWidth: function () {
        var i = self.innerWidth;
        var j = document.compatMode;
        if (j || Ext.isIE) {
            i = (j == "CSS1Compat") ? document.documentElement.clientWidth : document.body.clientWidth
        }
        return i
    }, isAncestor: function (j, k) {
        var i = false;
        j = Ext.getDom(j);
        k = Ext.getDom(k);
        if (j && k) {
            if (j.contains) {
                return j.contains(k)
            } else {
                if (j.compareDocumentPosition) {
                    return !!(j.compareDocumentPosition(k) & 16)
                } else {
                    while (k = k.parentNode) {
                        i = k == j || i
                    }
                }
            }
        }
        return i
    }, getRegion: function (i) {
        return Ext.lib.Region.getRegion(i)
    }, getY: function (i) {
        return this.getXY(i)[1]
    }, getX: function (i) {
        return this.getXY(i)[0]
    }, getXY: function (k) {
        var j, o, r, s, n = (document.body || document.documentElement);
        k = Ext.getDom(k);
        if (k == n) {
            return[0, 0]
        }
        if (k.getBoundingClientRect) {
            r = k.getBoundingClientRect();
            s = f(document).getScroll();
            return[Math.round(r.left + s.left), Math.round(r.top + s.top)]
        }
        var t = 0, q = 0;
        j = k;
        var i = f(k).getStyle("position") == "absolute";
        while (j) {
            t += j.offsetLeft;
            q += j.offsetTop;
            if (!i && f(j).getStyle("position") == "absolute") {
                i = true
            }
            if (Ext.isGecko) {
                o = f(j);
                var u = parseInt(o.getStyle("borderTopWidth"), 10) || 0;
                var l = parseInt(o.getStyle("borderLeftWidth"), 10) || 0;
                t += l;
                q += u;
                if (j != k && o.getStyle("overflow") != "visible") {
                    t += l;
                    q += u
                }
            }
            j = j.offsetParent
        }
        if (Ext.isSafari && i) {
            t -= n.offsetLeft;
            q -= n.offsetTop
        }
        if (Ext.isGecko && !i) {
            var m = f(n);
            t += parseInt(m.getStyle("borderLeftWidth"), 10) || 0;
            q += parseInt(m.getStyle("borderTopWidth"), 10) || 0
        }
        j = k.parentNode;
        while (j && j != n) {
            if (!Ext.isOpera || (j.tagName != "TR" && f(j).getStyle("display") != "inline")) {
                t -= j.scrollLeft;
                q -= j.scrollTop
            }
            j = j.parentNode
        }
        return[t, q]
    }, setXY: function (i, j) {
        i = Ext.fly(i, "_setXY");
        i.position();
        var k = i.translatePoints(j);
        if (j[0] !== false) {
            i.dom.style.left = k.left + "px"
        }
        if (j[1] !== false) {
            i.dom.style.top = k.top + "px"
        }
    }, setX: function (j, i) {
        this.setXY(j, [i, false])
    }, setY: function (i, j) {
        this.setXY(i, [false, j])
    }};
    Ext.lib.Event = {getPageX: function (i) {
        return Event.pointerX(i.browserEvent || i)
    }, getPageY: function (i) {
        return Event.pointerY(i.browserEvent || i)
    }, getXY: function (i) {
        i = i.browserEvent || i;
        return[Event.pointerX(i), Event.pointerY(i)]
    }, getTarget: function (i) {
        return Event.element(i.browserEvent || i)
    }, resolveTextNode: Ext.isGecko ? function (j) {
        if (!j) {
            return
        }
        var i = HTMLElement.prototype.toString.call(j);
        if (i == "[xpconnect wrapped native prototype]" || i == "[object XULElement]") {
            return
        }
        return j.nodeType == 3 ? j.parentNode : j
    } : function (i) {
        return i && i.nodeType == 3 ? i.parentNode : i
    }, getRelatedTarget: function (j) {
        j = j.browserEvent || j;
        var i = j.relatedTarget;
        if (!i) {
            if (j.type == "mouseout") {
                i = j.toElement
            } else {
                if (j.type == "mouseover") {
                    i = j.fromElement
                }
            }
        }
        return this.resolveTextNode(i)
    }, on: function (k, i, j) {
        if ((i == "mouseenter" || i == "mouseleave") && !h) {
            var l = g[k.id] || (g[k.id] = {});
            l[i] = j;
            j = j.createInterceptor(b);
            i = (i == "mouseenter") ? "mouseover" : "mouseout"
        }
        Event.observe(k, i, j, false)
    }, un: function (k, i, j) {
        if ((i == "mouseenter" || i == "mouseleave") && !h) {
            var m = g[k.id], l = m && m[i];
            if (l) {
                j = l.fn;
                delete m[i];
                i = (i == "mouseenter") ? "mouseover" : "mouseout"
            }
        }
        Event.stopObserving(k, i, j, false)
    }, purgeElement: function (i) {
    }, preventDefault: function (i) {
        i = i.browserEvent || i;
        if (i.preventDefault) {
            i.preventDefault()
        } else {
            i.returnValue = false
        }
    }, stopPropagation: function (i) {
        i = i.browserEvent || i;
        if (i.stopPropagation) {
            i.stopPropagation()
        } else {
            i.cancelBubble = true
        }
    }, stopEvent: function (i) {
        Event.stop(i.browserEvent || i)
    }, onAvailable: function (n, j, i) {
        var m = new Date(), l;
        var k = function () {
            if (m.getElapsed() > 10000) {
                clearInterval(l)
            }
            var o = document.getElementById(n);
            if (o) {
                clearInterval(l);
                j.call(i || window, o)
            }
        };
        l = setInterval(k, 50)
    }};
    Ext.lib.Ajax = function () {
        var k = function (l) {
            return l.success ? function (m) {
                l.success.call(l.scope || window, i(l, m))
            } : Ext.emptyFn
        };
        var j = function (l) {
            return l.failure ? function (m) {
                l.failure.call(l.scope || window, i(l, m))
            } : Ext.emptyFn
        };
        var i = function (l, r) {
            var n = {}, p, m, o;
            try {
                p = r.getAllResponseHeaders();
                Ext.each(p.replace(/\r\n/g, "\n").split("\n"), function (s) {
                    m = s.indexOf(":");
                    if (m >= 0) {
                        o = s.substr(0, m).toLowerCase();
                        if (s.charAt(m + 1) == " ") {
                            ++m
                        }
                        n[o] = s.substr(m + 1)
                    }
                })
            } catch (q) {
            }
            return{responseText: r.responseText, responseXML: r.responseXML, argument: l.argument, status: r.status, statusText: r.statusText, getResponseHeader: function (s) {
                return n[s.toLowerCase()]
            }, getAllResponseHeaders: function () {
                return p
            }}
        };
        return{request: function (s, p, l, q, m) {
            var r = {method: s, parameters: q || "", timeout: l.timeout, onSuccess: k(l), onFailure: j(l)};
            if (m) {
                var n = m.headers;
                if (n) {
                    r.requestHeaders = n
                }
                if (m.xmlData) {
                    s = (s ? s : (m.method ? m.method : "POST"));
                    if (!n || !n["Content-Type"]) {
                        r.contentType = "text/xml"
                    }
                    r.postBody = m.xmlData;
                    delete r.parameters
                }
                if (m.jsonData) {
                    s = (s ? s : (m.method ? m.method : "POST"));
                    if (!n || !n["Content-Type"]) {
                        r.contentType = "application/json"
                    }
                    r.postBody = typeof m.jsonData == "object" ? Ext.encode(m.jsonData) : m.jsonData;
                    delete r.parameters
                }
            }
            new Ajax.Request(p, r)
        }, formRequest: function (p, o, m, q, l, n) {
            new Ajax.Request(o, {method: Ext.getDom(p).method || "POST", parameters: Form.serialize(p) + (q ? "&" + q : ""), timeout: m.timeout, onSuccess: k(m), onFailure: j(m)})
        }, isCallInProgress: function (l) {
            return false
        }, abort: function (l) {
            return false
        }, serializeForm: function (l) {
            return Form.serialize(l.dom || l)
        }}
    }();
    Ext.lib.Anim = function () {
        var i = {easeOut: function (k) {
            return 1 - Math.pow(1 - k, 2)
        }, easeIn: function (k) {
            return 1 - Math.pow(1 - k, 2)
        }};
        var j = function (k, l) {
            return{stop: function (m) {
                this.effect.cancel()
            }, isAnimated: function () {
                return this.effect.state == "running"
            }, proxyCallback: function () {
                Ext.callback(k, l)
            }}
        };
        return{scroll: function (n, l, p, q, k, m) {
            var o = j(k, m);
            n = Ext.getDom(n);
            if (typeof l.scroll.to[0] == "number") {
                n.scrollLeft = l.scroll.to[0]
            }
            if (typeof l.scroll.to[1] == "number") {
                n.scrollTop = l.scroll.to[1]
            }
            o.proxyCallback();
            return o
        }, motion: function (n, l, o, p, k, m) {
            return this.run(n, l, o, p, k, m)
        }, color: function (n, l, o, p, k, m) {
            return this.run(n, l, o, p, k, m)
        }, run: function (m, v, r, u, n, x, w) {
            var l = {};
            for (var q in v) {
                switch (q) {
                    case"points":
                        var t, z, s = Ext.fly(m, "_animrun");
                        s.position();
                        if (t = v.points.by) {
                            var y = s.getXY();
                            z = s.translatePoints([y[0] + t[0], y[1] + t[1]])
                        } else {
                            z = s.translatePoints(v.points.to)
                        }
                        l.left = z.left + "px";
                        l.top = z.top + "px";
                        break;
                    case"width":
                        l.width = v.width.to + "px";
                        break;
                    case"height":
                        l.height = v.height.to + "px";
                        break;
                    case"opacity":
                        l.opacity = String(v.opacity.to);
                        break;
                    default:
                        l[q] = String(v[q].to);
                        break
                }
            }
            var p = j(n, x);
            p.effect = new Effect.Morph(Ext.id(m), {duration: r, afterFinish: p.proxyCallback, transition: i[u] || Effect.Transitions.linear, style: l});
            return p
        }}
    }();
    function f(i) {
        if (!e) {
            e = new Ext.Element.Flyweight()
        }
        e.dom = i;
        return e
    }

    Ext.lib.Region = function (k, m, i, j) {
        this.top = k;
        this[1] = k;
        this.right = m;
        this.bottom = i;
        this.left = j;
        this[0] = j
    };
    Ext.lib.Region.prototype = {contains: function (i) {
        return(i.left >= this.left && i.right <= this.right && i.top >= this.top && i.bottom <= this.bottom)
    }, getArea: function () {
        return((this.bottom - this.top) * (this.right - this.left))
    }, intersect: function (n) {
        var k = Math.max(this.top, n.top);
        var m = Math.min(this.right, n.right);
        var i = Math.min(this.bottom, n.bottom);
        var j = Math.max(this.left, n.left);
        if (i >= k && m >= j) {
            return new Ext.lib.Region(k, m, i, j)
        } else {
            return null
        }
    }, union: function (n) {
        var k = Math.min(this.top, n.top);
        var m = Math.max(this.right, n.right);
        var i = Math.max(this.bottom, n.bottom);
        var j = Math.min(this.left, n.left);
        return new Ext.lib.Region(k, m, i, j)
    }, constrainTo: function (i) {
        this.top = this.top.constrain(i.top, i.bottom);
        this.bottom = this.bottom.constrain(i.top, i.bottom);
        this.left = this.left.constrain(i.left, i.right);
        this.right = this.right.constrain(i.left, i.right);
        return this
    }, adjust: function (k, j, i, m) {
        this.top += k;
        this.left += j;
        this.right += m;
        this.bottom += i;
        return this
    }};
    Ext.lib.Region.getRegion = function (m) {
        var o = Ext.lib.Dom.getXY(m);
        var k = o[1];
        var n = o[0] + m.offsetWidth;
        var i = o[1] + m.offsetHeight;
        var j = o[0];
        return new Ext.lib.Region(k, n, i, j)
    };
    Ext.lib.Point = function (i, j) {
        if (Ext.isArray(i)) {
            j = i[1];
            i = i[0]
        }
        this.x = this.right = this.left = this[0] = i;
        this.y = this.top = this.bottom = this[1] = j
    };
    Ext.lib.Point.prototype = new Ext.lib.Region();
    if (Ext.isIE) {
        function c() {
            var i = Function.prototype;
            delete i.createSequence;
            delete i.defer;
            delete i.createDelegate;
            delete i.createCallback;
            delete i.createInterceptor;
            window.detachEvent("onunload", c)
        }

        window.attachEvent("onunload", c)
    }
})();