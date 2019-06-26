<template>
  <v-container fluid fill-height>
    <v-layout column>
    <v-layout wrap align-center>
      <v-flex xs6 sm3 d-flex>
        <v-select v-model="style" :items="mapStyles" label="Change map style"></v-select>
      </v-flex>
      <v-flex>
        <v-btn color="primary" @click="addMarker">add marker</v-btn>
        <v-btn color="error" @click="addCustomMarker">
          <v-icon>mdi-map-marker</v-icon>add custom marker
        </v-btn>
        <v-btn @click="addPopup">display a Popup</v-btn>
      </v-flex>
    </v-layout>
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
          :color="marker.color? marker.color:'#9FA8DA'"
          @added="onMarkerAdded"
        >
          <template v-if="marker.custom">
            <v-icon slot="marker" color="red">mdi-map-marker</v-icon>
          </template>
          <template v-if="marker.popup">
            <mb-popup
              slot="popup"
              :coordinates="marker.center"
              closeButton="true"
              closeOnClick="true"
              :offset="offset"
              onlyText
            >{{marker.popuptext}}</mb-popup>
          </template>
        </mb-marker>
      </template>
    </mb-map>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MbMap from "@/components/mb-map.vue";
import MbMarker from "@/components/mb-marker.vue";
import MbPopup from "@/components/mb-popup.vue";
import { MarkerOptions, LngLat, LngLatLike } from "mapbox-gl";
import mapboxgl from "mapbox-gl";

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
  private style: string = "dark-v10";
  private mapId: string = "container";
  private mapOptions = mapConfig;
  private center = [116.98, 36.67];
  private offset = 25;

  get mapStyle() {
    return "mapbox://styles/mapbox/" + this.style;
  }

  private markers: object[] = [
    {
      center: this.center,
      draggable: false,
      color: "pink",
      popup: true,
      popuptext: "hello vm"
    }
  ];

  private mapStyles: String[] = [
    "light-v10",
    "dark-v10",
    "streets-v11",
    "satellite-v9",
    "outdoors-v11"
  ];

  private map?: mapboxgl.Map;

  public onMapLoaded(event: any) {
    console.log(`${this.mapId} map loaded`);
    this.map = event.map;
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
  public addMarker() {
    let center = new LngLat(this.randomLng(), this.randomLat());
    this.markers.push({
      center: center,
      draggable: Math.random() > 0.5 ? true : false
    });
  }
  public addCustomMarker() {
    let center = new LngLat(this.randomLng(), this.randomLat());
    this.markers.push({
      center: center,
      draggable: Math.random() > 0.5 ? true : false,
      custom: true
    });
  }

  public addPopup() {
    if (this.map) {
      var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([114.98, 36.67])
        .setHTML("<h1>Hello World!</h1>")
        .addTo(this.map);
    }
  }
}
</script>
