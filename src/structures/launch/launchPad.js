import LaunchLocation from '@structures/launch/launchLocation';

export default class LaunchPad {
  /** @type {number} */
  id;

  /** @type {string} */
  name = '';

  /** @type {string} */
  infoUrl = '';

  /** @type {string} */
  locationUrl = '';

  /** @type {number|null} */
  latitude = null;

  /** @type {number|null} */
  longitude = null;

  /** @type {LaunchLocation|null} */
  location = null;

  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
    this.infoUrl = params.info_url ?? '';
    this.locationUrl = params.location_url ?? '';
    this.latitude = parseFloat(params.latitude) ?? null;
    this.longitude = parseFloat(params.longitude) ?? null;
    this.location = params.launch_location ? new LaunchLocation(params.launch_location) : null;
  }
}
