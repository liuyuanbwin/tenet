import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RenderRoutes, appRoutes } from './routes'
import { MainLayout } from './layout'
import 'antd/dist/antd.css'
import './App.less'

const menus = appRoutes.filter((item) => item.menu)

function App() {
  return (
    <div className="App">
      {/* <MainLayout menus={menus}>{RenderRoutes()}</MainLayout> */}
      {RenderRoutes()}
    </div>
  )
}

export default () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
