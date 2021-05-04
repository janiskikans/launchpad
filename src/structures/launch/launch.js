import LaunchStatus from '@structures/launch/launchStatus';
import LaunchServiceProvider from '@structures/launch/launchServiceProvider';
import LaunchMission from '@structures/launch/launchMission';
import { differenceInHours, isEqual } from 'date-fns';
import LaunchPad from '@structures/launch/launchPad';

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

  /** @type {LaunchPad|null} */
  pad = null;

  constructor(params = {}) {
    this.launchLibraryId = params.launch_library_id ?? null;
    this.name = params.name ?? '';
    this.status = new LaunchStatus(params.status);
    this.net = params.net ? new Date(params.net) : null;
    this.windowStart = params.window_start ? new Date(params.window_start) : null;
    this.windowEnd = params.window_end ? new Date(params.window_end) : null;
    this.inHold = params.inHold ?? false;
    this.image = params.image ?? '';
    this.launchServiceProvider = params.launch_service_provider
      ? new LaunchServiceProvider(params.launch_service_provider)
      : null;
    this.mission = params.mission ? new LaunchMission(params.mission) : null;
    this.pad = params.pad ? new LaunchPad(params.pad) : null;
  }

  /**
   * @return {number}
   */
  getDistanceFromNowInHours() {
    return differenceInHours(this.net, Date.now());
  }

  /**
   * Returns whether launch windowStart and windowEnd are equal
   * @return {boolean}
   */
  hasMatchingLaunchWindowTimes() {
    return isEqual(this.windowStart, this.windowEnd);
  }
}
