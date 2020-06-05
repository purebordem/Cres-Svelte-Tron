# Cres-Svelte-Tron

This is a project template and build pipeline for [Crestron CH-5](https://sdkcon78221.crestron.com/sdk/Crestron_HTML5UI/Content/Topics/Home.htm) apps using the [Svelte](https://svelte.dev) framework, [Rollup](https://rollupjs.org/guide/en/), and [Eruda](https://github.com/liriliri/eruda). It lives at https://github.com/purebordem/Cres-Svelte-Tron.

# Table of Contents
* [Getting Started](#getting-started)
* [Deploying to a Touch Panel](#deploying-to-a-touch-panel)
* [NPM Scripts](#npm-scripts)
* [Node CH5-Run](#node-ch5-run)
* [Rollup Config](#rollup-config)
* [Known Issues](#known-issues)
---

## Getting started

If you do not already have it, install [Node.js](https://nodejs.org) and [Git](https://git-scm.com/)

* *Note - Cres-Svelte-Tron has only been tested with the latest LTS version*

Navigate to a location on your drive where you wish to install and clone this repository...
```bash
git clone https://github.com/purebordem/Cres-Svelte-Tron
```

Next, inside the cloned repository, install the required dependencies...
```bash
npm install
```

Verify the installation by first running...
```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see the test app running locally on your machine. Use `Ctrl+C` to end the dev session.


## Deploying to a Touch Panel
*Note - Only specific Crestron touch panels support HTML/JS/CSS based GUIs. The firmware must also be up to date.*

There are several ways to build and deploy to a Crestron touch panel. The easist to use the `ch5-dev` script. This will auto-build the app, package it using [@Crestron/ch5-utlities](https://www.npmjs.com/package/@crestron/ch5-utilities), and deploy it to a specified touch panel. This script will also provide live reloading, building, and deployment. The app will also be accessible on [localhost:5000](http://localhost:5000).

First, go to the `package.json` file and change the host name in the following scripts to your panel's IP address...

```bash
"ch5-runDev": "node ch5-run --host XXX.XXX.XXX.XXX --dev",
"ch5-build": "node ch5-run --host XXX.XXX.XXX.XXX",
```

Next run the script...
```bash
npm run ch5-dev
```

*Note - This may take some time. Crestron's CrComLib, which communicates with the AV processor, adds considerable build time. If strictly working on the GUI and not integration, it is recommended to comment out `import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js'` in the `src/App.svelte` file to speed up dev time*

## NPM Scripts
The following scripts are available by default...

### Build
This builds the app
```bash
npm run build
```

### Dev
This builds the app, in dev mode, with live reload, via [localhost:5000](http://localhost:5000)
```bash
npm run dev
```

### Start
This will deploy the app locally via [localhost:5000](http://localhost:5000) and your current IP address. Good for testing tablets, phones, etc.
```bash
npm run start
```

### CH5-Build
This builds the app, and deploys it to the touch panel at the specified in the `package.json`
```bash
npm run ch5-build
```

### CH5-Dev
This builds the app, in dev mode, with live reload, and deploys it to the touch panel at the specified in the `package.json`
```bash
npm run ch5-dev
```

## Node CH5-Run
This is direct usage of the `ch5-run.js` script used in other scripts. It provides a similar abstraction to the [CH5-Utilities-CLI](https://www.npmjs.com/package/@crestron/ch5-utilities-cli). Running directly will buil the app and attempt to archive or deploy the project for CH5.
```bash
node ch5-run
```

```bash
Available flags...
	--name (-n)
    		Default Value: 'ch5-svelte'
	--path (-p)
    		Default Value: 'public'
	--output (-o)
    		Default Value: 'CH5-Build'
  	--host (-h)
    		Default Value: undefined
	--sftp (-s)
   		Default Value: 'display'
	--type (-t)
    		Default Value: 'touchscreen'
	--dev (-d)
    		Default Value: false
```

Refer to [@Crestron/ch5-utlities](https://www.npmjs.com/package/@crestron/ch5-utilities) for possible values.

If a value is not provided for a flag, the default value will be used. In the case of `--host`, undefined will cause the script to only archive the app as a `.ch5z` file and not try to deploy the archive.

## Rollup Config
Cres-Svelte-Tron uses Rollup as the app bundler since it is the default used by the [Svelte Template](https://github.com/sveltejs/template). Changes made to `rollup.config.js` will alter how Rollup bundles the project. You can add support for other features such as PostCSS, SASS, and others here. The `production` variable is used to tell Rollup what to do for production builds vs. dev builds. Some useful Rollup plugins are included by default in Cres-Svelte-Tron.

### Limitations
The version of Chromium currently running on Crestron touch panels does not appear to support ES or CJS modules. This means Rollup must be set to use IIFE as an output format. Because of this format limitation, items such as dynamic imports and code splitting are not currently available.


## Known Issues
### Previous version of app sent to touch panel (always one revision behind)
Currently CH5-Utlities, responsible for creaing the `.ch5z` file, grabs the previously compiled files...despite the fact the files are overwritten (still figuring that one out...)
* Workaround - Rebuild the app again. If using live reload, edit a file and re-save.
