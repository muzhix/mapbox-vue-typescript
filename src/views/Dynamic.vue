<template>
  <div>
    <mb-map
      :mapId="mapId"
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :mapOptions="mapOptions"
      @load="onMapLoaded"
    >
      <template v-for="marker in markers">
        <mb-marker
          :coordinates="marker.center"
          :draggable="marker.draggable"
          @added="onMarkerAdded"
        >
          <!-- <v-icon slot="marker" color="blue">mdi-map-marker</v-icon> -->
        </mb-marker>
      </template>
    </mb-map>
    <button @click="addMarker" style="border: 1px solid">click to add marker Dynamically</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MbMap from "@/components/mb-map.vue";
import MbMarker from "@/components/mb-marker.vue";
import MbPopup from "@/components/mb-popup.vue";
import { MarkerOptions, LngLat, LngLatLike } from "mapbox-gl";
import { CreateElement } from "vue";

const mapConfig = {
  center: [116.98, 36.67],
  zoom: 5,
  minZoom: 1,
  maxZoom: 10,
  // interactive: true,
  // attributionControl: true,
  customAttribution: "© VoicerMap"
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
    MbMarker,
    MbPopup
  }
})
export default class Dynamic extends Vue {
  private accessToken: string =
    "pk.eyJ1IjoiaGFuYmluZ2RlIiwiYSI6ImNqbGh5a3h4bTFpZzczdnFvM2RnZ2V2bGoifQ.d1YPPTTL3KlJtfADCclSxA";
  private mapStyle: string = "mapbox://styles/mapbox/light-v10";
  private mapId: string = "container";
  private mapOptions = mapConfig;
  private center = [116.98, 36.67];
  private offset = 25;

  public onMapLoaded(event: any) {
    console.log(`${this.mapId} map loaded`);
  }

  private markers: object[] = [{
    center: this.center,
    draggable: false
  }];

  public addMarker() {
    let center = new LngLat(this.randomLng(), this.randomLat());
    this.markers.push({
      center: center,
      draggable: Math.random() > 0.5 ? true : false
    });
  }

  public onMarkerAdded(event: any) {
    let marker = event.marker;
  }

  public randomLng() {
    return 106 + Math.random() * (130 - 106);
  }
  public randomLat() {
    return 29 + Math.random() * (42 - 29);
  }
}
</script>

