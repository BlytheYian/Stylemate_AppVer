
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, SafeAreaView } from 'react-native';
import { User } from '../types';
import { IdentificationIcon, TagIcon, ClockIcon, ArrowLeftOnRectangleIcon, BookmarkIcon, InboxIcon, TruckIcon } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  user: User;
  onClose: () => void;
  onNavigate: (view: 'home' | 'account' | 'my-items' | 'history' | 'liked-items' | 'requests' | 'ongoing-transactions') => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, user, onClose, onNavigate, onLogout }) => {
  const NavButton = ({ label, icon, view }: { label: string, icon: React.ReactNode, view: 'home' | 'account' | 'my-items' | 'history' | 'liked-items' | 'requests' | 'ongoing-transactions' }) => (
    <TouchableOpacity onPress={() => onNavigate(view)} style={styles.navButton}>
        {icon}
        <Text style={styles.navButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal animationType="fade" transparent={true} visible={isOpen} onRequestClose={onClose}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <SafeAreaView style={styles.sidebarContainer}>
            <View style={styles.profileSection}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.username}>{user.username}</Text>
                </View>
            </View>
            
            <View style={styles.navSection}>
                <NavButton label="帳戶" view="account" icon={<IdentificationIcon width={24} height={24} color="#9CA3AF" />} />
                <NavButton label="我的物品" view="my-items" icon={<TagIcon width={24} height={24} color="#9CA3AF" />} />
                <NavButton label="正在交易" view="ongoing-transactions" icon={<TruckIcon width={24} height={24} color="#9CA3AF" />} />
                <NavButton label="交換請求" view="requests" icon={<InboxIcon width={24} height={24} color="#9CA3AF" />} />
                <NavButton label="喜愛的物品" view="liked-items" icon={<BookmarkIcon width={24} height={24} color="#9CA3AF" />} />
                <NavButton label="歷史紀錄" view="history" icon={<ClockIcon width={24} height={24} color="#9CA3AF" />} />
            </View>
            
            <View style={styles.footer}>
                <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                    <ArrowLeftOnRectangleIcon width={24} height={24} color="#F87171" />
                    <Text style={styles.logoutButtonText}>登出</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  sidebarContainer: {
    height: '100%',
    width: 288,
    backgroundColor: '#1F2937',
    padding: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#F472B6',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  username: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  navSection: {
    gap: 8,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#F87171',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default Sidebar;