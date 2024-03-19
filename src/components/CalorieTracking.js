import React from 'react';
import { Form, Input, InputNumber, Button, TimePicker, DatePicker, notification } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete } from 'antd';
import useAxiosConfigured from '../apicalls/AxiosConfigured';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const CalorieTracking = () => {

    const calorieService = useAxiosConfigured(process.env.REACT_APP_CALORIE_BASE_URL);
    const { user } = useAuth0();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // You can handle submission logic here
        const reqBody = { ...values, userId: user.sub }
        try {
            const response = await calorieService.post("/", reqBody);
            if (response.status == 200 || response.status === 201) {
                notification.success({
                    message: 'Success',
                    description: 'Your request was successful.',
                });

                // Redirect to /activities-dashboard
                navigate('/calorie-dashboard');
            }
        } catch (err) {
            console.log(err);
        }
    };

    // TODO: figure out this calorie form
    // TODO: then the calorie dashboard
    // make everything look nicer
    // then backend functionality
    // better homepage

    // Figure out full functionality later, layout's done mostly
    const renderTitle = (title) => (
        <span>
            {title}
            <a
                style={{
                    float: 'right',
                }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
            </a>
        </span>
    );
    const renderItem = (title, count) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
                    <UserOutlined /> {count}
                </span>
            </div>
        ),
    });
    const options = [];

    return (
        <div style={{ padding: 40 }}>
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Food Name"
                    name="foodName"
                    rules={[{ required: true, message: 'Please enter the food name!' }]}
                >
                    <AutoComplete
                        popupClassName="certain-category-search-dropdown"
                        popupMatchSelectWidth={500}
                        style={{ width: 250 }}
                        options={options}
                        size="large"
                    >
                        <Input.Search size="large" placeholder="input here" />
                    </AutoComplete>
                </Form.Item>
                <Form.Item
                    label="meal_type"
                    name="meal_type"
                    rules={[{ required: true, message: 'Please enter the meal_type!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Portions"
                    name="portions"
                    rules={[{ required: true, message: 'Please enter the portions!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Calories"
                    name="calories"
                    rules={[{ required: true, message: 'Please enter the calories!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Carbs"
                    name="carbs"
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Protein"
                    name="protein"
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Fat"
                    name="fat"
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[{ required: true, message: 'Please select the date!' }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="time" name="time">
                    <TimePicker
                        format="h:mm A" // You can adjust the format as per your requirement
                        placeholder="Select Time"
                        style={{ width: 200 }}
                    />
                </Form.Item>
                <Form.Item
                    label="Saturated Fat"
                    name="saturated_fat"
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Trans Fat"
                    name="trans_fat"
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Fiber"
                    name="fiber"
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Sodium"
                    name="sodium"
                >
                    <InputNumber min={0} />
                </Form.Item><Form.Item
                    label="Calcium"
                    name="calcium"
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CalorieTracking;
