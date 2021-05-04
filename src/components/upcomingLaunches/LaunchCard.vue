<template>
  <div
    class="launch-card dark:bg-gray-700 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row overflow-hidden"
    :class="bodyClass"
  >
    <div class="launch-card__image-wrapper">
      <img
        :src="launch.image"
        :alt="launch.name"
        class="launch-card__image w-full lg:w-80 lg:max-h-auto"
        @error="loadPlaceholderImage"
      />
    </div>

    <div class="flex flex-col xl:flex-row w-full">
      <div class="p-4 h-full xl:w-full flex flex-col lg:justify-between">
        <div class="my-auto">
          <div class="text-2xl dark:text-gray-50 text-black">{{ launch.name }}</div>
          <div class="dark:text-gray-200 text-gray-800">
            {{ launch.launchServiceProvider.name }}
          </div>
          <button
            type="button"
            class="border dark:border-gray-500 border-gray-400 dark:text-white text-black rounded-md px-4 py-2 mt-4 lg:mt-6 xl:mt-4 w-full lg:w-full xl:w-auto transition duration-500 ease select-none dark:hover:bg-gray-600 hover:bg-gray-200 focus:outline-none focus:shadow-outline"
            @click="openDetailedLaunchModal()"
          >
            Launch Details
          </button>
        </div>
      </div>

      <div class="flex my-auto xl:mr-12">
        <div class="m-auto flex flex-col lg:flex-row xl:flex-col mb-4 lg:mb-8 xl:my-auto">
          <div>
            <div v-tooltip="launchTimeTooltip" class="text-lg dark:text-gray-200 text-gray-700 text-center mb-2">
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

    <modal v-show="showLaunchModal" :has-footer="true" @close-modal="showLaunchModal = false">
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
import CountdownTimer from '@components/CountdownTimer';
import { LAUNCH_COUNTDOWN_FORMAT } from '@helpers/dateHelper';
import { format } from 'date-fns';
import { disableBodyScroll } from '@helpers/uiHelper';
import LaunchStatusBadge from '@components/upcomingLaunches/launchStatusBadge';
import placeholderImageUrl from '@assets/images/launchpad_image_placeholder.png';
import Launch from '@/structures/launch/launch';
import * as statusHelper from '@helpers/launchStatusHelper';

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
      placeholderImage: placeholderImageUrl,
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
      if (statusHelper.isGoodStatus(this.launch.status)) {
        return 'bg-green-500';
      }

      if (statusHelper.isNeutralStatus(this.launch.status)) {
        return 'bg-gray-600';
      }

      if (statusHelper.isBadStatus(this.launch.status)) {
        return 'bg-red-500';
      }

      return '';
    },

    /**
     * @return {string}
     */
    bodyClass() {
      let classList = 'launch-card__body';

      if (this.launch.getDistanceFromNowInHours() < 24 && statusHelper.isGoodStatus(this.launch.status)) {
        classList += ' border-b-4 lg:border-r-4 lg:border-b-0 border-green-500';
      }

      if (statusHelper.isBadStatus(this.launch.status)) {
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

    loadPlaceholderImage(e) {
      e.target.src = this.placeholderImage;
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
