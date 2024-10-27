import { Tabs } from "expo-router";
import MaterialSymbol from "@/components/MaterialSymbol";
import { StatusBar, StyleSheet, Text } from "react-native";
import { useEffect } from "react";

export default function TabLayout() {
  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF7733",
        tabBarStyle: {
          height: 52,
          backgroundColor: "#ffffff",
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={[styles.tabBarLabel, styles.tabBarLabelFocused]}>
                  Início
                </Text>
              );
            }
            return <Text style={styles.tabBarLabel}>Início</Text>;
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialSymbol name="home" color={focused ? color : "#aaaaaa"} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={[styles.tabBarLabel, styles.tabBarLabelFocused]}>
                  Pesquisar
                </Text>
              );
            }
            return <Text style={styles.tabBarLabel}>Pesquisar</Text>;
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialSymbol name="search" color={focused ? color : "#aaaaaa"} />
          ),
        }}
      />
      <Tabs.Screen
        name="newPost"
        options={{
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={[styles.tabBarLabel, styles.tabBarLabelFocused]}>
                  Criar novo
                </Text>
              );
            }
            return <Text style={styles.tabBarLabel}>Criar novo</Text>;
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialSymbol
              name="add_box"
              color={focused ? color : "#aaaaaa"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={[styles.tabBarLabel, styles.tabBarLabelFocused]}>
                  Mensagens
                </Text>
              );
            }
            return <Text style={styles.tabBarLabel}>Mensagens</Text>;
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialSymbol name="chat" color={focused ? color : "#aaaaaa"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={[styles.tabBarLabel, styles.tabBarLabelFocused]}>
                  Perfil
                </Text>
              );
            }
            return <Text style={styles.tabBarLabel}>Perfil</Text>;
          },
          tabBarIcon: ({ color, focused }) => (
            <MaterialSymbol
              name="account_circle"
              color={focused ? color : "#aaaaaa"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    marginBottom: 4,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "bold",
    color: "#aaaaaa",
  },
  tabBarLabelFocused: {
    color: "#FF7733",
  },
});
