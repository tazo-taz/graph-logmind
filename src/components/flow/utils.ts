export const generateHorizontalTreeCoordinates = (itemsCount: number) => {
  const coords: { x: number, y: number }[] = []

  let startsWithX = 70
  let deltaXBetweenCols = 0
  const deltaXBetweenColsLevel = 0;
  const deltaXBetweenRows = 50

  let startsWithY = 30
  let deltaYBetweenCols = 50
  const deltaYBetweenRows = 10
  const deltaYBetweenColsLevel = 0;
  let inx = 0;

  const handleAddCoords = (x: number, y: number) => {
    if (coords.length < itemsCount) {
      coords.push({ x, y })
    }
  }

  while (coords.length < itemsCount) {
    for (let i = 0; i < inx + 2; i++) {
      if (coords.length >= itemsCount) {
        break
      }
      const x = startsWithX + i * deltaXBetweenCols
      const y = startsWithY + i * deltaYBetweenCols

      handleAddCoords(x, y)
      handleAddCoords(x, -y)
    }
    startsWithX += deltaXBetweenRows
    startsWithY += deltaYBetweenRows

    deltaYBetweenCols += deltaYBetweenColsLevel
    deltaXBetweenCols += deltaXBetweenColsLevel

    inx++
  }

  return coords
}

export const generateCircularCoordinates = (itemsCount: number) => {
  const coords: { x: number, y: number }[] = []
  let i = 0

  const initialAxisCount = 4;
  const deltaAxisCount = 4;

  const initialLength = 25
  const deltaLength = 30

  while (coords.length < itemsCount) {
    const axisCount = initialAxisCount + i * deltaAxisCount
    const initialAngle = Math.PI * 2 * Math.random()

    for (let j = 0; j < axisCount; j++) {
      if (coords.length >= itemsCount) {
        break
      }
      const shouldSpawn = Math.random() > 0.25
      // console.log({ shouldSpawn, angle: toDeg(angle) });

      if (shouldSpawn) {
        const angle = Math.PI * 2 / axisCount * j + initialAngle
        const length = initialLength + deltaLength * (i + 1)

        const x = Math.cos(angle) * length
        const y = Math.sin(angle) * length

        coords.push({ x, y })
      }
    }
    i++
  }

  return coords
}

const toDeg = (rad: number) =>
  rad / Math.PI * 180

type Vector = { x: number, y: number }

type createNodesAndEdgesProps = {
  mapData?: ({ id, position }: { id: string, position: { x: number, y: number } }) => object,
  startNodeId: number,
  margin?: Partial<Vector>
}


export const createNodesAndEdges = ({ mapData, startNodeId, margin }: createNodesAndEdgesProps) => {
  let nodeId = startNodeId
  const marginX = margin?.x || 0
  const marginY = margin?.y || 0

  const newNodes: any[] = [{
    id: `${startNodeId}`,
    type: 'cloud',
    position: {
      x: marginX,
      y: marginY
    },
  },]
  const newEdges: any[] = []
  const icons = ['windows', 'db', 'analytics']

  const coords = generateCircularCoordinates(5)

  for (let i = 0; i < coords.length; i++) {
    const id = (++nodeId).toString()
    const height = coords[i].y
    const width = coords[i].x


    const node = {
      id,
      type: icons[Math.floor(Math.random() * icons.length)],
      position: {
        x: width + marginX,
        y: height + marginY
      },
      data: {}
    }
    node.data = {
      ...(mapData && mapData({ ...node }))
    }
    newNodes.push(node)

    newEdges.push({
      id: `edge-${nodeId}`,
      source: startNodeId.toString(),
      target: id,
      sourceHandle: "right",
      type: 'floating',
      // animated: true,
    })
  }

  return { nodes: newNodes, edges: newEdges, endNodeId: nodeId }
}

type getNodeLogic = (node: { position: Vector }, max: Vector) => Vector

export const getRightestNodeLogic: getNodeLogic = (node, rightest) => {
  if (node.position.x > rightest.x) {
    rightest = node.position
  }

  return rightest
}

export const getLeftestNodeLogic: getNodeLogic = (node, leftest) => {
  if (node.position.x < leftest.x) {
    leftest = node.position
  }

  return leftest
}

const getMapperNode = (nodes: any[], mapper: getNodeLogic[]) => {
  const mapperNodes: Vector[] = mapper.map(() => ({ x: 0, y: 0 }))

  nodes.forEach(node => {
    mapper.forEach((logic, inx) => {
      mapperNodes[inx] = logic(node, mapperNodes[inx])
    })
  })

  return mapperNodes
}

export const getLeftestAndRightestNode = (nodes: any[]) => {
  return getMapperNode(nodes, [getLeftestNodeLogic, getRightestNodeLogic])
}

export const applyMarginToNodes = (nodes: any[], margin: { x: number, y: number }) => {
  return nodes.map(node => {
    node.position.x += margin.x
    node.position.y += margin.y

    return node
  })
}

export const createMultipleNodesAndEdges = (count: number, mapNode: createNodesAndEdgesProps) => {
  const allNodes: any[] = []
  const allEdges: any[] = []
  let startNodeId = 1
  let rightestNode = { x: 0, y: 0 }
  let leftestNode = { x: 0, y: 0 }

  for (let i = 0; i < count; i++) {
    const { edges, nodes, endNodeId } = createNodesAndEdges({
      ...mapNode,
      startNodeId
    });

    leftestNode = getMapperNode(nodes, [getLeftestNodeLogic])[0]

    applyMarginToNodes(nodes, {
      x: rightestNode.x + (i && 100) - leftestNode.x,
      y: 0
    })

    startNodeId = endNodeId + 1
    if (i !== count - 1) {
      rightestNode = getMapperNode(nodes, [getRightestNodeLogic])[0]
    }

    allNodes.push(...nodes)
    allEdges.push(...edges)
  }

  return {
    nodes: allNodes,
    edges: allEdges
  }
}