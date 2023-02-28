

export default class Controller {
    #view
    #camera
    #worker
    #blinkCounter = 0
    constructor({ view, service, worker, camera }) {
        this.#view = view
        this.#camera = camera
        this.#worker = this.#configureWorker(worker)
        this.#view.configureOnBtnClick(this.onBtnStart.bind(this))
    }

    static async initialize(deps) {
        const contoller = new Controller(deps);
        contoller.log('not yet detecting eye blink! click in the button to start')
        return contoller.init()
    }

    //configuração para esperar os dados da api chegarem e só depois habilitar o botão
    #configureWorker(worker) {
        let ready = false
        worker.onmessage = ({ data }) => {
            if ('READY' === data) {
                console.log('worker is ready!');
                this.#view.enableButton()
                ready = true
                return;
            }
            const blinked = data.blinked
            this.#blinkCounter += blinked
            console.log('blicked', blinked);
        }

        return {
            send(msg) {
                if (!ready) return;
                worker.postMessage(msg)
            }
        }
    }

    async init() {
        console.log('init!!');
    }

    loop() {
        const video = this.#camera.video
        const img = this.#view.getVideoFrame(video)
        this.#worker.send(img)
        this.log(`detecting eye bling`)

        setTimeout(() => this.loop(), 100)
    }

    log(text) {
        const times = `      - blinked times:${this.#blinkCounter}`
        this.#view.log(`status: ${text}`.concat(this.#blinkCounter ? times : ''))
    }

    onBtnStart() {
        this.log('initializing detection ....')
        this.#blinkCounter = 0
        this.loop()
    }
}