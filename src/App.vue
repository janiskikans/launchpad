<template>
  <div id="app">
    <header class="my-12">
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
import MainNavbar from '@components/layout/MainNavbar';

export default {
  name: 'App',

  components: {
    MainFooter: () => import('@components/layout/MainFooter'),
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
