import LaunchPadLocation from '@structures/launch/launchPadLocation';

export default class LaunchPad {
  /** @type {number} */
  id;

  /** @type {string} */
  name = '';

  /** @type {string} */
  wikiUrl = '';

  /** @type {string} */
  mapUrl = '';

  /** @type {number|null} */
  latitude = null;

  /** @type {number|null} */
  longitude = null;

  /** @type {LaunchPadLocation|null} */
  location = null;

  /** @type {string} */
  mapImage = '';

  /** @type {number|null} */
  totalLaunchCount = 0;

  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name ?? '';
    this.wikiUrl = params.wiki_url ?? '';
    this.mapUrl = params.map_url ?? '';
    this.latitude = params.latitude ?? null;
    this.longitude = params.longitude ?? null;
    this.location = params.location ? new LaunchPadLocation(params.location) : null;
    this.map_image = params.map_image ?? '';
    this.totalLaunchCount = params.total_launch_count ?? null;
  }
}
