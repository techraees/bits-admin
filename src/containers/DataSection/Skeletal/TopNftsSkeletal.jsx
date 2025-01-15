import React from 'react'
import './css/index.css'
import TopNftsSkeletalCard from './TopNftsSkeletalCard'

const TopNftsSkeletal = () => {
  const topNftsData = Array.from({ length: 8 }, () => ({
    is_published: Math.random() < 0.5 
  }));


  return (
    <div className='top_nfts_skeletal_parent'>
      {topNftsData.map((item, index) => (
        <TopNftsSkeletalCard key={index} is_published={item.is_published} />
      ))}
    </div>
  )
}

export default TopNftsSkeletal