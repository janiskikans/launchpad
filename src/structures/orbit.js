export default class Orbit {
  /** @type {string} */
  name = '';

  /** @type {string} */
  abbrevation = '';

  constructor(params = {}) {
    this.name = params.name ?? '';
    this.abbrevition = params.abbrev ?? '';
  }
}
