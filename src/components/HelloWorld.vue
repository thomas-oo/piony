<template>
  <div class="main">
    <BaseHeader class="header"/>
    <div class="content">
      <PatientList :patients="patients" class="list"/>
      <GmapMap class="map"
        :center="{lat: 0, lng: 0}"
        :zoom="3"
        map-type-id="terrain"
        style="width: 300px; height: 500px"
      >
        <GmapMarker v-for="m in markers" :key="m.id" 
          :position="m.position" 
          :draggable="m.draggable"
          @click="m.opened=!m.opened">
          <GmapInfoWindow :opened="m.opened">
            {{m.title}}
          </GmapInfoWindow>
        </GmapMarker>
      </GmapMap>
      <i class="fas fa-plus-circle clickable" v-tooltip="'Add patient'"/>
    </div>
  </div>
</template>

<script>
import apis from '@/apis';
import PatientList from './PatientList';
export default {
  name: 'HelloWorld',
  components: {PatientList},
  data: function(){
    return {
      patients: [],
    }
  },
  computed: {
    markers() {
      return this.$data.patients.map(patient => ({
        id: patient.id,
        position: {
          lat: patient.forecast.geometry.coordinates[1],
          lng: patient.forecast.geometry.coordinates[0]
        },
        opacity: 0.5,
        draggable: false,
        enabled: true,
        opened: true,
        title: `${patient.firstName} ${patient.lastName}`
      }));
    }
  },
  methods: {
  },
  async mounted() {
    const patients = await apis.Tactio.getPatients();
    const promises = patients.map(async patient => {
      patient.forecast = await apis.Air.getForecast(patient.postalCode);
      patient.address = patient.streerAdress; //spelling mistake in api
      delete patient.streerAdress;
      return patient;
    });
    this.$data.patients = await Promise.all(promises);
  },

};
</script>

<style scoped>
.main {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-areas:
    "header"
    "content";
}
.content {
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-areas:
    "list map";
}
.header {
  grid-area: header;
  margin-bottom: 1em;
}
.map {
  grid-area: map;
}
.list {
  grid-area: list;
}
.fa-plus-circle {
  position: fixed;
  right: 324px;
  bottom: 24px;
  z-index: 2;
  font-size: 2em;
}
</style>
