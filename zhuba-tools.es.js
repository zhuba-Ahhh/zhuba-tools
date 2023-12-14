const u = (e) => e.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2"), a = (e = 6, o = "u_") => {
  const n = "abcdefhijkmnprstwxyz0123456789", l = n.length;
  let t = "";
  for (let r = 0; r < e; r++)
    t += n.charAt(Math.floor(Math.random() * l));
  return o + t;
}, i = (e) => Object.prototype.toString.call(e).slice(8, -1).toLowerCase(), p = (e, o = 1e3, n = !1) => {
  let l = null;
  return (...t) => {
    const r = () => {
      l = null, n || e.apply(void 0, t);
    }, s = n && !l;
    l && clearTimeout(l), l = setTimeout(r, o), s && e.apply(void 0, t);
  };
}, c = (e, o = 2) => (Math.round((parseFloat(e) + Number.EPSILON) * Math.pow(10, o)) / Math.pow(10, o)).toFixed(o), d = {
  // 格式化金额展示： 12341234.246 -> $ 12,341,234.25
  formatMoney: (e, o = "", n = 2) => c(e, n).replace(/\B(?=(\d{3})+\b)/g, ",").replace(/^/, `${o}`)
}, f = (e) => {
  e.requestFullscreen();
}, h = () => {
  document.exitFullscreen();
}, y = (e, o = 1e3, n = !1) => {
  let l = 0, t = null;
  return (...r) => {
    const s = +/* @__PURE__ */ new Date();
    n && !t && (e.apply(void 0, r), n = !1), s - l > o ? (t && (clearTimeout(t), t = null), l = s, e.apply(void 0, r)) : !t && !n && (t = setTimeout(
      () => {
        t = null, l = +/* @__PURE__ */ new Date(), e.apply(void 0, r);
      },
      o - (s - l)
    ));
  };
}, m = (e) => /^[1][3,4,5,7,8][0-9]{9}$/.test(e), x = (e) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
  e
), w = (e) => /^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/.test(e);
export {
  x as IDCardCheck,
  p as debounce,
  w as emailCheck,
  h as exitFullscreen,
  d as format,
  c as formatToFixed,
  u as hideMobile,
  f as launchFullscreen,
  m as mobileCheck,
  y as throttle,
  i as typeOf,
  a as uuid
};
