import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import paginationHelper from './helpers/paginationHelper';

window.paginationHelper = paginationHelper;

import generateTableHelper from './helpers/generateTableHelper';

window.generateTableHelper = generateTableHelper;