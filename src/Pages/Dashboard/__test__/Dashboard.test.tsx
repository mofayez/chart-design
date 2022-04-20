import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../Services/store';
import '../../../i18n';
import { chartActions } from '../../../Services/slices/chart-slice';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard';
import  { uiActions } from '../../../Services/slices/ui-slice';


const data = [
    {
        "id": "620af3a468e4b2e765e7c9e7",
        "month": "Feb",
        "camp": "Omaka",
        "country": "Egypt",
        "school": "Burke High School",
        "lessons": 140
    },
    {
        "id": "620af3a4b8c8ca0afd385a9c",
        "month": "Apr",
        "camp": "Kakuma",
        "country": "Egypt",
        "school": "Kakuma Secondary",
        "lessons": 170
    },
    {
        "id": "620af3a4a812c63fb1945ac9",
        "month": "Oct",
        "camp": "Kakuma",
        "country": "Egypt",
        "school": "Jolie Boarding School",
        "lessons": 215
    },
    {
        "id": "620af3a4288ab1f9ee2f56d0",
        "month": "Mar",
        "camp": "Lemaci",
        "country": "Tunisia",
        "school": "Columbia Law School",
        "lessons": 50
    }
];


global.fetch = (): Promise<any> => {
    return Promise.resolve({
        json: () => Promise.resolve(data),
        ok: true
    })
}
  
jest.mock('react-chartjs-2', () => ({
    Line: () => null
}));

describe('Dashboard Component', () => {

    store.dispatch(chartActions.setData(data));
    store.dispatch(chartActions.setCountries({
        countries: [
            { label: 'Egypt', value: 'Egypt' },
            { label: 'Tunisia', value: 'Tunisia' }
        ]
    }));
    store.dispatch(chartActions.setCamps({
        camps: [
            { label: 'Omaka', value: 'Omaka' },
            { label: 'Kakuma', value: 'Kakuma' },
            { label: 'Lemaci', value: 'Lemaci' }
        ]
    }));
    store.dispatch(chartActions.setSchools({
        schools: [
            { label: 'all', value: 'all' },
            { label: 'Burke High School', value: 'Burke High School' },
            { label: 'Kakuma Secondary', value: 'Kakuma Secondary' },
            { label: 'Lemaci', value: 'Lemaci' },
            { label: 'Jolie Boarding School', value: 'Jolie Boarding School' },
            { label: 'Columbia Law School', value: 'Columbia Law School' }
        ]
    }));

    store.dispatch(chartActions.setSelectedCamp(
        { label: 'Omaka', value: 'Omaka' },
    ));

    store.dispatch(chartActions.setTotalNumberOfLessons(140));

    store.dispatch(chartActions.setFilteredLessons([
        {
            id: '620af3a468e4b2e765e7c9e7',
            month: 'Feb',
            camp: 'Omaka',
            country: 'Egypt',
            school: 'Burke High School',
            lessons: 140
        }
    ]));

    store.dispatch(uiActions.setShowPinner(false));

    test('Dashboard is rendered correctly', () => {

        render(<Provider store={store}><BrowserRouter><Dashboard /></BrowserRouter></Provider>);

        expect(screen.getByTitle('mainHeader').textContent).toEqual('Analysis chart');
        expect(screen.getByTitle('subHeader').textContent).toEqual('Number of lessons');
        
    });

    test('spinner is rendered if loading', () => {

        render(<Provider store={store}><BrowserRouter><Dashboard /></BrowserRouter></Provider>);

            store.dispatch(uiActions.setShowPinner(true));
            expect(screen.getByTestId('spinner')).toBeInTheDocument();
            store.dispatch(uiActions.setShowPinner(false));
    });


})
