import { config } from '@/config'
import cloudbase from '@cloudbase/js-sdk'

export const app = (() => {
  const app = cloudbase.init({
    env: config.envId
  })
  return app
})()

export const db = (() => {
  const db = app.database()
  return db
})()

export const auth = (() => {
  const auth = app.auth({
    persistence: 'local'
  })
  return auth
})()
