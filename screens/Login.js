import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firebaseDatabase } from "../config/Config";
import { signIn, singOut } from "../store/Auth";
import { connect } from "react-redux";
import { compose } from "redux";
import { bindActionCreators } from "@reduxjs/toolkit";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  onLogin = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      await signInWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          this.setState({ isLoading: false });
          this.props.signIn(userCredential);
          this.props.navigation.navigate("HomeDrawer");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.setState({ isLoading: false });
          alert(errorCode + errorMessage);
        });
    } else {
      alert("Please enter email and password");
    }
  };

  componentDidMount = () => {
    console.log(this.props.authUser);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}></View>
        <View
          style={{
            flex: 1,
            width: 400,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="md-person-circle-sharp" size={150} color={"green"} />
          <TextInput
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email: email })}
            mode="outlined"
            label="Email"
            right={<TextInput.Affix text="/100" />}
            style={styles.inputStyle}
          ></TextInput>
          <TextInput
            placeholder="password"
            secureTextEntry
            onChangeText={(password) => this.setState({ password: password })}
            mode="outlined"
            label="Password"
            right={<TextInput.Affix text="/100" />}
            style={styles.inputStyle}
          ></TextInput>
          <Button
            icon="login"
            mode="contained"
            onPress={this.onLogin}
            style={{ width: 350, marginTop: 15, backgroundColor: "green" }}
          >
            Login
          </Button>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
  };
};

const wrapper = compose(connect(mapStateToProps, mapDispatchToProps));
export default wrapper(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    marginTop: 20,
    width: 350,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#DCDCDC",
  },
});
