<template>
  <div class="mgl-map-wrapper">
    <div v-once :id="mapId" ref="container"/>
    <slot v-if="initialized"/>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Provide,
  Prop,
  Emit,
  Watch
} from "vue-property-decorator";
import mapboxgl from "mapbox-gl";

@Component
export default class MbMap extends Vue {
  public initial: boolean = true;
  public initialized: boolean = false;

  private map?: mapboxgl.Map = undefined;

  @Prop({ required: true }) private mapId!: string;
  @Prop({ default: "mapbox://styles/mapbox/streets-v9" })
  private mapStyle!: string;
  @Prop({ required: true }) private accessToken!: string;
  @Prop({ default: null }) private mapOptions!: mapboxgl.MapboxOptions;

  public mounted() {
    mapboxgl.accessToken = this.accessToken;
    const map = new mapboxgl.Map({
      ...this.mapOptions,
      container: this.mapId || this.$refs.container,
      style: this.mapStyle
    } as mapboxgl.MapboxOptions);
    map.on("load", () => {
      this.map = map;
      this.initial = false;
      this.initialized = true;
      this.mapLoaded();
      // this.addMarker();
    });
  }

  @Emit('load') public mapLoaded() {
    return {
      map: this.map,
      component: this,
    };
  }

  @Watch('mapStyle')
  public onMapStyleChanged(nextStyle: string, prev: string) {
    if (nextStyle !== prev) {
      (this.map as mapboxgl.Map).setStyle(nextStyle);
    }
  }

  @Provide('handlemap')
  public handlemap(found: (map: mapboxgl.Map) => void) {
    const vm = this;
    function checkForMap() {
      if (vm.map) {
        found(vm.map);
      } else {
        // waiting for map load
        setTimeout(checkForMap, 50);
      }
    }
    checkForMap();
  }

  public addMarker() {
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat(this.mapOptions.center as mapboxgl.LngLatLike)
      .addTo(this.map as mapboxgl.Map);
  }
}
</script>

<style>
@import url("//api.tiles.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.css");

.mgl-map-wrapper {
  height: 100%;
  position: relative;
  width: 100%;
}
.mgl-map-wrapper .mapboxgl-map {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

