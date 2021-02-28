import * as launchApi from '@api/launchLibraryApi/launchApi';
import Launch from '@structures/launch/launch';
import { addHours, isPast, getUnixTime, fromUnixTime } from 'date-fns';

import upcomingLaunchData from '../../testData/upcoming.json';

const UPCOMING_LAUNCH_STORE_KEY = 'upcomingLaunchData';
const CACHE_DURATION_IN_HOURS = 1;

/**
 * Get upcoming launches from API and return array of launches
 * @return {Launch[]}
 */
export async function getUpcomingLaunches() {
  // Attempt to retrieve stored raw upcoming launch data
  let rawLaunchData = getStoredUpcomingLaunches();

  // If no stored raw launch data can be found fetch new from API
  if (!rawLaunchData || !rawLaunchData.length) {
    const response = await launchApi.getUpcoming();
    if (!response || !response['data']) {
      throw new Error('There was a problem retrieving upcoming launches');
    }

    const results = response['data']['results'] ?? null;
    if (!results) {
      throw new Error('There was a problem retrieving upcoming launches');
    }

    storeRawUpcomingLaunchData(results);

    return getLaunchData(results);
  }

  return getLaunchData(rawLaunchData);
}

/**
 * Get upcoming launches from local JSON test data. Should be used for retrieving data
 * while on development environment, to minimize external API request count.
 * @return {Launch[]}
 */
export async function getUpcomingLaunchesFromTestData() {
  // Attempt to retrieve stored raw upcoming launch data
  let rawLaunchData = getStoredUpcomingLaunches();

  // If no stored raw launch data can be found fetch new from API
  if (!rawLaunchData || !rawLaunchData.length) {
    storeRawUpcomingLaunchData(upcomingLaunchData['results']);

    return getLaunchData(upcomingLaunchData['results']);
  }

  return getLaunchData(rawLaunchData);
}

/**
 * Attempt to retrieve stored raw upcoming launch data. If it's expired then return an empty array
 * @return {array}
 */
function getStoredUpcomingLaunches() {
  try {
    let upcomingLaunchData = localStorage.getItem(UPCOMING_LAUNCH_STORE_KEY);
    if (!upcomingLaunchData) {
      return [];
    }

    upcomingLaunchData = JSON.parse(upcomingLaunchData);

    // If data is expired we consider it expired and return empty array
    const expiresAt = fromUnixTime(upcomingLaunchData.expiresAt);
    if (isPast(expiresAt)) {
      return [];
    }

    return upcomingLaunchData.rawLaunchData;
  } catch (e) {
    console.error('Local storage is not supported');
  }
}

/**
 * Store raw upcoming launch data in local storage with an expiration time
 * @param {array} rawLaunchData
 */
function storeRawUpcomingLaunchData(rawLaunchData) {
  const upcomingLaunchData = {
    rawLaunchData,
    expiresAt: getUnixTime(addHours(Date.now(), CACHE_DURATION_IN_HOURS)),
  };

  try {
    localStorage.setItem(UPCOMING_LAUNCH_STORE_KEY, JSON.stringify(upcomingLaunchData));
  } catch (e) {
    console.error('Local storage is not supported');
  }
}

/**
 * Parse array of launches from raw launch data
 * @param {[]} rawLaunchData
 * @return {Launch[]}
 */
function getLaunchData(rawLaunchData) {
  const launches = [];

  rawLaunchData.forEach(rawLaunchData => {
    launches.push(new Launch(rawLaunchData));
  });

  return launches;
}
