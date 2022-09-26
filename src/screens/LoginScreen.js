import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useSelector, useDispatch} from 'react-redux';
import {signOut, signIn} from '../redux/features/userSlice';

const LoginScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => dispatch(signOut())} style={{marginBottom: 60}}>
        <Text style={{color: 'black', marginBottom: 40}}>LOGOUT</Text>
      </Pressable>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => dispatch(signIn())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
