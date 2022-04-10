<template>
  <div class="text-center my-10 md:my-16 px-8">
    <h1 class="text-2xl text-white">
      Oh no! Something went wrong while loading data.
    </h1>
    <p class="text-lg text-gray-300 mt-2">
      Please try again later. If the problem persists please
      <BetterLink :href="'mailto:janis.kikans@gmail.com'" text="contact the developer" />
      <span>.</span>
    </p>
  </div>
</template>

<script>
import BetterLink from '@components/utils/BetterLink';

export default {
  name: 'LoadingDataError',

  components: {
    BetterLink,
  },
};
</script>
