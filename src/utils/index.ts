import { config } from '@/config'
import cloudbase from '@cloudbase/js-sdk'

export const getApp = () => {
  const app = cloudbase.init({
    env:config.envId
  })
  return app
}

export const getDb = () => {
  const db = getApp().database()
  return db
}

export const getAuth = () => {
  const auth = getApp().auth({
    persistence:"local"
  })
  return auth
}