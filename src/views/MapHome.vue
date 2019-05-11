<template>
  <div>
    <mb-map
      :mapId="mapId"
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :mapOptions="mapOptions"
      @load="onMapLoaded"
    >
      <mb-marker :coordinates="center" draggable="true" @added="onMarkerAdded">
        <!-- <v-icon slot="marker" color="blue">mdi-map-marker</v-icon> -->
        <mb-popup
          slot="popup"
          :coordinates="center"
          closeButton="true"
          closeOnClick="true"
          :offset="offset"
        >
          <v-card>
            <div>Hello, I'm popup!</div>
          </v-card>
        </mb-popup>
      </mb-marker>
    </mb-map>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import MbMap from "@/components/mb-map.vue";
import MbMarker from "@/components/mb-marker.vue";
import MbPopup from "@/components/mb-popup.vue";

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
export default class MapHome extends Vue {
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

  public onMarkerAdded(event: any) {
    let marker = event.marker;
  }
}
</script>
