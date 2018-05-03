webpackJsonp([88],{1079:function(t,e,n){"use strict";function o(t){var e=t[t.length-1];if(e)return e.title}function r(t){var e=t||"";e!==document.title&&(document.title=e)}function i(){}var a=n(5),c=n(11),u=n(1080);i.prototype=Object.create(a.Component.prototype),i.displayName="DocumentTitle",i.propTypes={title:c.string.isRequired},i.prototype.render=function(){return this.props.children?a.Children.only(this.props.children):null},t.exports=u(o,r)(i)},1080:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var c=n(5),u=o(c),s=n(1081),p=o(s),f=n(694),l=o(f);t.exports=function(t,e,n){function o(t){return t.displayName||t.name||"Component"}if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(s){function f(){h=t(d.map(function(t){return t.props})),v.canUseDOM?e(h):n&&(h=n(h))}if("function"!=typeof s)throw new Error("Expected WrappedComponent to be a React component.");var d=[],h=void 0,v=function(t){function e(){return r(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.peek=function(){return h},e.rewind=function(){if(e.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=h;return h=void 0,d=[],t},e.prototype.shouldComponentUpdate=function(t){return!(0,l.default)(t,this.props)},e.prototype.componentWillMount=function(){d.push(this),f()},e.prototype.componentDidUpdate=function(){f()},e.prototype.componentWillUnmount=function(){var t=d.indexOf(this);d.splice(t,1),f()},e.prototype.render=function(){return u.default.createElement(s,this.props)},e}(c.Component);return v.displayName="SideEffect("+o(s)+")",v.canUseDOM=p.default.canUseDOM,v}}},1081:function(t,e,n){var o;!function(){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),i={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen};void 0!==(o=function(){return i}.call(e,n,e,t))&&(t.exports=o)}()},1084:function(t,e,n){"use strict";var o=n(77),r=n.n(o),i=n(5),a=(n.n(i),n(60)),c=n.n(a),u=n(1085),s=n.n(u);e.a=function(t){var e=t.className,n=t.links,o=t.copyright,i=c()(s.a.globalFooter,e);return r()("div",{className:i},void 0,n&&r()("div",{className:s.a.links},void 0,n.map(function(t){return r()("a",{target:t.blankTarget?"_blank":"_self",href:t.href},t.key,t.title)})),o&&r()("div",{className:s.a.copyright},void 0,o))}},1085:function(t,e){t.exports={globalFooter:"globalFooter___1W2x2",links:"links___1TMBe",copyright:"copyright___3hvsv"}},1086:function(t,e,n){t.exports=n.p+"static/logo.f8619bdf.png"},1160:function(t,e){t.exports={container:"container___1qll8",top:"top___dAPWE",header:"header___3xyac",logo:"logo___3yv0h",title:"title___2SlIy",desc:"desc___1uABx",footer:"footer___1tybZ"}},1197:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(161),r=n.n(o),i=n(162),a=n.n(i),c=n(163),u=n.n(c),s=n(164),p=n.n(s),f=n(165),l=n.n(f),d=(n(783),n(158)),h=n(77),v=n.n(h),y=n(5),m=n.n(y),_=n(18),w=(n.n(_),n(1079)),g=n.n(w),b=n(1084),k=n(1160),x=n.n(k),O=n(1086),E=n.n(O),N=n(815),T=[{key:"\u4f17\u94f6\u4e91\u6d4b",title:"\u4f17\u94f6\u4e91\u6d4b",href:"http://www.ibankmatch.com/",blankTarget:!0}],j=v()("div",{},void 0,"Copyright ",v()(d.a,{type:"copyright"})," 2018 bank match"),C=v()(_.Redirect,{exact:!0,from:"/user",to:"/user/login"}),M=function(t){function e(){return a()(this,e),p()(this,(e.__proto__||r()(e)).apply(this,arguments))}return l()(e,t),u()(e,[{key:"getPageTitle",value:function(){var t=this.props,e=t.routerData,n=t.location,o=n.pathname,r="\u4f17\u94f6\u4e91\u6d4b";return e[o]&&e[o].name&&(r="".concat(e[o].name," - \u4f17\u94f6\u4e91\u6d4b")),r}},{key:"render",value:function(){var t=this.props,e=t.routerData,n=t.match;return v()(g.a,{title:this.getPageTitle()},void 0,v()("div",{className:x.a.container},void 0,v()("div",{className:x.a.top},void 0,v()("div",{className:x.a.header},void 0,v()(_.Link,{to:"/"},void 0,v()("img",{alt:"logo",className:x.a.logo,src:E.a}),v()("span",{className:x.a.title},void 0,"\u4f17\u94f6\u4e91\u6d4b"))),v()("div",{className:x.a.desc})),v()(_.Switch,{},void 0,Object(N.a)(n.path,e).map(function(t){return v()(_.Route,{path:t.path,component:t.component,exact:t.exact},t.key)}),C),v()(b.a,{className:x.a.footer,links:T,copyright:j})))}}]),e}(m.a.PureComponent);e.default=M},694:function(t,e){t.exports=function(t,e,n,o){var r=n?n.call(o,t,e):void 0;if(void 0!==r)return!!r;if(t===e)return!0;if("object"!=typeof t||!t||"object"!=typeof e||!e)return!1;var i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(e),u=0;u<i.length;u++){var s=i[u];if(!c(s))return!1;var p=t[s],f=e[s];if(!1===(r=n?n.call(o,p,f,s):void 0)||void 0===r&&p!==f)return!1}return!0}},783:function(t,e,n){"use strict";var o=n(105);n.n(o)},807:function(t,e,n){function o(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}return r(t)}var r=n(808);t.exports=o},808:function(t,e,n){t.exports=n(334)},815:function(t,e,n){"use strict";function o(t){return 1*t<10?"0".concat(t):t}function r(t){var e=new Date;if("today"===t)return e.setHours(0),e.setMinutes(0),e.setSeconds(0),[h()(e),h()(e.getTime()+86399e3)];if("week"===t){var n=e.getDay();e.setHours(0),e.setMinutes(0),e.setSeconds(0),0===n?n=6:n-=1;var r=e.getTime()-864e5*n;return[h()(r),h()(r+604799e3)]}if("month"===t){var i=e.getFullYear(),a=e.getMonth(),c=h()(e).add(1,"months"),u=c.year(),s=c.month();return[h()("".concat(i,"-").concat(o(a+1),"-01 00:00:00")),h()(h()("".concat(u,"-").concat(o(s+1),"-01 00:00:00")).valueOf()-1e3)]}if("year"===t){var p=e.getFullYear();return[h()("".concat(p,"-01-01 00:00:00")),h()("".concat(p,"-12-31 23:59:59"))]}}function i(t,e){t===e&&console.warn("Two path are equal!");var n=t.split("/"),o=e.split("/");return o.every(function(t,e){return t===n[e]})?1:n.every(function(t,e){return t===o[e]})?2:3}function a(t){var e=[];e.push(t[0]);for(var n=1;n<t.length;n+=1)!function(n){var o=!1;o=e.every(function(e){return 3===i(e,t[n])}),e=e.filter(function(e){return 1!==i(e,t[n])}),o&&e.push(t[n])}(n);return e}function c(t,e){var n=f()(e).filter(function(e){return 0===e.indexOf(t)&&e!==t});return n=n.map(function(e){return e.replace(t,"")}),a(n).map(function(o){var r=!n.some(function(t){return t!==o&&1===i(t,o)});return s()({},e["".concat(t).concat(o)],{key:"".concat(t).concat(o),path:"".concat(t).concat(o),exact:r})})}e.b=r,e.a=c;var u=n(4),s=n.n(u),p=n(166),f=n.n(p),l=n(807),d=(n.n(l),n(160)),h=n.n(d)}});