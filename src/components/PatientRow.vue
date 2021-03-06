<template>
  <div :class="color">
    <BaseEditableField :editing="editing" :value="patient.firstName"
      @input="e => edit('firstName', e)"/>
    <BaseEditableField :editing="editing" :value="patient.lastName"
      @input="e => edit('lastName', e)"/>
    <BaseEditableField :editing="editing"
      :value="patient.conditions ? patient.conditions.name : undefined"
      :values="conditionValues"
      @input="e => edit('conditions', e)"/>
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
import utils from '@/utils';
export default {
  props: {
    patient: {
      required: true
    },
    editing: {
      default: false,
    },
    conditions: {
      type: Array,
    }
  },
  data() {
    return {
      newPatient: _.extend({}, this.patient),
      deleting: false,
    }
  },
  computed: {
    conditionValues() {
      if (!this.conditions) {
        return [];
      }
      return this.conditions.map(cond => cond.name);
    },
    color() {
      return this.patient.forecast ? utils.codeColor(this.patient.forecast.properties.code) : null;
    }
  },
  methods: {
    edit(field, newValue) {
      if (field === 'conditions') {
        const condition = this.conditions.find(c => c.name === newValue);
        this.$data.newPatient.conditions = condition;
      } else {
        this.$data.newPatient[field] = newValue;
      }
    },
    cancel() {
      if (this.patient.id) { //cancel edit
        this.$emit('cancel');
        Object.entries(this.$data.newPatient).forEach(([key, value]) => {
          this.$data.newPatient[key] = this.patient[key];
        });
      } else { //no id: cancel create
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

<style scoped lang="scss">
.actions {
  place-self: center;
}
.red {
  /deep/ div:not(:last-child) {
    background-color: #ff6957;
  }
}
.yellow {
  /deep/ div:not(:last-child) {
    background-color: #fdf54f;
  }
}
.green {
  /deep/ div:not(:last-child) {
    background-color: #00e437;
  }
}
</style>
