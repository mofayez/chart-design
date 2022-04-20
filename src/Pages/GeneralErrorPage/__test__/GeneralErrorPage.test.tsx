import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../Services/store';
import '../../../i18n';
import { BrowserRouter } from 'react-router-dom';
import GeneralErrorPage from '../GeneralErrorPage';

  
describe('GeneralErrorPage Component', () => {


    test('GeneralErrorPage is rendered correctly', () => {

        render(<Provider store={store}><BrowserRouter><GeneralErrorPage /></BrowserRouter></Provider>);

        expect(screen.getByText(/Something Went Wrong!/i)).toBeInTheDocument();
        
    });

})
