import { Handle, HandleType, Position } from '@xyflow/react';
import { memo } from 'react';
import { IconType } from 'react-icons';

const sectagonDegree = 25
const size = 30

type SectagonProps = {
    Icon: IconType,
    color: string,
    position: Position | "all",
    handleType: HandleType
}

function Sectagon({ Icon, color, position, handleType }: SectagonProps) {

    const renderHandle = () => {
        if (position !== "all") return (
            <Handle
                type={handleType}
                position={position}
                style={{
                    opacity: 0,
                    pointerEvents: "none",
                }}
                isConnectable={true}
            />
        )

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
                style={{
                    clipPath: `polygon(50% 0%,100% ${sectagonDegree}%, 100% ${100 - sectagonDegree}%, 50% 100%, 0 ${100 - sectagonDegree}%, 0 ${sectagonDegree}%, 50% 0`,
                    backgroundColor: color,
                    width: size * .84,
                    height: size,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: size * .1,
                    paddingBottom: size * .1,
                    paddingLeft: size * .1 * 0.84,
                    paddingRight: size * .1 * 0.84
                }}
            >
                <div
                    style={{
                        clipPath: `polygon(50% 0%,100% ${sectagonDegree}%, 100% ${100 - sectagonDegree}%, 50% 100%, 0 ${100 - sectagonDegree}%, 0 ${sectagonDegree}%, 50% 0`,
                        backgroundColor: "#1A192B",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Icon
                        size={size * .45}
                        color='#9eafbf'
                    />
                </div>
            </div>
            {renderHandle()}
        </>
    );
}

export default memo(Sectagon);
