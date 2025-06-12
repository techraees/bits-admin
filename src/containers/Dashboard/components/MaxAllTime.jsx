import React from 'react'
import { ALLOWED_ACCEPTED_DATE_TYPE } from '../../../data/enums'

const MaxAllTime = ({
  dateFormat,
  setDateFormat,
  setFeatureName,
  featureName,
  dataValue,
  isLoading
}) => {
  return (
    <div
      className="radius2 d-flex center my-3 pb-4 pt-5 cursor-pointer"
      onClick={(e) => {
        setDateFormat(ALLOWED_ACCEPTED_DATE_TYPE.ALL_TIME)
      }}
      style={{
        flexDirection: "column",
        backgroundColor: `${dateFormat == ALLOWED_ACCEPTED_DATE_TYPE.ALL_TIME ? "rgb(61, 18, 26)" : "#8B37A9"
        // backgroundColor: `${dateFormat == ALLOWED_ACCEPTED_DATE_TYPE.ALL_TIME ? "#2a2a57" : "#8B37A9"
          }`,
      }}
    >
      <h5 className="white">Max</h5>
      <div className="d-flex center">
      </div>
    </div>

  )
}

export default MaxAllTime