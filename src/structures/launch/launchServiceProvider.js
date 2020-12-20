export default class LaunchServiceProvider {
  /** @type {number|null} */
  id = null;

  /** @type {string} */
  url = '';

  /** @type {string} */
  name = '';

  /** @type {string} */
  type = '';

  constructor(params = {}) {
    this.id = params.id || null;
    this.url = params.url || '';
    this.name = params.name || '';
    this.type = params.type || '';
  }
}
