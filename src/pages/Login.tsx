import { Button } from 'antd'
import React, { Fragment } from 'react'
// import { app } from '@/utils'
import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
  env: "tenet-0g1gneu2742043be"
});
export const Login: React.FC<{}> = () => {
  return (
    <Button
      onClick={(e) => {
        app.auth({
          persistence: 'local'
        }).signUpWithEmailAndPassword('119077905@qq.com', 'wolaile1986A')
          .then((res) => {
            // 发送验证邮件成功
            console.log('%cLogin.tsx line:18 res', 'color: #26bfa5;', res);
          });
        // auth.signUpWithEmailAndPassword('119077906@qq.com', 'wolaile1986A').then((res) => {
        //   console.log('%cLogin.tsx line:11 Object', 'color: #26bfa5;', res);
        // });
        // let auth = app.auth({ persistence: 'local' }).signInWithEmailAndPassword('119077906@qq.com', 'wolaile1986A')
        //   .then((loginState) => {
        //     // 邮箱密码登录成功
        //     console.log(loginState)
        //   })
      }}
    >
      登录
    </Button>
  )
}
