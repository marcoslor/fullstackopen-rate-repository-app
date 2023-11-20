import { config } from '@tamagui/config/v2';
import { createFont, createTamagui } from 'tamagui';
import { Platform } from 'react-native';

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
  },
});

export type AppConfig = typeof appConfig;

declare module 'tamagui' {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  type TamaguiCustomConfig = AppConfig;
}

export default appConfig;
