import React, { useState } from 'react';
import { Table, Badge, Modal, Descriptions } from 'antd';
import { ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';

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
            title: 'Status',
            key: 'state',
            render: ({ status }) => status === "Good" ? <Badge status="success" text="Good" /> : (<><TrophyOutlined /> Finished</>),
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
        { title: 'Weight', dataIndex: 'weight', key: 'weight' },
        { title: 'Reps', dataIndex: 'reps', key: 'reps' },
    ];

    const cardioExercisesCols = [
        {
            title: 'Status',
            key: 'state',
            render: ({ status }) => status === "Good" ? <Badge status="success" text="Good" /> : (<><TrophyOutlined /> Finished</>),
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
                    <h2>{category} <ThunderboltOutlined /></h2>
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
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const activities = [{
        "category": "Cardio",
        "status": "good",
        "name": "Crunch Machine",
        "date": formattedDate,
        "weightUnit": "kg",
        "weight": 10,
        "speedUnit": "mph",
        "speed": "6 kph",
        "hours": 2,
        "minutes": 1,
        "extraNotes": "some note",
        "calorieBurned": 20,
        "usefulLinks": [
            {
                "textbox": "google.com"
            }
        ]
    }, {
        "category": "Cardio",
        "status": "good",
        "name": "Crunch Machine",
        "date": formattedDate,
        "weightUnit": "kg",
        "weight": 10,
        "speedUnit": "mph",
        "speed": "6 kph",
        "hours": 2,
        "minutes": 1,
        "extraNotes": "some note",
        "calorieBurned": 20,
        "usefulLinks": [
            {
                "textbox": "google.com"
            }
        ]
    }, {
        "category": "Back",
        "status": "best",
        "name": "Crunch Machine",
        "date": "3/13/2024, 6:00:30 PM",
        "weightUnit": "kg",
        "weight": 10,
        "speedUnit": "mph",
        "speed": "6 kph",
        "hours": 2,
        "minutes": 1,
        "extraNotes": "some note",
        "calorieBurned": 20,
        "usefulLinks": [
            {
                "textbox": "google.com"
            }
        ]
    }, {
        "category": "Back",
        "status": "best",
        "name": "Crunch Machine",
        "date": formattedDate,
        "weightUnit": "kg",
        "weight": 10,
        "speedUnit": "mph",
        "speed": "6 kph",
        "hours": 2,
        "minutes": 1,
        "extraNotes": "some note",
        "calorieBurned": 20,
        "usefulLinks": [
            {
                "textbox": "google.com"
            }
        ]
    }];

    // Categorize activities by date
    const activitiesByDate = activities.reduce((acc, activity) => {
        const { date } = activity;
        acc[date] = acc[date] || {};
        return acc;
    }, {});

    // Categorize activities by category within each date category
    const activitiesByDateAndCategory = Object.keys(activitiesByDate).reduce((acc, date) => {
        acc[date] = activities.reduce((activityAcc, activity) => {
            if (activity.date === date) {
                activityAcc[activity.category] = activityAcc[activity.category] || [];
                activityAcc[activity.category].push(activity);
            }
            return activityAcc;
        }, {});
        return acc;
    }, {});

    return (
        Object.entries(activitiesByDateAndCategory).map(([date, categories]) => (
            <ActivityDetails key={date} date={date} categories={categories} />
        ))
    );
}

export default Dashboard;
