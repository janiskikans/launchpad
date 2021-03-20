<template>
  <div>
    <footer class="dark:text-gray-400 text-gray-200 body-font">
      <div class="text-center">
        <div class="mb-2">
          Made in
          <country-flag country="lv" size="small" rounded />
          by Janis Kikans.
        </div>
        <a
          class="dark:text-gray-400 text-gray-300 dark:hover:text-gray-200 hover:text-white mr-3"
          href="https://github.com/janiskikans"
          target="_blank"
          rel="noopener"
        >
          <ion-icon name="logo-github" />
        </a>
        <a
          class="dark:text-gray-400 text-gray-300 dark:hover:text-gray-200 hover:text-white"
          href="https://www.linkedin.com/in/janis-andrejs-kikans/"
          target="_blank"
          rel="noopener"
        >
          <ion-icon name="logo-linkedin" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag';

export default {
  name: 'MainFooter',

  components: {
    CountryFlag,
  },
};
</script>

<style lang="scss" scoped>
ion-icon {
  font-size: 17px;
}
</style>
