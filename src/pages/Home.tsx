import { Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import { getApp, getDb, getAuth } from '@/utils'
const app = getApp()
let db = getDb()
let auth = getAuth()

export const Home: React.FC<{}> = () => {

  return (
  <h1>home</h1>
  )
  }

