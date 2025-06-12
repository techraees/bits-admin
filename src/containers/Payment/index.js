import { useSelector } from "react-redux";
import { Button, Col, Form, Input, Row } from "antd";
import { NavbarComponent } from "../../components";
import TransactionCard from "../../components/transactionCard";
import NftsCard from "../../components/nftsCard";
import "./css/index.css";
import { useEffect, useRef, useState } from "react";
import { GET_ALL_TRANSACTIONS, GET_ALL_TRANSACTIONS_GRAPH_DATA } from "../../gql/queries";
import { useQuery } from "@apollo/client";
import { fa } from "faker/lib/locales";

const Payment = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [tblContentsMobile, setTblContentsMobile] = useState(
    window.innerWidth <= 767.98
  );
  const [filter] = Form.useForm();

  const { transactionData } = useSelector(
    (state) => state.totalTrans.transactionData
  );
  const txs = useSelector((state) => state.allTrans);

  useEffect(() => {
    if (txs) {
      setAllTransactions(txs);
    }
  }, [txs]);



  const filterForm = (values) => {
    let query_string = "";
    for (let key in values) {
      if (
        values[key] === undefined ||
        values[key] === "" ||
        values[key] === null
      ) {
        delete values[key];
      } else {
        // query_string += `${key}=${values[key]}`;
        query_string += `${values[key]}`;
      }
    }
    if (!query_string) {
      return;
    } else {
      // Api call
      const result = txs.filter(
        (item) => item.transaction_hash == query_string
      );
      setAllTransactions(result);
    }
  };

  function reportWindowSize() {
    window.innerWidth <= 767.98
      ? setTblContentsMobile(true)
      : setTblContentsMobile(false);
  }

  window.addEventListener("resize", reportWindowSize);
  const [inputValue, setInputValue] = useState('');
  const [stopCalling, setStopCalling] = useState(false);
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const [getAllTransactionsDataState, setGetAllTransactionsDataState] = useState([])

  const {
    loading: getAllTransactionLoading,
    fetching: getAllTransactionFetching,
    error: getAllTransactionError,
    data: getAllTransactionsData,
    refetch: getAllTransactionRefetch,
  } = useQuery(GET_ALL_TRANSACTIONS, {
    variables: {
      token: localStorage.getItem('adminToken'),
      filterObj: {
        q: inputValue,
        page,
        limit: 10
      }
    },
  });


  const {
    loading: getAllTransactionGraphDataLoading,
    error: getAllTransactionGraphDataError,
    data: getAllTransactionGraphDatasData,
    refetch: getAllTransactionGraphDataRefetch,
    networkStatus
  } = useQuery(GET_ALL_TRANSACTIONS_GRAPH_DATA, {
    variables: {
      token: localStorage.getItem('adminToken'),
      filterObj: {
        q: inputValue,
      }
    },
  });

  const isInitialLoading = getAllTransactionGraphDataLoading && networkStatus === 1;
  const isRefetching = networkStatus === 4;

  const handleChange = (e) => {
    setGetAllTransactionsDataState([])
    setPage(1)
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    alert(`Input Value: ${inputValue}`);
  };


  // ========================== Infinite Scroll Function ===========================
  const handleScroll = () => {
    const container = scrollRef.current;
    if (container) {
      // Check if the scroll position is at the bottom of the container
      if (
        container.scrollHeight - container.scrollTop <= container.clientHeight + 10
      ) {
        if (!getAllTransactionLoading && !getAllTransactionFetching) {
          if (!stopCalling) {
            setPage((prevPage) => parseInt(prevPage) + 1); // Load the next page
          }
        }
      }
    }
  };
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);  // Attach the scroll event listener
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);  // Clean up the event listener
      }
    };
  }, [getAllTransactionLoading, getAllTransactionFetching, stopCalling]);

  // ========================== Infinite Scroll Function ===========================

  useEffect(() => {
    setStopCalling(false);
  }, []);


  useEffect(() => {
    if (getAllTransactionsData?.getAllTransactionsAndApplyFilter?.payload?.results) {
      setGetAllTransactionsDataState((prev) => ([...prev, ...getAllTransactionsData?.getAllTransactionsAndApplyFilter?.payload?.results]))
    }
  }, [getAllTransactionsData])


  const filteredForm = () => {
    return (
      <Form
        autoComplete={"off"}
        layout={"vertical"}
        onFinish={filterForm}
        form={filter}
      >
        <Row gutter={[30, 16]} align={"middle"}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <Form.Item name={"name"} className={"search"}>
              <Input
                value={inputValue}
                onChange={handleChange}
                prefix={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_37_1118)">
                      <path
                        d="M23.111 20.058L18.134 15.081C19.099 13.561 19.657 11.759 19.657 9.83C19.657 4.41 15.248 0 9.828 0C4.408 0 0 4.41 0 9.83C0 15.25 4.408 19.66 9.829 19.66C11.663 19.66 13.381 19.155 14.851 18.277L19.872 23.298C22.016 25.439 25.256 22.202 23.111 20.058ZM3.047 9.83C3.047 6.091 6.09 3.048 9.829 3.048C13.568 3.048 16.611 6.09 16.611 9.83C16.611 13.57 13.568 16.612 9.829 16.612C6.09 16.612 3.047 13.569 3.047 9.83ZM5.057 8.066C7.041 3.467 13.721 4 14.979 8.815C12.445 5.841 7.986 5.521 5.057 8.066Z"
                        fill="#363652"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_37_1118">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                }
                placeholder={"Search....."}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={6}>
            <Form.Item>
              <Button
                onClick={handleSubmit}
                htmlType="submit"
                type="primary"
                className={"search_button"}
              >
                SEARCH
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  };


  return (
    <div className="bg-color">
      <NavbarComponent headerTxt={"Payment"} selectedKey={"5"} />
      <div
        className="container bg-color radius1 p-4 payment_page"
        style={{ marginTop: 65 }}
      >
        <h1 className={"page_title"}>Transactions</h1>
        {tblContentsMobile === false && filteredForm()}
        <div className="row">
          <div className="col-md-6 order-md-0 order-sm-last order-last">
            {tblContentsMobile && filteredForm()}
            {isRefetching && <div style={{ color: "#fff" }}>Loading...</div>}
            <div
              className="transaction_scrollbar"
              style={{ height: "calc(88vh - 50px)", overflow: "auto" }}
              ref={scrollRef}
            >
              {(getAllTransactionGraphDataLoading) ? Array.from({ length: 5 }).map((item, index) => (
                <div className="transaction_card skeleton shimmer" key={index}>
                  <div className="parent_transaction_detail">
                    <div className="transaction_detail">
                      <span className="skeleton_child shimmer_skeleton_child skeletal_transaction_hash"></span>
                      <span className="skeleton_child shimmer_skeleton_child skeletal_transaction_hash_colon"></span>
                    </div>
                    <div className="transaction_detail_hash_field">
                      <span className="skeleton_child shimmer_skeleton_child transaction_detail_hash_field_field_data"></span>
                      <span className="skeleton_child shimmer_skeleton_child transaction_detail_hash_field_icon_copy"></span>
                    </div>
                  </div>
                  <div className="parent_transaction_detail_from_data">
                    <div className="transaction_detail">
                      <span className="skeleton_child shimmer_skeleton_child parent_transaction_detail_from_data_field"></span>
                      <span className="skeleton_child shimmer_skeleton_child skeletal_transaction_hash_colon"></span>
                    </div>
                    <div className="transaction_detail_hash_field">
                      <span className="skeleton_child shimmer_skeleton_child transaction_detail_hash_field_field_data"></span>
                      <span className="skeleton_child shimmer_skeleton_child transaction_detail_hash_field_icon_copy"></span>
                    </div>
                  </div>
                  <div className="parent_transaction_detail_amount_data">
                    <div className="transaction_detail">
                      <span className="skeleton_child shimmer_skeleton_child parent_transaction_detail_amount_data_circle_icon"></span>
                      <span className="skeleton_child shimmer_skeleton_child parent_transaction_detail_amount_data_date_field"></span>
                    </div>
                    <div className="transaction_detail_hash_field">
                      <span className="skeleton_child shimmer_skeleton_child parent_transaction_detail_amount_field"></span>
                    </div>
                  </div>
                  <div className="parent_transaction_detail_button skeleton_child shimmer_skeleton_child">
                  </div>

                </div>
              )) :

                <TransactionCard
                  data={getAllTransactionsDataState}
                />
              }
            </div>
          </div>
          <div className="col-md-6 order-md-0 order-sm-first order-first mb-4 mb-md-0">
            <div className="position-relative">
              <div className="total_transaction ">
                <div className="total_transaction_text">Total Transactions</div>
                {(getAllTransactionGraphDataLoading) ? <div className="total_transaction_price_skeletal" >...</div> :
                  <div className="total_transaction_price">
                    {getAllTransactionGraphDatasData?.getAllTransactionGraphData?.payload?.countAllTransactions}
                  </div>
                }
              </div>
              <div className="bg_one position-absolute"></div>
              <div className="bg_two position-absolute"></div>
            </div>
            <div className="d-flex justify-content-between align-items-center nfts_section">
              <NftsCard
                nfts_text="Total Nfts Sold"
                nfts_price={getAllTransactionGraphDatasData?.getAllTransactionGraphData?.payload?.selling_nft}
                isInitialLoading={getAllTransactionGraphDataLoading}
                getAllTransactionLoading={getAllTransactionGraphDataLoading}
              />
              <NftsCard
                nfts_text="Total Nfts Bought"
                nfts_price={getAllTransactionGraphDatasData?.getAllTransactionGraphData?.payload?.buying_nft}
                isInitialLoading={getAllTransactionGraphDataLoading}
                getAllTransactionLoading={getAllTransactionGraphDataLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
