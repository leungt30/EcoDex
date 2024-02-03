import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Ecodex from '../screens/Ecodex'

const screens = {
    Home: {
        screen: Home
    },
    Profile: {
        screen: Profile
    },
    Ecodex: {
        screen: Ecodex 
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);