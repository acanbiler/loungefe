import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import reportWebVitals from './reportWebVitals';
import {Router, Switch, Route, withRouter} from 'react-router-dom';
import axios from "axios";

import history from "./utils/history";
import Lounge from "./containers/Lounge";
import TicketPage from "./containers/TicketPage";
import Shops from "./containers/Shops";
import {ToastContainer} from "react-toastify";

const baseURL = process.env.ENDPOINT_URL;

axios.defaults.baseURL = baseURL;

ReactDOM.render(
    <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={withRouter(Lounge)}/>
                    <Route path="/ticket" component={withRouter(TicketPage)}/>
                    <Route path="/shops" component={withRouter(Shops)}/>
                </Switch>
            </Router>
        <ToastContainer />
    </>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
