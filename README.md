# :rocket: Launchpad

A simple app for rocket launch and space enthusiasts. An easy way to look up upcoming launches and more at a glance.

## :hammer: Built with

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Launch Library v2.0.0](https://thespacedevs.com/llapi) by [The Space Devs](https://thespacedevs.com/)

## :construction: Development Environment Set-up

Useful commands for working with local development environment.

### Run development server

```
yarn serve
```

### Build for production

```
yarn build
```

### Run linter

```
yarn lint
```

## :crystal_ball: Things That Might Come in Handy

### Tailwind CSS style purging

When bulding for production unused CSS is removed via purging. Purge options can be found in _tailwind.config.js_ file under **purge** property. It might need to be adjusted accordingly when changing view file structure.
