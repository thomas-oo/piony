<template>
  <div v-if="!editing">
    {{value}}
  </div>
</template>

<script>
export default {
  props: {
    editing: {
      default: false
    },
    value: {},
    values: {
      type: Array,
    },
  }
}
</script>

<style>

</style>
