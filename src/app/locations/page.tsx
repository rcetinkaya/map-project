'use client';

import { Box, List, ListItem, Button, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

const LocationList = () => {
  const locations = useSelector((state: RootState) => state.locations);
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/edit-location/${id}`);
  };

  return (
    <Box p={5}>
      <List spacing={3}>
        {locations.map((location) => (
          <ListItem key={location.id}>
            <Text fontWeight="bold">{location.name}</Text>
            <Text>
              Enlem: {location.latitude}, Boylam: {location.longitude}
            </Text>
            <Button mt={2} colorScheme="blue" onClick={() => handleEdit(location.id)}>
              Düzenle
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LocationList;
