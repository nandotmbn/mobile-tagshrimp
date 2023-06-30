import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeStack from "./HomeStack";
import Setting from "../screens/active/setting";
import History from "../screens/active/history";
import NotificationTab from "../screens/active/notification";
import PlansTab from "../screens/active/plans";

const Tab = createMaterialBottomTabNavigator();

export default function Active() {
	return (
		<Tab.Navigator shifting={true}>
			<Tab.Screen
				name="HomeTab"
				component={HomeStack}
				options={{
					tabBarLabel: "Beranda",
					tabBarColor: "#7b00ff",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="home" size={24} color="white" />
					),
				}}
			/>
			<Tab.Screen
				name="HistoryTab"
				component={History}
				options={{
					tabBarLabel: "Riwayat",
					tabBarColor: "#7b00dd",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="history" size={24} color="white" />
					),
				}}
			/>
			<Tab.Screen
				name="NotificationTab"
				component={NotificationTab}
				options={{
					tabBarLabel: "Notifikasi",
					tabBarColor: "#7b00aa",
					tabBarIcon: ({ color }) => (
						<Ionicons name="notifications" size={24} color="white" />
					),
				}}
			/>
			<Tab.Screen
				name="PlanTab"
				component={PlansTab}
				options={{
					tabBarLabel: "Plan",
					tabBarColor: "#7b0088",
					tabBarIcon: ({ color }) => (
						<FontAwesome name="tags" size={24} color="white" />
					),
				}}
			/>
			<Tab.Screen
				name="SettingTab"
				component={Setting}
				options={{
					tabBarLabel: "Pengaturan",
					tabBarColor: "#7b0066",
					tabBarIcon: ({ color }) => (
						<Ionicons name="settings-sharp" size={24} color="white" />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
