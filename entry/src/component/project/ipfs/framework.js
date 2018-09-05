import React, {Component} from 'react';
import {Row, Col} from 'antd';

class Framework extends Component {
    render() {
        return (

            <Row type={'flex'} align="middle" justify={'center'} style={{fontSize:16,textAlign:'center'}}>
                <Col span={24} style={{position:'absolute',top:30,left:0,padding:10}}>
                    <img src="imgs/framework.jpg" style={{width:'100%',height:'100%'}} alt="啊噢，加载失败了"/>
                </Col>
            </Row>
        );
    }
}

export default Framework;