
# Database Queries

The Base Model class contains static methods that assist in querying the 
database connection. 

You can get any properly registered Model class by name form the DB Service:

```javascript
let DBSvc = Carolina.$('DB');
let User = DBSvc._modelClass('User');
```

[[toc]]

## Basic Queries

### Getting All Records

To get ALL instances of User from the database:

```javascript
let allUsers = await User.$all();
// alternate
allUsers = await User.$query({});
```

You can get all results that match certain conditions by passing in a 
basic query object. The following query gets all admin Users that do NOT
yet have their e-mail addresses verified:

```javascript
let unverifiedAdmins = await User.$query({
  isAdmin: true,
  emailVerified: false
});
```

The results from these queries will be an array. It will be empty if there
are no matches.

### Getting One Record

The `$get` method of a Model returns only one instance, from the first 
match found to a query. Some database connection types may behave differently,
so you should generally use `$get` when you expect only 1 match anyways.

```javascript
// get the main admin user
let adminUser = await User.$get({ username: 'admin' });
// get a specific user by ID
let specificUser = await User.$get({ _id: '12345' });
```

If there are no matches to a query, the return value will be `null`. You
should always check for `null`.

If you have an ID for a specific instance, you can use the shorcut method
`$lookup(id)`:

```javascript
let specificUser = await User.$lookup('12345');
```

## Detailed Queries

When you pass in a query object that has certain properties, the behavior
changes. All these properties start with a double underscore, which should
not match any Schema fields:

* `__query`: The query object.
* `__constraints`: Additional contraints for doing comparisons.
* `__or`: Supply multiple query objects to be tested.

If you have `__query` as a property, that object is treated as the
query:

```javascript
let adminUsers = await User.$query({
  __query: { isAdmin: true }
});
```

### Comparisons

If you have `__constraints` as a property in the query object,
that object specifies 
additional query options for doing comparisons.

For example, to find all users that are admins but not the user named "admin":

```javascript
let additionalAdmins = await User.$query({
  __query: { 
    isAdmin: true
  },
  __constraints: {
    username: { not: 'admin' }
  }
});
```

The `__constraints` object is similar a basic query object (which checks
for matches), except that for each field you specify objects for 
comparisons. The above example will select users who do not have the 
username "admin" (but are admins, per the `__query` property).

The example above uses the `not` operator. Here is the list of options:

* `not`: Enforces that the field does match the given value.
* `gt`: Enforces that the numeric field is greater than the given value.
* `gte`: Enforces that the numberic field is greater than or equal to the given value.
* `lt`: Enforces that the numeric field is less than the given value.
* `lte`: Enforces that the numeric field is less than or equal to the given value.
* `contains`: Enforces that the sequence field contains the given value.

Example:

```javascript
let errorAndWarnLogs = await LogEntry.$query({
  __constraints: {
    level: { lt: 2 }
  }
});

let usersWithRole = await User.$query({
  __constraints: {
    roles: { contains: '1234' }
  }
});
```

### Or

The `__or` property, if provided, should be a list of query objects that 
could have passed as the whole query. It will be interpreted recursively,
so each object could have an `__or` property as well as `__query`
and `__constraints`.

To get any User with the username "admin" or with a verified e-mail address:

```javascript
let users = await User.$query({
  __or: [
    { username: 'admin' },
    { emailVerified: true }
  ]
});
```

## Pagination

The `$all` and `$query` methods each have an optional parameter called 
`options`. You can specify that you want to receive a specific "page" of the 
results:

```javascript
let usersPage2 = await User.$all({ pageNumber: 2 });
let adminUsersPage3 = await User.$query({ isAdmin: true }, {
  pageSize: 5,
  pageNumber: 3
});
```

Results will be limited to a page if `pageNumber` is supplied. If `pageSize`
is omitted, the default page size is 10.

## Conditional Update

The `$update` method takes a query object and an update object. The update 
is applied to all objects that match the query:

```javascript
// remove admin priveleges from all accounts without verified e-mail addresses (except the main admin acct)
await Users.$update(
  {
    __query: { isAdmin: true, emailVerified: false },
    __constraints: { username: { not: 'admin' } }
  },
  {
    isAdmin: false
  }
);
```

## Conditional Deletes

The Model class also has a static `$delete` method, which will delete all
objects in a collection that match the given query:

```javascript
// delete non-admin users
let deletedNonAdminUserCount = await User.$delete({ isAdmin: false });
// delete ALL users
let deletedUserCount = await User.$delete({});
```