const bugsnagKey = process.env.EXPO_PUBLIC_BUGSNAG_KEY;
const easProjectId = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;
export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    bugsnag: {
      ...config.extra.bugsnag,
      apiKey: bugsnagKey,
    },
    eas: {
      ...config.extra.eas,
      projectId: easProjectId,
    },
  },
});
