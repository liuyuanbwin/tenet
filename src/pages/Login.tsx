import { Button } from 'antd'
import React, { Fragment } from 'react'
import { getApp, getDb, getAuth } from '@/utils'
const app = getApp()
let db = getDb()
export const Login: React.FC<{}> = () => {
  return (
    <Button
      onClick={(e) => {
        getAuth()
          .signInWithEmailAndPassword('119077905@qq.com', 'wolaile1986A')
          .then((loginState) => {
            // 邮箱密码登录成功
            console.log(loginState)
          })
      }}
    >
      登录
    </Button>
  )
}
