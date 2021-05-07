import { differenceInHours, isEqual } from 'date-fns';
import DataSource from '@structures/dataSource';
import LaunchMission from '@structures/launch/launchMission';
import LaunchPad from '@structures/launch/launchPad';
import LaunchServiceProvider from '@structures/launch/launchServiceProvider';
import ExternalUrl from '@structures/launch/externalUrl';

export default class Launch {
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

  /** @type {LaunchServiceProvider|null} */
  launchServiceProvider = null;

  /** @type {LaunchMission|null} */
  mission = null;

  /** @type {LaunchPad|null} */
  pad = null;

  /** @type {ExternalUrl[]} */
  externalUrls = [];

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
    this.launchServiceProvider = new LaunchServiceProvider(params.launch_provider);
    this.mission = params.mission ? new LaunchMission(params.mission) : null;
    this.pad = params.launch_pad ? new LaunchPad(params.launch_pad) : null;

    if (params.external_urls && params.external_urls.length) {
      this.setExternalUrls(params.external_urls);
    }
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

  /**
   * @param {[{}]} externalUrls
   */
  setExternalUrls(externalUrls) {
    externalUrls.forEach(externalUrl => this.externalUrls.push(new ExternalUrl(externalUrl)));
  }
}
