webpackJsonp([98],{1348:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),e.d(n,"default",function(){return b});var r,o,c=e(79),a=e.n(c),u=e(110),i=e.n(u),s=e(88),f=e.n(s),p=e(89),v=e.n(p),h=e(111),l=e.n(h),m=e(112),d=e.n(m),y=e(3),g=(e.n(y),e(16)),w=(e.n(g),e(328)),_=(e.n(w),e(857)),b=(r=Object(w.connect)())(o=function(t){function n(){return f()(this,n),l()(this,(n.__proto__||i()(n)).apply(this,arguments))}return d()(n,t),v()(n,[{key:"render",value:function(){var t=this.props,n=t.match,e=t.routerData,r=Object(_.a)(n.path,e);return a()(g.Switch,{},void 0,r.map(function(t){return a()(g.Route,{path:t.path,component:t.component,exact:t.exact},t.key)}),a()(g.Route,{exact:!0,path:"/institution",component:e["/institution/list"].component}))}}]),n}(y.Component))||o},857:function(t,n,e){"use strict";function r(t){return 1*t<10?"0".concat(t):t}function o(t){var n=new Date;if("today"===t)return n.setHours(0),n.setMinutes(0),n.setSeconds(0),[l()(n),l()(n.getTime()+86399e3)];if("week"===t){var e=n.getDay();n.setHours(0),n.setMinutes(0),n.setSeconds(0),0===e?e=6:e-=1;var o=n.getTime()-864e5*e;return[l()(o),l()(o+604799e3)]}if("month"===t){var c=n.getFullYear(),a=n.getMonth(),u=l()(n).add(1,"months"),i=u.year(),s=u.month();return[l()("".concat(c,"-").concat(r(a+1),"-01 00:00:00")),l()(l()("".concat(i,"-").concat(r(s+1),"-01 00:00:00")).valueOf()-1e3)]}if("year"===t){var f=n.getFullYear();return[l()("".concat(f,"-01-01 00:00:00")),l()("".concat(f,"-12-31 23:59:59"))]}}function c(t,n){t===n&&console.warn("Two path are equal!");var e=t.split("/"),r=n.split("/");return r.every(function(t,n){return t===e[n]})?1:e.every(function(t,n){return t===r[n]})?2:3}function a(t){var n=[];n.push(t[0]);for(var e=1;e<t.length;e+=1)!function(e){var r=!1;r=n.every(function(n){return 3===c(n,t[e])}),n=n.filter(function(n){return 1!==c(n,t[e])}),r&&n.push(t[e])}(e);return n}function u(t,n){var e=p()(n).filter(function(n){return 0===n.indexOf(t)&&n!==t});return e=e.map(function(n){return n.replace(t,"")}),a(e).map(function(r){var o=!e.some(function(t){return t!==r&&1===c(t,r)});return s()({},n["".concat(t).concat(r)],{key:"".concat(t).concat(r),path:"".concat(t).concat(r),exact:o})})}n.b=o,n.a=u;var i=e(1),s=e.n(i),f=e(28),p=e.n(f),v=e(90),h=(e.n(v),e(167)),l=e.n(h)}});