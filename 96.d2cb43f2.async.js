webpackJsonp([96],{1223:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),e.d(t,"default",function(){return b});var r,c,o=e(77),a=e.n(o),u=e(161),i=e.n(u),f=e(162),s=e.n(f),p=e(163),l=e.n(p),v=e(164),h=e.n(v),m=e(165),d=e.n(m),y=e(5),g=(e.n(y),e(18)),w=(e.n(g),e(327)),_=(e.n(w),e(814)),b=(r=Object(w.connect)())(c=function(n){function t(){return s()(this,t),h()(this,(t.__proto__||i()(t)).apply(this,arguments))}return d()(t,n),l()(t,[{key:"render",value:function(){var n=this.props,t=n.match,e=n.routerData,r=Object(_.a)(t.path,e);return a()(g.Switch,{},void 0,r.map(function(n){return a()(g.Route,{path:n.path,component:n.component,exact:n.exact},n.key)}),a()(g.Route,{exact:!0,path:"/content/column",component:e["/content/column/list"].component}))}}]),t}(y.Component))||c},814:function(n,t,e){"use strict";function r(n){return 1*n<10?"0".concat(n):n}function c(n){var t=new Date;if("today"===n)return t.setHours(0),t.setMinutes(0),t.setSeconds(0),[h()(t),h()(t.getTime()+86399e3)];if("week"===n){var e=t.getDay();t.setHours(0),t.setMinutes(0),t.setSeconds(0),0===e?e=6:e-=1;var c=t.getTime()-864e5*e;return[h()(c),h()(c+604799e3)]}if("month"===n){var o=t.getFullYear(),a=t.getMonth(),u=h()(t).add(1,"months"),i=u.year(),f=u.month();return[h()("".concat(o,"-").concat(r(a+1),"-01 00:00:00")),h()(h()("".concat(i,"-").concat(r(f+1),"-01 00:00:00")).valueOf()-1e3)]}if("year"===n){var s=t.getFullYear();return[h()("".concat(s,"-01-01 00:00:00")),h()("".concat(s,"-12-31 23:59:59"))]}}function o(n,t){n===t&&console.warn("Two path are equal!");var e=n.split("/"),r=t.split("/");return r.every(function(n,t){return n===e[t]})?1:e.every(function(n,t){return n===r[t]})?2:3}function a(n){var t=[];t.push(n[0]);for(var e=1;e<n.length;e+=1)!function(e){var r=!1;r=t.every(function(t){return 3===o(t,n[e])}),t=t.filter(function(t){return 1!==o(t,n[e])}),r&&t.push(n[e])}(e);return t}function u(n,t){var e=p()(t).filter(function(t){return 0===t.indexOf(n)&&t!==n});return e=e.map(function(t){return t.replace(n,"")}),a(e).map(function(r){var c=!e.some(function(n){return n!==r&&1===o(n,r)});return f()({},t["".concat(n).concat(r)],{key:"".concat(n).concat(r),path:"".concat(n).concat(r),exact:c})})}t.b=c,t.a=u;var i=e(4),f=e.n(i),s=e(166),p=e.n(s),l=e(335),v=(e.n(l),e(160)),h=e.n(v)}});