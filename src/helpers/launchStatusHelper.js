export const STATUS_GO = 'go';
export const STATUS_TBD = 'tbd';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILURE = 'failure';
export const STATUS_HOLD = 'on_hold';
export const STATUS_IN_FLIGHT = 'in_flight';
export const STATUS_PARTIAL_FAILURE = 'partial_failure';
export const STATUS_SCRUBBED = 'scrub';

export const GOOD_STATUSES = [STATUS_GO, STATUS_SUCCESS, STATUS_IN_FLIGHT];
export const BAD_STATUSES = [STATUS_FAILURE, STATUS_PARTIAL_FAILURE];

/**
 * @param {string} status
 * @return {boolean}
 */
export function isGoodStatus(status) {
  return GOOD_STATUSES.includes(status);
}

/**
 * @param {string} status
 * @return {boolean}
 */
export function isBadStatus(status) {
  return BAD_STATUSES.includes(status);
}

/**
 * @param {string} status
 * @return {boolean}
 */
export function isNeutralStatus(status) {
  return !isGoodStatus(status) && !isBadStatus(status);
}

/**
 * @param {string} status
 * @return {string}
 */
export function getShortMessage(status) {
  switch (status) {
    case STATUS_HOLD:
      return 'On Hold';
    case STATUS_IN_FLIGHT:
      return 'In Flight';
    case STATUS_PARTIAL_FAILURE:
      return 'Partial';
    default:
      return status;
  }
}

/**
 * @param {string} status
 * @return {string}
 */
export function getFullMessage(status) {
  switch (status) {
    case STATUS_PARTIAL_FAILURE:
      return 'Partial Failure';
    case STATUS_SCRUBBED:
      return 'Launch Scrubbed';
    case STATUS_TBD:
      return 'To Be Determined';
    default:
      return getShortMessage(status);
  }
}
