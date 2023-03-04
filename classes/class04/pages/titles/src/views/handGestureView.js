
export default class HandGestureView {

    #handsCanvas = document.querySelector('#hands')
    #canvasContext = this.#handsCanvas.getContext('2d')
    #fingerLookupIndices

    constructor({ fingerLookupIndices }) {
        this.#handsCanvas.width = globalThis.screen.availWidth
        this.#handsCanvas.height = globalThis.screen.availHeight
        this.#fingerLookupIndices = fingerLookupIndices
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

            this.#canvasContext.fillStyle = handedness === "Left" ? "rgb(44, 212, 103)" : "rgb(44, 212, 103)"
            this.#canvasContext.strokeStyle = "white"
            this.#canvasContext.lineWidth = 8
            this.#canvasContext.lineJoin = "round"

            //jutas das mãos
            this.#drawPoints(keypoints)

            //dedos
            this.#drawFingersAndHoverElements(keypoints)
        }
    }

    clickOnElements(x, y) {
        const element = document.elementFromPoint(x, y)
        if (!element) return;
        const rect = element.getBoundingClientRect()
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: rect.left + y,
            clientY: rect.top + y,
        })

        element.dispatchEvent(event)
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

    //fazer com que a mão consiga fazer o hover nos elementos
    #drawFingersAndHoverElements(keypoints) {

        const fingers = Object.keys(this.#fingerLookupIndices)
        for (const finger of fingers) {
            console.log({ finger });
            const points = this.#fingerLookupIndices[finger].map(
                index => keypoints[index]
            )
            console.log(points);

            //path é uma funciton 'atrinuto html'
            const region = new Path2D()
            //[0] é a oalma da mão
            const [{ x, y }] = points
            region.moveTo(x, y)
            for (const point of points) {
                region.lineTo(point.x, point.y)
            }

            this.#canvasContext.stroke(region)
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