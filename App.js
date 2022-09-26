import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider, Button, createTheme} from '@rneui/themed';
import MainNavigation from './src/navigation/MainNavigation';
import {store} from './src/redux/store';
// import {theme} from './src/utils/elementTheme';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <View style={styles.container}>
            <MainNavigation />
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
//4cn6inqum6lrvg14np5s5acqq2
