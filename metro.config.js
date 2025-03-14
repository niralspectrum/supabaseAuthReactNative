const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Get default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Define additional custom configuration
const customConfig = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'], // Ensure CommonJS support for Reanimated
  },
};

// Merge custom config with default config
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Wrap with Reanimated Metro configuration
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
