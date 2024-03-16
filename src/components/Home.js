import React from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
    const testimonials = [
        {
            name: "John Doe",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et velit vitae sem consequat dignissim. Sed consequat, lorem eu dapibus auctor, nisi dui condimentum arcu, et gravida mi metus eget dolor."
        },
        {
            name: "Jane Smith",
            text: "Fusce ac risus ex. Ut lobortis lorem nec metus congue, nec efficitur magna vestibulum. Mauris non libero vestibulum, volutpat nisl id, fermentum arcu."
        },
        {
            name: "Alice Johnson",
            text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque consequat vel lorem quis suscipit. Nam sit amet pretium leo."
        }
    ];

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <Title>Welcome to Your Fitness App</Title>
            <Paragraph>
                Start your fitness journey with our app! Whether you're looking to track your workouts, set goals, or get personalized recommendations, we've got you covered.
            </Paragraph>
            <Button type="primary" size="large" style={{ marginBottom: '24px' }}>Get Started</Button>
            <Row gutter={24}>
                <Col span={8}>
                    <div style={{ height: '100%' }}>
                        <Card
                            cover={<img alt="Track Your Workouts" src="https://via.placeholder.com/300" style={{ height: '100%' }} />}
                            hoverable
                        >
                            <Title level={4}>Track Your Workouts</Title>
                            <Paragraph>
                                Record your exercises, sets, reps, and weights easily.
                            </Paragraph>
                        </Card>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ height: '100%' }}>
                        <Card
                            cover={<img alt="Set Goals" src="https://via.placeholder.com/300" style={{ height: '100%' }} />}
                            hoverable
                        >
                            <Title level={4}>Set Goals</Title>
                            <Paragraph>
                                Set achievable fitness goals and track your progress.
                            </Paragraph>
                        </Card>
                    </div>
                </Col>
                <Col span={8}>
                    <div style={{ height: '100%' }}>
                        <Card
                            cover={<img alt="Get Recommendations" src="https://via.placeholder.com/300" style={{ height: '100%' }} />}
                            hoverable
                        >
                            <Title level={4}>Get Personalized Recommendations</Title>
                            <Paragraph>
                                Receive tailored workout and nutrition suggestions based on your preferences and goals.
                            </Paragraph>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Title level={2}>Testimonials</Title>
            {testimonials.map((testimonial, index) => (
                <Card key={index} style={{ marginBottom: '16px' }}>
                    <Paragraph>{testimonial.text}</Paragraph>
                    <Paragraph style={{ textAlign: 'right' }} strong>{testimonial.name}</Paragraph>
                </Card>
            ))}
        </div>
    );
}

export default Home;
