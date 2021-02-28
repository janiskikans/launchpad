<template>
  <div class="container mx-auto">
    <XyzTransitionGroup v-if="upcomingLaunches" class="item-grid" xyz="fade up back stagger-1.5">
      <launch-card
        v-for="(launch, index) in upcomingLaunches"
        :key="index"
        :launch="launch"
        class="mx-4 mb-12 lg:max-h-96 lg:max-w-3/4 lg:mx-auto"
      />
    </XyzTransitionGroup>

    <div v-if="isReady && !upcomingLaunches.length" class="text-center my-10 md:my-16 px-8">
      <h1 class="text-2xl text-white">
        Oh no! Something went wrong while loading data.
      </h1>
      <p class="text-lg text-gray-300 mt-2">
        Please try again later. If the problem persists please
        <better-link :href="'mailto:janis.kikans@gmail.com'" text="contact the developer" />
        <span>.</span>
      </p>
    </div>
  </div>
</template>

<script>
import LaunchCard from '@components/upcomingLaunches/LaunchCard';
import { getUpcomingLaunches, getUpcomingLaunchesFromTestData } from '@services/launchService';
import BetterLink from '@/components/utils/BetterLink.vue';

export default {
  name: 'UpcomingLaunches',

  components: { LaunchCard, BetterLink },

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
      // If on production, then retrieve actual data from the API
      if (process.env.NODE_ENV === 'production') {
        getUpcomingLaunches().then(launches => this.setUpcomingLaunches(launches));

        return;
      }

      // Retrieve launch data from local data
      getUpcomingLaunchesFromTestData().then(launches => this.setUpcomingLaunches(launches));
    },

    /**
     * @param {Launch[]} launches
     */
    setUpcomingLaunches(launches) {
      this.upcomingLaunches = launches;
      this.isLoading = false;
    },
  },
};
</script>
