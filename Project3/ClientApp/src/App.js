import React, { useLayoutEffect, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import authService from './components/api-authorization/AuthorizeService';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import Players from './components/Players';
import AddPlayer from './components/Players/AddPlayer';
import Teams from './components/Teams';
import AddTeam from './components/Teams/AddTeam';
import TeamDetails from './components/Teams/TeamDetails';
import './custom.css'

const App = () => {

    const [auth, setAuth] = useState(null);

    useLayoutEffect(() => {
        (async () => {
            const [isAuthenticated] = await Promise.all([authService.isAuthenticated()])
            setAuth(isAuthenticated);
        })();
    }, [setAuth]);
    
    if(auth===null){
        return<div>loading</div>
    } else {
        return (
        <Layout>
            <Route exact path='/teams' render={(props) => <Teams {...props} auth={auth} />} />
            <AuthorizeRoute exact path='/add-team' component={AddTeam} />
            <AuthorizeRoute exact path='/teams/:id' component={TeamDetails} />
            <Route exact path='/players' render={(props) => <Players {...props} auth={auth} />} />
            <AuthorizeRoute exact path='/add-player' component={AddPlayer} />
            <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Route exact path='/' component={Home} />
        </Layout>
        );
    }
}

export default App;
