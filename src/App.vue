<template>
  <div id="app">
    <snackbar class="z-10" />
    <user-bar v-if="showUserBar">Test</user-bar>
    <theme-toggler :current-theme="theme" class="absolute top-4 right-4 hidden lg:block" @change-theme="changeTheme" />

    <header class="my-6 md:my-8 lg:my-12">
      <main-navbar />
    </header>

    <main>
      <keep-alive include="UpcomingLaunches">
        <XyzTransition xyz="fade duration-2" mode="out-in">
          <router-view />
        </XyzTransition>
      </keep-alive>
    </main>

    <main-footer class="mb-6" />

    <div class="flex justify-center mb-6 lg:hidden">
      <theme-toggler :current-theme="theme" class="relative" @change-theme="changeTheme" />
    </div>
  </div>
</template>

<script>
import MainNavbar from '@components/layout/MainNavbar';
import ThemeToggler from '@components/ui/ThemeToggler';
import { getTheme, DARK_THEME } from '@services/themeService';
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    MainFooter: () => import('@components/layout/MainFooter'),
    MainNavbar,
    ThemeToggler,
    UserBar: () => import('@components/ui/UserBar'),
    Snackbar: () => import('@/components/ui/Snackbar'),
  },

  data() {
    return {
      theme: DARK_THEME,
    };
  },

  computed: {
    ...mapState({
      /** @type {boolean} */
      isAuthorized: state => state.auth.isAuthorized,
      /** @type {User|null} */
      currentUser: state => state.auth.currentUser,
    }),

    /**
     * @return {boolean}
     */
    showUserBar() {
      return this.isAuthorized && this.currentUser;
    },
  },

  watch: {
    /**
     * Toggle app theme
     * @param {string} newTheme
     */
    theme(newTheme) {
      if (newTheme === DARK_THEME) {
        this.setDarkTheme();
      } else {
        this.setLightTheme();
      }
    },
  },

  created() {
    this.initializeTheme();
  },

  methods: {
    initializeTheme() {
      this.setDarkTheme();

      const savedTheme = getTheme();
      if (!savedTheme) {
        this.theme = DARK_THEME;
        this.setDarkTheme();
      }

      this.theme = savedTheme;
    },

    /**
     * @param {string} newTheme
     */
    changeTheme(newTheme) {
      this.theme = newTheme;
    },

    setDarkTheme() {
      document.documentElement.classList.add('dark');
    },

    setLightTheme() {
      document.documentElement.classList.remove('dark');
    },
  },
};
</script>

<style lang="scss">
html,
body {
  font-family: 'Open Sans', sans-serif;
}

body {
  @apply dark:from-gray-800 dark:to-gray-800 bg-gradient-to-b from-green-400 to-blue-500;
}

#app {
  font-family: 'Open Sans', sans-serif;
}
</style>
