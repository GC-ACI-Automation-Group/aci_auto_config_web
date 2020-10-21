const EnglishName = function (rule, value, callback) {
  if (value.match(/\w+/)) {
    callback()
  } else {
    callback(new Error('Only English is allowed'))
  }
}

const IP = function (rule, value, callback) {
  if (value.match(/(\d{1,3}.){3}\d{1,3}/)) {
    callback()
  } else {
    callback(new Error('不是有效的ip地址'))
  }
}
export default {
  tenant: {
    name: [
      { required: true, message: 'tenant', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  vrf: {
    name: [
      { required: true, message: '请输入Vrf名称', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  bridge: {
    bd: [
      { required: true, message: '请输入BD名称', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    gateway: [
      { required: true, message: '请输入gateway', trigger: 'blur' },
      { validator: IP, trigger: 'blur' }
    ],
    mask: [
      { required: true, message: 'Prefix', trigger: 'blur' },
      {
        validator (rule, value, callback) {
          if (Number(value) && value >= 0 && value <= 32) {
            callback()
            return
          }
          callback(new Error('0-32'))
        },
        trigger: 'blur'
      }
    ],
    scope: [
      { required: true, message: '请选择范围', trigger: 'blur' }
    ]
  },
  ap: {
    name: [
      { required: true, message: '请输入ap名称', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  epg: {
    epg: [
      { required: true, message: 'epg', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    bd: [
      { required: true, message: 'bridge domain', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  filter: {
    filter: [
      { required: true, message: 'filter', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    entry: [
      { required: true, message: 'entry', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    protocol: [
      { required: true, message: 'protocol', trigger: 'blur' }
    ],
    port: [
      { required: true, message: 'port', trigger: 'blur' },
      {
        validator (rule, value, callback) {
          if (Number(value) && value >= 0 && value < 65536) {
            callback()
          } else {
            callback(new Error('不是一个有效的端口号'))
          }
        },
        trigger: 'blur'
      }
    ]

  },
  contract: {
    contract: [
      { required: true, message: '请输入合同名称', trigger: 'blur' }
    ],
    subject: [
      { required: true, message: '请输入subject名称', trigger: 'blur' }
    ],
    filter: [
      { required: true, message: '请选择filter名称', trigger: 'blur' }
    ]
  }
}
