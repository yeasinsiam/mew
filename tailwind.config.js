import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
} from "tailwindcss-scoped-preflight";

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "aaf-", // 👈 adds prefix to all utilities
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  // corePlugins: {
  //   preflight: false,
  // },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer("#aaf"),
    }),
  ],
};
