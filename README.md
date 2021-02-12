# SageMaker JumpStart Client App   

This simple React app calls an SageMaker runtime created with SageMaker Jumpstart.

## Security

This code is a prototype, it requires an AWS Access Key and Secret key in clear text in `src/config.tsx`.

For production setup, use [AWS Amplify](https://docs.amplify.aws/start/q/integration/react) with the [Auth category](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js) to restrict access to AWS SageMaker Runtime `InvokeEndoint` API only.

## Deployment 

After deploying your SageMaker JumpStart model, collect the model inference endpoint from the Jupyter Notebook provided by SageMaker JumpStart.  Report the model endpoint ID to `config.tsx`

To test locally : 

```
npm install # install the dependencies
mv src/config-ADJUST-AND-RENAME.tsx src/confix.tsx # prepare a config file

# edit config.tsx with your model endpoint (taken from SageMaker Jumpstart's Notebook) + an access key and secret key id from an AWS IAM user having permission to invoke `sagemaker:InvokeEndpoint` API.

# An example IAM policy would be :

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "sagemaker:InvokeEndpoint",
            "Resource": "*"
        }
    ]
}
```

npm start 
```
