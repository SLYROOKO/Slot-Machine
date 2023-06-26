import {forwardRef, useState, useImperativeHandle} from 'react';
import ParticlesBg from 'react-native-particles-bg';

const Background = forwardRef((props, ref) => {
  const [freeSpinState, setFreeSpinState] = useState(false);

  useImperativeHandle(ref, () => ({
    setBackground: state => {
      setFreeSpinState(state);
    },
  }));

  return <ParticlesBg type={freeSpinState ? 'lines' : 'cobweb'} bg={true} />;
});

export default Background;
