#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { GQLStack } from '../lib/GQLStack';

const app = new cdk.App();
new GQLStack(app, '{projectName}-stack', {});