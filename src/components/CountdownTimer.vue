<template>
  <div class="dark:text-white text-gray-800 flex flex-row countdown">
    <div v-if="showTMinus" class="text-3xl mr-2">T{{ signAfterT }}</div>
    <div class="text-center">
      <div class="text-3xl w-10">{{ days | atLeastTwoDigits }}</div>
      <div class="text-sm dark:text-gray-200 text-gray-700">DAYS</div>
    </div>
    <div class="text-2xl mx-2">:</div>
    <div class="text-center">
      <div class="text-3xl w-10">{{ hours | atLeastTwoDigits }}</div>
      <div class="text-sm dark:text-gray-200 text-gray-700">HOURS</div>
    </div>
    <div class="text-2xl mx-2">:</div>
    <div class="text-center">
      <div class="text-3xl w-10">{{ minutes | atLeastTwoDigits }}</div>
      <div class="text-sm dark:text-gray-200 text-gray-700">MIN</div>
    </div>
    <div class="text-2xl mx-2">:</div>
    <div class="text-center">
      <div class="text-3xl w-10">{{ seconds | atLeastTwoDigits }}</div>
      <div class="text-sm dark:text-gray-200 text-gray-700">SEC</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountdownTimer',

  filters: {
    /**
     * @param {number} value
     * @return {string}
     */
    atLeastTwoDigits(value) {
      return ('0' + Math.abs(value)).slice(-2);
    },
  },

  props: {
    endTime: {
      type: Number,
      required: true,
    },
    showTMinus: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      currentTime: 0,
      remainingTime: 0,
    };
  },

  computed: {
    /**
     * @return {number}
     */
    days() {
      return Math.floor(Math.abs(this.remainingTime) / 60 / 60 / 24);
    },

    /**
     * @return {number}
     */
    hours() {
      return Math.floor(Math.abs(this.remainingTime) / 60 / 60) % 24;
    },

    /**
     * @return {number}
     */
    minutes() {
      return Math.floor(Math.abs(this.remainingTime) / 60) % 60;
    },

    /**
     * @return {number}
     */
    seconds() {
      return Math.floor(Math.abs(this.remainingTime)) % 60;
    },

    /**
     * @return {string}
     */
    signAfterT() {
      return this.remainingTime >= 0 ? '-' : '+';
    },
  },

  watch: {
    currentTime() {
      this.setRemainingTime();
    },
  },

  mounted() {
    this.initializeCountdown();
  },

  destroyed() {
    this.clearIntervalTimer();
  },

  methods: {
    initializeCountdown() {
      this.setCurrentTime();
      this.setRemainingTime();

      this.intervalTimer = setInterval(() => this.setCurrentTime(), 1000);
    },

    setCurrentTime() {
      this.currentTime = new Date().getTime();
    },

    setRemainingTime() {
      this.remainingTime = Math.floor((this.endTime - this.currentTime) / 1000);
    },

    clearIntervalTimer() {
      clearInterval(this.intervalTimer);
    },
  },
};
</script>

<style lang="scss">
@import '@assets/scss/_variables.scss';

.countdown {
  width: auto;

  @media (min-width: $media-breakpoint-lg) {
    width: 17rem;
  }
}
</style>
