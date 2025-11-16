
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ClothingItem } from '../types';
import { ArrowUturnLeftIcon } from './Icons';

interface EditItemScreenProps {
  item: ClothingItem;
  onBack: () => void;
  onSave: (updatedItem: ClothingItem) => void;
}

const EditItemScreen: React.FC<EditItemScreenProps> = ({ item, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    category: item.category,
    color: item.color,
    style_tags: item.style_tags,
    description: item.description || '',
    estimatedPrice: item.estimatedPrice,
  });

  const handleChange = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'style_tags' 
        ? value.split(',').map(tag => tag.trim()) 
        : name === 'estimatedPrice'
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = () => {
    onSave({ ...item, ...formData });
  };

  return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>編輯物品</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{uri: item.imageUrls[0]}} style={styles.previewImage} />
        
        <View style={styles.formContainer}>
          <TextInput 
            placeholder="類別" 
            value={formData.category} 
            onChangeText={(val) => handleChange('category', val)} 
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
          <TextInput 
            placeholder="顏色" 
            value={formData.color} 
            onChangeText={(val) => handleChange('color', val)} 
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
          <View style={styles.priceInputContainer}>
            <Text style={styles.pricePrefix}>TWD</Text>
            <TextInput 
              placeholder="預估價格" 
              value={String(formData.estimatedPrice)} 
              onChangeText={(val) => handleChange('estimatedPrice', val)} 
              style={[styles.input, styles.priceInput]}
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
            />
          </View>
          <TextInput 
            placeholder="風格標籤 (以逗號分隔)" 
            value={formData.style_tags.join(', ')} 
            onChangeText={(val) => handleChange('style_tags', val)} 
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
          <TextInput 
            placeholder="新增描述..." 
            value={formData.description} 
            onChangeText={(val) => handleChange('description', val)} 
            style={[styles.input, styles.textArea]}
            placeholderTextColor="#9CA3AF"
            multiline
          />
          
          <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>儲存變更</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  },
  previewImage: {
    width: '100%',
    height: 256,
    borderRadius: 12,
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
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
  priceInputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  pricePrefix: {
    position: 'absolute',
    left: 12,
    color: '#9CA3AF',
    zIndex: 1,
    fontFamily: 'Poppins-Regular',
  },
  priceInput: {
    paddingLeft: 50,
  },
  textArea: {
    height: 96,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
    backgroundColor: '#EC4899',
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditItemScreen;
