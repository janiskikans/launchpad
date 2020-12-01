<template>
  <div class="container mx-auto">
    <launch-card
      v-for="(launch, index) in upcomingLaunches"
      :key="index"
      :launch="launch"
      class="m-4 mb-12 md:max-h-96 md:max-w-3/4 md:mx-auto"
    />
  </div>
</template>

<script>
import LaunchCard from '@components/LaunchCard';
import { getUpcomingLaunches } from '@services/launchService';

export default {
  name: 'Home',

  components: { LaunchCard },

  data() {
    return {
      upcomingLaunches: [],
    };
  },

  mounted() {
    this.loadUpcomingLaunches();
  },

  methods: {
    loadUpcomingLaunches() {
      getUpcomingLaunches().then(
        launches => (this.upcomingLaunches = launches),
      );
    },
  },
};
</script>
