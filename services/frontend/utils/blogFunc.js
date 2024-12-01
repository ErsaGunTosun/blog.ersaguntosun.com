import axios from "axios";

export async function GetPosts() {
    try {
        let posts = await axios({
            method: 'get',
            url: `http://localhost:8080/api/posts`,
            withCredentials: false,
        })

        return posts
    }
    catch (error) {
        console.log(error)
    }
}

export async function GetPost(id) {
    try {
        let post = await axios({
            method: "get",
            url: `http://localhost:8080/api/posts/${id}`,
            withCredentials: true
        })
        return post
    }
    catch (error) {
        console.log(error)
    }
}

export async function GetPostsWithID(id) {
    try {
        let posts = await axios({
            method: 'get',
            url: `http://localhost:8080/api/categories/` + id,
            withCredentials: true,
        })

        return posts
    }
    catch (err) {
        console.log(err)
    }
}

// Category 

export async function GetCategories() {
    try {
        let categories = await axios({
            method: 'get',
            url: `http://localhost:8080/api/categories`,
            withCredentials: true,
        })

        return categories
    }
    catch (error) {
        console.log(error)
    }
}

export async function GetCategoriesWithID(id) {
    try {
        let categories = await axios({
            method: "get",
            url: "http://localhost:8080/api/categories/posts/" + id,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        })


        return categories;
    }
    catch (e) {
        console.log(e)
    }
}

