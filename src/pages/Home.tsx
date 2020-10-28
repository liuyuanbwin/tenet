import { Button } from 'antd'
import React, { Fragment } from 'react'
import { getApp, getDb } from '@/utils'
const app = getApp()
let db = getDb()
export const Home: React.FC<{}> = () => (
  <Fragment>
    <h1>Home</h1>
  </Fragment>
)
