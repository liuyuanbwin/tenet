import { Button } from 'antd'
import React, { Fragment } from 'react'
import { db, auth } from '@/utils'

export const Login: React.FC<{}> = () => {
  return (
    <Button
      onClick={(e) => {
          auth
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
