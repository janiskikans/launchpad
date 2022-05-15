<template>
  <div>
    <div id="launch-location-map" class="w-full h-80"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';

export default {
  name: 'LaunchLocationMap',

  props: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    mapInstance: null,
    padMarker: null,
  }),

  computed: {
    /**
     * @returns {number[]}
     */
    padCoordinates() {
      return [this.longitude, this.latitude];
    },

    /**
     * @returns {string}
     */
    token: () => process.env.VUE_APP_MAPBOX_TOKEN,
  },

  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      mapboxgl.accessToken = this.token;

      this.mapInstance = new mapboxgl.Map({
        container: 'launch-location-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: this.padCoordinates,
        zoom: 9,
      });

      this.padMarker = new mapboxgl.Marker().setLngLat(this.padCoordinates).addTo(this.mapInstance);
    },
  },
};
</script>

<style lang="scss">
/* TODO: Lazy load? */
@import 'https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css';
</style>
