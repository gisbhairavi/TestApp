import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


import {
    BrowserRouter
} from 'react-router-dom';

import App from 'containers/App/App.jsx';
import Chat from 'containers/App/Chat.jsx';
import { withRouter } from 'react-router'

import registerServiceWorker from './registerServiceWorker';

class Home extends React.Component {

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    ServiceDesk(location) {
        console.log(this.props);
        const isClientChat  =   (this.props.location.pathname === "/chat");

        if (isClientChat) {
            return <Chat />;
        }
        return <App />;
    }

    render() {
        const { match, location, history } = this.props

        return this.ServiceDesk(location);
    }
}

const HomeWithRouter = withRouter(Home)

ReactDOM.render(
    <BrowserRouter>
        <HomeWithRouter />
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
