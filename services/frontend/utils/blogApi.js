import axios from "axios";
export async function  GetPosts() {
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
