const { NextFederationPlugin } = require('@module-federation/nextjs-mf');


const REMOTE_APP_URL = 'http://localhost:5000';

const remotes = (isServer) => {
  const location = isServer ? 'ssr' : 'chunks'
  return {
    // localModuleName: "remoteModuleName@host-file"
    exampleRemote: `remote@${REMOTE_APP_URL}/_next/static/${location}/remoteEntry.js`
  }
}

const nextConfig = {
  reactStrictMode: true,
  webpack(config, opts) {
    config.externals = [...config.externals, 'canvas', 'jsdom']
    const nextFederationPlugin = new NextFederationPlugin({
      name: 'cctools',
      remoteType: 'var',
      remotes: remotes(opts.isServer),
      filename: `static/${opts.isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
    })
    config.plugins.push(nextFederationPlugin)
    return config
  },
};
module.exports = nextConfig;