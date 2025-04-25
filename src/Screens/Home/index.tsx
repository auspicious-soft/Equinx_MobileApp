import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { HomeScreenProps } from '../../Typings/route'

const Home: FC <HomeScreenProps> = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})