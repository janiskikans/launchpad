import * as launchpadLaunchApi from '@api/launchpadApi/launchApi';
import Launch from '@/structures/launch/launch';

/**
 * Get upcoming launches from the Launchpad API
 * @returns {Launch[]}
 */
export async function getUpcomingLaunches() {
  const response = await launchpadLaunchApi.getUpcoming();

  return getLaunchesFromApiResponse(response);
}

/**
 * Get past launches from the Launchpad API
 * @returns {Launch[]}
 */
export async function getPastLaunches() {
  const response = await launchpadLaunchApi.getPast();

  return getLaunchesFromApiResponse(response);
}

/**
 * @param {Array} response
 * @returns {Launch[]}
 */
function getLaunchesFromApiResponse(response) {
  if (!response || !response['data']) {
    throw new Error('There was a problem retrieving upcoming launches');
  }

  const results = response['data']['data'] ?? null;
  if (!results) {
    throw new Error('There was a problem retrieving upcoming launches');
  }

  return getLaunchData(results);
}

/**
 * Parse array of LaunchNew objects from raw launch data
 * @param {[]} rawLaunchData
 * @returns {Launch[]}
 */
function getLaunchData(rawLaunchData) {
  const launches = [];

  rawLaunchData.forEach(rawLaunchData => {
    launches.push(new Launch(rawLaunchData));
  });

  return launches;
}
