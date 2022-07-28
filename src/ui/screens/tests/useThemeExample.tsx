import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store';
import { setTheme } from '../../../store/themeReducer';
import CustomText from '../../components/CustomTextComp';

export type ThemeType = {
  backgroundColor: string;
  mainColor: string;
};

const lightTheme: ThemeType = {
  backgroundColor: 'darkseagreen',
  mainColor: 'black',
};
const darkTheme: ThemeType = {
  backgroundColor: 'dimgrey',
  mainColor: 'white',
};

const createStyles = <S extends object, P = undefined>(callback: (theme: ThemeType, params: P) => S | StyleSheet.NamedStyles<S>) => {
  const useStyles = ((params) => {
    const isDarkTheme = useAppSelector((state) => state.themeReducer.currentTheme);

    const styles = React.useMemo(() => {
      const themeData = isDarkTheme ? darkTheme : lightTheme;

      return StyleSheet.create(callback(themeData, params));
    }, [isDarkTheme, params]);

    return styles;
  }) as P extends undefined ? () => S : (params: P) => S;

  return useStyles;
};

// Component.styles
const useStyles = createStyles((theme) => {
  const { backgroundColor, mainColor } = theme;
  return {
    root: {
      flex: 1,
      backgroundColor,
    },
    text: {
      color: mainColor,
    },
  };
});

// Component
const Component = () => {
  const isDarkTheme = useAppSelector((state) => state.themeReducer.currentTheme);
  const dispatch = useAppDispatch();

  const toggleSwitch = () => {
    dispatch(setTheme(!isDarkTheme));
  };

  const styles = useStyles();

  return (
    <View
      style={styles.root}
    >
      <View
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
      >
        <CustomText style={styles.text}>
          Dark theme
        </CustomText>
        <Switch
          style={{ marginLeft: 20 }}
          trackColor={{ false: '#767577', true: 'grey' }}
          thumbColor={'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkTheme}
        />
      </View>
    </View>
  );
};

export default Component;
