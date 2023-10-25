import React from "react";
import { Route } from "react-router-dom";

const OrdenesComponent = React.lazy(() => import('./Ordenes/Ordene/Ordenes'));
const CrearOrdenComponent = React.lazy(() => import('./Ordenes/CrearOrden/CrearOrden'));

const MainComponent = React.lazy(() => import('./Main'));
const RouterMain = (
    <Route path="/main" element={<MainComponent />}>
        <Route path=""  element={<OrdenesComponent />} />
        <Route path="crear"  element={<CrearOrdenComponent />} />
    </Route>)


export default RouterMain