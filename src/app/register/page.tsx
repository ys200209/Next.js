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
    Button, Radio,
} from '@mantine/core';
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [job, setJob] = useState('student');

    const prisma = new PrismaClient();


    async function registerUser() {

        const userInfo = JSON.stringify({
            avatar: 'https://thenounproject.com/api/private/icons/213810/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0',
            email: email,
            password: password,
            name: name,
            gender: gender,
            job: job,
            rate: Math.random() * 100
        })

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userInfo
        };

        // console.log("userInfo: ", userInfo);

        await fetch(`http://localhost:9999/users`, options)
            .then(response => response.json())
            .then(result => {
                router.push(`/login`);
            })

        // test();
    }

    async function test() {

        router.push("/save");

        // const users = await prisma.user.findMany();
        // console.log(users);
        // console.log('Find Success');
    }

    return (
        <Container size={420} my={15}>
            <Title
                align="center"
                sx={(theme) => ({fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900})}>
                Welcome! Please register Now!
            </Title>

            <Text color="dimmed" size="sm" align="center" mt={5}>
                Want to go back to logging in?{' '}

                <Link href="/login">
                    <Anchor size="sm" component="button">
                        Sign in
                    </Anchor>
                </Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" onSubmit={(e) => {
                registerUser();
            }}>
                <TextInput label="Email" placeholder="you@mantine.dev" value={email}
                           onChange={(event) => setEmail(event.currentTarget.value)} required/>
                <PasswordInput name="password" label="Password" placeholder="Your password" value={password}
                               onChange={(event) => setPassword(event.currentTarget.value)} required mt="md"/>
                <TextInput name="name" label="Name" placeholder="홍길동" value={name}
                           onChange={(event) => setName(event.currentTarget.value)} required mt="md"/>

                <Radio.Group
                    name="gender"
                    value={gender}
                    onChange={setGender}
                    label="Gender"
                    required
                    mt="md">
                    <Group mt="xs">
                        <Radio value="male" label="남자"/>
                        <Radio value="female" label="여자"/>
                    </Group>
                </Radio.Group>

                <Radio.Group
                    name="job"
                    value={job}
                    onChange={setJob}
                    label="Job"
                    required
                    mt="md">
                    <Group mt="xs">
                        <Radio value="student" label="학생"/>
                        <Radio value="developer" label="개발자"/>
                        <Radio value="teacher" label="교사"/>
                        <Radio value="soldier" label="군인"/>
                    </Group>
                </Radio.Group>

                <Button fullWidth mt="xl" onClick={registerUser}>
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}
