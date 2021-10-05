!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=853)}({162:function(t,e){var n,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{r="function"==typeof clearTimeout?clearTimeout:u}catch(t){r=u}}();var c,a=[],l=!1,f=-1;function h(){l&&c&&(l=!1,c.length?a=c.concat(a):f=-1,a.length&&d())}function d(){if(!l){var t=s(h);l=!0;for(var e=a.length;e;){for(c=a,a=[];++f<e;)c&&c[f].run();f=-1,e=a.length}c=null,l=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function v(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];a.push(new p(t,e)),1!==a.length||l||s(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=v,o.addListener=v,o.once=v,o.off=v,o.removeListener=v,o.removeAllListeners=v,o.emit=v,o.prependListener=v,o.prependOnceListener=v,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},72:function(t,e,n){(function(e,n){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */var r;r=function(){"use strict";function t(t){return"function"==typeof t}var r=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},o=0,i=void 0,u=void 0,s=function(t,e){p[o]=t,p[o+1]=e,2===(o+=2)&&(u?u(v):w())},c="undefined"!=typeof window?window:void 0,a=c||{},l=a.MutationObserver||a.WebKitMutationObserver,f="undefined"==typeof self&&void 0!==e&&"[object process]"==={}.toString.call(e),h="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function d(){var t=setTimeout;return function(){return t(v,1)}}var p=new Array(1e3);function v(){for(var t=0;t<o;t+=2)(0,p[t])(p[t+1]),p[t]=void 0,p[t+1]=void 0;o=0}var y,_,m,b,w=void 0;function g(t,e){var n=this,r=new this.constructor(A);void 0===r[x]&&F(r);var o=n._state;if(o){var i=arguments[o-1];s((function(){return L(o,r,i,n._result)}))}else M(n,r,t,e);return r}function T(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(A);return O(e,t),e}f?w=function(){return e.nextTick(v)}:l?(_=0,m=new l(v),b=document.createTextNode(""),m.observe(b,{characterData:!0}),w=function(){b.data=_=++_%2}):h?((y=new MessageChannel).port1.onmessage=v,w=function(){return y.port2.postMessage(0)}):w=void 0===c?function(){try{var t=Function("return this")().require("vertx");return void 0!==(i=t.runOnLoop||t.runOnContext)?function(){i(v)}:d()}catch(t){return d()}}():d();var x=Math.random().toString(36).substring(2);function A(){}function j(e,n,r){n.constructor===e.constructor&&r===g&&n.constructor.resolve===T?function(t,e){1===e._state?S(t,e._result):2===e._state?E(t,e._result):M(e,void 0,(function(e){return O(t,e)}),(function(e){return E(t,e)}))}(e,n):void 0===r?S(e,n):t(r)?function(t,e,n){s((function(t){var r=!1,o=function(t,e,n,r){try{t.call(e,n,r)}catch(t){return t}}(n,e,(function(n){r||(r=!0,e!==n?O(t,n):S(t,n))}),(function(e){r||(r=!0,E(t,e))}),t._label);!r&&o&&(r=!0,E(t,o))}),t)}(e,n,r):S(e,n)}function O(t,e){if(t===e)E(t,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(r=e),null===r||"object"!==o&&"function"!==o)S(t,e);else{var n=void 0;try{n=e.then}catch(e){return void E(t,e)}j(t,e,n)}var r,o}function P(t){t._onerror&&t._onerror(t._result),k(t)}function S(t,e){void 0===t._state&&(t._result=e,t._state=1,0!==t._subscribers.length&&s(k,t))}function E(t,e){void 0===t._state&&(t._state=2,t._result=e,s(P,t))}function M(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+1]=n,o[i+2]=r,0===i&&t._state&&s(k,t)}function k(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,u=0;u<e.length;u+=3)r=e[u],o=e[u+n],r?L(n,r,o,i):o(i);t._subscribers.length=0}}function L(e,n,r,o){var i=t(r),u=void 0,s=void 0,c=!0;if(i){try{u=r(o)}catch(t){c=!1,s=t}if(n===u)return void E(n,new TypeError("A promises callback cannot return that same promise."))}else u=o;void 0!==n._state||(i&&c?O(n,u):!1===c?E(n,s):1===e?S(n,u):2===e&&E(n,u))}var C=0;function F(t){t[x]=C++,t._state=void 0,t._result=void 0,t._subscribers=[]}var I=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(A),this.promise[x]||F(this.promise),r(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&S(this.promise,this._result))):E(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;void 0===this._state&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===T){var o=void 0,i=void 0,u=!1;try{o=t.then}catch(t){u=!0,i=t}if(o===g&&void 0!==t._state)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===W){var s=new n(A);u?E(s,i):j(s,t,o),this._willSettleAt(s,e)}else this._willSettleAt(new n((function(e){return e(t)})),e)}else this._willSettleAt(r(t),e)},t.prototype._settledAt=function(t,e,n){var r=this.promise;void 0===r._state&&(this._remaining--,2===t?E(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},t.prototype._willSettleAt=function(t,e){var n=this;M(t,void 0,(function(t){return n._settledAt(1,e,t)}),(function(t){return n._settledAt(2,e,t)}))},t}(),W=function(){function e(t){this[x]=C++,this._result=this._state=void 0,this._subscribers=[],A!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(t,e){try{e((function(e){O(t,e)}),(function(e){E(t,e)}))}catch(e){E(t,e)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype.catch=function(t){return this.then(null,t)},e.prototype.finally=function(e){var n=this.constructor;return t(e)?this.then((function(t){return n.resolve(e()).then((function(){return t}))}),(function(t){return n.resolve(e()).then((function(){throw t}))})):this.then(e,e)},e}();return W.prototype.then=g,W.all=function(t){return new I(this,t).promise},W.race=function(t){var e=this;return r(t)?new e((function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)})):new e((function(t,e){return e(new TypeError("You must pass an array to race."))}))},W.resolve=T,W.reject=function(t){var e=new this(A);return E(e,t),e},W._setScheduler=function(t){u=t},W._setAsap=function(t){s=t},W._asap=s,W.polyfill=function(){var t=void 0;if(void 0!==n)t=n;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var r=null;try{r=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===r&&!e.cast)return}t.Promise=W},W.Promise=W,W},t.exports=r()}).call(this,n(162),n(80))},80:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},853:function(t,e,n){(function(t,n){var r=this&&this.__awaiter||function(e,n,r,o){return new(r||(r=t))((function(t,i){function u(t){try{c(o.next(t))}catch(t){i(t)}}function s(t){try{c(o.throw(t))}catch(t){i(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof r?n:new r((function(t){t(n)}))).then(u,s)}c((o=o.apply(e,n||[])).next())}))},o=this&&this.__generator||function(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=u.trys,(o=o.length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(t){i=[6,t],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},i=this;Office.onReady((function(){}));("undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n?n:void 0).action=function(t){console.log("Hello World");var e={type:Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,message:"Performed action.",icon:"Icon.80x80",persistent:!0};Office.context.mailbox.item.notificationMessages.replaceAsync("action",e),r(i,void 0,void 0,(function(){var t=this;return o(this,(function(e){return[2,Word.run((function(e){return r(t,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return e.document.body.insertParagraph("Hello World",Word.InsertLocation.end).font.color="blue",[4,e.sync()];case 1:return t.sent(),[2]}}))}))}))]}))})),t.completed()},function(){var t="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0;if(t){var n="undefined"!=typeof __webpack_exports__?__webpack_exports__:e;if(n)if("function"!=typeof n){for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)){var o=void 0;try{o=n[r]}catch(t){continue}t.register(o,r,"F:\\Utilisateurs\\Papa\\Prog\\CollAddIn\\src\\commands\\commands.ts")}}else t.register(n,"module.exports","F:\\Utilisateurs\\Papa\\Prog\\CollAddIn\\src\\commands\\commands.ts")}}()}).call(this,n(72).Promise,n(80))}});
//# sourceMappingURL=commands.js.map