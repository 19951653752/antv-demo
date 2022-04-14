import React, { Component } from 'react'

import { Tabs, Form, Input, Button, Checkbox } from 'antd';

import NodeAttr from './components/NodeAttr/index.jsx'
import FormPower from './components/FormPower/index.jsx'

import styles from './index.less';

export default class RightBox extends Component {
  state = {
    name: '',
    describe: ''
  }
  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  inputChange = (value, index) => {
    console.log(this.state)
    console.log(value)
    console.log(index)
  }
  submit = () => {
    console.log(this.state)
  }
  render() {
    const { TabPane } = Tabs;
    return (
      <div className={styles.rightBox}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="节点设置属性" key="1">
            <NodeAttr />
          </TabPane>
          <TabPane tab="节点设置属性" key="2">
            <FormPower />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
