import { lazy } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';

// routes
import MainLayout from 'layout/MainLayout';
//import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from 'ui-component/Loadable';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));



const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// test pages
const AppOnlineSapStockCntNList = Loadable(lazy(() => import('views/online-report/onlineSapStockCntNList')));
const AppOnlineLiveRatioMgr = Loadable(lazy(() => import('views/online-report/onlineLiveRatioMgr')));



// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    /*
    return (
        <Routes>
            <Route path="/DPS/" element={<AuthGuard><MainLayout /></AuthGuard>}>
                <Route index element={<DashboardDefault />} />
                <Route path="/DPS/dashboard/default" element={<DashboardDefault />} />
                <Route path="/DPS/views/online-report/onlineSapStockCntNList" element={<AppOnlineSapStockCntNList />} />
                <Route path="/DPS/views/online-report/onlineLiveRatioMgr" element={<AppOnlineLiveRatioMgr />} />
            </Route>
        </Routes>
    )
    */
    return useRoutes([{ path: '/', element: <PagesLanding /> }, AuthenticationRoutes, LoginRoutes, MainRoutes]);



}
