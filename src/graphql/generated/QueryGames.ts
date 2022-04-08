/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryGames
// ====================================================

export interface QueryGames_games_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryGames_games_developers {
  __typename: "Developer";
  name: string;
}

export interface QueryGames_games {
  __typename: "Game";
  name: string;
  slug: string;
  cover: QueryGames_games_cover | null;
  developers: QueryGames_games_developers[];
  price: number;
}

export interface QueryGames_upcomingGames_cover {
  __typename: "UploadFile";
  url: string;
}

export interface QueryGames_upcomingGames_developers {
  __typename: "Developer";
  name: string;
}

export interface QueryGames_upcomingGames {
  __typename: "Game";
  name: string;
  slug: string;
  cover: QueryGames_upcomingGames_cover | null;
  developers: QueryGames_upcomingGames_developers[];
  price: number;
}

export interface QueryGames {
  games: QueryGames_games[];
  upcomingGames: QueryGames_upcomingGames[];
}

export interface QueryGamesVariables {
  limit: number;
  start?: number | null;
  where?: any | null;
  sort?: string | null;
}
