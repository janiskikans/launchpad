<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="w-full max-w-lg add-link-form" @submit.prevent="handleSubmit(onSubmit)">
        <div class="flex flex-wrap -mx-3 lg:mb-6">
          <div class="w-full md:w-1/3 px-3">
            <ValidationProvider v-slot="{ errors }" name="Launch ID" rules="required">
              <label class="add-link-form__label" for="launch-id">
                Launch ID
              </label>
              <input
                id="launch-id"
                v-model="formData.launch_id"
                class="add-link-form__input"
                type="number"
                placeholder="1"
              />
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="w-full md:w-1/3 px-3">
            <ValidationProvider v-slot="{ errors }" name="Title" rules="required">
              <label class="add-link-form__label" for="title">
                Title
              </label>
              <input id="title" v-model="formData.title" class="add-link-form__input" type="text" placeholder="Title" />
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="w-full md:w-1/3 px-3">
            <ValidationProvider v-slot="{ errors }" name="Type" rules="required">
              <label class="add-link-form__label" for="type">
                Type
              </label>
              <select id="type" v-model="formData.type" class="add-link-form__input">
                <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
              </select>
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3">
            <ValidationProvider v-slot="{ errors }" name="Link" rules="required">
              <label class="add-link-form__label" for="link">
                Link
              </label>
              <input
                id="link"
                v-model="formData.url"
                class="add-link-form__input"
                type="text"
                placeholder="https://www.google.com"
              />
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="add-link-form__label" for="preview-image-url">
              Preview Image URL
            </label>
            <input
              id="preview-image-url"
              v-model="formData.preview_image_url"
              class="add-link-form__input"
              type="text"
              placeholder="https://www.google.com"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3">
          <div class="w-full px-3">
            <input type="submit" value="Add Link" class="add-link-form__submit-btn" />
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { createUrl, getTypes } from '@api/launchpadApi/urlApi';
import { mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'AddLinkForm',

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      types: [],
      formData: {
        launch_id: null,
        title: '',
        type: 'video',
        url: '',
        preview_image_url: '',
      },
    };
  },

  mounted() {
    this.loadTypes();
  },

  methods: {
    ...mapActions({
      showSnack: 'app/SHOW_SNACK',
    }),

    loadTypes() {
      getTypes()
        .then(response => {
          if (response.data.success) {
            this.types = response.data.data;
          }
        })
        .catch(() => {
          this.showSnack({ message: 'Could not load URL types' });
        });
    },

    onSubmit() {
      createUrl(this.formData)
        .then(() => {
          this.onSuccesfullSubmit();
        })
        .catch(error => {
          if (error.response.data.message) {
            this.showSnack({ message: error.response.data.message });

            return;
          }

          this.showSnack({ message: 'Could not add link' });
        });
    },

    onSuccesfullSubmit() {
      this.showSnack({ message: 'Link added succesfully!' });
      this.$emit('on-link-added');
    },
  },
};
</script>

<style lang="scss" scoped>
.add-link-form {
  &__label {
    @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
  }

  &__input {
    @apply appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none;
  }

  &__submit-btn {
    @apply bg-green-500 text-white px-2.5 py-1.5 rounded-md cursor-pointer;
    @apply hover:bg-green-400;
  }
}
</style>
