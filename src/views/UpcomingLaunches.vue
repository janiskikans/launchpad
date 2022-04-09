<template>
  <div class="container mx-auto">
    <XyzTransitionGroup v-if="upcomingLaunches" class="item-grid" xyz="fade up stagger-1.5">
      <LaunchCard
        v-for="(launch, index) in upcomingLaunches"
        :key="index"
        :launch="launch"
        class="mx-4 mb-12 lg:max-h-96 lg:max-w-3/4 lg:mx-auto"
      />
    </XyzTransitionGroup>

    <LoadingDataError v-if="isReady && !upcomingLaunches.length" />
  </div>
</template>

<script>
import LaunchCard from '@components/upcomingLaunches/LaunchCard';
import { getUpcomingLaunches } from '@services/launchService';
import LoadingDataError from '@components/utils/LoadingDataError';

export default {
  name: 'UpcomingLaunches',

  components: { LaunchCard, LoadingDataError },

  data() {
    return {
      isLoading: true,
      upcomingLaunches: [],
    };
  },

  computed: {
    /**
     * @return {Boolean}
     */
    isReady() {
      return !this.isLoading;
    },
  },

  mounted() {
    this.loadUpcomingLaunches();
  },

  methods: {
    loadUpcomingLaunches() {
      getUpcomingLaunches()
        .then(launches => (this.upcomingLaunches = launches))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
