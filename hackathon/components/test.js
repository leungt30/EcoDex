import { Text} from 'react-native';

export function MyComponent(props) {
    // Extract properties from the props object
    const { text } = props;

    
  
    // Return the created element
    return (<Text>{text}</Text>)
  }

export default MyComponent