
# Deleting Items

It's time to fill in the DELETE button for each item in the inventory.
We will create tiny forms with delete buttons for each row. Edit the 
iteration loop to look like this:

```pug
                each item in locals.items
                  tr
                    td= item.name
                    td= item.description
                    td
                      form(
                        action="/items/delete/" + item._id
                        method="POST"
                      )
                        
                        +csrfToken(locals.request)
                        
                        button.btn.btn-danger DELETE ITEM
```

If you start the server and visit the page, you will see red delete buttons.
If you click one, you will be taken to the page with the simple "Delete item"
text. It's time to define that handler's correct behavior.

In `site/http/controllers/item-controller.js`,
write the `deleteItem` method to look like this:

```javascript
async deleteItem(request, data={}) {
  
  // get the Item class
  const Item = Carolina.$('DB')._modelClass('Item');
  // get the specific item by id
  let item = await Item.$lookup(request.params.itemId);
  
  // check that the user actually owns the item
  if (item.user != request.user._id) {
    let res = this.redirect("/items");
    res.flash("Something went wrong.", "Uh-oh!", 'danger');
    return res;
  }
  else {
    
    await item._delete();
    
    let res = this.redirect("/items");
    res.flash("Item deleted.", null, 'primary');
    return res;
  }
}
```

Restart the server and visit the page and try to delete an item. You should 
be redirected and the item you deleted will be gone.

We're done.