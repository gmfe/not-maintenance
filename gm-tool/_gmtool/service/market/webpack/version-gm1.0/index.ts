import GMService from '../../../service'
import { WEBPACK_LIBRARY_NAME } from '../index';






export default class extends GMService {

  public static _name = WEBPACK_LIBRARY_NAME;

  public static version = 'gm1.0';

  public static dependencies = [
    'webpack',
  ]

  public static devDependencies = [
    'ts-loader',
    'happypack',
    'css-loader',
    'url-loader',
    'less-loader',
    'babel-loader',
    'postcss-loader',
    'html-webpack-plugin',
    'terser-webpack-plugin',
    'mini-css-extract-plugin',
    'add-asset-html-webpack-plugin',
  ]

  public static beforeInstall() {

  }
}