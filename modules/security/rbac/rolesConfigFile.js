const rolesConfigFile = [
    {
        name: 'admin',
        permissions: ['write', 'read']
    },
    {
        name: 'user',
        permissions: ['read']
    }
]
)

const roleConfigPromise = new Promise((resolve) => {
    resolve(rolesConfigFile)
});

export default roleConfigPromise;

