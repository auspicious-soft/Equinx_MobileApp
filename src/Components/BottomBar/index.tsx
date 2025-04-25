import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {FC, useCallback, useRef} from 'react';
import {
  Animated,
  FlatList,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ICONS from '../../Assets/Icons';
import COLORS from '../../Utilities/Colors';
import {
  horizontalScale,
  isAndroid,
  verticalScale,
} from '../../Utilities/Metrics';
import CustomIcon from '../CustomIcon';
import {CustomText} from '../CustomText';
type Tab = {
  name: string;
  icon: any;
  activIcon: any;
  route: string;
};
const tabs: Tab[] = [
  {
    name: 'Home',
    icon: ICONS.homeTabIcon,
    activIcon: ICONS.homeActiveIcon,
    route: 'home',
  },
  {
    name: 'My Plan',
    icon: ICONS.myPlanTabIcon,
    activIcon: ICONS.myPlanActiveIcon,
    route: 'myPlan',
  },
  {
    name: 'Nutrition',
    icon: ICONS.nutritonTabIcon,
    activIcon: ICONS.nutritonActiveIcon,
    route: 'nutrition',
  },
  {
    name: 'Chat',
    icon: ICONS.chatTabIcon,
    activIcon: ICONS.chatActiveIcon,
    route: 'chats',
  },
  {
    name: 'Settings',
    icon: ICONS.settingsTabIcon,
    activIcon: ICONS.settingsActiveIcon,
    route: 'settings',
  },
];
const BottomTabBar: FC<BottomTabBarProps> = props => {
  const insets = useSafeAreaInsets();
  const {state, navigation, descriptors} = props;
  const currentRoute = state.routes[state.index].name;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const handleTabPress = useCallback(
    (tab: Tab) => {
      if (currentRoute !== tab.route) {
        navigation.navigate(tab.route as never);
      }
    },
    [navigation, currentRoute],
  );
  const renderTab = useCallback(
    ({item, index}: {item: Tab; index: number}) => {
      const isActive = currentRoute === item.route;
      return (
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress(item)}
          activeOpacity={0.7}>
          <CustomIcon
            Icon={isActive ? item.activIcon : item.icon}
            height={20}
            width={20}
          />
          <CustomText
            fontSize={10}
            fontWeight={isActive ? '500' : '400'}
            color={isActive ? '#000000' : COLORS.oldGrey}>
            {item.name}
          </CustomText>
        </TouchableOpacity>
      );
    },
    [handleTabPress, currentRoute, scaleValue],
  );
  return (
    // <View style={{backgroundColor: Colors.darkBLue}}>
      <View style={styles.container}>
        <View style={styles.tabWrapper}>
          <FlatList
            data={tabs}
            renderItem={renderTab}
            keyExtractor={item => item.route}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.tabBar, {}]}
            contentContainerStyle={styles.tabContent}
          />
        </View>
      </View>
    // </View>
  );
};
export default BottomTabBar;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(15),
    borderTopLeftRadius: verticalScale(15),
    borderTopRightRadius: verticalScale(15),
    borderColor: "#E0E0E0",
    borderWidth: 1.2
  },
  tabWrapper: {
    flex: 1,
    marginHorizontal: horizontalScale(10),
  },
  tabBar: {
    paddingTop: verticalScale(5),
    paddingBottom: isAndroid ? verticalScale(0) : verticalScale(5),
  },
  tabContent: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    zIndex: 99,
    gap: verticalScale(5),
  },
  middleButton: {
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderRadius: 30,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001, // Ensure it’s above the tab bar
    boxShadow: '0px 4px 12px 0px #FF003B80',
  },
});