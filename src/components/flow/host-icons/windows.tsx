import { FaWindows } from "react-icons/fa";
import IconWrapper from '../icon-wrapper';
import { IconType } from "./type";

export default function WindowsIcon(props: IconType) {
  return (
    <IconWrapper
      Icon={FaWindows}
      color="rgb(58, 131, 160)"
      // position={Position.Left}
      handleType="target"
      {...props}
      {...("data" in props ? props.data as object : {})}
    />
  )
}
