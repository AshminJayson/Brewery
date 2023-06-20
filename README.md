## About the project

> The project makes use of the https://rapidapi.com/thecocktaildb/api/the-cocktail-db/ public API inorder to get a random cocktail.

The user can then save this cocktail in the firestore database upon successful login using google auth provider by firebase.
The previous saved cocktails are persisted in the firestore database and are automatically retrieved when the user logs in.

## Running the project

Local Run

Create a copy of .env.example and save it as .env.local

Add the corresponding values of project_id, api_key and auth_domain from the firebase configuration you have created

Finally, run the development server:

```bash
cd brewery
npm run dev
```

Or go to https://brewery-three.vercel.app/ to view the deployed project.
