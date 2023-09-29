import {AppProps} from 'next/app';
import Head from 'next/head';
import {MantineProvider} from '@mantine/core';
// import {SessionProvider} from "next-auth/react"

export default function App(props: AppProps) {
    const {Component, pageProps: {session, ...pageProps},} = props;

    // 커스텀 테마 생성
    /*const theme = createTheme({
        colorScheme: 'dark', // 초기 컬러 스키마 설정
        primaryColor: '#FF5733', // 원하는 색상으로 변경
        black: '#333', // 원하는 색상으로 변경
        // 추가적인 테마 설정...
    });*/


    return (
        <>
            {/*<SessionProvider session={session}>*/}
                <Head>
                    <title>Page title</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                </Head>

                <MantineProvider theme={{
                    colorScheme: 'dark',
                    colors: {
                        // override dark colors to change them for all components
                        dark: [
                            '#d5d7e0',
                            '#acaebf',
                            '#8c8fa3',
                            '#666980',
                            '#4d4f66',
                            '#34354a',
                            '#2b2c3d',
                            '#1d1e30',
                            '#0c0d21',
                            '#01010a',
                        ],
                    },
                }} withGlobalStyles withNormalizeCSS>
                    <Component {...pageProps} />
                </MantineProvider>
            {/*</SessionProvider>*/}
        </>
    );
}
