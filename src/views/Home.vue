<template lang="pug">
  .wrap
    Tenant(v-show="show==='Tenant'")
    Vrf(v-show="show==='Vrf'")
    Bridge(v-show="show==='Bridge'")
    AP(v-show="show==='AP'")
    EPG(v-show="show==='EPG'")
    MyFilter(v-show="show==='MyFilter'")
    Contract(v-show="show==='Contract'")
    EpgContract(v-show="show==='EpgContract'")
</template>
<script>
import Components from './lib'
const KEYS = Object.keys(Components)

export default {
  name: 'Home',
  components: Components,
  computed: {
    show () { return KEYS[this.$store.state.step] }
  }
}
</script>
