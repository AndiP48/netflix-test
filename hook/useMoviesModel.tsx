import { create } from "zustand"

interface Variable  {
    movieid?: string
    isOpen: boolean
    openModel: (prop: string) => void
    closeModel: () => void
}


const useMoviesModel = create<Variable>((set) => ({
    movieid: undefined,
    isOpen: false,
    openModel: (prop: string) => set({isOpen: true, movieid: prop}),
    closeModel: () => set({isOpen: false, movieid: undefined}),
}))

export default useMoviesModel;