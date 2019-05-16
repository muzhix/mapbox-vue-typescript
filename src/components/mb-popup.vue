<template>
  <div style="display:none">
    <slot/>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Provide,
  Prop,
  Emit,
  Inject,
  Watch
} from "vue-property-decorator";
import mapboxgl, {
  Anchor,
  PointLike,
  LngLatLike,
  Popup,
  Marker,
  PopupOptions
} from "mapbox-gl";

@Component
export default class MbPopup extends Vue {
  private initial: boolean = true;

  private popup!: Popup;
  @Inject("handlemap") private handleMap?: any;
  @Inject("handlemarker") private handleMarker?: any;

  @Prop() private coordinates?: LngLatLike;
  @Prop() private closeButton?: boolean;
  @Prop() private closeOnClick?: boolean;
  @Prop() private anchor?: Anchor;
  @Prop() private offset?: number | PointLike | { [key: string]: PointLike };
  @Prop() private className?: string;
  @Prop({ default: false }) private onlyText!: boolean;
  @Prop({ default: false }) private showed!: boolean;

  get open(): boolean {
    if (this.popup) {
      return this.popup.isOpen();
    }
    return false;
  }
  set open(value: boolean) {
    console.log(`set open ${value}`);
    if (this.handleMap && this.popup) {
      if (value) {
        // add to map
        this.handleMap((map: mapboxgl.Map) => {
          (this.popup as Popup).addTo(map);
        });
      } else {
        this.popup.remove();
      }
    }
  }

  @Watch("coordinates")
  private onCoordinatesChanged(lngLat: LngLatLike) {
    console.log(`coordinates changed to ${lngLat.toString()}`);
    if (this.initial) {
      return;
    }
    (this.popup as Popup).setLngLat(lngLat);
  }

  @Watch("showed")
  private onShowedChanged(next: boolean, prev: boolean) {
    console.log(`showed changed to ${next}`);
    if (next != prev) {
      this.open = next;
      if (this.handleMarker) {
        this.handleMarker((marker: Marker) => {
          marker.togglePopup();
        });
      }
    }
  }

  public mounted() {
    let options = {
      ...this.$props
    };

    this.addPopup(options);
    this.initial = false;
  }

  public addPopup(options: PopupOptions) {
    this.popup = new mapboxgl.Popup(options);

    if (this.coordinates) {
      this.popup.setLngLat(this.coordinates);
    }

    if (this.$slots.default) {
      const node = this.$slots.default[0].elm as Node;
      // only text mode, display text in default Popup
      if (this.onlyText) {
        // if text
        if (node.nodeType == 3) {
          let tmpEl = document.createElement("span");
          tmpEl.appendChild(node);
          this.popup.setText(tmpEl.innerText);
        } else {
          // not text
          this.popup.setText((node as HTMLElement).innerText);
        }
      } else {
        this.popup.setDOMContent(node);
      }
    }

    if (this.handleMarker) {
      // bind to marker
      this.handleMarker((marker: Marker) => {
        marker.setPopup(this.popup);
      });
    }

    if (this.showed) {
      this.open = true;
      if (this.handleMarker) {
        this.handleMarker((marker: Marker) => {
          marker.togglePopup();
        });
      }
    }

    // emit added
    this.added();
  }

  @Emit("added")
  public added() {
    return {
      popup: this.popup
    };
  }
  @Emit("removed")
  public remove() {
    this.popup.remove();
  }
}
</script>

