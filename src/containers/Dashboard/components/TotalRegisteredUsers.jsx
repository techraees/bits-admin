import React from 'react'
import { StatisticsCard } from '../../../components'
import { message2 } from '../../../assets'
import { ALLOWED_SUPPORT_GRAPH_TYPE } from '../../../data/enums'
import { ClipLoader } from 'react-spinners'

const TotalRegisteredUsers = ({
  setGhraphToShow,
  ghraphToShow,
  dateFormat,
  setDateFormat,
  setFeatureName,
  featureName,
  dataValue,
  isLoading
}) => {
  return (

    <StatisticsCard
      icon={message2}
      count={isLoading ? <ClipLoader size={20} color="#fff" /> : (dataValue || 0)}
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