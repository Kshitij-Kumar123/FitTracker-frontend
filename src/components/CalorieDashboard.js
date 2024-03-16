import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import CountUp from 'react-countup';
import { Col, Row, Statistic, Divider, Descriptions } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
// import backgroundImg from './fitness.jpg'; // Import background image
// import foodIcon from './assets/food-icon.png'; // Import food icon


const foodIcon = "https://via.placeholder.com/15";
const backgroundImg = "https://via.placeholder.com/15";
const ModalInfo = ({ data }) => {
    const labelledData = Object.entries(data).map(([key, value], index) => ({
        key: index,
        label: key,
        children: <>{`${value}`}</>
    }));

    return (
        <Descriptions layout="vertical" items={labelledData} />
    );
};

const data = [
    {
        key: '1',
        foodName: 'Apple',
        calories: 52,
        date: "3/13/2024, 6:00:30 PM",
    },
    {
        key: '2',
        foodName: 'Banana',
        calories: 89,
        date: "3/16/2024, 6:00:30 PM",
    },
    // Add more data rows as needed
];

const healthData = {
    protein: 100,
    fat: 100,
    trans_fat: 100,
    fiber: 100,
    sodium: 100,
    calcium: 100
};

const bsdata = Object.entries(healthData).map(([key, value], index) => ({
    key: index,
    label: key,
    children: <>{`${value}`}</>
}));

const groupedData = data.reduce((acc, item) => {
    const date = item.date.split(',')[0]; // Extract the date part
    if (!acc[date]) {
        acc[date] = [];
    }
    acc[date].push(item);
    return acc;
}, {});

const formatter = (value) => <CountUp end={value} separator="," />;

const CalorieDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const columns = [
        {
            title: 'Food Name',
            dataIndex: 'foodName',
            key: 'foodName',
            render: (_, record) => (
                <div onClick={() => {
                    setModalData(record);
                    setShowModal(true);
                }}>
                    <img src={foodIcon} alt="Food Icon" style={{ marginRight: 8, height: 20 }} />
                    {record.foodName}
                </div>
            )
        },
        {
            title: 'Time',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Calories',
            dataIndex: 'calories',
            key: 'calories',
        },
        // Add more columns as needed
    ];

    return (
        <div style={{ padding: 40, backgroundSize: 'cover' }}>
            <h1 style={{ marginBottom: 20 }}>Calorie Dashboard</h1>
            {Object.entries(groupedData).map(([date, value], index) => (
                <div key={index} style={{ marginBottom: 40, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 20, borderRadius: 8 }}>
                    <Divider orientation="left" style={{ color: '#1890ff' }}>{date}</Divider>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col md={6} xs={12}>
                            <Statistic title="Calorie Budget" value={2500} />
                        </Col>
                        <Col md={6} xs={12}>
                            <Statistic title="Calorie Consumed" value={2200} precision={2} />
                        </Col>
                        <Col md={6} xs={12}>
                            <Statistic title="Calorie Burned" value={200} precision={2} />
                        </Col>
                        <Col md={6} xs={12}>
                            <Statistic
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                title="Calorie Deficit" value={500} />
                        </Col>
                    </Row>
                    <Table key={index} scroll={{ x: true }} columns={columns} dataSource={value} />
                    <Modal
                        title="Food Details"
                        visible={showModal}
                        onCancel={() => setShowModal(false)}
                        footer={null}
                    >
                        {modalData && <ModalInfo data={modalData} />}
                    </Modal>
                    <Descriptions layout="horizontal" items={bsdata} />
                </div>
            ))}
        </div>
    );
};

export default CalorieDashboard;
