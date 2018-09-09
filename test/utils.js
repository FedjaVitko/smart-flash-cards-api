const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const api = require('../src/server');
const config = require('../src/config');
const db = require('../src/utils');

var mockClient = null;

export async function dropDBs() {
    const mongo = await db;
    await mongo.connection.dropDatabase();
    // TODO: later Redis
}