import { useEffect, useState } from "react";
import ITask from "../types/task";
import * as HelperFunctions from "../HelperFunctions/TaskSorts";
import PriorityCardStyle from "../styles/PriorityDataCardStyle.module.css";



interface PriorityDataCardInterface {
    tasks: ITask[];
    className?: React.CSSProperties;
  }


const PriorityDataCard = ({tasks, className}:PriorityDataCardInterface) => {
  const [lowPriorityCount, setLowPriorityCount] = useState(0);
  const [mediumPriorityCount, setMediumPriorityCount] = useState(0);
  const [highPriorityCount, setHighPriorityCount] = useState(0);

  useEffect(() => {
    const prioritiesCount = HelperFunctions.countByPriority(tasks);
    setLowPriorityCount(prioritiesCount.low);
    setMediumPriorityCount(prioritiesCount.medium);
    setHighPriorityCount(prioritiesCount.high);
  }, [tasks]);

    return(
      <>
        <div className={`${PriorityCardStyle.PriorityContainer} ${PriorityCardStyle.PositionRelative}`}>
            <h4 className={`${PriorityCardStyle.CenterTextTitle}`}>Priority Dashboard</h4>
          <div className={`${PriorityCardStyle.PriorityDashboardContainer}`}>  
            <div className={`${PriorityCardStyle.LeftSideDivs}`}>
                <div className={`${PriorityCardStyle.PriorityTotal} ${PriorityCardStyle.PriorityCardSize} ${PriorityCardStyle.PositionRelative}`}>
                   <div className={`${PriorityCardStyle.PriorityFonts}`}>{lowPriorityCount + mediumPriorityCount + highPriorityCount}</div>
                   <p className={`${PriorityCardStyle.CenterText}`}>Total Tasks</p>
                </div>
                <div className={`${PriorityCardStyle.PriorityLow} ${PriorityCardStyle.PriorityCardSize}`}>
                  <div className={`${PriorityCardStyle.PriorityFonts}`}>{lowPriorityCount}</div>
                  <p className={`${PriorityCardStyle.CenterText}`}>Low Priority</p>
                </div>
            </div>
           <div className={`${PriorityCardStyle.RightSideDivs}`}>
           <div className={`${PriorityCardStyle.PriorityTotal} ${PriorityCardStyle.PriorityCardSize} ${PriorityCardStyle.PositionRelative}`}> 
              <div className={`${PriorityCardStyle.PriorityFonts}`}>{mediumPriorityCount}</div>
              <p className={`${PriorityCardStyle.CenterText}`}>Medium Priority</p>
            </div>
            <div className={`${PriorityCardStyle.PriorityTotal} ${PriorityCardStyle.PriorityCardSize} ${PriorityCardStyle.PositionRelative}`}>
              <div className={`${PriorityCardStyle.PriorityFonts}`}>{highPriorityCount}</div>
              <p className={`${PriorityCardStyle.CenterText}`}>High Priority</p>
            </div>
            </div>
            <div className={`${PriorityCardStyle.Graph}`}></div>
          </div>
        </div>
      </>
    );
  };
  
  export default PriorityDataCard;