import { POSTCSS_LIBRARY_NAME } from '../index';
import GMService from '../../../service'

export default class extends GMService {

  public static _name = POSTCSS_LIBRARY_NAME;

  public static version = '1.0.0';

  public static dependencies = [
    'precss',
    'autoprefixer',
    'postcss-modules'
  ]

  public static afterInstall() {
  }
}