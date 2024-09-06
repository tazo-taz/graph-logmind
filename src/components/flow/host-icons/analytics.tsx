import { SiGoogleanalytics } from "react-icons/si";
import IconWrapper from '../icon-wrapper';
import { IconType } from "./type";

export default function AnalyticsIcon(props: IconType) {
  return (
    <IconWrapper
      Icon={SiGoogleanalytics}
      color="rgb(198, 126, 74)"
      // position={Position.Left}
      handleType="target"
      {...props}
      {...("data" in props ? props.data as object : {})}
    />
  )
}
