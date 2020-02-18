import * as path from 'path';

import GMToolLibraryServiceManager from "../../service-manager";


export const POSTCSS_LIBRARY_NAME = 'postcss';


// resgister multiple version
GMToolLibraryServiceManager.registerLibrary(POSTCSS_LIBRARY_NAME, '1.0.0', path.join(__dirname, './version-1.0.0'));

