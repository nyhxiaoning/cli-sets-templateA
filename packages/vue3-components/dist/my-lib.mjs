var ye = 16.666666666666668, ve = 500, xt = [], ge = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
  return setTimeout(t, ye);
}, ie = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
  return clearTimeout(t);
}, Ot = Date.now(), rt;
function re() {
  var t, n;
  rt && (ie.call(window, rt), rt = null), xt.forEach(function(e) {
    var i;
    (i = e.event) && (e.event = null, e.listener(i), t = !0);
  }), t ? (Ot = Date.now(), n = !0) : Date.now() - Ot < ve && (n = !0), n && (rt = ge.call(window, re));
}
function Zt(t) {
  var n = -1;
  return xt.some(function(e, i) {
    return e.listener === t ? (n = i, !0) : !1;
  }), n;
}
var ae = {
  add: function(n) {
    var e;
    return Zt(n) === -1 ? (xt.push(e = {
      listener: n
    }), function(i) {
      e.event = i, rt || re();
    }) : null;
  },
  remove: function(n) {
    var e;
    (e = Zt(n)) > -1 && (xt.splice(e, 1), !xt.length && rt && (ie.call(window, rt), rt = null));
  }
};
function Ee(t, n) {
  if (!(t instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
function Kt(t, n) {
  for (var e = 0; e < n.length; e++) {
    var i = n[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
  }
}
function we(t, n, e) {
  return n && Kt(t.prototype, n), e && Kt(t, e), t;
}
var Se = 400, Jt = [], Qt = [], le = !1;
try {
  window.addEventListener("test", null, Object.defineProperty({}, "passive", {
    get: function() {
      le = !0;
    }
  }));
} catch {
}
function j(t, n, e, i) {
  t.addEventListener(n, e, le ? i : i.capture);
}
function Yt(t, n) {
  var e = t.x - n.x, i = t.y - n.y;
  return Math.sqrt(e * e + i * i);
}
function ht(t, n) {
  if (t != null && n != null) {
    for (var e = 0; e < t.length; e++)
      if (t[e].identifier === n)
        return t[e];
  }
  return null;
}
function Lt(t) {
  return t && typeof t.clientX == "number" && typeof t.clientY == "number";
}
function Xt(t) {
  t.preventDefault();
}
var xe = /* @__PURE__ */ function() {
  function t(n) {
    var e = this;
    Ee(this, t), this.startHandlers = {}, this.lastHandlerId = 0, this.curPointerClass = null, this.curTouchId = null, this.lastPointerXY = {
      clientX: 0,
      clientY: 0
    }, this.lastTouchTime = 0, this.options = {
      preventDefault: !0,
      stopPropagation: !0
    }, n && ["preventDefault", "stopPropagation"].forEach(function(i) {
      typeof n[i] == "boolean" && (e.options[i] = n[i]);
    });
  }
  return we(t, [{
    key: "regStartHandler",
    value: function(e) {
      var i = this;
      return i.startHandlers[++i.lastHandlerId] = function(r) {
        var a = r.type === "mousedown" ? "mouse" : "touch", u = Date.now(), o, l;
        if (a === "touch")
          i.lastTouchTime = u, o = r.changedTouches[0], l = r.changedTouches[0].identifier;
        else {
          if (u - i.lastTouchTime < Se)
            return;
          o = r;
        }
        if (!Lt(o))
          throw new Error("No clientX/clientY");
        i.curPointerClass && i.cancel(), e.call(i, o) && (i.curPointerClass = a, i.curTouchId = a === "touch" ? l : null, i.lastPointerXY.clientX = o.clientX, i.lastPointerXY.clientY = o.clientY, i.options.preventDefault && r.preventDefault(), i.options.stopPropagation && r.stopPropagation());
      }, i.lastHandlerId;
    }
  }, {
    key: "unregStartHandler",
    value: function(e) {
      delete this.startHandlers[e];
    }
  }, {
    key: "addStartHandler",
    value: function(e, i) {
      if (!this.startHandlers[i])
        throw new Error("Invalid handlerId: ".concat(i));
      return j(e, "mousedown", this.startHandlers[i], {
        capture: !1,
        passive: !1
      }), j(e, "touchstart", this.startHandlers[i], {
        capture: !1,
        passive: !1
      }), j(e, "dragstart", Xt, {
        capture: !1,
        passive: !1
      }), i;
    }
  }, {
    key: "removeStartHandler",
    value: function(e, i) {
      if (!this.startHandlers[i])
        throw new Error("Invalid handlerId: ".concat(i));
      return e.removeEventListener("mousedown", this.startHandlers[i], !1), e.removeEventListener("touchstart", this.startHandlers[i], !1), e.removeEventListener("dragstart", Xt, !1), i;
    }
  }, {
    key: "addMoveHandler",
    value: function(e, i, r) {
      var a = this;
      function u(l) {
        var s = l.type === "mousemove" ? "mouse" : "touch";
        if (s === "touch" && (a.lastTouchTime = Date.now()), s === a.curPointerClass) {
          var f = s === "touch" ? ht(l.changedTouches, a.curTouchId) : l;
          Lt(f) && ((f.clientX !== a.lastPointerXY.clientX || f.clientY !== a.lastPointerXY.clientY) && a.move(f), a.options.preventDefault && l.preventDefault(), a.options.stopPropagation && l.stopPropagation());
        }
      }
      var o = r ? u : ae.add(u);
      j(e, "mousemove", o, {
        capture: !1,
        passive: !1
      }), j(e, "touchmove", o, {
        capture: !1,
        passive: !1
      }), a.curMoveHandler = i;
    }
  }, {
    key: "move",
    value: function(e) {
      Lt(e) && (this.lastPointerXY.clientX = e.clientX, this.lastPointerXY.clientY = e.clientY), this.curMoveHandler && this.curMoveHandler(this.lastPointerXY);
    }
  }, {
    key: "addEndHandler",
    value: function(e, i) {
      var r = this;
      function a(u) {
        var o = u.type === "mouseup" ? "mouse" : "touch";
        if (o === "touch" && (r.lastTouchTime = Date.now()), o === r.curPointerClass) {
          var l = o === "touch" ? ht(u.changedTouches, r.curTouchId) || (ht(u.touches, r.curTouchId) ? null : {}) : u;
          l && (r.end(l), r.options.preventDefault && u.preventDefault(), r.options.stopPropagation && u.stopPropagation());
        }
      }
      j(e, "mouseup", a, {
        capture: !1,
        passive: !1
      }), j(e, "touchend", a, {
        capture: !1,
        passive: !1
      }), r.curEndHandler = i;
    }
  }, {
    key: "end",
    value: function(e) {
      Lt(e) && (this.lastPointerXY.clientX = e.clientX, this.lastPointerXY.clientY = e.clientY), this.curEndHandler && this.curEndHandler(this.lastPointerXY), this.curPointerClass = this.curTouchId = null;
    }
  }, {
    key: "addCancelHandler",
    value: function(e, i) {
      var r = this;
      function a(u) {
        if (r.lastTouchTime = Date.now(), r.curPointerClass != null) {
          var o = ht(u.changedTouches, r.curTouchId) || (ht(u.touches, r.curTouchId) ? null : {});
          o && r.cancel();
        }
      }
      j(e, "touchcancel", a, {
        capture: !1,
        passive: !1
      }), r.curCancelHandler = i;
    }
  }, {
    key: "cancel",
    value: function() {
      this.curCancelHandler && this.curCancelHandler(), this.curPointerClass = this.curTouchId = null;
    }
  }], [{
    key: "addEventListenerWithOptions",
    get: function() {
      return j;
    }
  }, {
    key: "initClickEmulator",
    value: function(e, i, r) {
      if (Jt.includes(e))
        return e;
      Jt.push(e);
      var a = 16, u = 400, o, l, s, f;
      return i == null && (i = a), r == null && (r = u), j(e, "touchstart", function(d) {
        var w = d.changedTouches[0];
        o = w.clientX, l = w.clientY, s = w.identifier, f = performance.now();
      }, {
        capture: !1,
        passive: !1
      }), j(e, "touchend", function(d) {
        var w = ht(d.changedTouches, s);
        typeof o == "number" && typeof l == "number" && typeof f == "number" && w && typeof w.clientX == "number" && typeof w.clientY == "number" && Yt({
          x: o,
          y: l
        }, {
          x: w.clientX,
          y: w.clientY
        }) <= i && performance.now() - f <= r && setTimeout(function() {
          var C = new MouseEvent("click", {
            clientX: w.clientX,
            clientY: w.clientY
          });
          C.emulated = !0, e.dispatchEvent(C);
        }, 0), o = l = s = f = null;
      }, {
        capture: !1,
        passive: !1
      }), j(e, "touchcancel", function() {
        o = l = s = f = null;
      }, {
        capture: !1,
        passive: !1
      }), e;
    }
  }, {
    key: "initDblClickEmulator",
    value: function(e, i, r) {
      if (Qt.includes(e))
        return e;
      Qt.push(e);
      var a = 16, u = 400, o, l, s;
      return i == null && (i = a), r == null && (r = u), t.initClickEmulator(e, i, r), j(e, "click", function(f) {
        !f.emulated || typeof f.clientX != "number" || typeof f.clientY != "number" || (typeof o == "number" && Yt({
          x: o,
          y: l
        }, {
          x: f.clientX,
          y: f.clientY
        }) <= i && performance.now() - s <= r * 2 ? (setTimeout(function() {
          var d = new MouseEvent("dblclick", {
            clientX: f.clientX,
            clientY: f.clientY
          });
          d.emulated = !0, e.dispatchEvent(d);
        }, 0), o = l = s = null) : (o = f.clientX, l = f.clientY, s = performance.now()));
      }, {
        capture: !1,
        passive: !1
      }), e;
    }
  }]), t;
}();
function fe(t) {
  return t.substr(0, 1).toUpperCase() + t.substr(1);
}
var zt = ["webkit", "moz", "ms", "o"], Ce = zt.reduce(function(t, n) {
  return t.push(n), t.push(fe(n)), t;
}, []), oe = zt.map(function(t) {
  return "-".concat(t, "-");
}), ue = function() {
  var t;
  return function() {
    return t = t || document.createElement("div").style;
  };
}(), _e = function() {
  var t = new RegExp("^(?:" + zt.join("|") + ")(.)", "i"), n = /[A-Z]/;
  return function(e) {
    return (e = (e + "").replace(/\s/g, "").replace(/-([\da-z])/gi, function(i, r) {
      return r.toUpperCase();
    }).replace(t, function(i, r) {
      return n.test(r) ? r.toLowerCase() : i;
    })).toLowerCase() === "float" ? "cssFloat" : e;
  };
}(), Pe = function() {
  var t = new RegExp("^(?:" + oe.join("|") + ")", "i");
  return function(n) {
    return (n != null ? n + "" : "").replace(/\s/g, "").replace(t, "");
  };
}(), pt = function() {
  return function(t, n) {
    var e = ue();
    return t = t.replace(/[A-Z]/g, function(i) {
      return "-".concat(i.toLowerCase());
    }), e.setProperty(t, n), e[t] != null && e.getPropertyValue(t) === n;
  };
}(), gt = {}, nt = {};
function ce(t) {
  if (t = _e(t), t && gt[t] == null) {
    var n = ue();
    if (n[t] != null)
      gt[t] = t;
    else {
      var e = fe(t);
      Ce.some(function(i) {
        var r = i + e;
        return n[r] != null ? (gt[t] = r, !0) : !1;
      }) || (gt[t] = !1);
    }
  }
  return gt[t] || void 0;
}
function be(t, n) {
  var e;
  return (t = ce(t)) ? (nt[t] = nt[t] || {}, (Array.isArray(n) ? n : [n]).some(function(i) {
    return i = Pe(i), nt[t][i] != null ? nt[t][i] !== !1 ? (e = nt[t][i], !0) : !1 : pt(t, i) ? (e = nt[t][i] = i, !0) : oe.some(function(r) {
      var a = r + i;
      return pt(t, a) ? (e = nt[t][i] = a, !0) : !1;
    }) ? !0 : (nt[t][i] = !1, !1);
  }), typeof e == "string" ? e : void 0) : e;
}
var dt = {
  getName: ce,
  getValue: be
};
function yt(t) {
  return (t + "").trim();
}
function Tt(t, n) {
  n.setAttribute("class", t.join(" "));
}
function Te(t, n, e) {
  e.filter(function(i) {
    return !(i = yt(i)) || t.indexOf(i) !== -1 ? !1 : (t.push(i), !0);
  }).length && Tt(t, n);
}
function Ie(t, n, e) {
  e.filter(function(i) {
    var r;
    return !(i = yt(i)) || (r = t.indexOf(i)) === -1 ? !1 : (t.splice(r, 1), !0);
  }).length && Tt(t, n);
}
function Le(t, n, e, i) {
  var r = t.indexOf(e = yt(e));
  return r !== -1 ? i ? !0 : (t.splice(r, 1), Tt(t, n), !1) : i === !1 ? !1 : (t.push(e), Tt(t, n), !0);
}
function De(t, n, e, i) {
  var r;
  !(e = yt(e)) || !(i = yt(i)) || e === i || (r = t.indexOf(e)) === -1 || (t.splice(r, 1), t.indexOf(i) === -1 && t.push(i), Tt(t, n));
}
function F(t) {
  return !F.ignoreNative && t.classList || function() {
    var n = (t.getAttribute("class") || "").trim().split(/\s+/).filter(function(i) {
      return !!i;
    }), e = {
      length: n.length,
      item: function(r) {
        return n[r];
      },
      contains: function(r) {
        return n.indexOf(yt(r)) !== -1;
      },
      add: function() {
        return Te(n, t, Array.prototype.slice.call(arguments)), F.methodChain ? e : void 0;
      },
      remove: function() {
        return Ie(n, t, Array.prototype.slice.call(arguments)), F.methodChain ? e : void 0;
      },
      toggle: function(r, a) {
        return Le(n, t, r, a);
      },
      replace: function(r, a) {
        return De(n, t, r, a), F.methodChain ? e : void 0;
      }
    };
    return e;
  }();
}
F.methodChain = !0;
function He(t, n) {
  if (!(t instanceof n))
    throw new TypeError("Cannot call a class as a function");
}
function te(t, n) {
  for (var e = 0; e < n.length; e++) {
    var i = n[e];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
  }
}
function Be(t, n, e) {
  return n && te(t.prototype, n), e && te(t, e), t;
}
function Ct(t) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ct = function(e) {
    return typeof e;
  } : Ct = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ct(t);
}
F.ignoreNative = !0;
var Re = 9e3, ke = 20, Fe = "tl", We = "both", Me = "both", ze = "containment", Ae = ["tl", "tr", "bl", "br"], Ue = ["start", "end"], Ge = ["inside", "outside"], Ne = [40, 200, 1e3], je = [100, 40, 0], At = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style && !window.navigator.msPointerEnabled, Ve = !At && !!document.uniqueID, Ut = "MozAppearance" in document.documentElement.style, $e = !At && !Ut && !!window.chrome && !!window.CSS, de = !At && !Ve && !Ut && !$e && !window.chrome && "WebkitAppearance" in document.documentElement.style, K = function() {
  var t = {}.toString, n = {}.hasOwnProperty.toString, e = n.call(Object);
  return function(i) {
    var r, a;
    return i && t.call(i) === "[object Object]" && (!(r = Object.getPrototypeOf(i)) || (a = r.hasOwnProperty("constructor") && r.constructor) && typeof a == "function" && n.call(a) === e);
  };
}(), L = Number.isFinite || function(t) {
  return typeof t == "number" && window.isFinite(t);
}, g = {}, Dt = {}, J = new xe(), qe = 0, E, Ht, G, lt, Z, Bt, st, p, W, se, _t = de ? ["all-scroll", "move"] : ["grab", "all-scroll", "move"], Pt = de ? "move" : ["grabbing", "move"], O = "plain-draggable", Y = "plain-draggable-dragging", X = "plain-draggable-moving", It = {}, Oe = 1e3 / 60, ee = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
  return setTimeout(t, Oe);
}, kt = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
  return clearTimeout(t);
};
{
  let t = function() {
    var e = Date.now();
    ["x", "y"].forEach(function(i) {
      var r = it[i];
      if (r) {
        var a = e - r.lastFrameTime, u = Ft(Et, i), o = r.lastValue != null && Math.abs(r.lastValue - u) < 10 ? r.lastValue : u;
        if (r.dir === -1 ? o > r.min : o < r.max) {
          var l = o + r.speed * a * r.dir;
          l < r.min ? l = r.min : l > r.max && (l = r.max), Ft(Et, i, l), r.lastValue = l;
        }
        r.lastFrameTime = e;
      }
    });
  }, n = function() {
    kt.call(window, wt), t(), wt = ee.call(window, n);
  };
  var it = {}, Et, Ft, wt;
  It.move = function(e, i, r) {
    kt.call(window, wt), t(), Et === e && (i.x && it.x && (i.x.lastValue = it.x.lastValue), i.y && it.y && (i.y.lastValue = it.y.lastValue)), Et = e, it = i, Ft = r;
    var a = Date.now();
    ["x", "y"].forEach(function(u) {
      var o = it[u];
      o && (o.lastFrameTime = a);
    }), wt = ee.call(window, n);
  }, It.stop = function() {
    kt.call(window, wt), t(), it = {}, Et = null;
  };
}
function ft(t, n, e) {
  return e != null && (n === "x" ? t.scrollTo(e, t.pageYOffset) : t.scrollTo(t.pageXOffset, e)), n === "x" ? t.pageXOffset : t.pageYOffset;
}
function ot(t, n, e) {
  var i = n === "x" ? "scrollLeft" : "scrollTop";
  return e != null && (t[i] = e), t[i];
}
function Ze(t, n, e) {
  var i = {}, r, a, u;
  (function(w) {
    i.clientWidth = w.clientWidth, i.clientHeight = w.clientHeight;
  })(n ? document.documentElement : t);
  var o = 0, l = 0;
  if (!e) {
    var s, f;
    n ? (s = ft(t, "x"), f = ft(t, "y"), r = getComputedStyle(document.documentElement, ""), a = getComputedStyle(document.body, ""), o = ft(t, "x", document.documentElement.scrollWidth + i.clientWidth + ["marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"].reduce(function(w, C) {
      return w + (parseFloat(r[C]) || 0) + (parseFloat(a[C]) || 0);
    }, 0)), l = ft(t, "y", document.documentElement.scrollHeight + i.clientHeight + ["marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"].reduce(function(w, C) {
      return w + (parseFloat(r[C]) || 0) + (parseFloat(a[C]) || 0);
    }, 0)), ft(t, "x", s), ft(t, "y", f)) : (s = ot(t, "x"), f = ot(t, "y"), u = getComputedStyle(t, ""), o = ot(t, "x", t.scrollWidth + i.clientWidth + ["marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"].reduce(function(w, C) {
      return w + (parseFloat(u[C]) || 0);
    }, 0)), l = ot(t, "y", t.scrollHeight + i.clientHeight + ["marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"].reduce(function(w, C) {
      return w + (parseFloat(u[C]) || 0);
    }, 0)), ot(t, "x", s), ot(t, "y", f));
  }
  i.scrollWidth = i.clientWidth + o, i.scrollHeight = i.clientHeight + l;
  var d;
  return n ? i.clientX = i.clientY = 0 : (d = t.getBoundingClientRect(), u || (u = getComputedStyle(t, "")), i.clientX = d.left + (parseFloat(u.borderLeftWidth) || 0), i.clientY = d.top + (parseFloat(u.borderTopWidth) || 0)), i;
}
function at(t) {
  return t && (K(t) ? Object.keys(t).reduce(function(n, e) {
    return n[e] = at(t[e]), n;
  }, {}) : Array.isArray(t) ? t.map(at) : t);
}
function mt(t, n) {
  var e, i;
  return Ct(t) !== Ct(n) || (e = K(t) ? "obj" : Array.isArray(t) ? "array" : "") != (K(n) ? "obj" : Array.isArray(n) ? "array" : "") || (e === "obj" ? mt(i = Object.keys(t).sort(), Object.keys(n).sort()) || i.some(function(r) {
    return mt(t[r], n[r]);
  }) : e === "array" ? t.length !== n.length || t.some(function(r, a) {
    return mt(r, n[a]);
  }) : t !== n);
}
function ct(t) {
  return !!(t && t.nodeType === Node.ELEMENT_NODE && typeof t.getBoundingClientRect == "function" && !(t.compareDocumentPosition(document) & Node.DOCUMENT_POSITION_DISCONNECTED));
}
function Rt(t) {
  if (!K(t))
    return null;
  var n;
  if (L(n = t.left) || L(n = t.x))
    t.left = t.x = n;
  else
    return null;
  if (L(n = t.top) || L(n = t.y))
    t.top = t.y = n;
  else
    return null;
  if (L(t.width) && t.width >= 0)
    t.right = t.left + t.width;
  else if (L(t.right) && t.right >= t.left)
    t.width = t.right - t.left;
  else
    return null;
  if (L(t.height) && t.height >= 0)
    t.bottom = t.top + t.height;
  else if (L(t.bottom) && t.bottom >= t.top)
    t.height = t.bottom - t.top;
  else
    return null;
  return t;
}
function q(t) {
  function n(e) {
    var i = /^(.+?)(%)?$/.exec(e), r, a;
    return i && L(r = parseFloat(i[1])) ? {
      value: (a = !!(i[2] && r)) ? r / 100 : r,
      isRatio: a
    } : null;
  }
  return L(t) ? {
    value: t,
    isRatio: !1
  } : typeof t == "string" ? n(t.replace(/\s/g, "")) : null;
}
function St(t) {
  return t.isRatio ? "".concat(t.value * 100, "%") : t.value;
}
function ut(t, n, e) {
  return typeof t == "number" ? t : n + t.value * (t.isRatio ? e : 1);
}
function Wt(t) {
  if (!K(t))
    return null;
  var n;
  if ((n = q(t.left)) || (n = q(t.x)))
    t.left = t.x = n;
  else
    return null;
  if ((n = q(t.top)) || (n = q(t.y)))
    t.top = t.y = n;
  else
    return null;
  if ((n = q(t.width)) && n.value >= 0)
    t.width = n, delete t.right;
  else if (n = q(t.right))
    t.right = n, delete t.width;
  else
    return null;
  if ((n = q(t.height)) && n.value >= 0)
    t.height = n, delete t.bottom;
  else if (n = q(t.bottom))
    t.bottom = n, delete t.height;
  else
    return null;
  return t;
}
function he(t) {
  return Object.keys(t).reduce(function(n, e) {
    return n[e] = St(t[e]), n;
  }, {});
}
function ne(t, n) {
  var e = {
    left: "x",
    right: "x",
    x: "x",
    width: "x",
    top: "y",
    bottom: "y",
    y: "y",
    height: "y"
  }, i = {
    x: n.left,
    y: n.top
  }, r = {
    x: n.width,
    y: n.height
  };
  return Rt(Object.keys(t).reduce(function(a, u) {
    return a[u] = ut(t[u], u === "width" || u === "height" ? 0 : i[e[u]], r[e[u]]), a;
  }, {}));
}
function N(t, n) {
  var e = t.getBoundingClientRect(), i = {
    left: e.left,
    top: e.top,
    width: e.width,
    height: e.height
  };
  if (i.left += window.pageXOffset, i.top += window.pageYOffset, n) {
    var r = window.getComputedStyle(t, ""), a = parseFloat(r.borderTopWidth) || 0, u = parseFloat(r.borderRightWidth) || 0, o = parseFloat(r.borderBottomWidth) || 0, l = parseFloat(r.borderLeftWidth) || 0;
    i.left += l, i.top += a, i.width -= l + u, i.height -= a + o;
  }
  return Rt(i);
}
function Ke(t, n) {
  var e = t.style;
  e.webkitTapHighlightColor = "transparent";
  var i = dt.getName("boxShadow"), r = window.getComputedStyle(t, "")[i];
  return (!r || r === "none") && (e[i] = "0 0 1px transparent"), n && p && (e[p] = "translateZ(0)"), t;
}
function bt(t, n) {
  lt == null && (_t !== !1 && (lt = dt.getValue("cursor", _t)), lt == null && (lt = !1)), t.style.cursor = lt === !1 ? n : lt;
}
function me(t) {
  Z == null && (Pt !== !1 && (Z = dt.getValue("cursor", Pt)), Z == null && (Z = !1)), Z !== !1 && (t.style.cursor = Z);
}
function Mt(t, n, e) {
  var i = t.svgPoint;
  return i.x = n, i.y = e, i.matrixTransform(t.svgCtmElement.getScreenCTM().inverse());
}
function Je(t, n) {
  var e = t.elementBBox;
  if (n.left !== e.left || n.top !== e.top) {
    var i = t.htmlOffset;
    return t.elementStyle[p] = "translate(".concat(n.left + i.left, "px, ").concat(n.top + i.top, "px)"), !0;
  }
  return !1;
}
function Qe(t, n) {
  var e = t.elementBBox, i = t.elementStyle, r = t.htmlOffset, a = !1;
  return n.left !== e.left && (i.left = n.left + r.left + "px", a = !0), n.top !== e.top && (i.top = n.top + r.top + "px", a = !0), a;
}
function Ye(t, n) {
  var e = t.elementBBox;
  if (n.left !== e.left || n.top !== e.top) {
    var i = t.svgOffset, r = t.svgOriginBBox, a = Mt(t, n.left - window.pageXOffset, n.top - window.pageYOffset);
    return t.svgTransform.setTranslate(a.x + i.x - r.x, a.y + i.y - r.y), !0;
  }
  return !1;
}
function Gt(t, n, e) {
  var i = t.elementBBox;
  function r() {
    t.minLeft >= t.maxLeft ? n.left = i.left : n.left < t.minLeft ? n.left = t.minLeft : n.left > t.maxLeft && (n.left = t.maxLeft), t.minTop >= t.maxTop ? n.top = i.top : n.top < t.minTop ? n.top = t.minTop : n.top > t.maxTop && (n.top = t.maxTop);
  }
  if (r(), e) {
    if (e(n) === !1)
      return !1;
    r();
  }
  var a = t.moveElm(t, n);
  return a && (t.elementBBox = Rt({
    left: n.left,
    top: n.top,
    width: i.width,
    height: i.height
  })), a;
}
function Xe(t) {
  var n = t.element, e = t.elementStyle, i = N(n), r = ["display", "marginTop", "marginBottom", "width", "height"];
  r.unshift(p);
  var a = e[st];
  e[st] = "none";
  var u = N(n);
  t.orgStyle ? r.forEach(function(d) {
    (t.lastStyle[d] == null || e[d] === t.lastStyle[d]) && (e[d] = t.orgStyle[d]);
  }) : (t.orgStyle = r.reduce(function(d, w) {
    return d[w] = e[w] || "", d;
  }, {}), t.lastStyle = {});
  var o = N(n), l = window.getComputedStyle(n, "");
  l.display === "inline" && (e.display = "inline-block", ["Top", "Bottom"].forEach(function(d) {
    var w = parseFloat(l["padding".concat(d)]);
    e["margin".concat(d)] = w ? "-".concat(w, "px") : "0";
  })), e[p] = "translate(0, 0)";
  var s = N(n), f = t.htmlOffset = {
    left: s.left ? -s.left : 0,
    top: s.top ? -s.top : 0
  };
  return e[p] = "translate(".concat(i.left + f.left, "px, ").concat(i.top + f.top, "px)"), ["width", "height"].forEach(function(d) {
    s[d] !== o[d] && (e[d] = o[d] + "px", s = N(n), s[d] !== o[d] && (e[d] = o[d] - (s[d] - o[d]) + "px")), t.lastStyle[d] = e[d];
  }), n.offsetWidth, e[st] = a, (u.left !== i.left || u.top !== i.top) && (e[p] = "translate(".concat(u.left + f.left, "px, ").concat(u.top + f.top, "px)")), u;
}
function pe(t) {
  var n = t.element, e = t.elementStyle, i = N(n), r = ["position", "marginTop", "marginRight", "marginBottom", "marginLeft", "width", "height"], a = e[st];
  e[st] = "none";
  var u = N(n);
  t.orgStyle ? r.forEach(function(f) {
    (t.lastStyle[f] == null || e[f] === t.lastStyle[f]) && (e[f] = t.orgStyle[f]);
  }) : (t.orgStyle = r.reduce(function(f, d) {
    return f[d] = e[d] || "", f;
  }, {}), t.lastStyle = {});
  var o = N(n);
  e.position = "absolute", e.left = e.top = e.margin = "0";
  var l = N(n), s = t.htmlOffset = {
    left: l.left ? -l.left : 0,
    top: l.top ? -l.top : 0
  };
  return e.left = i.left + s.left + "px", e.top = i.top + s.top + "px", ["width", "height"].forEach(function(f) {
    l[f] !== o[f] && (e[f] = o[f] + "px", l = N(n), l[f] !== o[f] && (e[f] = o[f] - (l[f] - o[f]) + "px")), t.lastStyle[f] = e[f];
  }), n.offsetWidth, e[st] = a, (u.left !== i.left || u.top !== i.top) && (e.left = u.left + s.left + "px", e.top = u.top + s.top + "px"), u;
}
function tn(t) {
  var n = t.element, e = t.svgTransform, i = n.getBoundingClientRect(), r = N(n);
  e.setTranslate(0, 0);
  var a = t.svgOriginBBox = n.getBBox(), u = n.getBoundingClientRect(), o = Mt(t, u.left, u.top), l = t.svgOffset = {
    x: a.x - o.x,
    y: a.y - o.y
  }, s = Mt(t, i.left, i.top);
  return e.setTranslate(s.x + l.x - a.x, s.y + l.y - a.y), r;
}
function Nt(t, n) {
  var e = N(document.documentElement), i = t.elementBBox = t.initElm(t), r = t.containmentBBox = t.containmentIsBBox ? ne(t.options.containment, e) || e : N(t.options.containment, !0);
  if (t.minLeft = r.left, t.maxLeft = r.right - i.width, t.minTop = r.top, t.maxTop = r.bottom - i.height, Gt(t, {
    left: i.left,
    top: i.top
  }), t.parsedSnapTargets) {
    var a = {
      x: i.width,
      y: i.height
    }, u = {
      x: t.minLeft,
      y: t.minTop
    }, o = {
      x: t.maxLeft,
      y: t.maxTop
    }, l = {
      left: "x",
      right: "x",
      x: "x",
      width: "x",
      xStart: "x",
      xEnd: "x",
      xStep: "x",
      top: "y",
      bottom: "y",
      y: "y",
      height: "y",
      yStart: "y",
      yEnd: "y",
      yStep: "y"
    }, s = t.parsedSnapTargets.reduce(function(V, h) {
      var m = h.base === "containment" ? r : e, I = {
        x: m.left,
        y: m.top
      }, D = {
        x: m.width,
        y: m.height
      };
      function R(c) {
        if (c.center == null && (c.center = h.center), c.xGravity == null && (c.xGravity = h.gravity), c.yGravity == null && (c.yGravity = h.gravity), c.x != null && c.y != null)
          c.x = ut(c.x, I.x, D.x), c.y = ut(c.y, I.y, D.y), c.center && (c.x -= a.x / 2, c.y -= a.y / 2, c.corners = ["tl"]), (c.corners || h.corners).forEach(function(B) {
            var T = c.x - (B === "tr" || B === "br" ? a.x : 0), _ = c.y - (B === "bl" || B === "br" ? a.y : 0);
            if (T >= u.x && T <= o.x && _ >= u.y && _ <= o.y) {
              var et = {
                x: T,
                y: _
              }, vt = T - c.xGravity, Vt = T + c.xGravity, $t = _ - c.yGravity, qt = _ + c.yGravity;
              vt > u.x && (et.gravityXStart = vt), Vt < o.x && (et.gravityXEnd = Vt), $t > u.y && (et.gravityYStart = $t), qt < o.y && (et.gravityYEnd = qt), V.push(et);
            }
          });
        else {
          var y = c.x != null ? "x" : "y", S = y === "x" ? "y" : "x", v = "".concat(S, "Start"), x = "".concat(S, "End"), M = "".concat(y, "Gravity"), k = y.toUpperCase(), z = S.toUpperCase(), A = "gravity".concat(k, "Start"), H = "gravity".concat(k, "End"), $ = "gravity".concat(z, "Start"), Q = "gravity".concat(z, "End");
          if (c[y] = ut(c[y], I[y], D[y]), c[v] = ut(c[v], I[S], D[S]), c[x] = ut(c[x], I[S], D[S]) - a[S], c[v] > c[x] || c[v] > o[S] || c[x] < u[S])
            return;
          c.center && (c[y] -= a[y] / 2, c.sides = ["start"]), (c.sides || h.sides).forEach(function(B) {
            var T = c[y] - (B === "end" ? a[y] : 0);
            if (T >= u[y] && T <= o[y]) {
              var _ = {}, et = T - c[M], vt = T + c[M];
              _[y] = T, et > u[y] && (_[A] = et), vt < o[y] && (_[H] = vt), c[v] > u[S] && (_[$] = c[v]), c[x] < o[S] && (_[Q] = c[x]), V.push(_);
            }
          });
        }
      }
      var P;
      if ((P = h.element ? N(h.element) : null) || h.ppBBox)
        h.ppBBox && (P = ne(h.ppBBox, m)), P && h.edges.forEach(function(c) {
          var y = h.gravity, S = h.gravity;
          c === "outside" && (y += i.width, S += i.height);
          var v = P.left - y, x = P.right + y, M = P.top - S, k = P.bottom + S, z = c === "inside" ? "start" : "end";
          R({
            xStart: v,
            xEnd: x,
            y: P.top,
            sides: [z],
            center: !1
          }), R({
            x: P.left,
            yStart: M,
            yEnd: k,
            sides: [z],
            center: !1
          }), z = c === "inside" ? "end" : "start", R({
            xStart: v,
            xEnd: x,
            y: P.bottom,
            sides: [z],
            center: !1
          }), R({
            x: P.right,
            yStart: M,
            yEnd: k,
            sides: [z],
            center: !1
          });
        });
      else {
        var b = [["x", "y", "xStart", "xEnd", "xStep", "yStart", "yEnd", "yStep"].reduce(function(c, y) {
          return h[y] && (c[y] = ut(h[y], y === "xStep" || y === "yStep" ? 0 : I[l[y]], D[l[y]])), c;
        }, {})];
        ["x", "y"].forEach(function(c) {
          var y = "".concat(c, "Start"), S = "".concat(c, "End"), v = "".concat(c, "Step"), x = "".concat(c, "Gravity");
          b = b.reduce(function(M, k) {
            var z = k[y], A = k[S], H = k[v];
            if (z != null && A != null && z >= A)
              return M;
            if (H != null) {
              if (H < 2)
                return M;
              var $ = H / 2;
              $ = h.gravity > $ ? $ : null;
              for (var Q = z; Q <= A; Q += H) {
                var B = Object.keys(k).reduce(function(T, _) {
                  return _ !== y && _ !== S && _ !== v && (T[_] = k[_]), T;
                }, {});
                B[c] = Q, B[x] = $, M.push(B);
              }
            } else
              M.push(k);
            return M;
          }, []);
        }), b.forEach(function(c) {
          R(c);
        });
      }
      return V;
    }, []);
    t.snapTargets = s.length ? s : null;
  }
  var f = {}, d = t.options.autoScroll;
  if (d) {
    f.isWindow = d.target === window, f.target = d.target;
    var w = n === "scroll", C = Ze(d.target, f.isWindow, w), tt = Rt({
      left: C.clientX,
      top: C.clientY,
      width: C.clientWidth,
      height: C.clientHeight
    });
    w ? t.autoScroll && (f.scrollWidth = t.autoScroll.scrollWidth, f.scrollHeight = t.autoScroll.scrollHeight) : (f.scrollWidth = C.scrollWidth, f.scrollHeight = C.scrollHeight), [["X", "Width", "left", "right"], ["Y", "Height", "top", "bottom"]].forEach(function(V) {
      var h = V[0], m = V[1], I = V[2], D = V[3], R = (f["scroll".concat(m)] || 0) - C["client".concat(m)], P = d["min".concat(h)] || 0, b = L(d["max".concat(h)]) ? d["max".concat(h)] : R;
      if (P < b && P < R) {
        b > R && (b = R);
        for (var c = [], y = i[m.toLowerCase()], S = d.sensitivity.length - 1; S >= 0; S--) {
          var v = d.sensitivity[S], x = d.speed[S];
          c.push({
            dir: -1,
            speed: x,
            position: tt[I] + v
          }), c.push({
            dir: 1,
            speed: x,
            position: tt[D] - v - y
          });
        }
        f[h.toLowerCase()] = {
          min: P,
          max: b,
          lines: c
        };
      }
    });
  }
  t.autoScroll = f.x || f.y ? f : null;
}
function jt(t) {
  It.stop(), bt(t.options.handle, t.orgCursor), G.style.cursor = Bt, t.options.zIndex !== !1 && (t.elementStyle.zIndex = t.orgZIndex), W && (G.style[W] = se);
  var n = F(t.element);
  X && n.remove(X), Y && n.remove(Y), E = null, J.cancel(), t.onDragEnd && t.onDragEnd({
    left: t.elementBBox.left,
    top: t.elementBBox.top
  });
}
function en(t, n) {
  return t.disabled || t.onDragStart && t.onDragStart(n) === !1 ? !1 : (E && jt(E), me(t.options.handle), G.style.cursor = Z || window.getComputedStyle(t.options.handle, "").cursor, t.options.zIndex !== !1 && (t.elementStyle.zIndex = t.options.zIndex), W && (G.style[W] = "none"), Y && F(t.element).add(Y), E = t, Ht = !1, Dt.left = t.elementBBox.left - (n.clientX + window.pageXOffset), Dt.top = t.elementBBox.top - (n.clientY + window.pageYOffset), !0);
}
function U(t, n) {
  var e = t.options, i;
  if (n.containment) {
    var r;
    ct(n.containment) ? n.containment !== e.containment && (e.containment = n.containment, t.containmentIsBBox = !1, i = !0) : (r = Wt(at(n.containment))) && mt(r, e.containment) && (e.containment = r, t.containmentIsBBox = !0, i = !0);
  }
  function a(h, m) {
    function I(v) {
      return typeof v == "string" ? v.replace(/[, ]+/g, " ").trim().toLowerCase() : null;
    }
    L(m.gravity) && m.gravity > 0 && (h.gravity = m.gravity);
    var D = I(m.corner);
    if (D) {
      if (D !== "all") {
        var R = {}, P = D.split(/\s/).reduce(function(v, x) {
          return x = x.trim().replace(/^(.).*?-(.).*$/, "$1$2"), (x = x === "tl" || x === "lt" ? "tl" : x === "tr" || x === "rt" ? "tr" : x === "bl" || x === "lb" ? "bl" : x === "br" || x === "rb" ? "br" : null) && !R[x] && (v.push(x), R[x] = !0), v;
        }, []), b = P.length;
        D = b ? b === 4 ? "all" : P.join(" ") : null;
      }
      D && (h.corner = D);
    }
    var c = I(m.side);
    c && (c === "start" || c === "end" || c === "both" ? h.side = c : (c === "start end" || c === "end start") && (h.side = "both")), typeof m.center == "boolean" && (h.center = m.center);
    var y = I(m.edge);
    y && (y === "inside" || y === "outside" || y === "both" ? h.edge = y : (y === "inside outside" || y === "outside inside") && (h.edge = "both"));
    var S = typeof m.base == "string" ? m.base.trim().toLowerCase() : null;
    return S && (S === "containment" || S === "document") && (h.base = S), h;
  }
  if (n.snap != null) {
    var u = K(n.snap) && n.snap.targets != null ? n.snap : {
      targets: n.snap
    }, o = [], l = a({
      targets: o
    }, u);
    l.gravity || (l.gravity = ke), l.corner || (l.corner = Fe), l.side || (l.side = We), typeof l.center != "boolean" && (l.center = !1), l.edge || (l.edge = Me), l.base || (l.base = ze);
    var s = (Array.isArray(u.targets) ? u.targets : [u.targets]).reduce(function(h, m) {
      if (m == null)
        return h;
      var I = ct(m), D = Wt(at(m)), R = I || D ? {
        boundingBox: m
      } : K(m) && m.start == null && m.end == null && m.step == null ? m : {
        x: m,
        y: m
      }, P = [], b = {}, c = R.boundingBox, y;
      if (I || ct(c))
        P.push({
          element: c
        }), b.boundingBox = c;
      else if (y = D || Wt(at(c)))
        P.push({
          ppBBox: y
        }), b.boundingBox = he(y);
      else {
        var S, v = ["x", "y"].reduce(function(A, H) {
          var $ = R[H], Q;
          if (Q = q($))
            A[H] = Q, b[H] = St(Q);
          else {
            var B, T, _;
            K($) && (B = q($.start), T = q($.end), _ = q($.step), B && T && B.isRatio === T.isRatio && B.value >= T.value && (S = !0)), B = A["".concat(H, "Start")] = B || {
              value: 0,
              isRatio: !1
            }, T = A["".concat(H, "End")] = T || {
              value: 1,
              isRatio: !0
            }, b[H] = {
              start: St(B),
              end: St(T)
            }, _ && ((_.isRatio ? _.value > 0 : _.value >= 2) ? (A["".concat(H, "Step")] = _, b[H].step = St(_)) : S = !0);
          }
          return A;
        }, {});
        if (S)
          return h;
        v.xStart && !v.xStep && v.yStart && !v.yStep ? P.push(
          {
            xStart: v.xStart,
            xEnd: v.xEnd,
            y: v.yStart
          },
          {
            xStart: v.xStart,
            xEnd: v.xEnd,
            y: v.yEnd
          },
          {
            x: v.xStart,
            yStart: v.yStart,
            yEnd: v.yEnd
          },
          {
            x: v.xEnd,
            yStart: v.yStart,
            yEnd: v.yEnd
          }
        ) : P.push(v);
      }
      if (P.length) {
        o.push(a(b, R));
        var x = b.corner || l.corner, M = b.side || l.side, k = b.edge || l.edge, z = {
          gravity: b.gravity || l.gravity,
          base: b.base || l.base,
          center: typeof b.center == "boolean" ? b.center : l.center,
          corners: x === "all" ? Ae : x.split(" "),
          sides: M === "both" ? Ue : [M],
          edges: k === "both" ? Ge : [k]
        };
        P.forEach(function(A) {
          ["gravity", "corners", "sides", "center", "edges", "base"].forEach(function(H) {
            A[H] = z[H];
          }), h.push(A);
        });
      }
      return h;
    }, []);
    s.length && (e.snap = l, mt(s, t.parsedSnapTargets) && (t.parsedSnapTargets = s, i = !0));
  } else
    n.hasOwnProperty("snap") && t.parsedSnapTargets && (e.snap = t.parsedSnapTargets = t.snapTargets = void 0);
  if (n.autoScroll) {
    var f = K(n.autoScroll) ? n.autoScroll : {
      target: n.autoScroll === !0 ? window : n.autoScroll
    }, d = {};
    d.target = ct(f.target) ? f.target : window, d.speed = [], (Array.isArray(f.speed) ? f.speed : [f.speed]).every(function(h, m) {
      return m <= 2 && L(h) ? (d.speed[m] = h, !0) : !1;
    }), d.speed.length || (d.speed = Ne);
    var w = Array.isArray(f.sensitivity) ? f.sensitivity : [f.sensitivity];
    d.sensitivity = d.speed.map(function(h, m) {
      return L(w[m]) ? w[m] : je[m];
    }), ["X", "Y"].forEach(function(h) {
      var m = "min".concat(h), I = "max".concat(h);
      L(f[m]) && f[m] >= 0 && (d[m] = f[m]), L(f[I]) && f[I] >= 0 && (!d[m] || f[I] >= d[m]) && (d[I] = f[I]);
    }), mt(d, e.autoScroll) && (e.autoScroll = d, i = !0);
  } else
    n.hasOwnProperty("autoScroll") && (e.autoScroll && (i = !0), e.autoScroll = void 0);
  if (i && Nt(t), ct(n.handle) && n.handle !== e.handle) {
    e.handle && (e.handle.style.cursor = t.orgCursor, W && (e.handle.style[W] = t.orgUserSelect), J.removeStartHandler(e.handle, t.pointerEventHandlerId));
    var C = e.handle = n.handle;
    t.orgCursor = C.style.cursor, bt(C, t.orgCursor), W && (t.orgUserSelect = C.style[W], C.style[W] = "none"), J.addStartHandler(C, t.pointerEventHandlerId);
  }
  (L(n.zIndex) || n.zIndex === !1) && (e.zIndex = n.zIndex, t === E && (t.elementStyle.zIndex = e.zIndex === !1 ? t.orgZIndex : e.zIndex));
  var tt = {
    left: t.elementBBox.left,
    top: t.elementBBox.top
  }, V;
  L(n.left) && n.left !== tt.left && (tt.left = n.left, V = !0), L(n.top) && n.top !== tt.top && (tt.top = n.top, V = !0), V && Gt(t, tt), ["onDrag", "onMove", "onDragStart", "onMoveStart", "onDragEnd"].forEach(function(h) {
    typeof n[h] == "function" ? (e[h] = n[h], t[h] = e[h].bind(t.ins)) : n.hasOwnProperty(h) && n[h] == null && (e[h] = t[h] = void 0);
  });
}
var nn = /* @__PURE__ */ function() {
  function t(n, e) {
    He(this, t);
    var i = {
      ins: this,
      options: {
        zIndex: Re
      },
      disabled: !1
    };
    if (Object.defineProperty(this, "_id", {
      value: ++qe
    }), i._id = this._id, g[this._id] = i, !ct(n) || n === G)
      throw new Error("This element is not accepted.");
    if (!e)
      e = {};
    else if (!K(e))
      throw new Error("Invalid options.");
    var r = !0, a;
    if (n instanceof SVGElement && (a = n.ownerSVGElement)) {
      if (!n.getBBox)
        throw new Error("This element is not accepted. (SVGLocatable)");
      if (!n.transform)
        throw new Error("This element is not accepted. (SVGAnimatedTransformList)");
      i.svgTransform = n.transform.baseVal.appendItem(a.createSVGTransform()), i.svgPoint = a.createSVGPoint();
      var u = n.nearestViewportElement;
      i.svgCtmElement = Ut ? u.appendChild(document.createElementNS(a.namespaceURI, "rect")) : u, r = !1, i.initElm = tn, i.moveElm = Ye;
    } else {
      var o = dt.getName("willChange");
      o && (r = !1), !e.leftTop && p ? (o && (n.style[o] = "transform"), i.initElm = Xe, i.moveElm = Je) : (o && (n.style[o] = "left, top"), i.initElm = pe, i.moveElm = Qe);
    }
    if (i.element = Ke(n, r), i.elementStyle = n.style, i.orgZIndex = i.elementStyle.zIndex, O && F(n).add(O), i.pointerEventHandlerId = J.regStartHandler(function(s) {
      return en(i, s);
    }), !e.containment) {
      var l;
      e.containment = (l = n.parentNode) && ct(l) ? l : G;
    }
    e.handle || (e.handle = n), U(i, e);
  }
  return Be(t, [{
    key: "remove",
    value: function() {
      var e = g[this._id];
      this.disabled = !0, J.unregStartHandler(J.removeStartHandler(e.options.handle, e.pointerEventHandlerId)), delete g[this._id];
    }
  }, {
    key: "setOptions",
    value: function(e) {
      return K(e) && U(g[this._id], e), this;
    }
  }, {
    key: "position",
    value: function() {
      return Nt(g[this._id]), this;
    }
  }, {
    key: "disabled",
    get: function() {
      return g[this._id].disabled;
    },
    set: function(e) {
      var i = g[this._id];
      (e = !!e) !== i.disabled && (i.disabled = e, i.disabled ? (i === E && jt(i), i.options.handle.style.cursor = i.orgCursor, W && (i.options.handle.style[W] = i.orgUserSelect), O && F(i.element).remove(O)) : (bt(i.options.handle, i.orgCursor), W && (i.options.handle.style[W] = "none"), O && F(i.element).add(O)));
    }
  }, {
    key: "element",
    get: function() {
      return g[this._id].element;
    }
  }, {
    key: "rect",
    get: function() {
      return at(g[this._id].elementBBox);
    }
  }, {
    key: "left",
    get: function() {
      return g[this._id].elementBBox.left;
    },
    set: function(e) {
      U(g[this._id], {
        left: e
      });
    }
  }, {
    key: "top",
    get: function() {
      return g[this._id].elementBBox.top;
    },
    set: function(e) {
      U(g[this._id], {
        top: e
      });
    }
  }, {
    key: "containment",
    get: function() {
      var e = g[this._id];
      return e.containmentIsBBox ? he(e.options.containment) : e.options.containment;
    },
    set: function(e) {
      U(g[this._id], {
        containment: e
      });
    }
  }, {
    key: "snap",
    get: function() {
      return at(g[this._id].options.snap);
    },
    set: function(e) {
      U(g[this._id], {
        snap: e
      });
    }
  }, {
    key: "autoScroll",
    get: function() {
      return at(g[this._id].options.autoScroll);
    },
    set: function(e) {
      U(g[this._id], {
        autoScroll: e
      });
    }
  }, {
    key: "handle",
    get: function() {
      return g[this._id].options.handle;
    },
    set: function(e) {
      U(g[this._id], {
        handle: e
      });
    }
  }, {
    key: "zIndex",
    get: function() {
      return g[this._id].options.zIndex;
    },
    set: function(e) {
      U(g[this._id], {
        zIndex: e
      });
    }
  }, {
    key: "onDrag",
    get: function() {
      return g[this._id].options.onDrag;
    },
    set: function(e) {
      U(g[this._id], {
        onDrag: e
      });
    }
  }, {
    key: "onMove",
    get: function() {
      return g[this._id].options.onMove;
    },
    set: function(e) {
      U(g[this._id], {
        onMove: e
      });
    }
  }, {
    key: "onDragStart",
    get: function() {
      return g[this._id].options.onDragStart;
    },
    set: function(e) {
      U(g[this._id], {
        onDragStart: e
      });
    }
  }, {
    key: "onMoveStart",
    get: function() {
      return g[this._id].options.onMoveStart;
    },
    set: function(e) {
      U(g[this._id], {
        onMoveStart: e
      });
    }
  }, {
    key: "onDragEnd",
    get: function() {
      return g[this._id].options.onDragEnd;
    },
    set: function(e) {
      U(g[this._id], {
        onDragEnd: e
      });
    }
  }], [{
    key: "draggableCursor",
    get: function() {
      return _t;
    },
    set: function(e) {
      _t !== e && (_t = e, lt = null, Object.keys(g).forEach(function(i) {
        var r = g[i];
        r.disabled || r === E && Z !== !1 || (bt(r.options.handle, r.orgCursor), r === E && (G.style.cursor = Bt, G.style.cursor = window.getComputedStyle(r.options.handle, "").cursor));
      }));
    }
  }, {
    key: "draggingCursor",
    get: function() {
      return Pt;
    },
    set: function(e) {
      Pt !== e && (Pt = e, Z = null, E && (me(E.options.handle), Z === !1 && (bt(E.options.handle, E.orgCursor), G.style.cursor = Bt), G.style.cursor = Z || window.getComputedStyle(E.options.handle, "").cursor));
    }
  }, {
    key: "draggableClass",
    get: function() {
      return O;
    },
    set: function(e) {
      e = e ? e + "" : void 0, e !== O && (Object.keys(g).forEach(function(i) {
        var r = g[i];
        if (!r.disabled) {
          var a = F(r.element);
          O && a.remove(O), e && a.add(e);
        }
      }), O = e);
    }
  }, {
    key: "draggingClass",
    get: function() {
      return Y;
    },
    set: function(e) {
      if (e = e ? e + "" : void 0, e !== Y) {
        if (E) {
          var i = F(E.element);
          Y && i.remove(Y), e && i.add(e);
        }
        Y = e;
      }
    }
  }, {
    key: "movingClass",
    get: function() {
      return X;
    },
    set: function(e) {
      if (e = e ? e + "" : void 0, e !== X) {
        if (E && Ht) {
          var i = F(E.element);
          X && i.remove(X), e && i.add(e);
        }
        X = e;
      }
    }
  }]), t;
}();
J.addMoveHandler(document, function(t) {
  if (!!E) {
    var n = {
      left: t.clientX + window.pageXOffset + Dt.left,
      top: t.clientY + window.pageYOffset + Dt.top
    };
    if (Gt(
      E,
      n,
      E.snapTargets ? function(a) {
        var u = E.snapTargets.length, o = !1, l = !1, s;
        for (s = 0; s < u && (!o || !l); s++) {
          var f = E.snapTargets[s];
          (f.gravityXStart == null || a.left >= f.gravityXStart) && (f.gravityXEnd == null || a.left <= f.gravityXEnd) && (f.gravityYStart == null || a.top >= f.gravityYStart) && (f.gravityYEnd == null || a.top <= f.gravityYEnd) && (!o && f.x != null && (a.left = f.x, o = !0, s = -1), !l && f.y != null && (a.top = f.y, l = !0, s = -1));
        }
        return a.snapped = o || l, E.onDrag ? E.onDrag(a) : !0;
      } : E.onDrag
    )) {
      var e = {}, i = E.autoScroll;
      if (i) {
        var r = {
          x: E.elementBBox.left - window.pageXOffset,
          y: E.elementBBox.top - window.pageYOffset
        };
        ["x", "y"].forEach(function(a) {
          if (i[a]) {
            var u = i[a].min, o = i[a].max;
            i[a].lines.some(function(l) {
              return (l.dir === -1 ? r[a] <= l.position : r[a] >= l.position) ? (e[a] = {
                dir: l.dir,
                speed: l.speed / 1e3,
                min: u,
                max: o
              }, !0) : !1;
            });
          }
        });
      }
      e.x || e.y ? (It.move(i.target, e, i.isWindow ? ft : ot), n.autoScroll = !0) : It.stop(), Ht || (Ht = !0, X && F(E.element).add(X), E.onMoveStart && E.onMoveStart(n)), E.onMove && E.onMove(n);
    }
  }
});
{
  let t = function() {
    E && jt(E);
  };
  J.addEndHandler(document, t), J.addCancelHandler(document, t);
}
{
  let t = function() {
    st = dt.getName("transitionProperty"), p = dt.getName("transform"), Bt = G.style.cursor, (W = dt.getName("userSelect")) && (se = G.style[W]);
    var n = 200, e = {}, i;
    function r(l, s) {
      l.initElm && Nt(l, s);
    }
    function a(l) {
      clearTimeout(i), Object.keys(g).forEach(function(s) {
        e[s] || r(g[s], l);
      }), e = {};
    }
    var u = !1, o = ae.add(function(l) {
      u || (u = !0, E && (r(E, l.type), J.move(), e[E._id] = !0), clearTimeout(i), i = setTimeout(function() {
        a(l.type);
      }, n), u = !1);
    });
    window.addEventListener("resize", o, !0), window.addEventListener("scroll", o, !0);
  };
  (G = document.body) ? t() : document.addEventListener("DOMContentLoaded", function() {
    G = document.body, t();
  }, !0);
}
export {
  nn as default
};
