<template>
  <section class="page-not-found">
    <div class="text-white">
      <h1 class="page-not-found__main-title">Page not found</h1>
      <router-link to="/" tag="button" class="page-not-found__home-link">
        Take me home
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style lang="scss" scoped>
.page-not-found {
  @apply flex items-center justify-center text-center;

  &__main-title {
    @apply text-6xl;
  }

  &__home-link {
    @apply text-xl mt-8;
  }
}
</style>
