/* eslint-disable no-console */
const exec = require('child-process-promise').exec;

import dotenv from 'dotenv';
const dotEnvVars = dotenv.config();

const S3_BUCKET = dotEnvVars.S3_BUCKET;     // 's3://makervision.io/'
const DIST_ID = dotEnvVars.DISTRIBUTION_ID;  // 'E19ZMQITK42C59';

const SYNC_DIST_TO_S3 = `aws s3 sync ./dist/ ${S3_BUCKET} --region us-west-2` +
    ' --delete --cache-control max-age=900';
const INVALIDATE_CACHE =
    `aws cloudfront create-invalidation --distribution-id ${DIST_ID} --paths /*`;

console.log('Releasing it...');
exec('release-it').then(() => {
    console.log('Syncing ./dist to S3 Bucket...');
    return exec(SYNC_DIST_TO_S3);
}).then(() => {
    console.log('Invalidating CloudFront cache...');
    return exec(INVALIDATE_CACHE);
}).catch((err) => {
    console.log('Yikes!  Error deploying to prod.', err);
});
