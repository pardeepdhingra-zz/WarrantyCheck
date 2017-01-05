let products = [
    {
      id: "1",
      user_id: "1",
      category: "TV",
      name: "LED40",
      brand: "Videocon",
      barcode: "1231314324",
      manufacturer: "Videocon",
      seller_id: null,
      seller_name: null,
      tin_service_tag: null,
      purchase_date: '23/1/2016',
      model_name: "LED40VBIKL"
    }
]


import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';

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

var Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve: obj => products
    }
  }
});

export default new GraphQLSchema({
  query: Root
});
