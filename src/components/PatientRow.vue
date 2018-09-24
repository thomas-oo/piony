<template>
  <div class="row">
    <BaseEditableField :editing="editing" :value="patient.firstName"
      @input="e => edit('firstName', e)"/>
    <BaseEditableField :editing="editing" :value="patient.lastName"
      @input="e => edit('lastName', e)"/>
    <BaseEditableField :editing="editing" :value="patient.conditions.name"/>
    <BaseEditableField :editing="editing" :value="patient.address"
      @input="e => edit('address', e)"/>
    <BaseEditableField :editing="editing" :value="patient.city"
      @input="e => edit('city', e)"/>
    <BaseEditableField :editing="editing" :value="patient.state"
      @input="e => edit('state', e)"/>
    <BaseEditableField :editing="editing" :value="patient.postalCode"
      @input="e => edit('postalCode', e)"/>
    <BaseEditableField :editing="editing" :value="patient.status"
      @input="e => edit('status', e)"/>
    <div v-if="!editing" class="actions">
      <i class="fas fa-edit fa-fw clickable" v-tooltip="'Edit'" @click="editing = true"/>
      <i class="fas fa-trash fa-fw clickable" v-tooltip="'Delete'"/>
    </div>
    <div v-else class="actions">
      <i class="fas fa-check fa-fw clickable" v-tooltip="'Submit'" @click="submit"/>
      <i class="fas fa-ban fa-fw clickable" v-tooltip="'Cancel'" @click="cancelEdit"/>
    </div>
  </div>
</template>

<script>
import apis from '@/apis';
export default {
  props: {
    patient: {
      required: true
    }
  },
  data() {
    return {
      editing: false,
      newPatient: _.extend({}, this.patient),
    }
  },
  computed: {
  },
  methods: {
    edit(field, newValue) {
      this.$data.newPatient[field] = newValue;
    },
    cancelEdit() {
      this.$data.editing = false;
      Object.entries(this.$data.newPatient).forEach(([key, value]) => {
        this.$data.newPatient[key] = this.$props.patient[key];
      });
    },
    async submit() {
      if (this.$data.newPatient.id) {
        await apis.Tactio.editPatient(this.$data.newPatient);
        this.$data.editing = false;
      } else {
        apis.Tactio.addPatient(this.$data.newPatient);
      }
      return;
    }
  }
}
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: repeat(8, minmax(0,1fr)) min-content;
  grid-template-rows: min-content;
}
.row>*:first-child {
  border-left: 1px solid black;
}
.row>*:last-child {
  border: unset;
}
.row>* {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.actions {
  place-self: center;
}
</style>
