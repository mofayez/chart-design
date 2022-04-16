import React, { Fragment, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LessonsData } from "../../Services/API/get-schools";
import { RootState } from "../../Services/store";

interface Props {
}

/**
 * renders school details
 * 
 * @param props 
 * @returns ReactElement
 */
const SchoolDetails: React.FC<Props> = (props: Props): ReactElement => {

    const filteredLessons: LessonsData[] = useSelector((state: RootState) => state.chart.filteredLessons);

    const params = useParams();
    const schoolName = params.schoolName; // get schooleName from params
    
    // search lessons data by the school name
    const schoolDataIndex = filteredLessons.findIndex((item: LessonsData) => item.school === schoolName);

    // grab the firs found data for the school
    const country: string = filteredLessons[schoolDataIndex].country as string;
    const camp: string = filteredLessons[schoolDataIndex].camp as string;
    const lessons: number = filteredLessons[schoolDataIndex].lessons as number;
    
    return (
        <Fragment>
            <h1>{schoolName}</h1>
            <p>Country: {country}</p>
            <p>Camp: {camp}</p>
            <p># of Lessons: {lessons}</p>
        </Fragment>
    );
}

export default SchoolDetails;