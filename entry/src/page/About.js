import React, {Component} from 'react';
import {Row, Col} from 'antd';
import '../css/About.css'
import Gallery3d from '../component/about/Gallery3d'

class About extends Component {
    render() {
        return (
            <Row className={'about_layout'}>
                <Col span={24} className={'about_layout'}><Gallery3d /></Col>
            </Row>
        );
    }
}

export default About;
