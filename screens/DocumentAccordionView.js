import React from "react";
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import * as Animatable from "react-native-animatable";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  Divider,
  Modal,
  Portal,
  Button,
  Provider,
  ActivityIndicator,
  Colors,
} from "react-native-paper";
import Home from "./Home";
import { convertCardImageArray } from "../helpers/firebaseHelpers";
import { firebaseStorage, firebaseDatabase } from "../config/Config";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadTask,
  push,
  listAll,
  updateMetadata,
  child,
} from "firebase/storage";
import { Ionicons } from "@expo/vector-icons";
import { async } from "@firebase/util";
import { bindActionCreators } from "@reduxjs/toolkit";
import { listAllDocuments, viewDocument } from "../store/DocumentSlice";

class DocumentAccordionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      collapsed: true,
      multipleSelect: false,
      documentImage1: [],
      activityInd: true,
    };
  }

  onApprove = () => {
    console.log("Approved");
  };

  onReject = () => {
    console.log("Reject");
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
    this.props.viewDocument(this.state.documentImage1[sections]);
    this.props.changeHandler(this.state.documentImage1[sections]);
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Divider />
        <Text
          style={[
            styles.headerText,
            section.status == "true"
              ? styles.headerText
              : styles.approvedStatus,
          ]}
        >
          {section.title}{" "}
          {this.renderConditionalHeaderTitleText(section.status)}
        </Text>
      </Animatable.View>
    );
  };

  renderConditionalHeaderTitleText(status) {
    if (status == "true") {
      return (
        <View>
          <Ionicons
            name="checkmark-circle"
            color={"green"}
            size={20}
          ></Ionicons>
        </View>
      );
    }
    return (
      <View>
        <Ionicons
          name="close-circle-outline"
          color={"red"}
          size={20}
        ></Ionicons>
      </View>
    );
  }
  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  stopActivityInd = async () => {
    this.setState({ activityInd: false });
  };

  componentDidMount = async () => {
    const storageRef = ref(firebaseStorage, "documents");
    this.setState({ activityInd: true });
    await listAll(storageRef).then(async (res) => {
      res.prefixes.forEach(async (folder) => {
        const imagesFolder = ref(firebaseStorage, folder.fullPath);
        const res = await listAll(imagesFolder);
        const images = await convertCardImageArray(res);
        await this.props.listAllDocuments(images);
        this.setState((prevState) => ({
          documentImage1: prevState.documentImage1.concat(images),
        }));
      });
    });
    this.setState({ activityInd: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
          {this.state.activityInd ? (
            <ActivityIndicator
              animating={true}
              color={Colors.red800}
              size={"large"}
            />
          ) : null}

          <Accordion
            activeSections={this.state.activeSections}
            sections={this.props.allDocuments.DocumentSlice.entities}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={true}
          />
        </ScrollView>
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
    viewDocument: bindActionCreators(viewDocument, dispatch),
    listAllDocuments: bindActionCreators(listAllDocuments, dispatch),
  };
};

const wrapper = compose(connect(mapStateToProps, mapDispatchToProps));
export default wrapper(DocumentAccordionView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)",
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
