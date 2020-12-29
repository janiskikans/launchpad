<template>
  <div
    class="launch-card bg-gray-700 shadow-lg rounded-lg flex flex-col lg:flex-row overflow-hidden"
    :class="bodyClass"
  >
    <div class="launch-card__image-wrapper">
      <img :src="launch.image" class="launch-card__image w-full lg:w-80 lg:max-h-auto" />
    </div>

    <div class="flex flex-col xl:flex-row w-full">
      <div class="p-4 h-full xl:w-full">
        <div class="text-2xl text-gray-50">{{ launch.name }}</div>
        <div class="text-gray-300">{{ launch.launchServiceProvider.name }}</div>
        <button
          type="button"
          class="border border-gray-500 text-white rounded-md px-4 py-2 my-2 transition duration-500 ease select-none hover:bg-gray-600 focus:outline-none focus:shadow-outline"
          @click="showLaunchModal = true"
        >
          Launch Details
        </button>
      </div>

      <div class="flex flex-col content-center p-8">
        <div class="m-auto">
          <div v-tooltip="launchTimeTooltip" class="text-lg text-gray-300 text-center mb-2">{{ launchTime }}</div>
          <countdown-timer :end-time="launch.net.getTime()" class="mb-6" />
          <div class="text-white uppercase text-center text-2xl">
            <span class="rounded-lg px-1.5 py-1 opacity-90" :class="statusClass">
              {{ launch.status.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <modal v-show="showLaunchModal" :has-footer="false" @close-modal="showLaunchModal = false">
      <template v-slot:header>
        <span class="sm:mr-24 font-bold text-gray-700 text-lg">{{ launch.name }}</span>
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
import Modal from '@components/ui/Modal';
import DetailedLaunchModal from '@components/upcomingLaunches/DetailedLaunchModal';

export default {
  name: 'LaunchCard',

  components: {
    CountdownTimer,
    Modal,
    DetailedLaunchModal,
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

      return classList;
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
    filter: drop-shadow(10px 0px 3px rgba(0, 0, 0, 0.1));
  }
}
</style>
