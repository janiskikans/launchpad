export default class LaunchServiceProvider {
  /** @type {number} */
  id;

  /** @type {string} */
  name = '';

  /** @type {string} */
  type = '';

  /** @type {string} */
  country = '';

  /** @type {string} */
  abbreviation = '';

  /** @type {string} */
  description = '';

  /** @type {number|null} */
  foundedAt = null;

  /** @type {string} */
  infoUrl = '';

  /** @type {string} */
  logoUrl = '';

  /** @type {number} */
  dataSourceId;

  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
    this.type = params.type ?? '';
    this.country = params.country ?? '';
    this.abbreviation = params.abbreviation ?? '';
    this.description = params.description ?? '';
    this.foundedAt = params.founded_at ?? null;
    this.infoUrl = params.info_url ?? '';
    this.logoUrl = params.logo_url ?? '';
    this.dataSourceId = params.data_source_id;
  }
}
