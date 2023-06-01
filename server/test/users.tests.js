const { expect } = require('chai');
const sinon = require('sinon');
const User = require('../routes/users/users.model.js'); // Import the User model
const { register, login } = require('../routes/users/users.controller.js'); // Replace `yourModule` with the appropriate module name
const generateAuthToken = require('../utilities/generateAuthToken.js');

describe('Register', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        next = sinon.stub();
    });

    it('should return 400 and an error message if any input is missing', async () => {
        await register(req, res, next);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ error: 'All inputs are required' })).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should return 400 and an error message if user already exists', async () => {
        req.body = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        };

        sinon.stub(User, 'findOne').resolves({ email: 'johndoe@example.com' });

        await register(req, res, next);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ error: 'user exists' })).to.be.true;
        expect(next.called).to.be.false;

        User.findOne.restore();
    });

    it('should create a new user if all inputs are provided and user does not exist', async () => {
        req.body = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        };

        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(User, 'create').resolves({}); // You can customize the response object if needed

        await register(req, res, next);

        expect(User.create.calledOnce).to.be.true;
        expect(User.create.calledWith({
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            password: sinon.match.string // You can use sinon.match to assert the password hash
        })).to.be.true;
        expect(next.called).to.be.false;

        User.findOne.restore();
        User.create.restore();
    });

    it('should call next with an error if an error occurs during user creation', async () => {
        req.body = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            password: 'password123'
        };

        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(User, 'create').throws(new Error('Failed to create user'));

        await register(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(next.calledWith(sinon.match.instanceOf(Error))).to.be.true;

        User.findOne.restore();
        User.create.restore();
    });
});

describe('Login', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: sinon.stub().returnsThis(),
            send: sinon.spy(),
            cookie: sinon.spy(),
            json: sinon.spy()
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore()
    })

    it('should return 400 and an error message if email or password is missing', async () => {
        await login(req, res, next);

        expect(res.status.calledWith(400)).to.be.true;
        expect(res.send.calledWith('All inputs are required')).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should return 401 and an error message if email or password is incorrect', async () => {
        req.body = {
            email: 'johndoe@example.com',
            password: 'wrongpassword'
        };

        sinon.stub(User, 'findOne').resolves(null);

        await login(req, res, next);

        expect(res.status.calledWith(401)).to.be.true;
        expect(res.send.calledWith({ error: 'User Not Authorized' })).to.be.true;
        expect(next.called).to.be.false;
    });

    it('should log in the user and return the user object with access token', async () => {
        req.body = {
            email: 'johndoe@example.com',
            password: 'password123',
            doNotLogout: true
        };

        const user = {
            _id: '123456789',
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            isAdmin: true,
        };

        sinon.stub(User, 'findOne').resolves(user);
        
        await login(req, res, next);

        expect(res.cookie.calledWith(
            'access_token',
            sinon.match.string,
            sinon.match.string)).to.be.true; // <-- Error here
        expect(res.json.calledWith({
            success: 'user logged in',
            user: {
                _id: '123456789',
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@example.com',
                isAdmin: true,
                doNotLogout: true
            }
        })).to.be.true;
        expect(next.called).to.be.false;
    });


    it('should call next with an error if an error occurs during login', async () => {
        req.body = {
            email: 'johndoe@example.com',
            password: 'password123',
            doNotLogout: true
        };

        sinon.stub(User, 'findOne').throws(new Error('Failed to find user'));

        await login(req, res, next);

        expect(next.calledOnce).to.be.true;
        expect(next.calledWith(sinon.match.instanceOf(Error))).to.be.true;
    });

});
