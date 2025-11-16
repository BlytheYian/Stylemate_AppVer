
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SparklesIcon, GoogleIcon } from './Icons';
// For React Native, you need a native Google Sign-In library.
// The web-based `google.accounts.id` will not work.
// A popular choice is `@react-native-google-signin/google-signin`.

interface LoginScreenProps {
  onLogin: (userInfo: { name: string; email: string; picture: string }) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {

  const handleGoogleSignIn = async () => {
    // This function should contain the logic from `@react-native-google-signin/google-signin`
    try {
      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      // onLogin(userInfo.user); // The user object structure might differ slightly
      
      // Placeholder for demonstration:
      Alert.alert(
        "Google Sign-In",
        "This requires a native library like @react-native-google-signin/google-signin to be installed and configured."
      );
      // Mock login for development
      onLogin({ name: 'VibeSeeker', email: 'vibeseeker@email.com', picture: 'https://picsum.photos/seed/me/100/100'});

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <SparklesIcon width={48} height={48} color="#F472B6" style={styles.logoIcon} />
        <Text style={styles.title}>Stylemate</Text>
      </View>
      <Text style={styles.subtitle}>交換您的風格，找到您的 Style。</Text>
      
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <GoogleIcon width={24} height={24} style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    marginRight: 12,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    maxWidth: 250,
    textAlign: 'center',
    marginBottom: 48,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  googleIcon: {
    marginRight: 24,
  },
  googleButtonText: {
    fontFamily: 'Poppins-Bold',
    color: '#374151',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
