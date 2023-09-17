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
    Button,
} from '@mantine/core';
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function loginUser() {
        const loginInfo = {
            email: email,
            password: password,
        }

        console.log('loginInfo: ', loginInfo);

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`http://localhost:9999/users/`, options)
            .then(response => response.json())
            .then(result => {
                console.log('result : ' + JSON.stringify(result));
                result.find((user: { email: string; password: string; }) => {
                    if (user.email === loginInfo.email && user.password === loginInfo.password) {
                        console.log('login success');
                        router.push(`/`);
                    } else {
                        console.log('login fail');
                    }
                });
            });
    }

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
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
                <TextInput label="Email" placeholder="you@mantine.dev" value={email}
                           onChange={(event) => setEmail(event.currentTarget.value)} required />
                <PasswordInput label="Password" placeholder="Your password" value={password}
                               onChange={(event) => setPassword(event.currentTarget.value)} required mt="md" />
                <Group position="apart" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl" onClick={loginUser}>
                    Log in
                </Button>
            </Paper>
        </Container>
    );
}
