import React from 'react'
import { StatisticsCard } from '../../../components'
import { user2 } from '../../../assets'
import { ALLOWED_SUPPORT_GRAPH_TYPE } from '../../../data/enums'
import { ClipLoader } from 'react-spinners'

const UniqueVisits = ({
  setGhraphToShow,
  ghraphToShow,
  dateFormat,
  setDateFormat,
  setFeatureName,
  featureName,
  dataValue,
  isLoading,
}) => {
  return (
    <StatisticsCard
      icon={user2}
      count={isLoading ? <ClipLoader size={20} color="#fff" /> : (dataValue || 0)}
      status={"Unique Visitors"}
      onClick={(e) => {
        setFeatureName(ALLOWED_SUPPORT_GRAPH_TYPE.UNIQUE_VISITS)
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