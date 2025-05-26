import { Box, Container } from "@radix-ui/themes";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <Container size="1">
        <Box>
          <h1 className="text-2xl font-bold text-center uppercase">Struck</h1>
        </Box>
      </Container>
    </header>
  );
};
