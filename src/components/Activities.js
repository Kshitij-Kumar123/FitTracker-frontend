import React, { useState } from 'react';
import { Form, Input, Button, notification, Select, InputNumber, Row, Col, Slider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useAxiosConfigured from '../apicalls/AxiosConfigured';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const { TextArea } = Input;
const { Option } = Select;

const Activities = () => {
    const [form] = Form.useForm();
    const [selectedActivities, setSelectedActivities] = useState([]);
    const fitnessService = useAxiosConfigured(process.env.REACT_APP_FITNESS_BASE_URL);
    const categories = ["Abs", "Back", "Biceps", "Cardio", "Chest", "Legs", "Shoulders", "Triceps"];
    const { user } = useAuth0();


    const activities = {
        "Abs": [
            "Cable Crunch",
            "Crunch",
            "Crunch Machine",
            "Decline Crunch",
            "Dragon Flag",
            "Hanging Knee Raise",
            "Plank",
            "Side Plank"
        ],
        "Cardio": [
            "Cycling",
            "Elliptical Trainer",
            "Rowing Machine",
            "Running",
            "Stationary Bike",
            "Swimming",
            "Walking"
        ],
        // ... add more later
    }


    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Submitted values:', values);
        // You can handle submission logic here
        // {
        //     "category": "Back",
        //     "name": "Crunch Machine",
        //     "weightUnit": "kg",
        //     "weight": 10,
        //     "speedUnit": "mph",
        //     "speed": 6,
        //     "hours": 2,
        //     "minutes": 1,
        //     "extraNotes": "some note",
        //     "calorieBurned": -20,
        //     "usefulLinks": ["google.com"]
        //     "userId": "something"
        // }
        // TODO: add userId to it
        try {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();
            const reqBody = {
                ...values,
                date: formattedDate,
                duration: values?.hours * 60 + values.minutes,
                usefulLinks: values.usefulLinks.map(value => value.textbox),
                userId: user.sub
            }
            const response = await fitnessService.post('/', reqBody);
            if (response.status >= 200 && response.status < 300) {
                console.log('Request was successful');
                console.log('Response:', response.data);
                notification.success({
                    message: 'Success',
                    description: 'Your request was successful.',
                });

                // Redirect to /activities-dashboard
                navigate('/activities-dashboard');
            } else {
                console.error('Request failed with status code:', response.status);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const [value, setValue] = useState(0);
    const maxSliderValue = 15;

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleCategoryChange = (selectedCategory) => {
        // Filter activities based on the selected category
        const filteredActivities = activities[selectedCategory]
        // Update the options of the "Activity" field
        form.setFieldsValue({ name: undefined }); // Reset the selected value first
        // form.setFieldsValue({ name: filteredActivities?.length > 0 ? filteredActivities : undefined });
        setSelectedActivities(filteredActivities);
    };

    return (
        <div style={{ padding: 40 }}>
            <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="Category" name="category">
                    <Select onChange={handleCategoryChange}>
                        {categories.map(category => (
                            <Option key={category} value={category}>{category}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Activity" name="name">
                    <Select>
                        {selectedActivities?.map(activity => (
                            <Option key={activity} value={activity}>{activity}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="weight"
                    label="Weight"
                >
                    <InputNumber
                        step={2.5}
                        addonAfter={<Form.Item name="weightUnit" noStyle>
                            <Select
                                style={{
                                    width: 70,
                                }}
                            >
                                <Option value="lb">lb</Option>
                                <Option value="kg">kg</Option>
                            </Select>
                        </Form.Item>}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="speed"
                    label="Speed"
                >
                    <InputNumber
                        addonAfter={<Form.Item name="speedUnit" noStyle>
                            <Select
                                style={{
                                    width: 70,
                                }}
                            >
                                <Option value="kph">kph</Option>
                                <Option value="mph">mph</Option>
                            </Select>
                        </Form.Item>}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item label="Duration">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item name="hours" noStyle>
                                <InputNumber min={0} placeholder="Hours" style={{ marginRight: 8 }} />
                            </Form.Item>
                            Hours
                        </Col>
                        <Col span={12}>
                            <Form.Item name="minutes" noStyle>
                                <InputNumber min={0} max={59} placeholder="Minutes" style={{ marginRight: 8 }} />
                            </Form.Item>
                            Minutes
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label="Extra Notes" name="extraNotes">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Calorie Burned" name="calorieBurned">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Reps">
                    <Slider value={value} onChange={handleChange} max={maxSliderValue} />
                    <InputNumber value={value} onChange={handleChange} max={maxSliderValue} />
                </Form.Item>
                <Form.List name="usefulLinks">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey }) => (
                                <Form.Item key={key}>
                                    <Form.Item
                                        name={[name, 'textbox']}
                                        fieldKey={[fieldKey, 'textbox']}
                                        rules={[{ message: 'Textbox is required' }]}
                                        noStyle
                                    >
                                        <Input placeholder="Youtube, Blogs..." />
                                    </Form.Item>
                                    {fields.length > 1 && (
                                        <Button type="link" danger onClick={() => remove(name)}>
                                            Remove
                                        </Button>
                                    )}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Useful Links
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Activities;
