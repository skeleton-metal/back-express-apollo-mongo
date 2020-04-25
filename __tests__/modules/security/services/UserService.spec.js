import {
    auth, changePassword,
    createUser,
    deleteUser,
    findUserByUsername,
    updateUser
} from "../../../../src/modules/security/services/UserService";
import {findRoleByName} from "../../../../src/modules/security/services/RoleService";
import mongoConnect from "../../../__utils__/mongoConnect";
import {initSecurity} from "../../../../src/modules/security/services/UserInitService";

describe("UserService", () => {

    let connection;

    beforeAll(async () => {
        connection = await mongoConnect()
        await initSecurity()
    });

    afterAll(async  () => {
        await connection.close();
    })



    test('LoginOk', async () => {

        let user = {username: 'root', password: 'root.123'}

        await expect(auth(user, null))
            .resolves.toHaveProperty('token',)

    }, 2000);

    test('LoginFail', async () => {

        let user = {username: 'root', password: 'badpassword'}

        await expect(auth(user, null))
            .rejects.toMatch('BadCredentials');

    }, 2000);

    test('LoginUserDoesntExist', async () => {

        let user = {username: 'iamlegend', password: '321'}

        await expect(auth(user, null))
            .rejects.toMatch('UserDoesntExist');

    }, 2000);



    test('createUserOk ', async () => {
        let role = await findRoleByName('admin')
        let userDoc = {
            username: 'jrambo',
            email: 'jrambo@gmail.com',
            name: 'Jhon Rambo',
            password: '123',
            role:  role.id
        }

        await expect(createUser(userDoc, null)).resolves.toHaveProperty('username','jrambo')

    }, 2000);



    test('updateUserOk ', async () => {
        let user = await findUserByUsername('jrambo')
        user.name = 'Jhon Rambo Reloaded'

        await expect(updateUser(user.id,user, null)).resolves.toHaveProperty('username','jrambo')

    }, 2000);


    test('ChangePasswordOk', async () => {
        let user = await findUserByUsername('jrambo')

        await expect(changePassword(user.id, {password:'abc',passwordVerify: 'abc'}, user))
            .resolves.toHaveProperty('success', true);


        await expect(auth({username: 'jrambo', password: 'abc'}, null))
            .resolves.toHaveProperty('token',)


    }, 2000);

    test('deleteUserOk ', async () => {
        let user = await findUserByUsername('jrambo')
        user.name = 'Jhon Rambo Reloaded'

        await expect(deleteUser(user.id)).resolves.toHaveProperty('success',true)

    }, 2000);

})

