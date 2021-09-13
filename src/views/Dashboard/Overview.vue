<template>
  <div class="bg-gray-50 rounded-md p-5 space-y-2">
    <h1 class="text-xl">Welcome to the Launchpad dashboard!</h1>
    <p>
      You're logged in as
      <span class="font-bold">{{ currentUser.name }} ({{ currentUser.email }})</span>
      <span>.</span>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Overview',

  computed: {
    ...mapState({
      /** @type {User|null} */
      currentUser: state => state.auth.currentUser,
    }),
  },
};
</script>
