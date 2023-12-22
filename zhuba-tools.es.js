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
getBatteryStatus().then((status) => {
  console.log(status);
}).catch((error) => {
  console.error(error);
});
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
let scrollTop = 0;
const preventScroll = () => {
  scrollTop = window.scrollY;
  const bodyStyle = document.body.style;
  bodyStyle.overflowY = "hidden";
  bodyStyle.position = "fixed";
  bodyStyle.width = "100%";
  bodyStyle.top = -scrollTop + "px";
};
const recoverScroll = () => {
  const bodyStyle = document.body.style;
  bodyStyle.overflowY = "auto";
  bodyStyle.position = "static";
  window.scrollTo(0, scrollTop);
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
  return useCallback(function f(...args) {
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
      const newKey = key.replace(/_(\w)/g, function(_, p1) {
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
  const m = str1.length;
  const n = str2.length;
  const dp = Array.from(
    { length: m + 1 },
    () => new Array(n + 1).fill(0)
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  let lcs = "";
  for (let i = m, j = n; i > 0 && j > 0; ) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return lcs;
};
const highlight = (lcs, subStr) => {
  const subArr = [...subStr];
  const indexArr = [...lcs].map((ch) => {
    const index = subArr.findIndex((item) => item === ch);
    subArr[index] = uuid();
    return index;
  }).sort((a, b) => a - b);
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
  OSType,
  argumentsSerializate,
  bottomVisible,
  commafy,
  convertToCamelCase,
  debounce,
  downloadFile,
  emailCheck,
  exitFullscreen,
  findLcs,
  foreachTree,
  format,
  formatToFixed,
  fuzzyQuery,
  getCurrentPosition,
  getOSType,
  getRandomColor,
  getTime,
  getURLParameters,
  hideMobile,
  highlight,
  highlight1,
  launchFullscreen,
  mobileCheck,
  moneyFormat,
  noRepeat,
  parseUrl,
  preventScroll,
  quickSort,
  recoverScroll,
  scrollTo,
  smoothScroll,
  throttle,
  timestampToTime,
  turnCase,
  typeOf,
  useBeforeUnload,
  useDebounce,
  uuid
};
