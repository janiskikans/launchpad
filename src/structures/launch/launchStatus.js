export const STATUS_GO = 1;
export const STATUS_TBD = 2;
export const STATUS_SUCCESS = 3;
export const STATUS_FAILURE = 4;
export const STATUS_PARTIAL_FAILURE = 7;
export default class LaunchStatus {
  constructor(params = {}) {
    this.id = params.id ?? null;
    this.name = params.name ?? '';
  }

  /**
   * @return {boolean}
   */
  isGood() {
    return this.id === STATUS_GO || this.id === STATUS_SUCCESS;
  }

  /**
   * @return {boolean}
   */
  isNeutral() {
    return this.id === STATUS_TBD;
  }

  /**
   * @return {string}
   */
  isBad() {
    return this.id === STATUS_FAILURE || this.id === STATUS_PARTIAL_FAILURE;
  }

  /**
   * @return {string}
   */
  getAbbreviation() {
    let abbreviation = this.name;

    switch (this.id) {
      case STATUS_PARTIAL_FAILURE:
        abbreviation = 'PARTIAL';
        break;
      default:
        abbreviation = this.name;
    }

    return abbreviation;
  }
}
