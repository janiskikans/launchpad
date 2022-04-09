<template>
  <div class="container mx-auto">
    <XyzTransitionGroup v-if="pastLaunches" class="item-grid" xyz="fade up stagger-1.5">
      <LaunchCard
        v-for="(launch, index) in pastLaunches"
        :key="index"
        :launch="launch"
        class="mx-4 mb-12 lg:max-h-96 lg:max-w-3/4 lg:mx-auto"
      />
    </XyzTransitionGroup>

    <LoadingDataError v-if="!pastLaunches.length" />
  </div>
</template>

<script>
import LoadingDataError from '@components/utils/LoadingDataError';
import LaunchCard from '@components/upcomingLaunches/LaunchCard';
import { getPastLaunches } from '@services/launchService';

export default {
  name: 'PastLaunches',

  components: {
    LoadingDataError,
    LaunchCard,
  },

  data() {
    return {
      isLoading: true,
      pastLaunches: [],
    };
  },

  mounted() {
    this.loadPastLaunches();
  },

  methods: {
    loadPastLaunches() {
      getPastLaunches()
        .then(launches => (this.pastLaunches = launches))
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>
