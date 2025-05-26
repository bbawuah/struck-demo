import { Box, Button, Card, Flex, TabNav } from "@radix-ui/themes";

export const SideNavigation = () => {
  return (
    <Box>
      <Flex>
        <Card>
          <TabNav.Root>
            <TabNav.Link href="#" active>
              Account
            </TabNav.Link>
            <TabNav.Link href="#">Documents</TabNav.Link>
            <TabNav.Link href="#">Settings</TabNav.Link>
          </TabNav.Root>
        </Card>
      </Flex>
    </Box>
  );
};
