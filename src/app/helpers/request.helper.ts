import { IncomingHttpHeaders } from 'node:http';
import DeviceDetector from 'node-device-detector';
import { RequestOriginDevice } from '../entities/RequestOriginDevice';

export function getRequestOriginDevice(headers: IncomingHttpHeaders): RequestOriginDevice {
    const userAgent = headers['user-agent'];

    const detector = new DeviceDetector();
    const { os, client, device } = detector.detect(userAgent);

    const { type: clientType, name: clientName, engine: clientEngine, version: clientVersion } = client;
    const { type: deviceType, brand: deviceBrand } = device;

    return {
        clientType,
        clientName,
        clientEngine,
        clientVersion,
        deviceType,
        deviceBrand,
        os: os.short_name,
    };
}

// export function generateDeviceId(headers: IncomingHttpHeaders): string {
//     const deviceParams = getRequestOriginDevice(headers);
//     const device = object.values(deviceParams);
//
//     const uuid = uuidV5(d)
// }
