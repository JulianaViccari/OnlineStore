module.exports = {
  apps : [
    {
      name: "auth",
      script: "npx ts-node ../auth/src/main_api.ts"
    },
    {
      name: "checkout",
      script: "npx ts-node ../checkout/src/main_api.ts"
    },
    {
      name: "catalog",
      script: "npx ts-node ../catalog/src/main_api.ts"
    },
    {
      name: "freight",
      script: "npx ts-node ../freight/src/main_api.ts"
    }
  ],
};
