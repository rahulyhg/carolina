
# Working with Files

The Files Service of the framework manages access to files via three or more
drives, each managed by a type of driver. The driver may manage file access to
local files, or files on a Google Driver or Dropbox Account.

[[toc]]

## Configuration

The Files Service is configured by the file `config/files.js`. In this file,
you can specify your file drives. Think of drives a different file systems 
that you can access from your application. You can have as many
file drives you want,
but at least three must exist ('public', 'private', and 'temp'). Those are
used by the framework. The 'private' drive is
for files that should not be fully
public (such as user files), the 'public' drive is for files that should be
downloadable by the public. The 'temp' drive is for short-lived files that may
not need to survive application restarts. The 'public' and 'private' drives
can use any driver, but the 'temp' drive should use the `LocalFileDriver`.

Example configuration:

```javascript
  fileDrives: {
    temp: {
      driver: "LocalFileDriver",
      basepath: path.join(process.cwd(), ".tmp")
    },
    'public': {
      driver: "LocalFileDriver",
      basepath: path.join(process.cwd(), "public", "files"),
      isPublic: true,
      // this should match
      publicPrefix: "/files/"
    },
    'private': {
      driver: "LocalFileDriver",
      basepath: path.join(process.cwd(), "storage", "files")
    }
  }
```

The public drive is set to `public/files/` using the `LocalFileDriver`
by default. Its public prefix is the path that links to files should be
preceded by. The prefix '/files/' is used because the `public/` directory
is served to the public by the Http Service.

### Drivers

The Files Service manages the drives, which are each managed by a specific
File Driver, a class which controls access to files.

#### `LocalFileDriver`

The easiest driver to use is the `LocalFileDriver`, which simply manages access
to files on the local server. Configuring a driver that will use the 
`LocalFileDriver` requires the `basepath` property, which is the path on 
the local filesystem that will be used as the drive root.

Example:

```javascript
  'private': {
    driver: 'LocalFileDriver',
    basepath: path.join(process.cwd(), 'storage', 'files')
  }
```

This means that the private drive will be the local directory
`storage/files/`. That means that
saving the file "images/private_image.png" using the drive will create the
file `storage/files/images/private_image.png`.

If the drive is meant to be public, you can also set `isPublic` to `true`
and `publicPrefix` to a URL to the directory as is accessible via the internet:

```javascript
  'public': {
      driver: "LocalFileDriver",
      basepath: path.join(process.cwd(), "public", "files"),
      isPublic: true,
      // this should match
      publicPrefix: "/files/"
    },
```

#### `FtpFileDriver`

The `FtpFileDriver` allows using a remote FTP server as the file drive and 
it is configured this way:

```javascript
  'private': {
    driver: 'FtpFileDriver',
    ftpHost: 'localhost',
    ftpUser: 'ftpuser',
    ftpPass: 'ftppass',
    isSftp: false
  }
```

The `isSftp` property defaults to `false`. Use `true` to make an SFTP connection
using [promise-sftp](https://www.npmjs.com/package/promise-sftp). Otherwise,
the connection is made with
[promise-ftp](https://www.npmjs.com/package/promise-ftp).

#### `DropboxFileDriver`

Another driver options is the `DropboxFileDriver`, which uses the 
[dropbox](https://www.npmjs.com/package/dropbox) NPM module to communicate
with an existing Dropbox account. You will need to get an access token from
Dropbox in order to use it. Here is how it is configured:

```javascript
  'private': {
    driver: 'DropboxFileDriver',
    accessToken: 'YOUR_ACCESS_TOKEN'
  }
```

It is recommended that you store the access token in the `.env` file
(like `DROPBOX_TOKEN=abcdef`, and 
configure the drive this way:

```javascript
  'private': {
    driver: 'DropboxFileDriver',
    accessToken: process.env.DROPBOX_TOKEN
  }
```

## Interacting with Drives

Each instance of a driver is known as a driver, and is available from the 
`drives` property of the Files Service:

```javascript
let FilesSvc = Carolina.$('Files');
let TempDrive = FilesSvc.drivers.temp;
let PublicDrive = FilesSvc.drivers.public;
let PrivateDrive = FilesSvc.drives.private;
```

## File Access

### Getting Files

To check if a file exists in a drive:

```javascript
let exists = await PrivateDrive.exists('file.txt');  // => true
let exists2 = await PrivateDrive.exists('some_dir/file.txt'); // => true
```

To get the Buffer of a file's contents:

```javascript
let exists = await PrivateDrive.exists('file.txt');
if (exists) {
  // throws an error if file does not exist
  let fileData = await PrivateDrive.readFile('file.txt'); // => <Buffer ... >
  let fileString = fileData.toString(); // => "This is my file contents."
}
```

### Public File URLs

The "public" drive, and perhaps any additional drives that you configure,
should be configured with a `publicPrefix` (in the case of `FtpFileDriver`
and `LocalFileDriver`). This allows the drive to generate a link that you
can include in your application:

```javascript
let downloadLink = PublicDrive.getPublicUrl('file.txt'); // => '/files/file.txt'
```

## Storing Files

You can easily add a new file using a String or Buffer as its contents:

```javascript
await PrivateDrive.writeFile('new.txt', "Contents of new file.");
```

The `writeFile` method will throw a `FileExistsError` if the file already
exists. To write a file and overwrite in the event that it exists, use
the `overwriteFile` method:

```javascript
await PrivateDrive.overwriteFile('possibly_existing_file.txt', 'New content.');
```

### Append

The `appendToFile` method will add to an existing file. A `FileNotFoundError`
will be thrown if the file does not already exist:

```javascript
await PrivateDrive.appendToFile('file.txt', 'additional piece of data.');
```

### Handling File Uploads

Carolina automatically supports uploading files via `multipart/form-data` 
POST requests. Any files uploaded will be placed in your "temp" drive
with a random name
(Note that the temp drive MUST be a local directory).
Information about it will be available in the underlying
Express request:

For example, if a file form input had the name of `upload`, then info about the
uploaded file would be available like this:

```javascript
async handle(request, data) {
  
  let fileInfo = request._req.body['upload'];
  console.log(fileInfo.path) // => /path/to/temp/random_string.txt
  console.log(fileInfo.originalFilename) // => file.txt
}
```

You should then read the file and put it in another drive, as the temp
drive is meant for staging. 

## Deleting Files

You can use the `deleteFile` method of a Driver to remove a file from a drive.

```javascript
await PublicDrive.deleteFile('file.txt') // => true if existed and deleted, false if didn't exist or failed
```

## Listing Files 

You can use the `listFiles` method to list all the files in a drive,
or all the files below a certain directory level:

```javascript
let fullDriveList = await PrivateDrive.listFiles(); // => ['file.txt', 'some_dir/file.txt', ...]
let partialDriveList = await PrivateDrive.listFiles('some_dir/'); // => ['some_dir/file.txt', ...]
```

## Getting the Actual File

If you need to access the actual file in question, transfer it to a drive that
is implemented by an instance of `LocalFileDriver`. That driver, and only
that driver, has a `getFullPath` method, which will return the local path 
to the file.

```javascript
let fullPath = TempDrive.getFullPath('file.txt');
let contents = fs.readFileSync(fullPath);
```

## Custom File Drivers

You could write your own File Driver type to be interchangeable with any of the
existing drivers.

You can generate a new File Driver class using the CLI:

```
node . generate file-driver MyCustomFileDriver
```

That would create the new file
`site/files/file-drivers/my-custom-file-driver.js`.

The methods that must be implemented are defined and documented in the newly
generated file. Once those are complete, the new file driver must be 
exported by name from
`site/files/file-drivers/index.js`:

```javascript
/**
 * Custom file drivers.
 */
exports = module.exports = {
  MyCustomFileDriver: require('./my-custom-file-driver')
};
```
