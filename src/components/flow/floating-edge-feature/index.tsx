import React, { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import FloatingEdge from './FloatingEdge';
import FloatingConnectionLine from './FloatingConnectionLine';
import { createNodesAndEdges } from './utils';

import './index.css';
import { Handle } from 'reactflow';

const { nodes: initialNodes, edges: initialEdges } = createNodesAndEdges();

const edgeTypes = {
  floating: FloatingEdge,
};

function Component() {
  return <>
    Component
    {/* <Handle type="source" position={Position.Bottom} /> */}
  </>
}

const nodeTypes = {
  Component,
};

const NodeAsHandleFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: 'floating',
            markerEnd: { type: MarkerType.Arrow },
          },
          eds,
        ),
      ),
    [setEdges],
  );

  return (
    <div className="floatingedges">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NodeAsHandleFlow;
