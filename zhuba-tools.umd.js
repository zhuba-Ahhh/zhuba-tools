!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["zhuba-tools"]={},e.React)}(this,(function(e,t){"use strict";const o=(e,t,n="children",r=0,l)=>{for(const c of e)t(c,r,l),c[n]&&Array.isArray(c[n])&&o(c[n],t,n,r+1,c)};var n=(e=>(e[e.IOS=1]="IOS",e[e.Android=2]="Android",e[e.Windows=3]="Windows",e[e.MacOS=4]="MacOS",e[e.Other=5]="Other",e))(n||{});let r=0;const l=(e=0,t=8)=>{const o=-1===e?document.documentElement.scrollHeight-window.innerHeight:e,n=document.documentElement.scrollTop||document.body.scrollTop;(-1===e||n<o)&&n<document.documentElement.scrollHeight-window.innerHeight?(window.requestAnimationFrame((()=>{l(e,t)})),window.scrollTo(0,n+(o-n)/t)):n>o&&(window.requestAnimationFrame((()=>{l(e,t)})),window.scrollTo(0,n-(n-o)/t))},c=(e,t=2)=>(Math.round((parseFloat(e)+Number.EPSILON)*Math.pow(10,t))/Math.pow(10,t)).toFixed(t),s={formatMoney:(e,t="",o=2)=>c(e,o).replace(/\B(?=(\d{3})+\b)/g,",").replace(/^/,`${t}`)};e.IDCardCheck=e=>/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(e),e.OSType=n,e.bottomVisible=()=>document.documentElement.clientHeight+window.scrollY>=(document.documentElement.scrollHeight||document.documentElement.clientHeight),e.commafy=e=>e.toString().includes(".")?e.toLocaleString():e.toString().replace(/(\d)(?=(?:\d{3})+$)/g,"$1,"),e.debounce=(e,t=1e3,o=!1)=>{let n=null;return(...r)=>{const l=o&&!n;n&&clearTimeout(n),n=setTimeout((()=>{n=null,o||e(...r)}),t),l&&e(...r)}},e.downloadFile=async(e,t,o,n="get")=>{try{const r=new URLSearchParams(t).toString(),l="get"===n?`${e}?${r}`:e,c=await fetch(l,{method:n,..."post"===n&&{body:JSON.stringify(t)}});if(!c.ok)throw new Error(`Network response was not ok, status: ${c.status}`);const s=c.headers.get("content-disposition");if(!s)return;let i="";s.lastIndexOf(".")&&(o||(o=decodeURI(s.substring(s.indexOf("=")+1,s.lastIndexOf(".")))),i=s.substring(s.lastIndexOf("."),s.length));const u=await c.blob(),a=window.URL.createObjectURL(u),d=document.createElement("a");d.style.display="none",d.href=a,d.setAttribute("download",o+i),document.body.appendChild(d),d.click(),document.body.removeChild(d),window.URL.revokeObjectURL(a)}catch(r){}},e.emailCheck=e=>/^([A-Za-z0-9_\-\\.])+\\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/.test(e),e.exitFullscreen=()=>{(null==document?void 0:document.exitFullscreen)&&document.exitFullscreen()},e.foreachTree=o,e.format=s,e.formatToFixed=c,e.fuzzyQuery=(e,t,o="name")=>{const n=Array.isArray(t)?t.map((e=>new RegExp(e))):[new RegExp(t)],r=Array.isArray(o)?o:[o],l=new Set;for(const c of e)for(const e of r)for(const t of n)if(t.test(String(c[e]))){l.add(c);break}return Array.from(l)},e.getOSType=()=>{const e=navigator.userAgent,t=e.includes("Android")||e.includes("Linux"),o=!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),n=e.includes("Windows"),r=e.includes("Macintosh");return o?1:t?2:n?3:r?4:5},e.getURLParameters=e=>(e.match(/([^?=&]+)(=([^&]*))/g)??[]).reduce(((e,t)=>{const[o,n]=t.split("=");return e[o]=decodeURIComponent(n),e}),{}),e.hideMobile=e=>e.replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2"),e.launchFullscreen=e=>{(null==e?void 0:e.requestFullscreen)?e.requestFullscreen():(null==e?void 0:e.mozRequestFullScreen)?e.mozRequestFullScreen():(null==e?void 0:e.msRequestFullscreen)?e.msRequestFullscreen():(null==e?void 0:e.webkitRequestFullScreen)&&e.webkitRequestFullScreen()},e.mobileCheck=e=>/^[1][3,4,5,7,8][0-9]{9}$/.test(e),e.moneyFormat=(e,t=2,o=".",n=",")=>{const r=Number.parseFloat(e);if(!Number.isFinite(r))return"0";const l=r.toFixed(t),[c,s]=l.split("."),i=c.replace(/\B(?=(\d{3})+(?!\d))/g,n);return s?[i,s].join(o):i},e.noRepeat=e=>e?[...new Set(e)]:[],e.preventScroll=()=>{r=window.scrollY;const e=document.body.style;e.overflowY="hidden",e.position="fixed",e.width="100%",e.top=-r+"px"},e.recoverScroll=()=>{const e=document.body.style;e.overflowY="auto",e.position="static",window.scrollTo(0,r)},e.scrollTo=l,e.smoothScroll=e=>{var t;null==(t=document.querySelector(e))||t.scrollIntoView({behavior:"smooth"})},e.throttle=(e,t=1e3,o=!1)=>{let n=0,r=null;return(...l)=>{const c=+new Date;o&&!r&&(e.apply(void 0,l),o=!1),c-n>t?(r&&(clearTimeout(r),r=null),n=c,e.apply(void 0,l)):r||o||(r=setTimeout((()=>{r=null,n=+new Date,e.apply(void 0,l)}),t-(c-n)))}},e.timestampToTime=(e=Date.now(),t=!0,o="YYYY-MM-DD HH:mm:ss")=>{const n=new Date(t?e:1e3*e),r=e=>e<10?"0"+e:String(e);return o.replace("YYYY",String(n.getUTCFullYear())).replace("MM",r(n.getUTCMonth()+1)).replace("DD",r(n.getUTCDate())).replace("HH",r(n.getUTCHours())).replace("mm",r(n.getUTCMinutes())).replace("ss",r(n.getUTCSeconds()))},e.turnCase=(e,t=1)=>{if("string"!=typeof e)throw new Error("Input must be a string");if(0===e.length)return e;switch(t){case 1:return e.toUpperCase();case 2:return e.toLowerCase();case 3:return e[0].toUpperCase()+e.substring(1).toLowerCase();default:return e}},e.typeOf=e=>Object.prototype.toString.call(e).slice(8,-1).toLowerCase(),e.useBeforeUnload=(e=[])=>{t.useEffect((()=>{const t=t=>{e.some((e=>e))&&(t.preventDefault(),t.returnValue="")};return window.addEventListener("beforeunload",t),()=>{window.removeEventListener("beforeunload",t)}}),[e])},e.useDebounce=(e,o=1e3,n=[])=>{const{current:r}=t.useRef({callback:e,timer:null});return t.useEffect((function(){r.callback=e}),[e]),t.useCallback((function(...e){r.timer&&clearTimeout(r.timer),r.timer=setTimeout((()=>{r.callback(...e)}),o)}),n)},e.uuid=(e=6,t="u_")=>{const o="abcdefhijkmnprstwxyz0123456789";let n="";for(let r=0;r<e;r++)n+=o.charAt(Math.floor(30*Math.random()));return t+n},Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));