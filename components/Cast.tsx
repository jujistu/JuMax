import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { FC } from 'react';
import { CastProps } from './types';
import { fallbackPersonImage, image185w } from '../api/MovieDb';

const Cast: FC<CastProps> = ({ cast, navigation }) => {
  let personName = 'Keanu reevs';
  let characterName = 'John Wick';

  return (
    <View className='my-6'>
      <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {cast &&
          cast.map((person: any, index: number) => (
            <TouchableOpacity
              key={index}
              className='mr-4 items-center'
              onPress={() => navigation.navigate('Person', { item: person })}
            >
              <View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                <Image
                  className='rounded-2xl h-24 w-20'
                  source={{
                    uri: image185w(person?.profile_path) || fallbackPersonImage,
                  }}
                />
              </View>
              <Text className='text-white text-xs mt-1'>
                {person?.character.length > 10
                  ? person?.character.slice(0, 10) + '...'
                  : person?.character}
              </Text>
              <Text className='text-neutral-400 text-xs mt-1'>
                {person?.original_name.length > 10
                  ? person?.original_name.slice(0, 10) + '...'
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Cast;
