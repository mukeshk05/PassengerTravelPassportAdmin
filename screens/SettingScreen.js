import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { auth } from "../config/Config";
import { signOut } from "firebase/auth";

class SettingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signOut = () => {
    signOut(auth)
      .then(() => {
        this.props.navigation.navigate("Landing");
      })
      .catch((error) => {
        // An error happened.
        alert("Unable to sign out");
      });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#2E424D",
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity onPress={this.signOut}>
            <View
              style={{
                width: 200,
                height: 50,
                backgroundColor: "transparent",
                borderWidth: 0.5,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default SettingScreen;
