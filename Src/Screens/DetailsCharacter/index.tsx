import React, {FC} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {character} from '../../config';
import {SharedElement} from 'react-navigation-shared-element';

type position = {
  x: number | null | undefined;
  y: number | null | undefined;
};

type RootStackParamList = {
  characters: undefined;
  details: {posName: position; posImg: position; character: character};
};

type ScreenRouteProp = RouteProp<RootStackParamList, 'details'>;

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'details'>;

type Props = {
  route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
};

const DetailsCharacter: FC<Props> = ({route}) => {
  const {character} = route.params;

  return (
    <View style={style.wrapper}>
      <View style={style.container}>
        <SharedElement id={`character.${character.id}.photo`}>
          <Image
            style={style.img}
            source={{
              uri: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            }}
          />
        </SharedElement>
      </View>
      <Text numberOfLines={3} style={style.name}>
        {character.name}
      </Text>
      <Text style={style.description} numberOfLines={3}>
        {character.description}
      </Text>
      <TouchableOpacity style={style.btn}>
        <Text style={style.textBtn}>hq mais cara do personagem</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  img: {
    width: 160,
    height: 160,
  },
  container: {
    alignItems: 'center',
  },
  name: {fontSize: 22, fontWeight: '800', marginTop: 20},
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
    fontSize: 18,
  },
  btn: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  textBtn: {textTransform: 'uppercase'},
});
export default DetailsCharacter;
