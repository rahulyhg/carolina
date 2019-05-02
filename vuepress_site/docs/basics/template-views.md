
# Template Views

## Returning a Pug Template

::: tip
For more details on writing the actual pug templates,
see the [Pug Templates](/frontend/pug-templates) docs.
:::

You should store pug templates in the `templates` directory of your project.

Here is an example:

```pug
doctype html
html
  body
    
    h1 Welcome, #{locals.name}!
```

Assuming that was saved as the file `templates/hello.pug`, you can render 
it with some data in your controller using the `PugTemplateView` view.

```js
async handle(request, data={}) {
  let PugTemplateView = Carolina.$("Views")._view("PugTemplateView");
  return await PugTemplateView.make({
    template: "hello",
    data: { 
      name: "John Marion"
    }
  }, request);
}
```

If you do that, the resulting HTML that will be sent to the browser will 
look like this:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Welcome, John Marion!</h1>
  </body>
</html>
```

Controllers also contain the helper method `pugTemplate()` that serves as a 
shortcut:

```js
async make(request, data={}) {
  return this.pugTemplate("hello", { name: "John" }, request);
}
```

## Data Available into Pug Templates

All the data values passed in to the template are available by the global
reference `locals` in your pug template. Additionally, the following values 
are also made available in `locals` (and they will override anything
that you supply):

* `basedir`: The full path to your `templates` directory.
* `cache`: The value "true". Specifies that the template will be cached.
* `config`: All the Carolina config values for your app (ie, `locals.config.app.name`).
* `filename`: The name of the template file.
* `request`: The `HttpRequest` object, if passed. Otherwise null.

::: danger
Be careful not to pass any of these value names in the data object you 
pass to your template or they will be overwritten.
:::