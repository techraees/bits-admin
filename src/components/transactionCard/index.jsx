import { useState } from "react";
import "./css/index.css";
import moment from "moment";
import CopyToClipBoard from "../copyToClipBoard";
import { trimWallet } from "../../utills/trimWalletAddr";
import { ETHTOUSD, MATICTOUSD } from "../../utills/currencyConverter";

const TransactionCard = ({ data }) => {
  const [ethBal, setEthBal] = useState(0);
  const [maticBal, setMaticBal] = useState(0);

  ETHTOUSD(1).then((result) => {
    setEthBal(result);
  });

  MATICTOUSD(1).then((result) => {
    setMaticBal(result);
  });

  console.log(data[0]?.createdAt,"THIS IS THE DATA COMING")
  return (
    <>
      {data?.map((d) => (
        <div className="transaction_card" key={d?._id}>
          <div className="d-flex justify-content-between align-items-center flex-wrap transaction_hash_section">
            <div className=" d-flex justify-content-between align-items-center flex-wrap">
              <div className="hash">Transaction Hash</div>
              <div className="hash">&nbsp; :</div>
            </div>
            <div className="transaction_hash d-flex justify-content-between align-items-center flex-wrap">
              <div className="hash_code">
                {d?.hash_field && trimWallet(d?.hash_field, 66)}
              </div>
              <CopyToClipBoard text={d?.hash_field} />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="form_div d-flex justify-content-between align-items-center flex-wrap">
              <div className="hash">From</div>
              <div className="hash">&nbsp; :</div>
            </div>
            <div className="from_hash d-flex justify-content-between align-items-center flex-wrap">
              <div className="hash_code">{(d?.second_person_wallet_address || d?.first_person_wallet_address) && trimWallet(d?.second_person_wallet_address || d?.first_person_wallet_address, 42)}</div>
              <CopyToClipBoard text={d?.second_person_wallet_address || d?.first_person_wallet_address} />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap date_price">
            <div className="d-flex justify-content-between align-items-center">
              {d?.is_success ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_37_1154)">
                    <path
                      d="M23 12L20.56 9.21L20.9 5.52L17.29 4.7L15.4 1.5L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5L3.44 9.2L1 12L3.44 14.79L3.1 18.49L6.71 19.31L8.6 22.5L12 21.03L15.4 22.49L17.29 19.3L20.9 18.48L20.56 14.79L23 12ZM10.09 16.72L6.29 12.91L7.77 11.43L10.09 13.76L15.94 7.89L17.42 9.37L10.09 16.72Z"
                      fill="#00FF0A"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_37_1154">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_37_1176)">
                    <path
                      d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"
                      fill="#B22E2E"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_37_1176">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}

              <span className="date">{moment(d?.createdAt).format("L")}</span>
            </div>
            <div className="price">
              $ 
              {isNaN(d?.chain_id == 5
                ? ((d?.amount * ethBal).toFixed(6) || d?.amount)
                : ((d?.amount * maticBal).toFixed(6) || d?.amount)) ?
                d?.amount
                :
                d?.chain_id == 5
                  ? ((d?.amount * ethBal).toFixed(6) || d?.amount)
                  : ((d?.amount * maticBal).toFixed(6) || d?.amount)
              }
            </div>
          </div>

          <button className="view_transaction">
            <a
              href={`https://${d?.chain == 5 ? "goerli.etherscan.io" : "mumbai.polygonscan.com"
                }/tx/${d?.hash_field}`}
              target="_blank"
            >
              View Transaction
            </a>
          </button>
        </div>
      ))}
    </>
  );
};

export default TransactionCard;
