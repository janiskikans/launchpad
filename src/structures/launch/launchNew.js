import { differenceInHours, isEqual } from 'date-fns';
import DataSource from '@structures/dataSource';
import LaunchMissionNew from '@structures/launch/launchMissionNew';
import LaunchPadNew from '@structures/launch/launchPadNew';
import LaunchServiceProviderNew from '@structures/launch/launchServiceProviderNew';

export default class LaunchNew {
  /** @type {number} */
  id;

  /** @type {string} */
  name;

  /** @type {string} */
  slug;

  /** @type {Date} */
  net;

  /** @type {Date|null} */
  windowEnd = null;

  /** @type {Date|null} */
  windowStart = null;

  /** @type {string} */
  status;

  /** @type {string} */
  image = '';

  /** @type {DataSource} */
  dataSource;

  /** @type {LaunchServiceProviderNew|null} */
  launchServiceProvider = null;

  /** @type {LaunchMissionNew|null} */
  mission = null;

  /** @type {LaunchPad|null} */
  pad = null;

  constructor(params = {}) {
    this.id = params.id;
    this.name = params.name;
    this.slug = params.slug;
    this.net = new Date(params.net);
    this.windowStart = params.window_start ? new Date(params.window_start) : null;
    this.windowEnd = params.window_end ? new Date(params.window_end) : null;
    this.status = params.status;
    this.image = params.image_url ?? '';
    this.dataSource = new DataSource(params.data_source);
    this.launchServiceProvider = new LaunchServiceProviderNew(params.launch_provider);
    this.mission = params.mission ? new LaunchMissionNew(params.mission) : null;
    this.pad = params.launch_pad ? new LaunchPadNew(params.launch_pad) : null;
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
