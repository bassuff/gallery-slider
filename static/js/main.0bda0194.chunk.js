(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports=n(27)},19:function(e,t,n){},21:function(e,t,n){},23:function(e,t,n){},25:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),c=n(5),o=n.n(c),r=(n(19),n(1)),i=n(3),s=n.n(i),u=n(6),m=n(7),d=n(9),v=n(8),g=n(10),p=n(2),f=document.getElementById("modal-root"),E=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(v.a)(t).call(this,e))).el=document.createElement("div"),n.el.style.position="fixed",n.el.style.zIndex="1300",n.el.style.inset="0px",n}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){f.appendChild(this.el)}},{key:"componentWillUnmount",value:function(){f.removeChild(this.el)}},{key:"render",value:function(){return p.createPortal(this.props.children,this.el)}}]),t}(l.a.Component),h=(n(21),function(e){var t=e.onClose;return l.a.createElement(E,null,l.a.createElement("div",{className:"backdrop"}),l.a.createElement("div",{className:"dialog"},l.a.createElement("div",{className:"paper"},l.a.createElement("div",null,l.a.createElement("h2",{className:"dialog-title"},"Dialog title"),t?l.a.createElement("button",{onClick:t,className:"close-button"},"Close"):null),e.children)))}),x=(n(23),function(e){var t=e.currentIndex,n=e.openDialog;return e.slides.map(function(e,a){return l.a.createElement("figure",{key:e.url,className:s()("slide",{active:a===t}),onClick:n},l.a.createElement("img",{src:e.url,alt:e.altText}),e.altText&&l.a.createElement("figcaption",{className:"text-center"},e.altText))})}),b=function(e){var t=e.currentIndex,n=e.goToNext,a=e.goToPrevious,c=e.goToSlide,o=e.slides;return l.a.createElement("div",{className:"position-relative mt-2"},l.a.createElement("button",{className:"prev",onClick:a},"\u276e"),l.a.createElement("div",{className:"list"},l.a.createElement("div",{className:"track",style:{width:"".concat(42*o.length,"px"),transform:"translate3d(".concat(105-42*t,"px, 0px, 0px)")}},o.map(function(e,n){return l.a.createElement("div",{key:e.url,className:"thumbnail",onClick:function(){return c(n)}},l.a.createElement("img",{className:s()("thumbnail-image",{active:n===t}),src:e.url,alt:e.altText,onClick:function(){return null}}))}))),l.a.createElement("button",{className:"next",onClick:n},"\u276f"))},T=function(e){var t=e.slides,n=Object(a.useState)(0),c=Object(r.a)(n,2),o=c[0],i=c[1],s=Object(a.useState)(!1),u=Object(r.a)(s,2),m=u[0],d=u[1],v=Object(a.useState)(null),g=Object(r.a)(v,2),p=g[0],f=g[1],E=function(){var e=0===o?t.length-1:o-1;i(e)},T=function(){var e=o===t.length-1;i(e?0:o+1)},N=function(e){i(e)},j=function(){d(!0)};return l.a.createElement("div",{onTouchStart:function(e){var t=e.touches[0].clientX;f(t)},onTouchMove:function(e){if(null!==p){var t=p-e.touches[0].clientX;t>5&&T(),t<-5&&E(),f(null)}}},l.a.createElement(x,{currentIndex:o,openDialog:j,slides:t}),l.a.createElement(b,{currentIndex:o,goToNext:T,goToPrevious:E,goToSlide:N,slides:t}),m&&l.a.createElement(h,{onClose:function(){d(!1)}},l.a.createElement(x,{currentIndex:o,openDialog:j,slides:t}),l.a.createElement(b,{currentIndex:o,goToNext:T,goToPrevious:E,goToSlide:N,slides:t})))};n(25);var N=function(){return l.a.createElement("div",{className:"container text-center"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-lg-6 col-md-8 mx-auto"},l.a.createElement(T,{slides:[{url:"eugene-golovesov--eOGjaog7h0-unsplash.jpg",altText:"1"},{url:"eugene-golovesov-3o72hSvigbk-unsplash.jpg",altText:"2"},{url:"juan-carlos-frias-brito--uKRelOEcXw-unsplash.jpg",altText:"3"},{url:"mike-houser-ASOGZQvLKt0-unsplash.jpg",altText:"4"}]}))))},j=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,28)).then(function(t){var n=t.getCLS,a=t.getFID,l=t.getFCP,c=t.getLCP,o=t.getTTFB;n(e),a(e),l(e),c(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(N,null))),j()}},[[11,3,2]]]);
//# sourceMappingURL=main.0bda0194.chunk.js.map