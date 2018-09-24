<template>
  <div class="row">
    <BaseEditableField :value="patient.firstName"/>
    <BaseEditableField :value="patient.lastName"/>
    <BaseEditableField :value="patient.conditions.name"/>
    <BaseEditableField :value="patient.address"/>
    <BaseEditableField :value="patient.state"/>
    <BaseEditableField :value="patient.postalCode"/>
    <BaseEditableField :value="patient.status"/>
    <div class="actions">
      <i class="fas fa-edit clickable"/>
      <i class="fas fa-ban clickable"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    patient: {
      required: true
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: repeat(7, 1fr) min-content;
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
  padding: 0px 1px;
}
</style>
