import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
