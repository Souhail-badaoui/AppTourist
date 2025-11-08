import { View } from 'react-native';
import BottomTabs from '../components/BottomTabs.jsx';
import HomeScreen from '../components/HomeScreen.jsx';
export default function Home() {
  return (
    <View style={{ flex: 1 }}>
    <HomeScreen />
    <BottomTabs />
    </View>
  );
}