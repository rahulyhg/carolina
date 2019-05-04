
# Setup

To get started, clone the starter repository:

```
git clone git@github.com:jfmario/carolina-starter.git item_list
cd item_list
```

The above command will clone the starter project into a new directory
called "item_list", and then change your working directory to it. 
You should run all the rest of the commands in this tutorial from that 
directory unless otherwise specified.

Remove the git history (you can `git init` later to set it up as your 
own repository):

```
rm -rf .git
```

Install dependencies from `package.json`:

```
npm i
```

Create a `.env` file with a randomly generated site secret:

```
node . generate-key
```

Run your website on a webserver using:

```
node . runserver
```

The above command will start the server at localhost over port 8080.
Visit the site at `http://localhost:8080/` and you should see a landing page.