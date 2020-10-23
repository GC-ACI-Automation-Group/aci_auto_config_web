
<template lang="pug">
.main-wrap
  el-card.card(v-for="(item,index) in model" :key="index")
    el-form(:rules="rules" :ref="`form${index}`" :model="item" label-width="280px")
      el-form-item(label="EPG:" required prop="epg")
        el-input(v-model="item.epg" placeholder="EPG Name")
      el-form-item(label="Bridge Domain:" required prop="bd")
        el-select(v-model="item.bd" placeholder="Please select bd")
          el-option(v-for="item in bdList" :key="item.bd" :label="item.bd" :value="item.bd")
  .add-btn
    el-button.el-icon-plus(@click="add")
  .btns
    el-button(@click="$store.commit('changeStep', 'minis')") Previous
    el-button(
      type="primary"
      @click="next") Next

</template>
<script>
import Rules from '@/config/rules'

export default {
  name: 'EPG',
  data () {
    return {
      rules: Rules.epg,
      model: [{ }]
    }
  },
  computed: {
    bdList () {
      return this.$store.state.bridge_domains
    }
  },
  methods: {
    add () {
      const name = 'form' + (this.model.length - 1)
      this.$refs[name][0].validate((valid) => {
        if (valid) {
          this.model.push({ })
        }
      })
    },
    next () {
      const name = 'form' + (this.model.length - 1)
      this.$refs[name][0].validate((valid) => {
        if (!valid) return false
        this.$store.commit('changeStep', 'add')
        this.$store.commit('changeData', {
          key: 'epgs',
          data: JSON.parse(JSON.stringify(this.model))
        })
      })
    }
  }
}
</script>
<style scoped>

</style>
