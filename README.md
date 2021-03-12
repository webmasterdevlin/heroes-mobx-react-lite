# Mobx 6 Course

```sh
$ git clone https://github.com/webmasterdevlin/mobx-6-course.git
$ cd mobx-6-course
$ npm install
$ npm run start:fullstack
```

The React app, and the fake web service will run concurrently.

![screenshot](./screenshot-reactjs.png)


### Best practices in writing tests

https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

- always use eslint-plugin-testing-library and eslint-plugin-jest-dom
- always use screen
- use screen.getByRole instead of screen.getByTestId
- use screen.queryByRole only when expecting not.toBeInTheDocument
- use await screen.find* instead of await waitFor/wait
- if necessary, use await waitFor instead of await wait
- use userEvent instead of fireEvent
- don't use userEvent inside the callback of waitFor
