import React from 'react'
import { StatisticsCard } from '../../../components'
import { user2 } from '../../../assets'

const UniqueVisits = ({
  setGhraphToShow,
  ghraphToShow
}) => {
  return (
    <StatisticsCard
      icon={user2}
      count={0}
      status={"Unique Visitors"}
      onClick={(e) => {
        setGhraphToShow(
          { bg: '#FFB748', type: "Unique Visitors" }
        )
      }
      }
      ghraphToShow={ghraphToShow}
    />
  )
}

export default UniqueVisits