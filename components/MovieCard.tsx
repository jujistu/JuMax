//for the carousel

import { TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import React, { FC } from 'react';
import { MovieCardProps } from './types';
import { image500w } from '../api/MovieDb';

export const { height, width } = Dimensions.get('window');

const MovieCard: FC<MovieCardProps> = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <Image
        source={{ uri: image500w(item.poster_path)! }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
