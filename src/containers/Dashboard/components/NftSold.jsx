import React from 'react'
import { ClipLoader } from 'react-spinners'

const NftSold = ({
  dateFormat,
  setDateFormat,
  setFeatureName,
  featureName,
  dataValue,
  isLoading,
  ghraphToShow,
  setGhraphToShow,

}) => {
  return (
    <div
      className="radius2 d-flex center py-4 my-3 cursor-pointer"
      style={{
        flexDirection: "column",
        height: "8.5rem",
        justifyContent: "center",
        backgroundColor: `${ghraphToShow.type == "NFTs Sold"
          ? "rgb(61, 18, 26)"
          : "#222235"
          }`,
      }}
      onClick={(e) => {
        setGhraphToShow({ type: "NFTs Sold", bg: '#8B37A9' })
      }
      }
    >
      <h5 className="white mb-2">NFTs Sold</h5>
      <h5 className="red m-0">{isLoading ? <ClipLoader size={20} color="#fff" /> : (dataValue || 0)}</h5>
    </div>

  )
}

export default NftSold