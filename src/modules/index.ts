import Camera from './camera.module/camera.module';
import Profile from './profile.module/profile.module';
import qrHandler from "./camera.module/Handlers/qrHandler";
import MapModule from "./map.module/map.module";
import Redirect from "../app.shared/redirect";
import Auth from "../app.shared/auth";
import SearchModule from "./search.module/search.module";
import NotificationModule from "./notification.module/notification.module";

export const CommonModules = [
    Profile,
    Camera,
    qrHandler,
    MapModule,
    Redirect,
    Auth,
    SearchModule,
    NotificationModule
]