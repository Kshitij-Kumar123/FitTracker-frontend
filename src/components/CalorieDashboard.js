import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import CountUp from 'react-countup';
import { Col, Row, Statistic, Divider, Descriptions } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';

const ModalInfo = ({ data }) => {
    console.log("modal info data: ", data);
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
                <a onClick={() => {
                    setModalData(record);
                    setShowModal(true);
                }}>{record.foodName}</a>
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
        <div style={{ padding: 40 }}>
            <h1>Calorie Dashboard</h1>
            {Object.entries(groupedData).map(([date, value], index) => (
                <div key={index}>
                    <Divider><h4>{date}</h4></Divider>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={8}>
                            <Statistic title="Calorie Budget" value={2500} />
                        </Col>
                        <Col span={8}>
                            <Statistic title="Calorie Consumed" value={2200} precision={2} />
                        </Col>
                        <Col span={8}>
                            <Statistic title="Calorie Burned" value={200} precision={2} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col span={8}>
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
