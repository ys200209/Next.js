import { PrismaClient } from '@prisma/client';

export default async function handler(req: any, res: any) {
    console.log("request: ", req);
    console.log("response: ", res);

    console.log("ㅎㅇ I'm real")
    if (req.method === 'POST') {
        const prisma = new PrismaClient();

        const { email, password, name, gender, job } = req.body;

        try {
            const user = await prisma.user.create({
                data: {
                    avatar: 'https://thenounproject.com/api/private/icons/213810/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0',
                    email,
                    password,
                    name,
                    gender,
                    job,
                    rate: Math.random() * 100,
                },
            });

            // Optionally, you can send a success response back to the client.
            res.status(200).json({ message: 'User created successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating user' });
        } finally {
            console.log('Disconnect Success');
            await prisma.$disconnect();
        }
    } else {
        console.log("POST로 요청을 쏴주세요");
        // res.status(405).end(); // Method Not Allowed
    }
}
