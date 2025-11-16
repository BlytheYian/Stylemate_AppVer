
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { User } from '../types';
import { ArrowUturnLeftIcon } from './Icons';

interface AccountScreenProps {
  user: User;
  onBack: () => void;
  onEdit: () => void;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ user, onBack, onEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowUturnLeftIcon width={24} height={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>帳戶</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>

        <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>電子郵件</Text>
                <Text style={styles.detailValue}>{user.email}</Text>
            </View>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>電話號碼</Text>
                <Text style={styles.detailValue}>{user.phoneNumber || '未設定'}</Text>
            </View>
             <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>加入於</Text>
                <Text style={styles.detailValue}>{user.joinDate}</Text>
            </View>
             <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>完成交換</Text>
                <Text style={styles.detailValue}>2</Text>
            </View>
        </View>
        
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Text style={styles.editButtonText}>編輯個人資料</Text>
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
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#F472B6',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  username: {
    color: '#9CA3AF',
  },
  detailsContainer: {
    width: '100%',
    maxWidth: 400,
    marginTop: 32,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailLabel: {
    color: '#9CA3AF',
  },
  detailValue: {
    color: 'white',
  },
  editButton: {
    marginTop: 32,
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#EC4899', // A single color from the gradient
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AccountScreen;