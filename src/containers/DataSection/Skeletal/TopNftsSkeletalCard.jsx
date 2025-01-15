import React from "react";
import "./css/index.css"; // Import external CSS

const TopNftsSkeletalCard = ({ is_published = false }) => {
  return (
    <div className="skeletal-card">
      {/* Published/Non-Published Skeleton */}
      {
        is_published ?
          (<div className="published_span_skeletal shimmer">
            <span className="published_skeletal">PUBLISHED</span>
          </div>)
          :
          (
            <div className="published_span_skeletal shimmer">
              <span className="notpublished_skeletal">NOT PUBLISHED</span>
            </div>
          )
      }
      

      {/* Video Skeleton */}
      <div className="skeletal video-placeholder shimmer"></div>

      <div className="button_text">
        {/* Title Skeleton */}
        <div className="skeletal  title-placeholder"></div>

        {/* Button Skeleton */}
        <div className="skeletal button-placeholder"></div>

      </div>
      {/* Channel Name Skeleton */}
      <div className="skeletal channel-placeholder"></div>

      {/* Description Skeleton */}
      <div className="skeletal description-placeholder"></div>
      <div className="skeletal description-placeholder short"></div>
    </div>
  );
};

export default TopNftsSkeletalCard;
