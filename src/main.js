// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'toastr',
  'ux-constants', 'ux-configs', 'ux-routings', 'ux-runs', 'ux-directives', 'ux-filters', 'ux-services', 'ux-components', 'ux-pages'])

var uxConstants = angular.module('ux-constants', []);
var uxConfigs = angular.module('ux-configs', []);
var uxRoutings = angular.module('ux-routings', []);
var uxRuns = angular.module('ux-runs', []);
var uxDirectives = angular.module('ux-directives', []);
var uxFilters = angular.module('ux-filters', []);
var uxServices = angular.module('ux-services', []);
var uxComponents = angular.module('ux-components', []);
var uxPages = angular.module('ux-pages', []);
