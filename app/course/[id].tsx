import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Cources = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>this is course id : {id}</Text>
    </View>
  );
};

export default Cources;

const styles = StyleSheet.create({});
