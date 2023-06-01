const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isAdmin } = require('../middleware/verifyAuthToken');

describe('isLoggedIn', () => {
    let req, res, next;

    beforeEach(() => {
        req = { cookies: {} };
        res = {
            status: sinon.stub().returnsThis(),
            send: sinon.stub()
        };
        next = sinon.stub();
    });

    it('should return 403 if token is missing', () => {
        isLoggedIn(req, res, next);

        expect(res.status.calledWith(403)).to.be.true;
        expect(res.send.calledWith('A token is required for authentication.')).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should set req.user and call next if token is valid', () => {
        req.cookies.accessToken = 'valid_token';

        const decodedToken = { userId: '123456789' };
        sinon.stub(jwt, 'verify').returns(decodedToken);

        isLoggedIn(req, res, next);

        expect(jwt.verify.calledWith('valid_token', process.env.JWT_SECRET_KEY)).to.be.true;
        expect(req.user).to.deep.equal(decodedToken);
        expect(next.calledOnce).to.be.true;

        jwt.verify.restore();
    });

    it('should return 401 if token is invalid', () => {
        req.cookies.accessToken = 'invalid_token';

        sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

        isLoggedIn(req, res, next);

        expect(jwt.verify.calledWith('invalid_token', process.env.JWT_SECRET_KEY)).to.be.true;
        expect(res.status.calledWith(401)).to.be.true;
        expect(res.send.calledWith('Unauthorized. Invalid Token')).to.be.true;
        expect(next.called).to.be.false;

        jwt.verify.restore();
    });
});

describe('isAdmin', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: sinon.stub().returnsThis(),
            send: sinon.stub()
        };
        next = sinon.stub();
    });

    it('should call next if user is admin', () => {
        req.user = {
            isAdmin: true
        };

        isAdmin(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(res.status.called).to.be.false;
        expect(res.send.called).to.be.false;
    });

    it('should return 401 if user is not admin', () => {
        req.user = {
            isAdmin: false
        };

        isAdmin(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.send.calledWith('Unauthorized. Admin Required')).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should return 401 if user is not present in the request', () => {
        isAdmin(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.send.calledWith('Unauthorized. Admin Required')).to.be.true;
        expect(next.called).to.be.false;
    });
});
