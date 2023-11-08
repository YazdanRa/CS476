import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react'
import Routes from './Routes'

import AuthProvider from './providers/AuthProvider'
import {setUpInterceptorStore} from './utils/API'

import {SplashScreen} from './components'

const App = ({store, persistor}) => {
    // set up store for axios interceptors
    setUpInterceptorStore(store)

    return (
        // Redux State Management Provider
        <Provider store={store}>
            {/* Redux Persistor Gate */}
            <PersistGate persistor={persistor} loading={<SplashScreen/>}>
                {/* React Router */}
                <BrowserRouter>
                    {/* Authentication Flow Provider */}
                    <AuthProvider>
                        {/* Skeleton Loading Theme Provider */}
                        <Routes/>
                    </AuthProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App;
