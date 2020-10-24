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
      { required: true, message: 'Please input tenant name', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  vrf: {
    name: [
      { required: true, message: 'Please input VRF name', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  bridge: {
    bd: [
      { required: true, message: 'Please input bridge domain name', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    gateway: [
      { required: true, message: 'Please input Gateway', trigger: 'blur' },
      { validator: IP, trigger: 'blur' }
    ],
    mask: [
      { required: true, message: 'Please input prefix length', trigger: 'blur' },
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
      { required: true, message: 'Please select scope', trigger: 'blur' }
    ]
  },
  ap: {
    name: [
      { required: true, message: 'Please input application profile name', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  epg: {
    epg: [
      { required: true, message: 'Please input EPG name', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    bd: [
      { required: true, message: 'Please select bridge domain', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ]
  },
  filter: {
    filter: [
      { required: true, message: 'Please input filter name', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    entry: [
      { required: true, message: 'Please input entry name', trigger: 'blur' },
      { validator: EnglishName, trigger: 'blur' }
    ],
    protocol: [
      { required: true, message: 'Please select a protocol', trigger: 'blur' }
    ],
    port: [
      { required: true, message: 'Please input port number', trigger: 'blur' },
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
      { required: true, message: 'Please input contract name', trigger: 'blur' }
    ],
    subject: [
      { required: true, message: 'Please input contract subject name', trigger: 'blur' }
    ],
    filter: [
      { required: true, message: 'Please select filter', trigger: 'blur' }
    ]
  }
}
