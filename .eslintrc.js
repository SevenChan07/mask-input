module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": false,
    "node": true,
    "es6": true,
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "ecmaFeatures": {
    "arrowFunctions": true,
    "blockBindings": true,
    "classes": true,
    "defaultParams": true,
    "modules": true,
    "spread": true,
    "globalReturn": true,
  },
  "rules": {
    "valid-jsdoc": ["error", {
      "requireReturn": true,
      "requireReturnType": true,
      "requireParamDescription": true,
      "requireReturnDescription": true,
      "preferType": {
        "String": "string",
        "object": "Object",
      }
    }],
    "no-var": 1,
    "no-eval": "error",
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "no-console": ["error", {"allow": ["warn", "info"]}],
    "semi": ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "padded-blocks": ["error", "always"],
    "prefer-arrow-callback": [0, {"allowNamedFunctions": true}],
    "func-names": ["error", "never"],
    "no-use-before-define": [
      "error", {
        "functions": true,
        "classes": true
      }
    ],
    "max-nested-callbacks": [
      "error",
      5
    ],
    "react/prefer-stateless-function": ["off", {
      ignorePureComponents: true
    }],
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "padded-blocks": ["error", "never"],
  }
}