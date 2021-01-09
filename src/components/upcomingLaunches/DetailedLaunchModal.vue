<template>
  <div>
    <div>
      <span class="font-bold">Provider:</span>
      {{ launch.launchServiceProvider.name }} ({{ launch.launchServiceProvider.type }})
    </div>
    <div>
      <span class="font-bold">Status:</span>
      {{ launch.status.name }}
    </div>
    <div v-if="launch.mission">
      <div class="font-bold">Mission description:</div>
      <p>{{ launch.mission.description }}</p>
    </div>
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
