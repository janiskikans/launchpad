<template>
  <div class="text-gray-400 body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <div id="nav">
          <!-- <router-link to="/" tag="button" class="nav-button mr-2">
            Upcoming Launches
          </router-link>
          <router-link to="/under-the-hood" tag="button" class="nav-button">
            Under the Hood
          </router-link> -->
        </div>
      </nav>

      <span class="flex order-first navbar__title">
        <transition mode="out-in" name="fade-in">
          <span
            :key="title"
            class="ml-3 text-2xl text-gray-200 transform hover:opacity-90 duration-300 cursor-pointer whitespace-nowrap"
            @click="onTitleClick"
          >
            {{ title }} 🚀
          </span>
        </transition>
      </span>
      <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainNavbar',

  data() {
    return {
      title: 'Launchpad',
    };
  },

  computed: {
    /**
     * @return {string}
     */
    currentRouteName() {
      return this.$route.name;
    },
  },

  watch: {
    /**
     * @param {string} newName
     */
    currentRouteName(newName) {
      if (this.titleChangeTimeout) {
        clearTimeout(this.titleChangeTimeout);
      }

      this.title = newName;

      this.titleChangeTimeout = setTimeout(() => {
        this.setDefaultTitle();
      }, 3000);
    },
  },

  methods: {
    onTitleClick() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },

    setDefaultTitle() {
      this.title = 'Launchpad';
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  &__title {
    @apply lg:order-none lg:w-1/5 font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0;
  }
}

.fade-in-enter-active {
  transition: opacity 300ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.fade-in-leave-active {
  transition: opacity 225ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fade-in-enter,
.fade-in-leave-to {
  opacity: 0;
}

.nav-button {
  @apply md:text-lg rounded-lg py-1 md:py-2 px-2 md:px-4 hover:bg-gray-700 transition duration-200 ease-in-out select-none focus:outline-none;
}

.router-link-exact-active {
  @apply text-gray-200;
}
</style>
