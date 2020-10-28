import { RouteProps } from 'react-router'
import { NoFoundPage, EmailLogin, Login } from '../pages'

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
    title: 'Not found',
    path: '/nf',
    component: NoFoundPage,
  },
  {
    title: 'Not found',
    path: '/login',
    component: Login,
  },
  {
    path: '**',
    component: NoFoundPage
  }
]
