"use client";

import {
    Button,
    Flex,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "./contexts/authContext";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "./contexts/firebaseApp";

interface Drink {
    name: string | null;
    isAlcoholic: string | null;
    category: string | null;
    drinkId: string | null;
}

interface DrinkProps {
    name: string;
    isAlcoholic: string;
    category: string;
    drinkId: string;
}

function Drink(props: DrinkProps) {
    const { name, isAlcoholic, category } = props;
    const [saveDrinkLoading, setSaveDrinkLoading] = useState<boolean>(false);

    const saveDrink = () => {
        setSaveDrinkLoading(true);
        const userSaved = collection(firestore, user.email);
        addDoc(userSaved, props).finally(() => {
            setSaveDrinkLoading(false);
        });
    };
    const { user } = useAuth();
    return (
        <Flex
            flexDirection="column"
            gap=".5rem"
            backdropBlur="md"
            padding="1rem"
        >
            <Text>Drink Name: {name}</Text>
            <Text>Drink Type: {isAlcoholic}</Text>
            <Text>Drink Category: {category}</Text>
            <Button
                isLoading={saveDrinkLoading}
                isDisabled={!user}
                onClick={saveDrink}
                alignSelf="center"
                maxWidth="80%"
            >
                Save Drink
            </Button>
        </Flex>
    );
}

export default function Home() {
    const [drink, setDrink] = useState<DrinkProps>();
    const [userDrinks, setUserDrinks] = useState<DrinkProps[]>([]);
    const [getDrinkLoading, setGetDrinkLoading] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        (async () => {
            if (user) {
                setUserDrinks([]);
                const userSaved = collection(firestore, user.email);
                const querySnapshot = await getDocs(userSaved);
                querySnapshot.docs.map((doc: any) => {
                    setUserDrinks((userDrinks) => [...userDrinks, doc.data()]);
                });
            }
        })();
    }, [user]);

    const getDrink = () => {
        setGetDrinkLoading(true);
        fetch("https://thecocktaildb.com/api/json/v1/1/random.php")
            .then((res: any) => {
                res.json().then((res: any) => {
                    setDrink({
                        name: res.drinks[0].strDrink,
                        isAlcoholic: res.drinks[0].strAlcoholic,
                        category: res.drinks[0].strCategory,
                        drinkId: res.drinks[0].idDrink,
                    });
                });
            })
            .finally(() => {
                setGetDrinkLoading(false);
            });
    };

    return (
        <Flex
            padding="1rem"
            justify="center"
            align="center"
            flexDirection="column"
            gap="1rem"
        >
            <Flex direction="column" justify="center" align="center">
                <Button isLoading={getDrinkLoading} onClick={getDrink}>
                    Get Random Drink
                </Button>
                {drink && <Drink {...drink} />}
            </Flex>
            {!user && (
                <Text fontWeight="medium">
                    <sup>*</sup>Login to save and view saved drinks
                </Text>
            )}
            {user && (
                <TableContainer borderRadius="md">
                    <Table variant="simple">
                        <TableCaption>Saved Drinks</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Type</Th>
                                <Th>Category</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {userDrinks.length > 0 &&
                                userDrinks.map((drink, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td>{drink.name}</Td>
                                            <Td>{drink.isAlcoholic}</Td>
                                            <Td>{drink.category}</Td>
                                        </Tr>
                                    );
                                })}
                        </Tbody>
                        <Tfoot>
                            {userDrinks.length == 0 && (
                                <Text>You have no saved drinks</Text>
                            )}
                        </Tfoot>
                    </Table>
                </TableContainer>
            )}
        </Flex>
    );
}
