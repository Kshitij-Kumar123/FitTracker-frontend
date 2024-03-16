import React, { useState } from 'react';
import { Table, Form, InputNumber, DatePicker, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeightTracking = () => {
    const [weightData, setWeightData] = useState([
        { date: "3/3/2024", weight: 100, unit: "kg" }
    ]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: "Unit",
            dataIndex: "unit",
            key: "unit"
        }
        // Add more columns as needed
    ];

    const onFinish = (values) => {
        const { date, weight } = values;
        const newWeightData = [...weightData, { date: date.format('MM/DD/YYYY'), weight, unit: 'kg' }];
        setWeightData(newWeightData);
    };

    return (
        <div style={{ padding: 40 }}>
            <h3>Weight Tracking</h3>
            <Form
                onFinish={onFinish}
                layout="inline"
                style={{ marginBottom: 16 }}
            >
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: 'Please select the date!' }]}
                >
                    <DatePicker style={{ width: 200 }} />
                </Form.Item>
                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[{ required: true, message: 'Please enter the weight!' }]}
                >
                    <InputNumber min={0} style={{ width: 100 }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Weight
                    </Button>
                </Form.Item>
            </Form>
            <Table scroll={{ x: true }} columns={columns} dataSource={weightData} />
            <div style={{ marginTop: 40 }}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default WeightTracking;
