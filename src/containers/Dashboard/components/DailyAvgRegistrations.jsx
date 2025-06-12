
import React from 'react'

const DailyAvgRegistrations = ({
  dateFormat,
  setDateFormat,
  setFeatureName,
  featureName,
  dataValue,
  isLoading,
}) => {
  return (
    <div style={{color:"white"}}>{dataValue}</div>

  )
}

export default DailyAvgRegistrations