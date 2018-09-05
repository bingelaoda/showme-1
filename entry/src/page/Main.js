import React, {Component} from 'react';
import {Row, Col} from 'antd';
import '../css/Main.css'
import config from '../config/config'

let isDev = config.isDev;

class Main extends Component {

    render() {
        return (
            <Row className={'main_layout main_bg'}>
                <Col span={24} className={'main_header'}>
                    <Row type={'flex'} align="middle" justify={'center'} className={'main_header_box'}>
                        <Col span={24} className={'main_header_title'}>欢迎访问赵小华的主页</Col>
                        <Col span={24} className={'main_header_subtitle'}>不负韶光，期景可盼！</Col>
                    </Row>
                </Col>
                <Col span={24} className={'main_content'}>
                    <Row type={'flex'} align={'top'} justify={'center'} className={'main_content_box'}>
                        <Col span={5} className={'main_content_blog'}>
                            <Row type={'flex'} align={'middle'} justify={'center'} className={'main_content_card_box'}>
                                <Col span={24} ><a href={isDev?"http://localhost:9000":"http://blog.bccn.net.cn/"} style={{padding:'40px 15px'}}>我的博客</a></Col>
                            </Row>
                        </Col>
                        <Col span={5} className={'main_content_project'}>
                            <Row type={'flex'} align={'middle'} justify={'center'} className={'main_content_card_box'}>
                                <Col span={24}><a href={isDev?"http://localhost:3000/project":"http://www.bccn.net.cn/project"}><span className={'main_content_link'} style={{padding:'40px 15px'}}>区块链项目展示</span></a></Col>
                            </Row>
                        </Col>
                        <Col span={5} className={'main_content_about'}>
                            <Row type={'flex'} align={'middle'} justify={'center'} className={'main_content_card_box'}>
                                <Col span={24}><a href={isDev?"http://localhost:3000/about":"http://www.bccn.net.cn/about"}><span className={'main_content_link'} style={{padding:'40px 15px'}}>关于我</span></a></Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={24} className={'main_footer'}>
                    <Row type={'flex'} align="middle" justify={'center'} className={'main_footer_box'}>
                        <Col span={24} className={'main_footer_icp'}>
                            <a href="http://www.miitbeian.gov.cn/">粤ICP备18066177号</a>
                        </Col>
                        <Col span={24} className={'main_footer_cop'}>Copyright © 2018 BCCN</Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

Main.propTypes = {};

export default Main;