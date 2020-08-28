import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from '../application/Home'
import Recommend from '../application/Recommend'
import Rank from '../application/Rank'
import Singers from '../application/Singers'

export default [
    {
        path: '/',
        component: Home,
        routes: [
            {
                path: '/',
                exact: true,
                render: () => <Redirect to={'/recommend'}/>
            }, {
                path: '/recommend',
                component: Recommend
            }, {
                path: '/rank',
                component: Rank
            }, {
                path: '/signer',
                component: Singers
            }
        ]
    }
]