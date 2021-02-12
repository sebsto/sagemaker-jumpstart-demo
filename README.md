# SageMaker JumpStart Client App   

This simple React app calls an SageMaker runtime created with SageMaker Jumpstart.

## Security

This code is a prototype, it requires an AWS Access Key and Secret key in clear text in `src/config.tsx`.

For production setup, use [AWS Amplify](https://docs.amplify.aws/start/q/integration/react) with the [Auth category](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js) to restrict access to AWS SageMaker Runtime `InvokeEndoint` API only.

## Deployment 

After deploying your SageMake Jumpstart model, collect the model inference endpoint from the Notebook.  Report the model endpoint ID to `config.tsx`

To test locally : 

```
npm install # install the dependencies
mv src/config-ADJUST-AND-RENAME.tsx src/confix.tsx # prepare a config file

# edit config.tsx with your model endpoint (taken from SageMaker Jumpstart's Notebook) + your access key and secret key id

npm start 
```
