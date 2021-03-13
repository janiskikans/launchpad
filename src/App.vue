<template>
  <div id="app">
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

    <div class="text-center my-4 text-white">
      <button @click="toggleTheme()">Toggle theme</button>
    </div>

    <main-footer />
  </div>
</template>

<script>
import MainNavbar from '@components/layout/MainNavbar';
import { getTheme, setTheme, DARK_THEME, LIGHT_THEME } from '@services/themeService';

export default {
  name: 'App',

  components: {
    MainFooter: () => import('@components/layout/MainFooter'),
    MainNavbar,
  },

  data() {
    return {
      theme: DARK_THEME,
    };
  },

  computed: {
    /**
     * @returns {boolean}
     */
    isDarkTheme() {
      return this.theme === DARK_THEME;
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

    toggleTheme() {
      if (this.isDarkTheme) {
        setTheme(LIGHT_THEME);
        this.theme = LIGHT_THEME;

        return;
      }

      setTheme(DARK_THEME);
      this.theme = DARK_THEME;
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
  @apply dark:bg-gray-800 bg-gray-100;
}

#app {
  font-family: 'Open Sans', sans-serif;
}
</style>
