
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { ClothingItem, User } from '../types';
import { generateClothingTags } from '../services/geminiService';
import { PhotoIcon, SparklesIcon, XMarkIcon, PlusIcon } from './Icons';
import * as ImagePicker from 'expo-image-picker';

interface UploadModalProps {
  user: User;
  onClose: () => void;
  onUpload: (newItem: Omit<ClothingItem, 'id' | 'userId' | 'userName' | 'userAvatar'>) => void;
}

type Step = 'upload' | 'analyzing' | 'edit';
type ImageAsset = { uri: string; base64: string; type: string };

const UploadModal: React.FC<UploadModalProps> = ({ user, onClose, onUpload }) => {
  const [step, setStep] = useState<Step>('upload');
  const [images, setImages] = useState<ImageAsset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [itemDetails, setItemDetails] = useState({
      category: '',
      color: '',
      style_tags: [] as string[],
      description: '',
      estimatedPrice: 0,
  });

  const handleChooseImages = async (replace: boolean = false) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('權限不足', '抱歉，我們需要相簿權限才能讓您上傳圖片！');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets) {
      setError(null);
      const newImages: ImageAsset[] = result.assets.map(asset => ({
        uri: asset.uri,
        base64: asset.base64!,
        type: asset.mimeType || 'image/jpeg',
      }));

      setImages(prev => (replace ? newImages : [...prev, ...newImages]));
    }
  };


  const handleGetVibeTags = async () => {
    if (images.length === 0) {
      setError("請先選擇一張圖片。");
      return;
    }
    
    setStep('analyzing');
    setError(null);

    try {
      const firstImage = images[0];
      const tags = await generateClothingTags(firstImage.base64, firstImage.type);
      setItemDetails({ ...tags, description: '' });
      setStep('edit');
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("AI圖片分析失敗，請重試。");
        }
        setStep('upload');
    }
  };

  const handleDetailsChange = (field: keyof typeof itemDetails, value: string | number) => {
    setItemDetails(prev => ({
        ...prev,
        [field]: field === 'style_tags' && typeof value === 'string' 
            ? value.split(',').map(tag => tag.trim()) 
            : value
    }));
  };

  const handleFinalUpload = () => {
    if (images.length === 0) return;
    const newItem = {
        imageUrls: images.map(img => img.uri),
        ...itemDetails,
    };
    onUpload(newItem);
  };

  const renderContent = () => {
    switch (step) {
      case 'analyzing':
        return (
          <View style={styles.analyzingContainer}>
            <ActivityIndicator size="large" color="#F472B6" />
            <Text style={styles.analyzingText}>正在獲取風格標籤...</Text>
          </View>
        );
      case 'edit':
        return (
          <ScrollView>
            <View style={styles.editImageContainer}>
                <Image source={{uri: images[0].uri}} style={styles.editMainImage}/>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {images.slice(1).map((p, i) => (
                    <Image key={i} source={{uri: p.uri}} style={styles.editThumbnail} />
                  ))}
                   <TouchableOpacity onPress={() => handleChooseImages(false)} style={styles.addMoreButton}>
                      <PlusIcon width={24} height={24} color="#9CA3AF" />
                   </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={styles.form}>
                <TextInput placeholder="類別" value={itemDetails.category} onChangeText={v => handleDetailsChange('category', v)} style={styles.input}/>
                <TextInput placeholder="顏色" value={itemDetails.color} onChangeText={v => handleDetailsChange('color', v)} style={styles.input}/>
                <TextInput placeholder="風格標籤 (以逗號分隔)" value={itemDetails.style_tags.join(', ')} onChangeText={v => handleDetailsChange('style_tags', v)} style={styles.input}/>
                <View style={styles.priceInputContainer}>
                    <Text style={styles.pricePrefix}>TWD</Text>
                    <TextInput placeholder="預估價格" value={String(itemDetails.estimatedPrice)} onChangeText={v => handleDetailsChange('estimatedPrice', parseInt(v) || 0)} style={[styles.input, styles.priceInput]} keyboardType="numeric"/>
                </View>
                <TextInput placeholder="新增描述..." value={itemDetails.description} onChangeText={v => handleDetailsChange('description', v)} style={[styles.input, styles.textArea]} multiline/>
            </View>
            <TouchableOpacity onPress={handleFinalUpload} style={styles.actionButton}>
                <Text style={styles.actionButtonText}>新增至我的衣櫃</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      case 'upload':
      default:
        return (
          <>
            {images.length > 0 ? (
              <Image source={{uri: images[0].uri}} style={styles.uploadPreview}/>
            ) : (
              <View style={styles.uploadPlaceholder}>
                <PhotoIcon width={64} height={64} color="#6B7280"/>
                <Text style={styles.uploadPlaceholderText}>您的圖片將會顯示在此</Text>
              </View>
            )}
            
            <TouchableOpacity onPress={() => handleChooseImages(true)} style={styles.selectButton}>
              <Text style={styles.selectButtonText}>{images.length > 0 ? `已選擇 ${images.length} 張` : '選擇圖片'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGetVibeTags} disabled={images.length === 0} style={[styles.actionButton, images.length === 0 && styles.disabledButton]}>
              <SparklesIcon width={20} height={20} color="white" />
              <Text style={styles.actionButtonText}>獲取風格標籤</Text>
            </TouchableOpacity>
          </>
        );
    }
  };

  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, step === 'edit' && {maxWidth: 800}]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}><XMarkIcon width={24} height={24} color="#9CA3AF" /></TouchableOpacity>
          <Text style={styles.title}>{step === 'edit' ? '編輯您的風格' : '上傳您的風格'}</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalContainer: { backgroundColor: '#1F2937', borderRadius: 24, padding: 24, width: '100%', maxWidth: 400, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.3)' },
  closeButton: { position: 'absolute', top: 16, right: 16, zIndex: 10 },
  title: { fontFamily: 'Poppins-Bold', fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 16 },
  errorText: { fontFamily: 'Poppins-Regular', color: '#F87171', textAlign: 'center', marginBottom: 16 },
  analyzingContainer: { height: 320, justifyContent: 'center', alignItems: 'center' },
  analyzingText: { fontFamily: 'Poppins-SemiBold', fontSize: 18, color: 'white', marginTop: 16 },
  uploadPreview: { width: '100%', height: 256, borderRadius: 12, marginBottom: 16 },
  uploadPlaceholder: { width: '100%', height: 256, borderWidth: 2, borderStyle: 'dashed', borderColor: '#4B5567', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  uploadPlaceholderText: { fontFamily: 'Poppins-Regular', color: '#9CA3AF', marginTop: 8 },
  selectButton: { backgroundColor: '#374151', padding: 12, borderRadius: 999, alignItems: 'center', marginBottom: 16 },
  selectButtonText: { fontFamily: 'Poppins-Bold', color: 'white', fontWeight: 'bold' },
  actionButton: { flexDirection: 'row', backgroundColor: '#EC4899', padding: 12, borderRadius: 999, alignItems: 'center', justifyContent: 'center', gap: 8 },
  actionButtonText: { fontFamily: 'Poppins-Bold', color: 'white', fontWeight: 'bold' },
  disabledButton: { opacity: 0.5 },
  editImageContainer: { width: '40%', marginRight: 16 },
  editMainImage: { width: '100%', aspectRatio: 3/4, borderRadius: 12, marginBottom: 8 },
  editThumbnail: { width: 64, height: 64, borderRadius: 6, marginRight: 8 },
  addMoreButton: { width: 64, height: 64, backgroundColor: '#374151', borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  form: { width: '60%' },
  input: { fontFamily: 'Poppins-Regular', backgroundColor: '#374151', padding: 12, borderRadius: 8, color: 'white', marginBottom: 12 },
  textArea: { height: 96, textAlignVertical: 'top' },
  priceInputContainer: { position: 'relative', width: '100%', justifyContent: 'center' },
  pricePrefix: { fontFamily: 'Poppins-Regular', position: 'absolute', left: 12, color: '#9CA3AF', zIndex: 1 },
  priceInput: { paddingLeft: 50 },
});

export default UploadModal;
