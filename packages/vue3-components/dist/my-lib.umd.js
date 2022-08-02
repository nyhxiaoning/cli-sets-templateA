(function(vt,gt){typeof exports=="object"&&typeof module<"u"?module.exports=gt():typeof define=="function"&&define.amd?define(gt):(vt=typeof globalThis<"u"?globalThis:vt||self,vt.myLib=gt())})(this,function(){"use strict";var vt=16.666666666666668,gt=500,Et=[],ge=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return setTimeout(t,vt)},qt=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return clearTimeout(t)},Ot=Date.now(),tt;function Zt(){var t,n;tt&&(qt.call(window,tt),tt=null),Et.forEach(function(e){var i;(i=e.event)&&(e.event=null,e.listener(i),t=!0)}),t?(Ot=Date.now(),n=!0):Date.now()-Ot<gt&&(n=!0),n&&(tt=ge.call(window,Zt))}function Kt(t){var n=-1;return Et.some(function(e,i){return e.listener===t?(n=i,!0):!1}),n}var Jt={add:function(n){var e;return Kt(n)===-1?(Et.push(e={listener:n}),function(i){e.event=i,tt||Zt()}):null},remove:function(n){var e;(e=Kt(n))>-1&&(Et.splice(e,1),!Et.length&&tt&&(qt.call(window,tt),tt=null))}};function Ee(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function Qt(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function we(t,n,e){return n&&Qt(t.prototype,n),e&&Qt(t,e),t}var Se=400,Yt=[],Xt=[],pt=!1;try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){pt=!0}}))}catch{}function j(t,n,e,i){t.addEventListener(n,e,pt?i:i.capture)}function te(t,n){var e=t.x-n.x,i=t.y-n.y;return Math.sqrt(e*e+i*i)}function ht(t,n){if(t!=null&&n!=null){for(var e=0;e<t.length;e++)if(t[e].identifier===n)return t[e]}return null}function Ht(t){return t&&typeof t.clientX=="number"&&typeof t.clientY=="number"}function ee(t){t.preventDefault()}var xe=function(){function t(n){var e=this;Ee(this,t),this.startHandlers={},this.lastHandlerId=0,this.curPointerClass=null,this.curTouchId=null,this.lastPointerXY={clientX:0,clientY:0},this.lastTouchTime=0,this.options={preventDefault:!0,stopPropagation:!0},n&&["preventDefault","stopPropagation"].forEach(function(i){typeof n[i]=="boolean"&&(e.options[i]=n[i])})}return we(t,[{key:"regStartHandler",value:function(e){var i=this;return i.startHandlers[++i.lastHandlerId]=function(r){var a=r.type==="mousedown"?"mouse":"touch",u=Date.now(),o,l;if(a==="touch")i.lastTouchTime=u,o=r.changedTouches[0],l=r.changedTouches[0].identifier;else{if(u-i.lastTouchTime<Se)return;o=r}if(!Ht(o))throw new Error("No clientX/clientY");i.curPointerClass&&i.cancel(),e.call(i,o)&&(i.curPointerClass=a,i.curTouchId=a==="touch"?l:null,i.lastPointerXY.clientX=o.clientX,i.lastPointerXY.clientY=o.clientY,i.options.preventDefault&&r.preventDefault(),i.options.stopPropagation&&r.stopPropagation())},i.lastHandlerId}},{key:"unregStartHandler",value:function(e){delete this.startHandlers[e]}},{key:"addStartHandler",value:function(e,i){if(!this.startHandlers[i])throw new Error("Invalid handlerId: ".concat(i));return j(e,"mousedown",this.startHandlers[i],{capture:!1,passive:!1}),j(e,"touchstart",this.startHandlers[i],{capture:!1,passive:!1}),j(e,"dragstart",ee,{capture:!1,passive:!1}),i}},{key:"removeStartHandler",value:function(e,i){if(!this.startHandlers[i])throw new Error("Invalid handlerId: ".concat(i));return e.removeEventListener("mousedown",this.startHandlers[i],!1),e.removeEventListener("touchstart",this.startHandlers[i],!1),e.removeEventListener("dragstart",ee,!1),i}},{key:"addMoveHandler",value:function(e,i,r){var a=this;function u(l){var s=l.type==="mousemove"?"mouse":"touch";if(s==="touch"&&(a.lastTouchTime=Date.now()),s===a.curPointerClass){var f=s==="touch"?ht(l.changedTouches,a.curTouchId):l;Ht(f)&&((f.clientX!==a.lastPointerXY.clientX||f.clientY!==a.lastPointerXY.clientY)&&a.move(f),a.options.preventDefault&&l.preventDefault(),a.options.stopPropagation&&l.stopPropagation())}}var o=r?u:Jt.add(u);j(e,"mousemove",o,{capture:!1,passive:!1}),j(e,"touchmove",o,{capture:!1,passive:!1}),a.curMoveHandler=i}},{key:"move",value:function(e){Ht(e)&&(this.lastPointerXY.clientX=e.clientX,this.lastPointerXY.clientY=e.clientY),this.curMoveHandler&&this.curMoveHandler(this.lastPointerXY)}},{key:"addEndHandler",value:function(e,i){var r=this;function a(u){var o=u.type==="mouseup"?"mouse":"touch";if(o==="touch"&&(r.lastTouchTime=Date.now()),o===r.curPointerClass){var l=o==="touch"?ht(u.changedTouches,r.curTouchId)||(ht(u.touches,r.curTouchId)?null:{}):u;l&&(r.end(l),r.options.preventDefault&&u.preventDefault(),r.options.stopPropagation&&u.stopPropagation())}}j(e,"mouseup",a,{capture:!1,passive:!1}),j(e,"touchend",a,{capture:!1,passive:!1}),r.curEndHandler=i}},{key:"end",value:function(e){Ht(e)&&(this.lastPointerXY.clientX=e.clientX,this.lastPointerXY.clientY=e.clientY),this.curEndHandler&&this.curEndHandler(this.lastPointerXY),this.curPointerClass=this.curTouchId=null}},{key:"addCancelHandler",value:function(e,i){var r=this;function a(u){if(r.lastTouchTime=Date.now(),r.curPointerClass!=null){var o=ht(u.changedTouches,r.curTouchId)||(ht(u.touches,r.curTouchId)?null:{});o&&r.cancel()}}j(e,"touchcancel",a,{capture:!1,passive:!1}),r.curCancelHandler=i}},{key:"cancel",value:function(){this.curCancelHandler&&this.curCancelHandler(),this.curPointerClass=this.curTouchId=null}}],[{key:"addEventListenerWithOptions",get:function(){return j}},{key:"initClickEmulator",value:function(e,i,r){if(Yt.includes(e))return e;Yt.push(e);var a=16,u=400,o,l,s,f;return i==null&&(i=a),r==null&&(r=u),j(e,"touchstart",function(d){var w=d.changedTouches[0];o=w.clientX,l=w.clientY,s=w.identifier,f=performance.now()},{capture:!1,passive:!1}),j(e,"touchend",function(d){var w=ht(d.changedTouches,s);typeof o=="number"&&typeof l=="number"&&typeof f=="number"&&w&&typeof w.clientX=="number"&&typeof w.clientY=="number"&&te({x:o,y:l},{x:w.clientX,y:w.clientY})<=i&&performance.now()-f<=r&&setTimeout(function(){var C=new MouseEvent("click",{clientX:w.clientX,clientY:w.clientY});C.emulated=!0,e.dispatchEvent(C)},0),o=l=s=f=null},{capture:!1,passive:!1}),j(e,"touchcancel",function(){o=l=s=f=null},{capture:!1,passive:!1}),e}},{key:"initDblClickEmulator",value:function(e,i,r){if(Xt.includes(e))return e;Xt.push(e);var a=16,u=400,o,l,s;return i==null&&(i=a),r==null&&(r=u),t.initClickEmulator(e,i,r),j(e,"click",function(f){!f.emulated||typeof f.clientX!="number"||typeof f.clientY!="number"||(typeof o=="number"&&te({x:o,y:l},{x:f.clientX,y:f.clientY})<=i&&performance.now()-s<=r*2?(setTimeout(function(){var d=new MouseEvent("dblclick",{clientX:f.clientX,clientY:f.clientY});d.emulated=!0,e.dispatchEvent(d)},0),o=l=s=null):(o=f.clientX,l=f.clientY,s=performance.now()))},{capture:!1,passive:!1}),e}}]),t}();function ne(t){return t.substr(0,1).toUpperCase()+t.substr(1)}var Wt=["webkit","moz","ms","o"],Ce=Wt.reduce(function(t,n){return t.push(n),t.push(ne(n)),t},[]),ie=Wt.map(function(t){return"-".concat(t,"-")}),re=function(){var t;return function(){return t=t||document.createElement("div").style}}(),_e=function(){var t=new RegExp("^(?:"+Wt.join("|")+")(.)","i"),n=/[A-Z]/;return function(e){return(e=(e+"").replace(/\s/g,"").replace(/-([\da-z])/gi,function(i,r){return r.toUpperCase()}).replace(t,function(i,r){return n.test(r)?r.toLowerCase():i})).toLowerCase()==="float"?"cssFloat":e}}(),be=function(){var t=new RegExp("^(?:"+ie.join("|")+")","i");return function(n){return(n!=null?n+"":"").replace(/\s/g,"").replace(t,"")}}(),ae=function(){return function(t,n){var e=re();return t=t.replace(/[A-Z]/g,function(i){return"-".concat(i.toLowerCase())}),e.setProperty(t,n),e[t]!=null&&e.getPropertyValue(t)===n}}(),wt={},et={};function le(t){if(t=_e(t),t&&wt[t]==null){var n=re();if(n[t]!=null)wt[t]=t;else{var e=ne(t);Ce.some(function(i){var r=i+e;return n[r]!=null?(wt[t]=r,!0):!1})||(wt[t]=!1)}}return wt[t]||void 0}function Pe(t,n){var e;return(t=le(t))?(et[t]=et[t]||{},(Array.isArray(n)?n:[n]).some(function(i){return i=be(i),et[t][i]!=null?et[t][i]!==!1?(e=et[t][i],!0):!1:ae(t,i)?(e=et[t][i]=i,!0):ie.some(function(r){var a=r+i;return ae(t,a)?(e=et[t][i]=a,!0):!1})?!0:(et[t][i]=!1,!1)}),typeof e=="string"?e:void 0):e}var lt={getName:le,getValue:Pe};function mt(t){return(t+"").trim()}function St(t,n){n.setAttribute("class",t.join(" "))}function Te(t,n,e){e.filter(function(i){return!(i=mt(i))||t.indexOf(i)!==-1?!1:(t.push(i),!0)}).length&&St(t,n)}function Ie(t,n,e){e.filter(function(i){var r;return!(i=mt(i))||(r=t.indexOf(i))===-1?!1:(t.splice(r,1),!0)}).length&&St(t,n)}function Le(t,n,e,i){var r=t.indexOf(e=mt(e));return r!==-1?i?!0:(t.splice(r,1),St(t,n),!1):i===!1?!1:(t.push(e),St(t,n),!0)}function De(t,n,e,i){var r;!(e=mt(e))||!(i=mt(i))||e===i||(r=t.indexOf(e))===-1||(t.splice(r,1),t.indexOf(i)===-1&&t.push(i),St(t,n))}function k(t){return!k.ignoreNative&&t.classList||function(){var n=(t.getAttribute("class")||"").trim().split(/\s+/).filter(function(i){return!!i}),e={length:n.length,item:function(r){return n[r]},contains:function(r){return n.indexOf(mt(r))!==-1},add:function(){return Te(n,t,Array.prototype.slice.call(arguments)),k.methodChain?e:void 0},remove:function(){return Ie(n,t,Array.prototype.slice.call(arguments)),k.methodChain?e:void 0},toggle:function(r,a){return Le(n,t,r,a)},replace:function(r,a){return De(n,t,r,a),k.methodChain?e:void 0}};return e}()}k.methodChain=!0;function He(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function fe(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function Be(t,n,e){return n&&fe(t.prototype,n),e&&fe(t,e),t}function xt(t){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?xt=function(e){return typeof e}:xt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},xt(t)}k.ignoreNative=!0;var Re=9e3,ke=20,Fe="tl",We="both",Me="both",ze="containment",Ae=["tl","tr","bl","br"],Ue=["start","end"],Ge=["inside","outside"],Ne=[40,200,1e3],je=[100,40,0],Mt="-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style&&!window.navigator.msPointerEnabled,Ve=!Mt&&!!document.uniqueID,zt="MozAppearance"in document.documentElement.style,$e=!Mt&&!zt&&!!window.chrome&&!!window.CSS,oe=!Mt&&!Ve&&!zt&&!$e&&!window.chrome&&"WebkitAppearance"in document.documentElement.style,O=function(){var t={}.toString,n={}.hasOwnProperty.toString,e=n.call(Object);return function(i){var r,a;return i&&t.call(i)==="[object Object]"&&(!(r=Object.getPrototypeOf(i))||(a=r.hasOwnProperty("constructor")&&r.constructor)&&typeof a=="function"&&n.call(a)===e)}}(),L=Number.isFinite||function(t){return typeof t=="number"&&window.isFinite(t)},v={},Bt={},J=new xe,qe=0,E,Rt,M,ft,Z,kt,ot,Q,F,ue,Ct=oe?["all-scroll","move"]:["grab","all-scroll","move"],_t=oe?"move":["grabbing","move"],K="plain-draggable",Y="plain-draggable-dragging",X="plain-draggable-moving",bt={},Oe=1e3/60,ce=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return setTimeout(t,Oe)},At=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return clearTimeout(t)};{let t=function(){var e=Date.now();["x","y"].forEach(function(i){var r=nt[i];if(r){var a=e-r.lastFrameTime,u=Ut(Pt,i),o=r.lastValue!=null&&Math.abs(r.lastValue-u)<10?r.lastValue:u;if(r.dir===-1?o>r.min:o<r.max){var l=o+r.speed*a*r.dir;l<r.min?l=r.min:l>r.max&&(l=r.max),Ut(Pt,i,l),r.lastValue=l}r.lastFrameTime=e}})},n=function(){At.call(window,Tt),t(),Tt=ce.call(window,n)};var nt={},Pt,Ut,Tt;bt.move=function(e,i,r){At.call(window,Tt),t(),Pt===e&&(i.x&&nt.x&&(i.x.lastValue=nt.x.lastValue),i.y&&nt.y&&(i.y.lastValue=nt.y.lastValue)),Pt=e,nt=i,Ut=r;var a=Date.now();["x","y"].forEach(function(u){var o=nt[u];o&&(o.lastFrameTime=a)}),Tt=ce.call(window,n)},bt.stop=function(){At.call(window,Tt),t(),nt={},Pt=null}}function ut(t,n,e){return e!=null&&(n==="x"?t.scrollTo(e,t.pageYOffset):t.scrollTo(t.pageXOffset,e)),n==="x"?t.pageXOffset:t.pageYOffset}function ct(t,n,e){var i=n==="x"?"scrollLeft":"scrollTop";return e!=null&&(t[i]=e),t[i]}function Ze(t,n,e){var i={},r,a,u;(function(w){i.clientWidth=w.clientWidth,i.clientHeight=w.clientHeight})(n?document.documentElement:t);var o=0,l=0;if(!e){var s,f;n?(s=ut(t,"x"),f=ut(t,"y"),r=getComputedStyle(document.documentElement,""),a=getComputedStyle(document.body,""),o=ut(t,"x",document.documentElement.scrollWidth+i.clientWidth+["marginLeft","marginRight","borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"].reduce(function(w,C){return w+(parseFloat(r[C])||0)+(parseFloat(a[C])||0)},0)),l=ut(t,"y",document.documentElement.scrollHeight+i.clientHeight+["marginTop","marginBottom","borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"].reduce(function(w,C){return w+(parseFloat(r[C])||0)+(parseFloat(a[C])||0)},0)),ut(t,"x",s),ut(t,"y",f)):(s=ct(t,"x"),f=ct(t,"y"),u=getComputedStyle(t,""),o=ct(t,"x",t.scrollWidth+i.clientWidth+["marginLeft","marginRight","borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"].reduce(function(w,C){return w+(parseFloat(u[C])||0)},0)),l=ct(t,"y",t.scrollHeight+i.clientHeight+["marginTop","marginBottom","borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"].reduce(function(w,C){return w+(parseFloat(u[C])||0)},0)),ct(t,"x",s),ct(t,"y",f))}i.scrollWidth=i.clientWidth+o,i.scrollHeight=i.clientHeight+l;var d;return n?i.clientX=i.clientY=0:(d=t.getBoundingClientRect(),u||(u=getComputedStyle(t,"")),i.clientX=d.left+(parseFloat(u.borderLeftWidth)||0),i.clientY=d.top+(parseFloat(u.borderTopWidth)||0)),i}function it(t){return t&&(O(t)?Object.keys(t).reduce(function(n,e){return n[e]=it(t[e]),n},{}):Array.isArray(t)?t.map(it):t)}function yt(t,n){var e,i;return xt(t)!==xt(n)||(e=O(t)?"obj":Array.isArray(t)?"array":"")!=(O(n)?"obj":Array.isArray(n)?"array":"")||(e==="obj"?yt(i=Object.keys(t).sort(),Object.keys(n).sort())||i.some(function(r){return yt(t[r],n[r])}):e==="array"?t.length!==n.length||t.some(function(r,a){return yt(r,n[a])}):t!==n)}function dt(t){return!!(t&&t.nodeType===Node.ELEMENT_NODE&&typeof t.getBoundingClientRect=="function"&&!(t.compareDocumentPosition(document)&Node.DOCUMENT_POSITION_DISCONNECTED))}function Ft(t){if(!O(t))return null;var n;if(L(n=t.left)||L(n=t.x))t.left=t.x=n;else return null;if(L(n=t.top)||L(n=t.y))t.top=t.y=n;else return null;if(L(t.width)&&t.width>=0)t.right=t.left+t.width;else if(L(t.right)&&t.right>=t.left)t.width=t.right-t.left;else return null;if(L(t.height)&&t.height>=0)t.bottom=t.top+t.height;else if(L(t.bottom)&&t.bottom>=t.top)t.height=t.bottom-t.top;else return null;return t}function V(t){function n(e){var i=/^(.+?)(%)?$/.exec(e),r,a;return i&&L(r=parseFloat(i[1]))?{value:(a=!!(i[2]&&r))?r/100:r,isRatio:a}:null}return L(t)?{value:t,isRatio:!1}:typeof t=="string"?n(t.replace(/\s/g,"")):null}function It(t){return t.isRatio?"".concat(t.value*100,"%"):t.value}function st(t,n,e){return typeof t=="number"?t:n+t.value*(t.isRatio?e:1)}function Gt(t){if(!O(t))return null;var n;if((n=V(t.left))||(n=V(t.x)))t.left=t.x=n;else return null;if((n=V(t.top))||(n=V(t.y)))t.top=t.y=n;else return null;if((n=V(t.width))&&n.value>=0)t.width=n,delete t.right;else if(n=V(t.right))t.right=n,delete t.width;else return null;if((n=V(t.height))&&n.value>=0)t.height=n,delete t.bottom;else if(n=V(t.bottom))t.bottom=n,delete t.height;else return null;return t}function de(t){return Object.keys(t).reduce(function(n,e){return n[e]=It(t[e]),n},{})}function se(t,n){var e={left:"x",right:"x",x:"x",width:"x",top:"y",bottom:"y",y:"y",height:"y"},i={x:n.left,y:n.top},r={x:n.width,y:n.height};return Ft(Object.keys(t).reduce(function(a,u){return a[u]=st(t[u],u==="width"||u==="height"?0:i[e[u]],r[e[u]]),a},{}))}function z(t,n){var e=t.getBoundingClientRect(),i={left:e.left,top:e.top,width:e.width,height:e.height};if(i.left+=window.pageXOffset,i.top+=window.pageYOffset,n){var r=window.getComputedStyle(t,""),a=parseFloat(r.borderTopWidth)||0,u=parseFloat(r.borderRightWidth)||0,o=parseFloat(r.borderBottomWidth)||0,l=parseFloat(r.borderLeftWidth)||0;i.left+=l,i.top+=a,i.width-=l+u,i.height-=a+o}return Ft(i)}function Ke(t,n){var e=t.style;e.webkitTapHighlightColor="transparent";var i=lt.getName("boxShadow"),r=window.getComputedStyle(t,"")[i];return(!r||r==="none")&&(e[i]="0 0 1px transparent"),n&&Q&&(e[Q]="translateZ(0)"),t}function Lt(t,n){ft==null&&(Ct!==!1&&(ft=lt.getValue("cursor",Ct)),ft==null&&(ft=!1)),t.style.cursor=ft===!1?n:ft}function he(t){Z==null&&(_t!==!1&&(Z=lt.getValue("cursor",_t)),Z==null&&(Z=!1)),Z!==!1&&(t.style.cursor=Z)}function Nt(t,n,e){var i=t.svgPoint;return i.x=n,i.y=e,i.matrixTransform(t.svgCtmElement.getScreenCTM().inverse())}function Je(t,n){var e=t.elementBBox;if(n.left!==e.left||n.top!==e.top){var i=t.htmlOffset;return t.elementStyle[Q]="translate(".concat(n.left+i.left,"px, ").concat(n.top+i.top,"px)"),!0}return!1}function Qe(t,n){var e=t.elementBBox,i=t.elementStyle,r=t.htmlOffset,a=!1;return n.left!==e.left&&(i.left=n.left+r.left+"px",a=!0),n.top!==e.top&&(i.top=n.top+r.top+"px",a=!0),a}function Ye(t,n){var e=t.elementBBox;if(n.left!==e.left||n.top!==e.top){var i=t.svgOffset,r=t.svgOriginBBox,a=Nt(t,n.left-window.pageXOffset,n.top-window.pageYOffset);return t.svgTransform.setTranslate(a.x+i.x-r.x,a.y+i.y-r.y),!0}return!1}function jt(t,n,e){var i=t.elementBBox;function r(){t.minLeft>=t.maxLeft?n.left=i.left:n.left<t.minLeft?n.left=t.minLeft:n.left>t.maxLeft&&(n.left=t.maxLeft),t.minTop>=t.maxTop?n.top=i.top:n.top<t.minTop?n.top=t.minTop:n.top>t.maxTop&&(n.top=t.maxTop)}if(r(),e){if(e(n)===!1)return!1;r()}var a=t.moveElm(t,n);return a&&(t.elementBBox=Ft({left:n.left,top:n.top,width:i.width,height:i.height})),a}function Xe(t){var n=t.element,e=t.elementStyle,i=z(n),r=["display","marginTop","marginBottom","width","height"];r.unshift(Q);var a=e[ot];e[ot]="none";var u=z(n);t.orgStyle?r.forEach(function(d){(t.lastStyle[d]==null||e[d]===t.lastStyle[d])&&(e[d]=t.orgStyle[d])}):(t.orgStyle=r.reduce(function(d,w){return d[w]=e[w]||"",d},{}),t.lastStyle={});var o=z(n),l=window.getComputedStyle(n,"");l.display==="inline"&&(e.display="inline-block",["Top","Bottom"].forEach(function(d){var w=parseFloat(l["padding".concat(d)]);e["margin".concat(d)]=w?"-".concat(w,"px"):"0"})),e[Q]="translate(0, 0)";var s=z(n),f=t.htmlOffset={left:s.left?-s.left:0,top:s.top?-s.top:0};return e[Q]="translate(".concat(i.left+f.left,"px, ").concat(i.top+f.top,"px)"),["width","height"].forEach(function(d){s[d]!==o[d]&&(e[d]=o[d]+"px",s=z(n),s[d]!==o[d]&&(e[d]=o[d]-(s[d]-o[d])+"px")),t.lastStyle[d]=e[d]}),n.offsetWidth,e[ot]=a,(u.left!==i.left||u.top!==i.top)&&(e[Q]="translate(".concat(u.left+f.left,"px, ").concat(u.top+f.top,"px)")),u}function pe(t){var n=t.element,e=t.elementStyle,i=z(n),r=["position","marginTop","marginRight","marginBottom","marginLeft","width","height"],a=e[ot];e[ot]="none";var u=z(n);t.orgStyle?r.forEach(function(f){(t.lastStyle[f]==null||e[f]===t.lastStyle[f])&&(e[f]=t.orgStyle[f])}):(t.orgStyle=r.reduce(function(f,d){return f[d]=e[d]||"",f},{}),t.lastStyle={});var o=z(n);e.position="absolute",e.left=e.top=e.margin="0";var l=z(n),s=t.htmlOffset={left:l.left?-l.left:0,top:l.top?-l.top:0};return e.left=i.left+s.left+"px",e.top=i.top+s.top+"px",["width","height"].forEach(function(f){l[f]!==o[f]&&(e[f]=o[f]+"px",l=z(n),l[f]!==o[f]&&(e[f]=o[f]-(l[f]-o[f])+"px")),t.lastStyle[f]=e[f]}),n.offsetWidth,e[ot]=a,(u.left!==i.left||u.top!==i.top)&&(e.left=u.left+s.left+"px",e.top=u.top+s.top+"px"),u}function tn(t){var n=t.element,e=t.svgTransform,i=n.getBoundingClientRect(),r=z(n);e.setTranslate(0,0);var a=t.svgOriginBBox=n.getBBox(),u=n.getBoundingClientRect(),o=Nt(t,u.left,u.top),l=t.svgOffset={x:a.x-o.x,y:a.y-o.y},s=Nt(t,i.left,i.top);return e.setTranslate(s.x+l.x-a.x,s.y+l.y-a.y),r}function Vt(t,n){var e=z(document.documentElement),i=t.elementBBox=t.initElm(t),r=t.containmentBBox=t.containmentIsBBox?se(t.options.containment,e)||e:z(t.options.containment,!0);if(t.minLeft=r.left,t.maxLeft=r.right-i.width,t.minTop=r.top,t.maxTop=r.bottom-i.height,jt(t,{left:i.left,top:i.top}),t.parsedSnapTargets){var a={x:i.width,y:i.height},u={x:t.minLeft,y:t.minTop},o={x:t.maxLeft,y:t.maxTop},l={left:"x",right:"x",x:"x",width:"x",xStart:"x",xEnd:"x",xStep:"x",top:"y",bottom:"y",y:"y",height:"y",yStart:"y",yEnd:"y",yStep:"y"},s=t.parsedSnapTargets.reduce(function($,h){var m=h.base==="containment"?r:e,I={x:m.left,y:m.top},D={x:m.width,y:m.height};function R(c){if(c.center==null&&(c.center=h.center),c.xGravity==null&&(c.xGravity=h.gravity),c.yGravity==null&&(c.yGravity=h.gravity),c.x!=null&&c.y!=null)c.x=st(c.x,I.x,D.x),c.y=st(c.y,I.y,D.y),c.center&&(c.x-=a.x/2,c.y-=a.y/2,c.corners=["tl"]),(c.corners||h.corners).forEach(function(B){var T=c.x-(B==="tr"||B==="br"?a.x:0),_=c.y-(B==="bl"||B==="br"?a.y:0);if(T>=u.x&&T<=o.x&&_>=u.y&&_<=o.y){var at={x:T,y:_},Dt=T-c.xGravity,me=T+c.xGravity,ye=_-c.yGravity,ve=_+c.yGravity;Dt>u.x&&(at.gravityXStart=Dt),me<o.x&&(at.gravityXEnd=me),ye>u.y&&(at.gravityYStart=ye),ve<o.y&&(at.gravityYEnd=ve),$.push(at)}});else{var y=c.x!=null?"x":"y",S=y==="x"?"y":"x",g="".concat(S,"Start"),x="".concat(S,"End"),U="".concat(y,"Gravity"),W=y.toUpperCase(),G=S.toUpperCase(),N="gravity".concat(W,"Start"),H="gravity".concat(W,"End"),q="gravity".concat(G,"Start"),p="gravity".concat(G,"End");if(c[y]=st(c[y],I[y],D[y]),c[g]=st(c[g],I[S],D[S]),c[x]=st(c[x],I[S],D[S])-a[S],c[g]>c[x]||c[g]>o[S]||c[x]<u[S])return;c.center&&(c[y]-=a[y]/2,c.sides=["start"]),(c.sides||h.sides).forEach(function(B){var T=c[y]-(B==="end"?a[y]:0);if(T>=u[y]&&T<=o[y]){var _={},at=T-c[U],Dt=T+c[U];_[y]=T,at>u[y]&&(_[N]=at),Dt<o[y]&&(_[H]=Dt),c[g]>u[S]&&(_[q]=c[g]),c[x]<o[S]&&(_[p]=c[x]),$.push(_)}})}}var b;if((b=h.element?z(h.element):null)||h.ppBBox)h.ppBBox&&(b=se(h.ppBBox,m)),b&&h.edges.forEach(function(c){var y=h.gravity,S=h.gravity;c==="outside"&&(y+=i.width,S+=i.height);var g=b.left-y,x=b.right+y,U=b.top-S,W=b.bottom+S,G=c==="inside"?"start":"end";R({xStart:g,xEnd:x,y:b.top,sides:[G],center:!1}),R({x:b.left,yStart:U,yEnd:W,sides:[G],center:!1}),G=c==="inside"?"end":"start",R({xStart:g,xEnd:x,y:b.bottom,sides:[G],center:!1}),R({x:b.right,yStart:U,yEnd:W,sides:[G],center:!1})});else{var P=[["x","y","xStart","xEnd","xStep","yStart","yEnd","yStep"].reduce(function(c,y){return h[y]&&(c[y]=st(h[y],y==="xStep"||y==="yStep"?0:I[l[y]],D[l[y]])),c},{})];["x","y"].forEach(function(c){var y="".concat(c,"Start"),S="".concat(c,"End"),g="".concat(c,"Step"),x="".concat(c,"Gravity");P=P.reduce(function(U,W){var G=W[y],N=W[S],H=W[g];if(G!=null&&N!=null&&G>=N)return U;if(H!=null){if(H<2)return U;var q=H/2;q=h.gravity>q?q:null;for(var p=G;p<=N;p+=H){var B=Object.keys(W).reduce(function(T,_){return _!==y&&_!==S&&_!==g&&(T[_]=W[_]),T},{});B[c]=p,B[x]=q,U.push(B)}}else U.push(W);return U},[])}),P.forEach(function(c){R(c)})}return $},[]);t.snapTargets=s.length?s:null}var f={},d=t.options.autoScroll;if(d){f.isWindow=d.target===window,f.target=d.target;var w=n==="scroll",C=Ze(d.target,f.isWindow,w),rt=Ft({left:C.clientX,top:C.clientY,width:C.clientWidth,height:C.clientHeight});w?t.autoScroll&&(f.scrollWidth=t.autoScroll.scrollWidth,f.scrollHeight=t.autoScroll.scrollHeight):(f.scrollWidth=C.scrollWidth,f.scrollHeight=C.scrollHeight),[["X","Width","left","right"],["Y","Height","top","bottom"]].forEach(function($){var h=$[0],m=$[1],I=$[2],D=$[3],R=(f["scroll".concat(m)]||0)-C["client".concat(m)],b=d["min".concat(h)]||0,P=L(d["max".concat(h)])?d["max".concat(h)]:R;if(b<P&&b<R){P>R&&(P=R);for(var c=[],y=i[m.toLowerCase()],S=d.sensitivity.length-1;S>=0;S--){var g=d.sensitivity[S],x=d.speed[S];c.push({dir:-1,speed:x,position:rt[I]+g}),c.push({dir:1,speed:x,position:rt[D]-g-y})}f[h.toLowerCase()]={min:b,max:P,lines:c}}})}t.autoScroll=f.x||f.y?f:null}function $t(t){bt.stop(),Lt(t.options.handle,t.orgCursor),M.style.cursor=kt,t.options.zIndex!==!1&&(t.elementStyle.zIndex=t.orgZIndex),F&&(M.style[F]=ue);var n=k(t.element);X&&n.remove(X),Y&&n.remove(Y),E=null,J.cancel(),t.onDragEnd&&t.onDragEnd({left:t.elementBBox.left,top:t.elementBBox.top})}function en(t,n){return t.disabled||t.onDragStart&&t.onDragStart(n)===!1?!1:(E&&$t(E),he(t.options.handle),M.style.cursor=Z||window.getComputedStyle(t.options.handle,"").cursor,t.options.zIndex!==!1&&(t.elementStyle.zIndex=t.options.zIndex),F&&(M.style[F]="none"),Y&&k(t.element).add(Y),E=t,Rt=!1,Bt.left=t.elementBBox.left-(n.clientX+window.pageXOffset),Bt.top=t.elementBBox.top-(n.clientY+window.pageYOffset),!0)}function A(t,n){var e=t.options,i;if(n.containment){var r;dt(n.containment)?n.containment!==e.containment&&(e.containment=n.containment,t.containmentIsBBox=!1,i=!0):(r=Gt(it(n.containment)))&&yt(r,e.containment)&&(e.containment=r,t.containmentIsBBox=!0,i=!0)}function a(h,m){function I(g){return typeof g=="string"?g.replace(/[, ]+/g," ").trim().toLowerCase():null}L(m.gravity)&&m.gravity>0&&(h.gravity=m.gravity);var D=I(m.corner);if(D){if(D!=="all"){var R={},b=D.split(/\s/).reduce(function(g,x){return x=x.trim().replace(/^(.).*?-(.).*$/,"$1$2"),(x=x==="tl"||x==="lt"?"tl":x==="tr"||x==="rt"?"tr":x==="bl"||x==="lb"?"bl":x==="br"||x==="rb"?"br":null)&&!R[x]&&(g.push(x),R[x]=!0),g},[]),P=b.length;D=P?P===4?"all":b.join(" "):null}D&&(h.corner=D)}var c=I(m.side);c&&(c==="start"||c==="end"||c==="both"?h.side=c:(c==="start end"||c==="end start")&&(h.side="both")),typeof m.center=="boolean"&&(h.center=m.center);var y=I(m.edge);y&&(y==="inside"||y==="outside"||y==="both"?h.edge=y:(y==="inside outside"||y==="outside inside")&&(h.edge="both"));var S=typeof m.base=="string"?m.base.trim().toLowerCase():null;return S&&(S==="containment"||S==="document")&&(h.base=S),h}if(n.snap!=null){var u=O(n.snap)&&n.snap.targets!=null?n.snap:{targets:n.snap},o=[],l=a({targets:o},u);l.gravity||(l.gravity=ke),l.corner||(l.corner=Fe),l.side||(l.side=We),typeof l.center!="boolean"&&(l.center=!1),l.edge||(l.edge=Me),l.base||(l.base=ze);var s=(Array.isArray(u.targets)?u.targets:[u.targets]).reduce(function(h,m){if(m==null)return h;var I=dt(m),D=Gt(it(m)),R=I||D?{boundingBox:m}:O(m)&&m.start==null&&m.end==null&&m.step==null?m:{x:m,y:m},b=[],P={},c=R.boundingBox,y;if(I||dt(c))b.push({element:c}),P.boundingBox=c;else if(y=D||Gt(it(c)))b.push({ppBBox:y}),P.boundingBox=de(y);else{var S,g=["x","y"].reduce(function(N,H){var q=R[H],p;if(p=V(q))N[H]=p,P[H]=It(p);else{var B,T,_;O(q)&&(B=V(q.start),T=V(q.end),_=V(q.step),B&&T&&B.isRatio===T.isRatio&&B.value>=T.value&&(S=!0)),B=N["".concat(H,"Start")]=B||{value:0,isRatio:!1},T=N["".concat(H,"End")]=T||{value:1,isRatio:!0},P[H]={start:It(B),end:It(T)},_&&((_.isRatio?_.value>0:_.value>=2)?(N["".concat(H,"Step")]=_,P[H].step=It(_)):S=!0)}return N},{});if(S)return h;g.xStart&&!g.xStep&&g.yStart&&!g.yStep?b.push({xStart:g.xStart,xEnd:g.xEnd,y:g.yStart},{xStart:g.xStart,xEnd:g.xEnd,y:g.yEnd},{x:g.xStart,yStart:g.yStart,yEnd:g.yEnd},{x:g.xEnd,yStart:g.yStart,yEnd:g.yEnd}):b.push(g)}if(b.length){o.push(a(P,R));var x=P.corner||l.corner,U=P.side||l.side,W=P.edge||l.edge,G={gravity:P.gravity||l.gravity,base:P.base||l.base,center:typeof P.center=="boolean"?P.center:l.center,corners:x==="all"?Ae:x.split(" "),sides:U==="both"?Ue:[U],edges:W==="both"?Ge:[W]};b.forEach(function(N){["gravity","corners","sides","center","edges","base"].forEach(function(H){N[H]=G[H]}),h.push(N)})}return h},[]);s.length&&(e.snap=l,yt(s,t.parsedSnapTargets)&&(t.parsedSnapTargets=s,i=!0))}else n.hasOwnProperty("snap")&&t.parsedSnapTargets&&(e.snap=t.parsedSnapTargets=t.snapTargets=void 0);if(n.autoScroll){var f=O(n.autoScroll)?n.autoScroll:{target:n.autoScroll===!0?window:n.autoScroll},d={};d.target=dt(f.target)?f.target:window,d.speed=[],(Array.isArray(f.speed)?f.speed:[f.speed]).every(function(h,m){return m<=2&&L(h)?(d.speed[m]=h,!0):!1}),d.speed.length||(d.speed=Ne);var w=Array.isArray(f.sensitivity)?f.sensitivity:[f.sensitivity];d.sensitivity=d.speed.map(function(h,m){return L(w[m])?w[m]:je[m]}),["X","Y"].forEach(function(h){var m="min".concat(h),I="max".concat(h);L(f[m])&&f[m]>=0&&(d[m]=f[m]),L(f[I])&&f[I]>=0&&(!d[m]||f[I]>=d[m])&&(d[I]=f[I])}),yt(d,e.autoScroll)&&(e.autoScroll=d,i=!0)}else n.hasOwnProperty("autoScroll")&&(e.autoScroll&&(i=!0),e.autoScroll=void 0);if(i&&Vt(t),dt(n.handle)&&n.handle!==e.handle){e.handle&&(e.handle.style.cursor=t.orgCursor,F&&(e.handle.style[F]=t.orgUserSelect),J.removeStartHandler(e.handle,t.pointerEventHandlerId));var C=e.handle=n.handle;t.orgCursor=C.style.cursor,Lt(C,t.orgCursor),F&&(t.orgUserSelect=C.style[F],C.style[F]="none"),J.addStartHandler(C,t.pointerEventHandlerId)}(L(n.zIndex)||n.zIndex===!1)&&(e.zIndex=n.zIndex,t===E&&(t.elementStyle.zIndex=e.zIndex===!1?t.orgZIndex:e.zIndex));var rt={left:t.elementBBox.left,top:t.elementBBox.top},$;L(n.left)&&n.left!==rt.left&&(rt.left=n.left,$=!0),L(n.top)&&n.top!==rt.top&&(rt.top=n.top,$=!0),$&&jt(t,rt),["onDrag","onMove","onDragStart","onMoveStart","onDragEnd"].forEach(function(h){typeof n[h]=="function"?(e[h]=n[h],t[h]=e[h].bind(t.ins)):n.hasOwnProperty(h)&&n[h]==null&&(e[h]=t[h]=void 0)})}var nn=function(){function t(n,e){He(this,t);var i={ins:this,options:{zIndex:Re},disabled:!1};if(Object.defineProperty(this,"_id",{value:++qe}),i._id=this._id,v[this._id]=i,!dt(n)||n===M)throw new Error("This element is not accepted.");if(!e)e={};else if(!O(e))throw new Error("Invalid options.");var r=!0,a;if(n instanceof SVGElement&&(a=n.ownerSVGElement)){if(!n.getBBox)throw new Error("This element is not accepted. (SVGLocatable)");if(!n.transform)throw new Error("This element is not accepted. (SVGAnimatedTransformList)");i.svgTransform=n.transform.baseVal.appendItem(a.createSVGTransform()),i.svgPoint=a.createSVGPoint();var u=n.nearestViewportElement;i.svgCtmElement=zt?u.appendChild(document.createElementNS(a.namespaceURI,"rect")):u,r=!1,i.initElm=tn,i.moveElm=Ye}else{var o=lt.getName("willChange");o&&(r=!1),!e.leftTop&&Q?(o&&(n.style[o]="transform"),i.initElm=Xe,i.moveElm=Je):(o&&(n.style[o]="left, top"),i.initElm=pe,i.moveElm=Qe)}if(i.element=Ke(n,r),i.elementStyle=n.style,i.orgZIndex=i.elementStyle.zIndex,K&&k(n).add(K),i.pointerEventHandlerId=J.regStartHandler(function(s){return en(i,s)}),!e.containment){var l;e.containment=(l=n.parentNode)&&dt(l)?l:M}e.handle||(e.handle=n),A(i,e)}return Be(t,[{key:"remove",value:function(){var e=v[this._id];this.disabled=!0,J.unregStartHandler(J.removeStartHandler(e.options.handle,e.pointerEventHandlerId)),delete v[this._id]}},{key:"setOptions",value:function(e){return O(e)&&A(v[this._id],e),this}},{key:"position",value:function(){return Vt(v[this._id]),this}},{key:"disabled",get:function(){return v[this._id].disabled},set:function(e){var i=v[this._id];(e=!!e)!==i.disabled&&(i.disabled=e,i.disabled?(i===E&&$t(i),i.options.handle.style.cursor=i.orgCursor,F&&(i.options.handle.style[F]=i.orgUserSelect),K&&k(i.element).remove(K)):(Lt(i.options.handle,i.orgCursor),F&&(i.options.handle.style[F]="none"),K&&k(i.element).add(K)))}},{key:"element",get:function(){return v[this._id].element}},{key:"rect",get:function(){return it(v[this._id].elementBBox)}},{key:"left",get:function(){return v[this._id].elementBBox.left},set:function(e){A(v[this._id],{left:e})}},{key:"top",get:function(){return v[this._id].elementBBox.top},set:function(e){A(v[this._id],{top:e})}},{key:"containment",get:function(){var e=v[this._id];return e.containmentIsBBox?de(e.options.containment):e.options.containment},set:function(e){A(v[this._id],{containment:e})}},{key:"snap",get:function(){return it(v[this._id].options.snap)},set:function(e){A(v[this._id],{snap:e})}},{key:"autoScroll",get:function(){return it(v[this._id].options.autoScroll)},set:function(e){A(v[this._id],{autoScroll:e})}},{key:"handle",get:function(){return v[this._id].options.handle},set:function(e){A(v[this._id],{handle:e})}},{key:"zIndex",get:function(){return v[this._id].options.zIndex},set:function(e){A(v[this._id],{zIndex:e})}},{key:"onDrag",get:function(){return v[this._id].options.onDrag},set:function(e){A(v[this._id],{onDrag:e})}},{key:"onMove",get:function(){return v[this._id].options.onMove},set:function(e){A(v[this._id],{onMove:e})}},{key:"onDragStart",get:function(){return v[this._id].options.onDragStart},set:function(e){A(v[this._id],{onDragStart:e})}},{key:"onMoveStart",get:function(){return v[this._id].options.onMoveStart},set:function(e){A(v[this._id],{onMoveStart:e})}},{key:"onDragEnd",get:function(){return v[this._id].options.onDragEnd},set:function(e){A(v[this._id],{onDragEnd:e})}}],[{key:"draggableCursor",get:function(){return Ct},set:function(e){Ct!==e&&(Ct=e,ft=null,Object.keys(v).forEach(function(i){var r=v[i];r.disabled||r===E&&Z!==!1||(Lt(r.options.handle,r.orgCursor),r===E&&(M.style.cursor=kt,M.style.cursor=window.getComputedStyle(r.options.handle,"").cursor))}))}},{key:"draggingCursor",get:function(){return _t},set:function(e){_t!==e&&(_t=e,Z=null,E&&(he(E.options.handle),Z===!1&&(Lt(E.options.handle,E.orgCursor),M.style.cursor=kt),M.style.cursor=Z||window.getComputedStyle(E.options.handle,"").cursor))}},{key:"draggableClass",get:function(){return K},set:function(e){e=e?e+"":void 0,e!==K&&(Object.keys(v).forEach(function(i){var r=v[i];if(!r.disabled){var a=k(r.element);K&&a.remove(K),e&&a.add(e)}}),K=e)}},{key:"draggingClass",get:function(){return Y},set:function(e){if(e=e?e+"":void 0,e!==Y){if(E){var i=k(E.element);Y&&i.remove(Y),e&&i.add(e)}Y=e}}},{key:"movingClass",get:function(){return X},set:function(e){if(e=e?e+"":void 0,e!==X){if(E&&Rt){var i=k(E.element);X&&i.remove(X),e&&i.add(e)}X=e}}}]),t}();J.addMoveHandler(document,function(t){if(!!E){var n={left:t.clientX+window.pageXOffset+Bt.left,top:t.clientY+window.pageYOffset+Bt.top};if(jt(E,n,E.snapTargets?function(a){var u=E.snapTargets.length,o=!1,l=!1,s;for(s=0;s<u&&(!o||!l);s++){var f=E.snapTargets[s];(f.gravityXStart==null||a.left>=f.gravityXStart)&&(f.gravityXEnd==null||a.left<=f.gravityXEnd)&&(f.gravityYStart==null||a.top>=f.gravityYStart)&&(f.gravityYEnd==null||a.top<=f.gravityYEnd)&&(!o&&f.x!=null&&(a.left=f.x,o=!0,s=-1),!l&&f.y!=null&&(a.top=f.y,l=!0,s=-1))}return a.snapped=o||l,E.onDrag?E.onDrag(a):!0}:E.onDrag)){var e={},i=E.autoScroll;if(i){var r={x:E.elementBBox.left-window.pageXOffset,y:E.elementBBox.top-window.pageYOffset};["x","y"].forEach(function(a){if(i[a]){var u=i[a].min,o=i[a].max;i[a].lines.some(function(l){return(l.dir===-1?r[a]<=l.position:r[a]>=l.position)?(e[a]={dir:l.dir,speed:l.speed/1e3,min:u,max:o},!0):!1})}})}e.x||e.y?(bt.move(i.target,e,i.isWindow?ut:ct),n.autoScroll=!0):bt.stop(),Rt||(Rt=!0,X&&k(E.element).add(X),E.onMoveStart&&E.onMoveStart(n)),E.onMove&&E.onMove(n)}}});{let t=function(){E&&$t(E)};J.addEndHandler(document,t),J.addCancelHandler(document,t)}{let t=function(){ot=lt.getName("transitionProperty"),Q=lt.getName("transform"),kt=M.style.cursor,(F=lt.getName("userSelect"))&&(ue=M.style[F]);var n=200,e={},i;function r(l,s){l.initElm&&Vt(l,s)}function a(l){clearTimeout(i),Object.keys(v).forEach(function(s){e[s]||r(v[s],l)}),e={}}var u=!1,o=Jt.add(function(l){u||(u=!0,E&&(r(E,l.type),J.move(),e[E._id]=!0),clearTimeout(i),i=setTimeout(function(){a(l.type)},n),u=!1)});window.addEventListener("resize",o,!0),window.addEventListener("scroll",o,!0)};(M=document.body)?t():document.addEventListener("DOMContentLoaded",function(){M=document.body,t()},!0)}return nn});