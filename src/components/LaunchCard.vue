<template>
  <div class="launch-card bg-gray-800 shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
    <div class="md:max-w-1/4 launch-card__image-wrapper">
      <img :src="launch.image" class="launch-card__image" />
    </div>
    <div class="p-4 w-full">
      <div class="text-2xl text-gray-50">{{ launch.name }}</div>
      <div class="text-lg text-gray-300">{{ timeWindow }}</div>
    </div>
    <div class="mx-auto flex flex-wrap content-center">
      <countdown-timer :end-time="launch.windowStart.getTime()" class="p-8" />
    </div>
  </div>
</template>

<script>
import Launch from '@structures/launch/launch';
import CountdownTimer from '@components/CountdownTimer';
import { LAUNCH_COUNTDOWN_FORMAT } from '@helpers/dateHelper';
import { format, isEqual } from 'date-fns';

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
    timeWindow() {
      if (isEqual(this.launch.windowStart, this.launch.windowEnd)) {
        return format(this.launch.windowStart, LAUNCH_COUNTDOWN_FORMAT);
      }

      return `${format(this.launch.windowStart, LAUNCH_COUNTDOWN_FORMAT)} - ${format(
        this.launch.windowEnd,
        LAUNCH_COUNTDOWN_FORMAT,
      )}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@assets/scss/_variables.scss';

.launch-card {
  &__image {
    @media (min-width: $media-breakpoint-md) {
      clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    }
  }

  &__image-wrapper {
    filter: drop-shadow(10px 0px 3px rgba(0, 0, 0, 0.1));
  }
}
</style>
