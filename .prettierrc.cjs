module.exports = {
  plugins: ["./node_modules/prettier-plugin-svelte"],
  overrides: [
    {
      files: "*.svelte",
      options: { parser: "svelte" },
    },
  ],
  semi: false,
  singleQuote: true,
}
