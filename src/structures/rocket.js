export default class Rocket {
  /** @type {number|null} */
  id = null;

  constructor(params = {}) {
    this.name = params.id ?? null;
  }
}
