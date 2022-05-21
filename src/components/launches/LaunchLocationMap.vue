<template>
  <div>
    <div :id="mapElementId" :class="classes"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import LaunchPad from '@structures/launch/launchPad';

export default {
  name: 'LaunchLocationMap',

  props: {
    pad: {
      type: LaunchPad,
      required: true,
    },
    classes: {
      type: String,
      required: false,
      default: 'w-full h-80 rounded-lg',
    },
  },

  data: () => ({
    mapElementId: 'launch-location-map',
    mapInstance: null,
    padMarker: null,
  }),

  computed: {
    /** @returns {number[]} */
    padCoordinates() {
      return [this.pad.longitude, this.pad.latitude];
    },

    /** @returns {string} */
    markerPopupContent() {
      let contentHtml = `<h1 class="font-bold text-center">${this.pad.name}</h1>`;

      if (this.pad.location && this.pad.location.name) {
        contentHtml += `<p class="text-center">${this.pad.location.name}</p>`;
      }

      return contentHtml;
    },
  },

  mounted() {
    this.initMap();
  },

  methods: {
    initMap() {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN;

      this.mapInstance = new mapboxgl.Map({
        container: this.mapElementId,
        style: 'mapbox://styles/mapbox/dark-v10',
        center: this.padCoordinates,
        zoom: 6,
      });

      this.padMarker = new mapboxgl.Marker({ color: '#D3CFCE' })
        .setLngLat(this.padCoordinates)
        .setPopup(this.getMarkerPopup())
        .addTo(this.mapInstance);

      this.padMarker.togglePopup();
    },

    getMarkerPopup() {
      return new mapboxgl.Popup({ closeButton: false }).setHTML(this.markerPopupContent);
    },
  },
};
</script>

<style lang="scss">
@import 'https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css';
</style>
