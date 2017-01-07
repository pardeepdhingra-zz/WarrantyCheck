import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql'

import {
  getListOfObjects,
  getListOfObjectsFromAnObject
} from './services'

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

let BrandType = new GraphQLObjectType({
  name: 'Brand',
  description: "This refers to brand",
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
    },
    brands: {
      type: new GraphQLList(BrandType),
      args: {
        category_id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: (obj, {category_id}) =>
        getListOfObjectsFromAnObject(null, 'brands', 'categories', category_id)
    },
  }
});

export default new GraphQLSchema({
  query: Root
});
