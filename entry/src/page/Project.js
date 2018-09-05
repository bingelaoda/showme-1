import React, {Component} from 'react';
import 'reveal.js/css/reveal.css';
import 'reveal.js/css/theme/league.css';
import Reveal from 'reveal.js';
import '../css/Project.css';
import BtIntro from '../component/project/bitcoin/introduce';
import BtImpl from '../component/project/bitcoin/implement';
import IpfsIntro from '../component/project/ipfs/introduce';
import Framework from '../component/project/ipfs/framework';
import Mysql from '../component/project/ipfs/mysql';
import Summary from '../component/project/summary/summary';
import config from '../config/config'

let isDev = config.isDev;


class Project extends Component {


    componentDidMount() {
        Reveal.initialize({

            // Transition speed
            transitionSpeed: 'slow', // default/fast/slow

            // Transition style for full page slide backgrounds
            backgroundTransition: 'none', // none/fade/slide/convex/concave/zoom
            keyboard: {
                13: 'next',
                27: function() {window.location.href = '#/0'},
            }
        });
    }

    render() {
        return (
            <div className="reveal project_layout">
                <div className="slides">
                    <section data-background="#222" itemID={'0'}>
                        <div style={{fontSize:75,paddingBottom:50}}>PROJECTS</div>
                        <div style={{paddingBottom:20}}><a href={'#/1'}>Bitcoin实现原理研究 Demo</a></div>
                        <div style={{paddingBottom:20}}><a href={'#/2'}>DApp开发实战项目 Demo</a></div>
                        <div style={{paddingBottom:20}}><a href={'#/3'}>关于区块链技术的一些思考</a></div>
                        <div style={{paddingBottom:20}}><a href={'https://git.bccn.net.cn'}>项目部分源码https://git.bccn.net.cn</a></div>
                    </section>
                    <section data-background="#222" itemID={'1'} data-transition="zoom">
                        <section>
                            <div style={{fontSize:75,paddingBottom:50}}>Bitcoin实现原理研究 Demo</div>
                        </section>
                        <section>
                            <BtIntro />
                        </section>
                        <section>
                            <div style={{overflow:'auto',position:'fixed',left:0,top:50,right:0,bottom:150}}>
                                <BtImpl title={'Peer A'} port={'3500'} url={isDev?'http://localhost:3500/peerA':'https://www.bccn.net.cn/peerA'}/>
                            </div>
                        </section>
                        <section>
                            <div style={{overflow:'auto',position:'fixed',left:0,top:50,right:0,bottom:150}}>
                                <BtImpl title={'Peer B'} port={'4500'} url={isDev?'http://localhost:4500/peerB':'https://www.bccn.net.cn/peerB'}/>
                            </div>
                        </section>

                    </section>
                    <section data-background="#222" itemID={'2'} data-transition="zoom">
                        <section>
                            <div style={{fontSize:75,paddingBottom:50}}>DApp开发实战项目</div>
                            <div style={{paddingBottom:20}}>IPFS+Ethereum价值资源分享平台</div>
                        </section>
                        <section>
                            <div style={{overflow:'auto',position:'fixed',left:0,top:50,right:0,bottom:150}}>
                                <IpfsIntro />
                            </div>
                        </section>
                        <section>
                            <div style={{overflow:'auto',position:'fixed',left:0,top:50,right:0,bottom:150}}>
                                <Framework />
                                <div style={{fontSize:30}}>整体架构</div>
                            </div>
                        </section>
                        <section>
                            <div style={{overflow:'auto',position:'fixed',left:0,top:50,right:0,bottom:150}}>
                                <Mysql />
                                <div style={{fontSize:30}}>数据库设计</div>
                            </div>
                        </section>
                        <section>
                            <div style={{fontSize:75,paddingBottom:50}}>项目展示</div>
                            <div style={{paddingBottom:20}}><a href={isDev?'http://localhost:1111':'120.77.153.243:1111'}>点击查看前端界面</a></div>
                            <div style={{paddingBottom:20}}><a href={isDev?'http://localhost:2222':'120.77.153.243:2222'}>点击查看后台管理界面</a></div>
                        </section>
                    </section>
                    <section data-background="#222" itemID={'3'} data-transition="zoom">

                        <section>
                            <div style={{overflow:'auto',position:'fixed',left:0,top:50,right:0,bottom:150}}>
                                <Summary />
                            </div>
                        </section>
                        <section>
                            <div style={{fontSize:75,paddingBottom:50}}>The End Thank You!</div>
                            <div style={{paddingBottom:20}}>Best Regards!</div>
                        </section>
                    </section>
                </div>
            </div>
        );
    }
}

export default Project;
