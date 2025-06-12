import React from 'react'
import { StatisticsCard } from '../../../components'
import { users } from '../../../assets'
import { ALLOWED_SUPPORT_GRAPH_TYPE } from '../../../data/enums'
import { ClipLoader } from 'react-spinners'

const ActiveUsers = ({
  ghraphToShow,
  setGhraphToShow,
  dateFormat,
  setDateFormat,
  setFeatureName,
  featureName,
  dataValue,
  isLoading
}) => {
  return (

    <StatisticsCard
      icon={users}
      count={isLoading ? <ClipLoader size={20} color="#fff" /> : (dataValue || 0)}
      status={"Active users"}
      onClick={(e) => {
        setFeatureName(ALLOWED_SUPPORT_GRAPH_TYPE.ACTIVE_USERS)
        setGhraphToShow(
          { bg: '#3386C1', type: "Active users" }
        )
      }
      }
      ghraphToShow={ghraphToShow}
    />
  )
}

export default ActiveUsers