<template>
  <div class="list-container">
    <div class="list">
      <input class="input" v-model="search" placeholder="Search here by patient id"/>
      <div class="column" v-for="header in headers" :key="header">
        {{header}}
      </div>
      <i class="fas fa-fw">&nbsp;</i>
      <PatientRow class="row" v-for="(patient, index) in currentPage"
        :key="patient.id"
        :patient="patient"
        :editing="currentPageEditing[index]"
        :conditions="conditions"
        @cancel="setEditing(index, false)"
        @edit="setEditing(index, true)"
        @submit="submit(index, $event)"
        @delete="doDelete(index)"/>
    </div>
    <i class="fas fa-plus-circle clickable" v-tooltip="'Add patient'" @click="addPatient"/>
    <div class="page-nav">
      <i v-if="pageNumber > 0" class="fas fa-fw fa-caret-left clickable" @click="pageNumber--"/>
      <i v-else class="fas fa-fw"/>
        {{pageNumber + 1}}
      <i v-if="pageNumber < pages.length-1" class="fas fa-fw fa-caret-right clickable" @click="pageNumber++"/>
      <i v-else class="fas fa-fw"/>
    </div>
  </div>
</template>

<script>
import PatientRow from './PatientRow';
import apis from '@/apis';
const maxPatientsPerPage = 25;
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
      search: '',
      pageNumber: 0,
    }
  },
  computed: {
    filteredPatients() {
      if (this.search) {
        return this.patients.filter(p => p.id.toString() === this.$data.search);
      } else {
        return this.patients;
      }
    },
    pages() {
      return _.chunk(this.filteredPatients, maxPatientsPerPage);
    },
    currentPage() {
      return this.pages[this.$data.pageNumber];
    },
    currentPageEditing() {
      return _.chunk(this.$data.editing, maxPatientsPerPage)[this.$data.pageNumber] || [];
    }
  },
  methods: {
    submit(indexInPage, newPatient) {
      const index = this.$data.pageNumber * maxPatientsPerPage + indexInPage;
      this.$emit('edit', index, newPatient);
      this.$set(this.$data.editing, index, false);
    },
    setEditing(indexInPage, val) {
      const index = this.$data.pageNumber * maxPatientsPerPage + indexInPage;
      this.$set(this.$data.editing, index, val);
    },
    addPatient() {
      this.$data.search = '';
      this.$emit('add', 0);
      this.editing.splice(0, 0, true);
    },
    doDelete(indexInPage) {
      const index = this.$data.pageNumber * maxPatientsPerPage + indexInPage;
      this.editing.splice(index, 1);
      this.$emit('delete', index);
    }
  },
  async mounted() {
    this.$data.conditions = await apis.Tactio.getConditions();
  }
}
</script>

<style scoped lang="scss">
.list-container {
  display: grid;
  grid-template-areas: 
  "list"
  "page-nav";
}
.list {
  grid-area: list;
  display: grid;
  grid-template-columns: repeat(8, minmax(min-content, 1fr)) min-content;
  grid-auto-rows: min-content;
  margin-right: 10px;
}
.page-nav {
  grid-area: page-nav;
  justify-self: center;
  margin-top: 0.5em;
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
    padding: 0px 5px;
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
  padding: 0px 5px;
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
