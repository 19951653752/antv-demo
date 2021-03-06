import React, { Component } from 'react'
import { Modal, Popover, message, Button, Tooltip } from 'antd'
import { UserOutlined, PartitionOutlined } from '@ant-design/icons'
import G6 from '@antv/g6'
import registerBehavior from './utils/register-behavior'
import registerEdge from './utils/register-edge'
import registerNode from './utils/register-node'

import RightBox from './components/RightBox'
import ConditionBranch from './components/ConditionBranch'

import { deepClone } from './utils'

import './App.css'
import './icons/myfont/iconfont.css'

export default class index extends Component {
  state = {
    isModalVisible: true,
    visible: false,
    top: '200px',
    left: '500px',
    ConBtnVisible: true,
    nodeGraph: null,
    nodeId: null,
    nodeData: [
      {
        id: '0',
        label: '开始流程',
        nodeType: 'begin',
        style: {
          width: 100,
          height: 40,
        }
      },
      // {
      //   id: '1',
      //   title: '条件1',
      //   label: '审核条件',
      //   nodeType: 'condition',
      // },
      // {
      //   id: '2',
      //   title: '审核节点1',
      //   label: '审核人',
      //   nodeType: 'check',
      // },
      {
        id: '-1',
        label: '结束流程',
        nodeType: 'end',
        style: {
          width: 100,
          height: 40,
        }
      },
    ],
    edgeData: [
      {
        source: '0',
        target: '-1',
      },
      // {
      //   source: '1',
      //   target: '2',
      // },
      // {
      //   source: '2',
      //   target: '-1',
      // }
    ],
  }
  componentDidMount = () => {
    console.log('===========节点数据===========')
    console.log(deepClone(this.state.nodeData))
    console.log('===========边数据===========')
    console.log(deepClone(this.state.edgeData))
    this.getGraph()
  }
  changeData = () => {
    const data = {
      nodes: this.state.nodeData,
      edges: this.state.edgeData
    }
    console.log(data)
    this.graph.changeData(data)
  }
  recursion = (delIdArr, faSource) => {
    const { nodeData, edgeData } = this.state
    for (let i = 0; i < nodeData.length; i++) {
      if (delIdArr.includes(nodeData[i].id)) {
        nodeData.splice(i, 1)
        i < nodeData.length && i > 0 && i--
      }
    }
    this.graph.removeItem(this.graph.findById(delIdArr[0]))
    this.graph.removeItem(this.graph.findById(delIdArr[1]))
    let source = ''
    let target = ''
    let index = ''
    let arrTemp = []
    console.log(faSource)
    console.log(delIdArr)
    console.log(...edgeData)
    for (let i = edgeData.length - 1; i >= 0; i--) {
      if (delIdArr.includes(edgeData[i].source)) {
        index = i
        arrTemp.push(edgeData[i].target)
        target = edgeData[i].target
        edgeData.splice(i, 1)
      }
    }
    console.log(arrTemp)
    arrTemp = arrTemp.filter(item => {
      return item !== '-1'
    })
    if (arrTemp.length > 0) {
      console.log('11111111111111111111')
      this.recursion(arrTemp, faSource)
    } else {
      console.log('22222222222222222222222')
      if (faSource) {
        console.log('3333333333333333333')
        const obj = {
          source: faSource,
          target: target
        }
        edgeData.splice(index, 0, obj)
      }
    }

    this.setState({
      nodeData,
      edgeData
    })
    console.log(edgeData)
    this.changeData()
    this.graph.layout()
  }
  getGraph = () => {
    console.log(this)
    const self = this
    const data = {
      nodes: this.state.nodeData,
      edges: this.state.edgeData
    }

    registerBehavior(G6)
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
        `
      },
    })

    const minimap = new G6.Minimap({
      size: [216, 124],
      className: 'minimapClassEdit',
      viewportClassName: 'minimapViewportClass'
    })
    const graph = new G6.Graph({
      container: document.getElementById('container'),
      width: 700,
      height: window.innerHeight,
      // layout:    {
      //   type: 'dagre',
      // },
      layout: {
        type: 'dagre',
        // nodesepFunc: (d) => {
        //   console.log(d)
        //   // if (d.id === '3') {
        //   //   return 200
        //   // }
        //   return 100
        // },
        // ranksep: 50,
        nodesep: 70, // 可选
        ranksep: 40, // 可选
        controlPoints: true,
      },
      defaultNode: {
        type: 'k-rect',
        style: {
          width: 180,
          height: 70,
        },
        labelCfg: {
          style: {
            // fontSize: 20,
          },
        },
      },
      defaultEdge: {
        type: 'k-edge',
      },
      nodeStateStyles: {
        'nodeState:default': {
          opacity: 1,
          stroke: ''
        },
        'nodeState:hover': {
          opacity: 0.8,
          stroke: '#1890ff'
        }
      },
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          'node-hover',
          'drag-canvas'
        ]
      },
      plugins: [minimap],
      fitCenter: true,
      fitView: true,
      minZoom: 0.3,
      maxZoom: 2,
    })
    graph.read(data)
    this.graph = graph

    this.mouseClick()
    // this.mouseEnter()
  }
  mouseEnter = () => {
    this.graph.on('node:mouseenter', e => {
      console.log(this)
      this.graph.setItemState(e.item, 'hover', true)
    })
    this.graph.on('node:mouseleave', e => {
      this.graph.setItemState(e.item, 'hover', false)
    })
  }
  mouseClick = () => {
    this.graph.on('node:click', (e) => {
      console.log(e.item.get('id'))
      const { nodeData, edgeData } = this.state
      const nodeId = e.item.get('id')
      this.setState({
        nodeId
      })

      const itemNode = this.graph.findById(nodeId)
      const itemGroup = itemNode.get('group')
      const childrenArr = itemGroup.cfg.children
      const nameArr = ['add-check-shape', 'add-check-text']
      let booTemp = true
      childrenArr.forEach(item => {
        if (nameArr.includes(item.cfg.name)) {
          booTemp = false
        } else {
          booTemp = true
        }
      })

      // 点击+号
      if (
        ['add-node-shape', 'add-node-text'].includes(e.target.cfg.name)
      ) {
        this.setState({ conBtnVisible: booTemp })
        this.setState({ nodeGraph: e })
        this.setState({ visible: !this.state.visible, left: e.clientX + 20, top: e.clientY + 15 })
      }
      // 点击 添加条件 按钮
      if (
        ['add-check-shape', 'add-check-text'].includes(e.target.cfg.name)
      ) {
        const date = Date.now() + ''
        const titleArr = []
        nodeData.forEach(item => {
          item.title && item.title.startsWith('条件') && titleArr.push(item.title.slice(-1))
        })
        const maxTitle = Math.max(...titleArr) + 1
        console.log(maxTitle)
        const nodeObj = {
          id: date,
          title: '条件' + maxTitle,
          label: '条件' + maxTitle,
          nodeType: 'condition'
        }
        nodeData.push(nodeObj)
        console.log(nodeData)

        let midTarget = ''
        let endTarget = ''
        edgeData.forEach(item => {
          if (item.source === nodeId) {
            midTarget = item.target
          }
        })
        edgeData.forEach(item => {
          if (item.source === midTarget) {
            endTarget = item.target
          }
        })
        const edgeArr = [
          {
            source: nodeId,
            target: date
          },
          {
            source: date,
            target: endTarget
          }
        ]
        let sourceIndex = ''
        let targetIndex = ''
        for (const i in edgeData) {
          if (edgeData[i].source === nodeId) {
            sourceIndex = i
          }
          if (edgeData[i].target === endTarget) {
            targetIndex = i
          }
        }
        edgeData.splice(sourceIndex + 1, 0, edgeArr[0])
        edgeData.splice(targetIndex + 2, 0, edgeArr[1])
        console.log(edgeData)
        this.setState({
          nodeData,
          edgeData
        })
        this.changeData()
      }
      // 点击删除
      if (e.target.cfg.name === 'check-title-del') {
        // delete node
        for (const i in nodeData) {
          if (nodeData[i].id === nodeId) {
            nodeData.splice(i, 1)
          }
        }
        // delete edge
        console.log(edgeData)
        const sourceArr = []
        const targetArr = []
        for (let i = edgeData.length - 1; i >= 0; i--) {
          // 拿到当前节点对应的source 和 targetd
          if (edgeData[i].target === nodeId) {
            sourceArr.push(edgeData[i].source)
            edgeData.splice(i, 1)
          } else if (edgeData[i].source === nodeId) {
            targetArr.push(edgeData[i].target)
            edgeData.splice(i, 1)
          }
        }
        console.log(sourceArr)
        console.log(targetArr)
        const edgeArr = []
        if (sourceArr.length > 1) {
          sourceArr.forEach(item => {
            const obj = {
              source: item,
              target: +targetArr + ''
            }
            edgeArr.push(obj)
          })
        } else if (targetArr.length > 1) {
          targetArr.forEach(item => {
            const obj = {
              source: +sourceArr + '',
              target: item
            }
            edgeArr.push(obj)
          })
        } else {
          const obj = {
            source: +sourceArr + '',
            target: +targetArr + ''
          }
          edgeArr.push(obj)
        }
        edgeData.push(...edgeArr)
        console.log(edgeData)
        this.setState({
          nodeData,
          edgeData
        })
        this.graph.removeItem(this.graph.findById(nodeId))
        this.changeData()
        this.graph.layout()
      }
      if (e.target.cfg.name === 'condition-title-del') {
        // delete node
        // delete edge
        console.log(edgeData)
        let faSource = ''
        let branchCount = 0
        const nodeIdArr = []
        edgeData.forEach(item => {
          if (item.target === nodeId) {
            faSource = item.source
          }
        })
        edgeData.forEach(item => {
          if (item.source === faSource) {
            branchCount++
            nodeIdArr.push(item.target)
          }
        })
        console.log(faSource)
        console.log(branchCount)
        console.log(nodeIdArr)

        // 只有两个条件分支，删一个则全部删除
        // 删除添加条件按钮
        // 通过边，拿到要操作的节点，先修改当前节点的addNode，再删除当前节点下的添加条件按钮
        edgeData.forEach(item => {
          if (item.target === nodeId) {
            const itemNode = this.graph.findById(item.source)
            const itemGroup = itemNode.get('group')

            for (let i = nodeData.length - 1; i >= 0; i--) {
              if (nodeData[i].id === item.source) {
                nodeData[i].addNode = false
              }
            }

            const { children } = itemGroup.cfg
            const icon = children.find(child => child.cfg.name === 'add-check-shape')
            const iconText = children.find(child => child.cfg.name === 'add-check-text')
            if (icon) {
              icon.remove()
              iconText.remove()
            }
          }
        })
        if (branchCount === 2) {
          for (let i = 0; i < nodeData.length; i++) {
            if (nodeIdArr.includes(nodeData[i].id)) {
              nodeData.splice(i, 1)
              i < nodeData.length && i > 0 && i--
            }
          }
          console.log(nodeData)
          this.graph.removeItem(this.graph.findById(nodeIdArr[0]))
          this.graph.removeItem(this.graph.findById(nodeIdArr[1]))

          console.log(edgeData)

          let source = ''
          let target = ''
          let index = ''
          let delIdArr = []
          let faSource = ''
          // 先拿到当前节点的父节点，存起来
          edgeData.forEach(item => {
            if (item.target === nodeId) {
              faSource = item.source
            }
          })
          for (let i = edgeData.length - 1; i >= 0; i--) {
            if (nodeIdArr.includes(edgeData[i].target)) {
              index = i
              source = edgeData[i].source
              console.log(edgeData[i].source)
              edgeData.splice(i, 1)
            } else if (nodeIdArr.includes(edgeData[i].source)) {
              delIdArr.push(edgeData[i].target)
              index = i
              target = edgeData[i].target
              console.log(edgeData[i].target)
              edgeData.splice(i, 1)
            }
          }
          delIdArr = delIdArr.filter(item => {
            return item !== '-1'
          })
          console.log(delIdArr.length)
          console.log(faSource)
          if (delIdArr.length > 0) {
            this.recursion(delIdArr, faSource)
          } else {
            const obj = {
              source,
              target
            }
            edgeData.splice(index, 0, obj)
          }
          console.log(nodeData)
          console.log(edgeData)
        }
        // 大于两个条件分支，只删除当前分支
        else {
          for (const i in nodeData) {
            if (nodeData[i].id === nodeId) {
              nodeData.splice(i, 1)
            }
          }
          this.graph.removeItem(this.graph.findById(nodeId))
          for (let i = edgeData.length - 1; i >= 0; i--) {
            if (edgeData[i].target === nodeId) {
              edgeData.splice(i, 1)
            } else if (edgeData[i].source === nodeId) {
              edgeData.splice(i, 1)
            }
          }
          console.log(edgeData)
        }


        this.setState({
          nodeData,
          edgeData
        })
        this.changeData()
        this.graph.layout()
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
    this.setState({ visible })
  }
  addNode = (type) => {
    return () => {
      if (type === 'check') {
        const date = Date.now() + ''
        const { nodeId, nodeData, edgeData } = this.state
        const titleArr = []
        const idArr = []
        nodeData.forEach(item => {
          idArr.push(item.id)
          item.title && item.title.startsWith('审核节点') && titleArr.push(item.title.slice(-1))
        })
        const maxTitle = Math.max(...titleArr) + 1
        console.log(maxTitle)
        const maxId = +idArr.sort().pop() + 1 + ''
        const nodeObj = {
          id: maxId,
          title: '审核节点' + maxId,
          label: '审核节点' + maxId,
          nodeType: 'check'
        }
        nodeData.push(nodeObj)
        console.log(nodeData)

        const sourceArr = []
        const targetArr = []
        let index = ''
        const edgeArr = []
        for (let i = edgeData.length - 1; i >= 0; i--) {
          if (edgeData[i].source === nodeId) {
            sourceArr.push(edgeData[i].source)
            targetArr.push(edgeData[i].target)
            index = i
            console.log(edgeData[i])
            edgeData.splice(i, 1)
          }
        }
        edgeArr.push({
          source: sourceArr[0],
          target: maxId
        })
        targetArr.forEach(item => {
          edgeArr.push({
            source: maxId,
            target: item
          })
        })
        // 判断source有无添加条件，有的话，就删除，再给新的节点 添加
        let booTemp = false
        for (let i = nodeData.length - 1; i >= 0; i--) {
          if (nodeData[i].id === nodeId && nodeData[i].addNode) {
            nodeData[i].addNode = false
            booTemp = true
          }
        }
        for (let i = nodeData.length - 1; i >= 0; i--) {
          if (booTemp && nodeData[i].id === maxId) {
            nodeData[i].addNode = true
          }
        }
        const itemNode = this.graph.findById(nodeId)
        const itemGroup = itemNode.get('group')
        const { children } = itemGroup.cfg
        const icon = children.find(child => child.cfg.name === 'add-check-shape')
        const iconText = children.find(child => child.cfg.name === 'add-check-text')
        if (icon) {
          icon.remove()
          iconText.remove()
        }


        console.log(edgeArr)
        edgeData.splice(index, 0, ...edgeArr)
        console.log(sourceArr)
        console.log(targetArr)
        this.setState({
          nodeData,
          edgeData
        })
        console.log(this.state.edgeData)
        console.log(this.state.nodeData)
        this.changeData()
      } else {
        const date = Date.now() + ''
        const { nodeId, nodeData, edgeData } = this.state
        console.log(nodeId)
        const titleArr = []
        const idArr = []
        nodeData.forEach(item => {
          idArr.push(item.id)
          item.title && item.title.startsWith('条件') && titleArr.push(item.title.slice(-1))
        })
        const maxTitle = titleArr.length ? Math.max(...titleArr) + 1 : 1
        const maxId = +idArr.sort().pop() + 1 + ''
        console.log(maxId)
        const nodeArr = [
          {
            id: maxId,
            title: '条件' + maxId,
            label: '条件' + maxId,
            nodeType: 'condition'
          },
          {
            id: +maxId + 1 + '',
            title: '条件' + (+maxId + 1),
            label: '条件' + (+maxId + 1),
            nodeType: 'condition'
          }
        ]
        nodeData.forEach(item => {
          console.log(item)
          if (item.id === nodeId) {
            item.addNode = true
          }
        })
        nodeData.push(...nodeArr)
        console.log(nodeData)

        let sourceArr = ''
        let targetArr = ''
        let index = ''
        for (const i in edgeData) {
          if (edgeData[i].source === nodeId) {
            index = i
            sourceArr = edgeData[i].source
            targetArr = edgeData[i].target
          }
        }
        const edgeArr = [
          {
            source: sourceArr,
            target: maxId
          },
          {
            source: sourceArr,
            target: +maxId + 1 + ''
          },
          {
            source: maxId,
            target: targetArr
          },
          {
            source: +maxId + 1 + '',
            target: targetArr
          }
        ]
        edgeData.splice(index, 1, ...edgeArr)
        this.setState({
          nodeData,
          edgeData
        })
        console.log(this.state.edgeData)
        console.log(this.state.nodeData)
        this.changeData()
      }
      this.setState({ visible: false })
    }
  }
  content = (
    <div>
      <div onClick={this.addNode}>
        <Button type="primary" shape="circle" icon={<UserOutlined />} />
        审核人
      </div>
      <div onClick={this.addNode}>
        <Button type="primary" shape="circle" icon={<PartitionOutlined />} />
        条件分支
      </div>
    </div>
  )
  render() {

    function confirm(e) {
      console.log(e)
      message.success('Click on Yes')
    }

    function cancel(e) {
      console.log(e)
      message.error('Click on No')
    }

    return (
      <Modal bodyStyle={{ padding: '0' }} title="Basic Modal" visible={this.state.isModalVisible} footer={null} width="1200px">
        <div className='box'>
          <div id="container" style={{ position: 'relative' }}></div>
          <div style={{ position: 'fixed', top: this.state.top, left: this.state.left }}>
            <Popover
              placement="rightBottom"
              // content={<a onClick={this.hide}>Close</a>}
              content={
                <div>
                  <div onClick={this.addNode('check')}>
                    <Button type="primary" shape="circle" icon={<UserOutlined />} />
                    审核人
                  </div>
                  {
                    this.state.conBtnVisible ?
                      <div onClick={this.addNode('condition')}>
                        <Button type="primary" shape="circle" icon={<PartitionOutlined />} />
                        条件分支
                      </div>
                      :
                      ''
                  }
                </div>
              }
              trigger="click"
              visible={this.state.visible}
              onVisibleChange={this.handleVisibleChange}
            />
          </div>
          <RightBox />
          {/* <ConditionBranch /> */}
        </div>
      </Modal>
    )
  }
}
