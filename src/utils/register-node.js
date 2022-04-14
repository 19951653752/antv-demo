// 注册自定义节点

import nodeEvents from './node-events'

const registerNode = (G6) => {
  /*
  * 注册基础node => 添加锚点/图标/文本 => 绘制node =>  设置node状态 => 设置交互动画
  */
  G6.registerNode(
    'k-rect', // 自定义的节点名称
    {
      // 添加文本节点
      drawText(cfg, group) {
        group.addShape('text', {
          attrs: {
            // text: cfg.label,
            fill: '#000',
            fontSize: 14,
            textAlign: 'center',
            textBaseline: 'middle',
            ...cfg.labelCfg.style,
          },
          className: 'node-text'
        })
      },

      // 开始节点样式
      beginNode(cfg, group) {
        const { id, style: { width, height } } = cfg
        if (+id === 0) {
          group.addShape('image', {
            attrs: {
              x: -width / 2 + 5,
              y: -height / 2 + 11,
              width: 20,
              height: 20,
              img: require('../imgs/start.png')
            },
            name: 'first-node-style'
          })
          group.addShape('text', {
            attrs: {
              text: cfg.label,
              fill: '#1890ff',
              fontSize: 16,
              x: -width / 2 + 24,
              y: height / 2 - 10,
            },
            name: 'check-label-text'
          })
        }
      },

      // 结束节点样式
      endNode(cfg, group) {
        const { id, style: { width, height } } = cfg
        if (+id === -1) {
          const icon = group.addShape('text', {
            attrs: {
              fontFamily: 'iconfont',
              text:       '\ue6a4',
              fill:       '#000',
              fontSize:   16,
              x:          -width / 2 + 5,
              y:          -height / 2 + 28,
            },
            name: 'end-node-icon'
          })
          group.addShape('text', {
            attrs: {
              text: cfg.label,
              fill: '#000',
              fontSize: 16,
              x: -width / 2 + 24,
              y: height / 2 - 10,
            },
            name: 'end-node-label'
          })
          setTimeout(() => {
            icon.attr({ })
          })
        }
      },

      // 节点后面添加 +
      addNodeIcon(cfg, group) {
        const { id, nodeType } = cfg
        if (+id !== -1) {
          group.addShape('circle', {
            attrs: {
              r: 9,
              fill: '#1890ff',
              stroke: '#1890ff',
              // x: 200 / 2 + 15
              y: 70
            },
            name: 'add-node-shape'
          })

          const icon = group.addShape('text', {
            attrs: {
              fontFamily: 'iconfont',
              text: '\ue65b',
              fontSize: 14,
              fill: '#fff',
              cursor: 'pointer',
              x: -7,
              y: 77
            },
            name: 'add-node-text'
          })
          setTimeout(() => {
            icon.attr({ })
          })
        }
      },

      // 静态展示（添加条件）
      addCondition(cfg, group) {
        const { id } = cfg
        console.log(id)
        console.log(group)
        console.log(this)
        group.addShape('rect', {
          attrs: {
            width: 80,
            height: 30,
            radius: 15,
            fill: '#fff',
            stroke: '#fff',
            shadowColor: '#eee',
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            x: -40,
            y: 85
          },
          name: 'add-check-shape'
        })

        group.addShape('text', {
          attrs: {
            text: '添加条件',
            fontSize: 14,
            fill: '#1890ff',
            cursor: 'pointer',
            x: -27,
            y: 108
          },
          name: 'add-check-text'
        })
      },
      // 审核节点样式
      checkNodeType(cfg, group) {
        const { style: { width, height } } = cfg
        group.addShape('rect', {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            width: width,
            height: height / 2 - 5,
            fill: '#2D7BFF',
          },
          name: 'check-title-bgc',
        })
        const icon = group.addShape('text', {
          attrs: {
            fontFamily: 'iconfont',
            text:       '\ue627',
            fill:       '#fff',
            fontSize:   14,
            x:          -width / 2 + 10,
            y:          -height / 2 + 22,
          },
          name: 'check-title-icon',
        })
        setTimeout(() => {
          icon.attr({ })
        })
        // group.addShape('text', {
        //   attrs: {
        //     fontFamily: 'iconfont',
        //     text:       '\ue6f3',
        //     fill:       '#fff',
        //     fontSize:   14,
        //     cursor: 'pointer',
        //     x:          width / 2 - 24,
        //     y:          -height / 2 + 22,
        //   },
        //   name: 'check-title-del',
        // })
        group.addShape('text', {
          attrs: {
            text: cfg.title,
            fill: '#fff',
            fontSize: 14,
            x: -width / 2 + 30,
            y: -height / 2 + 24,
          },
          name: 'check-title-text'
        })
        group.addShape('text', {
          attrs: {
            text: cfg.label,
            fill: '#000',
            fontSize: 16,
            x: -width / 2 + 20,
            y: height / 2 - 8,
          },
          name: 'check-label-text'
        })
      },
      // 条件节点样式
      conditionNodeType(cfg, group) {
        const { style: { width, height } } = cfg
        // group.addShape('text', {
        //   attrs: {
        //     fontFamily: 'iconfont',
        //     text:       '\ue6f3',
        //     fill:       'orange',
        //     fontSize:   14,
        //     cursor: 'pointer',
        //     x:          width / 2 - 24,
        //     y:          -height / 2 + 22,
        //   },
        //   name: 'check-title-del',
        // })
        group.addShape('text', {
          attrs: {
            text: cfg.title,
            fill: 'orange',
            fontSize: 14,
            x: -width / 2 + 20,
            y: -height / 2 + 24,
          },
          name: 'check-title-text'
        })
        group.addShape('text', {
          attrs: {
            text: cfg.label,
            fill: '#000',
            fontSize: 16,
            x: -width / 2 + 20,
            y: height / 2 - 8,
          },
          name: 'check-label-text'
        })
      },
      /*
        绘制节点, 包含文本, 锚点等
      */
      draw(cfg, group) {
        // console.log(cfg)
        // console.log(group)
        const attrs = cfg
        const shape = group.addShape(
          'rect', // 继承内置节点的 shape, 可选 rect, circle, ellipse, path 等
          {
            // 所有的样式配置
            attrs: {
              ...attrs,
              fill: '#fff',
              stroke: '#fff',
              shadowColor: '#eee',
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              ...attrs.style,
              x: -attrs.style.width / 2,
              y: -attrs.style.height / 2,
            },
            name: 'custom-node'
          },
        )

        // 3.
        // this 是当前节点的实例, 并不是 Vue 实例
        // 字体
        this.drawText(cfg, group)

        // 开始节点样式
        this.beginNode(cfg, group)

        // 结束节点样式
        this.endNode(cfg, group)

        // 审核节点样式
        if (cfg.nodeType === 'check') {
          this.checkNodeType(cfg, group)
        }

        // 条件节点样式
        if (cfg.nodeType === 'condition') {
          this.conditionNodeType(cfg, group)
        }

        // 添加节点样式
        this.addNodeIcon(cfg, group)

        // 添加条件文本展示
        if (cfg.addNode) {
          this.addCondition(cfg, group)
        }


        // group.addShape('text', {
        //   attrs: {
        //     fontSize: 16,
        //     fill: '#000',
        //     text: cfg.name,
        //   },
        //   name: 'node-label'
        // })

        // 4.
        return shape
      },
      /* 绘制后附加操作 */
      afterDraw(cfg, group) { },
      /* 用于更新节点的配置 */
      update(cfg, node) {
        // console.log(cfg)
        // console.log(node)
        // 添加条件文本展示
        if (cfg.addNode) {
          this.addCondition(cfg, node._cfg.group)
        }
      },
      /* 用于更新节点后的附加操作 */
      afterUpdate(cfg, node) { },
      /*
        设置节点状态, 主要是交互状态, 如 hover, active 等.
      */
      setState(name, value, item) {
        const group = item.getContainer()

        nodeEvents[name].call(this, name, value, group)
      },
      /* 获取当前节点的锚点 */
      getAnchorPoints(cfg) {
        return cfg.anchorPoints || [
          [0.5, 0],
          // [1, 0.5],
          [0.5, 1],
          // [0, 0.5],
        ]
      },
    },
    // 'extendNodeName',
  )
}

export default registerNode
