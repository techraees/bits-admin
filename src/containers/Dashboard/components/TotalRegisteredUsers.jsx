import React from 'react'
import { StatisticsCard } from '../../../components'
import { message2 } from '../../../assets'
import { ALLOWED_SUPPORT_GRAPH_TYPE } from '../../../data/enums'

const TotalRegisteredUsers = ({
  setGhraphToShow,
  ghraphToShow,
  dateFormat,
  setDateFormat,
  setFeatureName,
  featureName,
}) => {
  return (

    <StatisticsCard
      icon={message2}
      count={0}
      status={"Total Registered users"}
      onClick={(e) => {
        setFeatureName(ALLOWED_SUPPORT_GRAPH_TYPE.TOTAL_REGISTERED_USERS)
        setGhraphToShow(
          { bg: '#EA2EC1', type: "Total Registered users" }
        )
      }
      }
      ghraphToShow={ghraphToShow}
    />
  )
}

export default TotalRegisteredUsers