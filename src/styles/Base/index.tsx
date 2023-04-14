import { Dimensions } from 'react-native';

const BRAND_HUE = 210;
const BRAND_SATURATION = 70;
const BRAND_LIGHTNESS = 50;

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
} as const;

export const colors = {
  light: {
    brand: `hsl(${BRAND_HUE}, ${BRAND_SATURATION}%, ${BRAND_LIGHTNESS}%)`,
    text1: `hsl(${BRAND_HUE}, ${BRAND_SATURATION}% ,10%)`,
    text2: `hsl(${BRAND_HUE}, 30%, 30%)`,
    text3: `hsl(${BRAND_HUE}, 20%, 50%)`,
    surface1: `hsl(${BRAND_HUE}, 25%, 90%)`,
    surface2: `hsl(${BRAND_HUE}, 20%, 99%)`,
    surface3: `hsl(${BRAND_HUE}, 20%, 92%)`,
    surface4: `hsl(${BRAND_HUE}, 20%, 85%)`,
  },
  dark: {
    brand: `hsl(${BRAND_HUE}, ${BRAND_SATURATION / 2}%, ${
      BRAND_LIGHTNESS / 1.5
    }%)`,
    text1: `hsl(${BRAND_HUE}, 15%, 85%)`,
    text2: `hsl(${BRAND_HUE}, 5%, 65%)`,
    text3: `hsl(${BRAND_HUE}, 5%, 45%)`,
    surface1: `hsl(${BRAND_HUE}, 10%, 10%)`,
    surface2: `hsl(${BRAND_HUE}, 10%, 15%)`,
    surface3: `hsl(${BRAND_HUE}, 5%, 20%)`,
    surface4: `hsl(${BRAND_HUE}, 5%, 25%)`,
  },
} as const;

export const fontSizing = {
  xs: 9,
  sm: 10.5,
  base: 12,
  lg: 13.5,
  xl: 15,
  xl2: 18,
  xl3: 22.5,
  xl4: 27,
  xl5: 36,
} as const;

export const layoutSizing = {
  s1: 3,
  s2: 6,
  s3: 9,
  s4: 12,
  s5: 15,
  s6: 18,
  s7: 21,
  s8: 24,
  s9: 27,
  s10: 30,
  s11: 33,
  s12: 36,
  s14: 42,
  s16: 48,
} as const;
