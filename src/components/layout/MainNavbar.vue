<template>
  <div class="text-gray-400 body-font">
    <div class="container mx-auto flex flex-col md:flex-row justify-around items-center">
      <div
        :key="title"
        class="hover:opacity-90 duration-300 cursor-pointer whitespace-nowrap flex order-first navbar__title"
        @click="onTitleClick"
      >
        <img
          src="@assets/images/icons/rocket-outline-white.svg"
          width="26"
          height="26"
          alt="rocket icon"
          class="mr-1.5"
        />
        Launchpad
      </div>

      <nav class="flex flex-wrap items-center text-base">
        <div id="nav">
          <router-link to="/" tag="button" class="nav-button mr-2">
            Upcoming Launches
          </router-link>
          <router-link to="/about" tag="button" class="nav-button">
            About
          </router-link>
        </div>
      </nav>
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
    @apply lg:order-none font-medium items-center text-2xl text-white lg:items-center lg:justify-center mb-4 md:mb-0;
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
  @apply md:text-xl py-1 md:py-2 px-2 md:px-4 hover:text-gray-100 transition duration-200 ease-in-out select-none focus:outline-none;
}

.router-link-exact-active {
  @apply text-gray-200 font-medium;
}
</style>
