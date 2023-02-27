import Camera from "../../../shared/camera.js";
import { supportsWorkerType } from "../../../shared/util.js";
import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

async function getWroker() {
    if (supportsWorkerType) {
        console.log('suporta');
        const worker = new Worker('./src/worker.js', { type: 'module' })
        return worker;
    }

    const workerMock = {
        async postMessage() { },
        onmessage(msg) { }
    }
    console.log('nao suportas');
    return workerMock;

}

const worker = await getWroker()
worker.postMessage('hey from factory!')

const camera = await Camera.init();


const factory = {
    async initialize() {
        return Controller.initialize({
            view: new View({}),
            service: new Service({})
        })
    }
}

export default factory;