#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GQLStack } from '../lib/GQLStack';
import { PriceUpdaterStack } from '../lib/PriceUpdaterStack';

const app = new cdk.App();
new GQLStack(app, 'house-stack', {});
new PriceUpdaterStack(app, 'house-price-updater', {});