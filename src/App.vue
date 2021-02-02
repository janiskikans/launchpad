<template>
  <div id="app">
    <header class="mt-4">
      <main-navbar />
    </header>

    <keep-alive include="UpcomingLaunches">
      <router-view />
    </keep-alive>

    <main-footer />
  </div>
</template>

<script>
import MainFooter from '@components/layout/MainFooter';
import MainNavbar from '@components/layout/MainNavbar';

export default {
  name: 'App',

  components: {
    MainFooter,
    MainNavbar,
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
