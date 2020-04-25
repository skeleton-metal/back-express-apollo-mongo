import {auth,  createUser} from "../../../../src/modules/security/services/UserService";
import mongoConnect from "../../../__utils__/mongoConnect";
describe("UserService", () => {
    let connection = {}

    beforeAll(async () => {
        connection = await mongoConnect()
    });

    afterAll(async  () => {

        await connection.close();
    })

    test('createUser ok ', async () => {

        let userDoc = {
            id: "5ea4239bd4b3e606ee0d8ae1",
            _id: "5ea4239bd4b3e606ee0d8ae1",
            username: 'jrambo',
            email: 'jrambo@gmail.com',
            name: 'Jhon Rambo',
            password: '123'
        }


        await expect(createUser(userDoc, null)).resolves.toHaveProperty('username','jrambo')

    }, 2000);

    test('Login ok', async () => {

        let user = {username: 'jrambo', password: '123'}

        await expect(auth(user, null)).resolves.toHaveProperty('token',)

    }, 2000);
})

