<template>
  <div class="mgl-map-wrapper">
    <div v-once :id="mapId" ref="container" />
    <slot v-if="initialized"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide, Prop, Emit } from "vue-property-decorator";
import mapboxgl from "mapbox-gl";

@Component
export default class MbMap extends Vue {
  initial: boolean = true;
  initialized: boolean = false;

  @Prop({ required: true }) private mapId!: string;
  @Prop({ default: "mapbox://styles/mapbox/streets-v9" })
  private mapStyle!: string;
  @Prop({ required: true }) private accessToken!: string;
  @Prop({ default: null }) private mapOptions!: mapboxgl.MapboxOptions;

  @Provide("map")
  map: mapboxgl.Map = this.map;

  public mounted() {
    mapboxgl.accessToken = this.accessToken;
    let map = new mapboxgl.Map({
      ...this.mapOptions,
      container: this.mapId || this.$refs.container,
      style: this.mapStyle
    } as mapboxgl.MapboxOptions);
    map.on("load", () => {
      console.log('init map:');
      console.log(map);
      this.map = map;
      this.initial = false;
      this.initialized = true;
      this.mapLoaded();
    });
  }

  @Emit("load") public mapLoaded() {
    return {
      map: this.map,
      component: this
    };
  }
}
</script>

<style>
@import url('//api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.css');

.mgl-map-wrapper {
  height: 500px;
  position: relative;
  width: 100%;
}
.mgl-map-wrapper .mapboxgl-map {
  height: 100%;
  /* left: 0; */
  /* position: absolute; */
  /* top: 0; */
  width: 100%;
}
</style>

