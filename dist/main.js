module.exports = (function(e) {
  var r = {};
  function n(t) {
    if (r[t]) return r[t].exports;
    var o = (r[t] = { i: t, l: !1, exports: {} });
    return e[t].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  return (
    (n.m = e),
    (n.c = r),
    (n.d = function(e, r, t) {
      n.o(e, r) ||
        Object.defineProperty(e, r, {
          configurable: !1,
          enumerable: !0,
          get: t
        });
    }),
    (n.r = function(e) {
      Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.n = function(e) {
      var r =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(r, "a", r), r;
    }),
    (n.o = function(e, r) {
      return Object.prototype.hasOwnProperty.call(e, r);
    }),
    (n.p = "/"),
    n((n.s = 3))
  );
})([
  function(e, r) {
    e.exports = require("@most/scheduler");
  },
  function(e, r) {
    e.exports = require("symbol-observable");
  },
  function(e, r, n) {
    "use strict";
    n.r(r);
    var t = n(1),
      o = n.n(t),
      u = n(0);
    function i(e, r) {
      for (var n = 0; n < r.length; n++) {
        var t = r[n];
        (t.enumerable = t.enumerable || !1),
          (t.configurable = !0),
          "value" in t && (t.writable = !0),
          Object.defineProperty(e, t.key, t);
      }
    }
    var c = (function() {
      function e(r) {
        !(function(e, r) {
          if (!(e instanceof r))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.observable = r);
      }
      return (
        (function(e, r, n) {
          r && i(e.prototype, r), n && i(e, n);
        })(e, [
          {
            key: "run",
            value: function(e, r) {
              var n = (function(e) {
                if (e) {
                  var r = e[o.a];
                  if ("function" == typeof r) {
                    var n = r.call(e);
                    if (!n || "function" != typeof n.subscribe)
                      throw new TypeError("invalid observable " + n);
                    return n;
                  }
                }
              })(this.observable).subscribe({
                next: function(n) {
                  return (function(e, r, n) {
                    try {
                      n.event(e, r);
                    } catch (r) {
                      n.error(e, r);
                    }
                  })(Object(u.currentTime)(r), n, e);
                },
                error: function(n) {
                  return e.error(Object(u.currentTime)(r), n);
                },
                complete: function() {
                  return e.end(Object(u.currentTime)(r));
                }
              });
              return {
                dispose: function() {
                  return n.unsubscribe();
                }
              };
            }
          }
        ]),
        e
      );
    })();
    r.default = function(e) {
      return new c(e);
    };
  },
  function(e, r, n) {
    e.exports = n(2);
  }
]);
