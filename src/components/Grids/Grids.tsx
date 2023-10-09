"use client"

import {Button, Container, Grid, rem, SimpleGrid, Skeleton, useMantineTheme} from '@mantine/core';
import {lazy, ReactNode, Suspense, useEffect, useState} from "react";
import { Loader } from '@mantine/core';

const PRIMARY_COL_HEIGHT = rem(300);

export default function Grids() {
    const diagramStyle = {
        width: '100%',
        height: '500px',
        backgroundColor: '#DAE4E4',
    };

    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
    const TERTIARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 3 - ${theme.spacing.md} / 1)`;

    const [LazyComponent, setLazyComponent] = useState<ReactNode | null>(null);
    const Users = lazy(() => import('@/components/Users/Users'));
    const ShowChart = lazy(() => import('@/components/ShowChart/ShowChart'));
    const JsonAnalysisChart = lazy(() => import('@/components/JsonAnalysisChart/JsonAnalysisChart'));

    useEffect(() => {
        setIsLoading(false);
    }, []);


    function clickUsers() {
        setLazyComponent(Users);
    }

    function clickMBTI() {
        setLazyComponent(ShowChart);
    }

    function clickAnalysis() {
        setLazyComponent(JsonAnalysisChart);
    }

    return (
        <>
            <Container my="xl">
                <SimpleGrid cols={1} spacing="md" breakpoints={[{maxWidth: 'xl', cols: 1}]}>
                    <Grid gutter="sm">
                        <Grid.Col span={4}>x`
                            {isLoading ? (
                                <Skeleton height={TERTIARY_COL_HEIGHT} radius="md" animate={true}>
                                </Skeleton>
                            ) : (
                                <Button
                                    fullWidth
                                    variant="outline"
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
                                    variant="outline"
                                    radius="md"
                                    style={{minHeight: `${TERTIARY_COL_HEIGHT}`}}
                                    onClick={clickMBTI}>
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
                                    variant="outline"
                                    radius="md"
                                    style={{minHeight: `${TERTIARY_COL_HEIGHT}`}}
                                    onClick={clickAnalysis}>
                                    유저 분석
                                </Button>
                            )}
                        </Grid.Col>
                    </Grid>
                </SimpleGrid>
            </Container>

            {LazyComponent ? (
                <Suspense fallback={<Loader/>}>
                    <LazyComponent/>
                </Suspense>) : <Skeleton style={diagramStyle}/>}
        </>
    );
}
