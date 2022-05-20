import React from "react";
import {AppHeader} from "../../app.shared/app.layouts/app.navigation/header";
import {Container, Select, Text} from "@mantine/core";
import {Search} from "tabler-icons-react";

const SearchModule = () => {
    return(
        <>
            <AppHeader title={<Text>Поиск товаров</Text>}/>
            <Container mt={55}>
                <Select
                    icon={<Search/>}
                    searchable
                    py={10} data={[
                    { value: 'react', label: 'React' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                    { value: 'vue', label: 'Vue' },
                ]}
                />
            </Container>
        </>
    )
}

export default {
    routeProps: {
        path: 'search',
        exact: true,
        index: false,
        element: <SearchModule/>,
    },
    name: 'Search',
};