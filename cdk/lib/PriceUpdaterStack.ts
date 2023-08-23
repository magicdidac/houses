import { App, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from 'path';

export class PriceUpdaterStack extends Stack {
  constructor(app: App, id: string, props: StackProps) {
    super(app, id, props)
    const priceUpdaterLambda = new NodejsFunction(this, 'priceUpdaer', {
      architecture: Architecture.ARM_64,
      memorySize: 128,
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(30),

      handler: 'handler',
      entry: path.join(__dirname, '/../../priceUpdater/src/index.ts'),
      environment: {
        DB: process.env.DB ?? 'DB is not setted',
        DB_IP: process.env.DB_IP ?? 'DB_IP is not setted',
        DB_PASSWORD: process.env.DB_PASSWORD ?? 'DB_PASSWORD is not setted',
      },
    })

    new Rule(this, 'schedule-priceUpdater', {
      description: 'A schedule to run priceUpdater periodically',
      targets: [new LambdaFunction(priceUpdaterLambda)],
      schedule: Schedule.rate(Duration.hours(12))
    })
  }
}