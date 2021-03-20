<template>
  <div
    class="flex items-center w-14 h-8 bg-gray-50 rounded-full flex-shrink-0 p-1 duration-300 ease-in-out cursor-pointer"
    :class="{ 'bg-gray-600': isDarkTheme }"
    @click="toggleTheme"
  >
    <div class="transform duration-300 ease-in-out absolute top-1.5 left-2" :class="{ 'translate-x-6': !isDarkTheme }">
      <span :class="{ hidden: isDarkTheme }">
        <ion-icon name="sunny-outline" />
      </span>
      <span class="text-gray-50" :class="{ hidden: !isDarkTheme }">
        <ion-icon name="moon-outline" />
      </span>
    </div>
    <div
      class="w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out z-10"
      :class="{ 'translate-x-6': isDarkTheme, 'bg-gray-50': isDarkTheme, 'bg-gray-600': !isDarkTheme }"
    ></div>
  </div>
</template>

<script>
import { setTheme, DARK_THEME, LIGHT_THEME } from '@services/themeService';

export default {
  name: 'ThemeToggler',

  props: {
    currentTheme: {
      type: String,
      required: true,
    },
  },

  computed: {
    /**
     * @returns {boolean}
     */
    isDarkTheme() {
      return this.currentTheme === DARK_THEME;
    },
  },

  methods: {
    toggleTheme() {
      if (this.isDarkTheme) {
        setTheme(LIGHT_THEME);
        this.emitChangeTheme(LIGHT_THEME);

        return;
      }

      setTheme(DARK_THEME);
      this.emitChangeTheme(DARK_THEME);
    },

    /**
     * @param {string} newTheme
     */
    emitChangeTheme(newTheme) {
      this.$emit('change-theme', newTheme);
    },
  },
};
</script>
