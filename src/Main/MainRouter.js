import React from "react";
import { Route } from "react-router-dom";

const OrdenesComponent = React.lazy(() => import('./Ordenes/Ordene/Ordenes'));
const CrearOrdenComponent = React.lazy(() => import('./Ordenes/CrearOrden/CrearOrden'));
const VentasComponent = React.lazy(() => import('./Ordenes/Ventas/Ventas'));

const MainComponent = React.lazy(() => import('./Main'));
const RouterMain = (
    <Route path="/main" element={<MainComponent />}>
        <Route path=""  element={<OrdenesComponent />} />
        <Route path="crear"  element={<CrearOrdenComponent />} />
        <Route path="ventas"  element={<VentasComponent />} />
    </Route>)


export default RouterMain