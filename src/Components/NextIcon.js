import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={36}
      height={36}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M16.255 18.541l-.002-.531c0-2.208.129-4.22.323-5.532l.171-.816c.095-.432.22-.924.35-1.175A2.722 2.722 0 0119.5 9h.086c.65.021 2.015.592 2.015.611 2.196.922 6.432 3.703 8.389 5.685l.569.595c.149.162.316.353.42.501.346.46.52 1.028.52 1.596 0 .635-.195 1.225-.563 1.707l-.584.63-.131.135c-1.775 1.925-6.411 5.073-8.836 6.036l-.366.14c-.441.158-1.058.347-1.433.364a3 3 0 01-1.364-.329 2.828 2.828 0 01-1.213-1.356c-.152-.394-.39-1.575-.39-1.596-.22-1.192-.347-3.071-.365-5.178zM4.5 18a2.266 2.266 0 012.255-2.276l5.549.49c.977 0 1.769.8 1.769 1.786 0 .988-.792 1.787-1.77 1.787l-5.548.49A2.266 2.266 0 014.5 18z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;