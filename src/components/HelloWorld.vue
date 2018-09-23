<template>
  <div class="main">
    <BaseHeader class="header"/>
    <div>{{bounds}}</div>
    <div>{{center}}</div>
    <GmapMap
      :center="{lat: 37, lng: -122}"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
      @bounds_changed="update('bounds', $event)"
      @center_changed="update('center', $event)"
      ref="map"
    >
    </GmapMap>
  </div>
</template>

<script>
import apis from '@/apis';
export default {
  name: 'HelloWorld',
  data: function(){
    return {
      bounds: null,
      center: null,
      forecasts: null,
      heatMapLayer: null
    }
  },
  computed: {
    heatMapData() {
      return this.$data.forecasts.features.map(feature => {
        return {
          location: new google.maps.LatLng(
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]),
          weight: feature.properties.value
        }
      });
    }
  },
  methods: {
    async update(field, value) {
      if(value) {
        this.$data[field] = value;
        this.$data.forecasts = await apis.Air.getForecasts(this.$data.bounds);
        this.loadHeatMap();
      }
    },
    loadHeatMap: _.debounce(function() {
      if (!this.$data.heatMapLayer) {
        this.$data.heatMapLayer = new google.maps.visualization.HeatmapLayer({
          data: this.heatMapData,
          map: this.$refs.map.$mapObject,
          options: {
            radius: 30,
            opacity: 0.4,
          }
        });
      } else {
        const newData = this.$data.heatMapLayer.getData();
        this.heatMapData.forEach(data => newData.push(data));
        this.$data.heatMapLayer.setData(newData);
      }
      this.$data.heatMapLayer.setMap(this.$refs.map.$mapObject);
    }, 500),
  }

};
</script>

<style scoped>
.main {
  grid-template-rows: 100px;
  grid-template-areas:
    "header"
    ".";
}
.header {
  grid-area: header;
}
</style>
