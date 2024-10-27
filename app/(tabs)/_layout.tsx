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
      <Tabs.Screen
        name="newPost"
        options={{
          title: "Criar novo",
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
          title: "Mensagens",
          tabBarIcon: ({ color, focused }) => (
            <MaterialSymbol name="chat" color={focused ? color : "#aaaaaa"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
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
