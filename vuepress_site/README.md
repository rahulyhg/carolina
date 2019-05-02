
# Installation

Carolina is a web framework for Node.js.

## Prerequisites #

Carolina requires Node 10+.

## Get Started #

Clone the starter repository.

```
git clone https://github.com/jfmario/carolina-starter.git
cd carolina-starter
npm i
```

## Setup #

### Environment and Config Files #

You should copy the file `example.env` to `.env` and alter the variables if
desired.

Look at the files in the `config/` directory. This is where Carolina
and various application services go to 
get configuration. You can further define arbitrary config files, but they 
must be exposed by `config/index.js`.

### Create Secret Key #

In order to do anything, you must have a `CAROLINA_SECRET` environment 
variable defined. To create one, run the following command:

```
node . generate-key
```

This will add the `CAROLINA_SECRET` environment variable to `.env`, 
creating the file if it does not exist.