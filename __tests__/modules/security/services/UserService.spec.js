import {auth,  createUser} from "../../../../src/modules/security/services/UserService";
import {createRole} from "../../../../src/modules/security/services/RoleService";
import mongoConnect from "../../../__utils__/mongoConnect";

describe("UserService", () => {

    let connection;
    let role;

    beforeAll(async () => {
        connection = await mongoConnect()
        role = await createRole( {name: 'admin', permissions: []})
    });

    afterAll(async  () => {

        await connection.close();
    })


    test('createUserOk ', async () => {

        let userDoc = {
            username: 'jrambo',
            email: 'jrambo@gmail.com',
            name: 'Jhon Rambo',
            password: '123',
            role: role.id
        }

        await expect(createUser(userDoc, null)).resolves.toHaveProperty('username','jrambo')

    }, 2000);

    test('LoginOk', async () => {

        let user = {username: 'jrambo', password: '123'}

        await expect(auth(user, null)).resolves.toHaveProperty('token',)

    }, 2000);

    test('LoginFail', async () => {

        let user = {username: 'jrambo', password: '321'}

        await expect(auth(user, null)).rejects.toMatch('BadCredentials');

    }, 2000);

    test('LoginUserDoesntExist', async () => {

        let user = {username: 'jwick', password: '321'}

        await expect(auth(user, null)).rejects.toMatch('UserDoesntExist');

    }, 2000);
})

