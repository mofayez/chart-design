import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../Services/store';
import '../../../i18n';
import { BrowserRouter } from 'react-router-dom';
import SchoolDetails from '../SchoolDetails';
import { chartActions } from '../../../Services/slices/chart-slice';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        schoolName: 'Burke High School',
    }),
    useRouteMatch: () => ({ url: '/school-details/Burke%20High%20School?&country=Egypt&camp=Omaka&monthe=Feb&lessons=140' }),
  }));

  
describe('SchoolDetails Component', () => {


    test('SchoolDetails is rendered correctly', () => {

        render(<Provider store={store}><BrowserRouter><SchoolDetails /></BrowserRouter></Provider>);

        expect(screen.getByText(/Burke High School/i)).toBeInTheDocument();
        
    });

})
