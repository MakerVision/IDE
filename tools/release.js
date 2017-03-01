/* eslint-disable no-console */
const exec = require('child-process-promise').exec;

const dotEnv = require('dotenv').config();

const S3_BUCKET = dotEnv.S3_BUCKET;
const DIST_ID = dotEnv.DISTRIBUTION_ID;

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
