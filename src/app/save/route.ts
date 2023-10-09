import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Save() {
    console.log("ㅋ");

    const router = useRouter();
    const {email, password, name, gender, job} = router.query;

    useEffect(() => {
        const prisma = new PrismaClient();

        console.log('email: ', email);
        console.log('password: ', password);
        console.log('name: ', name);
        console.log('gender: ' + gender);

        async function saveUserData() {
            try {
                await prisma.user.create({
                    data: {
                        avatar: 'https://thenounproject.com/api/private/icons/213810/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0',
                        email: email,
                        password: password,
                        name: name,
                        gender: gender,
                        job: job,
                        rate: Math.random() * 100,
                    },
                });
                console.log('User data saved successfully');
            } catch (error) {
                console.error('Error saving user data:', error);
            } finally {
                await prisma.$disconnect();
            }
        }

        if (email && password && name && gender && job) {
            saveUserData();
        }
    }, [email, password, name, gender, job]);
}
