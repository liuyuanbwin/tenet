import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {Redirect} from 'react-router'
import { RenderRoutes, appRoutes } from './routes'
import { MainLayout } from './layout'
import 'antd/dist/antd.css'
import './App.less'
import { NoFoundPage, EmailLogin } from './pages'

const menus = appRoutes.filter((item) => item.menu)

function App() {
  return (
    <div className="App">
      <MainLayout menus={menus}>{RenderRoutes()}</MainLayout>
    </div>
  )
}

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Redirect path="/" to="/login" /> */}
        <Route key='lll' path={'/'} exact component={EmailLogin} />
        <App />
      </Switch>
    </BrowserRouter>
  )
}
