import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        system: {
          primary: { value: "#0077B6" },
          primary_light: {value: "#d0efffff"},
          red: { value: "#EF4444" },
          link: { value: "#ffffffff" },
          status: {
            unknown: {value: "#ffffffff" },
            low: {value: "rgba(46, 125, 50)"},
            medium: {value: "#f5872dff"},
            high: {value: "#e05151ff"},
            veryHigh: {value: "#B71C1C"}
          },
          light_dark: {
            value: "#252525",
          },
          dark: { value: "#171717" },
          light: { value: "#fffefa" },
        },

        bg: {
          light: { value: "#fffefa" },
          dark: { value: "#171717" },
        },

        fg: {
          light: { value: "#171923" }, // Texto principal claro
          dark: { value: "#E2E8F0" }, // Texto principal escuro
        },
      },
    },

    semanticTokens: {
      fontSizes: {
        baseXsRestSm: {
          value: {
            base: "{fontSizes.xs}",
            sm: "{fontSizes.sm}",
            md: "{fontSizes.sm}",
            lg: "{fontSizes.sm}",
            xl: "{fontSizes.sm}",
          },
        },

        baseSmRestMd: {
          value: {
            base: "{fontSizes.sm}",
            sm: "{fontSizes.md}",
            md: "{fontSizes.md}",
            lg: "{fontSizes.md}",
            xl: "{fontSizes.md}",
          },
        },

        baseSmRestXl: {
          value: {
            base: "{fontSizes.sm}",
            sm: "{fontSizes.xl}",
            md: "{fontSizes.xl}",
            lg: "{fontSizes.xl}",
            xl: "{fontSizes.xl}",
          },
        },

        baseMdRestXl: {
          value: {
            base: "{fontSizes.md}",
            sm: "{fontSizes.xl}",
            md: "{fontSizes.xl}",
            lg: "{fontSizes.xl}",
            xl: "{fontSizes.xl}",
          },
        },

        baseMdRestLg: {
          value: {
            base: "{fontSizes.md}",
            sm: "{fontSizes.lg}",
            md: "{fontSizes.lg}",
            lg: "{fontSizes.lg}",
            xl: "{fontSizes.lg}",
          },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg.light",
      color: "fg.light",
    },
    ".dark": {
      bg: "bg.dark",
      color: "bg.color",
    },
  },
});

export const system = createSystem(defaultConfig, config);
