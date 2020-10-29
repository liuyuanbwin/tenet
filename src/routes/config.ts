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
    component: NoFoundPage,
  },
  {
    title:'Home',
    path:'/home',
    component:Home,
    menu:true
  },
  {
    path: '**',
    component: NoFoundPage
  }
]
