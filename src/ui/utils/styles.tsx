import React, { useMemo, useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { setTheme } from '../../store/themeReducer';
import CustomText from '../components/CustomTextComp';

export type ThemeType = {
	backgroundColor: string;
	mainColor: string;
};

export const useTheme = (currentTheme: boolean) => {
	const theme: ThemeType = useMemo(() => {
		const tomatoTheme: ThemeType = {
			backgroundColor: 'tomato',
			mainColor: 'white',

		};

		const seaTheme: ThemeType = {
			backgroundColor: 'darkseagreen',
			mainColor: 'black',
		};

		return currentTheme ? tomatoTheme : seaTheme;
	}, [currentTheme]);

	return theme;
};

export const createStyleSheet = (currentTheme: ThemeType, shape: (a: ThemeType) => StyleSheet.NamedStyles<any>) => {
	const themedShape = shape(currentTheme);
	return StyleSheet.create(themedShape);
};

const shapeTest = (theme: ThemeType) => ({
	main: {
		flex: 1,
		backgroundColor: theme.backgroundColor,
	},
	text: {
		color: theme.mainColor,
	},
});

const Test = () => {
	const theme = useAppSelector((state) => state.themeReducer.currentTheme);
	const [isTomato, setIsTomato] = useState(theme);
	const dispatch = useAppDispatch();

	const toggleSwitch = () => {
		dispatch(setTheme(!isTomato));
		setIsTomato((previousState) => !previousState);
	};

	const themeStyle = useTheme(isTomato);
	const stylesTest = createStyleSheet(themeStyle, shapeTest);

	return (
		<View style={stylesTest.main}>
			<View
				style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
			>
				<CustomText style={stylesTest.text}>
					Tomato theme
				</CustomText>
				<Switch
					style={{ marginLeft: 20 }}
					trackColor={{ false: '#767577', true: 'grey' }}
					thumbColor={'white'}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isTomato}
				/>
			</View>

		</View>
	);
};

export default Test;
