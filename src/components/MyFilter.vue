
<template lang="pug">
.main-wrap
  el-card.card(v-for="(item,index) in model" :key="index")
    el-form(:rules="rules" :ref="`form${index}`" :model="item" label-width="280px")
      el-form-item(label="Filter名称：" required prop="filter")
          el-input(v-model="item.filter")
      el-form-item(label="Entry 名称：" required  prop="entry")
          el-input(v-model="item.entry")
      el-form-item(label="Protocol：" required prop="protocol")
          el-select(v-model="item.protocol")
            el-option(v-for="item in protocols" :key="item" :label="item" :value="item")
      el-form-item(label="Target port：" required prop="port")
          el-input(v-model="item.port")
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
const PROTOCOLS = ['egp', 'eigrp', 'icmp', 'icmpv6', 'igmp', 'igp', 'l2tp', 'ospf', 'pim', 'tcp', 'udp', 'unspecified']

export default {
  name: 'MyFilter',
  data () {
    return {
      protocols: PROTOCOLS,
      rules: Rules.filter,
      model: [{ }]
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
          key: 'filters',
          data: JSON.parse(JSON.stringify(this.model))
        })
      })
    }
  }
}
</script>
