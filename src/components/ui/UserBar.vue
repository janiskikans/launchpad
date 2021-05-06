<template>
  <div class="text-white p-4">
    <span>
      Logged in as
      <span class="font-semibold">{{ currentUser.name }}.</span>
    </span>
    <button class="ml-2 font-semibold hover:text-gray-400 transition duration-200 ease-in-out" @click="onLogoutClick">
      Logout
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'UserBar',

  computed: {
    ...mapState({
      /** @type {User|null} */
      currentUser: state => state.auth.currentUser,
    }),
  },

  methods: {
    ...mapActions({
      logout: 'auth/LOGOUT',
      showSnack: 'app/SHOW_SNACK',
    }),

    onLogoutClick() {
      this.logout();
      this.showSnack({ message: 'Succesfully logged out!' });
    },
  },
};
</script>
