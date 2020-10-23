<template lang="pug">
.main-wrap
  el-form(inline :rules="rules" ref="form" :model="model")
    el-form-item(label="Tenant:" required prop="name")
      el-input(v-model="model.name" placeholder="Tenant Name")
  .btns
    el-button(
      type="primary"
      @click="next") Next
</template>
<script>
import Rules from '@/config/rules'
export default {
  name: 'Tenant',
  data () {
    return {
      rules: Rules.tenant,
      model: { name: '' }
    }
  },
  methods: {
    next () {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.$store.commit('changeStep', 'add')
        this.$store.commit('changeData', {
          key: 'tenant',
          data: this.model.name
        })
      })
    }
  }

}
</script>
