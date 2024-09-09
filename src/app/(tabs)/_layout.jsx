import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { Image, Text, View } from "react-native";

const TabIcon = ({ color, focused, icon, name }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? " font-psemibold " : " font-pregular "}`}
        style={{
          color: color,
          fontSize: 12,
          marginTop: 3,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#0F6FFF",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#010822",
            borderTopWidth: 0.5,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                name="Home"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="todo"
          options={{
            title: "Todo",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.todo}
                name="Todo"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="diet"
          options={{
            title: "Diet",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.food}
                name="Diet"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="finance"
          options={{
            title: "Finance",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.money}
                name="Finance"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: "News",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.news}
                name="News"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="challenge"
          options={{
            title: "75 hard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.challenge}
                name="75 hard"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
