import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStack} from './src/Stacks/AuthStack';
import {supabase} from './src/lib/supabase';
import HomeStack from './src/Stacks/HomeStack';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowHome, setShouldShowHome] = useState(false);

  const getUserDetails = async () => {
    try {
      const {data} = await supabase.auth.getUser();
      if (data?.user?.id) {
        setShouldShowHome(true);
      } else {
        setShouldShowHome(false);
      }
    } catch (error) {
      setShouldShowHome(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'#000'} />
      ) : (
        <NavigationContainer>
          {shouldShowHome ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
