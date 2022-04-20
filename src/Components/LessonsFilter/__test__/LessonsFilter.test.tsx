import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../Services/store';
import '../../../i18n';
import { chartActions } from '../../../Services/slices/chart-slice';
import LessonsFilter from '../LessonsFilter';


jest.mock("react-select", () => (props: any) => {

    function handleChange(event: any) {
        const option = props.options.find(
            (option: any) => option.value === event.currentTarget.value
        );
        props.onChange(option);
    }

    return (
        <select data-testid="custom-select" value={props.value} onChange={handleChange}>
            {props.options.map((option: any) => (
                <option key={option.value} value={option.value}>
                    {option.value}
                </option>
            ))}
        </select>
    );
});

afterEach(cleanup);

describe('LessonsFilter Component', () => {

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

    test('component labels are rendered', () => {
        render(<Provider store={store}><LessonsFilter /></Provider>);

        expect(screen.getByText(/Select Country/i)).toBeInTheDocument();
        expect(screen.getByText(/Select Camp/i)).toBeInTheDocument();
        expect(screen.getByText(/Select School/i)).toBeInTheDocument();
    });


    test('first options are selected by default', () => {

        render(<Provider store={store}><LessonsFilter /></Provider>);

        expect(store.getState().chart.selectedCountry).toEqual(store.getState().chart.countries[0]);
        expect(store.getState().chart.selectedCamp).toEqual(store.getState().chart.camps[0]);
        expect(store.getState().chart.selectedSchool).toEqual({ label: 'all', value: 'all' });

    });

    test('leassons are filtered', () => {

        render(<Provider store={store}><LessonsFilter /></Provider>);

        const expectation = [
            {
              id: '620af3a468e4b2e765e7c9e7',
              month: 'Feb',
              camp: 'Omaka',
              country: 'Egypt',
              school: 'Burke High School',
              lessons: 140
            }
          ];

          expect(store.getState().chart.filteredLessons).toEqual(expectation);

    });

    test('change country select changes store', async () => {

        render(<Provider store={store}><LessonsFilter /></Provider>);

        const countrySelect = screen.getAllByRole("combobox")[0];
        fireEvent.change(countrySelect, { target: { value: 'Tunisia' } })

        expect(store.getState().chart.selectedCountry.value).toEqual('Tunisia');

    });

    
    test('change camp select changes store', async () => {

        render(<Provider store={store}><LessonsFilter /></Provider>);

        const countrySelect = screen.getAllByRole("combobox")[1];
        fireEvent.change(countrySelect, { target: { value: 'Kakuma' } })

        expect(store.getState().chart.selectedCamp.value).toEqual('Kakuma');

    });

    
    test('change school select changes store', async () => {

        render(<Provider store={store}><LessonsFilter /></Provider>);

        const countrySelect = screen.getAllByRole("combobox")[2];
        fireEvent.change(countrySelect, { target: { value: 'Burke High School' } })

        expect(store.getState().chart.selectedSchool.value).toEqual('Burke High School');

    });


})


