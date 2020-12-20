<template>
  <div class="launch-card bg-gray-700 shadow-lg rounded-lg flex flex-col lg:flex-row overflow-hidden">
    <div class="launch-card__image-wrapper">
      <img :src="launch.image" class="launch-card__image w-full lg:w-80 lg:max-h-auto" />
    </div>

    <div class="flex flex-col xl:flex-row w-full">
      <div class="p-4 h-full xl:w-full">
        <div class="text-2xl text-gray-50">{{ launch.name }}</div>
        <div class="text-gray-300">{{ launch.launchServiceProvider.name }}</div>
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
  </div>
</template>

<script>
import Launch from '@structures/launch/launch';
import CountdownTimer from '@components/CountdownTimer';
import { LAUNCH_COUNTDOWN_FORMAT } from '@helpers/dateHelper';
import { format, isEqual } from 'date-fns';
import { STATUS_TBD, STATUS_GO, STATUS_SUCCESS } from '@structures/launch/launchStatus';

export default {
  name: 'LaunchCard',

  components: {
    CountdownTimer,
  },

  props: {
    launch: {
      type: Launch,
      required: true,
    },
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

      const isMatchingWindowStartAndEnd = isEqual(this.launch.windowStart, this.launch.windowEnd);
      if (!isMatchingWindowStartAndEnd) {
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
      const status = this.launch.status.id;

      if (status === STATUS_GO || status === STATUS_SUCCESS) {
        return 'bg-green-500';
      }

      if (status === STATUS_TBD) {
        return 'bg-gray-600';
      }

      return '';
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
