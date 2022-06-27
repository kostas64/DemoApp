import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AnimationsScreen from '../screens/AnimationsScreen';
import AppStateScreen from '../screens/AppStateScreen';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawer from '../components/CustomDrawer';
import {colors} from '../utils/Colors';
import {ProjectStack} from './project.config.router';
import {Platform} from 'react-native';

const Drawer = createDrawerNavigator();

export const Router = () => {
  const drawerStyle = {
    drawerActiveBackgroundColor: colors.lightCyan,
    drawerActiveTintColor: colors.darkCyan,
    drawerInactiveTintColor: colors.black,
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        useLegacyImplementation //In case drawer doesn't close with onPress
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: {
            fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
            fontWeight: '700',
            fontSize: 15,
            marginLeft: -20,
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({color}) => {
              return <Icon name={'home'} size={24} color={color} />;
            },
            ...drawerStyle,
          }}
        />
        <Drawer.Screen
          name="Animations"
          component={AnimationsScreen}
          options={{
            drawerIcon: ({color}) => {
              return <Icon name={'animation'} size={24} color={color} />;
            },
            ...drawerStyle,
          }}
        />
        <Drawer.Screen
          name="AppState"
          component={AppStateScreen}
          options={{
            drawerIcon: ({color}) => {
              return (
                <MaterialIcon name={'state-machine'} size={24} color={color} />
              );
            },
            ...drawerStyle,
          }}
        />
        <Drawer.Screen
          name="Projects"
          component={ProjectStack}
          options={{
            drawerIcon: ({color}) => {
              return <MaterialIcon name={'github'} size={24} color={color} />;
            },
            ...drawerStyle,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
