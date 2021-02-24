import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
const StateCovidComponent = React.lazy(() => import("../components/StateCovid"));
const DistrictCovidComponent = React.lazy(() => import("../components/DistrictCovid"));




class AppRoute extends Component {
    render() {
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={StateCovidComponent} />
                        <Route exact path="/:stateName/:code" component={DistrictCovidComponent} />
                    </Switch>
                </Suspense>
            </Router>
        );
    }
}
export default AppRoute;