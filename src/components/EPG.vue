
<template lang="pug">
.main-wrap
  el-card.card(v-for="(item,index) in model" :key="index")
    el-form(:rules="rules" :ref="`form${index}`" :model="item" label-width="280px")
      el-form-item(label="输入应用配置文件下的EPG名称：" required prop="epg")
        el-input(v-model="item.epg")
      el-form-item(label="输入EPG要关联的BD名称：" required prop="bd")
        el-select(v-model="item.bd")
          el-option(v-for="item in bdList" :key="item.bd" :label="item.bd" :value="item.bd")
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
