import { StateCreator } from 'zustand'
import { Blog, DarftReview, Review } from "../types";


// type del state
export type BlockSliceType = {
    blogs: Blog[]
    blog: Blog
    draftReview: DarftReview
    reviews: Review[]
    loadBlogs: (blogs: Blog[]) => void
    loadBlog: (blog: Blog) => void
    loadDarftReview: (draftReview: DarftReview) => void
    loadReview: (reviews: Review[]) => void
}

// Nuestro hook
// set - para modificar el state
// get - para tomar el state
export const createBlockSlice : StateCreator<BlockSliceType> = (set) => ({
    blogs: [],
    blog: {} as Blog,
    draftReview: {
        name: "",
        content: "",
        rating: 0,
        blog: 0
    },
    reviews: [],
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
    loadDarftReview: (draftReview) => {
        set(() => ({
            draftReview
        }))
    },
    loadReview: (reviews) => {
        set(() => ({
            reviews
        }))
    }
})