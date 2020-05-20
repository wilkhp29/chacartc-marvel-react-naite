import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Characters from './Src/Screens/Characters';
import DetailsCharacter from './Src/Screens/DetailsCharacter';

const Stack = createSharedElementStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="character"
        screenOptions={{
          cardStyleInterpolator: ({current: {progress}}) => {
            return {cardStyle: {opacity: progress}};
          },
        }}>
        <Stack.Screen name="characters" component={Characters} />
        <Stack.Screen
          name="details"
          component={DetailsCharacter}
          sharedElementsConfig={(route) => {
            const {character} = route.params;
            return [`character.${character.id}.photo`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
