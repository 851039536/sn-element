/*
 * @Author: your name
 * @Date: 2020-11-25 10:37:09
 * @LastEditTime: 2021-07-28 08:12:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \sn-element\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "off"
  },
  overrides: [{
    files: [
      "**/__tests__/*.{j,t}s?(x)",
      "**/tests/unit/**/*.spec.{j,t}s?(x)"
    ],
    env: {
      jest: true
    }
  }]
};