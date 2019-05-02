
# CSRF Tokens 

Because of the possiblity of cross-site request forgery, a protection called 
CSRF tokens are very common.

For all routes that include the built-in middleware "CsrfMiddleware", every 
user session is assigned a CSRF token which is stored in the session.
That token is used to verify any POST, PUT, PATCH, or DELETE request.

The middleware looks for a correct token as the value 
`csrf_token`
as part of `request.data` (derived from the form-data or JSON), or as the value 
of the header `X-CSRF-TOKEN` or `X-XSRF-TOKEN`.
If the correct token is in any of those values, the request will be allowed
to proceed, otherwise it will be rejected.

## Forms

You can include a hidden input containing the correct CSRF token in your pug
template using a mixin:

```pug
include carolina/http/mixins

form(method="POST")
  +csrfToken(local.request)
```

Note that the incoming Request object is always available when 
rendering views using `PugTemplateView` as `locals.request`.
In any case where you need the CSRF token in a template but don't want to 
insert the hidden input, you can access the session CSRF token as 
`locals.request.session.csrf_token`.

## Javascript

If you wish to make AJAX calls that submit POST, PUT, PATCH, or DELETE 
requests, you have a few options. You could make the endpoint be part of a 
route group that does not use the CSRF middleware.

The other option is to put the CSRF token in the
header `X-CSRF-TOKEN` or `X-XSRF-TOKEN`.

If you are using the Carolina frontend system (which is similar to the backend
system), you can use the Http service to make requests. The frontend Http 
service will look for the CSRF token in the cookie if it exists and
automatically place its value in the `X-CSRF-TOKEN` for all requests.

```js
Carolina.$("Http").then((Http) => {
  let response = await Http.post("/some/endpoint", data);
})
```

In order for this to work, `csrf_token` must be present in the 
`http.unencrypted_cookies` value.

For more on the Carolina frontend system, see the
[frontend docs](/frontend/frontend).

## Excluding Routes from CSRF

To exclude routes from CSRF protection, put them in a route group that doesn't
make use of the `CSRFMiddleware` class.

## The `csrf_token` Cookie

The CSRF token is stored in the cookie as `csrf_token`. If you leave the value
of `unencrypted_cookies` in `config/http.js` alone, it will be the 
unencrypted CSRF token.