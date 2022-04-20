import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../Services/store';
import '../../../i18n';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../NotFound';


  
describe('NotFound Component', () => {


    test('NotFound is rendered correctly', () => {

        render(<Provider store={store}><BrowserRouter><NotFound /></BrowserRouter></Provider>);

        expect(screen.getByText(/404 Not Found!/i)).toBeInTheDocument();
        
    });

})
