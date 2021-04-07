import React from 'react';
import './app.scss';
import 'normalize.css';

import {MainPage, Contacts, Vacancies, Landing} from "../pages";
import {Route} from 'react-router-dom';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import {Footer, Header} from '../pages-components';

const App = () => {
    const HeaderWithRouter = withRouter(Header);
    const FooterWithRouter = withRouter(Footer);

    return (
        <React.Fragment>
            <Router>
                <div className="container">
                    <HeaderWithRouter/>

                    <Route path="/store" component={MainPage}/>
                    <Route path="/contacts" component={Contacts}/>
                    <Route path="/vacancies" component={Vacancies}/>

                    <FooterWithRouter/>
                </div>
                <Route path="/" component={Landing} exact/>
            </Router>
        </React.Fragment>
    )
};

export default App
