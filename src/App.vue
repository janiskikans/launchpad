<template>
  <div id="app">
    <header class="text-gray-400 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
          <div id="nav">
            <router-link to="/" class="mr-5 hover:text-gray-500">Upcoming Launches</router-link>
            <router-link to="/under-the-hood" class="mr-5 hover:text-gray-500">Under the Hood</router-link>
          </div>
        </nav>

        <span
          class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0"
        >
          <span class="ml-3 text-2xl text-gray-200">Launchpad 🚀</span>
        </span>
        <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0"></div>
      </div>
    </header>

    <router-view />

    <main-footer />
  </div>
</template>

<script>
import MainFooter from '@components/layout/MainFooter';

export default {
  name: 'App',

  components: {
    MainFooter,
  },
};
</script>

<style lang="scss">
html,
body {
  @apply bg-gray-800;
}

.router-link-active {
  @apply text-gray-200;
}
</style>
