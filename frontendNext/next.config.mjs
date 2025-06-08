/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    webpack: (config) => {
        config.module.rules.push({
          test: /\.geojson$/,
          use: ['json-loader']
        })
        return config
      }
};

export default nextConfig;