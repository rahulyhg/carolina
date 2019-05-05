
# Displaying Tasks

Now it's time to show the user's items on the main inventory page. 

The second argument to the `pugTemplate()` method of the Base Controller class 
is an object of extra data to be made available to the pug template engine.
The goal now is to have the main `handle()` method of the `ItemsController` 
class get a query of all Items in the database that belong to the current 
user, and then provide the results to the template.

Edit the `handle` method to look this this:

```javascript
async handle(request, data={}) {
  
  // get the Item class
  const Item = Carolina.$('DB')._modelClass('Item');
  // query for items
  let items = await Item.$query({ user: request.user._id });
  
  // provide items to the template engine
  return this.pugTemplate("items", { items, title: "Inventory" }, request);
}
```

Note that the query is based on the ID of the current User. The `user` field of 
the Item class was defined to be a "Ref" field, so the ID is what is actually 
stored and is queryable in the database.

The next step is to edit the template to display the data. Replace the 
"TODO" paragraph with the following templating:

```pug
        // add list here
        br
        br
        
        div.card
          h5.card-header Items
          .card-body
            table.table
            
              thead
                th Item
                th Description
                th Delete
              
              tbody
                each item in locals.items
                  tr
                    td= item.name
                    td= item.description
                    td DELETE BUTTON (TODO)
```

This template iterates over all the items passed to the template engine 
and displays them in a table. 

Start the server and visit `http://localhost:8080/items` and you will see 
the Items table below the New Item form. Try adding a few items with the 
form and you should see them appear in the table.