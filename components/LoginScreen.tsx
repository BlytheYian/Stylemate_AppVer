
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { SparklesIcon } from './Icons';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User as FirebaseAuthUser } from 'firebase/auth';
import { auth } from '../services/firebase';

interface LoginScreenProps {
  onLogin: (user: FirebaseAuthUser) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('提醒', '請輸入 Email 與密碼。');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        Alert.alert('提醒', '請輸入顯示名稱。');
        return;
      }
      if (password.length < 6) {
        Alert.alert('提醒', '密碼至少需 6 碼。');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('提醒', '兩次輸入的密碼不一致。');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      if (mode === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) {
          await updateProfile(userCredential.user, { displayName: name.trim() });
        }
        onLogin(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        onLogin(userCredential.user);
      }
    } catch (error: any) {
      console.error('[LoginScreen] auth error', error);
      let message = '請稍後再試。';
      if (error.code === 'auth/email-already-in-use') {
        message = '此 Email 已被使用，請改用登入或其他 Email。';
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        message = 'Email 或密碼錯誤。';
      } else if (error.code === 'auth/user-not-found') {
        message = '沒有此帳號，請先註冊。';
      } else if (error.code === 'auth/weak-password') {
        message = '密碼安全性不足，請至少 6 碼。';
      }
      Alert.alert('登入失敗', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <SparklesIcon width={48} height={48} color="#F472B6" style={styles.logoIcon} />
        <Text style={styles.title}>Stylemate</Text>
      </View>
      <Text style={styles.subtitle}>交換您的風格，找到您的 Style。</Text>

      {mode === 'register' && (
        <TextInput
          style={styles.input}
          placeholder="顯示名稱"
          placeholderTextColor="#6B7280"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#6B7280"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="密碼"
        placeholderTextColor="#6B7280"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {mode === 'register' && (
        <TextInput
          style={styles.input}
          placeholder="再次輸入密碼"
          placeholderTextColor="#6B7280"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? (
          <ActivityIndicator color="#111827" />
        ) : (
          <Text style={styles.submitButtonText}>{mode === 'login' ? '登入' : '建立帳號'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleMode} disabled={isSubmitting}>
        <Text style={styles.toggleText}>
          {mode === 'login' ? '還沒有帳號？立即註冊' : '已經有帳號？返回登入'}
        </Text>
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
    marginBottom: 32,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#1F2937',
    color: '#F9FAFB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  submitButton: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: 'white',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'Poppins-Bold',
    color: '#374151',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#F472B6',
    fontFamily: 'Poppins-Regular',
    marginTop: 4,
  },
});

export default LoginScreen;
