# Config
Setup env variables

# Start 
Start using nodemon

  npm run start-dev 

# Security
Theoretically, just needs a JWT provided though checkScopes is an Auth0 library. Only tested with Auth0.

## Auth0
* Create an account and configure an API https://github.com/auth0/docs/pull/7375
* Check scopes assumes [read:messages] is configured at API and assigned to user
* Configure auth0 variables
* AUTH0_AUDIENCE=http://localhost:3001/scaffold (this is configured in Auth0)
* AUTH0_DOMAIN=dev-j3spmv1o.au.auth0.com (this is configured in Auth0)

## Test - 
## Get accessToken from Auth0 
* Use scaffold-client https://github.com/itinsley/scaffold-client
* OR
* https://auth0.com/docs/tokens/get-access-tokens

## Provide Authorisation Header with Bearer Token
curl -X GET -H 'Authorization: Bearer YOUR_JWT_TOKEN' http://localhost:3001/api/private