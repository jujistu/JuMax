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
import React, { FC, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/types';
import { useNavigation } from '@react-navigation/native';
import { height, width } from '../components/MovieCard';
import Loading from '../components/Loading';

export type Prop = StackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: FC = () => {
  const navigation = useNavigation<Prop['navigation']>();

  let movieName = 'Ant-Man and the Wasp: Quantumania';

  const [results, setResults] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView className='bg-neutral-800 flex-1'>
      <StatusBar style='dark' />
      <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
        <TextInput
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
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', { item })}
              >
                <View className='space-y-2 mb-4'>
                  <Image
                    className='rounded-3xl'
                    source={{
                      uri: 'https://cdnb.artstation.com/p/assets/images/images/054/409/361/large/ame-jouten-caspertherebootposter2022.jpg?1664465721',
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className='text-neutral-300 ml-1'>
                    {movieName.length > 22
                      ? movieName.slice(0, 18) + '...'
                      : movieName}
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
