import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect opacity={0.1} width={24} height={24} rx={12} fill="#FF3B3B" />
      <Path
        d="M8 8l4 4m0 0l4 4m-4-4l4-4m-4 4l-4 4"
        stroke="#FF3B3B"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
