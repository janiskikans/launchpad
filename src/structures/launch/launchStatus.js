export const STATUS_GO = 1;
export const STATUS_TBD = 2;
export const STATUS_SUCCESS = 3;
export const STATUS_FAILURE = 4;
export const STATUS_IN_FLIGHT = 6;
export const STATUS_PARTIAL_FAILURE = 7;

export const GOOD_STATUSES = [STATUS_GO, STATUS_SUCCESS, STATUS_IN_FLIGHT];

export const BAD_STATUSES = [STATUS_FAILURE, STATUS_PARTIAL_FAILURE];

export default class LaunchStatus {
  constructor(params = {}) {
    this.id = params.id ?? null;
    this.name = params.name ?? '';
  }

  /**
   * @return {boolean}
   */
  isGood() {
    return GOOD_STATUSES.includes(this.id);
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
    return BAD_STATUSES.includes(this.id);
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
