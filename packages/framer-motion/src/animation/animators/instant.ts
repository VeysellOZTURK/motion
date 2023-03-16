import { AnimationPlaybackControls } from "../types"
import { animateValue } from "./js"
import { AnimationOptions } from "../types"
import { noop } from "../../utils/noop"

export function createInstantAnimation<V>({
    keyframes,
    delay: delayBy,
    onUpdate,
    onComplete,
}: AnimationOptions<V>): AnimationPlaybackControls {
    const setValue = () => {
        onUpdate && onUpdate(keyframes[keyframes.length - 1])
        onComplete && onComplete()

        /**
         * TODO: As this API grows it could make sense to always return
         * animateValue. This will be a bigger project as animateValue
         * is frame-locked whereas this function resolves instantly.
         * This is a behavioural change and also has ramifications regarding
         * assumptions within tests.
         */
        return {
            time: 0,
            speed: 1,
            play: noop<void>,
            pause: noop<void>,
            stop: noop<void>,
            then: (resolve: VoidFunction) => {
                resolve()
                return Promise.resolve()
            },
            complete: noop<void>,
            cancel: noop<void>,
        }
    }

    return delayBy
        ? animateValue({
              keyframes: [0, 1],
              duration: delayBy,
              onComplete: setValue,
          })
        : setValue()
}
