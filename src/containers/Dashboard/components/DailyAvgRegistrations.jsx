
import React from 'react'
import { ClipLoader } from 'react-spinners'

const DailyAvgRegistrations = ({
  dateFormat,
  ghraphToShow,
  setGhraphToShow,
  setDateFormat,
  setFeatureName,
  featureName,
  dataValue,
  isLoading,
}) => {
  return (
    <div
      className="radius2 d-flex center py-4 my-4  cursor-pointer"
      style={{
        flexDirection: "column",
        height: "8.5rem",
        justifyContent: "center",
        backgroundColor: `#222235`,
        // backgroundColor: ` ${ghraphToShow.type == "Daily Avg Registrations"
        //   ? "rgb(61, 18, 26)"
        //   : "#222235"
        //   }`,
      }}
      onClick={(e) => {
        // setGhraphToShow({ type: "Daily Avg Registrations", bg: '#8B37A9' })
      }
      }

    >
      <h5 className="white mb-2">Daily Avg Registrations</h5>
      <h5 className="red m-0">
        {isLoading ? <ClipLoader size={20} color="#fff" /> : (dataValue || 0)}
      </h5>
    </div>

  )
}

export default DailyAvgRegistrations