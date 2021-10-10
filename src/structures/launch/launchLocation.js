export default class LaunchLocation {
  /** @type {number} */
  id;

  /** @type {string} */
  name = '';

  /** @type {string} */
  country = '';

  /** @type {string} */
  locationUrl = '';

  /** @type {number} */
  dataSourceId;

  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
    this.country = params.country ?? '';
    this.locationUrl = params.location_url ?? '';
    this.dataSourceId = params.data_source_id;
  }
}
