import React from 'react';
import "./css/index.css"

const nftsCard = ({nfts_text, nfts_price}) => {
    return (
        <div className="position-relative nfts_card_main">
            <div className='nfts_card d-flex justify-content-center align-items-center flex-column'>
                <div className="nfts_text">{nfts_text}</div>
                <div className="nfts_price">{nfts_price}</div>
            </div>
            <div className="position-absolute nfts_div_sold"></div>
            <div className="position-absolute nfts_other_sold"></div>
        </div>
    );
};

export default nftsCard;