import React, { Component } from 'react'

import { Select, Radio, Button } from 'antd';

import styles from './index.less';


export default class FormPower extends Component {
  state = {
    allPow: {
      edit: false,
      view: true,
      hide: false
    },
    powList: [
      {
        id: 1,
        title: '单行文本',
        check: {
          edit: false,
          view: true,
          hide: false
        }
      },
      {
        id: 2,
        title: '多行文本',
        check: {
          edit: false,
          view: true,
          hide: false
        }
      },
      {
        id: 3,
        title: '单选框',
        check: {
          edit: false,
          view: true,
          hide: false
        }
      }
    ]
  }
  allCheckChange = (type) => {
    return (e) => {
      const { allPow, powList } = this.state
      Object.keys(allPow).forEach(key => {
        allPow[key] = false
      })
      const obj = {
        ...allPow,
        [type]: true
      }
      this.setState({ allPow: obj })
      powList.forEach(item => {
        Object.keys(item.check).forEach(key => {
          item.check[key] = false
        })
        item.check[type] = true
        powList.splice(item.id - 1, 1, item)
        this.setState({ powList })
      })
    }
  }
  checkChange = (type, id) => {
    return (e) => {
      const { powList } = this.state
      powList.forEach(item => {
        if (item.id === id) {
          Object.keys(item.check).forEach(key => {
            item.check[key] = false
          })
          item.check[type] = true
          powList.splice(id - 1, 1, item)
          this.setState({ powList })
        }
      })
    }
  }
  submit = () => {
    console.log(this.state)
  }
  render() {
    const { Option } = Select;
    return (
      <div className={styles.formPower}>
        <div className={styles.tip}>
          <p>
            审核方式选择【或签】，则代表当前审核组内一人审核通过则通过；反之【会签】则代表全部通过才通过
          </p>
        </div>
        <div className={styles.selectBox}>
          <span>当前审核组</span>
          <span style={{ marginLeft: '10px' }}>
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            {/* <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select> */}
          </span>
        </div>
        <div className={styles.table}>
          <table border="1">
            <tr>
              <th>名称</th>
              <td>编辑</td>
              <td>只读</td>
              <td>隐藏</td>
            </tr>
            <tr>
              <th>全局设置</th>
              <td><Radio onChange={this.allCheckChange('edit')} checked={this.state.allPow.edit} /></td>
              <td><Radio onChange={this.allCheckChange('view')} checked={this.state.allPow.view} /></td>
              <td><Radio onChange={this.allCheckChange('hide')} checked={this.state.allPow.hide} /></td>
            </tr>
            {
              this.state.powList.map(item => {
                return <tr>
                  <th>{item.title}</th>
                  <td><Radio onChange={this.checkChange('edit', item.id)} checked={item.check.edit} /></td>
                  <td><Radio onChange={this.checkChange('view', item.id)} checked={item.check.view} /></td>
                  <td><Radio onChange={this.checkChange('hide', item.id)} checked={item.check.hide} /></td>
                </tr>
              })
            }
          </table>
        </div>
        <Button onClick={this.submit}>submit</Button>
      </div>
    )
  }
}
