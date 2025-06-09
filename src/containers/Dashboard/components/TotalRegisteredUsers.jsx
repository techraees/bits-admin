import React from 'react'
import { StatisticsCard } from '../../../components'
import { message2 } from '../../../assets'

const TotalRegisteredUsers = ({
  setGhraphToShow,
  ghraphToShow
}) => {
  return (
      
            <StatisticsCard
              icon={message2}
              count={0}
              status={"Total Registered users"}
              onClick={(e) => {
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