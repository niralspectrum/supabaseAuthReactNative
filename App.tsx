import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import {AuthStack} from './src/Stacks/AuthStack';
import {supabase} from './src/lib/supabase';
import HomeStack from './src/Stacks/HomeStack';

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowHome, setShouldShowHome] = useState(false);

  const getUserDetails = async () => {
    const {data} = await supabase.auth.getUser();
    setShouldShowHome(!!data?.user);
    setIsLoading(false);
  };

  useEffect(() => {
    getUserDetails();

    // Listen for auth state changes (login/logout)
    const {data: authListener} = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event);
        setShouldShowHome(!!session?.user);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
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
