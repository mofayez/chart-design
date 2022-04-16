import React, { Fragment, ReactElement, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Select, { SingleValue } from "react-select";
import { Option } from '../../Pages/Dashboard/DashboardInterface';
import { LessonsData } from '../../Services/API/get-schools';
import { chartActions } from '../../Services/slices/chart-slice';
import { RootState } from '../../Services/store';
import { customStyles } from '../../Utils/Select-custom-stylests';

interface Props {

}

/**
 * 
 * lessons filter component
 * filter by country, camp, and school
 * 
 * @param props 
 * @returns ReactElement
 */
const LessonsFilter: React.FC<Props> = (props: Props): ReactElement => {

    const dispatch = useDispatch();

    const { t } = useTranslation();


    const data = useSelector((state: RootState) => state.chart.data); // the pure data returned form API
    const countries: Option[] = useSelector((state: RootState) => state.chart.countries); // returned countries
    const camps: Option[] = useSelector((state: RootState) => state.chart.camps); // returned camps
    const schools: Option[] = useSelector((state: RootState) => state.chart.schools); // returned school
    const selectedCountry: Option = useSelector((state: RootState) => state.chart.selectedCountry); // current selected country
    const selectedCamp: Option = useSelector((state: RootState) => state.chart.selectedCamp); // current selected camp
    const selectedSchool: Option = useSelector((state: RootState) => state.chart.selectedSchool); // current selected school

    /**
     * listen for country select change
     * @param option 
     */
    const handleCountryChange = (option: SingleValue<Option>): void => {
        dispatch(chartActions.setSelectedCountry(option));
    };

    /**
     * listen for camp select cange
     * @param option 
     */
    const handleCampChange = (option: SingleValue<Option>): void => {
        dispatch(chartActions.setSelectedCamp(option));
    };

    /**
     * listent for school select change
     * @param option 
     */
    const handleSchoolChange = (option: SingleValue<Option>): void => {
        dispatch(chartActions.setSelectedSchool(option));
    };


    /**
     * filter lesson based on the selected values (country, lesson, camp)
     * if ther's a missing selection, return undefined
     * form a collection of lessons of type LessonsData[] with non-duplicated lessons data
     * while iteration, if there's a record for the same countr&camp&school, keep the old one and 
     * increese the lessons number with the current iterated index
     * calculate the total number of lessons and push it the store
     * push the filtered lessons to the store
     */
    const filterLessons = useCallback(() => {

        if (!selectedCountry?.value || !selectedSchool?.value || !selectedCamp?.value) {
            return;
        }

        let filteredLessons: LessonsData[] = [];

        data.forEach((item: LessonsData) => {

            if (
                item.country === selectedCountry.value &&
                item.camp === selectedCamp.value &&
                (
                    item.school === selectedSchool.value ||
                    selectedSchool.value === 'all'
                )
            ) {

                let monthFound: LessonsData | undefined = filteredLessons.find((lesson: LessonsData) => {
                    return lesson.month === item.month && lesson.camp === item.camp && lesson.school === item.school;
                });

                if (monthFound !== undefined) {

                    const lessonNum = monthFound.lessons as number;
                    const itemLesson = item.lessons as number;
                    monthFound = {...monthFound, lessons: lessonNum + itemLesson};

                } else {
                    filteredLessons = [...filteredLessons, item]
                }
            }
        });

        // calc lessons sum and dispatch action
        const totalNumberOfLessons = filteredLessons.reduce((total, item) => {
            const numLessons = item.lessons as number;
            return total + numLessons;
        }, 0);
        dispatch(chartActions.setTotalNumberOfLessons(totalNumberOfLessons));
        dispatch(chartActions.setFilteredLessons(filteredLessons));
        
    }, [data, dispatch, selectedCountry, selectedCamp, selectedSchool]);

   
    /**
     * call filter lesson function once component mounted and on filterLessons changes
     */
    useEffect(() => {
        filterLessons();
    }, [filterLessons]);

    /**
     * set default selections once component mounted and on dependencies changes
     */
    useEffect(() => {
    
        if (!selectedCountry?.value || !selectedSchool?.value || !selectedCamp?.value) {
            dispatch(chartActions.setSelectedCountry(countries[0]));
            dispatch(chartActions.setSelectedCamp(camps[0]));
            dispatch(chartActions.setSelectedSchool(schools[0]));
        }

    }, [dispatch, countries, camps, schools, selectedCountry, selectedCamp, selectedSchool])
    

    return (
        <Fragment>
            <div role="list">
                <label>{t("selectCountry.label")} </label>
                <Select
                    options={countries}
                    onChange={handleCountryChange}
                    styles={customStyles}
                    value={selectedCountry}
                />
            </div>
            <div role="list">
                <label>{t("selectCamp.label")} </label>
                <Select
                    options={camps}
                    onChange={handleCampChange}
                    styles={customStyles}
                    value={selectedCamp}
                />
            </div>
            <div role="list">
                <label>{t("selectSchool.label")} </label>
                <Select
                    options={schools}
                    onChange={handleSchoolChange}
                    styles={customStyles}
                    value={selectedSchool}
                />
            </div>
        </Fragment>
    );

}

export default LessonsFilter;