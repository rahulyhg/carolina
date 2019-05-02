(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{145:function(t,s,a){"use strict";a.r(s);var e=a(0),n=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("The Database Service maintains a library of Model classes. Some Models are\nincluded with the framework, and some are defined by you or by installed\nplugins.")]),a("p",[t._v("Each Model class represents a collection in a database. Before using Model\nclasses, ensure that your Database Connections are properly configured as\ndescribed in the "),a("router-link",{attrs:{to:"./db-service.html"}},[t._v("introduction to the DB Service")]),t._v(".")],1),a("p",[t._v("You can access Model classes from the DB Service:")]),t._m(1),a("p"),t._m(2),a("p"),t._m(3),t._m(4),a("p",[t._v("You can generate a Model class using the CLI:")]),t._m(5),t._m(6),t._m(7),a("p",[t._v('By default, the DB Service will manage all Models using the "default" database\nConnection. If you want to use other database Connections for specific\nmodels, configure those connections in '),a("code",[t._v("config/db.js")]),t._v(" as described in the\nintroduction to the "),a("router-link",{attrs:{to:"./db-service.html"}},[t._v("DB Service")]),t._v(".")],1),t._m(8),a("p",[t._v("You can get a Model class from the DB Service, and you can use static methods\nof the Model class to get all objects in the collection:")]),t._m(9),t._m(10),t._m(11),t._m(12),t._m(13),a("p",[t._v("For more details on Model queries, see the section on\n"),a("router-link",{attrs:{to:"./queries.html"}},[t._v("queries")]),t._v(".")],1),t._m(14),t._m(15),t._m(16),t._m(17),t._m(18),t._m(19),t._m(20),t._m(21),t._m(22),t._m(23),t._m(24),t._m(25),t._m(26),t._m(27),t._m(28),t._m(29),t._m(30),t._m(31),a("p",[t._v('To ensure that a user named "new_user" exists in the database:')]),t._m(32),t._m(33),t._m(34),t._m(35),t._m(36),t._m(37),t._m(38)])},[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"models"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#models","aria-hidden":"true"}},[this._v("#")]),this._v(" Models")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" DBSvc "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Carolina"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DB'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// get the User class")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" User "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" DBSvc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_modelClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'User'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// get the SessionInfo class")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" SessionInfo "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" DBSvc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_modelClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'SessionInfo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#defining-models"}},[t._v("Defining Models")]),a("ul",[a("li",[a("a",{attrs:{href:"#database-connection"}},[t._v("Database Connection")])])])]),a("li",[a("a",{attrs:{href:"#getting-model-instances"}},[t._v("Getting Model Instances")]),a("ul",[a("li",[a("a",{attrs:{href:"#queries"}},[t._v("Queries")])])])]),a("li",[a("a",{attrs:{href:"#getting-single-instances"}},[t._v("Getting Single Instances")]),a("ul",[a("li",[a("a",{attrs:{href:"#checking-for-null"}},[t._v("Checking for Null")])])])]),a("li",[a("a",{attrs:{href:"#inserts-and-updates"}},[t._v("Inserts and Updates")]),a("ul",[a("li",[a("a",{attrs:{href:"#creating-instances"}},[t._v("Creating Instances")])]),a("li",[a("a",{attrs:{href:"#updating-instances"}},[t._v("Updating Instances")])]),a("li",[a("a",{attrs:{href:"#first-or-new"}},[t._v("First or New")])])])]),a("li",[a("a",{attrs:{href:"#deleting-instances"}},[t._v("Deleting Instances")])]),a("li",[a("a",{attrs:{href:"#model-comparison"}},[t._v("Model Comparison")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"defining-models"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#defining-models","aria-hidden":"true"}},[this._v("#")]),this._v(" Defining Models")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("Your custom Model classes should be defined inside the\n"),a("code",[t._v("site/db/models/")]),t._v(" directory and exported by the file\n"),a("code",[t._v("site/db/models/index.js")]),t._v(". Models that come with the framework are exported\nby the file "),a("code",[t._v("carolina/main/db/models/index.js")]),t._v(". Models that from plugins\nare exported by the file "),a("code",[t._v("<plugin_dir>/plugin/db/models.js")]),t._v(" or\n"),a("code",[t._v("<plugin_dir>/plugin/db/models/index.js")]),t._v(".")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[this._v("node . generate model MyCustomModel\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("This would create the file\n"),s("code",[this._v("site/db/models/my-custom-model.js")]),this._v(". That file will include the basic\nscaffold of a Schema class and a Model class.")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"database-connection"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#database-connection","aria-hidden":"true"}},[this._v("#")]),this._v(" Database Connection")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"getting-model-instances"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#getting-model-instances","aria-hidden":"true"}},[this._v("#")]),this._v(" Getting Model Instances")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" User "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" DBSvc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_modelClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'User'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" allUsers "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$all")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => [ User{}, User{}, ...]")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"warning custom-block"},[s("p",{staticClass:"custom-block-title"},[this._v("WARNING")]),s("p",[this._v("Don't use the "),s("code",[this._v("$all")]),this._v(" method for collections that may have many objects.")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"queries"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#queries","aria-hidden":"true"}},[this._v("#")]),this._v(" Queries")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("You can use the "),s("code",[this._v("$query")]),this._v(" method to get all instances of a Model that match\na certain query:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" adminUsers "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$query")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" isAdmin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"getting-single-instances"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#getting-single-instances","aria-hidden":"true"}},[this._v("#")]),this._v(" Getting Single Instances")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("If you have the "),s("code",[this._v("_id")]),this._v(" of an object, you can use the "),s("code",[this._v("$lookup")]),this._v(" method:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" specificUser "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$lookup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'12345'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("If you want to get the first object found that matches a specific query,\nuse the "),s("code",[this._v("$get")]),this._v(" method:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" firstAdminUser "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" isAdmin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"checking-for-null"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#checking-for-null","aria-hidden":"true"}},[this._v("#")]),this._v(" Checking for Null")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("When using the "),s("code",[this._v("$lookup")]),this._v(" or "),s("code",[this._v("$get")]),this._v(" methods, you should always check to see\nif the return value is "),s("code",[this._v("null")]),this._v(". Those methods will return an instance of the\nModel class if a match is found, but will otherwise return null.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" someUser "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("query"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("someUser "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"No matching user..."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token string"}},[t._v("`Matching user: ")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("someUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("username"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"inserts-and-updates"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#inserts-and-updates","aria-hidden":"true"}},[this._v("#")]),this._v(" Inserts and Updates")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"creating-instances"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#creating-instances","aria-hidden":"true"}},[this._v("#")]),this._v(" Creating Instances")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("You can create new instances of Model classes by calling their constructors,\nusing any other methods on them if desired,\nand then calling the async "),s("code",[this._v("_save")]),this._v(" method:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  \n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" DBSvc "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Carolina"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'DB'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" User "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" DBSvc"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_modelClass")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'User'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  \n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("User")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" username"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" request"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isAdmin "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setPassword")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"password123"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" newUserId "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_save")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  \n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// other stuff")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("This example creates a new User object from request form data, makes the user\nand admin account, and gives it a password. The object is then saved.\nThe "),a("code",[t._v("createdAt")]),t._v(" and "),a("code",[t._v("updatedAt")]),t._v(" properties will be automatically set, and\nan "),a("code",[t._v("_id")]),t._v(" will be assigned (and returned from the "),a("code",[t._v("_save")]),t._v(" method).")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"updating-instances"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#updating-instances","aria-hidden":"true"}},[this._v("#")]),this._v(" Updating Instances")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("The same "),s("code",[this._v("_save")]),this._v(" method can be used on instances that are already in the\ndatabase. When you do this, the "),s("code",[this._v("updatedAt")]),this._v(" property will be adjusted:")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" someUser "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$lookup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'12345'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("someUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("updatedAt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// => moment object for some earlier time")]),t._v("\nsomeUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isAdmin "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" someUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_save")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("someUser"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("updateAt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// moment object for just now")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"first-or-new"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#first-or-new","aria-hidden":"true"}},[this._v("#")]),this._v(" First or New")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("The Model method "),s("code",[this._v("$getOrNew")]),this._v(" takes a simple query object only. If there is\na matching object, it will be returned. Otherwise, a new instance of the\nModel class will be created. In that case, it will not yet have an "),s("code",[this._v("_id")]),this._v("\nand will not yet be persisted to the database, and will need to be saved.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("$getOrNew")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" username"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"new_user"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_save")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"deleting-instances"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deleting-instances","aria-hidden":"true"}},[this._v("#")]),this._v(" Deleting Instances")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("To delete an instance from the database, call the "),s("code",[this._v("_delete()")]),this._v(" method.\nIt is important that you not save an item that you still have a reference\nto after you delete it.")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" User"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("get")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" username"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bad_user"')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" user"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_delete")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"model-comparison"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#model-comparison","aria-hidden":"true"}},[this._v("#")]),this._v(" Model Comparison")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("To determine if two model instances refer to the same database record,\nyou can use the "),s("code",[this._v("_is")]),this._v(" method (which compares their IDs):")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" isTheSame "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("userInstance1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_is")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("userInstance2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])}],!1,null,null,null);s.default=n.exports}}]);