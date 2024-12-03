import axios from "axios";

// User
export async function Logout() {
    try {
        let status = await axios({
            method: 'get',
            url: `http://localhost:8080/api/auth/logout`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return status;
    }
    catch (err) {
        console.log(err)
    }
}

export async function Verify() {
    try {
        let status = axios({
            method: 'get',
            url: `http://localhost:8080/api/auth/verify`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        },)
        
        return status;
    }
    catch (err) {
        console.log(err)
    }
}


// Post
export async function CreatePost(title, content, category, introduction) {
    let posts = await axios({
        method: 'post',
        url: `http://localhost:8080/api/posts`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        data: {
            title: title,
            introduction: introduction,
            content: content,
            categories: category
        }
    },)
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    return posts;

}

export async function DeletePost(id) {
    let status = "error";
    await axios({
        method: "delete",
        url: `http://localhost:8080/api/posts/${id}`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    }).then((res) => {
        console.log(res)
        if (res.status == 200) {
            status = "success";
        }
    }
    ).catch((err) => {
        console.log(err)
    })

    return status;
}

export async function UpdatePost(title, content, category, introduction, id) {
    await axios({
        method: "put",
        url: `http://localhost:8080/api/posts/${id}`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        data: {
            title: title,
            introduction: introduction,
            content: content,
            categories: category
        }
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

