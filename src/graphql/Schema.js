import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql'

import {
  getListOfObjects
} from './testServices'

let ProductType = new GraphQLObjectType({
  name: 'Product',
  description: "This refers to product",
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    category: {type: GraphQLString},
    brand: {type: GraphQLString}
  }
});

let CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: "This refers to category",
  fields: {
    id: {type: GraphQLInt},
    name: {type: GraphQLString}
  }
});


var Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve: obj => getListOfObjects(null, 'products')
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: obj => getListOfObjects(null, 'categories')
    }
  }
});

export default new GraphQLSchema({
  query: Root
});
