
# Reference Fields

Sometimes Model instances will need to reference instances of other Models.
An example would be a blog comment, which might reference a specific blog post.
References can be defined using certain field types in Model Schemas:

* `Ref`: A reference to another object in a specific Model.
* `MultiRef`: A list of references to other objects in a specific Model.
* `GenericRef`: A reference to another object in any Model.
* `GenericMultiRef`: A list of references to other objects in any Model.

[[toc]]

## Defining References

References are defined in Schemas, and allow Model instances to reference 
other ones.

This example assumes a Comment Model is set up to reference a Post in the 
`post` property:

```javascript
let Comment = DBSvc._modelClass('Comment');
let someComment = await Comment.$lookup(commentId);
console.log(someComment.post) // => '12345' (a Post ID)
await someComment._populate(['post']);
console.log(someComment.post) // => Post{}
```

### `Ref`

Here is how the Schema for a Comment might look:

```javascript
class CommentSchema extends BaseSchema {
  constructor() {
    
    super();
    
    this.table = 'comment';
    
    this.fields.title = { type: 'String' };
    // other fields here
    
    // reference to a Post
    this.fields.post = { type: 'Ref', model: 'Post' };
  }
}
```

This specifies that the `post` property of a Comment object should contain the 
ID of an instance of the Post Model.

To assign a value to `comment.post`, you can use either the ID or the object 
itself (as long as the ID is for sure a String).

```javascript
// assign by ID
comment.post = '12345';

// assign by reference
let somePost = await Post.$lookup('12345');
comment.post = somePost;
await comment._save();
```

### `MultiRef`

A `MultiRef` field type is similar to `Ref` but contains an Array of 
references to objects of a certain Model class.

For example, suppose you wanted the Post class to include a `MultiRef` field 
referencing comments.

```javascript
class PostSchema extends BaseSchema {
  constructor() {
    
    super();
    
    this.table = 'post';
    
    this.fields.title = { type: 'String' };
    // other fields here
    
    // reference to a Post
    this.fields.comments = { type: 'MultiRef', model: 'Comment' };
  }
}
```

The `comments` property of a Post object would be an Array (by default an 
empty one). The Array can have IDs of Comments or saved Comment objects added 
to it.

```javascript
// add an ID
post.comments.push('1234');

// add a comment object
let comment = await Comment.$get({ title: "Some Title" });
post.comments.push(comment);

// save
await post._save();
```

## Querying References

In the Database, `Ref` fields are populated with the ID of the referenced 
object as a String and `MultiRef` fields are populated with an Array of the 
IDs of the referenced objects. You can query the field types accordingly:

```javascript
// get all Comments belonging to Post ID 1234
let comments = await Comment.$query({ post: '1234' });

// get the Post that contains a given Comment with ID 1234
let post = await Post.$get({
  __constraints: {
    comments: { contains: '1234' }
  }
});
```

## Populating

When you instantiate an object from the database, it's Reference fields will
contain IDs. If you want to populate the fields, you need to use 
the `_populate(fieldNames)` method of the Base Model class.

```javascript
console.log(user.roles); // => ['1234', '5678']

await user._populate(['roles']);
console.log(user.roles); // => [Role{id:'1234'},Role{id:'5678'}]
```

## Saving References

::: danger IMPORTANT
Please note that you MUST save the reference objects yourself. Calling the 
`_save()` method of a Post will not save changes you have made to referenced
Comments.
:::