import React from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont'
import routers from './routes'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {
          renderRoutes(routers)
        }
      </HashRouter>
    </Provider>
  );
}

export default App;
