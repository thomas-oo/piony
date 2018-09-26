<template>
  <div class="main">
    <BaseHeader class="header"/>
    <div class="content">
      <PatientList :patients="patients" class="patients"
      @add="patients.splice($event, 0, {})"
      @edit="editPatient"
      @delete="deletePatient"/>
      <GmapMap class="map"
        :center="{lat: 0, lng: 0}"
        :zoom="3"
        map-type-id="terrain"
        style="width: 300px; height: 500px"
      >
        <GmapMarker v-for="m in markers" :key="m.id" 
          :position="m.position" 
          :draggable="m.draggable"
          :options="{icon: m.icon, title: m.score}"
          @click="m.opened=!m.opened">
          <GmapInfoWindow :opened="m.opened">
            {{m.title}}
          </GmapInfoWindow>
        </GmapMarker>
      </GmapMap>
    </div>
  </div>
</template>

<script>
import apis from '@/apis';
import PatientList from './PatientList';
import utils from '@/utils';
export default {
  name: 'PIoNY',
  components: {PatientList},
  data: function(){
    return {
      patients: [],
    }
  },
  computed: {
    markers() {
      return this.$data.patients.filter(p => p.forecast)
      .map(patient => {
        const score = ''+_.round(patient.forecast.properties.value, 2);
        const code = patient.forecast.properties.code;
        const icon = `http://maps.google.com/mapfiles/ms/icons/${utils.codeColor(code)}-dot.png`
        return {
          id: patient.id,
          position: {
            lat: patient.forecast.geometry.coordinates[1],
            lng: patient.forecast.geometry.coordinates[0]
          },
          opacity: 0.5,
          draggable: false,
          enabled: true,
          opened: true,
          title: `${patient.firstName} ${patient.lastName}`,
          score,
          icon
        }
      });
    }
  },
  methods: {
    editPatient(index, patient) {
      this.$data.patients.splice(index, 1, patient);
    },
    deletePatient(index) {
      this.$data.patients.splice(index, 1);
    }
  },
  async mounted() {
    const patients = await apis.Tactio.getPatients();
    const promises = patients.map(async patient => {
      patient.forecast = await apis.Air.getForecast(patient.postalCode);
      patient.address = patient.streerAdress; //spelling mistake in api
      delete patient.streerAdress;
      patient.editing = false;
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
    "patients map";
}
.header {
  grid-area: header;
  margin-bottom: 1em;
}
.map {
  grid-area: map;
}
.patients {
  grid-area: patients;
  grid-auto-rows: min-content;
}
</style>
