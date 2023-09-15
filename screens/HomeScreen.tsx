import {
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Bars3CenterLeftIcon as BarMenuIcon,
  MagnifyingGlassIcon as MagnifyingIcon,
} from 'react-native-heroicons/outline';
import { styles } from '../theme/theme';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/types';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../api/MovieDb';
import { G } from 'react-native-svg';

const ios = Platform.OS === 'ios';

export type Prop = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: FunctionComponent = () => {
  const navigation = useNavigation<Prop['navigation']>();

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log('trending', data);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log('upcoming', data);
    if (data && data.results) setUpcoming(data.results);
  };

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log('topRated', data);
    if (data && data.results) setTopRated(data.results);
  };

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View className='flex-1 bg-neutral-800'>
      {/* searchBar and logo */}
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style='light' />
        <View className='flex-row justify-between items-center mx-4'>
          <BarMenuIcon size={30} color='white' strokeWidth={2} />
          <Text className='text-white text-3xl font-bold'>
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingIcon size={30} strokeWidth={2} color='white' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          className='mb-5'
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* trending movies carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          <MovieList title='Upcoming' data={upcoming} />

          {/* top rated movies row */}
          <MovieList title='Top Rated' data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
