<template>
  <a :rel="relContent" :href="href" :target="target" class="better-link">{{ text }}</a>
</template>

<script>
export default {
  name: 'BetterLink',

  props: {
    href: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    isExternal: {
      type: Boolean,
      required: false,
      default: false,
    },
    openInNewTab: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    /**
     * @return {string}
     */
    relContent() {
      return this.isExternal ? 'noopener' : '';
    },

    /**
     * @return {string}
     */
    target() {
      return this.openInNewTab ? '_blank' : '';
    },
  },
};
</script>

<style lang="scss">
.better-link {
  @apply transition duration-500 ease-in-out;
  @apply font-semibold  text-yellow-300 hover:text-yellow-200;
  @apply border-b-2 border-yellow-300 border-dashed hover:border-yellow-200;
}
</style>
