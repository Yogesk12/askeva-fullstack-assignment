# ASK EVA Employee Dashboard

A React-based employee management dashboard built for the ASK EVA full-stack assessment. The application provides login/signup, protected dashboard access, employee CRUD operations, searchable/filterable employee records, and analytics charts powered by MockAPI data.

## Features

- User login and signup flow
- Protected dashboard route using encrypted session token storage
- Employee listing with latest records shown first
- Add, edit, and delete employee records
- Search employees by name or email
- Filter employees by department and status
- Dashboard summary cards for total employees, active employees, departments, and monthly joins
- Department-wise bar chart and status distribution pie chart
- Responsive UI built with Ant Design

## Tech Stack

- React 18
- React Router
- Ant Design
- Axios
- Recharts
- CryptoJS
- Day.js
- MockAPI

## Project Structure

```text
src/
  api/
    auth.js          # Login and employee fetch API helpers
    employee.js      # Employee CRUD API helpers
  components/
    AnalyticsTab.jsx
    DashboardCards.jsx
    EmployeeCharts.jsx
    EmployeeForm.jsx
    EmployeeTab.jsx
    Navbar.jsx
    ProtectedRoute.jsx
  context/
    AuthContext.jsx  # Authentication state provider
  pages/
    Dashboard.jsx
    Login.jsx
    Signup.jsx
  styles/
    common.css
  utils/
    token.js         # Session token encryption/decryption helpers
```

## API

The app uses MockAPI as the remote data source:

```text
https://6819d8771ac115563506b0bc.mockapi.io/api/Employees
```

Employee records use fields such as:

- `EmployeeName`
- `Email`
- `Password`
- `Department`
- `Designation`
- `Status`
- `JoiningDate`

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
REACT_APP_SESSION_SECRET=your_session_secret_here
```

This value is used by CryptoJS to encrypt and decrypt the local session token.

### Run Locally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

### Build

```bash
npm run build
```

### Test

```bash
npm test
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Login page |
| `/login` | Login page |
| `/signup` | New user signup |
| `/dashboard` | Protected dashboard page |

## Authentication Flow

1. A user signs up or logs in with an email and password.
2. The app validates credentials against the MockAPI employee resource.
3. On success, a CryptoJS-encrypted session token is stored in `localStorage`.
4. Protected routes decode the token before allowing dashboard access.
5. Logout removes the token and redirects the user to the login page.

## Notes

- This project is a frontend assessment implementation using MockAPI instead of a custom backend server.
- Since MockAPI is public for assessment/demo use, the authentication flow is suitable for demonstration and not production security.
- Keep real secrets out of GitHub. Commit an `.env.example` file if you want to document environment variables without exposing values.