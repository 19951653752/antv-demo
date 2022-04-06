import React, { Component } from 'react'

import styles from './index.less';

export default class RightBox extends Component {
  render() {
    return (
      <div className={styles.rightBox}>
        <div className={styles.header}>
          <h2>条件分支设置</h2>
        </div>
        <div className={styles.search}>
          名称：搜索框
        </div>
        <div className={styles.content}>
          content
        </div>
        <div className={styles.button}></div>
      </div>
    )
  }
}
