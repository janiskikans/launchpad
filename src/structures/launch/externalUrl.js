export default class ExternalUrl {
  /** @type {number} */
  id;

  /** @type {number} */
  launchId;

  /** @type {string} */
  type;

  /** @type {string} */
  title = '';

  /** @type {string} */
  description = '';

  /** @type {string} */
  previewImageUrl = '';

  /** @type {string} */
  url;

  constructor(params = {}) {
    this.id = params.id;
    this.launchId = params.launch_id;
    this.type = params.type;
    this.title = params.title ?? '';
    this.description = params.description ?? '';
    this.previewImageUrl = params.preview_image_url ?? '';
    this.url = params.url;
  }
}
