
# Pug Templates

The Carolina framework uses [Pug](https://www.npmjs.com/package/pug) for 
templates. Pug templates exist in the `templates/` directory of your project
and end with the `.pug` extension (this is important, as non-pug templates
also hang out in the `templates/` directory).

The `templates/carolina/` directory includes templates in use by the main
Carolina framework as well as some official plugins, so you should leave
these templates alone.

## Layouts & Inheritance

### Pug Layouts

One way to use pug templates is to define some templates to use as
layouts that will be extended by other templates. This is often called
*template inheritance*. You don't have to use template inheritance,
but it can be helpful to define general layouts and other, more 
specific templates that extend those layouts.

Here is an example of a template designed to be used as a layout:

```pug
doctype html
html
  head
   title My Carolina App - #{title}
  body
    block sidebar
      div This is the default sidebar.
    block content
      div This is the default content.
    
    p This is a footer paragraph for all pages.
```

The above template defines two "blocks", which inheriting templates can
override and fill in. The blocks even have some default content.
This is a perfectly valid template on its own, and could be use from
a Controller like this (assume template is
defined in `templates/layouts/my_layout.pug`):

```javascript
async handle(request, data={}) {
  return await this.pugTemplate('layouts/my_layout', { title: "Page Title" },
    request);
}
```

### Extending Layouts

You could extend the above layout with a child template, overriding the
provided blocks. Here as an example, assumed to be defined in 
`templates/my_child_template.pug`:

```pug
extends ./layouts/my_layout

block append sidebar
  p This is added to the existing sidebar.
block content
  p This overrides the existing content.
```

Here we fill in the blocks of the other layout. The "sidebar" has our own
specific content *appended* (added to) the existing default content and 
the "content" block is overriden completely with new content.

You can use this template the same way you used its parent, in a Controller
method:

```javascript
async handle(request, data={}) {
  return await this.pugTemplate('my_child_template', { title: "Page Title" },
    request);
}
```

## Pug Mixins

Pug allows the use of *mixins*, which are reusable components that can be
used multiple time with different parameters. 

An example mixin:

```pug
//- defining the mixin
mixin greeting(name)
  p Hello, #{name}

//- using the mixin
div
  +greeting('Jack')
  p Thank you for stopping by.
```

The above would result in the following HTML:

```html
<div>
  <p>Hello, Jack</p>
  <p>Thank you for stopping by.</p>
</div>
```

It is common to define mixins in separate files that only declare mixins
for ease of use. Mixins can even include a block. Here is an example, 
suppose it is defined in `templates/mixins/alert.pug`:

```pug
mixin alert(severity)
  div(class="alert alert-" + severity)
    block
```

This defines a component that takes a severity as an argument (which will
be added to the result div's class) and provides a block for content.
You could then use it in your main file like this:

```pug
extends ./layouts/my_layout

//- import the mixin
include ./mixins/alert

block append sidebar
  p This is added to the existing sidebar.
block content
  +alert('success')
    b Yay!
    |  This is great.
```

The above would result in the following HTML for the content block:

```html
<div class="alert alert-success">
  <b>Yay!</b> This is great.
</div>
```

## Data

Note the way to render a template from a Controller:

```javascript
async handle(request, data={}) {
  return await this.pugTemplate('template_name', { title: 'Title', foo: 'bar',
    txt: "A full sentence." }, request);
}
```

The async method `pugTemplate` takes an object as the second argument. This
data is provided and made available to the pug template (along with 
some other values automatically given to the template, more on this later).

For example, the above snippet passes a `title` and a `foo` property. These
values are accessible (either directly by name) or via the accessor `locals`:

```pug
div
  h1 My App - #{title}
  p The value of foo is #{locals.foo}.
  p= locals.txt
```

The above, if rendered with the earlier snippet, results in:

```html
<div>
  <h1>My App - Title</h1>
  <p>The value of foo is bar.</p>
  <p>A full sentence.</p>
</div>
```

**Literal HTML**

Suppose you want to generate some HTML on server. This can be a little risky,
and HTML is automatically escaped by pug.

Suppose you have a template like this:

```pug
p= literalHtml
```

And you render it like this:

```javascript
async handle(request, data={}) {
  return await this.pugTemplate('template_name', { literalHtml: "<b>Bold</b>"}, request);
}
```

The above would render this:

```html
<p>&lt;b&gt;Bold&lt;/b&gt;</p>
```

If you actually want the HTML to go in unescaped, change the template to look
like this:

```pug
p!= literalHtml
```

That change alters the output to this:

```html
<p><b>Bold</b></p>
```

::: warning
You may want to take steps to ensure that whatever value you are sending the
template is valid and safe HTML. Failure to do so may result it bugs or errors.
:::

## Pug Docs

For more details on the usage of pug templates, consult
the [Pugjs website](https://pugjs.org/api/getting-started.html). The sections
on conditionals and iteration can be very helpful.

## Included Mixins

The Carolina framework starter project
includes a few mixins in the `templates/carolina/` directory
that you can use in your
templates.

### CSRF Token

A CSRF token is often required for non-GET methods to many endpoints.
More information on how this works can be found in the section
on [CSRF Tokens](/docs/basics/csrf.md).

The file `templates/carolina/http/mixins.pug` includes two helpful mixins.
Both require that the request is passed in as the third argument to
the `pugTemplate()` Controller method used to render the template.

One mixin, `csrfToken` takes the request and renders a hidden form input
with the name "csrf_token" and a value of the actual token.

```pug
include /carolina/http/mixins

form(method="POST")
  +csrfToken(locals.request)
```

The output:

```html
<form method="POST">
  <input type="hidden" name="csrf_token" value="abcdef123" />
</form>
```

The value will be the actual CSRF token for the session. This form will
allow POST requests to pass CSRf protection.

If you wish to store the CSRT token in a meta tag, you can use the 
`csrfTokenMetaTag` mixin:

```pug
include /carolina/http/mixins
head
  +csrfTokenMetaTag(locals.request)
```

Output:

```html
<head>
  <meta name="csrf_token" content="abcdef123" />
</head>
```

### Flash Messages

You can also render flash messages using the `flashMessages` mixin defined
in `templates/carolina/session/mixins.pug`.

```pug
div
  +flashMessage(locals.request)
```

This will render any flash messages that are attached the session.
More information on flash messages can be found in the introduction to
[sessions](/docs/basics/session.md).

## Local Variables

The Controller method `pugTemplate` will add some values to the passed data
object before passing it to the template for rendering. You should avoid
using such keys in your object as they will be overriden:

* `config`: The application configuration, as exported by `config/index.js`.
* `filename`: The file name of the template being rendered.
* `basedir`: The path to the `templates/` directory.
* `cache`: A boolean set to `true`. This is helpful for pug.
* `request`: The [HttpRequest](/docs/basics/requests.md) object, if provided as the third argument to `pugTemplate`.