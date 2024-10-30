import axios from "axios";
export async function  getPosts() {
    let posts = await axios({
        method: 'get',
        url: `http://localhost:8080/api/posts`,
        withCredentials: false,
    },)
        .then((res) => {
            if (res.status === 200) {
                console.log(res)
            }
        }).catch((err) => {
            console.log(err)
        })

    return posts;
}
