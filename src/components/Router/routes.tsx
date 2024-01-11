import Home from '@pages/Dashboard'

export interface _PathRouteProps {
    path: string
    name?: string
    icon?: JSX.Element | string
    element?: JSX.Element
    views?: Array<_PathRouteProps>
}

export const routes: _PathRouteProps[] = [
    {
        path: '/home',
        name: 'home',
        element: <Home />,
    },
]
