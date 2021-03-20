<template>
  <a :rel="relContent" :href="href" :target="target" class="better-link" :class="additionalLinkStyle">{{ text }}</a>
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
    hasSimpleStyle: {
      type: Boolean,
      required: false,
      default: false,
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

    /**
     * @return {string}
     */
    additionalLinkStyle() {
      return this.hasSimpleStyle ? 'better-link--simple' : '';
    },
  },
};
</script>

<style lang="scss">
.better-link {
  @apply transition duration-300 ease-in-out;
  @apply font-semibold  dark:text-blue-400 text-gray-800 dark:hover:text-yellow-300 hover:text-gray-900;
  @apply border-b-2 border-dashed border-blue-400 dark:hover:border-yellow-300 hover:border-gray-900;
  @apply border-opacity-0 hover:border-opacity-100;

  &--simple {
    @apply text-white hover:text-gray-300 border-none;
  }
}
</style>
