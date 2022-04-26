import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './custom-theme.json';
import Header from './components/shared/Header';
import HomeScreen from './components/HomeScreen';

export default () => {
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
				<Header />
				<HomeScreen />

			</ApplicationProvider>
		</>
	);
};

