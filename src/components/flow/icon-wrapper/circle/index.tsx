import { Handle, HandleType, NodeProps, Position } from '@xyflow/react';
import { memo } from 'react';
import { IconType } from 'react-icons';
import { defaultBorderColor } from '../../data';

type SectagonProps = {
  Icon: IconType,
  color: string,
  handleType: HandleType,
  onClick?: () => void,
  forcedColor?: string,
  size?: number
} & NodeProps

function Circle({ Icon, color, handleType, onClick, forcedColor = defaultBorderColor, size = 30 }: SectagonProps) {

  const renderHandle = () => {
    return (
      <>
        <Handle
          type={handleType}
          position={Position.Top}
          style={{
            opacity: 0,
            pointerEvents: "none",
          }}
          isConnectable={true}
          id='top'
        />
        <Handle
          type={handleType}
          position={Position.Bottom}
          style={{
            opacity: 0,
            pointerEvents: "none",
          }}
          isConnectable={true}
          id='bottom'
        />
        <Handle
          type={handleType}
          position={Position.Left}
          style={{
            opacity: 0,
            pointerEvents: "none",
          }}
          isConnectable={true}
          id='left'
        />
        <Handle
          type={handleType}
          position={Position.Right}
          style={{
            opacity: 0,
            pointerEvents: "none",
          }}
          isConnectable={true}
          id='right'
        />
      </>
    )
  }

  return (
    <>
      <div
        onClick={onClick}
        style={{
          // clipPath: `polygon(50% 0%,100% ${sectagonDegree}%, 100% ${100 - sectagonDegree}%, 50% 100%, 0 ${100 - sectagonDegree}%, 0 ${sectagonDegree}%, 50% 0`,
          backgroundColor: "#4d4d4d",
          width: size,
          height: size,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: `1px solid ${forcedColor || color}`
        }}
      >
        <Icon
          size={size * .45}
          color='white'
        />
      </div>
      {renderHandle()}
    </>
  );
}

export default memo(Circle);
