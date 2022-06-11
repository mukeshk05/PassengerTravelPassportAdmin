import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Appbar,
  Button,
  Dialog,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import CertificateAccordionView from "./CertificateAccordionView";
import DocumentAccordionView from "./DocumentAccordionView";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseStorage, firebaseDatabase } from "../config/Config";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadTask,
  push,
  listAll,
  updateMetadata,
} from "firebase/storage";
import DocumentSlice from "../store/DocumentSlice";

import { bindActionCreators } from "@reduxjs/toolkit";
import { approveDocument, rejectDocument } from "../store/DocumentSlice";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      approvedDialogVisable: false,
      imageUri: props.imageUri,
      certificateUri: props.imageUri,
      activityInd: false,
    };
  }

  showImage = (imageUri) => {
    this.setState({ imageUri: imageUri });
  };

  showCertificate = (certificateUri) => {
    this.setState({ imageUri: certificateUri });
  };

  setVisible = () => {
    this.setState({ visible: true });
  };

  hideDialog = () => {
    this.setState({ visible: false });
  };

  setApprovedVisible = () => {
    this.setState({ approvedDialogVisable: true });
  };

  hideApprovedDialog = () => {
    this.setState({ approvedDialogVisable: false });
  };

  approveDocument = async (imageData) => {
    console.log(imageData);
    if (imageData.status === "true") {
      this.setApprovedVisible();
    }
    const storageRef = ref(firebaseStorage, imageData.path);
    const metadata = {
      customMetadata: {
        approved: "true",
      },
    };
    await updateMetadata(storageRef, metadata)
      .then((metadata) => {})
      .catch((error) => {
        console.log(error);
      });
    this.props.approveDocument(imageData.path);
  };

  rejectDocument = async (imageData) => {
    if (imageData.status === "false") {
      this.setVisible();
    }
    const storageRef = ref(firebaseStorage, imageData.path);
    const metadata = {
      customMetadata: {
        approved: "false",
      },
    };
    await updateMetadata(storageRef, metadata)
      .then((metadata) => {})
      .catch((error) => {
        console.log(error);
      });
    this.props.rejectDocument(imageData.path);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginLeft: 0,
          }}
        ></View>
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Appbar.Header style={{ marginTop: 20, width: 400 }}>
            <Appbar.Content title="Documents" subtitle={"Approve"} />
          </Appbar.Header>
          <DocumentAccordionView
            changeHandler={this.showImage.bind(this)}
          ></DocumentAccordionView>
          <Dialog visible={this.state.visible}>
            <Dialog.Title>Document</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is not approved yet</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>

          <Dialog visible={this.state.approvedDialogVisable}>
            <Dialog.Title>Document</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is already approved</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.hideApprovedDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </View>
        <View
          style={{
            marginLeft: 20,
          }}
        >
          <Appbar.Header style={{ marginTop: 20, marginLeft: 20, width: 400 }}>
            <Appbar.Content title="Certificates" subtitle={"Approve"} />
          </Appbar.Header>
          <CertificateAccordionView
            changeHandler={this.showCertificate.bind(this)}
          ></CertificateAccordionView>
        </View>
        {this.state.imageUri && (
          <View
            style={{
              marginLeft: 20,
              alignItems: "flex-start",
              width: 800,
            }}
          >
            <Image
              source={{
                uri: this.state.imageUri.imageUri,
              }}
              style={{
                width: 750,
                height: 700,
                alignContent: "center",
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 3,
              }}
            />
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ flex: 1, flexDirection: "row" }}
                onPress={() => this.approveDocument(this.state.imageUri)}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={80}
                  color={"green"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.rejectDocument(this.state.imageUri)}
              >
                <Ionicons name="close-circle-outline" size={80} color={"red"} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDocuments: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    approveDocument: bindActionCreators(approveDocument, dispatch),
    rejectDocument: bindActionCreators(rejectDocument, dispatch),
  };
};

const wrapper = compose(connect(mapStateToProps, mapDispatchToProps));
export default wrapper(Home);

const styles = StyleSheet.create({
  bottom: {
    left: 100,
    right: 0,
    bottom: 20,
    top: 10,
  },
});
