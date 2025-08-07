# Test Task: Random Users Table (React + TypeScript)

This project displays user data using the MUI DataGrid component and fetches users from the [Random User API](https://randomuser.me/) with filtering options (gender, nationality).  
Pagination and filters are passed to the API via query parameters, and the table updates automatically when the page or filter changes.  
The table includes the following columns:

| First Name | Last Name | Gender | Email | Nationality |
|------------|-----------|--------|-------|-------------|

<img width="3612" height="2142" alt="image" src="https://github.com/user-attachments/assets/d168fc0b-f218-4cb0-80b5-072b89cb74f3" />


## Features

- ✅ **Server-side Pagination**
- ✅ **Server-side Filtering**
  - Gender (All, Male, Female)
  - Nationality (select from 5)
- ✅ **Responsive Design (Material UI)**
- ✅ **Theme switcher**
- ✅ **Reusable Components (e.g., GenderFilter, NationalityFilter)**
- ✅ **TypeScript types for API responses**
- ✅ **Reset Filters button**
- ✅ **Error handling & loading states**

## Tech Stack
| Layer       | Tools                                 |
|-------------|---------------------------------------|
| Frontend    | React, TypeScript, Vite, React Hooks             |
| API         | Random User API                       |
| Styling     | Material UI (MUI)                     |


## Running the Project

### 1. Clone & install
```bash
git clone https://github.com/Ostrynska/user-table-app.git
cd user-table-app
npm install
```
### 2. Build & run the project
```bash
npm run build
npm run dev
```

The app will be available at http://localhost:5173

## Author

**Kateryna Ostrynska**  
[GitHub](https://github.com/Ostrynska) | [Portfolio](https://ostrynska-kateryna.netlify.app)
