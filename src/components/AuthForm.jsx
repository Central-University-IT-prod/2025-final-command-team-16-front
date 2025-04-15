"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import {useMutation} from "@tanstack/react-query";
import {loginUser, registerUser, getUser} from "@/services/auth.service";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import { useAuth } from '@/context/AuthContext';

const AuthForm = ({ className, title, type="login"}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const router = useRouter();
    const {mutate:handleRegister, isLoading:isRegistering} = useMutation({
        mutationFn:registerUser,
        onSuccess: () => {
            toast.success("Вы успешно зарегистрировались!")
        },
        onError: (e) => toast.error(e.message)
    })
    const { login, setUserData } = useAuth();
    const {mutate:handleLogin, isLoading:isLogining} = useMutation({
        mutationFn: loginUser,
        onSuccess: async (data) => {
            console.log(data);
            login(data.access_token);
            const userData = await getUser(data.access_token);
            setUserData(userData);
            toast.success("Вы успешно вошли в систему!");
            await new Promise(resolve => setTimeout(resolve, 100));
            router.push('/profile');
        },
        onError: (e) => {
            toast.error(e.message);
            console.log(e);
        }
    })
    const onSubmit = (data) => {
        if(type === 'login') {
            handleLogin(data);
        }
        if(type === 'register') handleRegister(data);
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <form className={cn("space-y-6", className)} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={'text-2xl font-bold text-center'}>{title}</h2>
            <div className={"space-y-3"}>
                <Label htmlFor="email">Email</Label>
                <Input
                    className={"p-4"}
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    placeholder="Email"
                />
                {errors.email && <span className={"text-orange-700"}>This field is required</span>}
            </div>
            <div className={"space-y-3"}>
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                    <Input
                        className={"p-4"}
                        {...register("password", { required: true })}
                        type={showPassword? "text" : "password"}
                        id="password"
                        placeholder="Пароль"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-2 flex items-center px-4"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.password && <span className={"text-orange-700"}>This field is required</span>}
            </div>
            <Button 
                type="submit" 
                className="w-full"
                disabled={type === 'login' ? isLogining : isRegistering}
            >
                {type === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            {type === "login" && <p>
                Еще нет аккаунта? <Link href="/register" className={"text-primary"}>Зарегистрироваться</Link>
            </p>}
            {type === "register" && <p>
                Уже есть аккаунт? <Link href="/login" className={"text-primary"}>Войти</Link>
            </p>}

        </form>
    );
}


export default AuthForm
