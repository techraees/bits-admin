import { React, useState } from 'react';
import {
    Button,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Space,
    Table,
} from 'antd';
import './css/index.css';
import { crossIcon } from '../../assets';
import { DeleteOutlined } from '@ant-design/icons';

const CreatorEarningModal = ({ isOpen, onRequestClose }) => {
    const [data, setData] = useState([
        { key: 1, walletAddress: '', percentage: '' },
    ]);
    const [count, setCount] = useState(0);

    const columns = [
        {
            title: 'Sl. No',
            dataIndex: 'slNo',
            key: 'slNo',
            width: '10%',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Wallet Address',
            dataIndex: 'walletAddress',
            key: 'walletAddress',
            width: '50%',
            render: (text, record, index) => (
                <Input
                    value={text}
                    className="creator-input text-white"
                    onChange={(e) =>
                        handleInputChange(e, record.key, 'walletAddress')
                    }
                />
            ),
        },
        {
            title: 'Percentage',
            dataIndex: 'percentage',
            key: 'percentage',
            width: '30%',
            render: (text, record, index) => (
                <InputNumber
                    // defaultValue={25}
                    min={0}
                    max={100}
                    className="creator-input w-50 text-white"
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace('%', '')}
                    // onChange={(e) =>
                    //     handleInputChange(e, record.key, 'percentage')
                    // }
                />
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete this row?"
                        onConfirm={() => handleDelete(record.key)}
                        className="custom-popconfirm"
                    >
                        <Button icon={<DeleteOutlined />} type="link" danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // const [tableData, setTableData] = useState([]);

    // const addNewLine = () => {
    //     const newLine = {
    //         id: tableData.length + 1,
    //         wallet: 'New Person',
    //         percentage: 0,
    //     };
    //     setTableData([...tableData, newLine]);
    //     console.log(tableData);
    // };

    const handleInputChange = (e, key, dataIndex) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            newData[index][dataIndex] = e.target.value;
            setData(newData);
        }
    };

    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const handleAddAddress = () => {
        const newData = [...data];
        newData.push({
            key: count,
            walletAddress: '',
            percentage: '',
        });
        setCount(count + 1);
        setData(newData);
    };

    const handleDone = () => {
        // Handle the "Done" button action
        console.log('Data:', data);
        onRequestClose();
    };

    return (
        <Modal
            footer={null}
            bodyStyle={{ backgroundColor: '#222222' }}
            headerStyle={{ backgroundColor: 'red' }}
            open={isOpen}
            onOk={onRequestClose}
            onCancel={onRequestClose}
            className="Modal customized-modal-header"
            closeIcon={
                <img
                    className=""
                    src={crossIcon}
                    alt=""
                    onClick={onRequestClose}
                    style={{ width: '30px' }}
                />
            }
            title={'Creator Earnings'}
            width={850}
        >
            <div className="py-8 wallet-table-container">
                
                <Table
                    className="creator-earnings-table custom-scrollbar"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={{ y: '380px' }}
                />
            </div>

            <div className="d-flex justify-content-between my-4 px-5">
                <Button
                    className="add-address"
                    style={{ border: '1px solid #9B2C2C' }}
                    onClick={handleAddAddress}
                >
                    Add Address
                </Button>
                <Button
                    type="primary"
                    onClick={handleDone}
                    style={{ marginLeft: '10px', border: '1px solid #9B2C2C' }}
                    className=" red-gradient"
                >
                    Done
                </Button>
            </div>
        </Modal>
    );
};
export default CreatorEarningModal;
