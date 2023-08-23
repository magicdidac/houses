import { App, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Cors, LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Architecture, HttpMethod, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from 'path';

export class GQLStack extends Stack {
    constructor(app: App, id: string, props: StackProps) {
        super(app, id, props)
        const lambda = new NodejsFunction(this, 'apollo-lambda', {
            architecture: Architecture.ARM_64,
            memorySize: 128,
            runtime: Runtime.NODEJS_16_X,
            timeout: Duration.seconds(20),

            handler: 'handler',
            entry: path.join(__dirname, '/../../graphql/src/index.ts'),
            environment: {
                DB: process.env.DB ?? 'DB is not setted',
                DB_IP: process.env.DB_IP ?? 'DB_IP is not setted',
                DB_PASSWORD: process.env.DB_PASSWORD ?? 'DB_PASSWORD is not setted',
                ORS_API_KEY: process.env.ORS_API_KEY ?? 'ORS_API_KEY is not setted',
            },
        })

        const api = new RestApi(this, 'restapi', {
            defaultCorsPreflightOptions: {
                allowHeaders: Cors.DEFAULT_HEADERS,
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: [HttpMethod.POST]
            },
            restApiName: 'house-API'
        })

        api.root.addMethod(HttpMethod.POST, new LambdaIntegration(lambda))
    }
}