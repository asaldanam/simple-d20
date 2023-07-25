import { useState } from "react";
import { createObjectMutationObserver } from "../utils/createObjectMutationObserver";

export function useClassInstance<O extends object>(object: O) {
    const [instance, setInstance] = useState(createObjectMutationObserver(object, {
        onMutation(obj) {
            setInstance(obj)
        },
    }))

    return instance;
}