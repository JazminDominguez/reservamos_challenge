"use client";
import { Flex, Box, Input, Text, Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getCities } from "@/services/reservamos";
import { getForecast } from "@/services/openweather";
import ForeCastItem from "@/components/foreCastItem";
import { lightFormat } from "date-fns";

export default function Home() {
  const [search, setSearch] = useState("");
  const [forecast, setForecast] = useState();
  const [condensedForecast, setCondensedForecast] = useState([]);

  const currentDate = lightFormat(new Date(2012, 1, 29), "yyyy-MM-dd");

  function getEveryNth(arr, nth) {
    const result = [];

    for (let index = 0; index < arr.length; index += nth) {
      result.push(arr[index]);
    }

    return result;
  }

  const handleChange = (event) => setSearch(event.target.value);

  useEffect(() => {
    // debounce to avoid on-type api calls
    const debounce = setTimeout(() => {
      // declare the async data fetching function
      const fetchData = async () => {
        // get the data from the api
        const cities = await getCities(search);

        const filteredCitiesType = cities.data.filter(
          (t) => t.result_type === "city"
        );

        const weather = await getForecast(
          filteredCitiesType[0].lat,
          filteredCitiesType[0].long
        );

        let fiveElementList = getEveryNth(weather?.list, 8);

        if (weather?.success) {
          setForecast(weather);
          setCondensedForecast(fiveElementList);
        }
      };

      // call the function
      fetchData().catch(console.error);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <Flex
      flexDirection={["column", "column", "row"]}
      padding={["1rem", "2rem", "2rem", "3rem"]}
      minHeight='100vh'
      minWidth='100vw'
      backgroundColor='#eaeaea'
    >
      {/*left box*/}
      <Box
        display='flex'
        flexDirection='column'
        backgroundColor='#f4f4f4'
        padding='1rem'
        borderRadius={["25"]}
        width={["100%"]}
      >
        <Input
          placeholder='Search a city'
          onChange={handleChange}
          marginY='1rem'
        />

        {forecast && (
          <>
            {" "}
            <Flex justifyContent='space-between' margin='0.5rem'>
              <Text>{forecast?.city?.name}</Text>
              <Text>{currentDate}</Text>
            </Flex>
            <Flex justifyContent='center' marginY='1rem'>
              <Heading
                size={["3xl", "3xl", "4xl"]}
                color='#292929'
              >{`${forecast?.list[0].main.temp}° C`}</Heading>
              <Box paddingLeft='1rem' alignSelf='flex-end'>
                <Text fontSize='sm'>{`${forecast?.list[0].wind.speed} mph`}</Text>
                <Text fontSize='sm'>{`${forecast?.list[0].main.humidity}% humidity`}</Text>
              </Box>
            </Flex>
            <Text textAlign='center'>{`${forecast?.list[0].weather[0].description}`}</Text>
          </>
        )}

        {/*5 day forecast container*/}
        <Flex flexDirection={["column", "column", "row"]} marginTop='2rem'>
          {condensedForecast?.map((e) => {
            return <ForeCastItem element={e} key={e.dt} />;
          })}
        </Flex>
      </Box>
    </Flex>
  );
}
