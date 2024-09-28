'use client';

import { Box, SimpleGrid, Text, Button, HStack, IconButton, useToast } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { deleteLocation } from '@/redux/locationSlice';
import { Circle } from '@chakra-ui/react';

const LocationList = () => {
  const locations = useSelector((state: RootState) => state.locations);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast(); 

  const handleEdit = (id: string) => {
    router.push(`/edit-location/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteLocation(id));
    toast({
      title: 'Lokasyon başarıyla silindi.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top'
    });
  };

  const handleRouteShow = () => {
    router.push('/route');
  };

  return (
    <Box p={5}>
      <Box className='flex w-full justify-end'>
        <Button colorScheme="teal" mb={4} onClick={handleRouteShow}>
          Rota Göster
        </Button>
      </Box>
      {locations.length === 0 ? (
        <Box className='w-full h-[80vh] flex items-center justify-center'>
          <Text color={"red.500"} fontSize="xl" textAlign="center" fontWeight="bold">
            Henüz kayıtlı bir lokasyon bulunmamaktadır.
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {locations.map((location, index) => (
            <Box
              key={location.id}
              borderWidth="1px"
              borderRadius="lg"
              p={5}
              shadow="md"
              textAlign="center"
              _hover={{
                shadow: "lg",
                transform: "scale(1.05)",
                transition: "0.2s",
              }}
            >
              <HStack justify="center" spacing={4} mb={4}>
                <Circle size="40px" bg={location.color} />
                <Text fontSize="2xl" fontWeight="bold">
                  {index + 1}. {location.name.toUpperCase()}
                </Text>
              </HStack>

              <Text fontWeight="600">Enlem: {location.latitude}</Text>
              <Text fontWeight="600">Boylam: {location.longitude}</Text>

              <HStack className='flex justify-center' spacing={4} mt={4}>
                <Button colorScheme="blue" onClick={() => handleEdit(location.id)}>
                  Düzenle
                </Button>
                <Button colorScheme="red" onClick={() => handleDelete(location.id)}>
                  Sil
                </Button>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default LocationList;
