<template>
  <button type="button" class="custom-button" :class="classes" @click="onClick">
    <slot>
      Button
    </slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',

  props: {
    isFullWidthOnMobile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  computed: {
    /**
     * @return {string}
     */
    classes() {
      let classes = 'custom-button--primary';

      if (this.isFullWidthOnMobile) {
        classes += ' w-full md:w-auto';
      }

      return classes;
    },
  },

  methods: {
    onClick() {
      this.$emit('on-click');
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-button {
  @apply rounded-md px-5 py-2 transition duration-500 ease-in-out select-none focus:outline-none focus:ring;

  &--primary {
    @apply bg-gray-700 text-white hover:bg-gray-600;
  }
}
</style>
