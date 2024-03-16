import React from 'react';
import { Form, Input, InputNumber, Button, DatePicker, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AutoComplete } from 'antd';

const CalorieTracking = () => {
    const onFinish = (values) => {
        console.log('Submitted values:', values);
        // You can handle submission logic here
        const formattedDate = values.date.format('YYYY-MM-DD');
        console.log('Formatted date:', formattedDate);
        // Now you can use the formatted date for further processing
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
    const options = [
        {
            label: renderTitle('Libraries'),
            options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
        },
        {
            label: renderTitle('Solutions'),
            options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
        },
        {
            label: renderTitle('Articles'),
            options: [renderItem('AntDesign design language', 100000)],
        },
    ];

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
                    rules={[{ required: true, message: 'Please enter the carbs!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Protein"
                    name="protein"
                    rules={[{ required: true, message: 'Please enter the protein!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Fat"
                    name="fat"
                    rules={[{ required: true, message: 'Please enter the fat!' }]}
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
                <Form.Item
                    label="Saturated Fat"
                    name="saturated_fat"
                    rules={[{ required: true, message: 'Please enter the saturated fat!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Trans Fat"
                    name="trans_fat"
                    rules={[{ required: true, message: 'Please enter the trans_fat!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Fiber"
                    name="fiber"
                    rules={[{ required: true, message: 'Please select the fiber!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                    label="Sodium"
                    name="sodium"
                    rules={[{ required: true, message: 'Please select the sodium!' }]}
                >
                    <InputNumber min={0} />
                </Form.Item><Form.Item
                    label="Calcium"
                    name="calcium"
                    rules={[{ required: true, message: 'Please select the calcium!' }]}
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
