import { FetchedHostData } from "./types";

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
  const deltaLength = 40

  while (coords.length < itemsCount) {
    const axisCount = initialAxisCount + i * deltaAxisCount
    const initialAngle = Math.PI * 2 * Math.random()

    for (let j = 0; j < axisCount; j++) {
      if (coords.length >= itemsCount) {
        break
      }
      const shouldSpawn = Math.random() > 0.25

      if (shouldSpawn) {
        const angle = (Math.PI * 2 / axisCount * j + initialAngle) % (Math.PI * 2)
        const length = initialLength + deltaLength * (i + 1)

        const x = Math.cos(angle) * length
        const y = Math.sin(angle) * length

        const distance = Math.hypot(x, y)
        if (!(angle > 0 && angle < Math.PI && distance > 0 && distance < 60) && ![0, Math.PI / 2, Math.PI, 3 / 4 * Math.PI].includes(angle)) {
          coords.push({ x, y })
        }
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
}

class SourcesWithHosts extends Map<string, { index: number, data: (FetchedHostData)[] }> {
  getHostsBySource(source: string) {
    return this.get(source)
  }

  beenBefore(host: string, index: number) {
    const beforeSources = [...this.values()]
      .filter(({ index: i }) => i < index)

    for (const { data } of beforeSources) {
      if (data.some(({ host: h }) => h === host)) {
        return true
      }
    }

    return false
  }

}

export const createNodesAndEdges = (data: SourcesWithHosts, key: string, { mapData }: createNodesAndEdgesProps) => {
  const value = data.get(key)
  if (!value) {
    return { nodes: [], edges: [] }
  }
  const newNodes: any[] = [{
    id: key,
    type: 'cloud',
    position: {
      x: 0,
      y: 0
    },
    data: {
      title: key,
    }
  },]
  const newEdges: any[] = []
  const icons = ['windows', 'db', 'analytics']

  const coords = generateCircularCoordinates(value.data.length)

  for (const i in value.data) {
    const item = value.data[i]
    const height = coords[i].y
    const width = coords[i].x

    if (!data.beenBefore(item.host, value.index)) {
      const node = {
        id: item.host,
        type: icons[Math.floor(Math.random() * icons.length)],
        position: {
          x: width,
          y: height
        },
        data: {}
      }
      node.data = {
        title: item.host,
        ...(mapData && mapData({ ...node }))
      }
      newNodes.push(node)
    }

    newEdges.push({
      id: `edge-${item.host}-${key}`,
      target: item.host,
      source: key,
      sourceHandle: "right",
      type: 'floating',
      // animated: true,
    })

  }
  return { nodes: newNodes, edges: newEdges }
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

const groupByHostsBySource = (data: FetchedHostData[]) => {
  const sourcesWithHosts = new SourcesWithHosts()

  for (let i = 0; i < data.length; i++) {
    for (let k = 0; k < data[i].index.length; k++) {
      const source = sourcesWithHosts.get(data[i].index[k])

      if (!source) {
        sourcesWithHosts.set(data[i].index[k], { data: [data[i]], index: i })
      } else {
        source.data.push(data[i])
      }
    }
  }

  return sourcesWithHosts
}

export const createMultipleNodesAndEdgesFromData = (data: FetchedHostData[], mapNode: createNodesAndEdgesProps) => {
  const sourcesWithHosts = groupByHostsBySource(data)
  return createMultipleNodesAndEdges(sourcesWithHosts, mapNode)
}

export const createMultipleNodesAndEdges = (data: SourcesWithHosts, mapNode: createNodesAndEdgesProps) => {
  const allNodes: any[] = []
  const allEdges: any[] = []
  let rightestNode = { x: 0, y: 0 }
  let leftestNode = { x: 0, y: 0 }

  const itemsCount = data.size
  let i = 0;
  for (const [key] of data) {
    const { edges, nodes } = createNodesAndEdges(data, key, {
      ...mapNode,
    });

    leftestNode = getMapperNode(nodes, [getLeftestNodeLogic])[0]

    applyMarginToNodes(nodes, {
      x: rightestNode.x + (i && 100) - leftestNode.x,
      y: 0
    })

    if (i !== itemsCount - 1) {
      rightestNode = getMapperNode(nodes, [getRightestNodeLogic])[0]
    }

    allNodes.push(...nodes)
    allEdges.push(...edges)

    i++
  }

  return {
    nodes: allNodes,
    edges: allEdges
  }
}