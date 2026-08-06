import localFont from "next/font/local";

/**
 * Collletttivo's Ronzino — SIL Open Font License 1.1, see app/fonts/ronzino/LICENSE.txt.
 * https://github.com/collletttivo/ronzino
 */
export const ronzino = localFont({
  src: [
    { path: "./ronzino/Ronzino-Regular.woff2", weight: "400", style: "normal" },
    { path: "./ronzino/Ronzino-Oblique.woff2", weight: "400", style: "italic" },
    { path: "./ronzino/Ronzino-Medium.woff2", weight: "500", style: "normal" },
    { path: "./ronzino/Ronzino-MediumOblique.woff2", weight: "500", style: "italic" },
    { path: "./ronzino/Ronzino-Bold.woff2", weight: "700", style: "normal" },
    { path: "./ronzino/Ronzino-BoldOblique.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-ronzino",
  display: "swap",
});
