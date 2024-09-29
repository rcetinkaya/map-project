"use client";
import { Flex, Box, IconButton, useDisclosure, Stack, HStack, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation"; 

export default function TopMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathname = usePathname(); 

  return (
    <Box 
    bg="purple.400"
    px={4}
    w="100%"
    position="fixed" 
    top={0}
    zIndex={10}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box className="flex justify-between w-full" color="white" fontSize="xl" fontWeight="bold">
          <Link href="/">
            Map Project Home
          </Link>
          <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        </Box>

        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href="/add-location" >
              <Button
                colorScheme={pathname === "/add-location" ? "purple" : "whiteAlpha"}
                variant={pathname === "/add-location" ? "solid" : "ghost"}
              >
                Add Location
              </Button>
            </Link>
            <Link href="/locations">
              <Button
                colorScheme={pathname === "/locations" ? "purple" : "whiteAlpha"}
                variant={pathname === "/locations" ? "solid" : "ghost"}
              >
                View Locations
              </Button>
            </Link>
            <Link href="/route">
              <Button
                colorScheme={pathname === "/route" ? "purple" : "whiteAlpha"}
                variant={pathname === "/route" ? "solid" : "ghost"}
              >
                Show Route
              </Button>
            </Link>
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <Link href="/add-location">
              <Button
                w="full"
                colorScheme={pathname === "/add-location" ? "purple" : "whiteAlpha"}
                variant={pathname === "/add-location" ? "solid" : "ghost"}
                onClick={isOpen ? onClose : onOpen}
              >
                Konum Ekle
              </Button>
            </Link>
            <Link href="/locations">
              <Button
                w="full"
                colorScheme={pathname === "/locations" ? "purple" : "whiteAlpha"}
                variant={pathname === "/locations" ? "solid" : "ghost"}
                onClick={isOpen ? onClose : onOpen}
              >
                Konum Listele
              </Button>
            </Link>
            <Link href="/route">
              <Button
                w="full"
                colorScheme={pathname === "/route" ? "purple" : "whiteAlpha"}
                variant={pathname === "/route" ? "solid" : "ghost"}
                onClick={isOpen ? onClose : onOpen}
              >
                Rota Göster
              </Button>
            </Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
