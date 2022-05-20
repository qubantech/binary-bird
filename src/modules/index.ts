import Camera from './camera.module/camera.module';
import Profile from './profile.module/profile.module';
import qrHandler from "./camera.module/Handlers/qrHandler";
import MapModule from "./map.module/map.module";

export const CommonModules = [
    Profile,
    Camera,
    qrHandler,
    MapModule
]