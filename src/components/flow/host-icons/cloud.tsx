import { TbCloudComputing } from "react-icons/tb";
import IconWrapper from '../icon-wrapper';
import { IconType } from "./type";

export default function CloudIcon(props: IconType) {
  return (
    <IconWrapper
      Icon={TbCloudComputing}
      color="#ff7fa0"
      // position={"all"}
      handleType="source"
      forcedColor=""
      size={35}
      {...props}
      {...("data" in props ? props.data as object : {})}
    />
  )
}
