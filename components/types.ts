import { StackNavigationProp } from '@react-navigation/stack';
import { GestureResponderEvent } from 'react-native';
import { Prop } from '../screens/MovieScreen';
import { RootStackParamList } from '../navigators/types';

export type TrendingMovie = {
  data: any;
};

export type MovieCardProps = {
  handleClick: ((event: GestureResponderEvent) => void) | undefined;
  item: any;
};

export type MovieListProps = {
  title: string;
  data: any;
  hideSeeAll?: boolean;
};

export type CastProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Movie', undefined>;
  cast: any;
};
