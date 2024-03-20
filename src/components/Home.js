import React, { useEffect } from 'react';
import { Button, Row, Col, Typography } from 'antd';
import fitnessImage from './fitness.jpg'; // Import a fitness-related image
import { useAuth0 } from "@auth0/auth0-react";

const { Title, Paragraph } = Typography;

const Home = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: `url(${fitnessImage}) center/cover no-repeat`,
                height: '80vh',
                display: 'flex',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
            }}>
                <div style={{
                    borderRadius: 40,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Translucent black background
                    padding: '20px',
                }}>
                    <Title level={1}>Your Fitness Journey Starts Here</Title>
                    <Paragraph>Transform your life with our personalized fitness plans and expert guidance.</Paragraph>
                    <Button type="primary" size="large" onClick={() => loginWithRedirect()}>Get Started by signing up</Button>
                </div>
            </div>

            {/* Features Section */}
            <div style={{ padding: '50px 0', background: '#f0f0f0' }}>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
                        <img src="https://via.placeholder.com/150" alt="Feature 1" style={{ marginBottom: 20 }} />
                        <Title level={3}>Personalized Plans</Title>
                        <Paragraph>Receive customized workout and nutrition plans tailored to your goals.</Paragraph>
                    </Col>
                    <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
                        <img src="https://via.placeholder.com/150" alt="Feature 2" style={{ marginBottom: 20 }} />
                        <Title level={3}>Expert Guidance</Title>
                        <Paragraph>Get expert advice and support from certified trainers and nutritionists.</Paragraph>
                    </Col>
                    <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
                        <img src="https://via.placeholder.com/150" alt="Feature 3" style={{ marginBottom: 20 }} />
                        <Title level={3}>Track Progress</Title>
                        <Paragraph>Monitor your progress with advanced tracking tools and analytics.</Paragraph>
                    </Col>
                    <Col xs={24} sm={12} lg={6} style={{ textAlign: 'center' }}>
                        <img src="https://via.placeholder.com/150" alt="Feature 4" style={{ marginBottom: 20 }} />
                        <Title level={3}>Community Support</Title>
                        <Paragraph>Connect with like-minded individuals and share your fitness journey.</Paragraph>
                    </Col>
                </Row>
            </div>

            {/* Testimonials Section */}
            <div style={{ padding: '50px 0', background: '#fafafa', textAlign: 'center' }}>
                <Title level={2} style={{ marginBottom: 40 }}>What Our Users Say</Title>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} lg={8}>
                        <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
                            <Paragraph>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget felis at libero iaculis vulputate."</Paragraph>
                            <Title level={4}>- John Doe</Title>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
                            <Paragraph>"Sed lacinia justo non eros finibus, ut gravida risus consequat. Integer rhoncus, odio et ullamcorper dapibus."</Paragraph>
                            <Title level={4}>- Jane Smith</Title>
                        </div>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <div style={{ background: 'white', padding: 20, borderRadius: 8 }}>
                            <Paragraph>"Vestibulum at quam et magna laoreet volutpat. Morbi hendrerit enim quis felis rutrum elementum."</Paragraph>
                            <Title level={4}>- David Johnson</Title>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Call to Action Section */}
            <div style={{ background: '#1890ff', padding: '100px 0', textAlign: 'center', color: 'white' }}>
                <Title level={2}>Ready to Start Your Fitness Journey?</Title>
                <Paragraph>Join our community today and take the first step towards a healthier lifestyle!</Paragraph>
                <Button type="primary" size="large" onClick={() => loginWithRedirect()}>Get Started by signing up</Button>
            </div>
        </div>
    );
};

export default Home;
