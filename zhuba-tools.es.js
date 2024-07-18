import { useEffect, useRef, useCallback } from "react";
const foreachTree = (data, callback, childrenName = "children", depth = 0, parent) => {
  for (const item of data) {
    callback(item, depth, parent);
    if (item[childrenName] && Array.isArray(item[childrenName])) {
      foreachTree(item[childrenName], callback, childrenName, depth + 1, item);
    }
  }
};
const fuzzyQuery = (list, keyWords, attributes = "name") => {
  const regexes = Array.isArray(keyWords) ? keyWords.map((kw) => new RegExp(kw)) : [new RegExp(keyWords)];
  const attrs = Array.isArray(attributes) ? attributes : [attributes];
  const resultSet = /* @__PURE__ */ new Set();
  for (const item of list) {
    for (const attr of attrs) {
      for (const regex of regexes) {
        if (regex.test(String(item[attr]))) {
          resultSet.add(item);
          break;
        }
      }
    }
  }
  return Array.from(resultSet);
};
const noRepeat = (arr) => {
  if (!arr) {
    return [];
  }
  return [...new Set(arr)];
};
const quickSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }
  const left = [], right = [], cur = arr.splice(0, 1);
  for (const item of arr) {
    item > cur ? right.push(item) : left.push(item);
  }
  return quickSort(left).concat(cur, quickSort(right));
};
const turnCase = (str, type = 1) => {
  if (typeof str !== "string") {
    throw new Error("Input must be a string");
  }
  if (str.length === 0) {
    return str;
  }
  switch (type) {
    case 1:
      return str.toUpperCase();
    case 2:
      return str.toLowerCase();
    case 3:
      return str[0].toUpperCase() + str.substring(1).toLowerCase();
    default:
      return str;
  }
};
const copyTableDataListener = (options) => {
  const defaultCleanupFunction = (text) => {
    return text.replace(/\s+/g, " ");
  };
  const cleanupFunction = (options == null ? void 0 : options.cleanupFunction) || defaultCleanupFunction;
  const onCopyTableData = (event) => {
    var _a;
    const selection = (_a = window.getSelection()) == null ? void 0 : _a.toString();
    if (selection) {
      const cleanedText = cleanupFunction(selection);
      event.preventDefault();
      navigator.clipboard.writeText(cleanedText).catch((err) => {
        console.error("Failed to copy text: ", err);
      });
    }
  };
  document.addEventListener("copy", onCopyTableData);
  return () => {
    document.removeEventListener("copy", onCopyTableData);
  };
};
const createScrollControl = () => {
  let scrollTop = 0;
  let originalStyle = null;
  const setBodyStyle = (style) => {
    const bodyStyle = document.body.style;
    Object.assign(bodyStyle, style);
  };
  const preventScroll = () => {
    scrollTop = window.scrollY;
    originalStyle = document.body.style.cssText ? { ...document.body.style } : null;
    setBodyStyle({
      overflowY: "hidden",
      position: "fixed",
      width: "100%",
      top: -scrollTop + "px"
    });
  };
  const recoverScroll = () => {
    if (originalStyle !== null) {
      setBodyStyle(originalStyle);
    } else {
      setBodyStyle({
        overflowY: "",
        position: "",
        width: "",
        top: ""
      });
    }
    window.scrollTo(0, scrollTop);
  };
  return { preventScroll, recoverScroll };
};
const getBatteryStatus = async () => {
  if (!navigator.getBattery) {
    throw new Error("Battery status is not supported by this browser.");
  }
  const battery = await navigator.getBattery();
  return {
    charging: battery.charging,
    chargingTime: battery.chargingTime,
    dischargingTime: battery.dischargingTime,
    level: battery.level
  };
};
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy, altitude, altitudeAccuracy, speed, heading } = position.coords;
        resolve({
          timestamp: position.timestamp,
          latitude,
          longitude,
          accuracy,
          altitude,
          altitudeAccuracy,
          speed,
          heading
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};
var OSType = /* @__PURE__ */ ((OSType2) => {
  OSType2[OSType2["IOS"] = 1] = "IOS";
  OSType2[OSType2["Android"] = 2] = "Android";
  OSType2[OSType2["Windows"] = 3] = "Windows";
  OSType2[OSType2["MacOS"] = 4] = "MacOS";
  OSType2[OSType2["Other"] = 5] = "Other";
  return OSType2;
})(OSType || {});
const getOSType = () => {
  const userAgent = navigator.userAgent;
  const isAndroid = userAgent.includes("Android") || userAgent.includes("Linux");
  const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const isWindows = userAgent.includes("Windows");
  const isMacOS = userAgent.includes("Macintosh");
  if (isIOS) {
    return 1;
  }
  if (isAndroid) {
    return 2;
  }
  if (isWindows) {
    return 3;
  }
  if (isMacOS) {
    return 4;
  }
  return 5;
};
const getURLParameters = (url) => {
  return (url.match(/([^?=&]+)(=([^&]*))/g) ?? []).reduce(
    (params, param) => {
      const [key, value] = param.split("=");
      params[key] = decodeURIComponent(value);
      return params;
    },
    {}
  );
};
const parseUrl = (url) => {
  const queryStart = url.indexOf("?");
  const queryParams = new URLSearchParams(queryStart >= 0 ? url.substring(queryStart) : "");
  const obj = {};
  queryParams.forEach((value, key) => {
    obj[key] = /^\d+(\.\d+)?$/.test(value) ? parseFloat(value) : decodeURIComponent(value);
  });
  return obj;
};
const scrollTo = (target = 0, speed = 8) => {
  const targetPosition = target === -1 ? document.documentElement.scrollHeight - window.innerHeight : target;
  const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  if ((target === -1 || scrollPosition < targetPosition) && scrollPosition < document.documentElement.scrollHeight - window.innerHeight) {
    window.requestAnimationFrame(() => {
      scrollTo(target, speed);
    });
    window.scrollTo(0, scrollPosition + (targetPosition - scrollPosition) / speed);
  } else if (scrollPosition > targetPosition) {
    window.requestAnimationFrame(() => {
      scrollTo(target, speed);
    });
    window.scrollTo(0, scrollPosition - (scrollPosition - targetPosition) / speed);
  }
};
const bottomVisible = () => {
  return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
};
const launchFullscreen = (element) => {
  if (element == null ? void 0 : element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element == null ? void 0 : element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element == null ? void 0 : element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element == null ? void 0 : element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
};
const exitFullscreen = () => {
  if (document == null ? void 0 : document.exitFullscreen) {
    document.exitFullscreen();
  }
};
const smoothScroll = (element) => {
  var _a;
  (_a = document.querySelector(element)) == null ? void 0 : _a.scrollIntoView({
    behavior: "smooth"
  });
};
const useBeforeUnload = (dep = []) => {
  useEffect(() => {
    const beforeunload = (e) => {
      if (dep.some((condition) => condition)) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeunload);
    return () => {
      window.removeEventListener("beforeunload", beforeunload);
    };
  }, [dep]);
};
const useDebounce = (callback, delay = 1e3, dep = []) => {
  const { current } = useRef({
    callback,
    timer: null
  });
  useEffect(
    function() {
      current.callback = callback;
    },
    [callback]
  );
  return useCallback(function f2(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.callback(...args);
    }, delay);
  }, dep);
};
const commafy = (num) => {
  return num.toString().includes(".") ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
};
const hideMobile = (mobile) => {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2");
};
const uuid = (len = 6, pre = "u_") => {
  const seed = "abcdefhijkmnprstwxyz0123456789", maxPos = seed.length;
  let rtn = "";
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
};
function uuid1(pre = "u_") {
  return pre + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
}
function isObject(val) {
  return Object.prototype.toString.call(val) === "[object Object]";
}
const copy = (target, hash = /* @__PURE__ */ new WeakMap()) => {
  if (!isObject(target)) {
    throw TypeError("arguments must be Object");
  }
  if (hash.has(target)) {
    return hash.get(target);
  }
  const ret = {};
  for (const key of Object.keys(target)) {
    const val = target[key];
    if (typeof val !== "object" || val === null) {
      ret[key] = val;
    } else if (Array.isArray(val)) {
      ret[key] = [...val];
    } else if (val instanceof Set) {
      ret[key] = /* @__PURE__ */ new Set([...val]);
    } else if (val instanceof Map) {
      ret[key] = new Map([...val]);
    } else {
      hash.set(val, val);
      ret[key] = copy(val, hash);
    }
  }
  return ret;
};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var chineseWorkday = {
  isWorkday,
  isHoliday,
  getFestival,
  isAddtionalWorkday
};
var HOLIDAYS = {
  "2018-02-15": "春节",
  "2018-02-16": "春节",
  "2018-02-17": "春节",
  "2018-02-18": "春节",
  "2018-02-19": "春节",
  "2018-02-20": "春节",
  "2018-02-21": "春节",
  "2018-04-05": "清明节",
  "2018-04-06": "清明节",
  "2018-04-07": "清明节",
  "2018-04-29": "劳动节",
  "2018-04-30": "劳动节",
  "2018-05-01": "劳动节",
  "2018-06-18": "端午节",
  "2018-09-24": "中秋节",
  "2018-10-01": "国庆节",
  "2018-10-02": "国庆节",
  "2018-10-03": "国庆节",
  "2018-10-04": "国庆节",
  "2018-10-05": "国庆节",
  "2018-10-06": "国庆节",
  "2018-10-07": "国庆节",
  "2018-12-30": "元旦",
  "2018-12-31": "元旦",
  "2019-01-01": "元旦",
  "2019-02-04": "春节",
  "2019-02-05": "春节",
  "2019-02-06": "春节",
  "2019-02-07": "春节",
  "2019-02-08": "春节",
  "2019-02-09": "春节",
  "2019-02-10": "春节",
  "2019-04-05": "清明节",
  "2019-04-06": "清明节",
  "2019-04-07": "清明节",
  "2019-05-01": "劳动节",
  "2019-05-02": "劳动节",
  "2019-05-03": "劳动节",
  "2019-05-04": "劳动节",
  "2019-06-07": "端午节",
  "2019-06-08": "端午节",
  "2019-06-09": "端午节",
  "2019-09-13": "中秋节",
  "2019-09-14": "中秋节",
  "2019-09-15": "中秋节",
  "2019-10-01": "国庆节",
  "2019-10-02": "国庆节",
  "2019-10-03": "国庆节",
  "2019-10-04": "国庆节",
  "2019-10-05": "国庆节",
  "2019-10-06": "国庆节",
  "2019-10-07": "国庆节",
  "2020-01-01": "元旦",
  "2020-01-24": "春节",
  "2020-01-25": "春节",
  "2020-01-26": "春节",
  "2020-01-27": "春节",
  "2020-01-28": "春节",
  "2020-01-29": "春节",
  "2020-01-30": "春节",
  "2020-04-04": "清明节",
  "2020-04-05": "清明节",
  "2020-04-06": "清明节",
  "2020-05-01": "劳动节",
  "2020-05-02": "劳动节",
  "2020-05-03": "劳动节",
  "2020-05-04": "劳动节",
  "2020-05-05": "劳动节",
  "2020-06-25": "端午节",
  "2020-06-26": "端午节",
  "2020-06-27": "端午节",
  "2020-10-01": "国庆节",
  "2020-10-02": "国庆节",
  "2020-10-03": "国庆节",
  "2020-10-04": "国庆节",
  "2020-10-05": "国庆节",
  "2020-10-06": "国庆节",
  "2020-10-07": "国庆节",
  "2020-10-08": "国庆节",
  "2021-01-01": "元旦",
  "2021-02-11": "春节",
  "2021-02-12": "春节",
  "2021-02-13": "春节",
  "2021-02-14": "春节",
  "2021-02-15": "春节",
  "2021-02-16": "春节",
  "2021-02-17": "春节",
  "2021-04-03": "清明节",
  "2021-04-04": "清明节",
  "2021-04-05": "清明节",
  "2021-05-01": "劳动节",
  "2021-05-02": "劳动节",
  "2021-05-03": "劳动节",
  "2021-05-04": "劳动节",
  "2021-05-05": "劳动节",
  "2021-06-12": "端午节",
  "2021-06-13": "端午节",
  "2021-06-14": "端午节",
  "2021-09-19": "中秋节",
  "2021-09-20": "中秋节",
  "2021-09-21": "中秋节",
  "2021-10-01": "国庆节",
  "2021-10-02": "国庆节",
  "2021-10-03": "国庆节",
  "2021-10-04": "国庆节",
  "2021-10-05": "国庆节",
  "2021-10-06": "国庆节",
  "2021-10-07": "国庆节",
  "2022-01-01": "元旦",
  "2022-01-02": "元旦",
  "2022-01-03": "元旦",
  "2022-01-31": "春节",
  "2022-02-01": "春节",
  "2022-02-02": "春节",
  "2022-02-03": "春节",
  "2022-02-04": "春节",
  "2022-02-05": "春节",
  "2022-02-06": "春节",
  "2022-04-03": "清明节",
  "2022-04-04": "清明节",
  "2022-04-05": "清明节",
  "2022-04-30": "劳动节",
  "2022-05-01": "劳动节",
  "2022-05-02": "劳动节",
  "2022-05-03": "劳动节",
  "2022-05-04": "劳动节",
  "2022-06-03": "端午节",
  "2022-06-04": "端午节",
  "2022-06-05": "端午节",
  "2022-09-10": "中秋节",
  "2022-09-11": "中秋节",
  "2022-09-12": "中秋节",
  "2022-10-01": "国庆节",
  "2022-10-02": "国庆节",
  "2022-10-03": "国庆节",
  "2022-10-04": "国庆节",
  "2022-10-05": "国庆节",
  "2022-10-06": "国庆节",
  "2022-10-07": "国庆节",
  "2022-12-31": "元旦",
  "2023-01-01": "元旦",
  "2023-01-02": "元旦",
  "2023-01-21": "春节",
  "2023-01-22": "春节",
  "2023-01-23": "春节",
  "2023-01-24": "春节",
  "2023-01-25": "春节",
  "2023-01-26": "春节",
  "2023-01-27": "春节",
  "2023-04-05": "清明节",
  "2023-04-29": "劳动节",
  "2023-04-30": "劳动节",
  "2023-05-01": "劳动节",
  "2023-05-02": "劳动节",
  "2023-05-03": "劳动节",
  "2023-06-22": "端午节",
  "2023-06-23": "端午节",
  "2023-06-24": "端午节",
  "2023-09-29": "中秋节",
  "2023-09-30": "中秋节",
  "2023-10-01": "国庆节",
  "2023-10-02": "国庆节",
  "2023-10-03": "国庆节",
  "2023-10-04": "国庆节",
  "2023-10-05": "国庆节",
  "2023-10-06": "国庆节",
  "2024-01-01": "元旦",
  "2024-02-10": "春节",
  "2024-02-11": "春节",
  "2024-02-12": "春节",
  "2024-02-13": "春节",
  "2024-02-14": "春节",
  "2024-02-15": "春节",
  "2024-02-16": "春节",
  "2024-02-17": "春节",
  "2024-04-04": "清明节",
  "2024-04-05": "清明节",
  "2024-04-06": "清明节",
  "2024-05-01": "劳动节",
  "2024-05-02": "劳动节",
  "2024-05-03": "劳动节",
  "2024-05-04": "劳动节",
  "2024-05-05": "劳动节",
  "2024-06-10": "端午节",
  "2024-09-15": "中秋节",
  "2024-09-16": "中秋节",
  "2024-09-17": "中秋节",
  "2024-10-01": "国庆节",
  "2024-10-02": "国庆节",
  "2024-10-03": "国庆节",
  "2024-10-04": "国庆节",
  "2024-10-05": "国庆节",
  "2024-10-06": "国庆节",
  "2024-10-07": "国庆节"
};
var WEEKENDS_WORKDAY = {
  "2018-02-11": "补春节",
  "2018-02-24": "补春节",
  "2018-04-08": "补清明节",
  "2018-04-28": "补劳动节",
  "2018-09-29": "补国庆节",
  "2018-09-30": "补国庆节",
  "2018-12-29": "补元旦",
  "2019-02-02": "补春节",
  "2019-02-03": "补春节",
  "2019-04-28": "补劳动节",
  "2019-05-05": "补劳动节",
  "2019-09-29": "补国庆节",
  "2019-10-12": "补国庆节",
  "2020-01-19": "补春节",
  "2020-02-01": "补春节",
  "2020-04-26": "补劳动节",
  "2020-05-09": "补劳动节",
  "2020-06-28": "补端午节",
  "2020-09-27": "补国庆节",
  "2020-10-10": "补国庆节",
  "2021-02-07": "补春节",
  "2021-02-20": "补春节",
  "2021-04-25": "补劳动节",
  "2021-05-08": "补劳动节",
  "2021-09-18": "补中秋节",
  "2021-09-26": "补国庆节",
  "2021-10-09": "补国庆节",
  "2022-01-29": "补春节",
  "2022-01-30": "补春节",
  "2022-04-02": "补清明节",
  "2022-04-24": "补劳动节",
  "2022-05-07": "补劳动节",
  "2022-10-08": "补国庆节",
  "2022-10-09": "补国庆节",
  "2023-01-28": "补春节",
  "2023-01-29": "补春节",
  "2023-04-23": "补劳动节",
  "2023-05-06": "补劳动节",
  "2023-06-25": "补端午节",
  "2023-10-07": "补国庆节",
  "2023-10-08": "补国庆节",
  "2024-02-04": "补春节",
  "2024-02-18": "补春节",
  "2024-04-07": "补清明节",
  "2024-04-28": "补劳动节",
  "2024-05-11": "补劳动节",
  "2024-09-14": "补中秋节",
  "2024-09-29": "补国庆节",
  "2024-10-12": "补国庆节"
};
function isWorkday(day) {
  var fd = formatDate(day);
  if (WEEKENDS_WORKDAY[fd.date]) {
    return true;
  } else if (HOLIDAYS[fd.date]) {
    return false;
  }
  return !fd.weekends;
}
function isHoliday(day) {
  return !isWorkday(day);
}
function isAddtionalWorkday(day) {
  var fd = formatDate(day);
  return !!WEEKENDS_WORKDAY[fd.date];
}
function getFestival(day) {
  var fd = formatDate(day);
  if (WEEKENDS_WORKDAY[fd.date]) {
    return WEEKENDS_WORKDAY[fd.date];
  } else if (HOLIDAYS[fd.date]) {
    return HOLIDAYS[fd.date];
  }
  return fd.weekends ? "周末" : "工作日";
}
function formatDate(day) {
  var d = new Date(day), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return {
    date: [year, month, day].join("-"),
    weekends: [0, 6].indexOf(d.getDay()) > -1
  };
}
const index = /* @__PURE__ */ getDefaultExportFromCjs(chineseWorkday);
var x = Object.defineProperty;
var B = (r, t, e) => t in r ? x(r, t, { enumerable: true, configurable: true, writable: true, value: e }) : r[t] = e;
var c = (r, t, e) => (B(r, typeof t != "symbol" ? t + "" : t, e), e);
const l = class l2 {
  constructor(t) {
    c(this, "_date");
    t instanceof l2 ? this._date = new Date(t.toDate()) : t instanceof Date ? this._date = new Date(t) : typeof t == "string" || typeof t == "number" ? (this._date = new Date(t), typeof t == "string" && isNaN(this._date.getTime()) && (this._date = new Date(t.replace(/-/g, "/")))) : this._date = /* @__PURE__ */ new Date();
  }
  toDate() {
    return this._date;
  }
  isValid() {
    return !isNaN(this._date.getTime());
  }
  diff(t, e = "day") {
    const o = new l2(t).toDate(), n = this._date.getTime() - o.getTime();
    switch (e) {
      case "year":
        return this._date.getFullYear() - o.getFullYear();
      case "month":
        return (this._date.getFullYear() - o.getFullYear()) * 12 + (this._date.getMonth() - o.getMonth());
      case "day":
      default:
        return Math.floor(n / (1e3 * 60 * 60 * 24));
    }
  }
  startOf(t) {
    const e = new Date(this._date);
    switch (t) {
      case "year":
        e.setMonth(0), e.setDate(1), e.setHours(0, 0, 0, 0);
        break;
      case "month":
        e.setDate(1), e.setHours(0, 0, 0, 0);
        break;
      case "day":
        e.setHours(0, 0, 0, 0);
        break;
    }
    return new l2(e);
  }
  endOf(t) {
    const e = new Date(this._date);
    switch (t) {
      case "year":
        e.setMonth(11), e.setDate(31), e.setHours(23, 59, 59, 999);
        break;
      case "month":
        e.setDate(new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate()), e.setHours(23, 59, 59, 999);
        break;
      case "day":
        e.setHours(23, 59, 59, 999);
        break;
    }
    return new l2(e);
  }
  add(t, e) {
    const o = new Date(this._date);
    switch (e) {
      case "year":
        o.setFullYear(o.getFullYear() + t);
        break;
      case "month":
        o.setMonth(o.getMonth() + t);
        break;
      case "day":
        o.setDate(o.getDate() + t);
        break;
    }
    return new l2(o);
  }
  subtract(t, e) {
    return this.add(-t, e);
  }
  format(t) {
    const e = {
      YYYY: this._date.getFullYear(),
      MM: (this._date.getMonth() + 1).toString().padStart(2, "0"),
      DD: this._date.getDate().toString().padStart(2, "0"),
      HH: this._date.getHours().toString().padStart(2, "0"),
      mm: this._date.getMinutes().toString().padStart(2, "0"),
      ss: this._date.getSeconds().toString().padStart(2, "0"),
      dddd: l2.daysOfWeek[this._date.getDay()]
    };
    return t.replace(/YYYY|MM|DD|HH|mm|ss|dddd/g, (o) => e[o].toString());
  }
  year(t) {
    if (t === void 0)
      return this._date.getFullYear();
    const e = new Date(this._date);
    return e.setFullYear(t), new l2(e);
  }
  month(t) {
    if (t === void 0)
      return this._date.getMonth();
    const e = new Date(this._date);
    return e.setMonth(t), new l2(e);
  }
  date(t) {
    if (t === void 0)
      return this._date.getDate();
    const e = new Date(this._date);
    return e.setDate(t), new l2(e);
  }
  day(t) {
    if (t === void 0)
      return this._date.getDay();
    {
      const e = this._date.getDay(), o = t - e, n = new Date(this._date);
      return n.setDate(this._date.getDate() + o), new l2(n);
    }
  }
  isBefore(t) {
    const e = new l2(t).toDate();
    return this._date.getTime() < e.getTime();
  }
  isAfter(t) {
    const e = new l2(t).toDate();
    return this._date.getTime() > e.getTime();
  }
  isSame(t, e = "day") {
    const o = new l2(t).toDate();
    switch (e) {
      case "year":
        return this._date.getFullYear() === o.getFullYear();
      case "month":
        return this._date.getFullYear() === o.getFullYear() && this._date.getMonth() === o.getMonth();
      case "day":
      default:
        return this._date.getFullYear() === o.getFullYear() && this._date.getMonth() === o.getMonth() && this._date.getDate() === o.getDate();
    }
  }
  isBetween(t, e, o) {
    const n = new l2(t).startOf(o).toDate(), d = new l2(e).endOf(o).toDate(), a = this.toDate();
    return a >= n && a <= d;
  }
};
c(l, "daysOfWeek", [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]);
let M = l;
const _ = (r) => new M(r), w = (r) => _(r).startOf("day"), D = (r, t) => {
  r = w(r), t = w(t);
  const e = t.diff(r, "day");
  return Array.from({ length: e + 1 }, (o, n) => r.add(n, "day"));
};
class A {
  constructor() {
    c(this, "dayDetails", {});
    c(this, "holidays", {});
    c(this, "workdays", {});
    c(this, "inLieuDays", {});
  }
  /** year at */
  y(t) {
    return this.dayDetails.year = t, this;
  }
  mark(t) {
    return this.dayDetails.holiday = t, this;
  }
  save(t, e, o) {
    if (!this.dayDetails.year)
      throw new Error("should set year before saving holiday");
    if (!this.dayDetails.holiday)
      throw new Error("should set holiday before saving holiday");
    this.dayDetails.dayType = o;
    const n = _(`${this.dayDetails.year}-${t}-${e}`);
    return o === 2 ? this.holidays[n.format("YYYY-MM-DD")] = this.dayDetails.holiday : o === 1 ? this.workdays[n.format("YYYY-MM-DD")] = this.dayDetails.holiday : o === 3 && (this.inLieuDays[n.format("YYYY-MM-DD")] = this.dayDetails.holiday), this.dayDetails.month = t, this.dayDetails.day = e, this;
  }
  to(t, e) {
    if (!this.dayDetails.year || !this.dayDetails.month || !this.dayDetails.day)
      throw new Error("should set year/month/day before saving holiday range");
    const o = _(
      `${this.dayDetails.year}-${this.dayDetails.month}-${this.dayDetails.day}`
    ), n = _(`${this.dayDetails.year}-${t}-${e}`);
    if (n.isBefore(o) || n.isSame(o))
      throw new Error("end date should be after start date");
    const d = n.diff(o, "day");
    for (let a = 1; a <= d; a++) {
      const i = o.add(a, "day");
      this.dayDetails.dayType === 2 ? this.holidays[i.format("YYYY-MM-DD")] = this.dayDetails.holiday : this.dayDetails.dayType === 1 ? this.workdays[i.format("YYYY-MM-DD")] = this.dayDetails.holiday : this.dayDetails.dayType === 3 && (this.inLieuDays[i.format("YYYY-MM-DD")] = this.dayDetails.holiday);
    }
    return this;
  }
  /** work day */
  w(t, e) {
    return this.save(
      t,
      e,
      1
      /* Workday */
    );
  }
  /** rest */
  r(t, e) {
    return this.save(
      t,
      e,
      2
      /* Holiday */
    );
  }
  /** in-lieu */
  i(t, e) {
    return this.save(
      t,
      e,
      3
      /* InLieu */
    );
  }
  /** New Year's Day 元旦 */
  ny() {
    return this.mark(
      "New Year's Day,元旦,1"
      /* NY */
    );
  }
  /** Spring Festival 春节 */
  s() {
    return this.mark(
      "Spring Festival,春节,3"
      /* S */
    );
  }
  /** Tomb-sweeping Day 清明 */
  t() {
    return this.mark(
      "Tomb-sweeping Day,清明,1"
      /* T */
    );
  }
  /** Labour Day 五一 */
  l() {
    return this.mark(
      "Labour Day,劳动节,1"
      /* L */
    );
  }
  /** Dragon Boat Festival 端午 */
  d() {
    return this.mark(
      "Dragon Boat Festival,端午,1"
      /* D */
    );
  }
  /** National Day 国庆节 */
  n() {
    return this.mark(
      "National Day,国庆节,3"
      /* N */
    );
  }
  /** Mid-autumn Festival 中秋 */
  m() {
    return this.mark(
      "Mid-autumn Festival,中秋,1"
      /* M */
    );
  }
  /** Anti-Fascist 70th Day 中国人民抗日战争暨世界反法西斯战争胜利70周年纪念日 */
  a() {
    return this.mark(
      "Anti-Fascist 70th Day,中国人民抗日战争暨世界反法西斯战争胜利70周年纪念日,1"
      /* A */
    );
  }
}
const C = () => {
  const r = new A();
  return r.y(2024).ny().r(1, 1).s().r(2, 10).to(2, 17).w(2, 4).w(2, 18).i(2, 15).to(2, 16).t().r(4, 4).to(4, 6).w(4, 7).i(4, 5).l().r(5, 1).to(5, 5).w(4, 28).w(5, 11).i(5, 2).to(5, 3).d().r(6, 10).m().r(9, 15).to(9, 17).w(9, 14).i(9, 16).n().r(10, 1).to(10, 7).w(9, 29).w(10, 12).i(10, 4).i(10, 7), r.y(2023).ny().r(1, 1).to(1, 2).s().r(1, 21).to(1, 27).w(1, 28).to(1, 29).i(1, 26).to(1, 27).t().r(4, 5).l().r(4, 29).to(5, 3).w(4, 23).w(5, 6).i(5, 2).to(5, 3).d().r(6, 22).to(6, 24).w(6, 25).i(6, 23).m().r(9, 29).n().r(9, 30).to(10, 6).w(10, 7).to(10, 8).i(10, 5).to(10, 6), r.y(2022).ny().r(1, 1).to(1, 3).s().r(1, 31).to(2, 6).w(1, 29).w(1, 30).i(2, 3).to(2, 4).t().r(4, 3).to(4, 5).w(4, 2).i(4, 4).l().r(4, 30).to(5, 4).w(4, 24).w(5, 7).i(5, 3).to(5, 4).d().r(6, 3).to(6, 5).m().r(9, 10).to(9, 12).n().r(10, 1).to(10, 7).w(10, 8).w(10, 9).i(10, 6).to(10, 7).ny().r(12, 31), r.y(2021).ny().r(1, 1).to(1, 3).s().r(2, 11).to(2, 17).w(2, 7).w(2, 20).i(2, 16).to(2, 17).t().r(4, 3).to(4, 5).l().r(5, 1).to(5, 5).w(4, 25).w(5, 8).i(5, 4).to(5, 5).d().r(6, 12).to(6, 14).m().r(9, 19).to(9, 21).w(9, 18).i(9, 20).n().r(10, 1).to(10, 7).w(9, 26).w(10, 9).i(10, 6).to(10, 7), r.y(2020).ny().r(1, 1).s().r(1, 24).to(2, 2).w(1, 19).i(1, 29).t().r(4, 4).to(4, 6).l().r(5, 1).to(5, 5).w(4, 26).w(5, 9).i(5, 4).to(5, 5).d().r(6, 25).to(6, 27).w(6, 28).i(6, 26).n().r(10, 1).to(10, 8).w(9, 27).w(10, 10).i(10, 7).to(10, 8), r.y(2019).ny().r(1, 1).s().r(2, 4).to(2, 10).w(2, 2).to(2, 3).i(2, 4).i(2, 8).t().r(4, 5).to(4, 7).l().r(5, 1).to(5, 4).w(4, 28).w(5, 5).i(5, 2).i(5, 3).d().r(6, 7).to(6, 9).m().r(9, 13).to(9, 15).n().r(10, 1).to(10, 7).w(9, 29).w(10, 12).i(10, 4).i(10, 7), r.y(2018).ny().r(1, 1).s().r(2, 15).to(2, 21).w(2, 11).w(2, 24).i(2, 19).to(2, 21).t().r(4, 5).to(4, 7).w(4, 8).i(4, 6).l().r(4, 29).to(5, 1).w(4, 28).i(4, 30).d().r(6, 18).n().r(10, 1).to(10, 7).w(9, 29).to(9, 30).i(10, 4).to(10, 5).m().r(9, 24).ny().r(12, 30).to(12, 31).w(12, 29).i(12, 31), r.y(2017).ny().r(1, 1).to(1, 2).s().r(1, 27).to(2, 2).w(1, 22).w(2, 4).i(2, 1).to(2, 2).t().r(4, 2).to(4, 4).w(4, 1).i(4, 3).l().r(5, 1).d().r(5, 28).to(5, 30).w(5, 27).i(5, 29).n().r(10, 1).to(10, 8).w(9, 30).i(10, 6).m().r(10, 4), r.y(2016).ny().r(1, 1).s().r(2, 7).to(2, 13).w(2, 6).w(2, 14).i(2, 11).to(2, 12).t().r(4, 4).l().r(5, 1).to(5, 2).d().r(6, 9).to(6, 11).w(6, 12).i(6, 10).m().r(9, 15).to(9, 17).w(9, 18).i(9, 16).n().r(10, 1).to(10, 7).w(10, 8).to(10, 9).i(10, 6).to(10, 7), r.y(2015).ny().r(1, 1).to(1, 3).w(1, 4).i(1, 2).s().r(2, 18).to(2, 24).w(2, 15).w(2, 28).i(2, 23).to(2, 24).t().r(4, 5).to(4, 6).l().r(5, 1).d().r(6, 20).r(6, 22).m().r(9, 27).n().r(10, 1).to(10, 7).w(10, 10).i(10, 7).a().r(9, 3).to(9, 4).w(9, 6).i(9, 4), r.y(2014).ny().r(1, 1).s().r(1, 31).to(2, 6).w(1, 26).w(2, 8).i(2, 5).to(2, 6).t().r(4, 5).to(4, 7).l().r(5, 1).to(5, 3).w(5, 4).i(5, 2).d().r(6, 2).m().r(9, 8).n().r(10, 1).to(10, 7).w(9, 28).w(10, 11).i(10, 6).to(10, 7), r.y(2013).ny().r(1, 1).to(1, 3).w(1, 5).to(1, 6).i(1, 2).to(1, 3).s().r(2, 9).to(2, 15).w(2, 16).to(2, 17).i(2, 14).to(2, 15).t().r(4, 4).to(4, 6).w(4, 7).i(4, 5).l().r(4, 29).to(5, 1).w(4, 27).to(4, 28).i(4, 29).to(4, 30).d().r(6, 10).to(6, 12).w(6, 8).to(6, 9).i(6, 10).to(6, 11).m().r(9, 19).to(9, 21).w(9, 22).i(9, 20).n().r(10, 1).to(10, 7).w(9, 29).w(10, 12).i(10, 4).i(10, 7), r.y(2012).ny().r(1, 1).to(1, 3).i(1, 3).s().r(1, 22).to(1, 28).w(1, 21).w(1, 29).i(1, 26).to(1, 27).t().r(4, 2).to(4, 4).w(3, 31).w(4, 1).i(4, 2).to(4, 3).l().r(4, 29).to(5, 1).w(4, 28).i(4, 30).d().r(6, 22).r(6, 24).m().r(9, 30).n().r(10, 1).to(10, 7).w(9, 29).i(10, 5), r.y(2011).ny().r(1, 1).to(1, 3).s().r(2, 2).to(2, 8).w(1, 30).w(2, 12).i(2, 7).to(2, 8).t().r(4, 3).to(4, 5).w(4, 2).i(4, 4).l().r(4, 30).to(5, 2).d().r(6, 4).r(6, 6).m().r(9, 10).to(9, 12).n().r(10, 1).to(10, 7).w(10, 8).to(10, 9).i(10, 6).to(10, 7).ny().w(12, 31), r.y(2010).ny().r(1, 1).to(1, 3).s().r(2, 13).to(2, 19).w(2, 20).to(2, 21).i(2, 18).to(2, 19).t().r(4, 3).to(4, 5).l().r(5, 1).to(5, 3).d().r(6, 14).to(6, 16).w(6, 12).to(6, 13).i(6, 14).to(6, 15).m().r(9, 22).to(9, 24).w(9, 19).w(9, 25).i(9, 23).to(9, 24).n().r(10, 1).to(10, 7).w(9, 26).w(10, 9).i(10, 6).to(10, 7), r.y(2009).ny().r(1, 1).to(1, 3).w(1, 4).i(1, 2).s().r(1, 25).to(1, 31).w(1, 24).w(2, 1).i(1, 29).to(1, 30).t().r(4, 4).to(4, 6).l().r(5, 1).to(5, 3).d().r(5, 28).to(5, 30).w(5, 31).i(5, 29).n().r(10, 1).to(10, 8).w(9, 27).w(10, 10).i(10, 7).to(10, 8).m().r(10, 3), r.y(2008).ny().r(1, 1).s().r(2, 6).to(2, 12).w(2, 2).to(2, 3).i(2, 11).to(2, 12).t().r(4, 4).to(4, 6).l().r(5, 1).to(5, 3).w(5, 4).i(5, 2).d().r(6, 7).to(6, 9).m().r(9, 13).to(9, 15).n().r(9, 29).to(10, 5).w(9, 27).to(9, 28).i(9, 29).to(9, 30), r.y(2007).ny().r(1, 1).to(1, 3).i(1, 2).to(1, 3).s().r(2, 18).to(2, 24).w(2, 17).w(2, 25).i(2, 22).to(2, 23).l().r(5, 1).to(5, 7).w(4, 28).to(4, 29).i(5, 4).i(5, 7).n().r(10, 1).to(10, 7).w(9, 29).to(9, 30).i(10, 4).to(10, 5).ny().r(12, 30).to(12, 31).w(12, 29).i(12, 31), r.y(2006).ny().r(1, 1).to(1, 3).s().r(1, 29).to(2, 4).w(1, 28).w(2, 5).i(2, 2).to(2, 3).l().r(5, 1).to(5, 7).w(4, 29).to(4, 30).i(5, 4).to(5, 5).n().r(10, 1).to(10, 7).w(9, 30).w(10, 8).i(10, 5).to(10, 6).ny().w(12, 30).to(12, 31), r.y(2005).ny().r(1, 1).to(1, 3).s().r(2, 9).to(2, 15).w(2, 5).to(2, 6).i(2, 14).to(2, 15).l().r(5, 1).to(5, 7).w(4, 30).w(5, 8).i(5, 5).to(5, 6).n().r(10, 1).to(10, 7).w(10, 8).to(10, 9).i(10, 6).to(10, 7), r.y(2004).ny().r(1, 1).s().r(1, 22).to(1, 28).w(1, 17).to(1, 18).i(1, 27).to(1, 28).l().r(5, 1).to(5, 7).w(5, 8).to(5, 9).i(5, 6).to(5, 7).n().r(10, 1).to(10, 7).w(10, 9).to(10, 10).i(10, 6).to(10, 7), {
    holidays: r.holidays,
    workdays: r.workdays,
    inLieuDays: r.inLieuDays
  };
}, { holidays: g, workdays: p, inLieuDays: j } = C(), y = (...r) => {
  if (r.length !== 1)
    return r.map((e) => y(e));
  const t = w(r[0]);
  if (!t.isValid())
    throw new Error(`unsupported type ${typeof t}, expected type is Date or Dayjs`);
  return t;
}, T = (r) => !f(r), f = (r) => {
  const t = y(r), e = t.day(), o = t.format("YYYY-MM-DD");
  return !!(p[o] || e >= 1 && e <= 5 && !g[o]);
}, q = (r) => (r = y(r), !!j[r.format("YYYY-MM-DD")]), I = (r) => {
  r = y(r);
  const t = r.format("YYYY-MM-DD");
  if (p[t])
    return {
      date: t,
      work: true,
      name: p[t]
    };
  if (g[t])
    return {
      date: t,
      work: false,
      name: g[t]
    };
  {
    const e = r.day();
    return {
      date: t,
      work: e !== 0 && e !== 6,
      name: r.format("dddd")
    };
  }
}, U = (r, t, e = true) => (r = y(r), t = y(t), e ? D(r, t).filter(T).map((o) => o.format("YYYY-MM-DD")) : D(r, t).filter((o) => g[o.format("YYYY-MM-DD")]).map((o) => o.format("YYYY-MM-DD"))), W = (r, t, e = true) => (r = y(r), t = y(t), e ? D(r, t).filter(f).map((o) => o.format("YYYY-MM-DD")) : D(r, t).filter((o) => f(o) && o.day() >= 1 && o.day() <= 5).map((o) => o.format("YYYY-MM-DD"))), P = (r = 0, t = _()) => {
  if (t = w(t), r === 0) {
    if (f(t))
      return t.format("YYYY-MM-DD");
    r = 1;
  }
  const e = r > 0 ? 1 : -1;
  let o = Math.abs(r);
  for (; o > 0; )
    t = t.add(e, "day"), f(t) && o--;
  return t.format("YYYY-MM-DD");
}, z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  findWorkday: P,
  getDayDetail: I,
  getHolidaysInRange: U,
  getWorkdaysInRange: W,
  isHoliday: T,
  isInLieu: q,
  isWorkday: f
}, Symbol.toStringTag, { value: "Module" })), V = {
  the_beginning_of_spring: [4.6295, 3.87],
  rain_water: [19.4599, 18.73],
  the_waking_of_insects: [6.3926, 5.63],
  the_spring_equinox: [21.4155, 20.646],
  pure_brightness: [5.59, 4.81],
  grain_rain: [20.888, 20.1],
  the_beginning_of_summer: [6.318, 5.52],
  lesser_fullness_of_grain: [21.86, 21.04],
  grain_in_beard: [6.5, 5.678],
  the_summer_solstice: [22.2, 21.37],
  lesser_heat: [7.928, 7.108],
  greater_heat: [23.65, 22.83],
  the_beginning_of_autumn: [28.35, 7.5],
  the_end_of_heat: [23.95, 23.13],
  white_dew: [8.44, 7.646],
  the_autumn_equinox: [23.822, 23.042],
  code_dew: [9.098, 8.318],
  frost_descent: [24.218, 23.438],
  the_beginning_of_winter: [8.218, 7.438],
  lesser_snow: [23.08, 22.36],
  greater_snow: [7.9, 7.18],
  the_winter_solstice: [22.6, 21.94],
  lesser_cold: [6.11, 5.4055],
  greater_cold: [20.84, 20.12]
}, N = {
  1: ["lesser_cold", "greater_cold"],
  2: ["the_beginning_of_spring", "rain_water"],
  3: ["the_waking_of_insects", "the_spring_equinox"],
  4: ["pure_brightness", "grain_rain"],
  5: ["the_beginning_of_summer", "lesser_fullness_of_grain"],
  6: ["grain_in_beard", "the_summer_solstice"],
  7: ["lesser_heat", "greater_heat"],
  8: ["the_beginning_of_autumn", "the_end_of_heat"],
  9: ["white_dew", "the_autumn_equinox"],
  10: ["code_dew", "frost_descent"],
  11: ["the_beginning_of_winter", "lesser_snow"],
  12: ["greater_snow", "the_winter_solstice"]
}, Z = {
  "2026_rain_water": -1,
  "2084_the_spring_equinox": 1,
  "1911_the_beginning_of_summer": 1,
  "2008_lesser_fullness_of_grain": 1,
  "1902_grain_in_beard": 1,
  "1928_the_summer_solstice": 1,
  "1925_lesser_heat": 1,
  "2016_lesser_heat": 1,
  "1922_greater_heat": 1,
  "2002_the_beginning_of_autumn": 1,
  "1927_white_dew": 1,
  "1942_the_autumn_equinox": 1,
  "2089_frost_descent": 1,
  "2089_the_beginning_of_winter": 1,
  "1978_lesser_snow": 1,
  "1954_greater_snow": 1,
  "1918_the_winter_solstice": -1,
  "2021_the_winter_solstice": -1,
  "1982_lesser_cold": 1,
  "2019_lesser_cold": -1,
  "2000_greater_cold": 1,
  "2082_greater_cold": 1
}, E = {
  lesser_cold: "小寒",
  greater_cold: "大寒",
  the_beginning_of_spring: "立春",
  rain_water: "雨水",
  the_waking_of_insects: "惊蛰",
  the_spring_equinox: "春分",
  pure_brightness: "清明",
  grain_rain: "谷雨",
  the_beginning_of_summer: "立夏",
  lesser_fullness_of_grain: "小满",
  grain_in_beard: "芒种",
  the_summer_solstice: "夏至",
  lesser_heat: "小暑",
  greater_heat: "大暑",
  the_beginning_of_autumn: "立秋",
  the_end_of_heat: "处暑",
  white_dew: "白露",
  the_autumn_equinox: "秋分",
  code_dew: "寒露",
  frost_descent: "霜降",
  the_beginning_of_winter: "立冬",
  lesser_snow: "小雪",
  greater_snow: "大雪",
  the_winter_solstice: "冬至"
}, S = (r, t, e) => {
  const o = r >= 2e3 ? 21 : 20, n = r % 100, d = 0.2422, a = V[e][o === 21 ? 1 : 0];
  let i = Math.floor(n / 4);
  [
    "lesser_cold",
    "greater_cold",
    "the_beginning_of_spring",
    "rain_water"
  ].includes(e) && (i = Math.floor((n - 1) / 4));
  let s = Math.floor(n * d + a) - i;
  const u = Z[`${r}_${e}`];
  return u && (s += u), _(`${r}-${t}-${s}`).format("YYYY-MM-DD");
}, G = (r, t) => {
  const e = [];
  let o = w(r);
  const n = w(t || r);
  for (; o.isBefore(n) || o.isSame(n); ) {
    const d = o.year(), a = o.month() + 1;
    N[a].forEach((i) => {
      const s = _(S(d, a, i));
      (s != null && s.isBefore(n) || s != null && s.isSame(n)) && (s != null && s.isAfter(o) || s != null && s.isSame(o)) && e.push({
        date: s.format("YYYY-MM-DD"),
        term: i,
        name: E[i],
        index: 1
      });
    }), a === 12 ? o = o.add(1, "year").startOf("year") : o = o.add(1, "month").startOf("month");
  }
  return e;
}, J = (r, t) => {
  let e = w(r).subtract(1, "month");
  const o = w(t || r).add(1, "month"), n = [];
  for (; e.isBefore(o) || e.isSame(o); ) {
    const a = e.year(), i = e.month() + 1;
    N[i].forEach((s) => {
      const u = _(S(a, i, s));
      n.push({ term: s, date: u });
    }), e.month() === 11 ? e = e.add(1, "year").startOf("year") : e = e.add(1, "month").startOf("month");
  }
  const d = [];
  return n.forEach((a, i) => {
    for (let s = a.date; n[i + 1] && s.isBefore(n[i + 1].date); s = s.add(1, "day"))
      d.push({ day: s, term: a.term, name: E[a.term], index: s.diff(a.date, "day") + 1 });
  }), t || (t = r), d.filter((a) => a.day.isBetween(r, t, "day")).map((a) => ({
    date: a.day.format("YYYY-MM-DD"),
    term: a.term,
    name: a.name,
    index: a.index
  }));
}, K = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getSolarTermDate: S,
  getSolarTerms: G,
  getSolarTermsInRange: J
}, Symbol.toStringTag, { value: "Module" })), m = [
  19416,
  19168,
  42352,
  21717,
  53856,
  55632,
  91476,
  22176,
  39632,
  21970,
  //1900-1909
  19168,
  42422,
  42192,
  53840,
  119381,
  46400,
  54944,
  44450,
  38320,
  84343,
  //1910-1919
  18800,
  42160,
  46261,
  27216,
  27968,
  109396,
  11104,
  38256,
  21234,
  18800,
  //1920-1929
  25958,
  54432,
  59984,
  28309,
  23248,
  11104,
  100067,
  37600,
  116951,
  51536,
  //1930-1939
  54432,
  120998,
  46416,
  22176,
  107956,
  9680,
  37584,
  53938,
  43344,
  46423,
  //1940-1949
  27808,
  46416,
  86869,
  19872,
  42416,
  83315,
  21168,
  43432,
  59728,
  27296,
  //1950-1959
  44710,
  43856,
  19296,
  43748,
  42352,
  21088,
  62051,
  55632,
  23383,
  22176,
  //1960-1969
  38608,
  19925,
  19152,
  42192,
  54484,
  53840,
  54616,
  46400,
  46752,
  103846,
  //1970-1979
  38320,
  18864,
  43380,
  42160,
  45690,
  27216,
  27968,
  44870,
  43872,
  38256,
  //1980-1989
  19189,
  18800,
  25776,
  29859,
  59984,
  27480,
  21952,
  43872,
  38613,
  37600,
  //1990-1999
  51552,
  55636,
  54432,
  55888,
  30034,
  22176,
  43959,
  9680,
  37584,
  51893,
  //2000-2009
  43344,
  46240,
  47780,
  44368,
  21977,
  19360,
  42416,
  86390,
  21168,
  43312,
  //2010-2019
  31060,
  27296,
  44368,
  23378,
  19296,
  42726,
  42208,
  53856,
  60005,
  54576,
  //2020-2029
  23200,
  30371,
  38608,
  19195,
  19152,
  42192,
  118966,
  53840,
  54560,
  56645,
  //2030-2039
  46496,
  22224,
  21938,
  18864,
  42359,
  42160,
  43600,
  111189,
  27936,
  44448,
  //2040-2049
  84835,
  37744,
  18936,
  18800,
  25776,
  92326,
  59984,
  27424,
  108228,
  43744,
  //2050-2059
  41696,
  53987,
  51552,
  54615,
  54432,
  55888,
  23893,
  22176,
  42704,
  21972,
  //2060-2069
  21200,
  43448,
  43344,
  46240,
  46758,
  44368,
  21920,
  43940,
  42416,
  21168,
  //2070-2079
  45683,
  26928,
  29495,
  27296,
  44368,
  84821,
  19296,
  42352,
  21732,
  53600,
  //2080-2089
  59752,
  54560,
  55968,
  92838,
  22224,
  19168,
  43476,
  41680,
  53584,
  62034,
  //2090-2099
  54560
  //2100
], $ = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"], Q = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"], X = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"], tt = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"], et = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"], v = (r) => {
  let t = 348;
  for (let e = 32768; e > 8; e >>= 1)
    t += m[r - 1900] & e ? 1 : 0;
  return t + O(r);
}, k = (r) => m[r - 1900] & 15, O = (r) => k(r) ? m[r - 1900] & 65536 ? 30 : 29 : 0, Y = (r) => X[r % 10] + tt[r % 12], b = (r, t) => m[r - 1900] & 65536 >> t ? 30 : 29, rt = (r) => et[(r - 4) % 12], ot = (r) => {
  const t = ["初", "十", "廿", "三十"];
  if (r === 10)
    return "初十";
  if (r === 20)
    return "二十";
  if (r === 30)
    return "三十";
  const e = Math.floor(r / 10), o = r % 10;
  return t[e] + (o ? $[o] : "");
}, F = (r) => {
  const t = new Array(7).fill(0);
  let e = 0, o = 0;
  const n = _(new Date(1900, 0, 31)), d = _(r);
  let a = d.diff(n, "day");
  t[5] = a + 40, t[4] = 14;
  let i = 1900;
  for (; i < 2100 && a > 0; i++)
    e = v(i), a -= e, t[4] += 12;
  a < 0 && (a += e, i--, t[4] -= 12), t[0] = i, t[3] = i - 1864, o = k(i), t[6] = 0;
  for (let s = 1; s < 13 && a > 0; s++)
    o > 0 && s === o + 1 && t[6] === 0 ? (--s, t[6] = 1, e = O(i)) : e = b(i, s), t[6] === 1 && s === o + 1 && (t[6] = 0), a -= e, t[6] === 0 && t[4]++, t[1] = s;
  return a === 0 && o > 0 && t[6] === 1 ? t[6] = 0 : a < 0 && (a += e, t[1]--, t[4]--), t[2] = a + 1, {
    date: d.format("YYYY-MM-DD"),
    // 公历日期
    lunarYear: t[0],
    // 农历年份
    lunarMon: t[1] + 1,
    // 农历月份
    lunarDay: t[2],
    // 农历日期
    isLeap: !!t[6],
    // 是否闰月
    zodiac: rt(t[0]),
    // 生肖
    yearCyl: Y(t[3]),
    // 年柱
    monCyl: Y(t[4]),
    // 月柱
    dayCyl: Y(t[5]),
    // 日柱
    lunarYearCN: `${t[0].toString().split("").map((s) => $[Number(s)]).join("")}`,
    // 农历年份中文表示
    lunarMonCN: `${Q[t[1]]}月`,
    // 农历月份中文表示
    lunarDayCN: ot(t[2])
    // 农历日期中文表示
  };
}, H = (r, t) => {
  const e = _(r), o = _(t), n = [];
  for (let d = e; d.isBefore(o) || d.isSame(o, "day"); d = d.add(1, "day"))
    n.push(F(d));
  return n;
}, R = (r) => {
  const t = _(r), e = t.year(), o = t.month() + 1, n = t.date();
  let d = 0;
  for (let h = 1900; h < e; h++)
    d += v(h);
  let a = k(e);
  for (let h = 1; h < o; h++)
    d += b(e, h), h === a && (d += O(e));
  d += n - 1;
  const i = _(new Date(1900, 0, 31)), s = i.add(d, "day").format("YYYY-MM-DD");
  let u = d, L;
  return a === o && (u += b(e, o), L = i.add(u, "day").format("YYYY-MM-DD")), {
    date: s,
    leapMonthDate: L
  };
}, at = {
  getLunarDate: F,
  getLunarDatesInRange: H,
  getSolarDateFromLunar: R
}, nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: at,
  getLunarDate: F,
  getLunarDatesInRange: H,
  getSolarDateFromLunar: R
}, Symbol.toStringTag, { value: "Module" })), it = {
  ...z,
  ...K,
  ...nt
};
const isEqual = (a, b2) => {
  if (a === b2) {
    return true;
  }
  const typeA = typeof a;
  const typeB = typeof b2;
  if (typeA !== typeB) {
    return false;
  }
  if (typeA !== "object" || a === null || b2 === null) {
    return a === b2;
  }
  if (Array.isArray(a)) {
    if (!Array.isArray(b2) || a.length !== b2.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b2[i])) {
        return false;
      }
    }
    return true;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b2);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key], b2[key])) {
      return false;
    }
  }
  return true;
};
function merge(target, source) {
  if (!isObject(target)) {
    return source;
  }
  if (!isObject(source)) {
    return target;
  }
  const targetObject = copy(target);
  const sourceObject = copy(source);
  Object.keys(sourceObject).forEach((key) => {
    const targetValue = targetObject[key];
    const sourceValue = sourceObject[key];
    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      targetObject[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      targetObject[key] = merge(targetValue, sourceValue);
    } else {
      targetObject[key] = sourceValue ?? targetObject[key];
    }
  });
  return targetObject;
}
const typeOf = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};
const getTime = () => {
  return (/* @__PURE__ */ new Date()).toLocaleString();
};
const timestampToTime = (timestamp = Date.now(), isMs = true, format2 = "YYYY-MM-DD HH:mm:ss") => {
  const date = new Date(isMs ? timestamp : timestamp * 1e3);
  const pad = (num) => num < 10 ? "0" + num : String(num);
  return format2.replace("YYYY", String(date.getUTCFullYear())).replace("MM", pad(date.getUTCMonth() + 1)).replace("DD", pad(date.getUTCDate())).replace("HH", pad(date.getUTCHours())).replace("mm", pad(date.getUTCMinutes())).replace("ss", pad(date.getUTCSeconds()));
};
const argumentsSerializate = (obj) => {
  return Object.keys(obj).map((key) => {
    const value = obj[key];
    const encodedValue = typeof value === "string" || typeof value === "number" || typeof value === "boolean" ? encodeURIComponent(value.toString()) : encodeURIComponent(JSON.stringify(value));
    return `${encodeURIComponent(key)}=${encodedValue}`;
  }).join("&");
};
const convertToCamelCase = (obj) => {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return obj;
  }
  const newObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/_(\w)/g, function(_2, p1) {
        return p1.toUpperCase();
      });
      const value = obj[key];
      newObj[newKey] = typeof value === "object" && value !== null ? convertToCamelCase(value) : value;
    }
  }
  return newObj;
};
const debounce = (callback, wait = 1e3, immediate = false) => {
  let timer = null;
  return (...args) => {
    const later = () => {
      timer = null;
      if (!immediate) {
        callback(...args);
      }
    };
    const callNow = immediate && !timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(later, wait);
    if (callNow) {
      callback(...args);
    }
  };
};
const downloadFile = async (api, params, fileName, type = "get") => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = type === "get" ? `${api}?${queryString}` : api;
    const response = await fetch(url, {
      method: type,
      ...type === "post" && { body: JSON.stringify(params) }
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok, status: ${response.status}`);
    }
    const contentDisposition = response.headers.get("content-disposition");
    if (!contentDisposition) {
      return;
    }
    let suffix = "";
    if (contentDisposition.lastIndexOf(".")) {
      if (!fileName) {
        fileName = decodeURI(
          contentDisposition.substring(
            contentDisposition.indexOf("=") + 1,
            contentDisposition.lastIndexOf(".")
          )
        );
      }
      suffix = contentDisposition.substring(
        contentDisposition.lastIndexOf("."),
        contentDisposition.length
      );
    }
    const blobData = await response.blob();
    const objectURL = window.URL.createObjectURL(blobData);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = objectURL;
    link.setAttribute("download", fileName + suffix);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectURL);
  } catch (err) {
    console.error(`Error while downloading file: ${err}`);
  }
};
const findLcs = (str1, str2) => {
  const m2 = str1.length;
  const n = str2.length;
  const dp = Array.from(
    { length: m2 + 1 },
    () => new Array(n + 1).fill(0)
  );
  for (let i = 1; i <= m2; i++) {
    for (let j2 = 1; j2 <= n; j2++) {
      if (str1[i - 1] === str2[j2 - 1]) {
        dp[i][j2] = dp[i - 1][j2 - 1] + 1;
      } else {
        dp[i][j2] = Math.max(dp[i - 1][j2], dp[i][j2 - 1]);
      }
    }
  }
  let lcs = "";
  for (let i = m2, j2 = n; i > 0 && j2 > 0; ) {
    if (str1[i - 1] === str2[j2 - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j2--;
    } else if (dp[i - 1][j2] > dp[i][j2 - 1]) {
      i--;
    } else {
      j2--;
    }
  }
  return lcs;
};
const highlight = (lcs, subStr) => {
  const subArr = [...subStr];
  const indexArr = [...lcs].map((ch) => {
    const index2 = subArr.findIndex((item) => item === ch);
    subArr[index2] = uuid();
    return index2;
  }).sort((a, b2) => a - b2);
  const diff = [];
  for (let i = 0; i < indexArr.length; i++) {
    const start = indexArr[i];
    diff.push(subStr.charAt(start));
    if (i < indexArr.length - 1) {
      const end = indexArr[i + 1];
      if (end - start > 1) {
        diff.push(`<span style="color: #F33131">${subStr.slice(start + 1, end)}</span>`);
      }
    } else {
      if (start !== subStr.length - 1) {
        diff.push(`<span style="color: #F33131">${subStr.slice(start + 1)}</span>`);
      }
    }
  }
  return diff.join("");
};
const highlight1 = (lcs, subStr) => {
  const lcsChars = [...lcs];
  let currentIndex = 0;
  let result = "";
  for (const char of subStr) {
    if (lcsChars[currentIndex] === char) {
      result += char;
      currentIndex++;
    } else {
      result += `<span style="color: #F33131">${char}</span>`;
    }
  }
  return result;
};
const formatToFixed = (money, decimals = 2) => {
  return (Math.round((parseFloat(money) + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);
};
const format = {
  // 格式化金额展示： 12341234.246 -> $ 12,341,234.25
  formatMoney: (money, symbol = "", decimals = 2) => formatToFixed(money, decimals).replace(/\B(?=(\d{3})+\b)/g, ",").replace(/^/, `${symbol}`)
};
const getRandomColor = (format2 = "hex") => {
  const randomNum = () => Math.floor(Math.random() * 256);
  switch (format2) {
    case "hex":
      return `#${Array.from(
        { length: 6 },
        () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]
      ).join("")}`;
    case "rgb":
      return `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    case "rgba":
      return `rgba(${randomNum()}, ${randomNum()}, ${randomNum()}, ${Math.random().toFixed(1)})`;
    default:
      throw new Error("Unsupported color format");
  }
};
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2["DEBUG"] = "DEBUG";
  LogLevel2["INFO"] = "INFO";
  LogLevel2["WARN"] = "WARN";
  LogLevel2["ERROR"] = "ERROR";
  LogLevel2["FATAL"] = "FATAL";
  return LogLevel2;
})(LogLevel || {});
const moneyFormat = (number, decimals = 2, decPoint = ".", thousandsSep = ",") => {
  const n = Number.parseFloat(number);
  if (!Number.isFinite(n)) {
    return "0";
  }
  const fixedNum = n.toFixed(decimals);
  const [intPart, decimalPart] = fixedNum.split(".");
  const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
  return decimalPart ? [formattedIntPart, decimalPart].join(decPoint) : formattedIntPart;
};
const prettyLog = (config = {}) => {
  const {
    infoColor = "#909399",
    errorColor = "#F56C6C",
    warningColor = "#E6A23C",
    successColor = "#67C23A",
    fontSize = "12px",
    fontStyle = "normal",
    titlePadding = "1px",
    titleBackgroundColor,
    messageColor = "black",
    messagePaddingLeft = "5px"
  } = config;
  const logStyle = (color, isTitle) => `
    font-size: ${fontSize};
    font-style: ${fontStyle};
    background: ${titleBackgroundColor || color};
    border: 1px solid ${color};
    padding: ${titlePadding};
    border-radius: 2px;
    color: ${"#fff"};
  `;
  const prettyPrint = (title, text, color) => {
    console.log(
      `%c${title} %c${text}`,
      logStyle(color),
      `padding-left: ${messagePaddingLeft};`
    );
  };
  const logMessage = (title, text, color) => {
    prettyPrint(title, text, color);
  };
  const log = (type, text, customColor) => {
    const color = customColor || (type === "info" ? infoColor : type === "error" ? errorColor : type === "warning" ? warningColor : successColor);
    logMessage(type[0].toUpperCase() + type.slice(1), text, color);
  };
  let cachedImg = null;
  let cachedCanvas = null;
  const createOrUpdateElement = (element, type) => {
    if (!element) {
      return type === "img" ? new Image() : document.createElement("canvas");
    }
    return element;
  };
  const picture = async (url, scale = 1, x2 = 0, y2 = 0, width = 0, height = 0) => {
    cachedImg = createOrUpdateElement(cachedImg, "img");
    cachedCanvas = createOrUpdateElement(cachedCanvas, "canvas");
    const img = cachedImg;
    const canvas = cachedCanvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }
    img.crossOrigin = "anonymous";
    img.src = url;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const drawWidth = width || img.width;
        const drawHeight = height || img.height;
        canvas.width = drawWidth;
        canvas.height = drawHeight;
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, drawWidth, drawHeight);
        ctx.drawImage(img, x2, y2, drawWidth, drawHeight);
        const dataUri = canvas.toDataURL("image/png");
        console.log(
          `%c sup?`,
          `font-size: 1px;
          padding: ${Math.floor(drawHeight * scale / 2)}px ${Math.floor(drawWidth * scale / 2)}px;
          background-image: url(${dataUri});
          background-repeat: no-repeat;
          background-position: center;
          background-size: ${drawWidth * scale}px ${drawHeight * scale}px;
          color: transparent;
          `
        );
        resolve();
      };
      img.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
  };
  return {
    ...{
      info: (text) => log("info", text),
      error: (text) => log("error", text),
      warning: (text) => log("warning", text),
      success: (text) => log("success", text),
      picture: (url, scale, x2, y2, width, height) => picture(url, scale, x2, y2, width, height)
    },
    log
  };
};
const throttle = (callback, wait = 1e3, immediate = false) => {
  let last = 0;
  let timer = null;
  return (...args) => {
    const now = +/* @__PURE__ */ new Date();
    if (immediate && !timer) {
      callback.apply(void 0, args);
      immediate = false;
    }
    if (now - last > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      callback.apply(void 0, args);
    } else if (!timer && !immediate) {
      timer = setTimeout(
        () => {
          timer = null;
          last = +/* @__PURE__ */ new Date();
          callback.apply(void 0, args);
        },
        wait - (now - last)
      );
    }
  };
};
const mobileCheck = (value) => /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
const IDCardCheck = (value) => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
  value
);
const emailCheck = (value) => /^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/.test(value);
export {
  IDCardCheck,
  LogLevel,
  OSType,
  argumentsSerializate,
  bottomVisible,
  it as chineseDays,
  index as chineseWorkday,
  commafy,
  convertToCamelCase,
  copy,
  copyTableDataListener,
  createScrollControl,
  debounce,
  downloadFile,
  emailCheck,
  exitFullscreen,
  findLcs,
  foreachTree,
  format,
  formatToFixed,
  fuzzyQuery,
  getBatteryStatus,
  getCurrentPosition,
  getOSType,
  getRandomColor,
  getTime,
  getURLParameters,
  hideMobile,
  highlight,
  highlight1,
  isEqual,
  isObject,
  launchFullscreen,
  merge,
  mobileCheck,
  moneyFormat,
  noRepeat,
  parseUrl,
  prettyLog,
  quickSort,
  scrollTo,
  smoothScroll,
  throttle,
  timestampToTime,
  turnCase,
  typeOf,
  useBeforeUnload,
  useDebounce,
  uuid,
  uuid1
};
