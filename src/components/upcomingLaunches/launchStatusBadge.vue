<template>
  <div class="text-white uppercase text-center text-2xl">
    <span v-tooltip="launchStatusTooltip" class="rounded-lg px-1.5 py-1 opacity-90" :class="statusClass">
      {{ launchStatus.getAbbreviation() }}
    </span>
  </div>
</template>

<script>
import LaunchStatus from '@structures/launch/launchStatus';

export default {
  name: 'LaunchStatusBadge',

  props: {
    launchStatus: {
      type: LaunchStatus,
      required: true,
    },
    respondToDarkMode: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  computed: {
    /**
     * @return {string}
     */
    statusClass() {
      let baseClasses = this.respondToDarkMode ? 'dark:border-0 dark:text-white border' : '';

      if (this.launchStatus.isGood()) {
        if (!this.respondToDarkMode) {
          return 'bg-green-500';
        }

        return (baseClasses += ' dark:bg-green-500 border-green-500 text-green-500');
      }

      if (this.launchStatus.isNeutral()) {
        if (!this.respondToDarkMode) {
          return 'bg-gray-600';
        }

        return (baseClasses += ' dark:bg-gray-600 border-gray-600 text-gray-600');
      }

      if (this.launchStatus.isBad()) {
        if (!this.respondToDarkMode) {
          return 'bg-red-500';
        }

        return (baseClasses += ' dark:bg-red-500 border-red-500 text-red-500');
      }

      return '';
    },

    /**
     * @return {string}
     */
    launchStatusTooltip() {
      let content = '';

      if (this.launchStatus.name !== this.launchStatus.getAbbreviation()) {
        content = this.launchStatus.name;
      }

      return {
        content,
        classes: 'font-medium',
        placement: 'bottom-center',
        offset: 5,
      };
    },
  },
};
</script>
