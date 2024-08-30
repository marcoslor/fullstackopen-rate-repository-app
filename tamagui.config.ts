import { config } from '@tamagui/config/v2';
import { Platform } from 'react-native';
import { createFont, createTamagui } from 'tamagui';

const family = Platform.select({
  ios: 'Arial',
  android: 'Roboto',
  default: 'System',
});

const fontSizes = {
  1: 11,
  2: 12,
  3: 13,
  4: 14,
  5: 16,
  6: 18,
  7: 20,
  8: 22,
  9: 30,
  10: 42,
  11: 52,
  12: 62,
  13: 72,
  14: 92,
  15: 114,
  16: 124,
} as const;

const font = createFont({
  family,
  size: fontSizes,
});

const appConfig = createTamagui({
  ...config,
  defaultTheme: 'dark',
  fonts: {
    body: font,
    heading: font
  },
  themes: {
    dark: {
      ...config.themes.dark,
      '$error': '$red8', 
    },
    light: {
      ...config.themes.light,
      '$error': '$red8', 
    },
  },
  media: {
    xs: { maxWidth: 660 },
    gtXs: { minWidth: 660 + 1 },
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    md: { maxWidth: 980 },
    gtMd: { minWidth: 980 + 1 },
    lg: { maxWidth: 1120 },
    gtLg: { minWidth: 1120 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
