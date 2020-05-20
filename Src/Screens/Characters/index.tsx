import React, {FC, useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {character, getCharacter} from '../../config';
import ItemCharacter from '../../Components/ItemCharacter';

type position = {
  x: number | null | undefined;
  y: number | null | undefined;
};

type RootStackParamList = {
  characters: undefined;
};

type ScreenRouteProp = RouteProp<RootStackParamList, 'characters'>;

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'characters'
>;

type Props = {
  route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
};

const Characters: FC<Props> = () => {
  const [character, setCharacters] = useState<Array<character>>([]);
  const [position, setPosition] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerGetCharacter = useCallback(
    async (offset: number, limit: number = 20) => {
      setLoading(true);
      const {
        data: {
          data: {results},
        },
      } = await getCharacter({limit, offset});

      setCharacters((olds) => [...olds, ...results]);
      setLoading(false);
    },
    [],
  );

  useEffect(() => {
    handlerGetCharacter(0);
    setPosition((old) => old + 1);
  }, [handlerGetCharacter]);

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={character}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <ItemCharacter character={item} />}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          handlerGetCharacter(position * 20);
          setPosition((old) => old + 1);
        }}
        ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Characters;
