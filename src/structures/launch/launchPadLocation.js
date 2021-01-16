export default class LaunchPadLocation {
  /** @type {number} */
  id;

  /** @type {string} */
  url = '';

  /** @type {string} */
  name = '';

  /** @type {string} */
  countryCode = '';

  /** @type {string} */
  mapImage = '';

  /** @type {number|null} */
  totalLaunchCount = null;

  /** @type {number|null} */
  totalLandingCount = null;

  constructor(params = {}) {
    this.id = params.id;
    this.url = params.url ?? '';
    this.name = params.name ?? '';
    this.countryCode = params.country_code ?? '';
    this.mapImage = params.map_image ?? '';
    this.totalLaunchCount = params.total_launch_count ?? null;
    this.totalLandingCount = params.total_landing_count ?? null;
  }
}
