const EnglishName = function (rule, value, callback) {
  if (value.match(/[_a-zA-Z]\w*/)) {
    callback()
  } else {
    callback(new Error('Only English is allowed'))
  }
}

const IP = function (rule, value, callback) {
  if (value.match(/\d{1,3}(.\d{1,3}){3}/)) {
    callback()
  } else {
    callback(new Error('Not a valid ip address'))
  }
}
export default {
  tenant: {
    name: [
      { required: true, message: 'Tenant:', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  vrf: {
    name: [
      { required: true, message: 'VRF:', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  bridge: {
    bd: [
      { required: true, message: 'Bridge Domain:', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    gateway: [
      { required: true, message: 'Gateway:', trigger: 'blur' },
      { validator: IP, trigger: 'blur' }
    ],
    mask: [
      { required: true, message: 'Prefix Length:', trigger: 'blur' },
      {
        validator (rule, value, callback) {
          if (Number(value) && value > 0 && value < 32) {
            callback()
            return
          }
          callback(new Error('Invalid prefix length.'))
        },
        trigger: 'blur'
      }
    ],
    scope: [
      { required: true, message: 'Scope:', trigger: 'blur' }
    ]
  },
  ap: {
    name: [
      { required: true, message: 'Application Profile:', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  epg: {
    epg: [
      { required: true, message: 'EPG:', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    bd: [
      { required: true, message: 'Bridge Domain:', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  filter: {
    filter: [
      { required: true, message: 'Filter:', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    entry: [
      { required: true, message: 'Entry:', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    protocol: [
      { required: true, message: 'Protocol:', trigger: 'blur' }
    ],
    port: [
      { required: true, message: 'Port:', trigger: 'blur' },
      {
        validator (rule, value, callback) {
          if (Number(value) && value >= 0 && value < 65536) {
            callback()
          } else {
            callback(new Error('Invalid a port number.'))
          }
        },
        trigger: 'blur'
      }
    ]

  },
  contract: {
    contract: [
      { required: true, message: 'Contract:', trigger: 'blur' }
    ],
    subject: [
      { required: true, message: 'Subject:', trigger: 'blur' }
    ],
    filter: [
      { required: true, message: 'Filter:', trigger: 'blur' }
    ]
  }
}
