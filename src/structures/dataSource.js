export default class DataSource {
  /** @type {number} */
  id;

  /** @type {string} */
  name;

  /** @type {string} */
  url = '';

  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
    this.url = params.url ?? '';
  }
}
