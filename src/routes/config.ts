import { RouteProps } from 'react-router'
import { NoFoundPage, Home } from '../pages'

export interface IRouteProps extends RouteProps {
  menu?: boolean
  title?: string
}

export const appRoutes: IRouteProps[] = [
  {
    title: '主页',
    path: '/',
    component: Home,
    menu: true
  },
  {
    path: '**',
    component: NoFoundPage
  }
]
