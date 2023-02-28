
export default class View {
    #btnInit = document.querySelector('#init')
    #statusElement = document.querySelector('#status')
    #videoFrameCanvas = document.createElement('canvas')
    #canvasContext = this.#videoFrameCanvas.getContext('2d', { willReadFrequently: true })


    //passando os dados da webcam aula parpi 1:45:25
    getVideoFrame(video) {
        const canvas = this.#videoFrameCanvas
        const [width, heigth] = [video.videoWidth, video.videoHeight]
        canvas.width = width
        canvas.height = heigth

        this.#canvasContext.drawImage(video, 0, 0, width, heigth)
        return this.#canvasContext.getImageData(0, 0, width, heigth)
    }

    enableButton() {
        this.#btnInit.disabled = false
    }

    configureOnBtnClick(fn) {
        this.#btnInit.addEventListener('click', fn)
    }
    log(text) {
        this.#statusElement.innerHTML = text
    }
}