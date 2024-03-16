import React, { useState } from 'react';
import { Table, Form, Statistic, InputNumber, DatePicker, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeightTracking = () => {
    const [weightData, setWeightData] = useState([
        { date: new Date().toLocaleDateString(), weight: 100, unit: "kg" }
    ]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
            align: 'center'
        },
        {
            title: 'Weight (kg)',
            dataIndex: 'weight',
            key: 'weight',
            width: 150,
            align: 'center'
        },
    ];

    const onFinish = (values) => {
        const { date, weight } = values;
        const formattedDate = date.toDate().toLocaleDateString();
        const newWeightData = [...weightData, { date: formattedDate, weight, unit: 'kg' }];
        setWeightData(newWeightData);
    };

    const weightChartData = weightData.map(({ date, weight }) => ({
        date,
        weight: Number(weight),
    }));

    return (
        <div style={{ padding: 40 }}>
            <div style={{ marginBottom: 20 }}>
                <h2>Add Weight and Track</h2>
                <Form
                    onFinish={onFinish}
                    layout="inline"
                >
                    <Form.Item
                        label="Date"
                        name="date"
                        style={{ marginTop: 12, marginBottom: 12 }}
                        rules={[{ required: true, message: 'Please select the date!' }]}
                    >
                        <DatePicker style={{ width: 200 }} />
                    </Form.Item>
                    <Form.Item
                        label="Weight"
                        name="weight"
                        style={{ marginTop: 12, marginBottom: 12 }}

                        rules={[{ required: true, message: 'Please enter the weight!' }]}
                    >
                        <InputNumber min={0} style={{ width: 100 }} />
                    </Form.Item>
                    <Form.Item
                        style={{ marginTop: 12, marginBottom: 12 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{ marginBottom: 20 }}>
                <Statistic title="Weight Goal" value={"80 kg"} style={{ margin: "12px 0px 12px 0px" }} />
            </div>

            <Table
                columns={columns}
                dataSource={weightData}
                pagination={false}
                bordered
                size="middle"
                scroll={{ y: 400 }}
                style={{ marginBottom: 16 }}
            />
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={weightChartData}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#ff7300" yAxisId={0} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WeightTracking;
