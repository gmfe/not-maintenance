import * as path from 'path';
import GMToolLibraryServiceManager from "../../service-manager";





export const WEBPACK_LIBRARY_NAME = 'webpack';




// register multiple version
GMToolLibraryServiceManager.registerLibrary(WEBPACK_LIBRARY_NAME, '1.0.0', path.join(__dirname, './version-1.0.0'));
GMToolLibraryServiceManager.registerLibrary(WEBPACK_LIBRARY_NAME, '1.0.0', path.join(__dirname, './version-gm1.0'));