import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Header from '../Header';
import store from '../../../Services/store';
import '../../../i18n';
import { act } from 'react-dom/test-utils';


describe('Header Component', () => {

    test('render header main heading', () => {

        render(<Provider store={store}><Header /></Provider>);
        const headingText = screen.getByTitle("mainHeader");
        expect(headingText).toBeInTheDocument();
    });

    test('render header sub-heading', () => {

        render(<Provider store={store}><Header /></Provider>);
        const headingText = screen.getByTitle("subHeader");
        expect(headingText).toBeInTheDocument();
    });

    test('switch theme change', () => {
        render(<Provider store={store}><Header /></Provider>);
        const switchComp = screen.getByTestId("changeTheme");
        
        act(() => {
            switchComp.click();
        });
        
        expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
        
    });

    test('switch language change', () => {
        render(<Provider store={store}><Header /></Provider>);
        const switchComp = screen.getByTestId("changeLang");
        
        act(() => {
            switchComp.click();
        });
        
        expect(screen.getByText(/العربية/i)).toBeInTheDocument();
        
    });

})


