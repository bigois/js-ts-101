# js-ts-101

This repository collects practical examples created while studying JavaScript, TypeScript, HTML, CSS, React, and Express. It is a living learning reference: each folder explores one concept or small project and can evolve independently over time.

## Purpose

Serve as a personal study repository for revisiting web-development fundamentals and experimenting with new topics. It is not a single application or a monorepo with one shared build process.

## Stack

- HTML and CSS
- JavaScript
- TypeScript
- Node.js
- React and Vite, in the React examples
- Express, MongoDB, and Mongoose in the `express` API example

## Structure

The examples are organized by topic at the repository root:

- **JavaScript fundamentals** — `async`, `classes`, `destructure`, `maps`, `promise`, `spreadAndRest`, and similar folders
- **Browser and DOM** — `dom`, `classList`, `querySelector`, `conditionalRender`, and `template`
- **CSS and layout** — `box-model`, `flex`, `grid`, `mediaQuery`, `px2Rem`, and related examples
- **React** — `reactEssentials`, `reactFetch`, `reactLocation`, `reactNavigation`, `toDoList`, and `useRefAndEffect`
- **TypeScript** — `ts101`
- **Backend** — `express`, a books API with Express and MongoDB

Each folder is self-contained. Some examples are static files that can be opened in a browser, while projects with a `package.json` require their own dependency installation.

## Running locally

For an example with a `package.json`, enter its folder and install its dependencies:

```bash
cd reactEssentials
npm install
npm run dev
```

The available scripts vary by example. Check the corresponding `package.json` before running it.

For the Express API:

```bash
cd express
npm install
npm run dev
```

## License

This project is licensed under the [MIT License](LICENSE).
