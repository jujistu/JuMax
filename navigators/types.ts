import { MovieScreenParams, PersonScreenParams } from '../screens/types';

export type RootStackParamList = {
  Home: undefined;
  Movie: MovieScreenParams;
  Person: PersonScreenParams;
  Search: undefined;
};
