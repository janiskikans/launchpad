<template>
  <div
    class="launch-card bg-gray-700 shadow-lg rounded-lg flex flex-col lg:flex-row overflow-hidden"
    :class="bodyClass"
  >
    <div class="launch-card__image-wrapper">
      <img :src="launch.image" :alt="launch.name" class="launch-card__image w-full lg:w-80 lg:max-h-auto" />
    </div>

    <div class="flex flex-col xl:flex-row w-full">
      <div class="p-4 h-full xl:w-full flex flex-col lg:justify-between">
        <div class="my-auto">
          <div class="text-2xl text-gray-50">{{ launch.name }}</div>
          <div class="text-gray-300">
            {{ launch.launchServiceProvider.name }}
          </div>
          <button
            type="button"
            class="border border-gray-500 text-white rounded-md px-4 py-2 mt-4 lg:mt-6 xl:mt-4 w-full lg:w-full xl:w-auto transition duration-500 ease select-none hover:bg-gray-600 focus:outline-none focus:shadow-outline"
            @click="openDetailedLaunchModal()"
          >
            Launch Details
          </button>
        </div>
      </div>

      <div class="flex my-auto xl:mr-12">
        <div class="m-auto flex flex-col lg:flex-row xl:flex-col mb-4 lg:mb-8 xl:my-auto">
          <div>
            <div v-tooltip="launchTimeTooltip" class="text-lg text-gray-300 text-center mb-2">
              {{ launchTime }}
            </div>
            <countdown-timer :end-time="launch.net.getTime()" />
          </div>

          <launch-status-badge
            :launch-status="launch.status"
            class="lg:ml-12 xl:ml-0 mt-4 mb-2 lg:my-auto xl:mt-5 xl:mb-0"
          />
        </div>
      </div>
    </div>

    <modal v-show="showLaunchModal" :has-footer="false" @close-modal="showLaunchModal = false">
      <template v-slot:header>
        <span class="sm:mr-24 text-2xl">{{ launch.name }}</span>
      </template>
      <template v-slot:body>
        <detailed-launch-modal :launch="launch" />
      </template>
    </modal>
  </div>
</template>

<script>
import Launch from '@structures/launch/launch';
import CountdownTimer from '@components/CountdownTimer';
import { LAUNCH_COUNTDOWN_FORMAT } from '@helpers/dateHelper';
import { format } from 'date-fns';
import { disableBodyScroll } from '@helpers/uiHelper';
import LaunchStatusBadge from '@components/upcomingLaunches/LaunchStatusBadge';

export default {
  name: 'LaunchCard',

  components: {
    CountdownTimer,
    Modal: () => import('@components/ui/Modal'),
    DetailedLaunchModal: () => import('@components/upcomingLaunches/DetailedLaunchModal'),
    LaunchStatusBadge,
  },

  props: {
    launch: {
      type: Launch,
      required: true,
    },
  },

  data() {
    return {
      showLaunchModal: false,
      showDetailCollapse: false,
    };
  },

  computed: {
    /**
     * @return {string}
     */
    launchTime() {
      return format(this.launch.net, LAUNCH_COUNTDOWN_FORMAT);
    },

    /**
     * @return {{}}
     */
    launchTimeTooltip() {
      let content = '';

      if (!this.launch.hasMatchingLaunchWindowTimes()) {
        content = `Window: ${format(this.launch.windowStart, LAUNCH_COUNTDOWN_FORMAT)} - ${format(
          this.launch.windowEnd,
          LAUNCH_COUNTDOWN_FORMAT,
        )}`;
      }

      return {
        content,
        classes: 'font-medium',
      };
    },

    /**
     * @return {string}
     */
    statusClass() {
      if (this.launch.status.isGood()) {
        return 'bg-green-500';
      }

      if (this.launch.status.isNeutral()) {
        return 'bg-gray-600';
      }

      if (this.launch.status.isBad()) {
        return 'bg-red-500';
      }

      return '';
    },

    /**
     * @return {string}
     */
    bodyClass() {
      let classList = 'launch-card__body';

      if (this.launch.getDistanceFromNowInHours() < 24 && this.launch.status.isGood()) {
        classList += ' border-b-4 lg:border-r-4 lg:border-b-0 border-green-500';
      }

      if (this.launch.status.isBad()) {
        classList += ' border-b-4 lg:border-r-4 lg:border-b-0 border-red-500';
      }

      return classList;
    },
  },

  methods: {
    openDetailedLaunchModal() {
      this.showLaunchModal = true;
      disableBodyScroll();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@assets/scss/_variables.scss';

.launch-card {
  &__image {
    max-height: 450px;

    @media (min-width: $media-breakpoint-lg) {
      max-width: 250px;
      height: 300px;
      clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    }
  }

  &__image-wrapper {
    filter: drop-shadow(10px 0 3px rgba(0, 0, 0, 0.1));
  }
}
</style>
