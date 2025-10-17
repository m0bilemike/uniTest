import { Container } from "@/components/Container";
import { Text, View } from "@/components/Themed";
import { Fonts } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <Container>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Explore
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
