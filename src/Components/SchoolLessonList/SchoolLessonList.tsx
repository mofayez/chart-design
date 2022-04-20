import React, { Fragment, ReactElement } from "react";
import SchoolLessonItem from "../SchoolLessionsItem/SchoolLessionsItem";
import { schoolLessionsItemPropsInterface } from "../SchoolLessionsItem/SchoolLessionsItem";
import { Scrollbars } from "react-custom-scrollbars";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Services/store";
import { Option } from "../../Pages/Dashboard/DashboardInterface";
import classes from "./SchoolLessonList.module.css";
import { LessonsData } from "../../Services/API/get-schools";
import { get_random_color } from "../../Utils/generate-colors";
import { uiActions } from "../../Services/slices/ui-slice";
import { chartActions } from "../../Services/slices/chart-slice";

interface Props {
}

/**
 * 
 * returns a list of schools Lessons item
 * data is grouped by school
 * each school has its own data of type schoolLessionsItemPropsInterface
 * 
 * @param props 
 * @returns ReactElement
 */
const SchoolLessonList: React.FC<Props> = (props: Props): ReactElement => {

  const dispatch = useDispatch();

  const totalNumberOfLessons: number = useSelector((state: RootState) => state.chart.totalNumberOfLessons);
  const selectedCamp: Option = useSelector((state: RootState) => state.chart.selectedCamp);

  const filteredLessons = useSelector((state: RootState) => state.chart.filteredLessons);
  const aggregatedLessons: schoolLessionsItemPropsInterface[] = [];
  const chartColors: string[] = [];

  // loop throw the filter lesson
  // check if the current iterated item was push to the aggregatedLessons
  // if yes, update its lessons data
  // if no, push a new record to the array
  filteredLessons.forEach((item: LessonsData) => {

    const schoolIndexFound = aggregatedLessons.findIndex((lesson: schoolLessionsItemPropsInterface) => {

      return lesson.schoolName === item.school;
    });

    if (schoolIndexFound !== -1) {

      const lessonNum = aggregatedLessons[schoolIndexFound].lessonsCount as number;
      const itemLesson = item.lessons as number;
      aggregatedLessons[schoolIndexFound] = {
        ...aggregatedLessons[schoolIndexFound],
        lessonsCount: lessonNum + itemLesson
      };
    } else {

      // generate a random color for each school
      // this color takes place on the side list and chart
      const color = get_random_color();
      chartColors.push(color);

      // push the color to the colors pool on the store
      // the store value will be used on coloring line on the chart
      dispatch(uiActions.setColorsPool([...chartColors]));

      aggregatedLessons.push({
        id: item.id as string,
        lessonsCount: item.lessons as number,
        schoolName: item.school as string,
        themColor: color
      });

      dispatch(chartActions.setAggregatedLessons([...aggregatedLessons]));
    }
  });

  return (
    <Fragment>
      {totalNumberOfLessons !== 0 && <div className={classes['total-camp-lessons']} style={{ color: "#333" }}>
        <div>
          <p className={classes['lessons-count']} data-testid="totalLessonsNum">{totalNumberOfLessons}</p>
          <p className={classes['lessons']}>lessons</p>
          <p className={classes['camp-name']} data-testid="campName"> in {selectedCamp.label}</p>
        </div>
      </div>}
      <Scrollbars
        style={{ width: 300, height: 300 }}
        renderTrackHorizontal={props =>
          <div
            {...props}
            style={{ display: 'none' }}
            className="track-horizontal" />
      }>
        <ul>
          {aggregatedLessons.length > 0 &&
            aggregatedLessons.map((item) => (
              <SchoolLessonItem
                key={item.id}
                id={item.id}
                lessonsCount={item.lessonsCount}
                schoolName={item.schoolName}
                themColor={item.themColor}
                data-testid="schoolLessonItem"
              />
            ))}
        </ul>
      </Scrollbars>
    </Fragment>
  );
};

export default SchoolLessonList;
