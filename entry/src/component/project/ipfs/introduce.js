import React, {Component} from 'react';

class Introduce extends Component {
    render() {
        return (
            <div>
                <h2>项目介绍及主要技术点</h2>
                <p style={{textAlign:'left'}}>
                    <a href="https://ipfs.io/">IPFS星际文件系统</a>是一种点对点的超媒体文件存储、索引、交换协议，有望取代HTTP。底层基于libp2p，这使得用户量越大访问越快。<a href="https://www.ethereum.org/">以太坊智能合约</a>可以做到交易匿名，去中心化
                </p>
                <p style={{textAlign:'left'}}>
                    本项目尝试使用ipfs系统搭建一个资源有偿共享平台，结合以太坊智能合约和web.js完成用户充值和价值资源的展示，探讨一种利用区块链技术可以盈利的商业模式。本项目只是实现了简单流程，并不能够商用，具体的细节还需要在多做考虑
                </p>
                <p style={{textAlign:'left'}}>
                    本项目主要实现两个工程，前端程序部署到IPFS网络，后台管理程序部署到公司服务器。前端采用react技术搭建。考虑到后台作为一个企业级的项目将来可能会拓展，所以采用了一款国产的适合企业级开发的ThinkJS MVC框架+Mysql构建后台Node程序,管理界面使用Vue编写。
                </p>

            </div>
        );
    }
}

export default Introduce;
