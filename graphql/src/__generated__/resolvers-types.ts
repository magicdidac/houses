import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = undefined | T;
export type InputMaybe<T> = undefined | T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type House = {
  __typename?: 'House';
  ana: PersonInfo;
  description: Scalars['String']['output'];
  didac: PersonInfo;
  features: HouseFeatures;
  globalRate?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  images: Array<Maybe<Scalars['String']['output']>>;
  link: Scalars['String']['output'];
  location: HouseLocation;
  mapImage: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  realPrice: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type HouseFeatures = {
  __typename?: 'HouseFeatures';
  area: Scalars['Int']['output'];
  baths?: Maybe<Scalars['Int']['output']>;
  rooms: Scalars['Int']['output'];
};

export type HouseLocation = {
  __typename?: 'HouseLocation';
  city: Scalars['String']['output'];
  lat: Scalars['String']['output'];
  lon: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addHouse?: Maybe<Scalars['Boolean']['output']>;
  anaNotes?: Maybe<Scalars['Boolean']['output']>;
  anaRate?: Maybe<Scalars['Boolean']['output']>;
  didacNotes?: Maybe<Scalars['Boolean']['output']>;
  didacRate?: Maybe<Scalars['Boolean']['output']>;
  disableHouse?: Maybe<Scalars['Boolean']['output']>;
  editHouse?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationAddHouseArgs = {
  anaNotes?: InputMaybe<Scalars['String']['input']>;
  anaRate?: InputMaybe<Scalars['Int']['input']>;
  didacNotes?: InputMaybe<Scalars['String']['input']>;
  didacRate?: InputMaybe<Scalars['Int']['input']>;
  link: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};


export type MutationAnaNotesArgs = {
  id: Scalars['Int']['input'];
  notes: Scalars['String']['input'];
};


export type MutationAnaRateArgs = {
  id: Scalars['Int']['input'];
  rate: Scalars['Int']['input'];
};


export type MutationDidacNotesArgs = {
  id: Scalars['Int']['input'];
  notes: Scalars['String']['input'];
};


export type MutationDidacRateArgs = {
  id: Scalars['Int']['input'];
  rate: Scalars['Int']['input'];
};


export type MutationDisableHouseArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditHouseArgs = {
  id: Scalars['Int']['input'];
  link: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};

export type PersonInfo = {
  __typename?: 'PersonInfo';
  carDuration: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getHouseById?: Maybe<House>;
  getHouses?: Maybe<Array<Maybe<House>>>;
  isDuplicated?: Maybe<Scalars['Int']['output']>;
};


export type QueryGetHouseByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryIsDuplicatedArgs = {
  link: Scalars['String']['input'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  House: ResolverTypeWrapper<House>;
  HouseFeatures: ResolverTypeWrapper<HouseFeatures>;
  HouseLocation: ResolverTypeWrapper<HouseLocation>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PersonInfo: ResolverTypeWrapper<PersonInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  House: House;
  HouseFeatures: HouseFeatures;
  HouseLocation: HouseLocation;
  Int: Scalars['Int']['output'];
  Mutation: {};
  PersonInfo: PersonInfo;
  Query: {};
  String: Scalars['String']['output'];
};

export type HouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['House'] = ResolversParentTypes['House']> = {
  ana?: Resolver<ResolversTypes['PersonInfo'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  didac?: Resolver<ResolversTypes['PersonInfo'], ParentType, ContextType>;
  features?: Resolver<ResolversTypes['HouseFeatures'], ParentType, ContextType>;
  globalRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['HouseLocation'], ParentType, ContextType>;
  mapImage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  realPrice?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HouseFeaturesResolvers<ContextType = any, ParentType extends ResolversParentTypes['HouseFeatures'] = ResolversParentTypes['HouseFeatures']> = {
  area?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  baths?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rooms?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HouseLocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['HouseLocation'] = ResolversParentTypes['HouseLocation']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lon?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addHouse?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddHouseArgs, 'link' | 'price'>>;
  anaNotes?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAnaNotesArgs, 'id' | 'notes'>>;
  anaRate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAnaRateArgs, 'id' | 'rate'>>;
  didacNotes?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDidacNotesArgs, 'id' | 'notes'>>;
  didacRate?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDidacRateArgs, 'id' | 'rate'>>;
  disableHouse?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDisableHouseArgs, 'id'>>;
  editHouse?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationEditHouseArgs, 'id' | 'link' | 'price'>>;
};

export type PersonInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonInfo'] = ResolversParentTypes['PersonInfo']> = {
  carDuration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getHouseById?: Resolver<Maybe<ResolversTypes['House']>, ParentType, ContextType, RequireFields<QueryGetHouseByIdArgs, 'id'>>;
  getHouses?: Resolver<Maybe<Array<Maybe<ResolversTypes['House']>>>, ParentType, ContextType>;
  isDuplicated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryIsDuplicatedArgs, 'link'>>;
};

export type Resolvers<ContextType = any> = {
  House?: HouseResolvers<ContextType>;
  HouseFeatures?: HouseFeaturesResolvers<ContextType>;
  HouseLocation?: HouseLocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PersonInfo?: PersonInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

