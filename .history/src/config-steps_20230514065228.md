
npm create vite@latest
//select react and typescript

npm add react-redux @reduxjs/toolkit react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material @mui/x-data-grid

npm i -D @types/react-dom
npm i -D eslint-config-react-app


create 
/src/.env.local
VITE_BASE_URL = http://localhost:1337

create
/src/.eslintrc.json
{
    "extends": "react-app"
}

npm i @types/node

edit
vite.config.ts
resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, 'src')}]
  }

edit
tsconfig.json
 "paths": {
      "@/*": ["./src/*"]
    },
