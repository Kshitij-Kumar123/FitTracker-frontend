import React, { useState, useEffect } from 'react';
import { Table, Form, Statistic, InputNumber, DatePicker, Button } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAxiosConfigured from '../apicalls/AxiosConfigured';
import { useAuth0 } from "@auth0/auth0-react";

const WeightTracking = () => {
    const [weightData, setWeightData] = useState([]);
    const [weightChartData, setWeightChartData] = useState([]);
    const [target, setTarget] = useState([]);
    const { user } = useAuth0();

    const userService = useAxiosConfigured(process.env.REACT_APP_USER_BASE_URL);

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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userService.get(`/${user.sub}`);
                if (response.status === 200) {
                    const data = response.data[0];
                    setTarget(data.targets);
                    if (data && data.weightTracking) { // Check if data is not null and weightTracking property exists
                        const parsedWeightData = data.weightTracking
                            .filter(item => item && item.date && item?.date !== null) // Remove entries with null dates
                            .map(item => ({
                                ...item,
                                date: new Date(item.date).toLocaleDateString() // Parse date strings to Date objects, handle null values
                            }));
                        if (parsedWeightData.length > 0) {
                            setWeightChartData(parsedWeightData);
                            setWeightData(parsedWeightData);
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);



    const onFinish = async (values) => {
        try {
            const { date, weight } = values;
            const formattedDate = date.toDate().toISOString(); // Convert date to ISO string
            const reqBody = { date: formattedDate, weight, unit: 'kg' };
            const response = await userService.post(`/weight/${user.sub}`, reqBody);
            if (response.status === 200) {
                const newWeightData = [...weightData, { date: date.toLocaleDateString(), weight, unit: 'kg' }];
                setWeightData(newWeightData);
            }
        } catch (err) {
            console.log(err);
        }
    };


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
            {target.weightGoal && <div style={{ marginBottom: 20 }}>
                <Statistic title="Weight Goal" value={`${target.weightGoal} kg`} style={{ margin: "12px 0px 12px 0px" }} />
            </div>}

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
                    <YAxis domain={[80, 120]} />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#ff7300" yAxisId={0} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default WeightTracking;
