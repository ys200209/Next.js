"use client"

import {Button, Container, Grid, rem, SimpleGrid, Skeleton, useMantineTheme} from '@mantine/core';
import {useEffect, useState} from "react";
import ShowChart from "@/components/ShowChart/ShowChart";
import Users from "@/components/Users/Users";

const PRIMARY_COL_HEIGHT = rem(300);

export default function Grids() {
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
    const [isUsersClicked, setIsUsersClicked] = useState(false);
    const [isChartClicked, setIsChartClicked] = useState(false);

    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
    const TERTIARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 3 - ${theme.spacing.md} / 1)`;

    const diagramStyle = {
        width: '100%',
        height: '500px',
        backgroundColor: '#DAE4E4',
    };

    useEffect(() => {
        // 데이터 또는 컴포넌트 초기화 작업을 여기에서 수행

        // 초기화 작업이 완료되면 로딩 상태를 해제
        // setIsLoading(false);
        /*const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);*/

        setIsLoading(false);
    }, []);

    function clickUsers() {
        setIsUsersClicked(true);
        setIsChartClicked(false);
    }

    function clickChart() {
        setIsChartClicked(true);
        setIsUsersClicked(false);
    }

    return (
        <>
            <Container my="xl">
                <SimpleGrid cols={1} spacing="md" breakpoints={[{maxWidth: 'xl', cols: 1}]}>
                    <Grid gutter="sm">
                        <Grid.Col span={4}>
                            {isLoading ? (
                                <Skeleton height={TERTIARY_COL_HEIGHT} radius="md" animate={true}>
                                </Skeleton>
                            ) : (
                                <Button
                                    fullWidth
                                    radius="md"
                                    style={{minHeight: `${TERTIARY_COL_HEIGHT}`}}
                                    onClick={clickUsers}>
                                    유저 조회
                                </Button>
                            )}
                        </Grid.Col>
                        <Grid.Col span={4}>
                            {isLoading ? (
                                <Skeleton height={TERTIARY_COL_HEIGHT} radius="md" animate={true}>
                                </Skeleton>
                            ) : (
                                <Button
                                    fullWidth
                                    radius="md"
                                    style={{minHeight: `${TERTIARY_COL_HEIGHT}`}}
                                    onClick={clickChart}>
                                    차트 조회
                                </Button>
                            )}
                        </Grid.Col>
                        <Grid.Col span={4}>
                            {isLoading ? (
                                <Skeleton height={TERTIARY_COL_HEIGHT} radius="md" animate={true}>
                                </Skeleton>
                            ) : (
                                <Button
                                    fullWidth
                                    radius="md"
                                    style={{minHeight: `${TERTIARY_COL_HEIGHT}`}}>
                                    회원가입
                                </Button>
                            )}
                        </Grid.Col>
                    </Grid>
                </SimpleGrid>
            </Container>

            {isChartClicked || isUsersClicked? (
                isChartClicked ? <ShowChart /> : <Users />
            ): <Skeleton style={diagramStyle}/>}
            {/*{isUsersClicked ? <Button style={diagramStyle}>유저 누르셨어요??</Button> : <Skeleton style={diagramStyle}/>}*/}

        </>
    );
}
