<template>
  <div class="container px-8 pb-8 text-white grid grid-cols-3 dashboard-navbar">
    <aside class="col-span-3 lg:col-span-1 w-64 bg-gray-700">
      <nav>
        <router-link to="/dashboard" class="dashboard-navbar__link">
          Overview
        </router-link>
        <router-link to="/dashboard/url-manager" class="dashboard-navbar__link">
          External URL Manager
        </router-link>
      </nav>
    </aside>
    <main class="px-4 col-span-3 lg:col-span-2">
      <router-view />
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
.dashboard-navbar {
  &__link {
    @apply block py-2 px-4;
  }
}
</style>
