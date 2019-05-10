<template>
  <!-- style="display:none" -->
  <div>
    <!-- slot for custom marker -->
    <slot name="marker"></slot>
    <!-- slot for popup -->
    <slot name="popup"></slot>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Provide,
  Prop,
  Emit,
  Inject
} from "vue-property-decorator";
import mapboxgl from "mapbox-gl";

@Component
export default class MbMarker extends Vue {
  private initial: boolean = true;

  @Provide() private marker: mapboxgl.Marker = this.marker;
  @Inject("handlemap") handlemap!: any;

  @Prop() private offset?: mapboxgl.PointLike;
  @Prop({ required: true }) private coordinates!: mapboxgl.LngLatLike;
  @Prop() private color?: string;
  @Prop() private anchor?: string;
  @Prop() private draggable?: boolean;

  public mounted() {
    // init options
    let options = {
      ...this.$props
    };

    this.addMarkerToMap(options);

    // end initial
    this.initial = false;
    this.added();
  }

  public addMarkerToMap(options: mapboxgl.MarkerOptions) {
    // handle customed marker
    if (this.$slots.marker) {
      console.log("customed marker");
      console.log(this.$slots.marker[0]);
      options.element = this.$slots.marker[0].elm as HTMLElement;
    }
    console.log(options);
    this.marker = new mapboxgl.Marker(options).setLngLat(this.coordinates);
    // append marker to map
    this.handlemap((map: mapboxgl.Map) => {
      this.marker.addTo(map);
    });

    // TODO handle marker popup
    if (this.$slots.popup) {
      let popupDom = this.$slots.popup[0].elm as Node;
      let popup = new mapboxgl.Popup().setDOMContent(popupDom);
    }
  }

  @Emit("removed")
  public remove() {
    this.marker.remove();
  }

  @Emit("added")
  public added() {
    return {
      marker: this.marker
    };
  }
}
</script>
