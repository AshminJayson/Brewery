import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { FaGlassCheers, FaGoogle } from "react-icons/fa";
import { useAuth } from "../contexts/authContext";

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, logIn, logOut } = useAuth();

    return (
        <Flex padding="1rem">
            <Flex align="center" gap="0.5rem">
                <FaGlassCheers size="40" color="yellow" />
                <Text fontSize="3xl" fontStyle="italic" fontWeight="medium">
                    Brewery
                </Text>
            </Flex>
            <Flex flex={1} justifyContent="flex-end" gap=".5rem">
                {!user && (
                    <Button
                        onClick={() => {
                            logIn();
                        }}
                        leftIcon={<FaGoogle />}
                    >
                        Login
                    </Button>
                )}
                {user && (
                    <Button
                        onClick={() => {
                            logOut();
                        }}
                    >
                        Log Out
                    </Button>
                )}
                <Button onClick={() => toggleColorMode()}>
                    {colorMode === "dark" ? <MdDarkMode /> : <MdSunny />}
                </Button>
            </Flex>
        </Flex>
    );
}
