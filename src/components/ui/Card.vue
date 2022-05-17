<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
    <div v-if="hasHeader" class="border-b border-gray-200 px-4 py-3">
      <h1 class="text-xl font-bold flex items-center">
        <ion-icon v-if="icon" :name="icon" class="pr-2" />
        {{ title }}
      </h1>
    </div>
    <div :class="contentClasses">
      <slot>Card content</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Card title',
    },
    hasHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    hasContentPadding: {
      type: Boolean,
      required: false,
      default: true,
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
  },

  computed: {
    /** @returns {string} */
    contentClasses() {
      return this.hasContentPadding ? 'px-4 py-3' : '';
    },
  },
};
</script>
