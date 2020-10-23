<template lang="pug">
.main-wrap
  el-card.card(v-for="(item,index) in model" :key="index")
    el-form(:rules="rules" :ref="`form${index}`" :model="item" label-width="280px")
      el-form-item(label="Contract:" required prop="contract")
        el-input(v-model="item.contract" placeholder="Contract Name")
      el-form-item(label="Contract Subject:" required prop="subject")
        el-input(v-model="item.subject" placeholder="Subject Name")
      el-form-item(label="Filter:" required prop="filter")
        el-select(v-model="item.filter" placeholder="Please select filter")
          el-option(
            v-for="item in filters"
            :key="item.filter"
            :value="item.filter")
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
  name: 'Contract',
  data () {
    return {
      rules: Rules.contract,
      model: [{
        contract: '',
        subject: '',
        filter: ''
      }]
    }
  },
  computed: {
    filters () {
      return this.$store.state.filters
    }
  },
  methods: {
    add () {
      const name = 'form' + (this.model.length - 1)
      this.$refs[name][0].validate((valid) => {
        if (valid) {
          this.$set(this, 'model', this.model.concat([{}]))
        }
      })
    },
    next () {
      const name = 'form' + (this.model.length - 1)
      this.$refs[name][0].validate((valid) => {
        if (!valid) return false
        this.$store.commit('changeStep', 'add')
        this.$store.commit('changeData', {
          key: 'contracts',
          data: JSON.parse(JSON.stringify(this.model))
        })
      })
    }
  }
}
</script>
<style scoped>

</style>
