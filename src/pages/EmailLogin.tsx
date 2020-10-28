import { Button } from 'antd'
import React,{Fragment} from 'react'
import { getApp, getDb } from '@/utils'
const app = getApp()
let db = getDb()
export const EmailLogin: React.FC<{}> = () => (
  <Fragment>
    <Button onClick={async e=>{
    app
    .auth({persistence: 'local'})
    .signUpWithEmailAndPassword('119077905@qq.com','wolaile1986A')
    .then((res) => {
      // 发送验证邮件成功
      console.log('%cEmailLogin.tsx line:29 res', 'color: #26bfa5;', res);
    });
    }}>注册</Button>
    <Button onClick={async e =>{
      app
      .auth({persistence: 'local'})
      .signInWithEmailAndPassword('119077905@qq.com','wolaile1986A')
      .then((loginState) => {
        // 登录成功
        console.log('%cEmailLogin.tsx line:25 loginState', 'color: #26bfa5;', loginState);
      });
    }}>登陆</Button>
    <Button onClick={
      async e => {
        db.collection("lkms").add({
          name:'leolau',
          tel:'13333333333',
        }).then(res => {
          console.log('%cEmailLogin.tsx line:33 res', 'color: #26bfa5;', res);
        })
      }
    }>
      加人
    </Button>
    <Button onClick={
      async e => {
        let u = await db.collection('lkms').where({
          name:/leo/
        }).get()
        console.log('%cEmailLogin.tsx line:44 u', 'color: #26bfa5;', u);
      }
    }>查人</Button>
  </Fragment>
)

