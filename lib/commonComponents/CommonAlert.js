import React from "react";
import PropTypes from "prop-types";
import {
  ViewPropTypes,
  StyleSheet,
  InteractionManager,
  View
} from "react-native";
import Modal from "react-native-modal";
import { PText, HText, Button } from "./";
import { defaultRefs, getGlobalColors } from "../commonHelpers";

const X_MARGIN = 0;

const localStyle = StyleSheet.create({
  alertModalContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: getGlobalColors().blue,
    elevation: 3,
    shadowColor: getGlobalColors().offWhite,
    borderBottomWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 5,
      height: 10
    }
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%"
  },
  button1Style: {
    flex: 1,
    backgroundColor: getGlobalColors().darkGray
  },
  button2Style: {
    flex: 1,
    backgroundColor: getGlobalColors().lightBlue
  },
  button3Style: {
    flex: 1,
    backgroundColor: getGlobalColors().lightGray
  }
});

const CommonAlert = props => {
  const handleButton1Press = () => {
    if (!props.isFatalError) {
      props.hideAlert();
    }
    InteractionManager.runAfterInteractions(props.button1Press);
  };

  const handleButton2Press = () => {
    if (props.autoHide) {
      props.hideAlert();
    }

    InteractionManager.runAfterInteractions(props.button2Press);
  };

  const handleButton3Press = () => {
    if (props.autoHide) {
      props.hideAlert();
    }

    InteractionManager.runAfterInteractions(props.button3Press);
  };

  const renderButton2 = () => {
    const { button2Text, button3Text } = props;
    const mR = button3Text ? 1.25 : 0;

    if (button2Text) {
      return (
        <Button
          onPress={handleButton2Press}
          title={button2Text}
          buttonStyle={localStyle.button2Style}
          ml={0}
          mT={1.5}
          mR={mR}
        />
      );
    }

    return null;
  };

  const renderButton3 = () => {
    const { button3Text, button3Style, button3TextColor } = props;

    if (button3Text) {
      return (
        <Button
          onPress={handleButton3Press}
          title={button3Text}
          buttonStyle={[localStyle.button3Style, button3Style]}
          color={button3TextColor}
          ml={0}
          mT={1.5}
          mR={button3Text ? 1.25 : 0}
        />
      );
    }

    return false;
  };

  const handleHideAlert = () => {
    const { handleBackdrop, hideAlert } = props;

    if (handleBackdrop) {
      hideAlert();
    }
  };

  const {
    isVisible,
    title,
    body,
    button1Text,
    button2Text,
    animationIn,
    animationOut,
    titleTextColor,
    bodyTextColor
  } = props;

  const handleOnModalHide = () => {
    const { clearAlert, onModalHide } = props;

    onModalHide();
    clearAlert();
  };

  const mR = button2Text !== "" ? 1.25 : 0;

  return (
    <Modal
      onBackButtonPress={handleHideAlert}
      onBackdropPress={handleHideAlert}
      isVisible={isVisible}
      onModalHide={handleOnModalHide}
      animationInTiming={200}
      animationOutTiming={200}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      animationIn={animationIn}
      animationOut={animationOut}
      useNativeDriver={false}
    >
      <View style={localStyle.alertModalContainer}>
        <HText
          textAlign={"center"}
          center
          mL={X_MARGIN}
          mR={X_MARGIN}
          mB={5}
          text={title}
          color={titleTextColor}
          size={1}
        />

        {!!body && (
          <PText
            textAlign={"center"}
            mL={X_MARGIN}
            mR={X_MARGIN}
            mB={2.5}
            text={body}
            color={bodyTextColor}
            size={1}
          />
        )}

        <View style={localStyle.buttonContainer}>
          <Button
            onPress={handleButton1Press}
            title={button1Text}
            buttonStyle={localStyle.button1Style}
            mR={mR}
            mT={1.5}
          />
          {renderButton2()}
          {renderButton3()}
        </View>
      </View>
    </Modal>
  );
};

CommonAlert.propTypes = {
  isVisible: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  button1Text: PropTypes.string,
  button2Text: PropTypes.string,
  button3Text: PropTypes.string,
  button1Press: PropTypes.func,
  button2Press: PropTypes.func,
  button3Press: PropTypes.func,
  onModalHide: PropTypes.func,
  isFatalError: PropTypes.bool,
  autoHide: PropTypes.bool,
  handleBackdrop: PropTypes.bool,
  hideAlert: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired,
  animationIn: PropTypes.string,
  animationOut: PropTypes.string,
  titleTextColor: PropTypes.string,
  bodyTextColor: PropTypes.string,
  button3TextColor: PropTypes.string,
  button3Style: ViewPropTypes.style
};

CommonAlert.defaultProps = {
  isVisible: false,
  title: "",
  body: "",
  button1Text: "Okay",
  button2Text: "",
  button3Text: "",
  button1Press: defaultRefs.nullFunc,
  button2Press: defaultRefs.nullFunc,
  button3Press: defaultRefs.nullFunc,
  autoHide: true,
  onModalHide: PropTypes.nullFunc,
  isFatalError: false,
  handleBackdrop: true,
  animationIn: "fadeIn",
  animationOut: "fadeOut",
  titleTextColor: "white",
  bodyTextColor: "lightGray",
  button3TextColor: "blue",
  button3Style: defaultRefs.emptyObj
};

export { CommonAlert };