<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="w-full max-w-lg" @submit.prevent="handleSubmit(onSubmit)">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/3 px-3">
            <ValidationProvider v-slot="{ errors }" name="Launch ID" rules="required">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="launch-id">
                Launch ID
              </label>
              <input
                id="launch-id"
                v-model="formData.launch_id"
                class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                type="number"
                placeholder="1"
              />
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="w-full md:w-1/3 px-3">
            <ValidationProvider v-slot="{ errors }" name="Title" rules="required">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="title">
                Title
              </label>
              <input
                id="title"
                v-model="formData.title"
                class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                type="text"
                placeholder="Title"
              />
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="w-full md:w-1/3 px-3">
            <ValidationProvider v-slot="{ errors }" name="Type" rules="required">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="type">
                Type
              </label>
              <input
                id="type"
                v-model="formData.type"
                class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                type="text"
                placeholder="video"
              />
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3">
            <ValidationProvider v-slot="{ errors }" name="Link" rules="required">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="link">
                Link
              </label>
              <input
                id="link"
                v-model="formData.url"
                class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                type="text"
                placeholder="https://www.google.com"
              />
              <span class="text-sm text-red-500">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="preview-image-url">
              Preview Image URL
            </label>
            <input
              id="preview-image-url"
              v-model="formData.preview_image_url"
              class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
              type="text"
              placeholder="https://www.google.com"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3">
          <div class="w-full px-3">
            <input type="submit" value="Add Link" />
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { createUrl } from '@api/launchpadApi/urlApi';
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
      formData: {
        launch_id: null,
        title: '',
        type: '',
        url: '',
        preview_image_url: '',
      },
    };
  },

  methods: {
    ...mapActions({
      showSnack: 'app/SHOW_SNACK',
    }),

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
