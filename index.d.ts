// Type definitions for react-relay 1.3
// Project: https://github.com/facebook/relay
// Definitions by: Johannes Schickling <https://github.com/graphcool>
//                 Matt Martin <https://github.com/voxmatt>
//                 Eloy Durán <https://github.com/alloy>
//                 Nicolas Pirotte <https://github.com/npirotte>
//                 Cameron Knight <https://github.com/ckknight>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

export {
    commitLocalUpdate,
    commitRelayModernMutation as commitMutation,
    fetchRelayModernQuery as fetchQuery,
    GraphQLTaggedNode,
    requestRelaySubscription as requestSubscription,
} from "relay-runtime";

import * as React from "react";
import * as RelayRuntimeTypes from "relay-runtime";

// ~~~~~~~~~~~~~~~~~~~~~
// Utility types
// ~~~~~~~~~~~~~~~~~~~~~

// Taken from https://github.com/pelotom/type-zoo
// tslint:disable-next-line:strict-export-declare-modifiers
type Omit<T, K extends keyof T> = Pick<T, ({ [P in keyof T]: P } & { [P in K]: never } & { [x: string]: never, [x: number]: never })[keyof T]>;

export type RemoveRelayProp<P> = Omit<P & { relay: never }, "relay">;

export interface ComponentRef {
    componentRef?: (ref: any) => void;
}

export type RelayContainer<T> = React.ComponentType<RemoveRelayProp<T> & ComponentRef>;

// ~~~~~~~~~~~~~~~~~~~~~
// Maybe Fix
// ~~~~~~~~~~~~~~~~~~~~~
export type ConcreteFragmentDefinition = object;
export type ConcreteOperationDefinition = object;

// ~~~~~~~~~~~~~~~~~~~~~
// RelayProp
// ~~~~~~~~~~~~~~~~~~~~~
// note: refetch and pagination containers augment this
export interface RelayProp {
    environment: RelayRuntimeTypes.Environment;
}

// ~~~~~~~~~~~~~~~~~~~~~
// RelayQL
// ~~~~~~~~~~~~~~~~~~~~~
export function RelayQL(strings: string[], ...substitutions: any[]): RelayRuntimeTypes.RelayConcreteNode;

// ~~~~~~~~~~~~~~~~~~~~~
// ReactRelayTypes
// ~~~~~~~~~~~~~~~~~~~~~
export interface GeneratedNodeMap {
    [key: string]: RelayRuntimeTypes.GraphQLTaggedNode;
}

/**
 * Runtime function to correspond to the `graphql` tagged template function.
 * All calls to this function should be transformed by the plugin.
 */
export interface GraphqlInterface {
    (strings: string[] | TemplateStringsArray): RelayRuntimeTypes.GraphQLTaggedNode;
    experimental(strings: string[] | TemplateStringsArray): RelayRuntimeTypes.GraphQLTaggedNode;
}
export const graphql: GraphqlInterface;

// CHANGED: (cvle) added AnyProps.
export interface AnyProps {
  [propName: string]: any
}

// ~~~~~~~~~~~~~~~~~~~~~
// ReactRelayQueryRenderer
// ~~~~~~~~~~~~~~~~~~~~~
// Changed: (cvle) added Generics.
export interface QueryRendererProps<V =  RelayRuntimeTypes.Variables, P = AnyProps> {
    cacheConfig?: RelayRuntimeTypes.CacheConfig;
    environment: RelayRuntimeTypes.Environment;
    query?: RelayRuntimeTypes.GraphQLTaggedNode | null;
    render(readyState: ReadyState<P>): React.ReactElement<any> | undefined | null;
    variables: RelayRuntimeTypes.Variables;
    rerunParamExperimental?: RelayRuntimeTypes.RerunParam;
}

// CHANGED: (cvle) Added Generic variable P.
export interface ReadyState<P = AnyProps> {
    error: Error | undefined | null;
    props: P | undefined | null;
    retry?(): void;
}
export interface QueryRendererState {
    readyState: ReadyState;
}
export class ReactRelayQueryRenderer extends React.Component<QueryRendererProps, QueryRendererState> {}
export class QueryRenderer extends ReactRelayQueryRenderer {}

// ~~~~~~~~~~~~~~~~~~~~~
// createFragmentContainer
// ~~~~~~~~~~~~~~~~~~~~~
export function createFragmentContainer<T>(
    Component: React.ComponentType<T>,
    fragmentSpec: RelayRuntimeTypes.GraphQLTaggedNode | GeneratedNodeMap
): RelayContainer<T>;

// ~~~~~~~~~~~~~~~~~~~~~
// createPaginationContainer
// ~~~~~~~~~~~~~~~~~~~~~
export interface PageInfo {
    endCursor: string | undefined | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | undefined | null;
}
export interface ConnectionData {
    edges?: ReadonlyArray<any>; // CHANGED: (cvle) Changed to ReadonlyArray
    pageInfo?: PageInfo;
}
export type RelayPaginationProp = RelayProp & {
    hasMore(): boolean;
    isLoading(): boolean;
    loadMore(
        pageSize: number,
        callback: (error?: Error) => void,
        options?: RefetchOptions
    ): RelayRuntimeTypes.Disposable | undefined | null;
    refetchConnection(
        totalCount: number,
        callback: (error?: Error) => void,
        refetchVariables?: RelayRuntimeTypes.Variables
    ): RelayRuntimeTypes.Disposable | undefined | null;
};

// CHANGED: (cvle) Fix type and add generic.
export type FragmentVariablesGetter<V = RelayRuntimeTypes.Variables> = (
    prevVars: V,
    totalCount: number
) => V;

// CHANGED: (cvle) Improved Generic Types.
export interface ConnectionConfig<T = AnyProps, F = RelayRuntimeTypes.Variables, V = RelayRuntimeTypes.Variables> {
    direction?: "backward" | "forward";
    getConnectionFromProps?(props: T): ConnectionData | undefined | null;
    getFragmentVariables?: FragmentVariablesGetter<F>;
    getVariables(
        props: T,
        paginationInfo: { count: number; cursor?: string },
        fragmentVariables: F
    ): V;
    query: RelayRuntimeTypes.GraphQLTaggedNode;
}
export function createPaginationContainer<T>(
    Component: React.ComponentType<T>,
    fragmentSpec: RelayRuntimeTypes.GraphQLTaggedNode | GeneratedNodeMap,
    connectionConfig: ConnectionConfig<T>
): RelayContainer<T>;

// ~~~~~~~~~~~~~~~~~~~~~
// createRefetchContainer
// ~~~~~~~~~~~~~~~~~~~~~
export interface RefetchOptions {
    force?: boolean;
    rerunParamExperimental?: RelayRuntimeTypes.RerunParam;
}
export type RelayRefetchProp = RelayProp & {
    refetch(
        refetchVariables:
            | RelayRuntimeTypes.Variables
            | ((fragmentVariables: RelayRuntimeTypes.Variables) => RelayRuntimeTypes.Variables),
        renderVariables?: RelayRuntimeTypes.Variables,
        callback?: (error?: Error) => void,
        options?: RefetchOptions
    ): RelayRuntimeTypes.Disposable;
};
export function createRefetchContainer<T>(
    Component: React.ComponentType<T>,
    fragmentSpec: RelayRuntimeTypes.GraphQLTaggedNode | GeneratedNodeMap,
    taggedNode: RelayRuntimeTypes.GraphQLTaggedNode
): RelayContainer<T>;
