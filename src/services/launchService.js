// import * as launchApi from '@api/launchLibraryApi/launchApi';
import Launch from '@structures/launch/launch';

import upcomingLaunchData from '../../testData/upcoming.json';

/**
 * Get upcoming launches from API and return array of launches
 * @param {number} count
 * @return {Launch[]}
 */
export async function getUpcomingLaunches(count = 5) {
  // const queryParams = new URLSearchParams();
  // queryParams.append('limit', count);

  // const response = await launchApi.getUpcoming(queryParams);

  // if (!response || !response['results']) {
  //   throw new Error('There was a problem retrieving upcoming launches');
  // }

  const rawLaunches = upcomingLaunchData['results'];

  const launches = [];
  rawLaunches.forEach(rawLaunchData => {
    launches.push(new Launch(rawLaunchData));
  });

  return launches;
}
