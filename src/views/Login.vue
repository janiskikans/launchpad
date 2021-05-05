<template>
  <div class="flex justify-center my-12 sm:my-32">
    <div class="w-11/12 sm:w-10/12 md:w-4/12 mx-auto bg-gray-100 rounded-md p-6 py-8 shadow-lg">
      <div class="text-center text-2xl mb-2">Login</div>
      <form class="login-form">
        <div>
          <label for="email" class="block mb-2 font-semibold">Email</label>
          <ValidationProvider v-slot="{ errors }" rules="required|email">
            <input id="email" v-model="email" type="email" name="email" class="login-form__text-input" />
            <span class="text-sm text-red-700">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="mt-4">
          <label for="password" class="block mb-2 font-semibold">Password</label>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <input id="password" v-model="password" type="password" name="password" class="login-form__text-input" />
            <span class="text-sm text-red-700">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <input
          class="w-full bg-indigo-700 hover:bg-indigo-500 text-white font-semibold py-2 px-4 mt-8 rounded cursor-pointer"
          type="submit"
          value="Login"
          :disabled="isLoading"
          @click.prevent="onSubmit"
        />
      </form>

      <div v-if="authError" class="text-sm text-red-700 mt-4">{{ authError }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { ValidationProvider } from 'vee-validate';

export default {
  name: 'Login',

  components: {
    ValidationProvider,
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
  },

  methods: {
    ...mapActions({
      attemptLogin: 'auth/ATTEMPT_LOGIN',
      clearAuthError: 'auth/CLEAR_AUTH_ERROR',
    }),

    onSubmit() {
      this.clearAuthError();
      this.isLoading = true;

      if (this.isAuthorized) {
        return;
      }

      this.attemptLogin({
        email: this.email,
        password: this.password,
      });

      this.isLoading = false;
    },

    resetForm() {
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  &__text-input {
    @apply w-full p-2 border-b-2 border-indigo-500 focus:bg-gray-50 focus:border-red-600 outline-none;
  }
}
</style>
