import { RouteProps } from 'react-router'
import { NoFoundPage, Bills, Schedule } from '../pages'

export interface IRouteProps extends RouteProps {
	menu?: boolean
	title?: string
}

export const appRoutes: IRouteProps[] = [
	{
		title: 'Not found',
		path: '/nf',
		component: NoFoundPage
	},
	{
		title: '订单列表',
		path: '/',
		component: Bills,
		menu: true
	},
	{
		title: '车辆列表',
		path: '/vehicles',
		component: Bills,
		menu: true
	},
	{
		title: '联系人列表',
		path: '/linkmans',
		component: Bills,
		menu: true
	},
	{
		title: 'Schedule',
		path: '/schedule',
		component: Schedule,
		menu: true
	},

	{
		path: '**',
		component: NoFoundPage
	}
]
