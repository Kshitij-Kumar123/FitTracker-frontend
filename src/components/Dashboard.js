import React, { useState, useEffect } from 'react';
import { Table, Badge, Modal, Descriptions, Spin } from 'antd';
import { TrophyTwoTone } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import useAxiosConfigured from '../apicalls/AxiosConfigured';
import { useAuth0 } from "@auth0/auth0-react";

const ModalInfo = ({ data }) => {
    const labelledData = Object.entries(data).map(([key, value], index) => ({
        key: index,
        label: key,
        children: <>{`${value}`}</>
    }));

    if (labelledData.length > 0) {
        return (
            <Descriptions bordered layout="vertical" items={labelledData} />
        );
    }
};



const Stats = ({ data }) => {
    const { improvementStats, stats } = data;

    // Function to render Statistic components based on improvement stats
    const renderImprovementStats = () => {
        return Object.keys(improvementStats).map(category => {
            return Object.keys(improvementStats[category]).map(workout => {
                return Object.keys(improvementStats[category][workout]).map(metric => {
                    const improvementData = improvementStats[category][workout][metric];
                    return (
                        <Col span={12} key={`${category}-${workout}-${metric}`}>
                            <Card bordered={false}>
                                <Statistic
                                    title={`${workout} ${metric}`}
                                    value={improvementData.improvement}
                                    precision={2}
                                    valueStyle={{ color: improvementData.improvement >= 0 ? '#3f8600' : '#cf1322' }}
                                    prefix={improvementData.improvement >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </Card>
                        </Col>
                    );
                });
            });
        });
    };

    return (
        <div>
            <h3 style={{ marginLeft: 20 }}>Workout Insights</h3>
            <Row gutter={[16, 16]}>
                {/* Render improvement stats */}
                {renderImprovementStats()}
                {/* Render stats */}
                {/* {renderStats()} */}
            </Row>
        </div>
    );
}


const ActivityDetails = ({ date, categories }) => {
    const [visible, setVisible] = useState(false);


    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const weightExercisesCols = [
        {
            title: 'View', key: 'view',
            render: (e) => (
                <div>
                    <a onClick={showModal}>View</a>
                    <Modal
                        title="Basic Modal"
                        open={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <ModalInfo data={e} />
                    </Modal>
                </div>
            )
        },
        { title: 'Activity', dataIndex: 'name', key: 'name' },
        { title: 'Weight', dataIndex: 'weight', key: 'weight' },
        { title: 'Reps', dataIndex: 'reps', key: 'reps' },
    ];

    const cardioExercisesCols = [
        {
            title: 'Status',
            key: 'state',
            render: ({ status }) => status === "Good" ? <Badge status="success" text="Good" /> : (<><TrophyTwoTone /> Finished</>),
        },
        {
            title: 'View', key: 'view',
            render: (e) => (
                <div>
                    <a onClick={showModal}>View</a>
                    <Modal
                        title="Basic Modal"
                        open={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <ModalInfo data={e} />
                    </Modal>
                </div>
            )
        },
        { title: 'Activity', dataIndex: 'name', key: 'name' },
        { title: 'Duration', dataIndex: 'duration', key: 'duration' },
        { title: 'Speed', dataIndex: 'speed', key: 'speed' },
        { title: 'Calories Burned', dataIndex: 'calorieBurned', key: 'calorieBurned' },
    ];


    return (
        <div style={{ padding: 20 }}>
            <h1>{formatDate(date)}</h1>
            {Object.entries(categories).map(([category, data], index) => (
                <div key={index}>
                    <h2>{category}</h2>
                    <Table
                        columns={category === "Cardio" ? cardioExercisesCols : weightExercisesCols}
                        dataSource={data}
                        scroll={{ x: true }} // Set the desired width for horizontal scrolling
                    />
                </div>
            ))}
        </div>
    );
};

const Dashboard = () => {
    const fitnessService = useAxiosConfigured(process.env.REACT_APP_FITNESS_BASE_URL);
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState({});
    const { user } = useAuth0();


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ensure user is defined before making the API call
                if (!user) {
                    console.log('User is undefined');
                    return;
                }
                let response = await fitnessService(`/user/${user.sub}`);
                if (response.status == 200) {
                    const { activities, improvementStats, stats } = response.data;
                    setActivities(activities);
                    setStats({ improvementStats: improvementStats, stats: stats });
                    console.log(response.data);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [user]);

    if (activities.length === 0) {
        return <Spin />
    }

    return (
        <>
            <h2 style={{ padding: 40, paddingLeft: 20 }}>Activities</h2>
            <Stats data={stats} />
            {Object.entries(activities).map(([date, categories]) => (
                <ActivityDetails key={date} date={date} categories={categories} />
            ))}
        </>

    );
}

export default Dashboard;
