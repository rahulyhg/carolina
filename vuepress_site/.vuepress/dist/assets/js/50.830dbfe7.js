(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{163:function(t,s,a){"use strict";a.r(s);var n=a(0),e=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"deleting-items"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deleting-items","aria-hidden":"true"}},[t._v("#")]),t._v(" Deleting Items")]),a("p",[t._v("It's time to fill in the DELETE button for each item in the inventory.\nWe will create tiny forms with delete buttons for each row. Edit the\niteration loop to look like this:")]),a("div",{staticClass:"language-pug extra-class"},[a("pre",{pre:!0,attrs:{class:"language-pug"}},[a("code",[t._v("                "),a("span",{pre:!0,attrs:{class:"token flow-control"}},[a("span",{pre:!0,attrs:{class:"token each"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("each")]),t._v(" item "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")])]),t._v(" locals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("items")]),t._v("\n                  "),a("span",{pre:!0,attrs:{class:"token tag"}},[t._v("tr")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token tag"}},[t._v("td")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token code"}},[t._v(" item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token tag"}},[t._v("td")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token code"}},[t._v(" item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("description")]),t._v("\n                    "),a("span",{pre:!0,attrs:{class:"token tag"}},[t._v("td")]),t._v("\n                      "),a("span",{pre:!0,attrs:{class:"token tag"}},[t._v("form"),a("span",{pre:!0,attrs:{class:"token attributes"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n                        "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("action")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/items/delete/"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_id")]),t._v("\n                        "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("method")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"POST"')])]),t._v("\n                      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])])]),t._v("\n                        \n                        "),a("span",{pre:!0,attrs:{class:"token mixin"}},[a("span",{pre:!0,attrs:{class:"token name function"}},[t._v("+csrfToken")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("locals"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v("\n                        \n                        "),a("span",{pre:!0,attrs:{class:"token tag"}},[t._v("button.btn.btn-danger")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token plain-text"}},[t._v("DELETE ITEM")]),t._v("\n")])])]),a("p",[t._v("If you start the server and visit the page, you will see red delete buttons.\nIf you click one, you will be taken to the page with the simple \"Delete item\"\ntext. It's time to define that handler's correct behavior.")]),a("p",[t._v("In "),a("code",[t._v("site/http/controllers/item-controller.js")]),t._v(",\nwrite the "),a("code",[t._v("deleteItem")]),t._v(" method to look like this:")]),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("deleteItem")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// get the Item class")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" Item "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Carolina"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DB'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_modelClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Item'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// get the specific item by id")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" item "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" Item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$lookup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("params"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("itemId"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  \n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// check that the user actually owns the item")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" res "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/items"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("flash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Something went wrong."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Uh-oh!"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'danger'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    \n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" item"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_delete")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    \n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" res "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirect")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/items"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("flash")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Item deleted."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'primary'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("Restart the server and visit the page and try to delete an item. You should\nbe redirected and the item you deleted will be gone.")]),a("p",[t._v("We're done.")])])}],!1,null,null,null);s.default=e.exports}}]);