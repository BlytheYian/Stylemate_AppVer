
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SparklesIcon } from './Icons';

interface LoggedOutScreenProps {
  onLogin: () => void;
}

const LoggedOutScreen: React.FC<LoggedOutScreenProps> = ({ onLogin }) => {
  return (
    <View style={styles.container}>
      <SparklesIcon width={96} height={96} color="#F472B6" style={styles.icon} />
      <Text style={styles.title}>您已成功登出。</Text>
      <Text style={styles.subtitle}>感謝您與我們交換風格！</Text>
      <TouchableOpacity onPress={onLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>再次登入</Text>
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
  icon: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
    maxWidth: 250,
    textAlign: 'center',
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: '#EC4899', // Simplified gradient
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoggedOutScreen;
