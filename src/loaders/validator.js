import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('email', email);

extend('required', {
  ...required,
  message: 'This field is required',
});
