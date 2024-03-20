"use client";

import { Lobster, Raleway, Noto_Serif } from "next/font/google";
import { ThemeProvider } from "@material-tailwind/react";

import "./globals.css";

const lobster = Lobster({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--lobster",
});
const raleway = Raleway({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--raleway",
});
const notoSerif = Noto_Serif({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--notoSerif",
});

export default function RootLayout({ children }) {
  const customTheme = {
    button: {
      valid: {
        colors: ["stm-red"],
      },
      styles: {
        variants: {
          outlined: {
            white: {
              hover: "hover:bg-stm-red hover:border-stm-red",
            },
            black: {
              hover: "hover:bg-stm-red hover:text-white hover:border-stm-red",
            },
            "stm-red": {
              border: "border border-stm-red",
              color: "text-stm-red ",
              hover: "hover:bg-stm-red hover:text-white hover:border-white",
            },
          },
        },
      },
    },
    input: {
      valid: {
        colors: ["stm-red"],
      },
      styles: {
        variants: {
          outlined: {
            colors: {
              input: {
                "stm-red": {
                  color: "text-stm-red",
                  borderColor: "border-stm-red",
                  borderColorFocused: "focus:border-stm-red",
                },
              },
              label: {
                "stm-red": {
                  color: "text-stm-red peer-focus:text-stm-red",
                  before:
                    "before:border-stm-red peer-focus:before:!border-stm-red",
                  after:
                    "after:border-stm-red peer-focus:after:!border-stm-red",
                },
              },
            },
          },
        },
      },
    },
    select: {
      valid: {
        colors: ["stm-red"],
      },
      styles: {
        variants: {
          outlined: {
            colors: {
              select: {
                "stm-red": {
                  close: {
                    borderColor: "border-blue-gray-200",
                  },
                  open: {
                    borderColor: "border-stm-red",
                    borderTopColor: "border-t-transparent",
                  },
                  withValue: {
                    borderColor: "border-stm-red",
                    borderTopColor: "border-t-transparent",
                  },
                },
              },
              label: {
                "stm-red": {
                  close: {
                    color: "text-stm-red",
                    before: "before:border-transparent",
                    after: "after:border-transparent",
                  },
                  open: {
                    color: "text-stm-red",
                    before: "before:border-stm-red",
                    after: "after:border-stm-red",
                  },
                  withValue: {
                    color: "text-stm-red",
                    before: "before:border-stm-red",
                    after: "after:border-stm-red",
                  },
                },
              },
            },
          },
        },
      },
    },
    iconButton: {
      valid: {
        colors: ["stm-red"],
      },
      styles: {
        variants: {
          outlined: {
            "stm-red": {
              border: "border border-stm-red",
              color: "text-stm-red",
              hover: "hover:bg-stm-red hover:text-white",
              focus: "focus:ring focus:ring-white/50",
              active: "active:opacity-[0.85]",
            },
          },
        },
      },
    },
  };

  return (
    <html lang="en">
      <ThemeProvider value={customTheme}>
        <body
          className={`${raleway.variable} ${lobster.variable} ${notoSerif.variable} font-sans`}
        >
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
