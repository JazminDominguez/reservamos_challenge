import { Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const ForeCastItem = ({ element }) => {
  const weekDay = format(new Date(element.dt_txt), "EEEE");

  return (
    <Flex
      display='flex'
      width='100%'
      flexDirection={["row", "row", "column"]}
      key={element.dt}
      justifyContent='space-between'
      paddingX={["0", "1rem"]}
      marginX={["0", "1rem"]}
      marginY='1rem'
    >
      <Text textAlign='center' as='b' color='#292929'>
        {weekDay}
      </Text>
      <Flex flexDirection='column' color='#696969'>
        <Text fontSize='sm'>min</Text>

        <Text textAlign='center' as='b'>{`${element.main.temp}° C`}</Text>
      </Flex>
      <Flex flexDirection='column' color='#696969'>
        <Text fontSize='sm'>max</Text>
        <Text textAlign='center' as='b'>{`${element.main.temp}° C`}</Text>
      </Flex>
      <Text
        color='#696969'
        fontSize='sm'
        textAlign='center'
        maxWidth={["45px", "70px", "150px"]}
        marginTop='0.5rem'
      >{`${element.weather[0].description}`}</Text>
    </Flex>
  );
};

export default ForeCastItem;
