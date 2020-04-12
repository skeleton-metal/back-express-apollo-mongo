require('dotenv')

export default {
    colors: {
        primary: '#3E8F8D',
        onPrimary: '#FFFFFF',
        secondary: '#397A5B',
        onSecondary: '#FFFFFF',
    },
    logo: {
        mode: 'Round',
        title: 'Skeleton',
        filename: 'logo.png',
        url: process.env.APP_API_URL + '/media/logo/logo.png'
    },
    language: 'es'
}
