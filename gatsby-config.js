/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
// config goes here
    siteMetadata: {
        title: 'Trip Builder',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-typography',
            options: {
                pathToConfigModule: './src/utils/typography'
            }
        },
        // {
        //     resolve: 'gatsby-source-googlemaps-geocoding',
        //     options: {
        //         key: 'AIzaSyCa8crWdUo2jvzQWYP2GjWtAxTuyyodDac',
        //         address: 'Chicago, IL'
        //     }
        // }
    ]
}
