import React, { useState, useEffect, useContext } from 'react';
import { Table, Modal } from 'antd';
import { Col, Row, Statistic, Divider, Descriptions } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import useAxiosConfigured from '../apicalls/AxiosConfigured';
import UserContext from './userContext';
import { useAuth0 } from "@auth0/auth0-react";

const datetimeFormatter = (dateString, dateFormat = true) => {
    const date = new Date(dateString);
    const options = dateFormat ? { month: 'long', day: 'numeric', year: 'numeric' } : { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}

const ModalInfo = ({ data }) => {
    const labelledData = Object.entries(data)
        .filter(([key]) => key !== '_id' && key !== 'id' && key !== "userId" && key !== "date") // Filter out _id and id properties
        .map(([key, value], index) => ({
            key: index,
            label: key,
            children: <>{`${value}`}</>
        }));

    return (
        <Descriptions layout="vertical" items={labelledData} />
    );
};

const CalorieDashboard = () => {
    const [itemsData, setItemsData] = useState([]);
    const calorieService = useAxiosConfigured(process.env.REACT_APP_CALORIE_BASE_URL);
    const { userInfo } = useContext(UserContext);
    const { user } = useAuth0();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await calorieService.get(`/${user.sub}`);
                if (response.status === 200) {

                    setItemsData(response.data);
                    console.log(response.data);
                } else {
                    console.log('Failed to fetch data:', response.status);
                }
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        }
        fetchData();
    }, []);

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
                    {record.foodName}
                </div>
            )
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            render: (time) => <>{datetimeFormatter(time, false).split(", ")[1]}</>
        },
        {
            title: 'Calories',
            dataIndex: 'calories',
            key: 'calories',
        }
    ];

    console.log("context userinfo: ", userInfo);
    return (
        <div style={{ padding: 40, backgroundSize: 'cover' }}>
            <h1 style={{ marginBottom: 20 }}>Calorie Dashboard</h1>
            {Object.entries(itemsData).map(([date, value], index) => (
                <div key={index} style={{ marginBottom: 40, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 20, borderRadius: 8 }}>
                    <Divider orientation="left" style={{ color: '#1890ff' }}>{datetimeFormatter(date)}</Divider>
                    <Row gutter={16} style={{ marginBottom: 16 }}>
                        <Col md={8} xs={12}>
                            <Statistic title="Calorie Budget" value={userInfo?.targets?.calorieBudget} />
                        </Col>
                        {/* {console.error("rackljlkdljkh;dsa: ", value)} */}
                        <Col md={8} xs={12}>
                            <Statistic title="Calorie Consumed" value={Math.ceil(value.totalCalories) ?? 0} precision={2} />
                        </Col>
                        <Col md={8} xs={12}>
                            <Statistic
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                title="Calorie Deficit" value={userInfo?.targets?.calorieBudget - value.totalCalories} />
                        </Col>
                    </Row>
                    {value.items && <Table key={index} scroll={{ x: true }} columns={columns} dataSource={value.items} />}
                    <Modal
                        title="Food Details"
                        open={showModal}
                        onCancel={() => setShowModal(false)}
                        footer={null}
                    >
                        {modalData && <ModalInfo data={modalData} />}
                    </Modal>
                </div>
            ))}
        </div>
    );
};

export default CalorieDashboard;
