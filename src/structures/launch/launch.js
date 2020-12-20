import LaunchStatus from '@structures/launch/launchStatus';
import LaunchServiceProvider from '@structures/launch/launchServiceProvider';
import LaunchMission from '@structures/launch/launchMission';

export default class Launch {
  /** @type {number|null} */
  launchLibraryId = null;

  /** @type {string} */
  name = '';

  /** @type {LaunchStatus|null} */
  status = null;

  /** @type {Date|null} */
  net = null;

  /** @type {Date|null} */
  windowEnd = null;

  /** @type {Date|null} */
  windowStart = null;

  /** @type {boolean} */
  inHold = false;

  /** @type {string} */
  image = '';

  /** @type {LaunchServiceProvider|null} */
  launchServiceProvider = null;

  /** @type {LaunchMission|null} */
  mission = null;

  constructor(params = {}) {
    this.launchLibraryId = params.launch_library_id ?? null;
    this.name = params.name ?? '';
    this.status = new LaunchStatus(params.status);
    this.net = params.net ? new Date(params.net) : null;
    this.windowEnd = params.window_start ? new Date(params.window_start) : null;
    this.windowStart = params.window_end ? new Date(params.window_end) : null;
    this.inHold = params.inHold ?? false;
    this.image = params.image ?? '';
    this.launchServiceProvider = new LaunchServiceProvider(params.launch_service_provider);
    this.mission = params.mission ? new LaunchMission(params.mission) : null;
  }
}
