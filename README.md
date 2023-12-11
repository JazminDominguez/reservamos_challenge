# Reservamos challenge
Test it here!

https://reservamos-challenge-two.vercel.app/

This project is set using:\
[Next.js](https://nextjs.org/) as react framework\
[Chakra ui](https://chakra-ui.com/) component library\
[date-fins](https://date-fns.org/) as date and time handler

## Installation

Clone this project on your local machine an install it.
```bash
npm install
```
On the root of your project add a file named .env.local.
Inside .env.local add the needed environment keys
```bash
NEXT_PUBLIC_WEATHER_KEY=OpenWeather_api_key
```
Now you can run the project.
```bash
npm run dev
```
This will run the project on http://localhost:3000.

## Usage

Find the main logic inside src > app > page.js 
The api calls happen inside the useEffect hook with a debounce of 500ms to avoid on-type calls.

## Notes

For this project a simple  and responsive layout was set.
![picture_1](https://github.com/JazminDominguez/reservamos_challenge/assets/46532943/78212a9c-4369-4034-b107-78949526ec3f)


## License

[MIT](https://choosealicense.com/licenses/mit/)
