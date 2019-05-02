(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{162:function(t,a,s){"use strict";s.r(a);var e=s(0),n=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"authentication-basics"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#authentication-basics","aria-hidden":"true"}},[t._v("#")]),t._v(" Authentication Basics")]),s("p",[t._v("The starter project comes with the official plugin\n'carolina/plugins/auth' (Carolina/Auth)\nalready installed and configured.\nIt provides some of the basics for providing authentication functionality to\nyour application. It provides basics routes and templates\nfor user login and registration as well as Middleware to allow you to\nguard routes for logged-in users only. For basic apps, you probably do not\nneed to alter the default settings.")]),s("p",[t._v("The starter project includes a basic User model, defined in\n"),s("code",[t._v("site/db/models/user.js")]),t._v(". You can add methods to it and fields to its schema,\nbut you should leave the existing fields alone and not make any additional\nfields required to allow it to interact with\nthe Carolina/Auth plugin.")]),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#the-carolina-auth-plugin"}},[t._v("The Carolina/Auth Plugin")]),s("ul",[s("li",[s("a",{attrs:{href:"#routes"}},[t._v("Routes")])]),s("li",[s("a",{attrs:{href:"#templates"}},[t._v("Templates")])]),s("li",[s("a",{attrs:{href:"#authentication-process"}},[t._v("Authentication Process")])]),s("li",[s("a",{attrs:{href:"#the-carolina-auth-extractusermiddleware-class"}},[t._v("The Carolina/Auth/ExtractUserMiddleware Class")])]),s("li",[s("a",{attrs:{href:"#the-carolina-auth-authguardmiddleware-class"}},[t._v("The Carolina/Auth/AuthGuardMiddleware Class")])])])]),s("li",[s("a",{attrs:{href:"#manual-authentication"}},[t._v("Manual Authentication")])]),s("li",[s("a",{attrs:{href:"#custom-guard-middleware"}},[t._v("Custom Guard Middleware")])]),s("li",[s("a",{attrs:{href:"#editing-the-user-model"}},[t._v("Editing the User Model")])]),s("li",[s("a",{attrs:{href:"#relevant-events"}},[t._v("Relevant Events")])])])]),s("p"),s("h2",{attrs:{id:"the-carolina-auth-plugin"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#the-carolina-auth-plugin","aria-hidden":"true"}},[t._v("#")]),t._v(" The "),s("code",[t._v("Carolina/Auth")]),t._v(" Plugin")]),s("p",[t._v("The "),s("code",[t._v("Carolina/Auth")]),t._v(" plugin (which is installed as 'carolina/plugins/auth')\ncomes with the starter project. It provides the Controller\n"),s("code",[t._v("Carolina/Auth/AuthController")]),t._v(" for handling requests to the authentication\nroutes and it uses the Service "),s("code",[t._v("Carolina/Auth")]),t._v(" to do much of the work.\nThe required Service is already configured in the "),s("code",[t._v("services")]),t._v(" property of\n"),s("code",[t._v("config/app.js")]),t._v(".")]),s("p",[t._v("If, for whatever reason, you do not have the plugin installed, here are the\nbasic steps to take:")]),s("ul",[s("li",[t._v("Add 'carolina/plugins/auth' to the "),s("code",[t._v("plugins")]),t._v(" property of "),s("code",[t._v("config/app.js")]),t._v(".")]),s("li",[t._v("Add the key 'Carolina/Auth' to the "),s("code",[t._v("services")]),t._v(" property of "),s("code",[t._v("config/app.js")]),t._v(" with the value 'carolina/plugins/auth/plugin/service'.")]),s("li",[t._v("Run the command CLI "),s("code",[t._v("node . import-plugin-resources -p carolina/plugins/auth -crt")]),t._v(". Note that this will "),s("strong",[t._v("overwrite")]),s("code",[t._v("config/carolina_auth.js")]),t._v(" if it exists. If you already have the file and keep its contents, do "),s("code",[t._v("-rt")]),t._v(" instead of "),s("code",[t._v("-crt")]),t._v(".")]),s("li",[t._v("Export the config file in "),s("code",[t._v("config/index.js")]),t._v(", like this: "),s("code",[t._v("carolina_auth: require('/carolina_auth'),")])]),s("li",[t._v("Change any desired settings in "),s("code",[t._v("config/carolina_auth.js")]),t._v(".")]),s("li",[t._v("Add "),s("code",[t._v("{ route: \"/auth\", subs: require('carolina/plugins/auth/router') }")]),t._v(" to "),s("code",[t._v("site/http/routes/browser.js")]),t._v(" to mount the authentication routes.")]),s("li",[t._v("Set the value of "),s("code",[t._v("mount")]),t._v(" in "),s("code",[t._v("config/carolina_auth.js")]),t._v(' to whatever the mount point is (if something other than "/auth").')])]),s("h3",{attrs:{id:"routes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#routes","aria-hidden":"true"}},[t._v("#")]),t._v(" Routes")]),s("p",[t._v("Assuming you chose "),s("code",[t._v("/auth")]),t._v(" as the mount point for the plugin router\n(which is the default configuration in the starter project), the login\nscreen is available at "),s("code",[t._v("/auth/login")]),t._v(" and the registration screen is available\nat "),s("code",[t._v("/auth/register")]),t._v(".")]),s("p",[t._v("If a user makes too many failed login attempts with the same username and from\nthe same IP address, that user will be throttled for a certain amount of time.\nThe configuration for this throttling is in "),s("code",[t._v("config/carolina_auth.js")]),t._v(".")]),s("h3",{attrs:{id:"templates"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#templates","aria-hidden":"true"}},[t._v("#")]),t._v(" Templates")]),s("p",[t._v("The templates used by the Carolina/Auth plugin are found in\n"),s("code",[t._v("templates/carolina/auth/")]),t._v(". You shouldn't alter them directly, but you\ncan copy them to another part of your "),s("code",[t._v("templates/")]),t._v(" directory and alter them.\nYou can then tell the plugin (by editing "),s("code",[t._v("config/carolina_auth.js")]),t._v(") to use\nthose other templates instead. If you do use other\ntemplates, you will need to ensure\nthat the form data POSTed would still be the same.")]),s("h3",{attrs:{id:"authentication-process"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#authentication-process","aria-hidden":"true"}},[t._v("#")]),t._v(" Authentication Process")]),s("p",[t._v("A user registers and logs in via the routes "),s("code",[t._v("/auth/register")]),t._v(" and "),s("code",[t._v("/auth/login")]),t._v(".\nOnce a user successfully logs in, they will be redirected to the value of\nthe "),s("code",[t._v("loginRedirect")]),t._v(" property of "),s("code",[t._v("config/carolina_auth.js")]),t._v(' (which defaults to\n"/home"). Also, the '),s("code",[t._v("_id")]),t._v(" of the User is added to the current session object.")]),s("h3",{attrs:{id:"the-carolina-auth-extractusermiddleware-class"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#the-carolina-auth-extractusermiddleware-class","aria-hidden":"true"}},[t._v("#")]),t._v(" The "),s("code",[t._v("Carolina/Auth/ExtractUserMiddleware")]),t._v(" Class")]),s("p",[t._v("The Middleware "),s("code",[t._v("Carolina/Auth/ExtractUserMiddleware")]),t._v(' is applied in the\nstarter project to all routes in the "browser" route group. It requires the\n'),s("code",[t._v("SessionMiddleware")]),t._v(" to be before it in order to work properly. This Middleware\nwill check the session of all incoming requests for a valid user id. If one\nis found, the "),s("code",[t._v("User")]),t._v(" object corresponding to the logged-in user will be\npopulated as "),s("code",[t._v("request.user")]),t._v(" and therefore\navailable to later Middleware and the\nController.")]),s("p",[t._v("Example (in a Controller):")]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// user is logged in")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("username"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// => "user123"')]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// no user is logged in")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h3",{attrs:{id:"the-carolina-auth-authguardmiddleware-class"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#the-carolina-auth-authguardmiddleware-class","aria-hidden":"true"}},[t._v("#")]),t._v(" The "),s("code",[t._v("Carolina/Auth/AuthGuardMiddleware")]),t._v(" Class")]),s("p",[t._v("The Carolina/Auth plugin also provides the "),s("code",[t._v("Carolina/Auth/AuthGuardMiddleware")]),t._v("\nclass to reserve some routes for logged-in users only. A good way to use it\nis to define a Controller with a group of related handler methods for routes\nthat should only be accessed by authenticated users.")]),s("p",[t._v("The Middleware will check to see if "),s("code",[t._v("request.user")]),t._v(" is populated, only allowing\nrequests to proceed if it is. Otherwise, the user is redirected to the value\nof the "),s("code",[t._v("unauthorizedRedirect")]),t._v(" property in "),s("code",[t._v("config/carolina_auth.js")]),t._v(" (which\ndefaults to '/auth/login').")]),s("p",[t._v("Example Controller:")]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyCustomController")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BaseController")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("constructor")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getMiddleware")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Carolina/Auth/AuthGuardMiddleware'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("requeset"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// provide a response")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// more handler methods")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("h2",{attrs:{id:"manual-authentication"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#manual-authentication","aria-hidden":"true"}},[t._v("#")]),t._v(" Manual Authentication")]),s("p",[t._v("If you don't want to use the built-in routes or want to also authenticate\nusers elsewhere in the application, you can use some methods associated of\nthe Carolina/Auth Service.")]),s("p",[t._v("You can get a reference to the Service from the Carolina global object.")]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" AuthSvc "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Carolina"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("$")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Carolina/Auth'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[s("strong",[t._v("User Registration")])]),s("p",[t._v("You can register a user (creating a new User object) using the "),s("code",[t._v("register")]),t._v("\nmethod.")]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" registrationSuccess "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" AuthSvc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("register")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'username'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'user@example.com'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'password123'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("registrationSuccess"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("success"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// user has already been created and saved")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" registrationSuccess"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("registrationSuccess"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("message"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// string explaining why registration failed")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("strong",[t._v("User Login")])]),s("p",[t._v("You can attempt to login a user using the "),s("code",[t._v("login")]),t._v(" method.")]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// first argument can be either username or e-mail address")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// treated as an e-mail address if "@" is present')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" user "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" AuthSvc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("login")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'username'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'password123'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// credentials matched")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// you must manually add user_id to the session to save the login")]),t._v("\n  response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setSessionValue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'user_id'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// authentication failed")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("strong",[t._v("User Logout")])]),s("p",[t._v("To log a user out, simply nullify the "),s("code",[t._v("user_id")]),t._v(" property of the current\nSession.")]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setSessionValue")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'user_id'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[s("strong",[t._v("Password Reset")])]),s("p",[t._v("To manually reset a user's password and have a Reset Password E-Mail sent to\nthem, use the "),s("code",[t._v("forgotPasswordEmail")]),t._v(" method and pass in the user's email\naddress.")]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" AuthSvc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("forgotPasswordEmail")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'username@example.com'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"custom-guard-middleware"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#custom-guard-middleware","aria-hidden":"true"}},[t._v("#")]),t._v(" Custom Guard Middleware")]),s("p",[t._v('You can write your own guard Middleware to do more precise protection of\ncertain routes. Here is an example that limits access to user\'s with a username\nthat begins with "a".')]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("LetterAGuardMiddleware")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BaseMiddleware")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("before")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" response "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HttpResponse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirect")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Carolina"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'carolina_auth.unauthorizedRedirect'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("flash")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"You must be logged in as an admin account to view that page."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Login Required.'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'warning'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      \n      request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("response "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("shouldContinue "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("username"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'a'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" response "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HttpResponse")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("redirect")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Carolina"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("config")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'carolina_auth.unauthorizedRedirect'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("flash")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"You do not have access to this page."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Login Required.'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'warning'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      \n      request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("response "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" response"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("shouldContinue "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" request"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v('All requests with non-authenticated users or with users without usernames\nbeginning with the lowercase letter "a" will be redirected to the value of\nthe '),s("code",[t._v("unauthorizedRedirect")]),t._v(" property of "),s("code",[t._v("config/carolina_auth.js")]),t._v(" with a\nflash message provided.")]),s("h2",{attrs:{id:"editing-the-user-model"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#editing-the-user-model","aria-hidden":"true"}},[t._v("#")]),t._v(" Editing the User Model")]),s("p",[t._v("Outside of the following restrictions, you can alter the User model\n(defined in "),s("code",[t._v("site/db/models/user.js")]),t._v(") to suit your needs:")]),s("ul",[s("li",[t._v("Leave the existing fields ("),s("code",[t._v("username")]),t._v(", "),s("code",[t._v("password")]),t._v(", "),s("code",[t._v("salt")]),t._v(", "),s("code",[t._v("forgotPasswordToken")]),t._v(", and "),s("code",[t._v("isAdmin")]),t._v(") in place.")]),s("li",[t._v("Do not make ANY field other than "),s("code",[t._v("username")]),t._v(" a required field.")]),s("li",[t._v("Do not override or alter existing methods of the User class.")])]),s("h2",{attrs:{id:"relevant-events"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#relevant-events","aria-hidden":"true"}},[t._v("#")]),t._v(" Relevant Events")]),s("p",[t._v("There are several Event classes constructed and thrown by the Carolina/Auth\nplugin. You can listen for them using Listeners. The events that such\nListeners will receive are documented below.")]),s("p",[t._v('Note that log messages are already generated for all of these as well,\nso you should not need to use these events for logging purposes. Just configure\na logger to listen for log messages with a source of "Auth".')]),s("ul",[s("li",[s("code",[t._v("Carolina/Auth/LoginEvent")])])]),s("p",[t._v("Thrown whenever a user "),s("em",[t._v("successfully")]),t._v(" logs in. Attached to the event is the\n"),s("code",[t._v("user")]),t._v(" property, the User object of the newly logged-in user.")]),s("p",[t._v("Usage (in a Listener class):")]),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("handle")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("event")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("event"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("username"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("ul",[s("li",[s("code",[t._v("Carolina/Auth/LoginFailureEvent")])])]),s("p",[t._v("Thrown whenever a user login attempt fails. Attached to the event is the\n"),s("code",[t._v("identifier")]),t._v(" property, the username or e-mail address associated with the\nfailed attempt.")]),s("ul",[s("li",[s("code",[t._v("Carolina/Auth/RegistrationEvent")])])]),s("p",[t._v("Thrown whenever a new user is registered by the "),s("code",[t._v("register()")]),t._v(" method of\nthe Carolina/Auth Service (whether manually or in a built-in route).\nAttached to the event is the "),s("code",[t._v("user")]),t._v(" property, the User object of the newly\nregistered user.")])])}],!1,null,null,null);a.default=n.exports}}]);