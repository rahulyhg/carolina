(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{158:function(t,e,s){"use strict";s.r(e);var a=s(0),n=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"csrf-tokens"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#csrf-tokens","aria-hidden":"true"}},[t._v("#")]),t._v(" CSRF Tokens")]),s("p",[t._v("Because of the possiblity of cross-site request forgery, a protection called\nCSRF tokens are very common.")]),s("p",[t._v('For all routes that include the built-in middleware "CsrfMiddleware", every\nuser session is assigned a CSRF token which is stored in the session.\nThat token is used to verify any POST, PUT, PATCH, or DELETE request.')]),s("p",[t._v("The middleware looks for a correct token as the value\n"),s("code",[t._v("csrf_token")]),t._v("\nas part of "),s("code",[t._v("request.data")]),t._v(" (derived from the form-data or JSON), or as the value\nof the header "),s("code",[t._v("X-CSRF-TOKEN")]),t._v(" or "),s("code",[t._v("X-XSRF-TOKEN")]),t._v(".\nIf the correct token is in any of those values, the request will be allowed\nto proceed, otherwise it will be rejected.")]),s("h2",{attrs:{id:"forms"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#forms","aria-hidden":"true"}},[t._v("#")]),t._v(" Forms")]),s("p",[t._v("You can include a hidden input containing the correct CSRF token in your pug\ntemplate using a mixin:")]),s("div",{staticClass:"language-pug extra-class"},[s("pre",{pre:!0,attrs:{class:"language-pug"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("include carolina/http/mixins")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[t._v("form"),s("span",{pre:!0,attrs:{class:"token attributes"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("method")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"POST"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])])]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token mixin"}},[s("span",{pre:!0,attrs:{class:"token name function"}},[t._v("+csrfToken")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("local"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v("\n")])])]),s("p",[t._v("Note that the incoming Request object is always available when\nrendering views using "),s("code",[t._v("PugTemplateView")]),t._v(" as "),s("code",[t._v("locals.request")]),t._v(".\nIn any case where you need the CSRF token in a template but don't want to\ninsert the hidden input, you can access the session CSRF token as\n"),s("code",[t._v("locals.request.session.csrf_token")]),t._v(".")]),s("h2",{attrs:{id:"javascript"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#javascript","aria-hidden":"true"}},[t._v("#")]),t._v(" Javascript")]),s("p",[t._v("If you wish to make AJAX calls that submit POST, PUT, PATCH, or DELETE\nrequests, you have a few options. You could make the endpoint be part of a\nroute group that does not use the CSRF middleware.")]),s("p",[t._v("The other option is to put the CSRF token in the\nheader "),s("code",[t._v("X-CSRF-TOKEN")]),t._v(" or "),s("code",[t._v("X-XSRF-TOKEN")]),t._v(".")]),s("p",[t._v("If you are using the Carolina frontend system (which is similar to the backend\nsystem), you can use the Http service to make requests. The frontend Http\nservice will look for the CSRF token in the cookie if it exists and\nautomatically place its value in the "),s("code",[t._v("X-CSRF-TOKEN")]),t._v(" for all requests.")]),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("Carolina"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Http"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("Http")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" response "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" Http"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("post")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/some/endpoint"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("In order for this to work, "),s("code",[t._v("csrf_token")]),t._v(" must be present in the\n"),s("code",[t._v("http.unencrypted_cookies")]),t._v(" value.")]),s("p",[t._v("For more on the Carolina frontend system, see the\n"),s("a",{attrs:{href:"/frontend/frontend"}},[t._v("frontend docs")]),t._v(".")]),s("h2",{attrs:{id:"excluding-routes-from-csrf"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#excluding-routes-from-csrf","aria-hidden":"true"}},[t._v("#")]),t._v(" Excluding Routes from CSRF")]),s("p",[t._v("To exclude routes from CSRF protection, put them in a route group that doesn't\nmake use of the "),s("code",[t._v("CSRFMiddleware")]),t._v(" class.")]),s("h2",{attrs:{id:"the-csrf-token-cookie"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#the-csrf-token-cookie","aria-hidden":"true"}},[t._v("#")]),t._v(" The "),s("code",[t._v("csrf_token")]),t._v(" Cookie")]),s("p",[t._v("The CSRF token is stored in the cookie as "),s("code",[t._v("csrf_token")]),t._v(". If you leave the value\nof "),s("code",[t._v("unencrypted_cookies")]),t._v(" in "),s("code",[t._v("config/http.js")]),t._v(" alone, it will be the\nunencrypted CSRF token.")])])}],!1,null,null,null);e.default=n.exports}}]);