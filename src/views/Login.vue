<template>
  <div class="flex justify-center my-12 sm:my-32">
    <div class="w-11/12 sm:w-10/12 md:w-6/12 lg:w-4/12 xl:w-3/12 mx-auto bg-white rounded-md p-6 sm:p-12 shadow-lg">
      <div class="text-center text-2xl sm:text-3xl mb-6 sm:mb-8 font-light">Sign in to Dashboard</div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="login-form" @submit.prevent="handleSubmit(onSubmit)">
          <div class="mt-4 mb-6">
            <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                placeholder="Email"
                class="login-form__text-input"
                :class="{ 'border-red-600': errors.length }"
                @click="clearAuthError()"
              />
              <span class="text-sm text-red-600">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="my-4">
            <ValidationProvider v-slot="{ errors }" name="Password" rules="required">
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                placeholder="Password"
                class="login-form__text-input"
                :class="{ 'border-red-600': errors.length }"
                @click="clearAuthError()"
              />
              <span class="text-sm text-red-600">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div v-if="authError" class="text-sm text-red-600 my-1">{{ authError }}</div>

          <input
            class="w-full bg-indigo-700 hover:bg-indigo-600 text-white font-semibold my-4 py-2 px-4 rounded cursor-pointer disabled:opacity-70"
            type="submit"
            :value="submitButtonText"
            :disabled="isLoading"
          />
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  name: 'Login',

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      isLoading: false,
      email: '',
      password: '',
    };
  },

  computed: {
    ...mapState({
      /** @type {boolean} */
      isAuthorized: state => state.auth.isAuthorized,
      /** @type {string} */
      authError: state => state.auth.authError,
    }),

    submitButtonText() {
      return this.isLoading ? 'Please wait...' : 'Sign in';
    },
  },

  methods: {
    ...mapActions({
      login: 'auth/LOGIN',
      clearAuthError: 'auth/CLEAR_AUTH_ERROR',
      showSnack: 'app/SHOW_SNACK',
    }),

    ...mapMutations({
      setAuthError: 'auth/SET_AUTH_ERROR',
    }),

    onSubmit() {
      this.clearAuthError();
      this.isLoading = true;

      if (this.isAuthorized) {
        this.setAuthError('Already authorized!');
        this.isLoading = false;

        return;
      }

      this.login({
        email: this.email,
        password: this.password,
      });

      this.showSnack({ message: 'Succesfully signed in!' });
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  &__text-input {
    @apply w-full p-2 border-b-2 bg-gray-100 outline-none mb-1;
  }
}
</style>
