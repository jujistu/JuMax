import { View, Text } from 'react-native';
import React, { FC } from 'react';
import Carousel from 'react-native-snap-carousel';
import { TrendingMovie } from './types';
import MovieCard, { width } from './MovieCard';
import { useNavigation } from '@react-navigation/native';
import { Prop as MovieProps } from '../screens/MovieScreen';

const TrendingMovies: FC<TrendingMovie> = ({ data }) => {
  const navigation = useNavigation<MovieProps['navigation']>();

  return (
    <View className='mt-8'>
      <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
      <Carousel
        renderItem={({ item }: any) => (
          <MovieCard
            item={item}
            handleClick={() => navigation.navigate('Movie', item)}
          />
        )}
        data={data}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
};

export default TrendingMovies;
