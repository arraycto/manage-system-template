<template>
  <div></div>
</template>

<script>
export default {
  name: "Emitter",

  methods: {
    emitEvent () {
      this.$emit("myEvent", "name", "password")
    }
  },

  created () { },
}

</script>

<style lang='less' scoped>
</style>