# Cres-Svelte-Tron

This is a project template and build pipeline for [Crestron CH-5](https://sdkcon78221.crestron.com/sdk/Crestron_HTML5UI/Content/Topics/Home.htm) apps using the [Svelte](https://svelte.dev) framework and [Rollup](https://rollupjs.org/guide/en/). It lives at https://github.com/purebordem/Cres-Svelte-Tron.

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
