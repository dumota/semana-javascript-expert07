
export default class Service {
    #model = null
    #faceLandmarksDetection
    constructor({ faceLandmarksDetection }) {
        this.#faceLandmarksDetection = faceLandmarksDetection
    }

    async laodModel() {
        this.#model = await this.#faceLandmarksDetection.load(
            this.#faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
            { maxFaces: 1 }
        )
    }

    //função para saber se ele piscou ou não
    async handBlicked(video) {
        const predictions = await this.#estimateFaces(video)
        console.log({ predictions });
    }

    //função paa validar quantas faces temos no nosso video, camera
    #estimateFaces(video) {
        return this.#model.estimateFaces({
            input: video,
            returnTensors: false,
            flipHorizontal: true,
            predictIrises: true
        })
    }
}