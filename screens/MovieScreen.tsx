import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigators/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme/theme';
import { height, width } from '../components/MovieCard';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500w,
} from '../api/MovieDb';
import { StatusBar } from 'expo-status-bar';
import { marginBT } from './HomeScreen';

export type Prop = StackScreenProps<RootStackParamList, 'Movie'>;

const ios = Platform.OS === 'ios';

const topMargin = ios ? '' : 'mt-3';

const MovieScreen: FC = () => {
  const navigation = useNavigation<Prop['navigation']>();

  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<any>({});

  const router = useRoute();
  const item = router.params as any;

  //get movie details
  const getMovieDetails = async (id: number) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  //get movie credit
  const getMovieCredits = async (id: number) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };

  //get movie details
  const getSimilarMovies = async (id: number) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item?.id);
    getMovieCredits(item?.id);
    getSimilarMovies(item?.id);
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className='flex-1 bg-neutral-900'
    >
      {/* back button and movie poster */}
      <View className={`${marginBT}`}>
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4' +
            topMargin
          }
        >
          <StatusBar style='dark' />
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
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500w(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width: width, height: height * 0.55 }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
              style={{ width: width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className='absolute bottom-0'
            />
          </View>
        )}
      </View>

      {/* movie details  */}
      <View style={{ marginTop: -(height * 0.09) }} className='space-y-3'>
        {/* title  */}
        <Text className='text-white text-center text-3xl font-bold tracking-wider'>
          {movie?.title}
        </Text>

        {/* status,release,runtime */}
        {movie?.id ? (
          <Text className='text-neutral-400 font-semibold text-base text-center'>
            {movie?.status} • {movie?.release_date?.split('-')[0]} •{' '}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* genres */}
        <View className='flex-row justify-center mx-4 space-x-2'>
          {movie?.genres?.map((genre: any, index: number) => {
            let showDot = index + 1 !== movie.genres.length;

            return (
              <Text
                key={index}
                className='text-neutral-400 font-semibold text-base text-center'
              >
                {genre?.name} {showDot ? '•' : null}
              </Text>
            );
          })}
        </View>
        {/* description */}
        <Text className='text-neutral-400 mx-4 tracking-wide'>
          {movie?.overview}
        </Text>
      </View>

      {/* cast  */}

      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* similar movies */}
      {similarMovies.length > 0 && (
        <MovieList
          title='Similar Movies'
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
