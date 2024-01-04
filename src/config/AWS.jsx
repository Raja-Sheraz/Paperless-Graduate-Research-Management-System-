// aws-config.js
import AWS from 'aws-sdk'

AWS.config.update({
    region: 'your-region',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'your-identity-pool-id'
    })
})

export default AWS
