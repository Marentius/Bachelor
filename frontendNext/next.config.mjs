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

// https://stackoverflow.com/questions/66087740/import-geojson-in-nextjs