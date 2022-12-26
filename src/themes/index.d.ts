export declare module '@mui/material/styles/createPalette' {
  // * Override `TypeBackground` for background palette
  interface TypeBackground {
    default: string
  }

  // * Override `primary` and `secondary` for background palette
  interface PaletteColor {
    lighten: string
    light: string
    main: string
    dark: string
    darken: string
    contrastText: string
  }

  interface Palette {
    link: string
  }

  interface PaletteOptions {
    link: string
  }

  // *  allow configuration using `createTheme`
  interface SimplePaletteColorOptions {
    lighten?: string
    light?: string
    main: string
    dark?: string
    darken?: string
    contrastText?: string
  }
}

export declare module '@mui/material/styles' {
  interface TypographyVariants {
    label: React.CSSProperties
  }

  // * ================================================================================
  // *  allow configuration using `createTheme`
  // * ================================================================================
  interface TypographyVariantsOptions {
    label?: React.CSSProperties
  }
}

// * ================================================================================
// *  Update the Typography's variant prop options
// * ================================================================================
export declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    label: true
  }
}

// * ================================================================================
// *  Update the Button's variant prop options
// * ================================================================================
export declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    circle: true
  }
}

export declare module '@mui/icons-material' {
  interface SvgIconPropsColorOverrides {
    background: true
  }
}
