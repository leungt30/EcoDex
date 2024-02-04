import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Ecodex from "../screens/Ecodex";
import CameraComponent from "../components/CameraComponent";
import EcodexEntity from "../screens/EcodexEntity";
const screens = {
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
  Ecodex: {
    screen: Ecodex,
  },
  Camera: {
    screen: CameraComponent,
  },
  EcodexEntity: {
    screen: EcodexEntity,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
