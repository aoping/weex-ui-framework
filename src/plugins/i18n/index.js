// import en from './EN'
// import zh from './ZH'
//
// export default {
//     en: en,
//     zh: zh
// }

import objectAssign from 'object-assign'

import EN from './EN'
import ZH from './ZH'

// const componentsLocales = require('json-loader!yaml-loader!src/locales/components.yml')

export default {
  // EN: objectAssign(componentsLocales['en'], EN),
  // ZH: objectAssign(componentsLocales['zh-CN'], ZH)
  EN,
  ZH
}
