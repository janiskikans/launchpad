export default class LaunchMissionNew {
  /** @type {number} */
  id;

  /** @type {string} */
  name = '';

  /** @type {string} */
  type = '';

  /** @type {string} */
  orbit = '';

  /** @type {string} */
  description = '';

  /** @type {number} */
  dataSourceId;

  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
    this.type = params.type ?? '';
    this.orbit = params.orbit ?? '';
    this.description = params.description ?? '';
    this.dataSourceId = params.data_source_id;
  }
}
