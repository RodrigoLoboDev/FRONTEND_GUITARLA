import { StateCreator } from 'zustand'
import { Blog } from "../types";


// type del state
export type BlockSliceType = {
    blogs: Blog[]
    blog: Blog
    loadBlogs: (blogs: Blog[]) => void
    loadBlog: (blog: Blog) => void
}

// Nuestro hook
// set - para modificar el state
// get - para tomar el state
export const createBlockSlice : StateCreator<BlockSliceType> = (set) => ({
    blogs: [],
    blog: {} as Blog,
    loadBlogs: (blogs) => {
        set(() => ({
          blogs
        }))
    },
    loadBlog: (blog) => {
        set(() => ({
            blog
        }))
    },
})