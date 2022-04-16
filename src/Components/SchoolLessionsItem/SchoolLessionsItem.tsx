import { faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { chartActions } from '../../Services/slices/chart-slice';
import { RootState } from '../../Services/store';
import classes from './schoolLessionsItem.module.css';

export type schoolLessionsItemPropsInterface = {
    id: string,
    lessonsCount: number,
    schoolName: string,
    themColor: string
    hide?: boolean
}

/**
 * 
 * side school item compnent
 * renders the school item (# of lessons, school)
 * 
 * @param props 
 * @returns ReactElement
 */
const SchoolLessionsItem: React.FC<schoolLessionsItemPropsInterface> = (props: schoolLessionsItemPropsInterface): ReactElement => {
    
    // construct school details page url
    const urlPath: string = "school-details/" + props.schoolName;

    const dispatch = useDispatch();

    const chartHiddenSchools: string[] = useSelector((state: RootState) => state.chart.chartHiddenSchools);
   
    /**
     * listen for school icon click
     * the toggle controls the show/hide school line date in the chart
     * hidden schools are pushed to a hidden schools array in the store.
     * 
     * @param school 
     */
    const toggleSchool = (school: string) => {
        const foundIndex = chartHiddenSchools.findIndex(elm => elm === school);
        if (foundIndex === -1) {
            dispatch(chartActions.setChartHiddenSchools([...chartHiddenSchools, school]));
        } else { 
            const newHiddenArr = chartHiddenSchools.filter(item => item !== school);
            dispatch(chartActions.setChartHiddenSchools([...newHiddenArr]));
        }
    }

    return (
        <li className={classes['list-item']} style={{color: props.themColor}}>
            <span onClick={() => toggleSchool(props.schoolName)}><FontAwesomeIcon icon={faCircleDot} className={classes[props.themColor]} /></span>
            <div className={classes[props.themColor]}>
                <p className={`${classes['lessons-count']} ${classes[props.themColor]}`}>{props.lessonsCount}</p> 
                <p className={classes['lessons']}>lessons</p>
                <p className={classes['school-name']}>
                    <Link to={urlPath} style={{color: props.themColor}}>in {props.schoolName}</Link>
                </p>
            </div>
        </li>
    );
}

export default SchoolLessionsItem;