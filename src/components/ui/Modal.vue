<template>
  <transition name="modal-fade" appear>
    <div class="modal-background fixed flex justify-center items-center inset-0 z-10" @click.self="closeModal">
      <div class="modal" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <div id="modalTitle" class="px-6 py-4 flex justify-between">
          <slot v-if="hasHeader" name="header">
            Modal header
          </slot>
          <button
            v-if="hasCloseButton"
            type="button"
            class="modal__close-button"
            aria-label="Close modal"
            @click="closeModal"
          >
            <ion-icon name="close-outline" />
          </button>
        </div>

        <div id="modalDescription" class="relative px-6 py-2">
          <slot name="body">
            Modal body
          </slot>
        </div>

        <div v-if="hasFooter" class="flex justify-end p-6 py-4">
          <custom-button is-full-width-on-mobile @on-click="closeModal">
            Close
          </custom-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CustomButton from '@components/ui/CustomButton';
import { enableBodyScroll } from '@helpers/uiHelper';

export default {
  name: 'Modal',

  components: {
    CustomButton,
  },

  props: {
    hasHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    hasFooter: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasCloseButton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  created() {
    document.addEventListener('keyup', e => {
      if (e.key === 'Escape') {
        this.onEscape();
      }
    });
  },

  methods: {
    closeModal() {
      this.$emit('close-modal');
      enableBodyScroll();
    },

    onEscape() {
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  max-height: calc(100vh - 90px);
  overflow-y: auto;

  @apply bg-gray-100 shadow-xl overflow-x-auto flex flex-col pb-4 sm:pb-4 rounded-lg mx-2 sm:mx-4 lg:mx-8 w-full xl:w-3/4 3xl:w-3/5;

  &__close-button {
    @apply text-lg px-2 cursor-pointer transition duration-300 ease-in-out text-gray-500 hover:text-gray-900 focus:outline-none;
  }
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-fade-enter-active {
  transition: all 0.3s ease;
}

.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
