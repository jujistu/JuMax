import {
  View,
  Text,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { FC, useState } from 'react';
import { styles, theme } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { height, width } from '../components/MovieCard';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

const ios = Platform.OS === 'ios';

const verticalMargin = ios ? '' : 'my-3';

const PersonScreen: FC = () => {
  const navigation = useNavigation();

  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView
      className='flex-1 bg-neutral-900'
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={
          ' z-20 w-full flex-row justify-between items-center px-4' +
          verticalMargin
        }
      >
        <TouchableOpacity
          style={styles.background}
          className='rounded-xl ml-3 p-1'
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          className='mr-3'
          onPress={() => toggleFavourite(!isFavourite)}
        >
          <HeartIcon size={35} color={isFavourite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className='flex-row justify-center'
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500'>
              <Image
                source={{
                  uri: 'https://pbs.twimg.com/media/Ep9dNx0XUAAKiat.jpg',
                }}
                style={{
                  height: height * 0.43,
                  width: width * 0.74,
                }}
              />
            </View>
          </View>
          <View className='mt-6'>
            <Text className='text-3xl text-white font-bold text-center'>
              Keanu Reeves
            </Text>
            <Text className='text-base text-neutral-500 text-center'>
              London, United Kingdom
            </Text>
          </View>
          <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white font-semibold'>Gender</Text>
              <Text className='text-neutral-300 text-sm'>Male</Text>
            </View>
            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white font-semibold'>Birthday</Text>
              <Text className='text-neutral-300 text-sm'>1964-09-02</Text>
            </View>
            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
              <Text className='text-white font-semibold'>Known for</Text>
              <Text className='text-neutral-300 text-sm'>Acting</Text>
            </View>
            <View className='px-2 items-center'>
              <Text className='text-white font-semibold'>Popularity</Text>
              <Text className='text-neutral-300 text-sm'>64.23</Text>
            </View>
          </View>
          {/* biography */}
          <View className='my-6 mx-4 space-y-2'>
            <Text className='text-white text-lg'>Biography</Text>
            <Text className='text-neutral-400 tracking-wide'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Inventore porro quod nemo quo nobis asperiores molestias harum
              rerum accusamus eos culpa obcaecati, rem neque hic error maiores,
              id dolor cupiditate. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Similique quo a harum excepturi, illum molestias
              quasi eius unde autem ducimus iste porro quaerat. Accusantium
              possimus dolorem magnam reprehenderit. Nobis, quos.
            </Text>
          </View>

          {/* movies acted */}
          <MovieList title='Movies' hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
