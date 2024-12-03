'use client';
import React from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';


function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    const router = useRouter();


    React.useEffect(() => {
        if(localStorage.getItem('token') != null){
          axios({
            method: 'get',
            url: `http://localhost:8080/api/auth/verify`,
            withCredentials: true,
            headers:{
                'Content-Type': 'application/json',
            }
          },
        )
            .then((res) => {
              if(res.status === 200){
                router.push('/admin')
              }
              else{
                localStorage.removeItem('token')
                router.push('/admin/login')
              }
            }).catch((err) => {
              console.log(err)
            })
        }
      },[])


    const login = (e) => {
        try {
            axios({
                method: 'post',
                url: `http://localhost:8080/api/auth/login`,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email: email,
                    password: password
                },
            })
                .then((res) => {
                    if(res.status === 200){
                        localStorage.setItem('token', res.data.token)
                        router.push('/admin')
                    }
                    else{
                        setError(true)
                    }
                }).catch((err) => {
                    setError(true)
                })
        }
        catch (err) {
            setError(true)
        }
    }

    const inputhandler = (e) => {
        if (e.target.id === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
    }

    return (
        <div className='w-full h-full'>
            <div className="flex xl:px-88 lg:px-28 md:px-12 px-4 h-full justify-center items-center">
                <div className='w-full py-6 px-48'>

                    <form className="input-box flex flex-col w-full p-4" action={login}>
                        <div className='text-center'>
                            <h1 className=" text-3xl font-semibold text-gray-900">Login</h1>
                            {error && <p className="text-red-500">Invalid email or password</p>}
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" id="email" value={email} onChange={inputhandler} className="bg-gray-50 border border-black text-gray-900 text-sm outline-none block w-full p-2.5" placeholder="email address" required />
                        </div>
                        <div className="mb-5 basis-1">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" id="password" value={password} onChange={inputhandler} className="bg-gray-50 border border-black text-gray-900 text-sm outline-none block w-full p-2.5" placeholder="password" required />

                        </div>
                        <div className="flex items-start mb-5 basis-1">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-black" />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">Remember me</label>
                        </div>
                        <button type="submit" className="text-white border bg-black hover:border-black hover:bg-white hover:text-black font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default LoginPage