import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HomeIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.067.875a1.75 1.75 0 00-2.134 0l-5.11 3.93A2.75 2.75 0 00.75 6.985V13a2.75 2.75 0 002.75 2.75h1.613A1.75 1.75 0 006.863 14v-1a.25.25 0 01.25-.25h1.801a.25.25 0 01.25.25v1c0 .967.784 1.75 1.75 1.75H12.5A2.75 2.75 0 0015.25 13V6.985a2.75 2.75 0 00-1.073-2.18L9.067.875z"
        fill="#FF6E50"
      />
    </Svg>
  );
}

export default HomeIcon;
