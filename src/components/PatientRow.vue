<template>
  <div>
    <BaseEditableField :editing="editing" :value="patient.firstName"
      @input="e => edit('firstName', e)"/>
    <BaseEditableField :editing="editing" :value="patient.lastName"
      @input="e => edit('lastName', e)"/>
    <BaseEditableField :editing="editing" :value="patient.conditions ? patient.conditions.name : undefined"/>
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
    <div v-if="editing" class="actions">
      <i class="fas fa-check fa-fw clickable" v-tooltip="'Submit'" @click="submit"/>
      <i class="fas fa-ban fa-fw clickable" v-tooltip="'Cancel'" @click="cancel"/>
    </div>
    <div v-else-if="deleting" class="actions">
      <i class="fas fa-check fa-fw clickable" v-tooltip="'Submit'" @click="doDelete"/>
      <i class="fas fa-ban fa-fw clickable" v-tooltip="'Cancel'" @click="cancelDelete"/>
    </div>
    <div v-else class="actions">
      <i class="fas fa-edit fa-fw clickable" v-tooltip="'Edit'" @click="$emit('edit')"/>
      <i class="fas fa-trash fa-fw clickable" v-tooltip="'Delete'" @click="startDelete"/>
    </div>
  </div>
</template>

<script>
import apis from '@/apis';
export default {
  props: {
    patient: {
      required: true
    },
    editing: {
      default: false,
    }
  },
  data() {
    return {
      newPatient: _.extend({}, this.patient),
      deleting: false,
    }
  },
  computed: {
  },
  methods: {
    edit(field, newValue) {
      this.$data.newPatient[field] = newValue;
    },
    cancel() {
      if (this.$data.editing) {
        this.$emit('cancel');
        Object.entries(this.$data.newPatient).forEach(([key, value]) => {
          this.$data.newPatient[key] = this.patient[key];
        });
      } else {
        this.$emit('delete');
      }
    },
    async submit() {
      if (this.$data.newPatient.id) {
        await apis.Tactio.editPatient(this.$data.newPatient);
        this.$emit('submit', this.$data.newPatient);
      } else {
        await apis.Tactio.addPatient(this.$data.newPatient);
        this.$emit('submit', this.$data.newPatient);
      }
      return;
    },
    startDelete() {
      this.$data.deleting = true;
    },
    async doDelete() {
      await apis.Tactio.deletePatient(this.patient);
      this.$emit('delete');
      this.$data.deleting = false;
    },
    cancelDelete() {
      this.$data.deleting = false;
    }
  }
}
</script>

<style scoped>
.actions {
  place-self: center;
}
</style>
