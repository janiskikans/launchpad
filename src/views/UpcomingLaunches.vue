<template>
  <div class="container mx-auto">
    <XyzTransitionGroup class="item-grid" xyz="fade up back stagger-2">
      <launch-card
        v-for="(launch, index) in upcomingLaunches"
        :key="index"
        :launch="launch"
        class="mx-4 mb-12 lg:max-h-96 lg:max-w-3/4 lg:mx-auto"
      />
    </XyzTransitionGroup>
  </div>
</template>

<script>
import LaunchCard from '@components/upcomingLaunches/LaunchCard';
import { getUpcomingLaunches } from '@services/launchService';

export default {
  name: 'UpcomingLaunches',

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
      getUpcomingLaunches().then(launches => (this.upcomingLaunches = launches));
    },
  },
};
</script>
