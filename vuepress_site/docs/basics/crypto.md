
# The Crypto Service

The Carolina framework uses the "crypto" Node module combined with your
Carolina secret for encrypting and decrypting values. For convenience, this
is all wrapped up into a very simple Carolina Service called the Crypto
Service for any time you want to encrypt a value and be able to decrypt it
later (as long as you are in the same environment, ie, having the same
CAROLINA_SECRET env variable).

You can get a reference to the Crypto Service from the Carolina global
object:

```javascript
let CryptoSvc = Carolina.$('Crypto');
```

## Site Secret

If you were following the instructions for starting a new project, you
probably already created a CAROLINA_SECRET environment variable using the
command `node . generate-key`. This is important. The CAROLINA_SECRET
environment variable is in the configuration as `app.secret`. This is used
for encryption and decryption.

## Using the Crypto Service

### Encryption

To encrypt a value:

```javascript
let message = "I love you.";
let encrypted = CryptoSvc.encryptText(message);
// do something with encrypted text
```

### Decryption

To decrypt a value that was encrypted that way:

```javascript
// get the encrypted text
let encryptedMessage = "..."; 
let decryptedMessage = CryptoSvc.decryptText(encryptedMessage);
// => "I love you."
```