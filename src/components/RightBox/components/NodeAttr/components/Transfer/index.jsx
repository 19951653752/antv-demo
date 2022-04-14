import React, { Component } from 'react'

import { Tabs, Form, Input, Button, Checkbox, Radio  } from 'antd';

import styles from './index.less';

export default class Transfer extends Component {
  render() {
    console.log(this.props)
    const { visible } = this.props
    return (
      <div style={{ display: visible ? 'block' : 'none' }} className={styles.customTransfer}>
        <div className={styles.header}>
          <div className={styles.title}>添加成员</div>
        </div>
        ============
        <Button type="primary" onClick={this.props.closeTransfer}>关闭</Button>
        ============
      </div>
    )
  }
}
