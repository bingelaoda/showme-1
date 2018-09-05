import React, {Component} from 'react';

class Introduce extends Component {
    render() {
        return (
            <div>
                <h2>项目介绍及主要技术点</h2>
                <p style={{textAlign:'left'}}>
                    本项目参考国外大佬的<a href={'https://anders.com/blockchain/'}>Blockchain Demo</a>还有<a href={'https://bitcoin.org/en/developer-guide'}>官方文档</a>,自己动手模拟了比特币的translation 交易、
                    hash校验、工作量证明pow、block成链、私钥转账签名和节点广播同步数据的主要流程。本项目采用Java Springboot构建服务器程序，使用websocket模拟p2p网络通信
                </p>
            </div>
        );
    }
}

export default Introduce;
