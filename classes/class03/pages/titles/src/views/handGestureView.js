
export default class HandGestureView {

    #handsCanvas = document.querySelector('#hands')
    #canvasContext = this.#handsCanvas.getContext('2d')

    constructor() {
        this.#handsCanvas.width = globalThis.screen.availWidth
        this.#handsCanvas.height = globalThis.screen.availHeight
    }

    //para limpar as imagens feitas pela apicanvas como um apagador mesmo

    clear() {
        this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
    }

    //recebe as mãos do tesnsor flow(lib)
    drawResults(hands) {
        console.log({ hands });
        for (const { keypoints, handedness } of hands) {
            if (!keypoints) continue;

            this.#canvasContext.fillStyle = handedness === 'Left' ? 'red' : 'green'
            this.#canvasContext.strokeStyle = "white"
            this.#canvasContext.lineWidth = 8
            this.#canvasContext.lineJoin = "round"

            this.#drawPoints(keypoints)
        }
    }

    //function para desenhar as juntas
    #drawPoints(keypoints) {
        for (const { x, y } of keypoints) {
            this.#canvasContext.beginPath()
            const newX = x - 2
            const newY = y - 2
            const radius = 3
            const startAngle = 0
            const endAngle = 2 * Math.PI

            this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle)
            this.#canvasContext.fill()
        }
    }

    loop(fn) {
        //função que excuta 60 vezes por segundo requestanimationFrame do js
        requestAnimationFrame(fn)
    }

    scrollPage(top) {
        scroll({
            top,
            behavior: "smooth"
        })
    }
}