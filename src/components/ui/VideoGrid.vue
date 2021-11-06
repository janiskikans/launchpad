<template>
  <div class="video-grid">
    <div v-for="link in videoLinks" :key="link.id" class="video-grid__card" @click="onVideoClick(link.url)">
      <img :src="link.previewImageUrl" :alt="link.title" width="100%" height="100%" @error="loadPlaceholderImage" />
      <div class="video-grid__overlay">
        <h1>{{ link.title | fitText }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import placeholderImageUrl from '@assets/images/launchpad_image_placeholder.png';
import { truncate } from '@helpers/stringHelper';

export default {
  name: 'VideoGrid',

  filters: {
    /**
     * Truncate text content if necessary
     * @param {string} value
     * @returns {string}
     */
    fitText(value) {
      const maxTextLength = 60;
      const isTextTooLong = value.length > maxTextLength;

      return isTextTooLong ? truncate(value, maxTextLength) : value;
    },
  },

  props: {
    videoLinks: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      placeholderImage: placeholderImageUrl,
    };
  },

  methods: {
    /**
     * @param {string} videoUrl
     */
    onVideoClick(videoUrl) {
      window.open(videoUrl, '_blank', 'noopener').focus();
    },

    loadPlaceholderImage(e) {
      e.target.src = this.placeholderImage;
    },
  },
};
</script>

<style lang="scss" scoped>
.video-grid {
  @apply grid gap-4 md:grid-cols-2 lg:grid-cols-4;

  &__card {
    @apply cursor-pointer relative text-center;

    img {
      @apply rounded-md;
    }
  }

  &__overlay {
    @apply absolute w-full h-full text-center top-0 left-0 flex items-center justify-center rounded-lg p-4;
    @apply transition-all ease-in-out duration-500 text-white text-opacity-0 hover:text-opacity-100;
    background-color: rgba(239, 68, 68, 0);

    &:hover {
      background-color: rgba(239, 68, 68, 0.8);
    }

    h1 {
      @apply font-bold;
    }
  }
}
</style>
