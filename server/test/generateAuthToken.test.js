const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const generateAuthToken = require('../utilities/generateAuthToken'); // Replace `yourModule` with the appropriate module name

describe('generateAuthToken', () => {
    it('should generate a valid JWT token with the given user data', () => {
        const user = {
            _id: '123456789',
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            isAdmin: true
        };
        const expectedToken = 'valid_token';
        const jwtSignStub = sinon.stub(jwt, 'sign').returns(expectedToken);

        const token = generateAuthToken(user);

        expect(jwtSignStub.calledWith(
            {
                _id: '123456789',
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@example.com',
                isAdmin: true
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7h' }
        )).to.be.true;

        jwt.sign.restore();
    });
});
