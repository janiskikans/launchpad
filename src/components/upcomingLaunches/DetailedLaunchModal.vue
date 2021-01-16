<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
      <img :src="launch.image" :alt="launch.name" class="rounded-lg" />

      <card title="General">
        <div class="space-y-2 mt-0">
          <article>
            <h3 class="font-bold">Name</h3>
            <p>
              {{ launch.name }}
            </p>
          </article>
          <article>
            <h3 class="font-bold">In Hold</h3>
            <p>
              {{ launch.inHold ? 'Yes' : 'No' }}
            </p>
          </article>
          <article>
            <h3 class="font-bold">Launch Window Start</h3>
            <p>{{ launchWindowStart }}</p>
          </article>
          <article>
            <h3 class="font-bold">Launch Window End</h3>
            <p>{{ launchWindowEnd }}</p>
          </article>
        </div>
      </card>

      <card title="Launch Provider">
        <div class="space-y-2 mt-0">
          <article>
            <h3 class="font-bold">Name</h3>
            <p>
              {{ launch.launchServiceProvider.name }}
            </p>
          </article>
          <article>
            <h3 class="font-bold">Type</h3>
            <p>
              {{ launch.launchServiceProvider.type ? launch.launchServiceProvider.type : 'Not specified' }}
            </p>
          </article>
        </div>
      </card>

      <card title="Mission">
        <div v-if="launch.mission" class="space-y-2">
          <article>
            <h3 class="font-bold">Name</h3>
            <p>
              {{ launch.mission.name }}
            </p>
          </article>
          <article>
            <h3 class="font-bold">Type</h3>
            <p>
              {{ launch.mission.type }}
            </p>
          </article>
          <article>
            <h3 class="font-bold">Description</h3>
            <p>
              {{ launch.mission.description ? launch.mission.description : 'Not specified' }}
            </p>
          </article>
          <article>
            <h3 class="font-bold">Orbit</h3>
            <p>
              {{ launch.mission.orbit && launch.mission.orbit.name ? launch.mission.orbit.name : 'Not specified' }}
            </p>
          </article>
        </div>
        <div v-else>
          No mission information provided
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import Launch from '@structures/launch/launch';
import Card from '@components/ui/Card';
import { format } from 'date-fns';
import { LAUNCH_COUNTDOWN_FORMAT } from '@helpers/dateHelper';

export default {
  name: 'DetailedLaunchModal',

  components: {
    Card,
  },

  props: {
    launch: {
      type: Launch,
      required: true,
    },
  },

  computed: {
    /**
     * @return {string}
     */
    launchWindowStart() {
      return format(this.launch.windowStart, LAUNCH_COUNTDOWN_FORMAT);
    },

    /**
     * @return {string}
     */
    launchWindowEnd() {
      return format(this.launch.windowEnd, LAUNCH_COUNTDOWN_FORMAT);
    },
  },
};
</script>
