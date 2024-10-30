import axios from "axios";
export async function CreatePost(){
    let posts = await axios({
        method: 'post',
        url: `http://localhost:8080/api/posts`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          },
        data: {
            title: "title",
            content: "content",
        }
    },)
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    return posts;

}