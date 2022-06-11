import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import colors from "../assets/colors";
import { auth } from "../config/Config";
import { onAuthStateChanged } from "firebase/auth";

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkIfLogedIn();
  }

  checkIfLogedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //navigate user
        this.props.navigation.navigate("HomeDrawer");
      } else {
        this.props.navigation.navigate("Landing");
      }
    });
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          size={"large"}
        />
      </View>
    );
  }
}

export default LoadingScreen;
