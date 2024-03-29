<template>
  <div class="dark:text-gray-400 text-gray-100 body-font">
    <div class="container mx-auto flex flex-col md:flex-row justify-around items-center">
      <div
        :key="title"
        class="hover:opacity-90 duration-300 cursor-pointer whitespace-nowrap flex order-first navbar__title"
        @click="onTitleClick"
      >
        <img src="@assets/images/icons/launchpad_new.svg" width="26" height="26" alt="launchpad icon" class="mr-1.5" />
        Launchpad
      </div>

      <nav class="flex flex-wrap flex-col items-center text-base">
        <div v-if="showNavButtons" id="nav" class="flex flex-col sm:flex-row">
          <router-link to="/" tag="button" class="nav-button mr-2" exact>
            Upcoming Launches
          </router-link>
          <router-link to="/past" tag="button" class="nav-button mr-2" exact>
            Past Launches
          </router-link>
          <router-link to="/about" tag="button" class="nav-button">
            About
          </router-link>
          <router-link v-if="isAuthorized" to="/dashboard" tag="button" class="nav-button mr-2">
            Dashboard
            <ion-icon name="lock-closed-outline" size="small" />
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MainNavbar',

  props: {
    showNavButtons: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      title: 'Launchpad',
    };
  },

  computed: {
    ...mapState({
      /** @type {boolean} */
      isAuthorized: state => state.auth.isAuthorized,
    }),
  },

  methods: {
    onTitleClick() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  &__title {
    @apply lg:order-none font-medium items-center text-2xl dark:text-white text-white lg:items-center lg:justify-center mb-4 md:mb-0;
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
  @apply md:text-xl py-1 md:py-2 px-2 md:px-4 dark:hover:text-gray-100 hover:text-gray-600 transition duration-200 ease-in-out select-none focus:outline-none;
}

.router-link-active {
  @apply dark:text-gray-200 text-white font-medium;
}
</style>
