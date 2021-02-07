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
  props: {
    launchStatus: {
      type: LaunchStatus,
      required: true,
    },
  },

  computed: {
    /**
     * @return {string}
     */
    statusClass() {
      if (this.launchStatus.isGood()) {
        return 'bg-green-500';
      }

      if (this.launchStatus.isNeutral()) {
        return 'bg-gray-600';
      }

      if (this.launchStatus.isBad()) {
        return 'bg-red-500';
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
