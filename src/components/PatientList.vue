<template>
  <div class="list">
    <input class="input" v-model="search" placeholder="Search here by patient id"/>
    <div class="column" v-for="header in headers" :key="header">
      {{header}}
    </div>
    <i class="fas fa-fw">&nbsp;</i>
    <PatientRow class="row" v-for="(patient, index) in filteredPatients"
      :key="patient.id"
      :patient="patient"
      :editing="editing[index]"
      :conditions="conditions"
      @cancel="setEditing(index, false)"
      @edit="setEditing(index, true)"
      @submit="submit(index, $event)"
      @delete="$emit('delete', index)"/>
    <i class="fas fa-plus-circle clickable" v-tooltip="'Add patient'" @click="addPatient"/>
  </div>
</template>

<script>
import PatientRow from './PatientRow';
import apis from '@/apis';
export default {
  name: 'PatientList',
  components: { PatientRow },
  props: {
    patients: {
      required: true
    }
  },
  data() {
    return {
      headers: ['First name', 'Last name', 'Conditions', 'Address', 'City', 'State', 'Postal code', 'Status'],
      editing: [],
      conditions: [],
      search: ''
    }
  },
  computed: {
    filteredPatients() {
      return this.patients.filter(p => p.id.toString().includes(this.$data.search));
    }
  },
  methods: {
    submit(index, newPatient) {
      this.$emit('edit', index, newPatient);
      this.$set(this.$data.editing, index, false);
    },
    setEditing(index, val) {
      this.$set(this.$data.editing, index, val);
    },
    addPatient() {
      this.$emit('add', 0);
      this.editing.splice(0, 0, true);
    },
  },
  async mounted() {
    this.$data.conditions = await apis.Tactio.getConditions();
  }
}
</script>

<style scoped lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(8, minmax(min-content, 1fr)) min-content;
  grid-auto-rows: min-content;
  margin-right: 10px;
}
.row {
  display: contents;
  /deep/ div:first-child {
    border-left: 1px solid gray;
  }
  /deep/ div:last-child {
    border: unset;
  }
  /deep/ div {
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
  }
}

.column:first-of-type {
  border-left: 1px solid gray;
}
.column {
  border-right: 1px solid gray;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  margin-top: 10px;
}
.fa-plus-circle {
  position: fixed;
  right: 324px;
  bottom: 24px;
  z-index: 2;
  font-size: 2em;
}
.input {
  grid-column: 1 / 10;
}
</style>
