import React, { Component } from 'react'

import { Tabs, Select, Input, Button } from 'antd';

import styles from './index.less';

export default class RightBox extends Component {
  state = {
    name: '',
    describe: '',
    conBtnVisible: false,
    // comValue: undefined,
    // conValue: undefined,
    // value1: '',
    // value2: '',
    conList:[
      {
        id: '1',
        comValue: undefined,
        conValue: undefined,
        value1: '',
        value2: ''
      }
    ],
    comOptions: [
      {
        value: '1',
        label: '填表人'
      },
      {
        value: '2',
        label: '单选组件'
      },
      {
        value: '3',
        label: '多选择将'
      },
      {
        value: '4',
        label: '下拉组件'
      },
      {
        value: '5',
        label: '数字组件'
      }
    ],
    conOptions: [
      {
        value: '1',
        label: '等于'
      },
      {
        value: '2',
        label: '不等于'
      },
      {
        value: '3',
        label: '大于'
      },
      {
        value: '4',
        label: '大于等于'
      },
      {
        value: '5',
        label: '小于'
      },
      {
        value: '6',
        label: '小于等于'
      },
      {
        value: '7',
        label: '介于'
      },
      {
        value: '8',
        label: '包含任意'
      },
      {
        value: '9',
        label: '为空'
      },
      {
        value: '10',
        label: '不为空'
      }
    ],
    valueOptions: [

    ]
  }
  mouseEnter = () => {
    console.log(123)
    this.setState({ conBtnVisible: true })
  }
  mouseLeave = () => {
    this.setState({ conBtnVisible: false })
  }
  handleComChange = (id) => {
    return (value) => {
      const { conList } = this.state
      conList.forEach(item => {
        if (item.id === id) {
          item.comValue = value
          item.conValue = undefined
          item.value1 = ''
          item.value2 = ''
        }
      })
      this.setState(conList)
    }
  }
  handleConChange = (id) => {
    return (value) => {
      const { conList } = this.state
      conList.forEach(item => {
        if (item.id === id) {
          item.conValue = value
          item.value1 = ''
          item.value2 = ''
        }
      })
      this.setState(conList)
    }

  }
  inputChange = (id) => {
    return (e) => {
      const { conList } = this.state
      conList.forEach(item => {
        if (item.id === id) {
          item.value1 = e.target.value
        }
      })
      
      this.setState({ conList })
    }
    
  }
  addCon = () => {
    const { conList } = this.state
    const obj = {
      id: Date.now() + '',
      comValue: undefined,
      conValue: undefined,
      value1: '',
      value2: ''
    }
    conList.push(obj)
    this.setState({ conList })
  }
  submit = () => {
    console.log(this.state)
  }
  render() {
    const { TabPane } = Tabs;
    const { Option } = Select;
    return (
      <div className={styles.rightBox}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="条件分支设置" key="1">
            <div className={styles.conBox}>
              <div onMouseLeave={this.mouseLeave} className={styles.conTool}>
                <button hover onMouseEnter={this.mouseEnter} className={styles.conButton}>并且</button>
                <span style={{ display: this.state.conBtnVisible ? 'inline' : 'none' }}>
                  <button className={styles.conButton}>或者</button>
                  <button className={styles.addConButton} onClick={this.addCon}>添加条件</button>
                  <button className={styles.addConButton}>添加条件组</button>
                </span>
              </div>
              <div className={styles.itemBox}>
                {
                  this.state.conList.map(item => {
                    return <div key={item.id} className={styles.item}>
                    <Select placeholder="请选择" value={this.state.comValue} style={{ width: 120 }} onChange={this.handleComChange(item.id)}>
                      {
                        this.state.comOptions.map(i => {
                          return <Option key={i.value} value={i.value}>{i.label}</Option>
                        })
                      }
                    </Select>
                    <Select placeholder="请选择" value={item.conValue} style={{ width: 120 }} onChange={this.handleConChange(item.id)}>
                      {
                        this.state.conOptions.map(i => {
                          return <Option key={i.value} value={i.value}>{i.label}</Option>
                        })
                      }
                    </Select>
                    {
                      item.conValue !== '7'
                        ? 
                      <Input value={item.value1} style={{ width: '100px' }} placeholder="Basic usage" onChange={this.inputChange(item.id)} />
                        :
                      <span>
                      <Input value={item.value1} style={{ width: '100px', marginRight: '10px' }} placeholder="Basic usage" />
                      ~
                      <Input value={item.value2} style={{ width: '100px', marginLeft: '10px' }} placeholder="Basic usage" />
                      </span> 
                    }
                    {/* <Input style={{ width: '100px' }} placeholder="Basic usage" />
                    <span>
                    <Input style={{ width: '100px', marginRight: '10px' }} placeholder="Basic usage" />
                    ~
                    <Input style={{ width: '100px', marginLeft: '10px' }} placeholder="Basic usage" />
                    </span> */}
                    </div>
                  })
                }
              </div>
              <div className={styles.itemBox}>
                <div className={styles.item}>
                  456
                </div>
              </div>
              <div className={styles.itemBox}>
                <div className={styles.item}>
                  789
                </div>
              </div>
            </div>
            <Button onClick={this.submit}>提交</Button>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
