const bugsnagKey = process.env.EXPO_PUBLIC_BUGSNAG_KEY;
export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    bugsnag: {
      apiKey: bugsnagKey,
    },
  },
});
