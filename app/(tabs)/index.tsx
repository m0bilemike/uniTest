import { Container } from '@/components/Container';
import { Text, View } from '@/components/Themed';
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <Container>

    <View style={styles.container}>
      <Text>Welcome!</Text>
      <FontAwesome6 name="heart" size={28} color={'red'} />
    </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
