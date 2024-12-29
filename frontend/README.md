# Frontend Part of the Project

## Description

This is the `frontend` part of the project responsible for the user interface of the web application. It interacts with the backend via API to fetch and send data.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/haldaniko/coffee-shop-catalogue.git
   cd coffee-shop-catalogue/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the local server:
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:3000/

## Folder Structure

/src
  /api # API calls
  /assets # Images and icons
  /modules # Pages
    /folders # Everything that relates only to this page
  /shared # Everything that is used on more than one page
    /folders # React components, hooks, type, utils

## Dependencies

- Typescript
- React
- React Router
- React Hook Form
- React Select
- React Range
- Tailwind CSS

## Used APIs

#### GET

- `api/city-stats` — Fetching general information about coffee shops by city.
- `api/coffeeshops/id` — Fetching information about a single coffee shop.
- `api/coffeeshops/city=CityName` — Fetching all the basic information about coffee shops in this city.
- `api/index-coffee-shops` — Fetching the most popular and recently added coffee shops in the city.
