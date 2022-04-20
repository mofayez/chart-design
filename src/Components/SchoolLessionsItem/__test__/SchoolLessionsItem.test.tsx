import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../Services/store';
import '../../../i18n';
import { chartActions } from '../../../Services/slices/chart-slice';
import { BrowserRouter, useLocation } from 'react-router-dom';
import SchoolLessionsItem, { schoolLessionsItemPropsInterface } from '../SchoolLessionsItem';


describe('SchoolLessionsItem Component', () => {

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


    const props: schoolLessionsItemPropsInterface = {
        id: '620af3a468e4b2e765e7c9e7',
        lessonsCount: 140,
        schoolName: 'Burke High School',
        themColor: store.getState().ui.colorsPool[0]
    }

    test('lessons number is displayed correctly', () => {

        render(<Provider store={store}><BrowserRouter><SchoolLessionsItem {...props} /></BrowserRouter></Provider>);
        expect(screen.getByTestId('lessonsCount').textContent).toEqual('140');

    });

    test('school name is displayed correctly', () => {

        render(<Provider store={store}><BrowserRouter><SchoolLessionsItem {...props} /></BrowserRouter></Provider>);
        expect(screen.getByTestId('schoolName').textContent).toEqual('in ' + props.schoolName);

    });


    test('toggle is school is working correctly', () => {

        render(<Provider store={store}><BrowserRouter><SchoolLessionsItem {...props} /></BrowserRouter></Provider>);

        const toggleBtn = screen.getByTestId('toggleSchool');

        // first click to hide
        fireEvent.click(toggleBtn);
        expect(store.getState().chart.chartHiddenSchools.find(el => el === props.schoolName))
            .toBeDefined();

        // 2nd click to show again
        fireEvent.click(toggleBtn);
        expect(store.getState().chart.chartHiddenSchools.find(el => el === props.schoolName))
            .toBeUndefined();

    });
    

    test('school details link is formed correctly', () => {

        render(<Provider store={store}><BrowserRouter><SchoolLessionsItem {...props} /></BrowserRouter></Provider>);

        const schoolLink = screen.getByTestId('schoolName');

        expect(schoolLink.getAttribute('href')).toEqual('/school-details/Burke High School');

    });

    
    test('school details link redirects correctly', async () => {

        render(<Provider store={store}><BrowserRouter><SchoolLessionsItem {...props} /></BrowserRouter></Provider>);

        const schoolLink = screen.getByTestId('schoolName');
        fireEvent.click(schoolLink)

        expect(window.location.pathname).toEqual('/school-details/' + encodeURIComponent('Burke High School'));
        
    });

})
