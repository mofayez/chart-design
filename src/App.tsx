import { Fragment } from 'react';
import MasterLayout from './Layouts/MasterLayout/MasterLayout';
import './i18n';
import DashboardRoutes from './Routes/DashboardRoutes';

function App() {

  return (
    <MasterLayout>
      <Fragment>
        <DashboardRoutes />
      </Fragment>
    </MasterLayout>
  );
}

export default App;
