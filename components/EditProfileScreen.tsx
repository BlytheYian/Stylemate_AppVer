
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert } from 'react-native';
import { User } from '../types';
import { ArrowUturnLeftIcon } from './Icons';
// To enable image picking, you need to install a library like react-native-image-picker
// import { launchImageLibrary } from 'react-native-image-picker';

interface EditProfileScreenProps {
  user: User;
  onBack: () => void;
  onSave: (updatedUser: User) => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ user, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    phoneNumber: user.phoneNumber || '',
    avatar: user.avatar,
  });

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarClick = () => {
    // This is a placeholder. You would integrate react-native-image-picker here.
    Alert.alert(
        "Upload Avatar",
        "Full app would open image library. This feature requires a native library like react-native-image-picker.",
    );
    /*
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
            setFormData(prev => ({ ...prev, avatar: uri }));
        }
      }
    });
    */
  };

  const handleSubmit = () => {
    onSave({ ...user, ...formData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>編輯個人資料</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={handleAvatarClick} style={styles.avatarContainer}>
          <Image source={{ uri: formData.avatar }} style={styles.avatar} />
          <View style={styles.avatarOverlay}>
            <Text style={styles.avatarOverlayText}>上傳</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.formContainer}>
          <View>
            <Text style={styles.label}>名稱</Text>
            <TextInput 
              value={formData.name}
              onChangeText={val => handleChange('name', val)}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View>
            <Text style={styles.label}>使用者名稱</Text>
            <TextInput 
              value={formData.username}
              onChangeText={val => handleChange('username', val)}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View>
            <Text style={styles.label}>電話號碼</Text>
            <TextInput 
              value={formData.phoneNumber}
              onChangeText={val => handleChange('phoneNumber', val)}
              style={styles.input}
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>儲存變更</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(17, 24, 39, 0.8)',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#F472B6',
  },
  avatarOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOverlayText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
    color: 'white',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  saveButton: {
    marginTop: 32,
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#EC4899',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
