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

export default function Register() {
    const router = useRouter();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [genderValue, setGenderValue] = useState('male');

    function registerUser() {
        // Paper 태그의 요소 값들을 가져오는 코드
        console.log('emailValue: ', emailValue);
        console.log('passwordValue: ', passwordValue);
        console.log('nameValue: ', nameValue);
        console.log('genderValue: ', genderValue);

        const userInfo = JSON.stringify({
            email: emailValue,
            password: passwordValue,
            name: nameValue,
            gender: genderValue,
        })

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userInfo
        };

        console.log("userInfo: ", userInfo);

        fetch(`http://localhost:9999/users`, options)
            .then(response => response.json())
            .then(result => {
                console.log('result: ' + result);
                router.push(`/login`);
            });

    }

    return (
        <Container size={420} my={40}>
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
                <TextInput label="Email" placeholder="you@mantine.dev" value={emailValue}
                           onChange={(event) => setEmailValue(event.currentTarget.value)} required/>
                <PasswordInput name="password" label="Password" placeholder="Your password" value={passwordValue}
                               onChange={(event) => setPasswordValue(event.currentTarget.value)} required mt="md"/>
                <TextInput name="name" label="Name" placeholder="홍길동" value={nameValue}
                           onChange={(event) => setNameValue(event.currentTarget.value)} required mt="md"/>

                <Radio.Group
                    name="gender"
                    value={genderValue}
                    onChange={setGenderValue}
                    label="Gender"
                    required
                    mt="md">
                    <Group mt="xs">
                        <Radio value="male" label="남자"/>
                        <Radio value="female" label="여자"/>
                    </Group>
                </Radio.Group>

                <Button fullWidth mt="xl" onClick={registerUser}>
                    Sign up
                </Button>
            </Paper>
        </Container>
    );
}
