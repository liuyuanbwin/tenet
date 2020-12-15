import { config } from '@/config'
import cloudbase from '@cloudbase/js-sdk'

export const app = (() => {
  const app = cloudbase.init({
    env: config.envId
  })
  return app
})()

export const db = app.database()

export const auth = (() => {
  const auth = app.auth({
    persistence: 'local'
  })
  return auth
})()

export const _b = db.collection('bs') //订单列表
export const _c = db.collection('cs') //车辆列表
export const _lks = db.collection('lkms') //联系人列表
export const _Ib = db.collection('Ib')  //保险公司列表