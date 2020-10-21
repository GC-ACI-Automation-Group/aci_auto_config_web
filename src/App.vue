<template lang="pug">
  #app
    el-steps.steps(:active="active" align-center)
      el-step(
        v-for="(item,index) in steps"
        :key="index"
        :title="item.title")
    router-view

</template>
<script>
import { steps } from '@/config/'
export default {
  name: 'App',
  data () {
    return { steps }
  },
  computed: {
    active () { return this.$store.state.step }
  }
}
</script>
<style lang="less">
#app {
  padding: 40px 20px;
  text-align: center;
}
.steps {
  margin: 50px 0 100px;
}
</style>
