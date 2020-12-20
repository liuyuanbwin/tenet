import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RenderRoutes, appRoutes } from './routes'
import { MainLayout } from './layout'
import { Login } from './pages'
import 'antd/dist/antd.css'
import './App.less'

const menus = appRoutes.filter((item) => item.menu)

function App() {
	return (
		<div className="App">
			{/* <MainLayout menus={menus}>{RenderRoutes()}</MainLayout> */}
			{/* {RenderRoutes()} */}
			<Switch>
				<Route key="login" path="/login" component={Login} exact />
				<MainLayout menus={menus}>{RenderRoutes()}</MainLayout>
			</Switch>
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
