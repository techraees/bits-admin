import React from 'react'
import { StatisticsCard } from '../../../components'
import { users } from '../../../assets'

const ActiveUsers = ({
  ghraphToShow,
  setGhraphToShow
}) => {
  return (

      <StatisticsCard
        icon={users}
        count={0}
        status={"Active users"}
        onClick={(e) => {
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