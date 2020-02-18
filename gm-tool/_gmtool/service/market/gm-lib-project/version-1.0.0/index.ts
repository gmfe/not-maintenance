import GMService from '../../../service'
import { GM_LIB_PROJECT_LIBRARY_NAME } from '../index';






export default class extends GMService {

  public static _name = GM_LIB_PROJECT_LIBRARY_NAME;

  public static version = '1.0.0';

  public static dependencies = [
    'lodash',
    'react',
    'react-dom',
    'webpack',
  ]

  public static devDependencies = [
    'cross-env',
    '@types/lodash',
    '@types/react',
    '@types/react-dom',
    'html-webpack-plugin',
    'lodash-webpack-plugin',
    'mini-css-extract-plugin',
    'hard-source-webpack-plugin',
    'babel-loader',
    'css-loader',
    'less-loader',
    'url-loader',
  ]

  public static beforeInstall() {}

  public static afterInstall() {}
}