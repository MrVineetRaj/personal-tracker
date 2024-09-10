import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileHeader from '../../components/profile-header';

const home = () => {
  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ProfileHeader />
    </SafeAreaView>
  );
}

export default home