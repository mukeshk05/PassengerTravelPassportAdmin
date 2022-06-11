import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import LoadingScreen from "./screens/LoadingScreen";
import SettingScreen from "./screens/SettingScreen";

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Ionicons name="notifications-circle-outline" size={20}></Ionicons>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <ScrollView>
      <SafeAreaView style={{ backgroundColor: "green" }} />
      <View
        style={{
          height: 150,
          backgroundColor: "green",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="ios-airplane-sharp" size={100} />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Close"
          icon={({ focused, color, size }) => (
            <Ionicons name="log-out-sharp" size={24} />
          )}
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          label="Toggle drawer"
          onPress={() => props.navigation.toggleDrawer()}
        />
      </DrawerContentScrollView>
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{}}
      openByDefault
      overlayColor="transparent"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <Ionicons name="ios-home-outline" size={24} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <Ionicons name="settings-outline" size={24} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: true,
          drawerIcon: () => (
            <Ionicons
              name="notifications-circle-outline"
              size={24}
              color={"green"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{
              title: "Loading",
              headerShown: false,
              headerTitleAlign: "center",
            }}
          />
          <RootStack.Screen
            name="Landing"
            component={Login}
            options={{
              title: "Landing",
              headerShown: false,
              headerTitleAlign: "center",
            }}
          />

          <RootStack.Screen
            name="HomeDrawer"
            component={MyDrawer}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default function App() {
  return <StackNavigator></StackNavigator>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
