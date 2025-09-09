module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react-hooks"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    env: { browser: true, es2021: true },
    rules: {
        "no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "off"
    }
};