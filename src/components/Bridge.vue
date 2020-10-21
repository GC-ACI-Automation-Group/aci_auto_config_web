<template lang="pug">
.main-wrap
  el-card.card(v-for="(item,index) in model" :key="index")
    el-form(:rules="rules" :ref="`form${index}`" :model="item" label-width="280px")
      el-form-item(label="BD名称：" required prop="bd")
          el-input(v-model="item.bd")
      el-form-item(label="BD的gateway：" required prop="gateway")
          el-input(v-model="item.gateway")
      el-form-item(label="BD subnet mask：" required prop="mask")
          el-input(v-model="item.mask")
      el-form-item(label="BD下的子网通信范围:" required prop="scope")
          el-checkbox-group(v-model="item.scope")
            el-checkbox(label="private" :disabled="item.scope.includes('public')")
            el-checkbox(label="public" :disabled="item.scope.includes('private')")
            el-checkbox(label="shared")
  .add-btn
    el-button.el-icon-plus(@click="add")
  .btns
    el-button(@click="$store.commit('changeStep', 'minis')") 上一步
    el-button(
      type="primary"
      @click="next") 下一步

</template>
<script>
import Rules from '@/config/rules'

export default {
  name: 'bridge',
  data () {
    return {
      rules: Rules.bridge,
      model: [{
        bd: '',
        gateway: '',
        mask: '',
        scope: []
      }]
    }
  },
  methods: {
    add () {
      const name = 'form' + (this.model.length - 1)
      this.$refs[name][0].validate((valid) => {
        if (valid) {
          this.$set(this, 'model', this.model.concat([{
            bd: '',
            gateway: '',
            mask: '',
            scope: []
          }]))
        }
      })
    },
    next () {
      const name = 'form' + (this.model.length - 1)
      this.$refs[name][0].validate((valid) => {
        if (!valid) return false
        const data = JSON.parse(JSON.stringify(this.model))
        data.forEach(item => {
          item.scope = item.scope.toString()
        })

        this.$store.commit('changeStep', 'add')
        this.$store.commit('changeData', {
          key: 'bridge_domains',
          data
        })
      })
    }
  }
}
</script>
