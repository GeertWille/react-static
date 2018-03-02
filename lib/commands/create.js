'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _inquirerAutocompletePrompt = require('inquirer-autocomplete-prompt');

var _inquirerAutocompletePrompt2 = _interopRequireDefault(_inquirerAutocompletePrompt);

var _matchSorter = require('match-sorter');

var _matchSorter2 = _interopRequireDefault(_matchSorter);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _util = require('util');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var enterModule = require('react-hot-loader').enterModule;

  enterModule && enterModule(module);
})();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_inquirer2.default.registerPrompt('autocomplete', _inquirerAutocompletePrompt2.default);

function handleCliArguments(args, examples) {
  var _this = this;

  var prompts = [];
  var nameInput = void 0;
  var template = void 0;
  args.forEach(function (arg) {
    if (arg.indexOf('--name') === 0) {
      nameInput = arg.substring(7);
    } else if (arg.indexOf('--template') === 0) {
      var templateInput = arg.substring(11);
      if (examples.includes(templateInput)) {
        template = templateInput;
      }
    }
  });
  if (!nameInput) {
    prompts.push({
      type: 'input',
      name: 'name',
      message: 'What should we name this project?',
      default: 'my-static-site'
    });
  }
  if (!template) {
    prompts.push({
      type: 'autocomplete',
      name: 'template',
      message: 'Select a template below...',
      source: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(answersSoFar, input) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', !input ? examples : (0, _matchSorter2.default)(examples, input));

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function source(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }()
    });
  }
  return {
    prompts: prompts,
    nameInput: nameInput,
    template: template
  };
}

var _default = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(cliArguments) {
    var files, exampleList, _handleCliArguments, prompts, nameInput, template, shouldPrompt, answers, dest, githubRepoAnswer, getGitRepo, isYarn;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _fsExtra2.default.readdir(_path2.default.resolve(__dirname, '../../examples/'));

          case 2:
            files = _context2.sent;


            console.log('');

            exampleList = files.filter(function (d) {
              return !d.startsWith('.');
            });

            exampleList = ['basic'].concat(_toConsumableArray(exampleList.filter(function (d) {
              return d !== 'basic';
            })), ['custom']);

            _handleCliArguments = handleCliArguments(cliArguments, exampleList), prompts = _handleCliArguments.prompts, nameInput = _handleCliArguments.nameInput, template = _handleCliArguments.template;
            shouldPrompt = !nameInput || !template;

            if (!shouldPrompt) {
              _context2.next = 14;
              break;
            }

            _context2.next = 11;
            return _inquirer2.default.prompt(prompts);

          case 11:
            _context2.t0 = _context2.sent;
            _context2.next = 15;
            break;

          case 14:
            _context2.t0 = {};

          case 15:
            answers = _context2.t0;


            if (nameInput) {
              answers.name = nameInput;
            }
            if (template) {
              answers.template = template;
            }

            console.time(_chalk2.default.green('=> [\u2713] Project "' + answers.name + '" created'));
            console.log('=> Creating new react-static project...');
            dest = _path2.default.resolve(process.cwd(), answers.name);

            if (!(answers.template === 'custom')) {
              _context2.next = 35;
              break;
            }

            _context2.next = 24;
            return _inquirer2.default.prompt([{
              type: 'input',
              name: 'githubRepoName',
              message: 'Specify a public repo from GitHub, BitBucket, or GitLab that has your custom template. Use the form "ownerName/repoName".',
              default: 'mjsisley/react-static-template-basic'
            }]);

          case 24:
            githubRepoAnswer = _context2.sent;
            getGitRepo = (0, _util.promisify)(_downloadGitRepo2.default);
            _context2.prev = 26;
            _context2.next = 29;
            return getGitRepo(githubRepoAnswer.githubRepoName, dest);

          case 29:
            _context2.next = 33;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t1 = _context2['catch'](26);

          case 33:
            _context2.next = 37;
            break;

          case 35:
            _context2.next = 37;
            return _fsExtra2.default.copy(_path2.default.resolve(__dirname, '../../examples/' + answers.template), dest);

          case 37:

            // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
            // See: https://github.com/npm/npm/issues/1862
            _fsExtra2.default.move(_path2.default.join(dest, 'gitignore'), _path2.default.join(dest, '.gitignore'), [], function (err) {
              if (err) {
                // Append if there's already a `.gitignore` file there
                if (err.code === 'EEXIST') {
                  var data = _fsExtra2.default.readFileSync(_path2.default.join(dest, 'gitignore'));
                  _fsExtra2.default.appendFileSync(_path2.default.join(dest, '.gitignore'), data);
                  _fsExtra2.default.unlinkSync(_path2.default.join(dest, 'gitignore'));
                } else {
                  throw err;
                }
              }
            });

            isYarn = shouldUseYarn();


            console.log('=> Installing dependencies with: ' + (isYarn ? _chalk2.default.hex(_utils.ChalkColor.yarn)('Yarn') : _chalk2.default.hex(_utils.ChalkColor.npm)('NPM')) + '...');
            // We install react-static separately to ensure we always have the latest stable release
            (0, _child_process.execSync)('cd ' + answers.name + ' && ' + (isYarn ? 'yarn' : 'npm install') + ' && ' + (isYarn ? 'yarn add react-static@latest' : 'npm install react-static@latest --save'));
            console.log('');
            console.timeEnd(_chalk2.default.green('=> [\u2713] Project "' + answers.name + '" created'));

            console.log('\n' + _chalk2.default.green('=> To get started:') + '\n\n    cd ' + answers.name + '\n\n    ' + (isYarn ? _chalk2.default.hex(_utils.ChalkColor.yarn)('yarn') : _chalk2.default.hex(_utils.ChalkColor.npm)('npm run')) + ' start ' + _chalk2.default.green('- Start the development server') + '\n    ' + (isYarn ? _chalk2.default.hex(_utils.ChalkColor.yarn)('yarn') : _chalk2.default.hex(_utils.ChalkColor.npm)('npm run')) + ' build ' + _chalk2.default.green('- Build for production') + '\n    ' + (isYarn ? _chalk2.default.hex(_utils.ChalkColor.yarn)('yarn') : _chalk2.default.hex(_utils.ChalkColor.npm)('npm run')) + ' serve ' + _chalk2.default.green('- Test a production build locally') + '\n  ');

          case 44:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[26, 31]]);
  }));

  return function _default(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;


function shouldUseYarn() {
  try {
    (0, _child_process.execSync)('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}
;

(function () {
  var reactHotLoader = require('react-hot-loader').default;

  var leaveModule = require('react-hot-loader').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(handleCliArguments, 'handleCliArguments', 'src/commands/create.js');
  reactHotLoader.register(shouldUseYarn, 'shouldUseYarn', 'src/commands/create.js');
  reactHotLoader.register(_default, 'default', 'src/commands/create.js');
  leaveModule(module);
})();

;