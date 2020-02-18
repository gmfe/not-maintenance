export const GMTOOL_CLI_PREFFIX = '[gmtool] -- '


export enum ProjectTypes {
  webApp = 'web-app',
  webAppLib = 'web-app-library',
}

export const PROJECT_TYPES = [
  ProjectTypes.webApp,
  `${ProjectTypes.webAppLib} [依赖库]`,
];


export enum ProjectConfigableServices {
  esLint = 'eslint',
  default = 'default',
  webpack = 'webpack',
  typescript = 'typescript',
}

export const PROJECT_CONFIGABLE_SERVICES = [
  ProjectConfigableServices.esLint,
  ProjectConfigableServices.webpack,
  ProjectConfigableServices.typescript,
];