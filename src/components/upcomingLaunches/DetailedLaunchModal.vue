<template>
  <div>
    Content
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
