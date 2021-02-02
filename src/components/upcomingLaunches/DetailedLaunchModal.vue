<template>
  <div class="detailed-launch-modal">
    <div class="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-9 gap-4 py-2">
      <!-- <img :src="launch.image" :alt="launch.name" class="rounded-lg col-span-3" /> -->
      <div
        class="detailed-launch-modal__launch-image rounded-lg col-span-3 row-span-2 h-96 md:h-auto"
        :style="{ backgroundImage: 'url(' + launch.image + ')' }"
      ></div>

      <card title="General" class="col-span-3">
        <div class="space-y-2 mt-0">
          <article>
            <h3 class="font-bold">Name</h3>
            <p>{{ launch.name }}</p>
          </article>
          <article>
            <h3 class="font-bold">In Hold</h3>
            <p>{{ launch.inHold ? 'Yes' : 'No' }}</p>
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

      <card title="Launch Provider" class="col-span-3">
        <div class="space-y-2 mt-0">
          <article>
            <h3 class="font-bold">Name</h3>
            <p>{{ launch.launchServiceProvider.name }}</p>
          </article>
          <article>
            <h3 class="font-bold">Type</h3>
            <p>{{ launch.launchServiceProvider.type ? launch.launchServiceProvider.type : 'Not specified' }}</p>
          </article>
        </div>
      </card>

      <card title="Mission" class="col-span-3">
        <div v-if="launch.mission" class="space-y-2">
          <article>
            <h3 class="font-bold">Name</h3>
            <p>{{ launch.mission.name }}</p>
          </article>
          <article>
            <h3 class="font-bold">Type</h3>
            <p>{{ launch.mission.type }}</p>
          </article>
          <article>
            <h3 class="font-bold">Orbit</h3>
            <p>{{ launch.mission.orbit && launch.mission.orbit.name ? launch.mission.orbit.name : 'Not specified' }}</p>
          </article>
          <article>
            <h3 class="font-bold">Description</h3>
            <p>{{ launch.mission.description ? launch.mission.description : 'Not specified' }}</p>
          </article>
        </div>
        <div v-else>
          No mission information provided
        </div>
      </card>

      <card title="Launch Location" class="col-span-3">
        <div v-if="launch.pad" class="space-y-2">
          <article>
            <h3 class="font-bold">Location</h3>
            <p>{{ launch.pad.location.name }}</p>
          </article>
          <article>
            <h3 class="font-bold">Pad</h3>
            <p>{{ launch.pad.name }}</p>
          </article>
        </div>
        <div v-else>
          No launch pad information provided
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

<style lang="scss">
.detailed-launch-modal {
  &__launch-image {
    @apply bg-cover bg-no-repeat bg-center;
  }
}
</style>
