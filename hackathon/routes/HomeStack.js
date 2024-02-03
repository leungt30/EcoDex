import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import PlantCollection from '../screens/PlantCollection'

const screens = {
    Home: {
        screen: Home
    },
    Profile: {
        screen: Profile
    },
    PlantCollection: {
        screen: PlantCollection
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);