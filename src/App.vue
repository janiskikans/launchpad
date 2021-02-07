<template>
  <div id="app">
    <header class="mt-4">
      <main-navbar />
    </header>

    <keep-alive include="UpcomingLaunches">
      <XyzTransition xyz="fade duration-2" mode="out-in">
        <router-view />
      </XyzTransition>
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

  font-family: 'Open Sans', sans-serif;
}

#app {
  font-family: 'Open Sans', sans-serif;
}
</style>
