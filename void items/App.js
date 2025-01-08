import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GalioProvider, Block } from "galio-framework";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import OnboardingStack from './argon-react-native-master/argon-react-native-master/navigation/Screens'; // Import only OnboardingStack

import { Images, articles, argonTheme } from "./argon-react-native-master/argon-react-native-master/constants";

const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];
articles.map((article) => assetImages.push(article.image));

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Load resources
        await loadResources();
        await Font.loadAsync({
          ArgonExtra: require("./assets/font/argon.ttf"),
        });
      } catch (error) {
        console.warn("Error loading resources:", error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepareApp();
  }, []);

  const loadResources = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <GalioProvider theme={argonTheme}>
        <Block flex>
          <OnboardingStack />
        </Block>
      </GalioProvider>
    </NavigationContainer>
  );
}

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
