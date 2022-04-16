import React, { ReactElement, useEffect } from "react";
import { DashboardProps } from "./DashboardInterface";
import classes from "./Dashboard.module.css";
import SchoolLessonList from "../../Components/SchoolLessonList/SchoolLessonList";
import { getSchoolsData } from '../../Services/API/get-schools';
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../Components/chart/Chart";
import LessonsFilter from "../../Components/LessonsFilter/LessonsFilter";
import { RootState } from "../../Services/store";
import { ClipLoader } from "react-spinners";
import { spinnerCustomStyle } from "../../Utils/spinner-custom-style";
import Header from "../../Components/Header/Header";
import GeneralErrorPage from "../GeneralErrorPage/GeneralErrorPage";
import { chartActions } from "../../Services/slices/chart-slice";


let isInitial: boolean = true;

/**
 * renders dasboard page
 * 
 * @param props 
 * @returns ReactElement
 */
const Dashboard: React.FC<DashboardProps> = (props: DashboardProps = {}): ReactElement => {

  const dispatch = useDispatch();

  const showPinner = useSelector((state: RootState) => state.ui.showSpinner)
  const serviceError = useSelector((state: RootState) => state.chart.serviceError)


  /**
   * set service existing error to fasle by init
   * call getSchoolData service
   */
  useEffect(() => {

    dispatch(chartActions.setServiceError(false));

    if (isInitial) {
      isInitial = false;

      return;
    }

    dispatch(getSchoolsData());

  }, [dispatch]);

  // show spinner if still loading
  if (showPinner) {
    return (
      <ClipLoader loading={showPinner} css={spinnerCustomStyle} size={250} />
    );
  }

  // show GeneralErrorPage if ther's a service call error
  if (serviceError) {
    return (
      <GeneralErrorPage />
    );
  }

  return (
    <div>
      <Header />
      <section className={classes["select-filters"]}>
        <LessonsFilter />
      </section>
      <section className={classes["chart-section"]}>
        <div className={classes["chart-js"]}>
          <Chart/>
        </div>
        <div>
          <SchoolLessonList />
        </div>
      </section>
    </div>
  );
};

export default React.memo(Dashboard);
