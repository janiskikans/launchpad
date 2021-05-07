import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('email', email);

extend('required', {
  ...required,
  message: '{_field_} is required',
});
