
# Creating Item

It's time to create an actual Item when the user submits a POST request to 
"/item" and form validation succeeds. First, there are a few things 
worth covering. Take a look at the configuration for the Http Service, which 
is found in the file `config/http.js`.

In the property `middleware_groups`, the browser group contains a list of 
middleware including "Carolina/Auth/ExtractUserMiddleware". This Middleware 
class is provided by the Carolina Auth plugin and it automatically checks 
incoming requests for session cookies that contain logged-in users. If 
a user is logged in, the corresponding instance of the User model is attached 
to the incoming Request object as `request.user`. We will take advantage of this
now.

Let's edit the if statement block that executes when validation succeeds in 
the `createItem` method of `ItemController` in 
`site/http/controllers/item-controller.js`:

```javascript
if (val.success) {
  // get the Item class from the DB Service
  const DBSvc = Carolina.$('DB');
  const Item = DBSvc._modelClass('Item');
  
  // create a new Item class instance
  let item = new Item({ name: request.data.item });
  item.description = request.data.description;
  // set the user to the user on the request
  item.user = request.user;
  
  // save the item to the database
  await item._save();
  
  // redirect the user back to /items with a success message
  let res = this.redirect("/items");
  res.flash("New item created.", "Great!", 'success');
  return res;
}
```

A few things are happening here. First, we get a reference to the DB Service 
from the Carolina object. Then we get a reference to the Item class from the 
DB Service. These steps could be combined to one line:
`Carolina.$('DB')._modelClass('Item');`.

Then an instance of the Item class is created with the item name provided
in the form. Then the description is set from the form data and the user is
set from the request user. The object is than saved as a new record in the 
database. The user is then redirected with a success message.

Run the server and go to `http://localhost:8080/items` and fill out the form.
You should be redirected back with a success message. Currently, the newly
created item is not being displayed anywhere. Stop the server 
(which triggers the `JsonConnection` database to write its data to files)
and check the file `data/main/item.json`. You should see the database info 
of the newly saved object.