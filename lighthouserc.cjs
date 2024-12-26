module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000"],
      startServerCommand: "bun run start",
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "first-contentful-paint": ["warn", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 4000 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
