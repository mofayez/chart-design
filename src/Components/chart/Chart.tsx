import React, { ReactElement, useRef } from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getElementAtEvent, Line } from 'react-chartjs-2';
import { LessonsData } from '../../Services/API/get-schools';
import { schoolLessionsItemPropsInterface } from '../SchoolLessionsItem/SchoolLessionsItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../Services/store';
import { MONTHS } from '../../Config/Config';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/**
 * Line chartjs options 
 */
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        }
    },
};


/**
 * 
 * for prepared data for the chart
 * arrange school data per months
 * if ther's a missing monthe, 0 lessons will be assigned to this month
 * 
 * @param data LessonsData[]
 * @param schools string[]
 * @returns preparedData 
 */
const prepareDataForChart = (data: LessonsData[], schools: string[]) => {
    let preparedData: any = {};
    schools.forEach((school) => {
        let schoolData: LessonsData[] = [];
        MONTHS.forEach(month => {
            let monthData = {};

            // check monthe data for a school
            const schoolMonthData = data.find((item: LessonsData) => item.school === school && item.month === month);

            // push to data if exists
            // otherwise, for a school record with 0 lessons
            if (schoolMonthData) {
                monthData = schoolMonthData;
            } else {
                const schoolByName = data.find((item: LessonsData) => item.school === school);
                monthData = {
                    id: '_id' + school + month,
                    month: month,
                    school: school,
                    lessons: 0,
                    camp: schoolByName?.camp,
                    country: schoolByName?.country
                }
            }

            schoolData.push(monthData)
        });
        
        preparedData[school] = schoolData;
    });

    return preparedData;
} 

interface Props {
}

/**
 * 
 * renders Line chartjs
 * form a prepared data for the chart and initialize Line chartjs
 * 
 * @param props 
 * @returns ReactElement
 */
const Chart: React.FC<Props> = (props: Props): ReactElement => {

    const navigate = useNavigate();

    const filteredLessons: LessonsData[] = useSelector((state: RootState) => state.chart.filteredLessons);
    const chartHiddenSchools: string[] = useSelector((state: RootState) => state.chart.chartHiddenSchools);
    const aggregatedLessons = useSelector((state: RootState) => state.chart.aggregatedLessons);
    const colors = useSelector((state: RootState) => state.ui.colorsPool);
    const schools = aggregatedLessons.map((lesson: schoolLessionsItemPropsInterface) => lesson.schoolName);
    const preparedData = prepareDataForChart(filteredLessons, schools);

    // form chart datasets
    let datasets: any = [];
    schools.forEach((school, index) => {
        const findSchool = chartHiddenSchools.findIndex(item => item === school);
        if (findSchool === -1) {
            const schoolData = preparedData[school] as LessonsData[];
            const values = schoolData.map(item => item.lessons as number);

            datasets.push({
                label: school as string,
                data: values,
                backgroundColor: colors[index],
                borderColor: colors[index],
                pointRadius: 10,
            });
        }
    });
    
    const data = {
        labels: MONTHS,
        datasets: datasets
    };

    const chartRef= useRef();
    const onClick = (event: any) => {
        const current: any = chartRef.current;

        const activePoint = getElementAtEvent(current, event);

        if (activePoint.length > 0) {
            const clickedDatasetIndex = activePoint[0].datasetIndex;
            const clickedElementindex = activePoint[0].index;
            
            const month = data.labels[clickedElementindex];
            const lessonsCount = data.datasets[clickedDatasetIndex].data[clickedElementindex];
            const schoolName = data.datasets[clickedDatasetIndex].label;     

            let redirectionUrl = '/school-details/';
            redirectionUrl += encodeURIComponent(schoolName) + '?';
            redirectionUrl += '&country=' + preparedData[schoolName][0].country;
            redirectionUrl += '&camp=' + preparedData[schoolName][0].camp;
            redirectionUrl += '&monthe=' + month;
            redirectionUrl += '&lessons=' + lessonsCount;

            navigate(redirectionUrl);
            
        }
    }

    return <Line options={options} data={data} onClick={onClick} ref={chartRef} />;
}

export default Chart;