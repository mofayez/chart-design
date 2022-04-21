import React, { Fragment, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
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

    const params = useParams();
    const schoolName = params.schoolName; // get schooleName from params


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    return (
        <Fragment>
            <h1>{schoolName}</h1>
            <p>Country: {queryParams.get('country')}</p>
            <p>Camp: {queryParams.get('camp')}</p>
            <p># of Lessons: {queryParams.get('lessons')}</p>
        </Fragment>
    );
}

export default SchoolDetails;