webpackJsonp([90],{1084:function(t,e,n){"use strict";function o(t){var e=t[t.length-1];if(e)return e.title}function r(t){var e=t||"";e!==document.title&&(document.title=e)}function i(){}var a=n(5),c=n(11),u=n(1085);i.prototype=Object.create(a.Component.prototype),i.displayName="DocumentTitle",i.propTypes={title:c.string.isRequired},i.prototype.render=function(){return this.props.children?a.Children.only(this.props.children):null},t.exports=u(o,r)(i)},1085:function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var c=n(5),u=o(c),p=n(1086),s=o(p),l=n(697),f=o(l);t.exports=function(t,e,n){function o(t){return t.displayName||t.name||"Component"}if("function"!=typeof t)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof e)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==n&&"function"!=typeof n)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(p){function l(){h=t(d.map(function(t){return t.props})),v.canUseDOM?e(h):n&&(h=n(h))}if("function"!=typeof p)throw new Error("Expected WrappedComponent to be a React component.");var d=[],h=void 0,v=function(t){function e(){return r(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.peek=function(){return h},e.rewind=function(){if(e.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var t=h;return h=void 0,d=[],t},e.prototype.shouldComponentUpdate=function(t){return!(0,f.default)(t,this.props)},e.prototype.componentWillMount=function(){d.push(this),l()},e.prototype.componentDidUpdate=function(){l()},e.prototype.componentWillUnmount=function(){var t=d.indexOf(this);d.splice(t,1),l()},e.prototype.render=function(){return u.default.createElement(p,this.props)},e}(c.Component);return v.displayName="SideEffect("+o(p)+")",v.canUseDOM=s.default.canUseDOM,v}}},1086:function(t,e,n){var o;!function(){"use strict";var r=!("undefined"==typeof window||!window.document||!window.document.createElement),i={canUseDOM:r,canUseWorkers:"undefined"!=typeof Worker,canUseEventListeners:r&&!(!window.addEventListener&&!window.attachEvent),canUseViewport:r&&!!window.screen};void 0!==(o=function(){return i}.call(e,n,e,t))&&(t.exports=o)}()},1089:function(t,e,n){"use strict";var o=n(77),r=n.n(o),i=n(5),a=(n.n(i),n(61)),c=n.n(a),u=n(1090),p=n.n(u);e.a=function(t){var e=t.className,n=t.links,o=t.copyright,i=c()(p.a.globalFooter,e);return r()("div",{className:i},void 0,n&&r()("div",{className:p.a.links},void 0,n.map(function(t){return r()("a",{target:t.blankTarget?"_blank":"_self",href:t.href},t.key,t.title)})),o&&r()("div",{className:p.a.copyright},void 0,o))}},1090:function(t,e){t.exports={globalFooter:"globalFooter___1W2x2",links:"links___1TMBe",copyright:"copyright___3hvsv"}},1091:function(t,e,n){t.exports=n.p+"static/logo.f8619bdf.png"},1164:function(t,e){t.exports={container:"container___1qll8",top:"top___dAPWE",header:"header___3xyac",logo:"logo___3yv0h",title:"title___2SlIy",desc:"desc___1uABx",footer:"footer___1tybZ"}},1204:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(163),r=n.n(o),i=n(164),a=n.n(i),c=n(165),u=n.n(c),p=n(166),s=n.n(p),l=n(167),f=n.n(l),d=(n(790),n(161)),h=n(77),v=n.n(h),y=n(5),m=n.n(y),_=n(17),w=(n.n(_),n(1084)),b=n.n(w),g=n(1089),k=n(1164),O=n.n(k),x=n(1091),E=n.n(x),N=n(230),j=[{key:"\u4f17\u94f6\u4e91\u6d4b",title:"\u4f17\u94f6\u4e91\u6d4b",href:"http://www.ibankmatch.com/",blankTarget:!0}],C=v()("div",{},void 0,"Copyright ",v()(d.a,{type:"copyright"})," 2018 bank match"),U=v()(_.Redirect,{exact:!0,from:"/user",to:"/user/login"}),T=function(t){function e(){return a()(this,e),s()(this,(e.__proto__||r()(e)).apply(this,arguments))}return f()(e,t),u()(e,[{key:"getPageTitle",value:function(){var t=this.props,e=t.routerData,n=t.location,o=n.pathname,r="\u4f17\u94f6\u4e91\u6d4b";return e[o]&&e[o].name&&(r="".concat(e[o].name," - \u4f17\u94f6\u4e91\u6d4b")),r}},{key:"render",value:function(){var t=this.props,e=t.routerData,n=t.match;return v()(b.a,{title:this.getPageTitle()},void 0,v()("div",{className:O.a.container},void 0,v()("div",{className:O.a.top},void 0,v()("div",{className:O.a.header},void 0,v()(_.Link,{to:"/"},void 0,v()("img",{alt:"logo",className:O.a.logo,src:E.a}),v()("span",{className:O.a.title},void 0,"\u4f17\u94f6\u4e91\u6d4b"))),v()("div",{className:O.a.desc})),v()(_.Switch,{},void 0,Object(N.b)(n.path,e).map(function(t){return v()(_.Route,{path:t.path,component:t.component,exact:t.exact},t.key)}),U),v()(g.a,{className:O.a.footer,links:j,copyright:C})))}}]),e}(m.a.PureComponent);e.default=T},697:function(t,e){t.exports=function(t,e,n,o){var r=n?n.call(o,t,e):void 0;if(void 0!==r)return!!r;if(t===e)return!0;if("object"!=typeof t||!t||"object"!=typeof e||!e)return!1;var i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(var c=Object.prototype.hasOwnProperty.bind(e),u=0;u<i.length;u++){var p=i[u];if(!c(p))return!1;var s=t[p],l=e[p];if(!1===(r=n?n.call(o,s,l,p):void 0)||void 0===r&&s!==l)return!1}return!0}},790:function(t,e,n){"use strict";var o=n(105);n.n(o)}});