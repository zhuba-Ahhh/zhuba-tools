!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["zhuba-tools"]={},e.React)}(this,(function(e,t){"use strict";const o=(e,t,r="children",n=0,c)=>{for(const l of e)t(l,n,c),l[r]&&Array.isArray(l[r])&&o(l[r],t,r,n+1,l)},r=e=>{if(e.length<2)return e;const t=[],o=[],n=e.splice(0,1);for(const r of e)r>n?o.push(r):t.push(r);return r(t).concat(n,r(o))};var n=(e=>(e[e.IOS=1]="IOS",e[e.Android=2]="Android",e[e.Windows=3]="Windows",e[e.MacOS=4]="MacOS",e[e.Other=5]="Other",e))(n||{});const c=(e=0,t=8)=>{const o=-1===e?document.documentElement.scrollHeight-window.innerHeight:e,r=document.documentElement.scrollTop||document.body.scrollTop;(-1===e||r<o)&&r<document.documentElement.scrollHeight-window.innerHeight?(window.requestAnimationFrame((()=>{c(e,t)})),window.scrollTo(0,r+(o-r)/t)):r>o&&(window.requestAnimationFrame((()=>{c(e,t)})),window.scrollTo(0,r-(r-o)/t))},l=(e=6,t="u_")=>{const o="abcdefhijkmnprstwxyz0123456789";let r="";for(let n=0;n<e;n++)r+=o.charAt(Math.floor(30*Math.random()));return t+r};function s(e){return"[object Object]"===Object.prototype.toString.call(e)}const i=(e,t=new WeakMap)=>{if(!s(e))throw TypeError("arguments must be Object");if(t.has(e))return t.get(e);const o={};for(const r of Object.keys(e)){const n=e[r];"object"!=typeof n||null===n?o[r]=n:Array.isArray(n)?o[r]=[...n]:n instanceof Set?o[r]=new Set([...n]):n instanceof Map?o[r]=new Map([...n]):(t.set(n,n),o[r]=i(n,t))}return o},a=(e,t)=>{if(e===t)return!0;const o=typeof e;if(o!==typeof t)return!1;if("object"!==o||null===e||null===t)return e===t;if(Array.isArray(e)){if(!Array.isArray(t)||e.length!==t.length)return!1;for(let o=0;o<e.length;o++)if(!a(e[o],t[o]))return!1;return!0}const r=Object.keys(e),n=Object.keys(t);if(r.length!==n.length)return!1;for(const c of r)if(!n.includes(c)||!a(e[c],t[c]))return!1;return!0};const u=e=>{if(null===e||"object"!=typeof e||Array.isArray(e))return e;const t={};for(const o in e)if(Object.prototype.hasOwnProperty.call(e,o)){const r=o.replace(/_(\w)/g,(function(e,t){return t.toUpperCase()})),n=e[o];t[r]="object"==typeof n&&null!==n?u(n):n}return t},d=(e,t=2)=>(Math.round((parseFloat(e)+Number.EPSILON)*Math.pow(10,t))/Math.pow(10,t)).toFixed(t),f={formatMoney:(e,t="",o=2)=>d(e,o).replace(/\B(?=(\d{3})+\b)/g,",").replace(/^/,`${t}`)};e.IDCardCheck=e=>/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e),e.OSType=n,e.argumentsSerializate=e=>Object.keys(e).map((t=>{const o=e[t],r="string"==typeof o||"number"==typeof o||"boolean"==typeof o?encodeURIComponent(o.toString()):encodeURIComponent(JSON.stringify(o));return`${encodeURIComponent(t)}=${r}`})).join("&"),e.bottomVisible=()=>document.documentElement.clientHeight+window.scrollY>=(document.documentElement.scrollHeight||document.documentElement.clientHeight),e.commafy=e=>e.toString().includes(".")?e.toLocaleString():e.toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),e.convertToCamelCase=u,e.copy=i,e.copyTableDataListener=e=>{const t=(null==e?void 0:e.cleanupFunction)||(e=>e.replace(/\s+/g," ")),o=e=>{var o;const r=null==(o=window.getSelection())?void 0:o.toString();if(r){const o=t(r);e.preventDefault(),navigator.clipboard.writeText(o).catch((e=>{}))}};return document.addEventListener("copy",o),()=>{document.removeEventListener("copy",o)}},e.createScrollControl=()=>{let e=0,t=null;const o=e=>{const t=document.body.style;Object.assign(t,e)};return{preventScroll:()=>{e=window.scrollY,t=document.body.style.cssText?{...document.body.style}:null,o({overflowY:"hidden",position:"fixed",width:"100%",top:-e+"px"})},recoverScroll:()=>{o(null!==t?t:{overflowY:"",position:"",width:"",top:""}),window.scrollTo(0,e)}}},e.debounce=(e,t=1e3,o=!1)=>{let r=null;return(...n)=>{const c=o&&!r;r&&clearTimeout(r),r=setTimeout((()=>{r=null,o||e(...n)}),t),c&&e(...n)}},e.downloadFile=async(e,t,o,r="get")=>{try{const n=new URLSearchParams(t).toString(),c="get"===r?`${e}?${n}`:e,l=await fetch(c,{method:r,..."post"===r&&{body:JSON.stringify(t)}});if(!l.ok)throw new Error(`Network response was not ok, status: ${l.status}`);const s=l.headers.get("content-disposition");if(!s)return;let i="";s.lastIndexOf(".")&&(o||(o=decodeURI(s.substring(s.indexOf("=")+1,s.lastIndexOf(".")))),i=s.substring(s.lastIndexOf("."),s.length));const a=await l.blob(),u=window.URL.createObjectURL(a),d=document.createElement("a");d.style.display="none",d.href=u,d.setAttribute("download",o+i),document.body.appendChild(d),d.click(),document.body.removeChild(d),window.URL.revokeObjectURL(u)}catch(n){}},e.emailCheck=e=>/^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/.test(e),e.exitFullscreen=()=>{(null==document?void 0:document.exitFullscreen)&&document.exitFullscreen()},e.findLcs=(e,t)=>{const o=e.length,r=t.length,n=Array.from({length:o+1},(()=>new Array(r+1).fill(0)));for(let l=1;l<=o;l++)for(let o=1;o<=r;o++)e[l-1]===t[o-1]?n[l][o]=n[l-1][o-1]+1:n[l][o]=Math.max(n[l-1][o],n[l][o-1]);let c="";for(let l=o,s=r;l>0&&s>0;)e[l-1]===t[s-1]?(c=e[l-1]+c,l--,s--):n[l-1][s]>n[l][s-1]?l--:s--;return c},e.foreachTree=o,e.format=f,e.formatToFixed=d,e.fuzzyQuery=(e,t,o="name")=>{const r=Array.isArray(t)?t.map((e=>new RegExp(e))):[new RegExp(t)],n=Array.isArray(o)?o:[o],c=new Set;for(const l of e)for(const e of n)for(const t of r)if(t.test(String(l[e]))){c.add(l);break}return Array.from(c)},e.getBatteryStatus=async()=>{if(!navigator.getBattery)throw new Error("Battery status is not supported by this browser.");const e=await navigator.getBattery();return{charging:e.charging,chargingTime:e.chargingTime,dischargingTime:e.dischargingTime,level:e.level}},e.getCurrentPosition=()=>new Promise(((e,t)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition((t=>{const{latitude:o,longitude:r,accuracy:n,altitude:c,altitudeAccuracy:l,speed:s,heading:i}=t.coords;e({timestamp:t.timestamp,latitude:o,longitude:r,accuracy:n,altitude:c,altitudeAccuracy:l,speed:s,heading:i})}),(e=>{t(e)})):t(new Error("Geolocation is not supported by this browser."))})),e.getOSType=()=>{const e=navigator.userAgent,t=e.includes("Android")||e.includes("Linux"),o=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),r=e.includes("Windows"),n=e.includes("Macintosh");return o?1:t?2:r?3:n?4:5},e.getRandomColor=(e="hex")=>{const t=()=>Math.floor(256*Math.random());switch(e){case"hex":return`#${Array.from({length:6},(()=>"0123456789ABCDEF"[Math.floor(16*Math.random())])).join("")}`;case"rgb":return`rgb(${t()}, ${t()}, ${t()})`;case"rgba":return`rgba(${t()}, ${t()}, ${t()}, ${Math.random().toFixed(1)})`;default:throw new Error("Unsupported color format")}},e.getTime=()=>(new Date).toLocaleString(),e.getURLParameters=e=>(e.match(/([^?=&]+)(=([^&]*))/g)??[]).reduce(((e,t)=>{const[o,r]=t.split("=");return e[o]=decodeURIComponent(r),e}),{}),e.hideMobile=e=>e.replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2"),e.highlight=(e,t)=>{const o=[...t],r=[...e].map((e=>{const t=o.findIndex((t=>t===e));return o[t]=l(),t})).sort(((e,t)=>e-t)),n=[];for(let c=0;c<r.length;c++){const e=r[c];if(n.push(t.charAt(e)),c<r.length-1){const o=r[c+1];o-e>1&&n.push(`<span style="color: #F33131">${t.slice(e+1,o)}</span>`)}else e!==t.length-1&&n.push(`<span style="color: #F33131">${t.slice(e+1)}</span>`)}return n.join("")},e.highlight1=(e,t)=>{const o=[...e];let r=0,n="";for(const c of t)o[r]===c?(n+=c,r++):n+=`<span style="color: #F33131">${c}</span>`;return n},e.isEqual=a,e.isObject=s,e.launchFullscreen=e=>{(null==e?void 0:e.requestFullscreen)?e.requestFullscreen():(null==e?void 0:e.mozRequestFullScreen)?e.mozRequestFullScreen():(null==e?void 0:e.msRequestFullscreen)?e.msRequestFullscreen():(null==e?void 0:e.webkitRequestFullScreen)&&e.webkitRequestFullScreen()},e.merge=function e(t,o){if(!s(t))return o;if(!s(o))return t;const r=i(t),n=i(o);return Object.keys(n).forEach((t=>{const o=r[t],c=n[t];Array.isArray(o)&&Array.isArray(c)?r[t]=o.concat(c):s(o)&&s(c)?r[t]=e(o,c):r[t]=c??r[t]})),r},e.mobileCheck=e=>/^[1][3,4,5,7,8][0-9]{9}$/.test(e),e.moneyFormat=(e,t=2,o=".",r=",")=>{const n=Number.parseFloat(e);if(!Number.isFinite(n))return"0";const c=n.toFixed(t),[l,s]=c.split("."),i=l.replace(/\B(?=(\d{3})+(?!\d))/g,r);return s?[i,s].join(o):i},e.noRepeat=e=>e?[...new Set(e)]:[],e.parseUrl=e=>{const t=e.indexOf("?"),o=new URLSearchParams(t>=0?e.substring(t):""),r={};return o.forEach(((e,t)=>{r[t]=/^\d+(\.\d+)?$/.test(e)?parseFloat(e):decodeURIComponent(e)})),r},e.quickSort=r,e.scrollTo=c,e.smoothScroll=e=>{var t;null==(t=document.querySelector(e))||t.scrollIntoView({behavior:"smooth"})},e.throttle=(e,t=1e3,o=!1)=>{let r=0,n=null;return(...c)=>{const l=+new Date;o&&!n&&(e.apply(void 0,c),o=!1),l-r>t?(n&&(clearTimeout(n),n=null),r=l,e.apply(void 0,c)):n||o||(n=setTimeout((()=>{n=null,r=+new Date,e.apply(void 0,c)}),t-(l-r)))}},e.timestampToTime=(e=Date.now(),t=!0,o="YYYY-MM-DD HH:mm:ss")=>{const r=new Date(t?e:1e3*e),n=e=>e<10?"0"+e:String(e);return o.replace("YYYY",String(r.getUTCFullYear())).replace("MM",n(r.getUTCMonth()+1)).replace("DD",n(r.getUTCDate())).replace("HH",n(r.getUTCHours())).replace("mm",n(r.getUTCMinutes())).replace("ss",n(r.getUTCSeconds()))},e.turnCase=(e,t=1)=>{if("string"!=typeof e)throw new Error("Input must be a string");if(0===e.length)return e;switch(t){case 1:return e.toUpperCase();case 2:return e.toLowerCase();case 3:return e[0].toUpperCase()+e.substring(1).toLowerCase();default:return e}},e.typeOf=e=>Object.prototype.toString.call(e).slice(8,-1).toLowerCase(),e.useBeforeUnload=(e=[])=>{t.useEffect((()=>{const t=t=>{e.some((e=>e))&&(t.preventDefault(),t.returnValue="")};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}}),[e])},e.useDebounce=(e,o=1e3,r=[])=>{const{current:n}=t.useRef({callback:e,timer:null});return t.useEffect((function(){n.callback=e}),[e]),t.useCallback((function(...e){n.timer&&clearTimeout(n.timer),n.timer=setTimeout((()=>{n.callback(...e)}),o)}),r)},e.uuid=l,e.uuid1=function(e="u_"){return e+Date.now().toString(36)+Math.floor(1e4*Math.random()).toString(36)},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));
