<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
      <img :src="launch.image" :alt="launch.name" class="rounded-lg" />

      <card title="General info">
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
        </div>
      </card>

      <card title="Launch provider">
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

      <card title="Mission information">
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
};
</script>
