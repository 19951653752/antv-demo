/* 注册自定义边 */

export default G6 => {
  G6.registerEdge('k-edge', {
    draw (cfg, group) {
      const xOffset = 10;
      const { startPoint, endPoint } = cfg;
      const Xdiff = endPoint.x - startPoint.x;
      const QPoint = {
        x: startPoint.x + xOffset,
        y: endPoint.y,
      };
      const path = Xdiff === 0 ? [
        ['M', startPoint.x, startPoint.y],
        ['L', endPoint.x, endPoint.y]
      ] : [
        ['M', startPoint.x, startPoint.y],
        ['L', startPoint.x, startPoint.y + 80],
        ['L', endPoint.x, startPoint.y + 80],
        ['L', endPoint.x, endPoint.y]
      ]

      const shape = group.addShape('path', {
        attrs: {
          path,
          stroke: '#909AA4',
          ...cfg
        },
        name: 'right-tree-edge'
      })

      return shape
    }
  });
};
