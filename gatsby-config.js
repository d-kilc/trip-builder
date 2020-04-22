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
        //     resolve: 'gatsby-source-graphql',
        //     options: {
        //         // This type will contain remote schema Query type
        //         typeName: "GoogleMaps",
        //         // This is the field under which it's accessible
        //         fieldName: "gmaps",
        //         url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCa8crWdUo2jvzQWYP2GjWtAxTuyyodDac'
        //     }
        // },
        // {
        //     resolve: 'gatsby-source-googlemaps-geocoding',
        //     options: {
        //         key: 'AIzaSyCa8crWdUo2jvzQWYP2GjWtAxTuyyodDac',
        //         address: 'Chicago, IL'
        //     }
        // }
    ]
}
