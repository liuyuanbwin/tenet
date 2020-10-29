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

export const _b = db.collection('bs')
export const _c = db.collection('cs')
export const _lks = db.collection('lkms')
export const _Ib = db.collection('Ib') 