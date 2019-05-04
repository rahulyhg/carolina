
# Templates

Templates are stored in the `templates/` directory as we saw earlier.
With templates, it's common to define base layouts and have other 
template files extend them. The framework contains a base layout that is used 
for the landing page. It is located in
`templates/carolina/base/boostrap_base.pug`. Let's look at it.

If you are familiar with pug, you will note that this base template accepts
a title and also provides a "body" block that extending templates can use.
It also provides Bootstrap CSS. For more information on how to write HTML
for Bootstrap, consult the 
[Bootstrap CSS documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/).

Create the file `templates/items.pug` and make a form for submitting new 
items for the inventory:

```pug
extends carolina/base/bootstrap_base

include carolina/http/mixins
include carolina/session/mixins

block body

  br
  
  div.container
    div.row
      div.col-md-8.mx-auto
        
        +flashMessages(locals.request)
        
        div.card
          h5.card-header Add Item
          .card-body
            form(action="/item" method="POST")
              
              +csrfToken(locals.request)
            
              .row
                .col-md-3.text-right
                  label Item Name
                .col-md-8.ml-auto
                  input.form-control(type="text" name="item")
              
              br
              
              .row
                .col-md-3.text-right
                  label Description
                .col-md-8.ml-auto
                  textarea.form-control(rows="3" name="description")
                  
              br
              
              .row
                .col-md-8.ml-auto
                  button.btn.btn-primary(type="submit") Create
        
        // add list here
        p TODO: List of items
```

All of the HTML we defined here will be inserted into the "body" block of the 
base template we looked at earlier. The line `+flashMessage(locals.request)`
uses a mixin defined in `templates/carolina/session/mixins` that will display
flash messages from the server. Flash messages will be covered in a later
section. The `+csrfToken(locals.request)` uses a mixin defined in 
`templates/carolina/http/mixins` that inserts the CSRF token, which is 
required by default for the included Middleware to accept form POST requests.
For more information on CSRF tokens, consult the documentation on
[CSRF Tokens](../docs/basics/csrf.md).

We can now edit the `handle` method of `ItemController` to render this template:

```javascript
async handle(request, data={}) {
  return this.pugTemplate("items", { title: "Inventory" }, request);
}
```

If you run the server again and visit `http://localhost:8080/items`, you 
should see the page we just wrote rendered. Next we will need to handle
the POST requests that our form submits.