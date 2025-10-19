import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native-gesture-handler/jestSetup';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// Mock Expo LinearGradient
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    LinearGradient: ({ children, ...props }) => (
      <View {...props} testID="LinearGradient">
        <Text>{children}</Text>
      </View>
    ),
  };
});

// Mock Expo Vector Icons
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return {
    MaterialIcons: ({ name }) => <Text testID="icon">{name}</Text>,
  };
});