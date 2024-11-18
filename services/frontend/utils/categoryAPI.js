import axios from 'axios';
export async function CreateCategory(name) {
    try{
        let category = await axios({
            method: 'post',
            url: `http://localhost:8080/api/categories`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            data: {
                name: name
            }
        })
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    catch(error){
        console.log(error)
    }
}