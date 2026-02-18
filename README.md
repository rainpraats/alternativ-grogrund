# alternativ grogrund administrationsverktyg

An app to manage memberships for a non profit organisation.

## Prerequisites

- Node.js version 24.1.11 or higher
- MongoDB version 8.22 or higher

## Setup guide

1. Clone the repository

```bash
git clone https://github.com/rainpraats/alternativ-grogrund.git
cd alternativ-grogrund
```

2. Navigate to backend and Install dependencies

```bash
cd backend
npm install
```

3.  Configure environment variables in an .env which you create at the root of your backend, see .env.example for reference.

4.  Ensure mongoDB is running. Otherwise the next step will give an error that you cant connect to the server.

5.  Run the create admin script
    This will create a user with admin privliges. This allows you to sign in to the app for the first time.
    To sign in to the admin account is admin@alternativgrogrund.se and the password is bob.
    Your first time running the app you should create a new admin user and set your own password, then delete the default admin account.

```bash
npm run create-admin
```

6. Start the server

```bash
npm run start
```

7.  Configure environment variables in an .env.production and an .env.development which you create at the root of your fronend, see the two .env.example files for reference.

```bash
cd ../frontend
```

8.  Start the frontend

```bash
npm install
npm run build
npm run preview
```

The app is now available to devices on your local network.

## Technical visualization doesnt exist yet but is on its way.

### KEY DATA FLOWS

USER Creation updates the database
MongoDB stores:

- firstName
- lastName
- role ( admin or user )
- password
- email
- phone
- address
- swedish identity number ( personnummer )

AUTHENTICATION:
email/Password (MongoDB) → JWT Token → Role-based access control
