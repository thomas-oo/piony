<template>
  <div v-if="!editing">
    {{value}}
  </div>
  <div v-else>
    <input v-if="!values" type="text" :value="value"
      @input="e => $emit('input', e.target.value)"/>
    <input v-else :value="value"/>
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
  },
  methods: {
    setInput(input) {
    }
  }
}
</script>

<style scoped lang="scss">
input {
  width: 100%;
  padding: unset;
  box-sizing: border-box;
}
</style>
