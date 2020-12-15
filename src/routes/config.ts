import { RouteProps } from 'react-router'
import { NoFoundPage, Home } from '../pages'

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
    component: Home,
    menu: true
  },
  {
    path: '**',
    component: NoFoundPage
  }
]
