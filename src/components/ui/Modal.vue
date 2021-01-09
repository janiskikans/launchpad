<template>
  <transition name="modal-fade">
    <div class="modal-background fixed flex justify-center items-center inset-0 z-10" @click.self="closeModal">
      <div
        class="bg-white shadow-xl overflow-x-auto flex flex-col px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg mx-2 sm:mx-4 lg:mx-8 w-full xl:w-3/5"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div id="modalTitle" class="p-2 flex justify-between">
          <slot v-if="hasHeader" name="header">
            Modal header
          </slot>
          <button
            v-if="hasCloseButton"
            type="button"
            class="text-lg px-2 cursor-pointer transition duration-400 ease text-gray-700 hover:text-gray-600 focus:outline-none"
            aria-label="Close modal"
            @click="closeModal"
          >
            <i class="fas fa-times-circle"></i>
          </button>
        </div>

        <div id="modalDescription" class="relative py-4 px-2">
          <slot name="body">
            Modal body
          </slot>
        </div>

        <div v-if="hasFooter" class="p-2 flex justify-end">
          <slot name="footer">
            Modal footer
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',

  props: {
    hasHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    hasFooter: {
      type: Boolean,
      required: false,
      default: true,
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
    },

    onEscape() {
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
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
