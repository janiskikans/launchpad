<template>
  <div class="relative inline-block text-left">
    <div>
      <button
        id="menu-button"
        type="button"
        class="dropdown-toggle"
        :aria-expanded="isVisible"
        aria-haspopup="true"
        @click="toggleVisibility"
      >
        <span class="mr-1">{{ title }}</span>
        <ion-icon name="chevron-down-outline" />
      </button>
    </div>

    <XyzTransition xyz="fade duration-1">
      <div
        v-if="isVisible"
        v-click-outside="hideDropdown"
        class="dropdown"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div class="py-1" role="none">
          <a
            v-for="(item, index) in items"
            :key="index"
            href="#"
            class="dropdown-item"
            role="menuitem"
            @click.prevent="onItemClick(item.value)"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </XyzTransition>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

export default {
  name: 'Dropdown',

  directives: {
    clickOutside: vClickOutside.directive,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: 'Title',
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      isVisible: false,
    };
  },

  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },

    hideDropdown() {
      this.isVisible = false;
    },

    /**
     * @param {string} value
     */
    onItemClick(value) {
      this.$emit('on-item-clicked', value);
      this.hideDropdown();
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-item {
  @apply text-gray-700 block px-4 py-2 text-sm;
  @apply hover:bg-gray-50;
}

.dropdown {
  @apply origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10;
}

.dropdown-toggle {
  @apply inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none;
}

ion-icon {
  font-size: 16px;
}
</style>
