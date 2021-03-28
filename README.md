[![Netlify Status](https://api.netlify.com/api/v1/badges/816a1742-3bb8-4cb9-bfcf-ff841dd5d272/deploy-status)](https://app.netlify.com/sites/pedantic-liskov-c35b57/deploys)

# Mobx 6 Course

```sh
$ git clone https://github.com/webmasterdevlin/mobx-6-course.git
$ cd mobx-6-course
$ npm install
$ npm run start:fullstack
```

The React app, and the fake web service will run concurrently.

![screenshot](./screenshot.png)

### Best practices in writing tests

https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

- always use eslint-plugin-testing-library and eslint-plugin-jest-dom
- always use screen
- use screen.getByRole instead of screen.getByTestId
- use screen.queryByRole only when expecting not.toBeInTheDocument
- use await screen.find\* instead of await waitFor/wait
- if necessary, use await waitFor instead of await wait
- use userEvent instead of fireEvent
- avoid userEvent or fireEvent insides callbacks of waitFor as much as possible


### Cypress' best practices in writing tests

https://docs.cypress.io/guides/references/best-practices.html

### Application's styles

- The application is using test ID instead of role when querying dom elements
- Test IDs are simple and isolated
