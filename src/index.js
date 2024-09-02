import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";
import  ReactQueryProvider  from './lib/react-query/ReactQueryProvider'
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(  
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
            <ReactQueryProvider client={queryClient}>
              <App />
              <ReactQueryDevtools 
                  initialIsOpen 
                  position='bottom'     
                  buttonPosition='bottom-right' 
              />
          </ReactQueryProvider>
        </BrowserRouter>
      </React.Fragment>
    </Provider>    
);

serviceWorker.unregister()
