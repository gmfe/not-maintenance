import * as path from 'path';

import GMToolLibraryServiceManager from "../../service-manager";


export const TS_LIBRARY_NAME = 'typescript';


// resgister multiple version
GMToolLibraryServiceManager.registerLibrary(TS_LIBRARY_NAME, '1.0.0', path.join(__dirname, './version-1.0.0'));

