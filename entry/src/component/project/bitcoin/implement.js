import React, {Component} from 'react';
import * as jsrsasign from 'jsrsasign';
import $ from 'jquery';
import {Row, Col, Table, Button, Input, InputNumber} from 'antd';
import config from '../../../config/config'

let isDev = config.isDev;
const domainWs = isDev?'ws://localhost:':'ws://www.bccn.net.cn:';

const columns = [{
    width:'10%',
    title: 'ID',
    align:'center',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    width:'10%',
    title: 'Coin',
    align:'center',
    dataIndex: 'content',
    key: 'content',
    render: text => <a href="javascript:;">{text}</a>,
},  {
    width:'25%',
    title: 'From',
    align:'center',
    dataIndex: 'from',
    key: 'from',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    width:'25%',
    title: 'To',
    align:'center',
    dataIndex: 'to',
    key: 'to',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    width:'10%',
    title: 'Hash',
    align:'center',
    dataIndex: 'hash',
    key: 'hash',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    width:'10%',
    title: 'POW',
    align:'center',
    key: 'nonce',
    dataIndex: 'nonce',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    width:'10%',
    title: 'PreHash',
    align:'center',
    dataIndex: 'preHash',
    key: 'preHash',
    render: text => <a href="javascript:;">{text}</a>,
}];

class Implement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[],
            priKey:'',
            pubKey:'',
            desPubkey:'',
            peerlist:'',
            genesis:'',
            message:''
        }
    }

    generateKeyOnclick = ()=>{

        //PKCS1   -----BEGIN RSA PRIVATE KEY----- openssl 默认生成的是这个
        //PKCS8   -----BEGIN PRIVATE KEY-----
        let rsaKeypair = jsrsasign.KEYUTIL.generateKeypair('RSA', 2048);
        let prvkeyObj = rsaKeypair.prvKeyObj;
        let pubkeyObj = rsaKeypair.pubKeyObj;
        let prvKey = jsrsasign.KEYUTIL.getPEM(prvkeyObj, 'PKCS8PRV');
        let pubKey = jsrsasign.KEYUTIL.getPEM(pubkeyObj);
        this.setState({
           priKey:prvKey,
           pubKey:pubKey
        });

    };

    getPeesOnclick = ()=>{

        let url = this.props.url+'/getPeers';
        $.get(url,(response)=>{
            this.setState({
                peerlist:JSON.stringify(response)
            });
        })

    };

    connectOnclick = ()=>{

        let url = this.props.url+'/conn';
        $.get(url,(response)=>{
            alert(response);
        });
    };

    showList = ()=>{
        let url = this.props.url+'/showlist';
        $.get(url,(response)=>{
            let list = [];
            for (let i = 0; i < response.length;i++){
                let block = response[i];
                block['key'] = block['id'];
                list.push(block);
            }
            this.setState({data:list});
        });
    };

    addGenesisOnclick = (genesis)=>{

        let url = this.props.url+'/addGenesis';
        $.post(url, {
            genesis:genesis
        },(response)=>{
            alert(response);
            this.showList();
        });

    };

    updateOnclick = ()=>{
        let url = this.props.url+'/syncData';
        $.get(url,(response)=>{
            alert(response);
            this.showList();
        });
    };

    sendOnclick = (pubKey,desPubkey,priKey,money)=>{
        let url = this.props.url+'/addNote';
        /*=================================使用js库生成签名信息=====开始======================================*/
        // 获取私钥
        let prvKey = jsrsasign.KEYUTIL.getKey(priKey);
        // 指定算法
        let sig = new jsrsasign.KJUR.crypto.Signature({"alg": "SHA256withRSA"});
        // 初始化私钥
        sig.init(prvKey);
        // 传入原文
        sig.updateString(""+money);
        // 生成签名
        let sigValueHex = sig.sign();
        console.log(sigValueHex);
        /*=================================使用js库生成签名信息=====结束======================================*/
        $.post(url, {
            senderPublicKey: pubKey,
            receiverPublicKey: desPubkey,
            content: money,
            signaturedData: sigValueHex
        },(response)=>{
            alert(response);
            this.showList();
        });
    };

    confirmOnclick = ()=>{
        let url = this.props.url+'/check';
        $.get(url,(response)=>{
            alert(response);
        });
    };

    broadOnclick = (msg)=>{
        let url = this.props.url+'/broadcast';
        $.post(url,{
            msg:msg
        },(response)=> {
            alert(response);
        });
    };


    componentDidMount() {
        this.showList();
    }


    render() {
        let {data,
            priKey,
            pubKey,
            desPubkey,
            peerlist,
            genesis,
            money,
            message} = this.state;
        return (
            <Row type={'flex'} align="middle" justify={'center'} style={{fontSize:16,textAlign:'left'}}>
                <Col span={24} style={{position:'absolute',top:0,left:0,height:'150%',padding:10}}>
                    <Row type={'flex'} align="middle" justify={'center'}>
                        <Col span={24} style={{textAlign:'center',marginBottom:10}}>
                            <Row>
                                <Col span={24} style={{fontSize:40,paddingTop:5}}>{this.props.title}</Col>
                                <Col span={24} style={{paddingTop:5}}>服务端Web地址：{this.props.url}</Col>
                                <Col span={24} style={{paddingTop:5}}>服务端Websocket地址:{domainWs+(parseInt(this.props.port)+1)}</Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginBottom:10}}>
                            <Row>
                                <Col span={24} style={{fontSize:20,paddingTop:5}}>1.生成公私钥对(PKCS#8)，模拟Bip39协议生成的钱包地址和密码</Col>
                                <Col span={24} style={{paddingTop:5}}><Button size={'small'} onClick={()=>this.generateKeyOnclick()}>Generate Keys</Button></Col>
                                <Col span={24} style={{paddingTop:5}}>生成的公钥:</Col>
                                <Col span={24} style={{paddingTop:5}}><Input  size={'small'} placeholder="钱包地址" value={pubKey} onChange={(e)=>{this.setState({pubKey:e.target.value})}}/></Col>
                                <Col span={24} style={{paddingTop:5}}>生成的私钥:</Col>
                                <Col span={24} style={{paddingTop:5}}><Input  size={'small'} placeholder="钱包密码" value={priKey} onChange={(e)=>{this.setState({priKey:e.target.value})}}/></Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginBottom:10}}>
                            <Row>
                                <Col span={24} style={{fontSize:20,paddingTop:5}}>2.获取节点列表、连接节点</Col>
                                <Col span={24} style={{paddingTop:5}}><Button size={'small'} onClick={()=>this.getPeesOnclick()}>Get Peers:</Button></Col>
                                <Col span={24} style={{paddingTop:5}}><Input  size={'small'} disabled={true} value={peerlist} placeholder="当前加入到比特币网络的所有节点"/></Col>
                                <Col span={24} style={{paddingTop:5}}><Button size={'small'} onClick={()=>this.connectOnclick()}>Connect</Button></Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginBottom:10}}>
                            <Row>
                                <Col span={24} style={{fontSize:20,paddingTop:5}}>3.添加创世区块</Col>
                                <Col span={24} style={{paddingTop:5}}><Input  size={'small'} value={genesis} placeholder="请输入内容" onChange={(e)=>{this.setState({genesis:e.target.value})}}/></Col>
                                <Col span={24} style={{paddingTop:5}}><Button size={'small'} onClick={()=>this.addGenesisOnclick(genesis)}>Add Genesis</Button></Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginBottom:10}}>
                            <Row>
                                <Col span={24} style={{fontSize:20,paddingTop:5}}>4.同步账本数据</Col>
                                <Col span={24} style={{paddingTop:5}}><Button size={'small'} onClick={()=>this.updateOnclick()}>Update</Button></Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginBottom:10}}>
                            <Row>
                                <Col span={24} style={{fontSize:20,paddingTop:5}}>5.转账</Col>
                                <Col span={24} style={{paddingTop:5}}>要转账的账号（{this.props.title === 'Peer A'?'Peer B':'Peer A'}的公钥):</Col>
                                <Col span={24} style={{paddingTop:5}}><Input  size={'small'} placeholder="地址" value={desPubkey} onChange={(e)=>{this.setState({desPubkey:e.target.value})}}/></Col>
                                <Col span={24} style={{paddingTop:5}}>转账金额:  <InputNumber size={'small'} min={1} defaultValue={1} onChange={(value)=>{this.setState({money:value})}}/></Col>
                                <Col span={24} style={{paddingTop:5}}><Button size={'small'} onClick={()=>this.sendOnclick(pubKey,desPubkey,priKey,money)}>Send Transaction</Button></Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginBottom:10}}>
                            <Row>
                                <Col span={24} style={{fontSize:20,paddingTop:5}}>6.校验当前账本是否被篡改过</Col>
                                <Col span={24} style={{paddingTop:5}}><Button size={'small'} onClick={()=>this.confirmOnclick()}>Confirm Transaction</Button></Col>
                            </Row>
                        </Col>

                        <Col span={24} style={{marginBottom:10}}>
                            <Row>
                                <Col span={24} style={{fontSize:20,paddingTop:5}}>7.广播自定义的消息</Col>
                                <Col span={24} style={{paddingTop:5}}><Input  size={'small'} value={message} placeholder="请输入消息内容" onChange={(e)=>{this.setState({message:e.target.value})}}/></Col>
                                <Col span={24} style={{paddingTop:5}}><Button size={'small'} onClick={()=>this.broadOnclick(message)}>Broad</Button></Col>
                            </Row>
                        </Col>

                    </Row>
                    <Row type={'flex'} align="middle" justify={'center'} style={{fontSize:16,textAlign:'left'}}>
                        <Col span={24} style={{fontSize:40,textAlign:'center',margin:30}}>账本</Col>
                        <Col span={24} ><Table columns={columns} dataSource={data}/></Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Implement;
