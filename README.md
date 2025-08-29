# Interactive Data Structure Tool
  
This is a project built with ViteJs and ExpressJs over NodeJS 20.18.1

## Project structure
  
The frontend code is in the project root directory and is built with [Vite](https://vitejs.dev/).
  
The backend code is in the `api` directory and is built with ExpressJs. Backend is needed only to transform data into json. 
Once the data is transform the backend can be stopped. And configure the frontend widget to fetch data from the static json file.

## Development

`npm install` will install package dependencies for the frontend app.
`cd api && npm install` will install package dependencies for the backend app.
  
`npm run dev` will start the frontend.
`cd api && npm run dev` will start the backend.

## Production build - widget

`npm install` will install package dependencies for the frontend app.
`npm run build` will install package dependencies for the backend app.
  

## Example usage development

1. Start the backend service with npm run dev from /api folder
2. Put the excel file in api/data/uploads
4. Start the frontend server with npm run dev from project root
5. Access the frontend on http://localhost:5173

## Example usage production

1. Build production frontend with npm run build from project root
2. Copy the files from /dist folder to a location where they can be accessed
3. Check example folder on how to embed the widget in html
4. Prepare your data by starting the backend service
5. Put the excel file in api/data/uploads
6. Make a GET request to http://localhost:3000/api/data. 
   - This will load the excel file, parse it, and save the parsed json file into /api/data/parsed/[filename].json
   - Now you can stop the backend. You don't need it in production anymore.
7. Copy the json file from /api/data/parsed and place it in a location from which it can be accessed via url
8. Configure your widget to pick the data from the location where you put the json file. (Check example folder)

```
    <script>
        TaxonomyNavigator.render("#taxonomy-navigator", { dataUrl: 'http://your.public/url/with/data.json' });
    </script>
```