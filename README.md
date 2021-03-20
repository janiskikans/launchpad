[![Netlify Status](https://api.netlify.com/api/v1/badges/8235cdd9-2637-408f-800c-d0f8ea5111b2/deploy-status)](https://app.netlify.com/sites/launchpadapp/deploys)
![Website](https://img.shields.io/website?down_color=red&down_message=down&up_color=green&up_message=up&url=https%3A%2F%2Flaunchpadapp.space)

# :rocket: Launchpad

A simple app for rocket launch and space enthusiasts. An easy way to look up upcoming launches and more at a glance.

Launchpad currently lives [here](https://www.launchpadapp.space).

## :hammer: Built with

- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [AnimXYZ](https://animxyz.com/)
- [Ionicons](https://ionicons.com/)
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

### Run SCSS linter

```
yarn lint:scss
```

## :crystal_ball: Things That Might Come in Handy

### Tailwind CSS style purging

When bulding for production unused CSS is removed via purging. Purge options can be found in _tailwind.config.js_ file under **purge** property. It might need to be adjusted accordingly when changing view file structure.

### Directory alias

As we're using Webpack there's an option to use alias for easier file referencing. Aliases are defined in _vue.config.js_ under **configureWebpack -> resolve -> alias**. Currently the following aliases are available:
| Alias | Directory |
|-------|-----------|
| **@api** | `./src/api` |
| **@assets** | `./src/assets` |
| **@components** | `./src/components` |
| **@views** | `./src/views` |
| **@structures** | `./src/structures` |
| **@services** | `./src/services` |
| **@helpers** | `./src/helpers` |
