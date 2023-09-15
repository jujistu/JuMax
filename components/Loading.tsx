import { View, Text } from 'react-native';
import React, { FC } from 'react';
import * as Progress from 'react-native-progress';
import { height, width } from './MovieCard';
import { theme } from '../theme/theme';

const Loading: FC = () => {
  return (
    <View
      style={{ height: height, width: width }}
      className='absolute flex-row justify-center items-center'
    >
      <Progress.CircleSnail
        thickness={12}
        size={160}
        color={theme.background}
      />
    </View>
  );
};

export default Loading;
