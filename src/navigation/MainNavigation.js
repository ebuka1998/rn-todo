import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {useSelector, useDispatch} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import {getLoggedInUser} from '../redux/features/userSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Header from '../components/homeComponent/Header';
import ListDetailScreen from '../screens/ListDetailScreen';
import TodayTaskScreen from '../screens/TodayTaskScreen';
import ImportantTaskScreen from '../screens/ImportantTaskScreen';
import {View, Text} from 'react-native';

const MainNavigation = () => {
  const dispatch = useDispatch();
  const scheme = useColorScheme();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email', 'profile'],
      webClientId:
        '801857097573-j6fnvur5s8jpbgcpvp8i9lf0ia16go2b.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
    dispatch(getLoggedInUser());
  }, []);
  const {user, userLoading} = useSelector(store => store.user);
  const Stack = createNativeStackNavigator();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };
  if (userLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, color: 'red'}}>loading</Text>
      </View>
    );
  }
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                header: () => <Header />,
              }}
            />
            <Stack.Screen name="ListDetail" component={ListDetailScreen} />
            <Stack.Screen name="Today" component={TodayTaskScreen} />
            <Stack.Screen name="Important" component={ImportantTaskScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
