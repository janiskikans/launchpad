<template>
  <div class="text-white"></div>
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
