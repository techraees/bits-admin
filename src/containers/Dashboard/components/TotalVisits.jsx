import React from 'react'
import { StatisticsCard } from '../../../components'
import { bar_chart } from '../../../assets'

const TotalVisits = ({ ghraphToShow, setGhraphToShow }) => {
  return (
    <StatisticsCard
      icon={bar_chart}
      count={0}
      status={"Total Visits"}
      onClick={(e) => {
        setGhraphToShow({ bg: '#2F49D1', type: "Total Visits" })
      }
      }
      ghraphToShow={ghraphToShow}
    />
  )
}

export default TotalVisits