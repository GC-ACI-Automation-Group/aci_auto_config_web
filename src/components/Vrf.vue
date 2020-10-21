<template lang="pug">
.main-wrap
  el-form(inline :rules="rules" ref="form" :model="model")
    el-form-item(label="输入租户下的新VRF名称：" required prop="name")
      el-input(v-model="model.name")
  .btns
    el-button(@click="$store.commit('changeStep', 'minis')") 上一步
    el-button(
      type="primary"
      @click="next") 下一步
</template>
<script>
import Rules from '@/config/rules'
export default {
  name: 'Vrf',
  data () {
    return {
      rules: Rules.vrf,
      model: { name: '' }
    }
  },
  methods: {
    next () {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.$store.commit('changeStep', 'add')
        this.$store.commit('changeData', {
          key: 'vrf',
          data: this.model.name
        })
      })
    }
  }
}
</script>
