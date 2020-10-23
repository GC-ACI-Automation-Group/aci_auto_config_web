<template lang="pug">
  .main-wrap
    .line
      .item EPG:
      .item Contract:
      .item Contract Type:
    .line(v-for="(item,index) in list" :key="index")
      el-select.item(v-model="item.epg" placeholder="Please select epg")
        el-option(v-for="item in epgs" :key="item.epg" :value="item.epg")
      el-select.item(v-model="item.contract" placeholder="Please select contract")
        el-option(v-for="item in contracts" :key="item.contract" :value="item.contract")

      el-select.item(v-model="item.contract_type", placeholder="Please select type")
        el-option(label="provider" value="provider")
        el-option(label="consumer" value="consumer")
    .add-btn
      el-button.el-icon-plus(@click="add")
    .btns
      el-button(@click="$store.commit('changeStep', 'minis')") Privous
      el-button(
        type="primary"
        @click="submit") Submit
</template>
<script>
export default {
  name: 'EpgContract',
  data () {
    return {
      list: [
        { epg: '', contract: '', contract_type: '' },
        { epg: '', contract: '', contract_type: '' },
        { epg: '', contract: '', contract_type: '' }
      ],
      params: {}
    }
  },
  computed: {
    epgs () {
      return this.$store.state.epgs
    },
    contracts () {
      return this.$store.state.contracts
    }
  },
  methods: {
    add () {
      this.list.push({
        epg: '', contract: '', contract_type: ''
      })
    },
    submit () {
      let list = JSON.parse(JSON.stringify(this.list))
      list = list.filter(item => item.epg && item.contract && item.contract_type)
      const data = { ...this.$store.state, epg_contracts: list }
      delete data.step
      this.request(data)
    },
    request (data) {
      const xmlhttp = new XMLHttpRequest()
      xmlhttp.open('POST', '/api/config', true)
      xmlhttp.send(JSON.stringify(data))
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          this.$confirm('The config file has been generated, Please click download button to download it.', '', {
            distinguishCancelAndClose: true,
            confirmButtonText: 'Download',
            cancelButtonText: 'Cancel'
          })
            .then(() => {
              location.href = '/download'
            })
        }
      }
    }
  }
}
</script>
<style scoped>
.line {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  justify-content:space-around;
  margin: 0 0 20px;
}

</style>
