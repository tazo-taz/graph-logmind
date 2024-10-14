import {
  Background,
  Controls,
  EdgeTypes,
  ReactFlow,
  useEdgesState,
  useNodesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useRef } from 'react';


import { NodeTypes } from 'reactflow';
import { defaultBorderColor } from './data';
import FloatingEdge from './floating-edge-feature/FloatingEdge';
import AnalyticsIcon from './host-icons/analytics';
import CloudIcon from './host-icons/cloud';
import DbIcon from './host-icons/db';
import WindowsIcon from './host-icons/windows';
import { FetchedHostData } from './types';
import { createMultipleNodesAndEdgesFromData } from './utils';

const initBgColor = 'white';

const nodeTypes = {
  cloud: CloudIcon,
  db: DbIcon,
  windows: WindowsIcon,
  analytics: AnalyticsIcon,
} as unknown as NodeTypes;

const edgeTypes = {
  floating: FloatingEdge,
} as unknown as EdgeTypes;

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

type CustomNodeFlowProps = {
  data: FetchedHostData[]
}

const CustomNodeFlow = ({ data }: CustomNodeFlowProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickHost = useCallback((id: string) => {
    setNodes(newNodes => newNodes.map((node: any) => {
      if (node.type === "cloud") return node
      if (node.id === id) {
        node.data.forcedColor = ''
      } else {
        node.data.forcedColor = defaultBorderColor
      }
      return { ...node }
    }))

    setEdges(newEdges => {
      const sources = newEdges.filter((edge: any) => edge.target === id)
      return newEdges.map((edge: any) => {
        if (edge.target === id) {
          edge.style = { stroke: 'white' }
          edge.animated = true
        } else if (sources.find((source) => source.source === edge.source)) {
          edge.style = { stroke: defaultBorderColor }
          edge.animated = false
        }
        return { ...edge }
      })
    })
  }, [setEdges, setNodes])


  useEffect(() => {
    const { edges, nodes } = createMultipleNodesAndEdgesFromData(data, {
      mapData: ({ id }) => ({
        onClick: () => {
          handleClickHost(id)
        }
      }),
    })

    setNodes(nodes)
    setEdges(edges)
  }, [data, handleClickHost, setEdges, setNodes]);

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges],
  // );

  return (
    <ReactFlow
      ref={ref}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      style={{ background: initBgColor }}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
