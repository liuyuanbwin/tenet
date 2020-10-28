import { RouteProps } from 'react-router'
import { NoFoundPage, EmailLogin, Login, Home } from '../pages'

export interface IRouteProps extends RouteProps {
  menu?: boolean
  title?: string
}

export const appRoutes: IRouteProps[] = [
  {
    title: '登陆',
    path: '/lg',
    component: EmailLogin,
    menu: true
  },
  {
    title: '主页',
    path: '/home',
    component: Home
  }
  // {
  //   path: '**',
  //   component: NoFoundPage
  // }
]
