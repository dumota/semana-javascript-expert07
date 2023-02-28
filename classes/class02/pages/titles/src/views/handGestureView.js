
export default class HandGestureView {

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