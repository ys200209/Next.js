"use client"

import {useDisclosure} from '@mantine/hooks';
import {Button, Group, Modal, useMantineTheme} from '@mantine/core';

export default function OpenLoginModal() {
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Authentication"
                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
            >
                {/* Modal content */}
            </Modal>

            <Group position="center">
                <Button onClick={open}>Open modal</Button>
            </Group>
        </>
    );
}
