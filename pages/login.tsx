import { useCallback, useState } from "react"
import axios from "axios"
import { signIn } from "next-auth/react"

import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"

import { useRouter } from "next/router"

export default function LoginPage() {
    // useState
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [pswd, setPswd] = useState();
    const [isLogin, setIsLogin] = useState(false);

    // router
    const router = useRouter()

    // toogle for visiblePassword
    function togglePassword(prop: any) {
        const [isVisible, setVisiblePassword] = useState(prop);

        const change = useCallback(() => {
            setVisiblePassword((e: any) => !e)
        }, [setVisiblePassword])
        
        return [isVisible, change]
    }

    const [visiblePassword, triggerVisible] = togglePassword(false)

    // register credentials
    const register = useCallback(async () => {
        try {
            await axios.post("/api/register", {
                name,
                email,
                pswd
            })
        } catch(err) {
            console.error(err)
        }
    }, [name,email,pswd])

    // login with credentials
    const login = useCallback(async () => {
        try {
            const sign = await signIn("credentials", {
                email,
                pswd,
                callbackUrl: "/",
                redirect: false
            })

            if (sign?.ok) {
                router.push("/entrance")
            } else {
                throw new Error(sign?.error || "")
            }
            
        } catch(err) {
            console.error(err)
        }
    }, [email, pswd])

    console.log(isLogin)

    return (
        <>
        <main className="left-0 top-0 bg-thumbnail w-full bg-zinc-500 h-screen flex justify-center items-center">
            <div className="bg-black relative bg-opacity-80 w-2/6">
                <div className="block p-10">
                    {/* head */}
                    <div className="block overflow-hidden text-white"> 
                        <h1 className="text-3xl absolute bg-zinc-900 rounded-lg bg-opacity-80 p-3 -left-5 -top-5 font-medium">{(isLogin) ? "Login" : "Sign up"}</h1>
                        {(isLogin == false) && (
                            <div className="relative">
                                <input className="peer appearance-none pl-4 block valid:border-green-400 invalid:border-red-500 focus:border outline-none w-button bg-neutral-800 py-3 rounded-md mt-6" 
                                type="text"
                                required 
                                onChange={(e:any) => setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                                value={name} placeholder=" " />
                                <label className="absolute peer-focus:scale-75 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 -translate-y-4 inline-block top-3 z-10 left-4 transition-all origin-[0] text-gray-400" htmlFor="name">Name</label>
                            </div>
                        )}
                        <div className="relative">
                            <input type="email" required 
                            placeholder=" "
                            onChange={(e: any) => setEmail(e.target.value)} 
                            value={email}
                            className="peer appearance-none pl-4 block valid:border-green-400 invalid:border-red-500 focus:border outline-none w-button bg-neutral-800 py-3 rounded-md mt-3"  />
                            <label className="absolute peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75 scale-75 -translate-y-4 inline-block top-3 z-10 left-4 transition-all origin-[0] text-gray-400">Email/ Phone number</label>
                        </div>
                        <div className="relative">
                            <input type={(visiblePassword) ? "text" : "password"} required 
                            placeholder=" "
                            onChange={(e: any) => setPswd(e.target.value)} 
                            value={pswd}
                            className="peer appearance-none pl-4 block valid:border-green-400 invalid:border-red-500 focus:border outline-none w-button bg-neutral-800 py-3 rounded-md mt-3" />
                            <label className="absolute peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75 scale-75 -translate-y-4 inline-block top-3 z-10 left-4 transition-all origin-[0] text-gray-400">Password</label>
                        </div>
                        <button className="bg-red-600 text-white w-[99%] text-center rounded-md py-2 mt-4" 
                        onClick={(isLogin) ? login : register}>
                            {(isLogin) ? "Login" : "Register"}</button>
                        {/* another way to login */}
                        <div className="my-8 w-[99%]">
                            <div className="relative block ml-auto mr-auto text-center">
                                <p className="absolute left-0 bg-gray-700 bg-opacity-80 h-1 w-2/6 rounded-md"></p>
                                <p className="inline-block -translate-y-3 bg-none text-zinc-400">Other Providers</p>
                                <p className="absolute right-0 top-0 bg-gray-700 bg-opacity-80 rounded-md h-1 w-2/6"></p>
                            </div>
                            <div className="text-center text-3xl flex gap-x-6 justify-center">
                                <FcGoogle className="inline-block cursor-pointer" onClick={() => signIn("google", {callbackUrl:"/entrance"})} />
                                <FaGithub className="inline-block cursor-pointer" onClick={() => signIn("github", {callbackUrl:"/entrance"})} />
                            </div>
                        </div>
                        <div className="flex mt-2 text-gray-400 w-[99%] justify-between">
                            <div>
                                <input className="outline-none" type="checkbox"
                                onClick={triggerVisible} />
                                <label className="inline-block ml-1">Show password</label>
                            </div>
                            <p>need help</p>
                        </div>
                    </div>

                    {/* fooier */}
                    <div className="block text-gray-400 mt-10">
                        <p>{(isLogin) ? "Don\'t have an account?" : "Already have an account?"}<a className="text-white cursor-pointer" onClick={() => setIsLogin((e) => !e)}>{(isLogin) ? " Sign up now!" : " Sign in now!"}</a></p>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}