module.exports = {
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: ["*.json", "*.jsonc", "wrangler.jsonc"],
      options: {
        trailingComma: "none",
        singleQuote: false,
      },
    },
  ],
};
