<template>
  <div class="detailed-launch-modal">
    <div class="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-9 gap-4">
      <div class="col-span-3 row-span-2 h-96 md:h-auto relative">
        <div
          class="detailed-launch-modal__launch-image rounded-lg"
          :style="{ backgroundImage: 'url(' + launch.image + ')' }"
          :title="launch.name"
        ></div>
        <div
          :style="{ backgroundImage: 'url(' + placeholderImage + ')' }"
          class="detailed-launch-modal__launch-placeholder-image rounded-lg"
        ></div>
        <launch-status-badge
          :launch-status="launch.status"
          :respond-to-dark-mode="false"
          class="absolute top-10 left-10 z-20"
        />
      </div>

      <card title="General" class="col-span-3">
        <div class="space-y-2 mt-0">
          <article>
            <h3 class="font-bold">Name</h3>
            <p>{{ launch.name }}</p>
          </article>
          <article>
            <h3 class="font-bold">Window Start</h3>
            <p>{{ launchWindowStart }}</p>
          </article>
          <article>
            <h3 class="font-bold">Window End</h3>
            <p>{{ launchWindowEnd }}</p>
          </article>
        </div>
      </card>

      <card title="Provider" class="col-span-3">
        <div class="space-y-2 mt-0">
          <article>
            <h3 class="font-bold">Name</h3>
            <p>{{ launch.launchServiceProvider.name }}</p>
          </article>
          <article>
            <h3 class="font-bold">Type</h3>
            <p>{{ launch.launchServiceProvider.type ? launch.launchServiceProvider.type : 'Not specified' }}</p>
          </article>
          <article>
            <h3 class="font-bold">Country</h3>
            <p>{{ launch.launchServiceProvider.country ? launch.launchServiceProvider.country : 'Not specified' }}</p>
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
            <p>
              {{ launch.mission.orbit ? launch.mission.orbit : 'Not specified' }}
            </p>
          </article>
          <article>
            <h3 class="font-bold">Description</h3>
            <p>{{ launch.mission.description ? launch.mission.description : 'Not specified' }}</p>
          </article>
        </div>
        <div v-else>
          No mission information available
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
          No launch pad information available
        </div>
      </card>

      <card title="Videos/Livestreams" icon="videocam-outline" class="col-span-full">
        <div v-if="launch.externalUrls.length">
          <ul class="space-y-2">
            <li v-for="url in launch.externalUrls" :key="url.id">
              <better-link :href="url.url" :text="url.title" is-external />
            </li>
          </ul>
        </div>
        <div v-else>
          No videos or livestreams available
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import Card from '@components/ui/Card';
import { format } from 'date-fns';
import { LAUNCH_COUNTDOWN_FORMAT } from '@helpers/dateHelper';
import LaunchStatusBadge from '@components/upcomingLaunches/launchStatusBadge';
import placeholderImageUrl from '@assets/images/launchpad_image_placeholder.png';
import Launch from '@/structures/launch/launch';
import BetterLink from '@components/utils/BetterLink.vue';

export default {
  name: 'DetailedLaunchModal',

  components: {
    Card,
    LaunchStatusBadge,
    BetterLink,
  },

  props: {
    launch: {
      type: Launch,
      required: true,
    },
  },

  data() {
    return {
      placeholderImage: placeholderImageUrl,
    };
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
    @apply bg-cover bg-no-repeat bg-center w-full h-full absolute z-10;
  }

  &__launch-placeholder-image {
    @apply bg-cover bg-no-repeat bg-center w-full h-full;
  }
}
</style>
