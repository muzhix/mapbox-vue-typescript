<template>
  <div style="display:none">
    <!-- slot for custom marker -->
    <slot name="marker"/>
    <!-- slot for popup -->
    <slot name="popup"/>
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
import {
  Marker,
  PointLike,
  LngLatLike,
  MarkerOptions,
  Map,
  Popup
} from "mapbox-gl";

@Component
export default class MbMarker extends Vue {
  private initial: boolean = true;

  private marker: Marker = this.marker;
  @Inject("handlemap") handlemap!: any;

  @Prop() private offset?: PointLike;
  @Prop({ required: true }) private coordinates!: LngLatLike;
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

  public addMarkerToMap(options: MarkerOptions) {
    // handle customed marker
    if (this.$slots.marker) {
      console.log("customed marker");
      console.log(this.$slots);
      console.log(this.$slots.marker[0].elm);
      options.element = this.$slots.marker[0].elm as HTMLElement;
    }
    this.marker = new Marker(options).setLngLat(this.coordinates);
    // append marker to map
    this.handlemap((map: Map) => {
      this.marker.addTo(map);
    });

    // TODO handle marker popup
    // if (this.$slots.popup) {
    //   let popupDom = this.$slots.popup[0].elm as Node;
    //   let popup = new Popup().setDOMContent(popupDom);
    // }
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

  @Provide("handlemarker")
  public handleMarker(found: (marker: Marker) => void) {
    let vm = this;
    function checkForMarker() {
      if (vm.marker) {
        found(vm.marker);
      } else {
        // waiting for map load
        setTimeout(checkForMarker, 50);
      }
    }
    checkForMarker();
  }
}
</script>
