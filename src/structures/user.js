export default class User {
  /** @type {number|null} */
  id;

  /** @type {string} */
  name = '';

  /** @type {string} */
  email = '';

  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email;
  }
}
