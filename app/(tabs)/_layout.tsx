import { Tabs } from "expo-router";
import MaterialSymbol from "@/components/MaterialSymbol";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF7733",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <MaterialSymbol name="home" color={focused ? color : "#aaaaaa"} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Pesquisar",
          tabBarIcon: ({ color, focused }) => (
            <MaterialSymbol name="search" color={focused ? color : "#aaaaaa"} />
          ),
        }}
      />
    </Tabs>
  );
}
