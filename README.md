# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Running the poject locally

1.  [back end] start the server poetry run uvicorn app:app --host 0.0.0.0 --port 8025

2.  [front end] Once the service already start, create an .env file in the root of the folder and add the following in the file:

VITE_API_DEV_URL="http://0.0.0.0:8025"

make sure that the url match the one that is expose when running uvicorn

3. [front end] make sure to install all the depencies runnig npm install

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
