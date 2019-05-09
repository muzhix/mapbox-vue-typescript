<template>
  <mb-map
    :mapId="mapId"
    :accessToken="accessToken"
    :mapStyle="mapStyle"
    :mapOptions="mapOptions"
    @load="onMapLoaded"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MbMap from "@/components/mb-map.vue";

const mapConfig = {
    center: [116.98, 36.67],
    zoom: 5,
    minZoom: 1,
    maxZoom: 10,
    // interactive: true,
    // attributionControl: true,
    customAttribution: '© VoicerMap',
    // bearingSnap: 7,
    // scrollZoom: true,
    // maxBounds: [[-100, -90], [100, 90]],
    // boxZoom: true,
    // dragRotate: false,
    // dragPan: true,
};

@Component({
  components: {
    MbMap,
  }
})
export default class MapHome extends Vue {
  private accessToken: string =
    "pk.eyJ1IjoiaGFuYmluZ2RlIiwiYSI6ImNqbGh5a3h4bTFpZzczdnFvM2RnZ2V2bGoifQ.d1YPPTTL3KlJtfADCclSxA";
  private mapStyle: string = "mapbox://styles/mapbox/streets-v9";
  private mapId: string = "container";
  private mapOptions = mapConfig;

  public onMapLoaded(event: any) {
    console.log(`${this.mapId} map loaded`);
  }
}
</script>
