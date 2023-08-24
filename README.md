# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Solution

This application uses cookies as an authentication method. The process is simple: once the user logs in with the correct credentials, the user will receive a token that will be store as a cookie and also will be use in order to make further API calls. To control access to the different routes, svelteKit provides a hook that allows incertep all requests. with this we need to check which routes are protected and once the token is present the user will be able to access those pages. when the user accesses the dashboards, some charts will be loaded using the flowchart (a lightweight library for rendering svgs charts) and the data provider by the endpoint. for the translations of the files a file was created with all the necessary translations and using the i18n regional settings it is possible to change the language.

## Running the project locally

1.  [back end] start the server `poetry run uvicorn app:app --host 0.0.0.0 --port 8025`

2.  [front end] Once the service already start, create an `.env` file in the root of the folder and add the following in the file:

`VITE_API_DEV_URL="http://0.0.0.0:8025"`

make sure that the url match the one that is expose when running uvicorn

## Project structure

- src
  - lib
    - components
      [here are located al the reusable componets avaliable for the app]
      - CardData.svelte
      - Navbar.svelte
      - Toasts.svelte
        ...
    - locale
      [contains the necesary files for translate the text in the app and also the logic to set/retrieve the language]
      - i18n.js
      - translations.js
        [all the transalations are store in this file]
  - routes
    [all the pages of the app are included in this folder]
  - store
    [contain the logic for all the reactive variables that we want to share across our componets]
  - hooks.server.js
    [in this file, is the logic that handle the auth. basically each time that the hook intercept a request, will check for the token store in the cookies, if theres any, the access to the dashboard will be granted otherwise the user will be redirected to the login page]

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
