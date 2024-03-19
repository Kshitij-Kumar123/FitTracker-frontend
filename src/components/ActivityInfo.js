import React from 'react';
import { Typography, List, Divider } from 'antd';

const { Title, Paragraph } = Typography;

// Repeat this for exercises I care about
const ActivityInfo = () => {
    return (
        <div style={{ padding: 20, textAlign: 'center' }}>
            <Title level={2}>Dumbbell Hammer Curl</Title>

            <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
                <Title level={4}>Muscles Targeted:</Title>
                <Paragraph>
                    <List
                        size="small"
                        dataSource={['Primary: Biceps brachii', 'Secondary: Brachialis, brachioradialis']}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Paragraph>

                <Divider />

                <Title level={4}>Equipment Needed:</Title>
                <Paragraph>Dumbbells</Paragraph>

                <Divider />

                <Title level={4}>Execution:</Title>
                <Paragraph>
                    <ol>
                        <li>Stand tall with a dumbbell in each hand, palms facing your torso (neutral grip).</li>
                        <li>Keep your elbows close to your torso and your upper arms stationary.</li>
                        <li>Exhale and curl the weights while contracting your biceps. Keep your wrists straight.</li>
                        <li>Continue to raise the dumbbells until your biceps are fully contracted and the dumbbells are at shoulder level.</li>
                        <li>Pause for a moment, then inhale and slowly lower the dumbbells back to the starting position.</li>
                        <li>Repeat for the desired number of repetitions.</li>
                    </ol>
                </Paragraph>

                <Divider />

                <Title level={4}>Tips:</Title>
                <Paragraph>
                    <List
                        size="small"
                        dataSource={[
                            'Maintain a neutral grip throughout the movement.',
                            'Keep your body stable and avoid swinging or using momentum to lift the weights.',
                            'Focus on controlling the movement and squeezing your biceps at the top of the curl.',
                            'Use a weight that allows you to perform the exercise with proper form and technique.'
                        ]}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </Paragraph>

                <Divider />

                <Title level={4}>YouTube Links:</Title>
                <Paragraph>
                    <ol>
                        <li><a href="https://www.youtube.com/watch?v=TwD-YGVP4Bk">Dumbbell Hammer Curl - Bodybuilding.com</a></li>
                        <li><a href="https://www.youtube.com/watch?v=8Fb_5w5yQWI">How to Dumbbell Hammer Curl - ScottHermanFitness</a></li>
                        <li><a href="https://www.youtube.com/watch?v=TwD-YGVP4Bk">Hammer Curls - Buff Dudes</a></li>
                    </ol>
                </Paragraph>
            </div>
        </div>
    );
}

export default ActivityInfo;
