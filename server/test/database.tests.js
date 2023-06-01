const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const connectDB = require('../config/database');

describe('connectDB', () => {
  let connectionString;
  let consolelogStub;
  let consoleErrorStub;
  let processExitStub;

  beforeEach(() => {
    connectionString = 'mongodb://localhost:27017/test';
    consolelogStub = sinon.stub(console, 'log');
    consoleErrorStub = sinon.stub(console, 'error');
    processExitStub = sinon.stub(process, 'exit');
  });

  afterEach(() => {
    consolelogStub.restore();
    consoleErrorStub.restore();
    processExitStub.restore();
  });

  it('should connect to the MongoDB and log "Connection Created"', () => {
    sinon.stub(mongoose, 'connect').resolves();

    const connection = connectDB(connectionString);

    expect(mongoose.connect.calledWith(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })).to.be.true;
    expect(console.log.calledWith('Connection Created')).to.be.true;
    expect(connection).to.be.a('Promise');

    mongoose.connect.restore();
  });

  it('should log the error message and exit the process if an error occurs during connection', () => {
  const errorMessage = 'Test error';
  sinon.stub(mongoose, 'connect').throws(new Error(errorMessage));
  consoleErrorStub.onSecondCall(errorMessage);

  connectDB(connectionString);

  expect(mongoose.connect.calledWith(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })).to.be.true;
  expect(consoleErrorStub.calledWith('MongoDB Connection Error')).to.be.true;
  expect(consoleErrorStub.calledWith(errorMessage)).to.be.any;
  expect(processExitStub.calledWith(1)).to.be.true;

  mongoose.connect.restore();
  consoleErrorStub.restore();
});

});
