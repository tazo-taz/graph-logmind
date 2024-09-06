import { GoDatabase } from "react-icons/go";
import IconWrapper from '../icon-wrapper';
import { IconType } from "./type";

export default function DbIcon(props: IconType) {
  return (
    <IconWrapper
      Icon={GoDatabase}
      color="#3aa070"
      // position={Position.Left}
      handleType="target"
      {...props}
      {...("data" in props ? props.data as object : {})}
    />
  )
}
