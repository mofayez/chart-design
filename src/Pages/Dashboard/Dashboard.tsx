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
  const en: boolean = useSelector((state: RootState) => state.ui.en); // current lang


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
      <div data-testid="spinner">
        <ClipLoader loading={showPinner} css={spinnerCustomStyle} size={250} />
      </div>
    );
  }

  // show GeneralErrorPage if ther's a service call error
  if (serviceError) {
    return (
      <GeneralErrorPage />
    );
  }

  const rtl = !en ? classes.rtl : '';

  return (
    <div>
      <Header data-testid="header" />
      <section className={`${classes["select-filters"]} ${rtl}`}>
        <LessonsFilter data-testid="LessonsFilter" />
      </section>
      <section className={classes["chart-section"]}>
        <div className={classes["chart-js"]}>
          <Chart data-testid="chart" />
        </div>
        <div>
          <SchoolLessonList data-testid="SchoolLessonList" />
        </div>
      </section>
    </div>
  );
};

export default React.memo(Dashboard);
