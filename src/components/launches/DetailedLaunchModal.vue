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
        <div v-if="launch.launchServiceProvider">
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
              <div class="flex flex-row items-center">
                <span class="pr-1">
                  {{ launch.launchServiceProvider.country ? launch.launchServiceProvider.country : 'Not specified' }}
                </span>
                <country-flag
                  v-if="launch.launchServiceProvider.country"
                  :country="launch.launchServiceProvider.country"
                  size="small"
                />
              </div>
            </article>
          </div>
        </div>
        <div v-else>
          No provider information provided
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
            <text-collapse
              :text-content="launch.mission.description ? launch.mission.description : 'Not specified'"
              class="mt-2"
            />
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

      <card title="Map" class="col-span-3 md:col-span-full">
        <LaunchLocationMap :longitude="launch.pad.longitude" :latitude="launch.pad.latitude" />
      </card>

      <card title="Videos & Livestreams" icon="videocam-outline" class="col-span-3 md:col-span-full">
        <video-grid v-if="launch.externalUrls.length" :video-links="launch.externalUrls" class="my-2" />
        <p v-else>
          No videos or livestreams available for this launch
        </p>
      </card>
    </div>
  </div>
</template>

<script>
import Card from '@components/ui/Card';
import { format } from 'date-fns';
import { LAUNCH_COUNTDOWN_FORMAT } from '@helpers/dateHelper';
import LaunchStatusBadge from '@components/launches/LaunchStatusBadge';
import placeholderImageUrl from '@assets/images/launchpad_image_placeholder.png';
import Launch from '@/structures/launch/launch';
import VideoGrid from '@components/ui/VideoGrid';
import TextCollapse from '@components/ui/TextCollapse';
import CountryFlag from 'vue-country-flag';
import LaunchLocationMap from '@components/launches/LaunchLocationMap';

export default {
  name: 'DetailedLaunchModal',

  components: {
    Card,
    LaunchStatusBadge,
    VideoGrid,
    TextCollapse,
    CountryFlag,
    LaunchLocationMap,
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
