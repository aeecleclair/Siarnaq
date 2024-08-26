"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[213],{4697:function(e,t,r){r.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.394.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(8030).Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},8035:function(e,t,r){r.d(t,{Lp:function(){return g},eI:function(){return b}});let s=/\{[^{}]+\}/g,i=({allowReserved:e,name:t,value:r})=>{if(null==r)return"";if("object"==typeof r)throw Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");return`${t}=${e?r:encodeURIComponent(r)}`},n=({allowReserved:e,explode:t,name:r,style:s,value:n})=>{if(!t){let t=(e?n:n.map(e=>encodeURIComponent(e))).join((e=>{switch(e){case"form":default:return",";case"pipeDelimited":return"|";case"spaceDelimited":return"%20"}})(s));switch(s){case"label":return`.${t}`;case"matrix":return`;${r}=${t}`;case"simple":return t;default:return`${r}=${t}`}}let o=(e=>{switch(e){case"label":return".";case"matrix":return";";case"simple":return",";default:return"&"}})(s),a=n.map(t=>"label"===s||"simple"===s?e?t:encodeURIComponent(t):i({allowReserved:e,name:r,value:t})).join(o);return"label"===s||"matrix"===s?o+a:a},o=({allowReserved:e,explode:t,name:r,style:s,value:n})=>{if("deepObject"!==s&&!t){let t=[];Object.entries(n).forEach(([r,s])=>{t=[...t,r,e?s:encodeURIComponent(s)]});let i=t.join(",");switch(s){case"form":return`${r}=${i}`;case"label":return`.${i}`;case"matrix":return`;${r}=${i}`;default:return i}}let o=(e=>{switch(e){case"label":return".";case"matrix":return";";case"simple":return",";default:return"&"}})(s),a=Object.entries(n).map(([t,n])=>i({allowReserved:e,name:"deepObject"===s?`${r}[${t}]`:t,value:n})).join(o);return"label"===s||"matrix"===s?o+a:a},a=({allowReserved:e,array:t,object:r}={})=>s=>{let a=[];if(s&&"object"==typeof s)for(let u in s){let c=s[u];null!=c&&(a=Array.isArray(c)?[...a,n({allowReserved:e,explode:!0,name:u,style:"form",value:c,...t})]:"object"!=typeof c?[...a,i({allowReserved:e,name:u,value:c})]:[...a,o({allowReserved:e,explode:!0,name:u,style:"deepObject",value:c,...r})])}return a.join("&")},u=({baseUrl:e,path:t,query:r,querySerializer:a,url:u})=>{let c=e+(u.startsWith("/")?u:`/${u}`);t&&(c=(({path:e,url:t})=>{let r=t,a=t.match(s);if(a)for(let t of a){let s=!1,a=t.substring(1,t.length-1),u="simple";a.endsWith("*")&&(s=!0,a=a.substring(0,a.length-1)),a.startsWith(".")?(a=a.substring(1),u="label"):a.startsWith(";")&&(a=a.substring(1),u="matrix");let c=e[a];null!=c&&(r=Array.isArray(c)?r.replace(t,n({explode:s,name:a,style:u,value:c})):"object"!=typeof c?"matrix"!==u?r.replace(t,"label"===u?`.${c}`:c):r.replace(t,`;${i({name:a,value:c})}`):r.replace(t,o({explode:s,name:a,style:u,value:c})))}return r})({path:t,url:c}));let l=r?a(r):"";return l.startsWith("?")&&(l=l.substring(1)),l&&(c+=`?${l}`),c},c=(...e)=>{let t=new Headers;for(let r of e)if(r&&"object"==typeof r)for(let[e,s]of r instanceof Headers?r.entries():Object.entries(r))if(null===s)t.delete(e);else if(Array.isArray(s))for(let r of s)t.append(e,r);else void 0!==s&&t.set(e,"object"==typeof s?JSON.stringify(s):s);return t};class l{_fns;constructor(){this._fns=[]}eject(e){let t=this._fns.indexOf(e);-1!==t&&(this._fns=[...this._fns.slice(0,t),...this._fns.slice(t+1)])}use(e){this._fns=[...this._fns,e]}}let h=()=>({request:new l,response:new l}),d={bodySerializer:e=>JSON.stringify(e)},f=a({allowReserved:!1,array:{explode:!0,style:"form"},object:{explode:!0,style:"deepObject"}}),p={"Content-Type":"application/json"},y=()=>({...d,baseUrl:"",fetch:globalThis.fetch,global:!0,headers:p,querySerializer:f}),m=y(),v=h(),b=e=>{let t=y(),r={...t,...e};r.baseUrl?.endsWith("/")&&(r.baseUrl=r.baseUrl.substring(0,r.baseUrl.length-1)),r.headers=c(t.headers,r.headers),r.global&&(m={...r});let s=()=>r.global?m:r,i=r.global?v:h(),n=async e=>{let t=s(),r={...t,...e,headers:c(t.headers,e.headers)};r.body&&r.bodySerializer&&(r.body=r.bodySerializer(r.body));let n=u({baseUrl:r.baseUrl??"",path:r.path,query:r.query,querySerializer:"function"==typeof r.querySerializer?r.querySerializer:a(r.querySerializer),url:r.url}),o={redirect:"follow",...r};o.body instanceof FormData&&o.headers.delete("Content-Type");let l=new Request(n,o);for(let e of i.request._fns)l=await e(l,r);let h=r.fetch,d=await h(l);for(let e of i.response._fns)d=await e(d,l,r);let f={request:l,response:d};if(204===d.status||"0"===d.headers.get("Content-Length"))return d.ok?{data:{},...f}:{error:{},...f};if(d.ok){if("stream"===r.parseAs)return{data:d.body,...f};let t=("auto"===r.parseAs?(e=>{if(e)return"application/json"===e||e.endsWith("+json")?"json":"multipart/form-data"===e?"formData":["application/octet-stream","application/pdf","application/zip","audio/","image/","video/"].some(t=>e.includes(t))?"blob":e.includes("text/")?"text":void 0})(d.headers.get("Content-Type")):r.parseAs)??"json",s=await d[t]();return"json"===t&&e.responseTransformer&&(s=e.responseTransformer(s)),{data:s,...f}}let p=await d.text();try{p=JSON.parse(p)}catch{}return{error:p,...f}};return{connect:e=>n({...e,method:"CONNECT"}),delete:e=>n({...e,method:"DELETE"}),get:e=>n({...e,method:"GET"}),getConfig:s,head:e=>n({...e,method:"HEAD"}),interceptors:i,options:e=>n({...e,method:"OPTIONS"}),patch:e=>n({...e,method:"PATCH"}),post:e=>n({...e,method:"POST"}),put:e=>n({...e,method:"PUT"}),request:n,trace:e=>n({...e,method:"TRACE"})}},g=b(m)},1383:function(e,t,r){r.d(t,{z:function(){return a}});var s=r(2265),i=r(4887),n=r(1584),o=r(1336);let a=e=>{let{present:t,children:r}=e,a=function(e){var t,r;let[n,a]=(0,s.useState)(),c=(0,s.useRef)({}),l=(0,s.useRef)(e),h=(0,s.useRef)("none"),[d,f]=(t=e?"mounted":"unmounted",r={mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}},(0,s.useReducer)((e,t)=>{let s=r[e][t];return null!=s?s:e},t));return(0,s.useEffect)(()=>{let e=u(c.current);h.current="mounted"===d?e:"none"},[d]),(0,o.b)(()=>{let t=c.current,r=l.current;if(r!==e){let s=h.current,i=u(t);e?f("MOUNT"):"none"===i||(null==t?void 0:t.display)==="none"?f("UNMOUNT"):r&&s!==i?f("ANIMATION_OUT"):f("UNMOUNT"),l.current=e}},[e,f]),(0,o.b)(()=>{if(n){let e=e=>{let t=u(c.current).includes(e.animationName);e.target===n&&t&&(0,i.flushSync)(()=>f("ANIMATION_END"))},t=e=>{e.target===n&&(h.current=u(c.current))};return n.addEventListener("animationstart",t),n.addEventListener("animationcancel",e),n.addEventListener("animationend",e),()=>{n.removeEventListener("animationstart",t),n.removeEventListener("animationcancel",e),n.removeEventListener("animationend",e)}}f("ANIMATION_END")},[n,f]),{isPresent:["mounted","unmountSuspended"].includes(d),ref:(0,s.useCallback)(e=>{e&&(c.current=getComputedStyle(e)),a(e)},[])}}(t),c="function"==typeof r?r({present:a.isPresent}):s.Children.only(r),l=(0,n.e)(a.ref,c.ref);return"function"==typeof r||a.isPresent?(0,s.cloneElement)(c,{ref:l}):null};function u(e){return(null==e?void 0:e.animationName)||"none"}a.displayName="Presence"},4939:function(e,t,r){r.d(t,{j:function(){return n}});var s=r(9010),i=r(6298),n=new class extends s.l{#e;#t;#r;constructor(){super(),this.#r=e=>{if(!i.sk&&window.addEventListener){let t=()=>e();return window.addEventListener("visibilitychange",t,!1),()=>{window.removeEventListener("visibilitychange",t)}}}}onSubscribe(){this.#t||this.setEventListener(this.#r)}onUnsubscribe(){this.hasListeners()||(this.#t?.(),this.#t=void 0)}setEventListener(e){this.#r=e,this.#t?.(),this.#t=e(e=>{"boolean"==typeof e?this.setFocused(e):this.onFocus()})}setFocused(e){this.#e!==e&&(this.#e=e,this.onFocus())}onFocus(){let e=this.isFocused();this.listeners.forEach(t=>{t(e)})}isFocused(){return"boolean"==typeof this.#e?this.#e:globalThis.document?.visibilityState!=="hidden"}}},9948:function(e,t,r){r.d(t,{V:function(){return s}});var s=function(){let e=[],t=0,r=e=>{e()},s=e=>{e()},i=e=>setTimeout(e,0),n=s=>{t?e.push(s):i(()=>{r(s)})},o=()=>{let t=e;e=[],t.length&&i(()=>{s(()=>{t.forEach(e=>{r(e)})})})};return{batch:e=>{let r;t++;try{r=e()}finally{--t||o()}return r},batchCalls:e=>(...t)=>{n(()=>{e(...t)})},schedule:n,setNotifyFunction:e=>{r=e},setBatchNotifyFunction:e=>{s=e},setScheduler:e=>{i=e}}}()},9937:function(e,t,r){r.d(t,{N:function(){return n}});var s=r(9010),i=r(6298),n=new class extends s.l{#s=!0;#t;#r;constructor(){super(),this.#r=e=>{if(!i.sk&&window.addEventListener){let t=()=>e(!0),r=()=>e(!1);return window.addEventListener("online",t,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",t),window.removeEventListener("offline",r)}}}}onSubscribe(){this.#t||this.setEventListener(this.#r)}onUnsubscribe(){this.hasListeners()||(this.#t?.(),this.#t=void 0)}setEventListener(e){this.#r=e,this.#t?.(),this.#t=e(this.setOnline.bind(this))}setOnline(e){this.#s!==e&&(this.#s=e,this.listeners.forEach(t=>{t(e)}))}isOnline(){return this.#s}}},2459:function(e,t,r){r.d(t,{A:function(){return a},z:function(){return u}});var s=r(6298),i=r(9948),n=r(924),o=r(3494),a=class extends o.F{#i;#n;#o;#a;#u;#c;constructor(e){super(),this.#c=!1,this.#u=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.#o=e.cache,this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.#i=e.state||function(e){let t="function"==typeof e.initialData?e.initialData():e.initialData,r=void 0!==t,s=r?"function"==typeof e.initialDataUpdatedAt?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:r?s??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:r?"success":"pending",fetchStatus:"idle"}}(this.options),this.state=this.#i,this.scheduleGc()}get meta(){return this.options.meta}get promise(){return this.#a?.promise}setOptions(e){this.options={...this.#u,...e},this.updateGcTime(this.options.gcTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.#o.remove(this)}setData(e,t){let r=(0,s.oE)(this.state.data,e,this.options);return this.#l({data:r,type:"success",dataUpdatedAt:t?.updatedAt,manual:t?.manual}),r}setState(e,t){this.#l({type:"setState",state:e,setStateOptions:t})}cancel(e){let t=this.#a?.promise;return this.#a?.cancel(e),t?t.then(s.ZT).catch(s.ZT):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.#i)}isActive(){return this.observers.some(e=>!1!==e.options.enabled)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return!!this.state.isInvalidated||(this.getObserversCount()>0?this.observers.some(e=>e.getCurrentResult().isStale):void 0===this.state.data)}isStaleByTime(e=0){return this.state.isInvalidated||void 0===this.state.data||!(0,s.Kp)(this.state.dataUpdatedAt,e)}onFocus(){let e=this.observers.find(e=>e.shouldFetchOnWindowFocus());e?.refetch({cancelRefetch:!1}),this.#a?.continue()}onOnline(){let e=this.observers.find(e=>e.shouldFetchOnReconnect());e?.refetch({cancelRefetch:!1}),this.#a?.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),this.#o.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.includes(e)&&(this.observers=this.observers.filter(t=>t!==e),this.observers.length||(this.#a&&(this.#c?this.#a.cancel({revert:!0}):this.#a.cancelRetry()),this.scheduleGc()),this.#o.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.#l({type:"invalidate"})}fetch(e,t){if("idle"!==this.state.fetchStatus){if(void 0!==this.state.data&&t?.cancelRefetch)this.cancel({silent:!0});else if(this.#a)return this.#a.continueRetry(),this.#a.promise}if(e&&this.setOptions(e),!this.options.queryFn){let e=this.observers.find(e=>e.options.queryFn);e&&this.setOptions(e.options)}let r=new AbortController,i=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(this.#c=!0,r.signal)})},o={fetchOptions:t,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:()=>{let e=(0,s.cG)(this.options,t),r={queryKey:this.queryKey,meta:this.meta};return(i(r),this.#c=!1,this.options.persister)?this.options.persister(e,r,this):e(r)}};i(o),this.options.behavior?.onFetch(o,this),this.#n=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==o.fetchOptions?.meta)&&this.#l({type:"fetch",meta:o.fetchOptions?.meta});let a=e=>{(0,n.DV)(e)&&e.silent||this.#l({type:"error",error:e}),(0,n.DV)(e)||(this.#o.config.onError?.(e,this),this.#o.config.onSettled?.(this.state.data,e,this)),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return this.#a=(0,n.Mz)({initialPromise:t?.initialPromise,fn:o.fetchFn,abort:r.abort.bind(r),onSuccess:e=>{if(void 0===e){a(Error(`${this.queryHash} data is undefined`));return}this.setData(e),this.#o.config.onSuccess?.(e,this),this.#o.config.onSettled?.(e,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:a,onFail:(e,t)=>{this.#l({type:"failed",failureCount:e,error:t})},onPause:()=>{this.#l({type:"pause"})},onContinue:()=>{this.#l({type:"continue"})},retry:o.options.retry,retryDelay:o.options.retryDelay,networkMode:o.options.networkMode,canRun:()=>!0}),this.#a.start()}#l(e){this.state=(t=>{switch(e.type){case"failed":return{...t,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...t,fetchStatus:"paused"};case"continue":return{...t,fetchStatus:"fetching"};case"fetch":return{...t,...u(t.data,this.options),fetchMeta:e.meta??null};case"success":return{...t,data:e.data,dataUpdateCount:t.dataUpdateCount+1,dataUpdatedAt:e.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":let r=e.error;if((0,n.DV)(r)&&r.revert&&this.#n)return{...this.#n,fetchStatus:"idle"};return{...t,error:r,errorUpdateCount:t.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:t.fetchFailureCount+1,fetchFailureReason:r,fetchStatus:"idle",status:"error"};case"invalidate":return{...t,isInvalidated:!0};case"setState":return{...t,...e.state}}})(this.state),i.V.batch(()=>{this.observers.forEach(e=>{e.onQueryUpdate()}),this.#o.notify({query:this,type:"updated",action:e})})}};function u(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:(0,n.Kw)(t.networkMode)?"fetching":"paused",...void 0===e&&{error:null,status:"pending"}}}},3494:function(e,t,r){r.d(t,{F:function(){return i}});var s=r(6298),i=class{#h;destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),(0,s.PN)(this.gcTime)&&(this.#h=setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(s.sk?1/0:3e5))}clearGcTimeout(){this.#h&&(clearTimeout(this.#h),this.#h=void 0)}}},924:function(e,t,r){r.d(t,{DV:function(){return c},Kw:function(){return a},Mz:function(){return l}});var s=r(4939),i=r(9937),n=r(6298);function o(e){return Math.min(1e3*2**e,3e4)}function a(e){return(e??"online")!=="online"||i.N.isOnline()}var u=class{constructor(e){this.revert=e?.revert,this.silent=e?.silent}};function c(e){return e instanceof u}function l(e){let t,r,c,l=!1,h=0,d=!1,f=new Promise((e,t)=>{r=e,c=t}),p=()=>s.j.isFocused()&&("always"===e.networkMode||i.N.isOnline())&&e.canRun(),y=()=>a(e.networkMode)&&e.canRun(),m=s=>{d||(d=!0,e.onSuccess?.(s),t?.(),r(s))},v=r=>{d||(d=!0,e.onError?.(r),t?.(),c(r))},b=()=>new Promise(r=>{t=e=>{(d||p())&&r(e)},e.onPause?.()}).then(()=>{t=void 0,d||e.onContinue?.()}),g=()=>{let t;if(d)return;let r=0===h?e.initialPromise:void 0;try{t=r??e.fn()}catch(e){t=Promise.reject(e)}Promise.resolve(t).then(m).catch(t=>{if(d)return;let r=e.retry??(n.sk?0:3),s=e.retryDelay??o,i="function"==typeof s?s(h,t):s,a=!0===r||"number"==typeof r&&h<r||"function"==typeof r&&r(h,t);if(l||!a){v(t);return}h++,e.onFail?.(h,t),(0,n._v)(i).then(()=>p()?void 0:b()).then(()=>{l?v(t):g()})})};return{promise:f,cancel:t=>{d||(v(new u(t)),e.abort?.())},continue:()=>(t?.(),f),cancelRetry:()=>{l=!0},continueRetry:()=>{l=!1},canStart:y,start:()=>(y()?g():b().then(g),f)}}},9010:function(e,t,r){r.d(t,{l:function(){return s}});var s=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}},6298:function(e,t,r){r.d(t,{CN:function(){return S},Ht:function(){return O},KC:function(){return u},Kp:function(){return a},PN:function(){return o},Rm:function(){return h},SE:function(){return n},VS:function(){return p},VX:function(){return R},X7:function(){return l},Ym:function(){return d},ZT:function(){return i},_v:function(){return b},_x:function(){return c},cG:function(){return w},oE:function(){return g},sk:function(){return s},to:function(){return f}});var s="undefined"==typeof window||"Deno"in globalThis;function i(){}function n(e,t){return"function"==typeof e?e(t):e}function o(e){return"number"==typeof e&&e>=0&&e!==1/0}function a(e,t){return Math.max(e+(t||0)-Date.now(),0)}function u(e,t){return"function"==typeof e?e(t):e}function c(e,t){let{type:r="all",exact:s,fetchStatus:i,predicate:n,queryKey:o,stale:a}=e;if(o){if(s){if(t.queryHash!==h(o,t.options))return!1}else if(!f(t.queryKey,o))return!1}if("all"!==r){let e=t.isActive();if("active"===r&&!e||"inactive"===r&&e)return!1}return("boolean"!=typeof a||t.isStale()===a)&&(!i||i===t.state.fetchStatus)&&(!n||!!n(t))}function l(e,t){let{exact:r,status:s,predicate:i,mutationKey:n}=e;if(n){if(!t.options.mutationKey)return!1;if(r){if(d(t.options.mutationKey)!==d(n))return!1}else if(!f(t.options.mutationKey,n))return!1}return(!s||t.state.status===s)&&(!i||!!i(t))}function h(e,t){return(t?.queryKeyHashFn||d)(e)}function d(e){return JSON.stringify(e,(e,t)=>m(t)?Object.keys(t).sort().reduce((e,r)=>(e[r]=t[r],e),{}):t)}function f(e,t){return e===t||typeof e==typeof t&&!!e&&!!t&&"object"==typeof e&&"object"==typeof t&&!Object.keys(t).some(r=>!f(e[r],t[r]))}function p(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(let r in e)if(e[r]!==t[r])return!1;return!0}function y(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function m(e){if(!v(e))return!1;let t=e.constructor;if(void 0===t)return!0;let r=t.prototype;return!!(v(r)&&r.hasOwnProperty("isPrototypeOf"))&&Object.getPrototypeOf(e)===Object.prototype}function v(e){return"[object Object]"===Object.prototype.toString.call(e)}function b(e){return new Promise(t=>{setTimeout(t,e)})}function g(e,t,r){return"function"==typeof r.structuralSharing?r.structuralSharing(e,t):!1!==r.structuralSharing?function e(t,r){if(t===r)return t;let s=y(t)&&y(r);if(s||m(t)&&m(r)){let i=s?t:Object.keys(t),n=i.length,o=s?r:Object.keys(r),a=o.length,u=s?[]:{},c=0;for(let n=0;n<a;n++){let a=s?n:o[n];(!s&&i.includes(a)||s)&&void 0===t[a]&&void 0===r[a]?(u[a]=void 0,c++):(u[a]=e(t[a],r[a]),u[a]===t[a]&&void 0!==t[a]&&c++)}return n===a&&c===n?t:u}return r}(e,t):t}function R(e,t,r=0){let s=[...e,t];return r&&s.length>r?s.slice(1):s}function O(e,t,r=0){let s=[t,...e];return r&&s.length>r?s.slice(0,-1):s}var S=Symbol(),w=(e,t)=>!e.queryFn&&t?.initialPromise?()=>t.initialPromise:e.queryFn&&e.queryFn!==S?e.queryFn:()=>Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`))},3191:function(e,t,r){r.d(t,{NL:function(){return o},aH:function(){return a}});var s=r(2265),i=r(7437),n=s.createContext(void 0),o=e=>{let t=s.useContext(n);if(e)return e;if(!t)throw Error("No QueryClient set, use QueryClientProvider to set one");return t},a=e=>{let{client:t,children:r}=e;return s.useEffect(()=>(t.mount(),()=>{t.unmount()}),[t]),(0,i.jsx)(n.Provider,{value:t,children:r})}},5355:function(e,t,r){let s;r.d(t,{a:function(){return E}});var i=r(6298),n=r(9948),o=r(4939),a=r(9010),u=r(2459),c=class extends a.l{constructor(e,t){super(),this.options=t,this.#d=e,this.#f=null,this.bindMethods(),this.setOptions(t)}#d;#p=void 0;#y=void 0;#m=void 0;#v;#b;#f;#g;#R;#O;#S;#w;#C;#T=new Set;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#p.addObserver(this),l(this.#p,this.options)?this.#E():this.updateResult(),this.#F())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return h(this.#p,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return h(this.#p,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#U(),this.#I(),this.#p.removeObserver(this)}setOptions(e,t){let r=this.options,s=this.#p;if(this.options=this.#d.defaultQueryOptions(e),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled)throw Error("Expected enabled to be a boolean");this.#j(),this.#p.setOptions(this.options),r._defaulted&&!(0,i.VS)(this.options,r)&&this.#d.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#p,observer:this});let n=this.hasListeners();n&&d(this.#p,s,this.options,r)&&this.#E(),this.updateResult(t),n&&(this.#p!==s||this.options.enabled!==r.enabled||(0,i.KC)(this.options.staleTime,this.#p)!==(0,i.KC)(r.staleTime,this.#p))&&this.#N();let o=this.#Q();n&&(this.#p!==s||this.options.enabled!==r.enabled||o!==this.#C)&&this.#A(o)}getOptimisticResult(e){let t=this.#d.getQueryCache().build(this.#d,e),r=this.createResult(t,e);return(0,i.VS)(this.getCurrentResult(),r)||(this.#m=r,this.#b=this.options,this.#v=this.#p.state),r}getCurrentResult(){return this.#m}trackResult(e,t){let r={};return Object.keys(e).forEach(s=>{Object.defineProperty(r,s,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(s),t?.(s),e[s])})}),r}trackProp(e){this.#T.add(e)}getCurrentQuery(){return this.#p}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){let t=this.#d.defaultQueryOptions(e),r=this.#d.getQueryCache().build(this.#d,t);return r.isFetchingOptimistic=!0,r.fetch().then(()=>this.createResult(r,t))}fetch(e){return this.#E({...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#m))}#E(e){this.#j();let t=this.#p.fetch(this.options,e);return e?.throwOnError||(t=t.catch(i.ZT)),t}#N(){this.#U();let e=(0,i.KC)(this.options.staleTime,this.#p);if(i.sk||this.#m.isStale||!(0,i.PN)(e))return;let t=(0,i.Kp)(this.#m.dataUpdatedAt,e);this.#S=setTimeout(()=>{this.#m.isStale||this.updateResult()},t+1)}#Q(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#p):this.options.refetchInterval)??!1}#A(e){this.#I(),this.#C=e,!i.sk&&!1!==this.options.enabled&&(0,i.PN)(this.#C)&&0!==this.#C&&(this.#w=setInterval(()=>{(this.options.refetchIntervalInBackground||o.j.isFocused())&&this.#E()},this.#C))}#F(){this.#N(),this.#A(this.#Q())}#U(){this.#S&&(clearTimeout(this.#S),this.#S=void 0)}#I(){this.#w&&(clearInterval(this.#w),this.#w=void 0)}createResult(e,t){let r;let s=this.#p,n=this.options,o=this.#m,a=this.#v,c=this.#b,h=e!==s?e.state:this.#y,{state:p}=e,y={...p},m=!1;if(t._optimisticResults){let r=this.hasListeners(),i=!r&&l(e,t),o=r&&d(e,s,t,n);(i||o)&&(y={...y,...(0,u.z)(p.data,e.options)}),"isRestoring"===t._optimisticResults&&(y.fetchStatus="idle")}let{error:v,errorUpdatedAt:b,status:g}=y;if(t.select&&void 0!==y.data){if(o&&y.data===a?.data&&t.select===this.#g)r=this.#R;else try{this.#g=t.select,r=t.select(y.data),r=(0,i.oE)(o?.data,r,t),this.#R=r,this.#f=null}catch(e){this.#f=e}}else r=y.data;if(void 0!==t.placeholderData&&void 0===r&&"pending"===g){let e;if(o?.isPlaceholderData&&t.placeholderData===c?.placeholderData)e=o.data;else if(e="function"==typeof t.placeholderData?t.placeholderData(this.#O?.state.data,this.#O):t.placeholderData,t.select&&void 0!==e)try{e=t.select(e),this.#f=null}catch(e){this.#f=e}void 0!==e&&(g="success",r=(0,i.oE)(o?.data,e,t),m=!0)}this.#f&&(v=this.#f,r=this.#R,b=Date.now(),g="error");let R="fetching"===y.fetchStatus,O="pending"===g,S="error"===g,w=O&&R,C=void 0!==r;return{status:g,fetchStatus:y.fetchStatus,isPending:O,isSuccess:"success"===g,isError:S,isInitialLoading:w,isLoading:w,data:r,dataUpdatedAt:y.dataUpdatedAt,error:v,errorUpdatedAt:b,failureCount:y.fetchFailureCount,failureReason:y.fetchFailureReason,errorUpdateCount:y.errorUpdateCount,isFetched:y.dataUpdateCount>0||y.errorUpdateCount>0,isFetchedAfterMount:y.dataUpdateCount>h.dataUpdateCount||y.errorUpdateCount>h.errorUpdateCount,isFetching:R,isRefetching:R&&!O,isLoadingError:S&&!C,isPaused:"paused"===y.fetchStatus,isPlaceholderData:m,isRefetchError:S&&C,isStale:f(e,t),refetch:this.refetch}}updateResult(e){let t=this.#m,r=this.createResult(this.#p,this.options);if(this.#v=this.#p.state,this.#b=this.options,void 0!==this.#v.data&&(this.#O=this.#p),(0,i.VS)(r,t))return;this.#m=r;let s={};e?.listeners!==!1&&(()=>{if(!t)return!0;let{notifyOnChangeProps:e}=this.options,r="function"==typeof e?e():e;if("all"===r||!r&&!this.#T.size)return!0;let s=new Set(r??this.#T);return this.options.throwOnError&&s.add("error"),Object.keys(this.#m).some(e=>this.#m[e]!==t[e]&&s.has(e))})()&&(s.listeners=!0),this.#D({...s,...e})}#j(){let e=this.#d.getQueryCache().build(this.#d,this.options);if(e===this.#p)return;let t=this.#p;this.#p=e,this.#y=e.state,this.hasListeners()&&(t?.removeObserver(this),e.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#F()}#D(e){n.V.batch(()=>{e.listeners&&this.listeners.forEach(e=>{e(this.#m)}),this.#d.getQueryCache().notify({query:this.#p,type:"observerResultsUpdated"})})}};function l(e,t){return!1!==t.enabled&&void 0===e.state.data&&!("error"===e.state.status&&!1===t.retryOnMount)||void 0!==e.state.data&&h(e,t,t.refetchOnMount)}function h(e,t,r){if(!1!==t.enabled){let s="function"==typeof r?r(e):r;return"always"===s||!1!==s&&f(e,t)}return!1}function d(e,t,r,s){return(e!==t||!1===s.enabled)&&(!r.suspense||"error"!==e.state.status)&&f(e,r)}function f(e,t){return!1!==t.enabled&&e.isStaleByTime((0,i.KC)(t.staleTime,e))}var p=r(2265);r(7437);var y=p.createContext((s=!1,{clearReset:()=>{s=!1},reset:()=>{s=!0},isReset:()=>s})),m=()=>p.useContext(y),v=r(3191),b=p.createContext(!1),g=()=>p.useContext(b);b.Provider;var R=(e,t)=>{(e.suspense||e.throwOnError)&&!t.isReset()&&(e.retryOnMount=!1)},O=e=>{p.useEffect(()=>{e.clearReset()},[e])},S=e=>{var t;let{result:r,errorResetBoundary:s,throwOnError:i,query:n}=e;return r.isError&&!s.isReset()&&!r.isFetching&&n&&(t=[r.error,n],"function"==typeof i?i(...t):!!i)},w=e=>{e.suspense&&"number"!=typeof e.staleTime&&(e.staleTime=1e3)},C=(e,t)=>e?.suspense&&t.isPending,T=(e,t,r)=>t.fetchOptimistic(e).catch(()=>{r.clearReset()});function E(e,t){return function(e,t,r){let s=(0,v.NL)(r),i=g(),o=m(),a=s.defaultQueryOptions(e);a._optimisticResults=i?"isRestoring":"optimistic",w(a),R(a,o),O(o);let[u]=p.useState(()=>new t(s,a)),c=u.getOptimisticResult(a);if(p.useSyncExternalStore(p.useCallback(e=>{let t=i?()=>void 0:u.subscribe(n.V.batchCalls(e));return u.updateResult(),t},[u,i]),()=>u.getCurrentResult(),()=>u.getCurrentResult()),p.useEffect(()=>{u.setOptions(a,{listeners:!1})},[a,u]),C(a,c))throw T(a,u,o);if(S({result:c,errorResetBoundary:o,throwOnError:a.throwOnError,query:s.getQueryCache().get(a.queryHash)}))throw c.error;return a.notifyOnChangeProps?c:u.trackResult(c)}(e,c,t)}}}]);