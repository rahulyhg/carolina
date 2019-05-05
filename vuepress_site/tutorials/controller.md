
# The Item Controller

Controller classes are the singleton objects that handle certain requests.
Let's generate one using the CLI:

```
node . generate controller ItemController
```

This will have created the file `site/http/controllers/item-controller.js`.

We can put multiple handler methods in a single Controller class. Let's 
add two methods below the `handle()` method:

```javascript
// already exists
async handle(request, data={}) {
  return this.sendText("Hello, world!");
}

async createItem(request, data={}) {
  return this.sendText("Create item");
}

async deleteItem(request, data={}) {
  return this.sendText("Delete item");
}
```

Edit `site/http/controllers/index.js` to export the controller:

```javascript
exports = module.exports = {
  HomeController: require('./home'),
  ItemController: require('./item-controller')
};
```

We will fill the handler
methods in later. For now, let's configure our routes to 
point to these controllers.

Add this to the bottom of `site/http/routes/browser.js`:

```javascript
exports = module.exports = [
  
  // other routes  
  
  {
    route: "/items",
    controller: 'ItemController',
    methods: ['GET']
  },
  {
    route: "/item",
    controller: 'ItemController',
    method: "createItem",
    methods: ['POST']
  },
  {
    route: "/items/delete/:itemId",
    controller: 'ItemController',
    method: 'deleteItem',
    methods: ["POST"]
  }
]
```

Note that the first one does not specify a `method` property. The `method`
property defines which method of the Controller class should be used as 
the handler method. It defaults to "handle", which is what we want for 
the first route.