/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as AuthLayoutImport } from './routes/_auth/_layout'
import { Route as AuthLayoutIndexImport } from './routes/_auth/_layout.index'
import { Route as AuthLayoutSettingsImport } from './routes/_auth/_layout.settings'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLayoutIndexRoute = AuthLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutSettingsRoute = AuthLayoutSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_layout': {
      id: '/_auth/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_layout/settings': {
      id: '/_auth/_layout/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthLayoutSettingsImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/': {
      id: '/_auth/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthLayoutIndexImport
      parentRoute: typeof AuthLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthLayoutSettingsRoute: typeof AuthLayoutSettingsRoute
  AuthLayoutIndexRoute: typeof AuthLayoutIndexRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutSettingsRoute: AuthLayoutSettingsRoute,
  AuthLayoutIndexRoute: AuthLayoutIndexRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

interface AuthRouteChildren {
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthLayoutRouteWithChildren
  '/login': typeof LoginRoute
  '/settings': typeof AuthLayoutSettingsRoute
  '/': typeof AuthLayoutIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/settings': typeof AuthLayoutSettingsRoute
  '/': typeof AuthLayoutIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/_auth/_layout': typeof AuthLayoutRouteWithChildren
  '/_auth/_layout/settings': typeof AuthLayoutSettingsRoute
  '/_auth/_layout/': typeof AuthLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/login' | '/settings' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/login' | '/settings' | '/'
  id:
    | '__root__'
    | '/_auth'
    | '/login'
    | '/_auth/_layout'
    | '/_auth/_layout/settings'
    | '/_auth/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/login"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/_layout"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/_layout": {
      "filePath": "_auth/_layout.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_layout/settings",
        "/_auth/_layout/"
      ]
    },
    "/_auth/_layout/settings": {
      "filePath": "_auth/_layout.settings.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/": {
      "filePath": "_auth/_layout.index.tsx",
      "parent": "/_auth/_layout"
    }
  }
}
ROUTE_MANIFEST_END */