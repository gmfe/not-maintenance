import * as path from 'path';
import GMToolLibraryServiceManager from "../../service-manager";



export const GM_LIB_PROJECT_LIBRARY_NAME = 'gm-lib-project';


// register multiple version
GMToolLibraryServiceManager.registerLibrary(GM_LIB_PROJECT_LIBRARY_NAME, '1.0.0', path.join(__dirname, './version-1.0.0'));