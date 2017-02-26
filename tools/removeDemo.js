// This script removes demo app files
import rimraf from 'rimraf';
import fs from 'fs';
import { chalkSuccess } from './chalkConfig';

/* eslint-disable no-console */

const pathsToRemove = [
    './src/actions/*',
    './src/utils',
    './src/components/*',
    './src/constants/*',
    './src/containers/*',
    './src/images',
    './src/reducers/*',
    './src/store/store.spec.js',
    './src/styles',
    './src/routes.js',
    './src/index.js'
];

const filesToCreate = [
    {
        path: './src/components/emptyTest.spec.js',
        content: '// So mocha does not whine'
    },
    {
        path: './src/index.js',
        content: '// Set up your application entry point here...'
    },
    {
        path: './src/reducers/index.js',
        content: '// Set up your root reducer here...\n' +
            'import { combineReducers } from \'redux\';\n' +
            'export default combineReducers;'
    }
];

function removePath(path, callback) {
    rimraf(path, error => {
        if (error) throw new Error(error);
        callback();
    });
}

function createFile(file) {
    fs.writeFile(file.path, file.content, error => {
        if (error) throw new Error(error);
    });
}

let numPathsRemoved = 0;
pathsToRemove.forEach(path => {
    removePath(path, () => {
        numPathsRemoved++;
        if (numPathsRemoved === pathsToRemove.length) { // All paths have been processed
            // Now we can create files since we're done deleting.
            filesToCreate.map(file => createFile(file));
        }
    });
});

console.log(chalkSuccess('Demo app removed.'));
