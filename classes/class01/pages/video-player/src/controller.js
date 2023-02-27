
export default class Controller {
    constructor({}){
        
    }

    static async initialize(deps){
        const contoller = new Controller(deps);
        return contoller.init()
    }

    async init(){
        console.log('init!!');
    }
}