"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteUtils = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class RouteUtils {
    static init(app, currentDir, folder) {
        return new Promise((resolve, reject) => {
            try {
                const folderName = path_1.default.join(currentDir, folder);
                fs_1.default.readdirSync(folderName).forEach((dir) => {
                    var routeDir = path_1.default.join(folderName, dir);
                    fs_1.default.readdirSync(routeDir).forEach((file) => {
                        let fullPath = path_1.default.join(routeDir, file);
                        if (fullPath.includes(".ts") || fullPath.includes(".js")) {
                            let pathName = fullPath.toLowerCase().replace('.ts', '').replace('.js', '').split('\\').join('/');
                            console.log(pathName);
                        }
                        // console.log("TESTING ",fullPath.toLowerCase(),['.js', '.ts'].includes(fullPath.toLowerCase()), 
                        //     fullPath.toLowerCase().includes(['.ts','.js'])
                        // )
                    });
                });
                resolve();
            }
            catch (error) {
                console.log("Error", error);
                reject();
            }
        });
    }
}
exports.RouteUtils = RouteUtils;
