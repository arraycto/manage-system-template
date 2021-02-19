<template>
  <div>{{numbers}}</div>
</template>

<script>
export default {
  name: 'name',
  components: {},
  data () {
    return {
    }
  },
  props: {
    even: {
      type: Boolean,
      default () { return false }
    }
  },

  computed: {
    numbers () {
      let numbers = []
      let odds = []
      for (let i = 1; i < 10; i++) {
        if (i % 2 == 0) {
          numbers.push(i)
        } else {
          odds.push(i)
        }
      }
      return this.even ? numbers.join(', ') : odds.join(', ')
    }
  },

  methods: {},

  created () { },
}

</script>
<style lang='less' scoped>
</style>