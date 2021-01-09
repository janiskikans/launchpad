<template>
  <div class="text-white flex flex-row w-auto lg:w-64">
    <div v-if="showTMinus" class="text-3xl mr-2">T{{ signAfterT }}</div>
    <div class="text-center">
      <div class="text-3xl">{{ days | atLeastTwoDigits }}</div>
      <div class="text-sm text-gray-200">DAYS</div>
    </div>
    <div class="text-2xl mx-2">:</div>
    <div class="text-center">
      <div class="text-3xl">{{ hours | atLeastTwoDigits }}</div>
      <div class="text-sm text-gray-200">HOURS</div>
    </div>
    <div class="text-2xl mx-2">:</div>
    <div class="text-center">
      <div class="text-3xl">{{ minutes | atLeastTwoDigits }}</div>
      <div class="text-sm text-gray-200">MIN</div>
    </div>
    <div class="text-2xl mx-2">:</div>
    <div class="text-center">
      <div class="text-3xl">{{ seconds | atLeastTwoDigits }}</div>
      <div class="text-sm text-gray-200">SEC</div>
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
      return value.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
        signDisplay: 'never',
      });
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
      return Math.floor(this.remainingTime / 60 / 60 / 24);
    },

    /**
     * @return {number}
     */
    hours() {
      return Math.floor(this.remainingTime / 60 / 60) % 24;
    },

    /**
     * @return {number}
     */
    minutes() {
      return Math.floor(this.remainingTime / 60) % 60;
    },

    /**
     * @return {number}
     */
    seconds() {
      return Math.floor(this.remainingTime) % 60;
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
