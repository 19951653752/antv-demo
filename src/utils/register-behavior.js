export default (G6) => {
  G6.registerBehavior('node-hover', {
    getEvents() {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
      }
    },
    onNodeEnter(e) {
      console.log(e)
      const itemId = e.item.get('id')
      const itemNode = this.graph.findById(itemId)
      const itemGroup = itemNode.get('group')
      const itemModel = e.item.get('model')
      const nodeName = e.target.cfg.name
      const { nodeType, style: { width, height } } = itemModel
      const nodeNameArr = ['custom-node', 'check-title-bgc']

      if (nodeNameArr.includes(nodeName)) {
        if (nodeType === 'check') {
          itemGroup.addShape('text', {
            attrs: {
              fontFamily: 'iconfont',
              text: '\ue6f3',
              fill: '#fff',
              fontSize: 14,
              cursor: 'pointer',
              x: width / 2 - 24,
              y: -height / 2 + 22,
            },
            name: 'check-title-del',
          })
        } else if (nodeType === 'condition') {
          itemGroup.addShape('text', {
            attrs: {
              fontFamily: 'iconfont',
              text: '\ue6f3',
              fill: 'orange',
              fontSize: 14,
              cursor: 'pointer',
              x: width / 2 - 24,
              y: -height / 2 + 22,
            },
            name: 'condition-title-del',
          })
        }
        e.item.setState('nodeState:hover', true)
      }
    },
    onNodeLeave(e) {
      const itemId = e.item.get('id')
      const itemNode = this.graph.findById(itemId)
      const itemGroup = itemNode.get('group')

      const arr = itemGroup.cfg.children
      const nameArr = ['check-title-del', 'condition-title-del']
      for (const i in arr) {
        if (nameArr.includes(arr[i].cfg.name)) {
          arr.splice(i, 1)
        }
      }
      e.item.setState('nodeState:hover', false)
    }
  })
}
