<template>
  <div>
    <p>{{ content }}</p>
    <button v-if="isButtonVisible" class="text-gray-700 font-semibold" @click.prevent="onReadMoreClick">
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import { truncate } from '@helpers/stringHelper';

export default {
  name: 'TextCollapse',

  props: {
    textContent: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      showAllContent: true,
    };
  },

  computed: {
    /**
     * @return {number}
     */
    contentLength() {
      return this.textContent.length;
    },

    /**
     * @return {boolean}
     */
    isButtonVisible() {
      return this.isContentTooLong;
    },

    /**
     * @return {string}
     */
    buttonText() {
      return this.showAllContent ? 'Read less' : 'Read more...';
    },

    /**
     * @return {boolean}
     */
    isContentTooLong() {
      return this.contentLength > 300;
    },

    /**
     * @return {string}
     */
    content() {
      if (this.showAllContent) {
        return this.textContent;
      }

      return truncate(this.textContent);
    },
  },

  mounted() {
    this.showAllContent = !this.isContentTooLong;
  },

  methods: {
    onReadMoreClick() {
      this.showAllContent = !this.showAllContent;
    },
  },
};
</script>
