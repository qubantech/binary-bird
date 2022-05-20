import Camera from './camera.module/camera.module';
import Profile from './profile.module/profile.module';
import qrHandler from "./camera.module/Handlers/qrHandler";
import MapModule from "./map.module/map.module";
import Redirect from "../app.shared/redirect";
import Auth from "../app.shared/auth";

export const CommonModules = [
    Profile,
    Camera,
    qrHandler,
    MapModule,
    Redirect,
    Auth
]