const withSASS = require("@zeit/next-sass")();
const withTypescript = require("@zeit/next-typescript")();

module.exports = {
  withSASS,
  withTypescript,
  plugins: ["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error", // Проверяем правила хуков
    "react-hooks/exhaustive-deps": "warn", // Проверяем зависимости эффекта
  },
};
