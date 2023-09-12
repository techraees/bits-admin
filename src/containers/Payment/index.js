import {Button, Col, Form, Input, Row} from "antd";
import {NavbarComponent} from "../../components";
import TransactionCard from "../../components/transactionCard";
import NftsCard from "../../components/nftsCard";
import "./css/index.css";
import {useState} from "react";

const Payment = () => {
    const [tblContentsMobile, setTblContentsMobile] = useState(window.innerWidth <= 767.98);
    const [filter] = Form.useForm()
    const data = [
        {
            id: 1,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJX',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJJ',
            is_success: true,
            date: new Date(),
            price: '300',
        },
        {
            id: 2,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJA',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJI',
            is_success: false,
            date: new Date(),
            price: '300',
        },
        {
            id: 3,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJS',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJR',
            is_success: true,
            date: new Date(),
            price: '300',
        },
        {
            id: 4,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJS',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJR',
            is_success: true,
            date: new Date(),
            price: '300',
        },
        {
            id: 5,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJS',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJR',
            is_success: true,
            date: new Date(),
            price: '300',
        },
        {
            id: 6,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJS',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJR',
            is_success: true,
            date: new Date(),
            price: '300',
        },
        {
            id: 7,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJS',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJR',
            is_success: true,
            date: new Date(),
            price: '300',
        },
        {
            id: 8,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJS',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJR',
            is_success: true,
            date: new Date(),
            price: '300',
        },
        {
            id: 9,
            transaction_hash: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJS',
            from: '6zySCRftBgFLSqFN9F52Rj4tLMECFDHfJR',
            is_success: true,
            date: new Date(),
            price: '300',
        }
    ]

    const filterForm = (values) => {
        let query_string = '';
        for (let key in values) {
            if (values[key] === undefined || values[key] === '' || values[key] === null) {
                delete values[key]
            } else {
                query_string += `${key}=${values[key]}`
            }
        }
        if (!query_string) {
            return;
        } else {
            // Api call
            console.log(query_string)
        }
    }

    function reportWindowSize() {
        window.innerWidth <= 767.98 ? setTblContentsMobile(true) : setTblContentsMobile(false);
    }

    window.addEventListener('resize', reportWindowSize);

    const filteredForm = () => {
        return (
            <Form
                autoComplete={"off"}
                layout={"vertical"}
                onFinish={filterForm}
                form={filter}
            >
                <Row gutter={[30, 16]} align={'middle'}>
                    <Col xs={24} sm={24} md={12} lg={8}>
                        <Form.Item
                            name={'name'}
                            className={'search'}
                        >
                            <Input prefix={
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <g clip-path="url(#clip0_37_1118)">
                                        <path
                                            d="M23.111 20.058L18.134 15.081C19.099 13.561 19.657 11.759 19.657 9.83C19.657 4.41 15.248 0 9.828 0C4.408 0 0 4.41 0 9.83C0 15.25 4.408 19.66 9.829 19.66C11.663 19.66 13.381 19.155 14.851 18.277L19.872 23.298C22.016 25.439 25.256 22.202 23.111 20.058ZM3.047 9.83C3.047 6.091 6.09 3.048 9.829 3.048C13.568 3.048 16.611 6.09 16.611 9.83C16.611 13.57 13.568 16.612 9.829 16.612C6.09 16.612 3.047 13.569 3.047 9.83ZM5.057 8.066C7.041 3.467 13.721 4 14.979 8.815C12.445 5.841 7.986 5.521 5.057 8.066Z"
                                            fill="#363652"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_37_1118">
                                            <rect width="24" height="24" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            } placeholder={'Search.....'}/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={6}>
                        <Form.Item>
                            <Button
                                htmlType='submit'
                                type='primary'
                                className={'search_button'}
                            >
                                SEARCH
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        )
    }


    return (
        <div className="bg-color">
            <NavbarComponent headerTxt={"Payment"} selectedKey={"5"}/>
            <div className="container bg-color radius1 p-4 payment_page" style={{marginTop: 65}}>
                <h1 className={'page_title'}>Transactions</h1>
                {
                    tblContentsMobile === false && filteredForm()
                }
                <div className="row">
                    <div className="col-md-6 order-md-0 order-sm-last order-last">
                        {
                            tblContentsMobile && filteredForm()
                        }
                        <TransactionCard data={data}/>
                    </div>
                    <div className="col-md-6 order-md-0 order-sm-first order-first mb-4 mb-md-0">
                        <div className="position-relative">
                            <div className="total_transaction ">
                                <div className="total_transaction_text">Total Transactions</div>
                                <div className="total_transaction_price">30,000</div>
                            </div>
                            <div className="bg_one position-absolute"></div>
                            <div className="bg_two position-absolute"></div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center nfts_section">
                            <NftsCard nfts_text="Total Nfts Sold" nfts_price={'15,000'}/>
                            <NftsCard nfts_text="Total Nfts Bought" nfts_price={'15,000'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
