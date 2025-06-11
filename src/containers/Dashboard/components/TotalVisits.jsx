import React from 'react'
import { StatisticsCard } from '../../../components'
import { bar_chart } from '../../../assets'
import { ALLOWED_SUPPORT_GRAPH_TYPE } from '../../../data/enums'

const TotalVisits = ({
  ghraphToShow,
  setGhraphToShow,
  dateFormat,
  setDateFormat,
  setFeatureName,
  featureName,
}) => {
  return (
    <StatisticsCard
      icon={bar_chart}
      count={0}
      status={"Total Visits"}
      onClick={(e) => {
        setFeatureName(ALLOWED_SUPPORT_GRAPH_TYPE.TOTAL_VISITS)
        setGhraphToShow({ bg: '#2F49D1', type: "Total Visits" })
      }
      }
      ghraphToShow={ghraphToShow}
    />
  )
}

export default TotalVisits