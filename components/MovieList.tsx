import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { FC } from 'react';
import { MovieListProps } from './types';
import { styles } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { height, width } from './MovieCard';
import { Prop as MovieProps } from '../screens/MovieScreen';
import { fallbackMoviePoster, image185w } from '../api/MovieDb';

const MovieList: FC<MovieListProps> = ({ data, title, hideSeeAll }) => {
  let movieName = 'Ant-Man and the Wasp: Quantumania';

  const navigation = useNavigation<MovieProps['navigation']>();

  return (
    <View className='mt-8 space-y-4'>
      <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-2xl'>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className='text-lg'>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.push('Movie', item);
            }}
          >
            <View className='mr-4 space-y-1'>
              <Image
                source={{
                  uri: image185w(item?.poster_path) || fallbackMoviePoster,
                }}
                className='rounded-3xl'
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className='text-neutral-300 ml-1'>
                {item?.title && item?.title.length > 14 //reduce the name length
                  ? item?.title.slice(0, 14) + '...'
                  : item?.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
