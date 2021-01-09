<template>
  <div>
    <span class="font-bold">Provider:</span>
    {{ launch.launchServiceProvider.name }}
    <span v-if="launch.launchServiceProvider.type">({{ launch.launchServiceProvider.type }})</span>
  </div>
</template>

<script>
import Launch from '@structures/launch/launch';

export default {
  name: 'DetailedLaunchModal',

  props: {
    launch: {
      type: Launch,
      required: true,
    },
  },
};
</script>
