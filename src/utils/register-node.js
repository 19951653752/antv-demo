// 注册自定义节点

import nodeEvents from './node-events';

const registerNode = (G6) => {
  /*
  * 注册基础node => 添加锚点/图标/文本 => 绘制node =>  设置node状态 => 设置交互动画
  */
  G6.registerNode(
    'k-rect', // 自定义的节点名称
    {
      // 添加文本节点
      drawText (cfg, group) {
        group.addShape('text', {
          attrs: {
            text:         cfg.label,
            fill:         '#000',
            fontSize:     14,
            textAlign:    'center',
            textBaseline: 'middle',
            ...cfg.labelCfg.style,
          },
          className: 'node-text',
          draggable: true,
        });
      },

      // 开始节点样式
      startImg(cfg, group) {
        console.log(cfg)
        const { id } = cfg
        if (+id === 0) {
          group.addShape('image', {
            attrs: {
              x: -58,
              y: -15,
              width: 30,
              height: 30,
              img: require('../imgs/start.png')
            },
            name: 'first-node-style'
          })
        }
      },

      // 节点后面添加 +
      addNode(cfg, group) {
        const { id } = cfg
        if (+id !== -1) {
          group.addShape('circle', {
            attrs: {
              r: 9,
              fill: '#1890ff',
              stroke: '#1890ff',
              // x: 200 / 2 + 15
              y: 80
            },
            name: 'add-node-shape'
          })
    
          group.addShape('text', {
            attrs: {
              text: '+',
              fontSize: 20,
              fill: '#fff',
              cursor: 'pointer',
              x: -7,
              y: 91
            },
            name: 'add-node-text'
          })
        }
      },

      // 静态展示（添加条件）
      addCondition(cfg, group) {
        const { id } = cfg
        if (+id === 0) {
          group.addShape('rect', {
            attrs: {
              width: 80,
              height: 30,
              radius: 15,
              fill: '#fff',
              stroke: '#fff',
              shadowColor: '#eee',
              shadowBlur:    20,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              x: -40,
              y: 115
            },
            name: 'node-icon'
          })
    
          group.addShape('text', {
            attrs: {
              text: '添加条件',
              fontSize: 14,
              fill: '#1890ff',
              cursor: 'pointer',
              x: -27,
              y: 138
            },
            name: 'node-icon-text'
          })
        }
      },

      /*
        绘制节点, 包含文本, 锚点等
      */
      draw (cfg, group) {
        const attrs = cfg;
        const shape = group.addShape(
          'rect', // 继承内置节点的 shape, 可选 rect, circle, ellipse, path 等
          {
            // 所有的样式配置
            attrs: {
              ...attrs,
              fill: '#fff',
              stroke: '#fff',
              shadowColor: '#eee',
              shadowBlur:    20,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              ...attrs.style,
              x:    -attrs.style.width / 2,
              y:    -attrs.style.height / 2,
            },
            className: 'custom-shape', // 添加自定义属性, 方便以后对节点进行查找更新等
            draggable: true, // 允许自定义图形使用拖拽事件
          },
        );

        // 3.
        // this 是当前节点的实例, 并不是 Vue 实例
        // 字体
        this.drawText(cfg, group);

        // 开始节点样式
        this.startImg(cfg, group)

        // 添加节点样式
        this.addNode(cfg, group)

        // 添加条件文本展示
        this.addCondition(cfg, group)

        // group.addShape('text', {
        //   attrs: {
        //     fontSize: 16,
        //     fill: '#000',
        //     text: cfg.name,
        //   },
        //   name: 'node-label'
        // })

        // 4.
        return shape;
      },
      /* 绘制后附加操作 */
      afterDraw (cfg, group) { },
      /* 用于更新节点的配置 */
      update (cfg, node) { },
      /* 用于更新节点后的附加操作 */
      afterUpdate (cfg, node) { },
      /*
        设置节点状态, 主要是交互状态, 如 hover, active 等.
      */
      setState (name, value, item) {
        const group = item.getContainer();

        nodeEvents[name].call(this, name, value, group);
      },
      /* 获取当前节点的锚点 */
      getAnchorPoints (cfg) {
        return cfg.anchorPoints || [
          [0.5, 0],
          // [1, 0.5],
          [0.5, 1],
          // [0, 0.5],
        ];
      },
    },
    // 'extendNodeName',
  );
};

export default registerNode;
