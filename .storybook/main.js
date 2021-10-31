module.exports = {
  stories: ['../src/components/**/stories.tsx'],
  addons: ['@storybook/addon-essentials'],

  webpackFinal: (config) => {//to consider /src as root
    config.resolve.modules.push(`${process.cwd()}/src`)
    return config
  }
}
