import { GraphQLNonNull, GraphQLString } from 'graphql';

export default  {
    _id: {
        type: GraphQLNonNull(GraphQLString),
        description: 'mongoose _id',
        resolve: ({ _id } )=> ({ _id: _id.toString() }),
    },
};