<template>
  <div class="dashboard-container">
    <aside class="dashboard-navbar">
      <div class="text-center mb-4">
        <h1 class="text-lg tracking-wide">Dashboard</h1>
      </div>
      <nav class="flex-grow px-4 pb-4">
        <router-link to="/dashboard" class="dashboard-navbar__link" exact>
          <ion-icon name="eye-outline" class="mr-2" />
          Overview
        </router-link>
        <router-link to="/dashboard/url-manager" class="dashboard-navbar__link" exact>
          <ion-icon name="link-outline" class="mr-2" />
          URL Manager
        </router-link>
      </nav>
    </aside>
    <main class="dashboard-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Dashboard',

  computed: {
    ...mapState({
      /** @type {User|null} */
      currentUser: state => state.auth.currentUser,
    }),
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  @apply container mx-auto mb-8 px-2 md:px-0 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4;
}

.dashboard-navbar {
  @apply bg-white rounded-md py-4 w-full md:w-2/12;

  &__link {
    @apply block py-2 px-4 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg;
    @apply hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:ring focus:outline-none;
    @apply transition ease-in-out duration-300;
    @apply flex align-middle;

    ion-icon {
      @apply text-xl;
    }
  }
}

.dashboard-content {
  @apply flex-1 overflow-auto w-full;
}

.router-link-active {
  @apply bg-gray-200;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
