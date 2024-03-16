import React, { useState } from 'react';
import { Table, Form, Statistic, InputNumber, DatePicker, Button } from 'antd';

const WeightTracking = () => {
    const [weightData, setWeightData] = useState([
        { date: "9/3/2024", weight: 100, unit: "kg" }
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
            <Form
                onFinish={onFinish}
                layout="vertical"
                style={{ marginBottom: 16 }}
            >
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: 'Please select the date!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[{ required: true, message: 'Please enter the weight!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Weight
                    </Button>
                </Form.Item>
            </Form>
            <Statistic title="Weight Goal" value={"80 kg"} style={{ margin: "12px 0px 12px 0px" }} />

            <Table scroll={{ x: true }} columns={columns} dataSource={weightData} />
        </div>
    );
}

export default WeightTracking;
