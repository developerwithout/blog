const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const { hashPassword, isValidPassword } = require('../utilities/hashPasswords'); // Replace `yourModule` with the appropriate module name

describe('hashPassword', () => {
    it('should hash the password using bcrypt', () => {
      const password = 'password123';
      const expectedHash = 'hashed_password';
      hashSyncStub = sinon.stub(bcrypt, 'hashSync').returns(expectedHash);
  
      const hashedPassword = hashPassword(password);
  
      expect(hashedPassword).to.equal(expectedHash);
  
      bcrypt.hashSync.restore();
    });
  });
  

describe('isValidPassword', () => {
  let compareSyncStub;

  beforeEach(() => {
    compareSyncStub = sinon.stub(bcrypt, 'compareSync');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return true if the password matches the hashed password', () => {
    const password = 'password123';
    const hashedPassword = 'hashed_password';

    compareSyncStub.returns(true);

    const result = isValidPassword(password, hashedPassword);

    expect(compareSyncStub.calledOnceWithExactly(password, hashedPassword)).to.be.true;
    expect(result).to.be.true;
  });

  it('should return false if the password does not match the hashed password', () => {
    const wrongPassword = 'wrongpassword';
    const hashedPassword = 'hashed_password';

    compareSyncStub.returns(false);

    const result = isValidPassword(wrongPassword, hashedPassword);

    expect(compareSyncStub.calledOnceWithExactly(wrongPassword, hashedPassword)).to.be.true;
    expect(result).to.be.false;
  });
});
