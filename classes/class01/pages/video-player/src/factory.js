import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";


const factory = {
    async initialize(){
        return Controller.initialize({
            view: new View({}),
            service: new Service({})
        })
    }
}

export default factory;