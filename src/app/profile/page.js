"use client"
import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/services/auth.service";
import {redirect} from "next/navigation";
import Loading from "@/app/loading";
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
    const { token, isLoadingAuth, setUserData } = useAuth();
    
    const { isLoading, data: user, error } = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser(token),
        enabled: !!token && !isLoadingAuth,
        onError: () => {
            redirect('/login');
        },
        onSuccess: (data) => {
            setUserData(data);
        }
    });

    if (isLoadingAuth || isLoading) return <Loading />;
    if (error || !user?.email) redirect('/login');

    return (
        <div className="flex flex-col min-h-[calc(100vh-68px)] py-8">

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        {/*Здравствуйте, {user.name}!*/}
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-primary">{user?.email}</p>
                    {/*<p className="text-primary"> {user.city}</p>*/}
                </div>
            </div>

            <Tabs defaultValue="my_books" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-transparent shadow-md">
                    <TabsTrigger
                        value="my_books"
                        className="data-[state=active]:text-primary border-transparent border-2 data-[state=active]:border-primary"
                    >
                        Мои объявления
                    </TabsTrigger>
                    <TabsTrigger
                        value="my"
                        className="data-[state=active]:text-primary border-transparent border-2 data-[state=active]:border-primary"
                    >
                        Мои избранные
                    </TabsTrigger>
                    <TabsTrigger
                        value="saved"
                        className="data-[state=active]:text-primary border-transparent border-2 data-[state=active]:border-primary"
                    >
                        История обменов
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="my">
                    <div className="flex justify-between items-center mb-6">
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    </div>
                </TabsContent>
                <TabsContent value="history">
                    <div className="space-y-4">
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Profile;