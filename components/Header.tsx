
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserCircleIcon, ArrowUpTrayIcon, SparklesIcon, ArrowUturnLeftIcon } from './Icons';

interface HeaderProps {
  onUploadClick: () => void;
  onProfileClick: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick, onProfileClick, showBackButton, onBackClick }) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        { showBackButton ? (
          <TouchableOpacity onPress={onBackClick} accessibilityLabel="返回主頁">
            <ArrowUturnLeftIcon width={32} height={32} color="#9CA3AF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onProfileClick} accessibilityLabel="開啟選單">
            <UserCircleIcon width={32} height={32} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <SparklesIcon width={24} height={24} color="#F472B6" style={{marginRight: 8}} />
        <Text style={styles.title}>Stylemate</Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onUploadClick} accessibilityLabel="上傳物品">
            <ArrowUpTrayIcon width={32} height={32} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(17, 24, 39, 0.8)', // bg-gray-900/80
        // backdrop-blur-sm would require a library like @react-native-community/blur
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end'
    }
});


export default Header;