import React, { Component } from 'react'
import { Popover, message, Button, Tooltip } from 'antd';
import { UserOutlined, PartitionOutlined } from '@ant-design/icons';
import G6 from '@antv/g6'
import registerBehavior from './utils/register-behavior';
import registerEdge from './utils/register-edge'
import registerNode from './utils/register-node'

import RightBox from './components/RightBox';

import './App.css'

export default class index extends Component {
  state = {
    visible: false,
    top: '200px',
    left: '500px',
    nodeGraph: null
  }
  componentDidMount = () => {
    const data = {
      nodes: [
        {
          id:    '0',
          label: '开始流程',
          style: {
            // fill: '#000',
            // stroke: '#fff',
            width: 100,
            height: 35,
          }
        },
        {
          id:    '1',
          label: 'node 1',
        },
        {
          id:    '2',
          label: 'node 2',
        },
        {
          id: '3',
          label: 'node 3'
        },
        {
          id: '31',
          label: 'node 31'
        },
        {
          id: '32',
          label: 'node 32'
        },
        {
          id:    '-1',
          label: '结束流程',
        },
      ],
      edges: [
        {
          source: '0',
          target: '1',
        },
        {
          source: '0',
          target: '2',
        },
        {
          source: '0',
          target: '3',
        },
        {
          source: '1',
          target: '-1',
        },
        {
          source: '2',
          target: '-1',
        },
        // {
        //   source: '3',
        //   target: '-1',
        // },
        {
          source: '3',
          target: '31',
        },
        {
          source: '3',
          target: '32',
        },
        {
          source: '31',
          target: '-1',
        },
        {
          source: '32',
          target: '-1',
        },
      ],
    };

    registerBehavior(G6);
    registerEdge(G6)
    registerNode(G6)

    const menu = new G6.Menu({
      offsetY: -20,
      itemTypes: ['node'],
      getContent(e) {
        const model = e.item.getModel()

        return `
          <p class="menu-item" command="edit-node">编辑文本</p>
          <p class="menu-item" command="delete-node">删除节点</p>
        `;
      },
    })
    
    const graph = new G6.Graph({
      container: document.getElementById('container'),
      width:     700,
      height:    window.innerHeight,
      // layout:    {
      //   type: 'dagre',
      // },
      layout: {
        type: 'dagre',
        // nodesepFunc: (d) => {
        //   console.log(d)
        //   // if (d.id === '3') {
        //   //   return 200;
        //   // }
        //   return 100;
        // },
        // ranksep: 50,
        nodesep: 70, // 可选
        ranksep: 50, // 可选
        controlPoints: true,
      },
      defaultNode: {
        type:  'k-rect',
        style: {
          width:  180,
          height: 60,
        },
        labelCfg: {
          style: {
            // fontSize: 20,
          },
        },
      },
      defaultEdge: {
        type:  'k-edge',
      },
      fitCenter: true,
      fitView: true,
      plugins: [menu],
    });

    graph.read(data);
    this.graph = graph;

    this.mouseClick()
  }
  mouseClick = () => {
    
    const self = this
    this.graph.on('node:click', (e) => {
      console.log(e)
      console.log(e.item.get('id'))
      console.log(e.item.getModel())


      const model = {
        id: 'node',
        label: 'node',
        address: 'cq',
        x: 200,
        y: 150,
        style: {
          fill: 'blue',
        },
      };
      
      self.graph.addItem('node', model);




      if (
        ['add-node-shape', 'add-node-text'].includes(e.target.cfg.name)
      ) {
        console.log(self)
        self.setState({ nodeGraph: e })
        self.setState({ visible: !self.state.visible, left: e.clientX + 20, top: e.clientY + 15 })

        // console.log('添加节点')
        // this.createId = e.item.get('id')
        // const nodeType = this.graph.findById(e.item.get('id')).getModel().nodeType
        // const params = {
        //   id: this.createId,
        //   nodeType,
        //   viewDrawerVisible: true
        // }
        // this.$emit('viewDetail', params)
      }
    })
  }
  hide = () => {
    console.log(123)
    this.setState({
      visible: false,
    })
  }
  handleVisibleChange = visible => {
    console.log(visible)
    this.setState({ visible });
  }
  addNode = (type) => {
    return () => {
      console.log(this.state.nodeGraph)
      const model = {
        id: 'node',
        label: 'node',
        address: 'cq',
        x: 200,
        y: 150,
        style: {
          fill: 'blue',
        },
      };
      this.state.nodeGraph.addItem('node', model);
      switch(type) {
        // 添加审核人
        case 'examine':
          console.log(type)
          break
        // 添加条件分支
        case 'condition':
          console.log(type)
          break
      }
    }
  }
  content = (
    <div>
      <div onClick={this.addNode('examine')}>
        <Button type="primary" shape="circle" icon={<UserOutlined />} />
        审核人
      </div>
      <div onClick={this.addNode('condition')}>
        <Button type="primary" shape="circle" icon={<PartitionOutlined />} />
        条件分支
      </div>
    </div>
  );
  render() {

    function confirm(e) {
      console.log(e);
      message.success('Click on Yes');
    }
    
    function cancel(e) {
      console.log(e);
      message.error('Click on No');
    }

    return (
      <div className='box'>
        <div id="container"></div>
        <div style={{ position: 'fixed', top: this.state.top, left: this.state.left }}>
          <Popover
            placement="rightBottom"
            // content={<a onClick={this.hide}>Close</a>}
            content={this.content}
            trigger="click"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
          />
        </div>
        <RightBox />
      </div>
    )
  }
}
