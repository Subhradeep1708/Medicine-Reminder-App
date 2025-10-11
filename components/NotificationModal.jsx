import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import useMedicineStore from '@/store/medicineStore';
import { ThemeContext } from '../app/_layout';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const NotificationModal = ({ visible, onClose }) => {
  const { isDark } = useContext(ThemeContext);
  const notifications = useMedicineStore((state) => state.notifications);
  const markNotificationAsRead = useMedicineStore((state) => state.markNotificationAsRead);
  const markAllNotificationsAsRead = useMedicineStore((state) => state.markAllNotificationsAsRead);
  const clearAllNotifications = useMedicineStore((state) => state.clearAllNotifications);
  const removeNotification = useMedicineStore((state) => state.removeNotification);

  const [slideAnim] = useState(new Animated.Value(SCREEN_WIDTH));
  const [dimensions, setDimensions] = useState({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle dimension changes for responsive design
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  // Animate modal entrance/exit
  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: dimensions.width,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, dimensions.width, slideAnim]);

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
  };

  const handleClearAll = () => {
    clearAllNotifications();
  };

  const handleRemove = (id) => {
    removeNotification(id);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  // Theme colors
  const bgColor = isDark ? '#1e1e1e' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#000000';
  const subTextColor = isDark ? '#aaaaaa' : '#666666';
  const borderColor = isDark ? '#333333' : '#e0e0e0';
  const unreadBg = isDark ? '#2a2a2a' : '#f0f8ff';
  const headerBg = isDark ? '#1f451f' : '#16a34a';

  // Responsive calculations
  const modalWidth = Math.min(dimensions.width * 0.95, 450);
  const modalHeight = dimensions.height * 0.85;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar
        backgroundColor="rgba(0,0,0,0.5)"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <View style={styles.modalOverlay}>
        <BlurView intensity={Platform.OS === 'ios' ? 25 : 15} style={StyleSheet.absoluteFill} tint={isDark ? 'dark' : 'light'}>
          <TouchableOpacity 
            style={styles.backdrop} 
            activeOpacity={1} 
            onPress={onClose}
          />
        </BlurView>

        <Animated.View 
          style={[
            styles.modalContainer, 
            { 
              backgroundColor: bgColor,
              width: modalWidth,
              maxHeight: modalHeight,
              transform: [{ translateX: slideAnim }],
            }
          ]}
        >
          {/* Header */}
          <View style={[styles.header, { backgroundColor: headerBg }]}>
            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <Ionicons name="notifications" size={24} color="#ffffff" />
                <Text style={styles.headerTitle}>Notifications</Text>
                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount}</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Action buttons */}
            {notifications.length > 0 && (
              <View style={styles.actionButtons}>
                {unreadCount > 0 && (
                  <TouchableOpacity onPress={handleMarkAllAsRead} style={styles.actionButton}>
                    <Ionicons name="checkmark-done" size={16} color="#ffffff" />
                    <Text style={styles.actionButtonText}>Mark all read</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleClearAll} style={styles.actionButton}>
                  <Ionicons name="trash-outline" size={16} color="#ffffff" />
                  <Text style={styles.actionButtonText}>Clear all</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Notifications List */}
          <ScrollView 
            style={styles.notificationList}
            showsVerticalScrollIndicator={false}
          >
            {notifications.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="notifications-off-outline" size={64} color={subTextColor} />
                <Text style={[styles.emptyText, { color: subTextColor }]}>
                  No notifications yet
                </Text>
                <Text style={[styles.emptySubText, { color: subTextColor }]}>
                  You&apos;ll see notifications here when you receive them
                </Text>
              </View>
            ) : (
              notifications.map((notification) => (
                <View
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    {
                      backgroundColor: notification.read ? 'transparent' : unreadBg,
                      borderBottomColor: borderColor,
                    },
                  ]}
                >
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationIcon}>
                      <Ionicons
                        name="medical"
                        size={24}
                        color={notification.read ? subTextColor : '#16a34a'}
                      />
                    </View>

                    <View style={styles.notificationBody}>
                      <View style={styles.notificationHeader}>
                        <Text
                          style={[
                            styles.notificationTitle,
                            {
                              color: textColor,
                              fontWeight: notification.read ? '400' : '700',
                            },
                          ]}
                        >
                          {notification.title}
                        </Text>
                        {!notification.read && <View style={styles.unreadDot} />}
                      </View>

                      <Text style={[styles.notificationText, { color: subTextColor }]}>
                        {notification.body}
                      </Text>

                      {notification.data?.dose && (
                        <Text style={[styles.notificationMeta, { color: subTextColor }]}>
                          Dose: {notification.data.dose}
                        </Text>
                      )}

                      <Text style={[styles.notificationTime, { color: subTextColor }]}>
                        {formatTime(notification.timestamp)}
                      </Text>
                    </View>

                    <View style={styles.notificationActions}>
                      {!notification.read && (
                        <TouchableOpacity
                          onPress={() => handleMarkAsRead(notification.id)}
                          style={styles.iconButton}
                        >
                          <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        onPress={() => handleRemove(notification.id)}
                        style={styles.iconButton}
                      >
                        <Ionicons name="trash-outline" size={20} color="#dc3545" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
    paddingRight: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  badge: {
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  closeButton: {
    padding: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'SpaceGrotesk-SemiBold',
  },
  notificationList: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    fontFamily: 'SpaceGrotesk-SemiBold',
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  notificationItem: {
    borderBottomWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notificationBody: {
    flex: 1,
    minWidth: 0,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  notificationTitle: {
    fontSize: 15,
    fontFamily: 'SpaceGrotesk-SemiBold',
    flexShrink: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16a34a',
    flexShrink: 0,
  },
  notificationText: {
    fontSize: 13,
    marginBottom: 4,
    fontFamily: 'SpaceGrotesk-Regular',
    lineHeight: 18,
  },
  notificationMeta: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  notificationTime: {
    fontSize: 11,
    fontFamily: 'SpaceGrotesk-Regular',
  },
  notificationActions: {
    flexDirection: 'column',
    gap: 8,
    flexShrink: 0,
  },
  iconButton: {
    padding: 4,
  },
});

export default NotificationModal;
