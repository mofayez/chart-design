import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard';
import NotFound from '../Pages/NotFound/NotFound';
import SchoolDetails from '../Pages/SchoolDetails/SchoolDetails';

interface Props {

}

/**
 * render dashboard routs
 * 
 * @param props 
 * @returns ReactElement
 */
const DashboardRoutes: React.FC<Props> = (props: Props): ReactElement => {

    return (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/school-details/:schoolName" element={<SchoolDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default DashboardRoutes;