import * as launchpadLaunchApi from '@api/launchpadApi/launchApi';
import Launch from '@/structures/launch/launch';

/**
 * Get upcoming launches from the Launchpad API and raturn array of launches
 * @returns {Launch[]}
 */
export async function getUpcomingLaunches() {
  const response = await launchpadLaunchApi.getUpcoming();
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
