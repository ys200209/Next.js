"use client"

import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button, Alert,
} from '@mantine/core';
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "@mantine/form";
import {IconAlertCircle} from '@tabler/icons-react';
// import { useSession, signIn, signOut } from "next-auth/react"
import {NextApiRequest, NextApiResponse} from "next";
import {withIronSessionApiRoute} from "iron-session/next";
import {IronSessionOptions} from "iron-session";


export default function Login(request: NextApiRequest, response: NextApiResponse) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginFail, setIsLoginFail] = useState(false);

    // const { data: session } = useSession()

    /*if (session) {
        console.log("로그인 되어있잖아.");
        // router.push(`/`);
    }*/

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            global: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (/^\S+$/.test(value) ? null : 'Invalid password'),
        },
    });

    function loginUser(userInfo: any) {

        console.log("userInfo: ", userInfo);

        form.setFieldError('global', 'No special characters allowed');

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`http://localhost:9999/users/`, options)
            .then(response => response.json())
            .then(result => {
                result.map(async (user: { email: string; password: string; }) => {
                    console.log("user: ", JSON.stringify(user));
                    if (user.email === userInfo.email && user.password === userInfo.password) {
                        console.log("일치해~");
                        router.push(`/`);
                    } else {
                        console.log("일치 안하는데?");
                        setIsLoginFail(true);
                    }
                });
            });
    }

    return (
        <form onSubmit={form.onSubmit((values) => loginUser(values))}>
            <Container size={420} my={40}>
                <Title
                    align="center"
                    mt={15}
                    sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}>
                    Welcome back!
                </Title>

                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{' '}

                    <Link href="/register">
                        <Anchor size="sm" component="button">
                            Create account
                        </Anchor>
                    </Link>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    {/*<TextInput
                        label="Email" placeholder="you@mantine.dev" value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)} required/>*/}

                    <TextInput label="Email" placeholder="you@mantine.dev"
                               {...form.getInputProps('email')}
                               required/>

                    <PasswordInput label="Password" placeholder="Your password"
                                   {...form.getInputProps('password')}
                                   required mt="md"/>
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me"/>
                        <Anchor component="button" size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>

                    {/*<Button fullWidth mt="xl" onClick={loginUser}>
                        Log in
                    </Button>*/}

                    {/*<TextInput hidden={true} {...form.getInputProps('global')} />*/}

                    {/*<TextInput color="red" mt="sm" {...form.getInputProps('global')} />*/}

                    <Button fullWidth mt="xl" type="submit">
                        Log in
                    </Button>

                    {isLoginFail && (
                        <Alert icon={<IconAlertCircle size="1rem"/>} title="사용자 인증 실패" color="red" mt={20}>
                            아이디 또는 비밀번호가 일치하지 않습니다.
                        </Alert>)}
                </Paper>
            </Container>
        </form>
    );
}
