<template>
  <div class="list">
    <div class="list-header">
       <div class="column" v-for="header in headers" :key="header">
         {{header}}
       </div>
       <i class="fas fa-fw">&nbsp;</i>
    </div>
    <PatientRow v-for="patient in patients"
      :key="patient.id" :patient="patient"/>
  </div>
</template>

<script>
import PatientRow from './PatientRow';
export default {
  name: 'PatientList',
  components: {PatientRow},
  data() {
    return {
      headers: ['First name', 'Last name', 'Conditions', 'Address', 'City', 'State', 'Postal code', 'Status']
    }
  },
  props: {
    patients: {
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  display: grid;
  grid-auto-columns: auto;
  grid-template-rows: min-content;
  grid-template-areas: 
    "list-header"
    "row"
}
.list-header {
  display: grid;
  grid-template-columns: repeat(8, minmax(0,1fr)) min-content;
};

.column:first-child {
  border-left: 1px solid black;
}
.column {
  border-right: 1px solid black;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
