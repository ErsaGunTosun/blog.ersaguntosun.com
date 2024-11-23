import axios from 'axios';

export async function GetCategories(id){
    try{
        let categories = await axios({
            method:"get",
            url:"http://localhost:8080/api/categories/posts/"+id,
            withCredentials:true,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
    
        return categories;
    }
    catch(e){
        console.log(e)
    }
}