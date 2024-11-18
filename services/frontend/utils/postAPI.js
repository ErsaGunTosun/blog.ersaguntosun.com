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

export async function DeletePost(id, router){
    let status = "error";
    await axios({
        method:"delete",
        url:`http://localhost:8080/api/posts/${id}`,
        withCredentials:true,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    }).then((res)=>{
        console.log(res)
        if(res.status == 200){
            status = "success";
        }
    }
    ).catch((err)=>{
        console.log(err)
    })
    
    return status;
}

export async function UpdatePost(id,t,c){
    await axios({
        method:"put",
        url:`http://localhost:8080/api/posts/${id}`,
        withCredentials:true,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        data:{
            title:t,
            content:c
        }
    }).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })
}



