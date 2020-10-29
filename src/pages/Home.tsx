import { Button } from 'antd'
import React, { Fragment } from 'react'
import { getApp, getDb, getAuth } from '@/utils'
import { useHistory } from 'react-router'

const app = getApp()
let db = getDb()
export const Home: React.FC<{}> = () => {
  let state = getAuth().hasLoginState()
  let history = useHistory()
  if (!state) {
    history.push('/login')
  }
  return <h1>Home</h1>
}
