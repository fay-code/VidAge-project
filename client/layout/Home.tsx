import { AppShell, Navbar, Header, Box, Anchor } from '@mantine/core';
import  React  from "react";
import Image from "next/image";  
import { useMe } from '../context/me';
import Link from 'next/link';
import UploadVideo from '../components/UploadVideo';
import { VideosContextProvider } from '../context/videos';

function HomePageLayout({children}:{children: React.ReactNode}){

    const { user, refetch } = useMe();

    return (
        <VideosContextProvider>
            <AppShell
            
            padding="md"
            navbar={
                <Navbar width={{ base: 200 }} height={500} p="xs">
                    Side Items
                </Navbar>
            }
            header={
                <Header height={80} p="xs">
                    <Box sx={() => ({ display: "flex" })}>
                        <Box sx={() => ({ flex: "1" })}>
                        <Image src="/Logo.png" alt="logo" width="100px" height="60px"/>
                    </Box>

                    {!!user && (
                    <>
                    <Link href="/auth/login" passHref>
                        <Anchor ml="lg" mr="lr">Login</Anchor>
                    </Link>

                    <Link href="/auth/register" passHref>
                        <Anchor ml="lg" mr="lr">Register</Anchor>
                    </Link>
                    </>
                    )} 
                    
                    { user && <UploadVideo />}
                    </Box>
                </Header>
            }
            > 
                    {children}       
            </AppShell>
        </VideosContextProvider>
    );
}

export default HomePageLayout;