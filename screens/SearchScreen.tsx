import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { FC, useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/types';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../components/MovieCard';
import Loading from '../components/Loading';
import { debounce } from 'lodash';
import {
  fallbackMoviePoster,
  image185w,
  image342w,
  image500w,
  searchMovies,
} from '../api/MovieDb';

export type Prop = StackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: FC = () => {
  const navigation = useNavigation<Prop['navigation']>();

  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  //query the api using the value typed
  const handleSearch = (value: string) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      }).then((data) => {
        setLoading(false);
        // console.log('get movies', data.results);
        if (data && data.results) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  //to prevent it from calling the api on every key pressed
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <StatusBar style='light' />
      <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search Movie'
          placeholderTextColor={'lightgray'}
          className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
        />
        <TouchableOpacity
          className='rounded-full p-3 m-1 bg-neutral-500'
          onPress={() => navigation.navigate('Home')}
        >
          <XMarkIcon size={25} color='white' />
        </TouchableOpacity>
      </View>

      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          className='space-y-3'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text className='text-white font-semibold ml-1'>
            Results ({results.length}){' '}
          </Text>
          <View className='flex-row justify-between flex-wrap'>
            {results.map((item: any, index: number) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}
              >
                <View className='space-y-2 mb-4'>
                  <Image
                    className='rounded-3xl'
                    source={{
                      uri: image185w(item?.poster_path) || fallbackMoviePoster,
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className='text-neutral-300 ml-1'>
                    {item?.title.length > 22
                      ? item?.title.slice(0, 18) + '...'
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className='flex-row justify-center'>
          <Image
            className='h-96 w-96'
            source={{ uri: 'https://hajde.media/img/no-results.png' }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
