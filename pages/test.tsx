import React, { useCallback, useMemo } from "react"
import { create } from "zustand"
import { shallow } from "zustand/shallow"
import {map} from "lodash"

interface Variable {
    isOpen: boolean
    name: string
    toggleModel: () => void
    togglePush: () => void
}

const TestHook = create<Variable>((set, get) => ({
    isOpen: true,
    name: "Udin",
    toggleModel: () => set({ isOpen: !get().isOpen }),
    togglePush: () => set({ name: get().name + " Paok" })
}))

export default function Test() {
    // const { name, push } = TestHook((stale) => ({name: stale.name, push: stale.togglePush}), shallow)
    const name = TestHook(state => state.name)
    const push = TestHook(state => state.togglePush)

    return (
        <div>
            <p>{Date()}</p>
            <button onClick={push}>Push me</button>
            {name}
            <Separate />
        </div>
    )
}

function Separate() {
    const isOpen = TestHook(state => state.isOpen)

    const list = useMemo(() => ["1", "2"], []);

    return (
        <div>
            {map(list, (value, key) => (
                <Children key={key} num={value} />
            ))}
            <Child3 isOpen={isOpen} />
        </div>
    )
}

function Children({num} : {num: string}) {
    const toggle = TestHook(state => state.toggleModel);

    return (
        <div>
            <button onClick={toggle}>Click {num}</button>
        </div>
    )
}

// function Child2() {

//     const toggle = TestHook(stale => stale.toggleModel);

//     return (
//         <div>
//             <button onClick={toggle}>Click 2</button>
//         </div>
//     )
// }

function Child3({isOpen} : {isOpen : boolean}) {
    // const { isOpen } = TestHook()

    return (
        <div className={`${isOpen ? "block" : "hidden"}`}>
            <p>Paok</p>
        </div>
    )
}