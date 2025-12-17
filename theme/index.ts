import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";


const config = defineConfig({

  theme: {
    tokens: {
      colors: {
        system: {
          primary: { value: "#0077B6" },
          link: {value: "#00669cff"},
          btn: {value: "#84c5f0ff"},
          btnHover: {
              light: {value: "#006094ff"},
              dark: {value: "#91d5faff"}
          },
          light_dark: {
            value: "#252525" 
          },
          dark: { value: "#171717" },
          light: {value: "#fffefa"},
          header: {value: "#1453F1"}
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
  },
    globalCss: {
    body: {
      bg: "bg.light",
      color: "fg.light"
    },
    '.dark': {
        bg: "bg.dark",
        color: "bg.color"
    }
  },
});

export const system = createSystem(defaultConfig, config);
