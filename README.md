# react-template
A Basic React template repository (You need to upgrade the packages)


## Setup the template for your project

### 0. Pre-requisits

Please make sure you have created the subdomain, the database, the user to access the database and the user to access to the ftp on [Hostinger](https://hpanel.hostinger.com/hosting/magicdidac.com) before you continue with the next steps.

Add the `.htaccess` file into the folder on your server to allow refresh page on your project.

### 1. Update all

Use `ncu` to update all the package on `./web` `./graphql` `./cdk`

> **Note:** It is recommended that you do not update the `mysql2` package version in `./graphql` because it does not work correctly.

### 2. Setup your project

#### ./web

- On `package.json` change the properties `name` and `homepage`.
- On `./src/Components/Header.tsx` change `[projectName]` to your project's name.
- On `./public/index.html` change `{Website Description}` and `{Web site Title}`
- On `./public/manifest.json` change `{Web site title}`
- Change the images `favicon.ico`, `logo192.png` and `logo512.png`. There is a `logo.psd` file to facilitate this task.
- You can change the primary color on `./src/theme.ts`.

> **Note:** For the `favicon.ico` image we recommend that it be 256x256 and that you use the [convertio](https://convertio.co/es/png-ico/) web page to convert the `.png` file to `.ico`.

#### ./graphql

- Notice that you have an example to make a simple query, remove it before deploy.
- It is recommended to create a `.env` file in the root with the following structure so that you can more easily run the graphql api locally.
```
DB_IP="..."
DB="..."
DB_PASSWORD="..."
```

This file is included in the `.gitignore` file so don't worry about putting the password in `.env`, this file will not be uploaded to github.


#### ./cdk

- On `./package.json` change `{projectName}` to your project name. Notice that name is the stack name so, remember it!
- On `./bin/cdk.ts` change `{projectName}` to your project name (same as before).
- On `./lib/GQLStack.ts` change `{projectName}` to your project name or whatever you want for your RestApi on AWS.

### 3. Put secrets on github

Let's put all the secrets that you need to deploy all the application.

- `AWS_ACCESS`
- `AWS_SECRET`
- `DB` the data base name (must be the same as the db user)
- `DB_IP`
- `DB_PASSWORD`
- `FTP_ACCOUNT`
- `FTP_PASSWORD`

### 4. Your first deploy

We know that you doesn't have anythink that you want to upload right now but make that first deploy to know if something goes wrong.

The deployment will be done automatically when you push a commit to the `main` branch. Do the push and wait for it to generate everything. If everything is fine there should be no problem and your web page should already be visible in the path of your subdomain. If not, good luck!

### 5. Set your api endpoint

Now that you have done the deployment, if you go into the `API Deploy` action you will see that in the `Deploy API` step at the end you have the AWS endpoint for your API Rest. Copy it and put it in the `./web/.env` file so that your website can make calls to your API.

### 6. Finish it!

Make another push to make sure your API endpoint is uploaded into your web page.

## README.md

Please take a look to all the `README.md` files (`./web`, `./graphql` and `./cdk`) and change whatever you want to adjust them to your project.

Also at the end of that file you have a very first `README.md` so please feel free to remove all the stuff before and complement that `README.md` to fit it into your project.

## TIPS

- Make sure to upgrade your `./web/package.json` version when you want to merge into the `main` branch.
- Notice that the actions only work if any file is modified on the especified folders. If you change something on the `./graphql` folder only the `API Deploy` action will be work.

--- Delete all before when you finished the setup ---

# Future House

This is a project to be able to order, value and put notes to houses that we look at different websites together with my girlfriend. So we can evaluate and decide which one suits us and our future.

## Contents

- [React Web page](./web/)
- [Grapgql API](./graphql/)
- [CDK](./cdk/)

## Scripts

| Command            | Description                                   |
|--------------------|-----------------------------------------------|
| `yarn install:web` | Installs all the web dependencies             |
| `yarn install:api` | Installs all the cdk and graphql dependencies |
| `yarn build:web`   | Builds the web with `tsc`                     |
| `yarn deploy:api`  | Deploys the API Rest using cdk                |
| `yarn start`       | Runs the web locally                          |
| `yarn start:api`   | Runs the API locally                          |