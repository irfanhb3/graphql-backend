const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } = graphql;

var tvSeries = [
	{name: 'Sacred Games', genre: 'Crime Thriller', id: '1', directorId: '1'},
	{name: 'Breaking Bad', genre: 'Crime Thriller', id: '2', directorId: '2'},
	{name: 'Game of Thrones', genre: 'Fantasy', id: '3', directorId: '3'},
	{name: 'Ghost Stories', genre: 'Mystery', id: '4', directorId: '1'}
];

var directors = [
	{name: "Vincent Giligan", age: '53', id: '2'},
	{name: "Anurag Kashyap", age: '45', id: '1'},
	{name: "David Benioff", age: '49', id: '3'}
]

const TvSeriesType = new GraphQLObjectType({
	name:'TvSeries',
	fields: ()=> ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		director: { type: DirectorType,
			resolve(parent, args) {
				return _.find(directors, {id: parent.directorId})
			}
		}
	})
});

const DirectorType = new GraphQLObjectType({
	name:'Director',
	fields: () => ({
		name: { type: GraphQLString },
		age: { type: GraphQLString },
		id: { type: GraphQLID },
		tvSeries: { type: new GraphQLList(TvSeriesType),
			resolve(parent, args) {
				return _.filter(tvSeries, { directorId: parent.id })
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields: {
		tvSeries: {
			type: TvSeriesType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return _.find(tvSeries, { id: args.id });
			}
		},
		director: {
			type: DirectorType,
			args: {id: {type: GraphQLID}},
			resolve(parent, args) {
				return _.find(directors, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});