# Trash Saver Frontend

Frontend project for Trash Saver Solution.

# Environment Variables

| NAME | DESCRIPTION    | EXAMPLE    |
| :---   | :--- | :---: |
| API_DATASOURCE_URI | Backend solutin address   | `localhost:8080`   |
| NEXTAUTH_URL | Auth url response callback for `next-auth`   | `http://localhost:3000`   |
| NEXTAUTH_SECRET | a secret for `next-auth` session   | `a secret value`   |
| GOOGLE_CLIENT_ID | Google credential client id, provided by google console. It should be generate by google service [here](https://developers.google.com/identity/protocols/oauth2)   | -   |
| GOOGLE_CLIENT_SECRET | Google credential client credential, provided by google console. It should be generate by google service [here](https://developers.google.com/identity/protocols/oauth2)    | -   |

## Next.js

This project uses the Next.js Framework, Material Ui library, React Js engine, and Atomic Design patterns

You can read more about Next [here](https://nextjs.org/)

We are not using externals state share management control. If you need to do some state share control, please use [React Context API](https://reactjs.org/docs/context.html).

### Structure

Following Next.js pattern, the pages could be found in `pages/` folder.

- All application components can be found in `src/components/` folder.
- The custom hooks should be placed in the `src/hooks/` folder
- The Material UI theme was placed in the `src/theme/index.ts` file. You read more about MUI Theme [here](https://mui.com/material-ui/customization/theming/)

## Next Auth

NextAuth.js is a complete open-source authentication solution for Next.js applications.

Read more about Next Auth library [here](https://next-auth.js.org/getting-started/introduction)

We are using it here for manage the users' account credentials and authentication.

## How to execute it?

First you need clone this project and run `yarn install` to install all project dependecies.
Next you can execute `yarn dev` and then access  `http://localhost:3000/` with appropriate env variables

> Make sure that you had created a `.env` file with your environmental variables
