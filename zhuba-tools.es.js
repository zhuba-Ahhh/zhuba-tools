function t(r, e) {
  return typeof r != "number" ? r : typeof e != "number" ? e : r + e;
}
export {
  t as stSum
};
