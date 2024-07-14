import { Feather } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { View } from 'tamagui';

export const AnimatedSpinner = (props: { size: number }) => {
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [rotate]);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ rotate: rotation }],
        }}
      >
        <Feather name="loader" size={props.size} />
      </Animated.View>
    </View>
  );
};
