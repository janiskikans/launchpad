<template>
  <XyzTransition appear xyz="fade down-2">
    <div v-if="snackMessage" class="fixed bottom-6 left-6 bg-gray-50 p-3 pr-12 rounded-md text-md shadow-lg">
      {{ snackMessage }}
    </div>
  </XyzTransition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Snackbar',

  computed: {
    ...mapState({
      /** @type {string} */
      snackMessage: state => state.app.snackMessage,
    }),
  },
};
</script>
