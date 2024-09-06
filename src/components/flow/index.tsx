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


import { defaultBorderColor } from './data';
import FloatingEdge from './floating-edge-feature/FloatingEdge';
import AnalyticsIcon from './host-icons/analytics';
import CloudIcon from './host-icons/cloud';
import DbIcon from './host-icons/db';
import WindowsIcon from './host-icons/windows';
import { createMultipleNodesAndEdges } from './utils';
import { NodeTypes } from 'reactflow';

const initBgColor = '#1A192B';

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

const CustomNodeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickHost = useCallback((id: string) => {
    setNodes(newNodes => newNodes.map((node: any) => {
      if (!node.data) return node
      if (node.id === id) {
        node.data.forcedColor = ''
      } else {
        node.data.forcedColor = defaultBorderColor
      }
      return { ...node }
    }))

    setEdges(newEdges => {
      const source = newEdges.find((edge: any) => edge.target === id).source
      return newEdges.map((edge: any) => {
        if (edge.target === id) {
          edge.style = { stroke: 'white' }
          edge.animated = true
        } else if (edge.source === source) {
          edge.style = { stroke: defaultBorderColor }
          edge.animated = false
        }
        return { ...edge }
      })
    })
  }, [])


  useEffect(() => {
    const { edges, nodes } = createMultipleNodesAndEdges(2, {
      startNodeId: 1,
      mapData: ({ id }) => ({
        onClick: () => {
          handleClickHost(id)
        }
      }),
    })

    setNodes(nodes)
    setEdges(edges)
  }, []);

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
