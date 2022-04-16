import { Option } from "../../Pages/Dashboard/DashboardInterface";
import { chartActions } from "../slices/chart-slice";
import { uiActions } from "../slices/ui-slice";
import { AppDispatch } from "../store";


export interface LessonsData {
    id?: string,
    month?: string,
    country?: string,
    camp?: string,
    school?: string,
    lessons?: number
};

/**
 * call schools data serice
 */
export const getSchoolsData = () => {
    return async (dispatch: AppDispatch) => {
        // pending handling (set service error to false, and show spinner)
        dispatch(chartActions.setServiceError(false));
        dispatch(uiActions.setShowPinner(true));

        // send request to chart-data.json service
        const sendRequest = async () => {
            const response = await fetch('chart-data.json');

            if (!response.ok) {
                throw new Error('Internal Server Error!');
            }

            return response;
        }

        try {
            const resposne = await sendRequest(); // send request
            const jsonResponse = await resposne.json();  // Jasonify data

            dispatch(chartActions.setServiceError(false)); // set service error to false

            const countries = getCountries(jsonResponse); // get countries list
            const camps = getCamps(jsonResponse); // get camps list
            const schools = getSchools(jsonResponse); // get school list 

            // save data, counties, camps, and school to the store
            dispatch(chartActions.setData(jsonResponse));
            dispatch(chartActions.setCountries({countries}));
            dispatch(chartActions.setCamps({camps}));
            dispatch(chartActions.setSchools({schools}));

            // hide spinner
            dispatch(uiActions.setShowPinner(false));

        } catch (error) {
            // hide spinner and set service error to true
            dispatch(uiActions.setShowPinner(false));
            dispatch(chartActions.setServiceError(true));
        }
    }
}

/**
 * grape countries form the data
 * 
 * @param data 
 * @returns countries[]
 */
export const getCountries = (data: LessonsData[]) => {
    let countries: Option[] = [];

    data.forEach((item) => {
        const countryFound = countries.findIndex(country => country.value === item.country);
        if (countryFound === -1) {
            countries.push({value: item.country, label: item.country})
        }
    });

    return countries;
}

/**
 * grape camps form the data
 * 
 * @param data 
 * @returns camps[]
 */
export const getCamps = (data: LessonsData[]) => {
    let camps: Option[] = [];

    data.forEach((item) => {
        const campFound = camps.findIndex(camp => camp.value === item.camp);
        if (campFound === -1) {
            camps.push({value: item.camp, label: item.camp})
        }
    });

    return camps;
}

/**
 * grape schools form the data
 * 
 * @param data 
 * @returns schools[]
 */
export const getSchools = (data: LessonsData[]) => {
    let schools: Option[] = [{value: 'all', label: 'Show All'}];

    data.forEach((item) => {
        const schoolFound = schools.findIndex(school => school.value === item.school);
        if (schoolFound === -1) {
            schools.push({value: item.school, label: item.school})
        }
    });

    return schools;
}