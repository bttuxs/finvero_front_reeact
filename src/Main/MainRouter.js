import React from "react";
import { Route } from "react-router-dom";

const MainComponent = React.lazy(() => import('./Main'));
const RouterMain = (
    <Route path="/main" element={<MainComponent />}>
    </Route>)


export default RouterMain