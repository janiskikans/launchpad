<template>
  <div>
    <footer class="dark:text-gray-400 text-gray-700 body-font">
      <div class="text-center mb-8">
        <div class="mb-2">
          Made in
          <country-flag country="lv" size="small" rounded />
          by Janis Kikans.
        </div>
        <a
          class="dark:text-gray-400 text-gray-600 dark:hover:text-gray-200 hover:text-gray-500 mr-3"
          href="https://github.com/janiskikans"
          target="_blank"
          rel="noopener"
        >
          <ion-icon name="logo-github" />
        </a>
        <a
          class="dark:text-gray-400 text-gray-600 dark:hover:text-gray-200 hover:text-gray-500"
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
