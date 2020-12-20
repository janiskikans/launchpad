import Orbit from '@structures/orbit';

export default class LaunchMission {
  /** @type {number|null} */
  launchLibraryId = null;

  /** @type {string} */
  name = '';

  /** @type {string} */
  description = '';

  /** @type {string} */
  launchDesignator = '';

  /** @type {string} */
  type = '';

  /** @type {Orbit|null} */
  orbit = null;

  constructor(params = {}) {
    this.launchLibraryId = params.launch_library_id ?? null;
    this.name = params.name ?? '';
    this.description = params.description ?? '';
    this.launchDesignator = params.launch_designator ?? '';
    this.type = params.type ?? '';
    this.orbit = params.orbit ? new Orbit(params.orbit) : null;
  }
}
