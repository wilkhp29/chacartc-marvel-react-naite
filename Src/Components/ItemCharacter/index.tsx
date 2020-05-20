import React, {FC, memo} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {character} from '../../config/types';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

interface prop {
  character: character;
}
type propCallback = {
  img: position;
  name: position;
  character: character;
};

type position = {
  x: number | null | undefined;
  y: number | null | undefined;
};

const ItemCharacter: FC<prop> = ({character}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => navigation.navigate('details', {character})}>
      <View style={style.containerImg}>
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
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  containerImg: {paddingRight: 10},
  img: {width: 120, height: 120},
  name: {fontWeight: '800', marginTop: 20},
});

export default memo(ItemCharacter);
