angular.module('fingertips')
  .controller('MainCtrl', function() {
    'use strict';

    var vm = this;

    vm.hello = 'Hello, Norin';
    vm.about = 'About us';
    vm.contact = 'Contact us';

    return vm;
  });