function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import require$$0, { useMemo, useCallback, forwardRef, useRef, useState, useImperativeHandle } from 'react';
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var immutabilityHelper = {
  exports: {}
};

(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function stringifiable(obj) {
    // Safely stringify Object.create(null)

    /* istanbul ignore next */
    return _typeof(obj) === 'object' && !('toString' in obj) ? Object.prototype.toString.call(obj).slice(8, -1) : obj;
  }

  var isProduction = (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process.env.NODE_ENV === 'production';

  function invariant(condition, message) {
    if (!condition) {
      /* istanbul ignore next */
      if (isProduction) {
        throw new Error('Invariant failed');
      }

      throw new Error(message());
    }
  }

  exports.invariant = invariant;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var splice = Array.prototype.splice;
  var toString = Object.prototype.toString;

  function type(obj) {
    return toString.call(obj).slice(8, -1);
  }

  var assign = Object.assign ||
  /* istanbul ignore next */
  function (target, source) {
    getAllKeys(source).forEach(function (key) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    });
    return target;
  };

  var getAllKeys = typeof Object.getOwnPropertySymbols === 'function' ? function (obj) {
    return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj));
  }
  /* istanbul ignore next */
  : function (obj) {
    return Object.keys(obj);
  };

  function copy(object) {
    return Array.isArray(object) ? assign(object.constructor(object.length), object) : type(object) === 'Map' ? new Map(object) : type(object) === 'Set' ? new Set(object) : object && _typeof(object) === 'object' ? assign(Object.create(Object.getPrototypeOf(object)), object)
    /* istanbul ignore next */
    : object;
  }

  var Context =
  /** @class */
  function () {
    function Context() {
      this.commands = assign({}, defaultCommands);
      this.update = this.update.bind(this); // Deprecated: update.extend, update.isEquals and update.newContext

      this.update.extend = this.extend = this.extend.bind(this);

      this.update.isEquals = function (x, y) {
        return x === y;
      };

      this.update.newContext = function () {
        return new Context().update;
      };
    }

    Object.defineProperty(Context.prototype, "isEquals", {
      get: function get() {
        return this.update.isEquals;
      },
      set: function set(value) {
        this.update.isEquals = value;
      },
      enumerable: true,
      configurable: true
    });

    Context.prototype.extend = function (directive, fn) {
      this.commands[directive] = fn;
    };

    Context.prototype.update = function (object, $spec) {
      var _this = this;

      var spec = typeof $spec === 'function' ? {
        $apply: $spec
      } : $spec;

      if (!(Array.isArray(object) && Array.isArray(spec))) {
        invariant(!Array.isArray(spec), function () {
          return "update(): You provided an invalid spec to update(). The spec may " + "not contain an array except as the value of $set, $push, $unshift, " + "$splice or any custom command allowing an array value.";
        });
      }

      invariant(_typeof(spec) === 'object' && spec !== null, function () {
        return "update(): You provided an invalid spec to update(). The spec and " + "every included key path must be plain objects containing one of the " + ("following commands: " + Object.keys(_this.commands).join(', ') + ".");
      });
      var nextObject = object;
      getAllKeys(spec).forEach(function (key) {
        if (hasOwnProperty.call(_this.commands, key)) {
          var objectWasNextObject = object === nextObject;
          nextObject = _this.commands[key](spec[key], nextObject, spec, object);

          if (objectWasNextObject && _this.isEquals(nextObject, object)) {
            nextObject = object;
          }
        } else {
          var nextValueForKey = type(object) === 'Map' ? _this.update(object.get(key), spec[key]) : _this.update(object[key], spec[key]);
          var nextObjectValue = type(nextObject) === 'Map' ? nextObject.get(key) : nextObject[key];

          if (!_this.isEquals(nextValueForKey, nextObjectValue) || typeof nextValueForKey === 'undefined' && !hasOwnProperty.call(object, key)) {
            if (nextObject === object) {
              nextObject = copy(object);
            }

            if (type(nextObject) === 'Map') {
              nextObject.set(key, nextValueForKey);
            } else {
              nextObject[key] = nextValueForKey;
            }
          }
        }
      });
      return nextObject;
    };

    return Context;
  }();

  exports.Context = Context;
  var defaultCommands = {
    $push: function $push(value, nextObject, spec) {
      invariantPushAndUnshift(nextObject, spec, '$push');
      return value.length ? nextObject.concat(value) : nextObject;
    },
    $unshift: function $unshift(value, nextObject, spec) {
      invariantPushAndUnshift(nextObject, spec, '$unshift');
      return value.length ? value.concat(nextObject) : nextObject;
    },
    $splice: function $splice(value, nextObject, spec, originalObject) {
      invariantSplices(nextObject, spec);
      value.forEach(function (args) {
        invariantSplice(args);

        if (nextObject === originalObject && args.length) {
          nextObject = copy(originalObject);
        }

        splice.apply(nextObject, args);
      });
      return nextObject;
    },
    $set: function $set(value, _nextObject, spec) {
      invariantSet(spec);
      return value;
    },
    $toggle: function $toggle(targets, nextObject) {
      invariantSpecArray(targets, '$toggle');
      var nextObjectCopy = targets.length ? copy(nextObject) : nextObject;
      targets.forEach(function (target) {
        nextObjectCopy[target] = !nextObject[target];
      });
      return nextObjectCopy;
    },
    $unset: function $unset(value, nextObject, _spec, originalObject) {
      invariantSpecArray(value, '$unset');
      value.forEach(function (key) {
        if (Object.hasOwnProperty.call(nextObject, key)) {
          if (nextObject === originalObject) {
            nextObject = copy(originalObject);
          }

          delete nextObject[key];
        }
      });
      return nextObject;
    },
    $add: function $add(values, nextObject, _spec, originalObject) {
      invariantMapOrSet(nextObject, '$add');
      invariantSpecArray(values, '$add');

      if (type(nextObject) === 'Map') {
        values.forEach(function (_a) {
          var key = _a[0],
              value = _a[1];

          if (nextObject === originalObject && nextObject.get(key) !== value) {
            nextObject = copy(originalObject);
          }

          nextObject.set(key, value);
        });
      } else {
        values.forEach(function (value) {
          if (nextObject === originalObject && !nextObject.has(value)) {
            nextObject = copy(originalObject);
          }

          nextObject.add(value);
        });
      }

      return nextObject;
    },
    $remove: function $remove(value, nextObject, _spec, originalObject) {
      invariantMapOrSet(nextObject, '$remove');
      invariantSpecArray(value, '$remove');
      value.forEach(function (key) {
        if (nextObject === originalObject && nextObject.has(key)) {
          nextObject = copy(originalObject);
        }

        nextObject["delete"](key);
      });
      return nextObject;
    },
    $merge: function $merge(value, nextObject, _spec, originalObject) {
      invariantMerge(nextObject, value);
      getAllKeys(value).forEach(function (key) {
        if (value[key] !== nextObject[key]) {
          if (nextObject === originalObject) {
            nextObject = copy(originalObject);
          }

          nextObject[key] = value[key];
        }
      });
      return nextObject;
    },
    $apply: function $apply(value, original) {
      invariantApply(value);
      return value(original);
    }
  };
  var defaultContext = new Context();
  exports.isEquals = defaultContext.update.isEquals;
  exports.extend = defaultContext.extend;
  exports["default"] = defaultContext.update; // @ts-ignore

  exports["default"]["default"] = module.exports = assign(exports["default"], exports); // invariants

  function invariantPushAndUnshift(value, spec, command) {
    invariant(Array.isArray(value), function () {
      return "update(): expected target of " + stringifiable(command) + " to be an array; got " + stringifiable(value) + ".";
    });
    invariantSpecArray(spec[command], command);
  }

  function invariantSpecArray(spec, command) {
    invariant(Array.isArray(spec), function () {
      return "update(): expected spec of " + stringifiable(command) + " to be an array; got " + stringifiable(spec) + ". " + "Did you forget to wrap your parameter in an array?";
    });
  }

  function invariantSplices(value, spec) {
    invariant(Array.isArray(value), function () {
      return "Expected $splice target to be an array; got " + stringifiable(value);
    });
    invariantSplice(spec.$splice);
  }

  function invariantSplice(value) {
    invariant(Array.isArray(value), function () {
      return "update(): expected spec of $splice to be an array of arrays; got " + stringifiable(value) + ". " + "Did you forget to wrap your parameters in an array?";
    });
  }

  function invariantApply(fn) {
    invariant(typeof fn === 'function', function () {
      return "update(): expected spec of $apply to be a function; got " + stringifiable(fn) + ".";
    });
  }

  function invariantSet(spec) {
    invariant(Object.keys(spec).length === 1, function () {
      return "Cannot have more than one key in an object with $set";
    });
  }

  function invariantMerge(target, specValue) {
    invariant(specValue && _typeof(specValue) === 'object', function () {
      return "update(): $merge expects a spec of type 'object'; got " + stringifiable(specValue);
    });
    invariant(target && _typeof(target) === 'object', function () {
      return "update(): $merge expects a target of type 'object'; got " + stringifiable(target);
    });
  }

  function invariantMapOrSet(target, command) {
    var typeOfTarget = type(target);
    invariant(typeOfTarget === 'Map' || typeOfTarget === 'Set', function () {
      return "update(): " + stringifiable(command) + " expects a target of type Set or Map; got " + stringifiable(typeOfTarget);
    });
  }
})(immutabilityHelper, immutabilityHelper.exports);

var update = /*@__PURE__*/getDefaultExportFromCjs(immutabilityHelper.exports);

function pathing(p1, p2, startPosition, endPosition) {
  var points = [];
  var start = [p1.x, p1.y];
  var end = [p2.x, p2.y];
  var centerX = start[0] + (end[0] - start[0]) / 2;
  var centerY = start[1] + (end[1] - start[1]) / 2;
  var second;

  var addVerticalCenterLine = function addVerticalCenterLine() {
    var third = [centerX, second[1]];
    var forth = [centerX, penult[1]];
    points.push(third);
    points.push(forth);
  };

  var addHorizontalCenterLine = function addHorizontalCenterLine() {
    var third = [second[0], centerY];
    var forth = [penult[0], centerY];
    points.push(third);
    points.push(forth);
  };

  var addHorizontalTopLine = function addHorizontalTopLine() {
    points.push([second[0], start[1] - 50]);
    points.push([penult[0], start[1] - 50]);
  };

  var addHorizontalBottomLine = function addHorizontalBottomLine() {
    points.push([second[0], start[1] + 50]);
    points.push([penult[0], start[1] + 50]);
  };

  var addVerticalRightLine = function addVerticalRightLine() {
    points.push([start[0] + 80, second[1]]);
    points.push([start[0] + 80, penult[1]]);
  };

  var addVerticalLeftLine = function addVerticalLeftLine() {
    points.push([start[0] - 80, second[1]]);
    points.push([start[0] - 80, penult[1]]);
  };

  var addSecondXPenultY = function addSecondXPenultY() {
    points.push([second[0], penult[1]]);
  };

  var addPenultXSecondY = function addPenultXSecondY() {
    points.push([penult[0], second[1]]);
  };

  switch (startPosition) {
    case "left":
      second = [start[0] - 20, start[1]];
      break;

    case "top":
      second = [start[0], start[1] - 20];
      break;

    case "bottom":
      second = [start[0], start[1] + 20];
      break;

    default:
      second = [start[0] + 20, start[1]];
      break;
  }

  var penult;

  switch (endPosition) {
    case "right":
      penult = [end[0] + 20, end[1]];
      break;

    case "top":
      penult = [end[0], end[1] - 20];
      break;

    case "bottom":
      penult = [end[0], end[1] + 20];
      break;

    default:
      penult = [end[0] - 20, end[1]];
      break;
  }

  points.push(start);
  points.push(second);
  startPosition = startPosition || "right";
  endPosition = endPosition || "left";
  var direction = calcDirection(p1, p2);

  if (direction.indexOf("r") > -1) {
    if (startPosition === "right" || endPosition === "left") {
      if (second[0] > centerX) {
        second[0] = centerX;
      }

      if (penult[0] < centerX) {
        penult[0] = centerX;
      }
    }
  }

  if (direction.indexOf("d") > -1) {
    if (startPosition === "bottom" || endPosition === "top") {
      if (second[1] > centerY) {
        second[1] = centerY;
      }

      if (penult[1] < centerY) {
        penult[1] = centerY;
      }
    }
  }

  if (direction.indexOf("l") > -1) {
    if (startPosition === "left" || endPosition === "right") {
      if (second[0] < centerX) {
        second[0] = centerX;
      }

      if (penult[0] > centerX) {
        penult[0] = centerX;
      }
    }
  }

  if (direction.indexOf("u") > -1) {
    if (startPosition === "top" || endPosition === "bottom") {
      if (second[1] < centerY) {
        second[1] = centerY;
      }

      if (penult[1] > centerY) {
        penult[1] = centerY;
      }
    }
  }

  switch (direction) {
    case "lu":
      {
        if (startPosition === "right") {
          switch (endPosition) {
            case "top":
            case "right":
              addSecondXPenultY();
              break;

            default:
              {
                addHorizontalCenterLine();
                break;
              }
          }
        } else if (startPosition === "bottom") {
          switch (endPosition) {
            case "top":
              addVerticalCenterLine();
              break;

            default:
              {
                addPenultXSecondY();
                break;
              }
          }
        } else if (startPosition === "top") {
          switch (endPosition) {
            case "top":
            case "right":
              addSecondXPenultY();
              break;

            default:
              {
                addHorizontalCenterLine();
                break;
              }
          }
        } else {
          // startPosition is left
          switch (endPosition) {
            case "top":
            case "right":
              addVerticalCenterLine();
              break;

            default:
              {
                addPenultXSecondY();
                break;
              }
          }
        }

        break;
      }

    case "u":
      if (startPosition === "right") {
        switch (endPosition) {
          case "right":
            {
              break;
            }

          case "top":
            {
              addSecondXPenultY();
              break;
            }

          default:
            {
              addHorizontalCenterLine();
              break;
            }
        }
      } else if (startPosition === "bottom") {
        switch (endPosition) {
          case "left":
          case "right":
            addPenultXSecondY();
            break;

          default:
            {
              addVerticalRightLine();
              break;
            }
        }
      } else if (startPosition === "top") {
        switch (endPosition) {
          case "left":
            {
              addPenultXSecondY();
              break;
            }

          case "right":
            {
              addHorizontalCenterLine();
              break;
            }

          case "top":
            addVerticalRightLine();
            break;
        }
      } else {
        // left
        switch (endPosition) {
          case "left":
          case "right":
            break;

          default:
            {
              points.push([second[0], penult[1]]);
              break;
            }
        }
      }

      break;

    case "ru":
      if (startPosition === "right") {
        switch (endPosition) {
          case "left":
            {
              addVerticalCenterLine();
              break;
            }

          case "top":
            {
              addSecondXPenultY();
              break;
            }

          default:
            {
              addPenultXSecondY();
              break;
            }
        }
      } else if (startPosition === "bottom") {
        switch (endPosition) {
          case "top":
            {
              addVerticalCenterLine();
              break;
            }

          default:
            {
              addPenultXSecondY();
              break;
            }
        }
      } else if (startPosition === "top") {
        switch (endPosition) {
          case "right":
            {
              addVerticalCenterLine();
              break;
            }

          default:
            {
              addSecondXPenultY();
              break;
            }
        }
      } else {
        // left
        switch (endPosition) {
          case "left":
          case "top":
            addSecondXPenultY();
            break;

          default:
            {
              addHorizontalCenterLine();
              break;
            }
        }
      }

      break;

    case "l":
      if (startPosition === "right") {
        switch (endPosition) {
          case "left":
          case "right":
          case "top":
            addHorizontalTopLine();
            break;

          default:
            {
              addHorizontalBottomLine();
              break;
            }
        }
      } else if (startPosition === "bottom") {
        switch (endPosition) {
          case "left":
            {
              addHorizontalBottomLine();
              break;
            }

          case "right":
            {
              addSecondXPenultY();
              break;
            }

          case "top":
            {
              addVerticalCenterLine();
              break;
            }
        }
      } else if (startPosition === "top") {
        switch (endPosition) {
          case "left":
            {
              addHorizontalTopLine();
              break;
            }

          case "right":
            {
              addSecondXPenultY();
              break;
            }

          case "top":
            {
              break;
            }

          default:
            {
              addVerticalCenterLine();
              break;
            }
        }
      } else {
        // left
        switch (endPosition) {
          case "left":
            {
              addHorizontalTopLine();
              break;
            }

          case "right":
            {
              break;
            }

          default:
            {
              addSecondXPenultY();
              break;
            }
        }
      }

      break;

    case "r":
      if (startPosition === "right") {
        switch (endPosition) {
          case "left":
            {
              break;
            }

          case "right":
            {
              addHorizontalTopLine();
              break;
            }

          default:
            {
              addSecondXPenultY();
              break;
            }
        }
      } else if (startPosition === "bottom") {
        switch (endPosition) {
          case "left":
            {
              addSecondXPenultY();
              break;
            }

          case "right":
            {
              addHorizontalBottomLine();
              break;
            }

          case "top":
            {
              addVerticalCenterLine();
              break;
            }
        }
      } else if (startPosition === "top") {
        switch (endPosition) {
          case "left":
            {
              addPenultXSecondY();
              break;
            }

          case "right":
            {
              addHorizontalTopLine();
              break;
            }

          case "top":
            {
              break;
            }

          default:
            {
              addVerticalCenterLine();
              break;
            }
        }
      } else {
        // left
        switch (endPosition) {
          case "left":
          case "right":
          case "top":
            addHorizontalTopLine();
            break;

          default:
            {
              addHorizontalBottomLine();
              break;
            }
        }
      }

      break;

    case "ld":
      if (startPosition === "right") {
        switch (endPosition) {
          case "left":
            {
              addHorizontalCenterLine();
              break;
            }

          default:
            {
              addSecondXPenultY();
              break;
            }
        }
      } else if (startPosition === "bottom") {
        switch (endPosition) {
          case "left":
            {
              addPenultXSecondY();
              break;
            }

          case "top":
            {
              addHorizontalCenterLine();
              break;
            }

          default:
            {
              addSecondXPenultY();
              break;
            }
        }
      } else if (startPosition === "top") {
        switch (endPosition) {
          case "left":
          case "right":
          case "top":
            addPenultXSecondY();
            break;

          default:
            {
              addVerticalCenterLine();
              break;
            }
        }
      } else {
        // left
        switch (endPosition) {
          case "left":
          case "top":
            addPenultXSecondY();
            break;

          case "right":
            {
              addVerticalCenterLine();
              break;
            }

          default:
            {
              addSecondXPenultY();
              break;
            }
        }
      }

      break;

    case "d":
      if (startPosition === "right") {
        switch (endPosition) {
          case "left":
            {
              addHorizontalCenterLine();
              break;
            }

          case "right":
            {
              addPenultXSecondY();
              break;
            }

          case "top":
            {
              addSecondXPenultY();
              break;
            }

          default:
            {
              addVerticalRightLine();
              break;
            }
        }
      } else if (startPosition === "bottom") {
        switch (endPosition) {
          case "left":
          case "right":
            addPenultXSecondY();
            break;

          case "top":
            {
              break;
            }

          default:
            {
              addVerticalRightLine();
              break;
            }
        }
      } else if (startPosition === "top") {
        switch (endPosition) {
          case "left":
            {
              addVerticalLeftLine();
              break;
            }

          default:
            {
              addVerticalRightLine();
              break;
            }
        }
      } else {
        // left
        switch (endPosition) {
          case "left":
            {
              break;
            }

          case "right":
            {
              addHorizontalCenterLine();
              break;
            }

          case "top":
            {
              addSecondXPenultY();
              break;
            }

          default:
            {
              addVerticalLeftLine();
              break;
            }
        }
      }

      break;

    case "rd":
      {
        if (startPosition === "right" && endPosition === "left") {
          addVerticalCenterLine();
        } else if (startPosition === "right" && endPosition === "bottom") {
          addSecondXPenultY();
        } else if (startPosition === "right" && endPosition === "top" || startPosition === "right" && endPosition === "right") {
          addPenultXSecondY();
        } else if (startPosition === "bottom" && endPosition === "left") {
          addSecondXPenultY();
        } else if (startPosition === "bottom" && endPosition === "right") {
          addPenultXSecondY();
        } else if (startPosition === "bottom" && endPosition === "top") {
          addHorizontalCenterLine();
        } else if (startPosition === "bottom" && endPosition === "bottom") {
          addSecondXPenultY();
        } else if (startPosition === "top" && endPosition === "left") {
          addPenultXSecondY();
        } else if (startPosition === "top" && endPosition === "right") {
          addPenultXSecondY();
        } else if (startPosition === "top" && endPosition === "top") {
          addPenultXSecondY();
        } else if (startPosition === "top" && endPosition === "bottom") {
          addVerticalCenterLine();
        } else if (startPosition === "left" && endPosition === "left") {
          addSecondXPenultY();
        } else if (startPosition === "left" && endPosition === "right") {
          addHorizontalCenterLine();
        } else if (startPosition === "left" && endPosition === "top") {
          addHorizontalCenterLine();
        } else if (startPosition === "left" && endPosition === "bottom") {
          addSecondXPenultY();
        }

        break;
      }
  }

  points.push(penult);
  points.push(end);
  return points;
}

function calcDirection(p1, p2) {
  // Use approximatelyEquals to fix the problem of css position precision
  if (p2.x < p1.x && p2.y === p1.y) {
    return "l";
  }

  if (p2.x > p1.x && p2.y === p1.y) {
    return "r";
  }

  if (p2.x === p1.x && p2.y < p1.y) {
    return "u";
  }

  if (p2.x === p1.x && p2.y > p1.y) {
    return "d";
  }

  if (p2.x < p1.x && p2.y < p1.y) {
    return "lu";
  }

  if (p2.x > p1.x && p2.y < p1.y) {
    return "ru";
  }

  if (p2.x < p1.x && p2.y > p1.y) {
    return "ld";
  }

  return "rd";
}

function distanceOfP2P(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function distanceOfP2L(point, line) {
  var start = line[0],
      end = line[1];
  var k = (end.y - start.y || 1) / (end.x - start.x || 1);
  var b = start.y - k * start.x;
  return Math.abs(k * point.x - point.y + b) / Math.sqrt(k * k + 1);
}

function calcCorners(points) {
  var minX = points.reduce(function (prev, point) {
    return point.x < prev ? point.x : prev;
  }, Infinity);
  var maxX = points.reduce(function (prev, point) {
    return point.x > prev ? point.x : prev;
  }, 0);
  var minY = points.reduce(function (prev, point) {
    return point.y < prev ? point.y : prev;
  }, Infinity);
  var maxY = points.reduce(function (prev, point) {
    return point.y > prev ? point.y : prev;
  }, 0);
  return {
    start: {
      x: minX,
      y: minY
    },
    end: {
      x: maxX,
      y: maxY
    }
  };
}

function center(nodes, width, height) {
  var corners = calcCorners(__spreadArray(__spreadArray([], nodes, true), nodes.map(function (node) {
    return {
      x: node.x + (node.width || 120),
      y: node.y + (node.height || 60)
    };
  }), true));
  var offsetX = (width - corners.end.x - corners.start.x) / 2;
  var offsetY = (height - corners.end.y - corners.start.y) / 2;
  return update(nodes, {
    $apply: function $apply(state) {
      return state.map(function (node) {
        return _assign(_assign({}, node), {
          x: roundTo10(node.x + offsetX),
          y: roundTo10(node.y + offsetY)
        });
      });
    }
  });
}

function isIntersected(p, rect) {
  return p.x > rect.start.x && p.x < rect.end.x && p.y > rect.start.y && p.y < rect.end.y;
}

function roundTo10(number) {
  return Math.ceil(number / 10) * 10;
}

function locateConnector(node) {
  var height = node.height || 60;
  var width = node.width || 120;
  var halfWidth = width / 2;
  var halfHeight = height / 2;
  var top = {
    x: node.x + halfWidth,
    y: node.y
  };
  var left = {
    x: node.x,
    y: node.y + halfHeight
  };
  var bottom = {
    x: node.x + halfWidth,
    y: node.y + height
  };
  var right = {
    x: node.x + width,
    y: node.y + halfHeight
  };
  return {
    left: left,
    right: right,
    top: top,
    bottom: bottom
  };
}
/**
 * Get angle positions: top-left, top-right, bottom-right, bottom-left
 * @param node
 */


function locateAngle(node) {
  var width = node.width || 120;
  var height = node.height || 60;
  return [{
    x: node.x,
    y: node.y
  }, {
    x: node.x + width,
    y: node.y
  }, {
    x: node.x + width,
    y: node.y + height
  }, {
    x: node.x,
    y: node.y + height
  }];
}

function calcIntersectedConnections(internalNodes, internalConnections, rect) {
  var result = [];

  var _loop_1 = function _loop_1(internalConnection) {
    var srcNodeData = internalNodes.find(function (item) {
      return item.id === internalConnection.source.id;
    });
    var destNodeData = internalNodes.find(function (item) {
      return item.id === internalConnection.destination.id;
    });
    var points = pathing(locateConnector(srcNodeData)[internalConnection.source.position], locateConnector(destNodeData)[internalConnection.destination.position], internalConnection.source.position, internalConnection.destination.position);

    if (points.some(function (point) {
      return isIntersected({
        x: point[0],
        y: point[1]
      }, rect);
    })) {
      result.push(internalConnection);
    }
  };

  for (var _i = 0, internalConnections_1 = internalConnections; _i < internalConnections_1.length; _i++) {
    var internalConnection = internalConnections_1[_i];

    _loop_1(internalConnection);
  }

  return result;
}

function calcIntersectedNodes(internalNodes, edge) {
  var tempCurrentNodes = [];
  internalNodes.forEach(function (item) {
    if (locateAngle(item).some(function (point) {
      return isIntersected(point, edge);
    })) {
      tempCurrentNodes.push(item);
    }
  });
  return tempCurrentNodes;
}

function createConnection(sourceId, sourcePosition, destinationId, destinationPosition) {
  return {
    source: {
      id: sourceId,
      position: sourcePosition
    },
    destination: {
      id: destinationId,
      position: destinationPosition
    },
    type: "success"
  };
}

function calcGuidelines(node, nodes) {
  var guidelines = [];
  var points = locateAngle(node);

  for (var i = 0; i < points.length; i++) {
    var srcAnglePoint = {
      x: roundTo10(points[i].x),
      y: roundTo10(points[i].y)
    };
    var lines = void 0;
    var directions = void 0;

    switch (i) {
      case 0:
        {
          lines = [[{
            x: srcAnglePoint.x,
            y: 0
          }, srcAnglePoint], [{
            x: 0,
            y: srcAnglePoint.y
          }, srcAnglePoint]];
          directions = ["lu", "u", "l"];
          break;
        }

      case 1:
        {
          lines = [[{
            x: srcAnglePoint.x,
            y: 0
          }, srcAnglePoint], // todo: replace 10000 with the width of svg
          [{
            x: 10000,
            y: srcAnglePoint.y
          }, srcAnglePoint]];
          directions = ["ru", "u", "r"];
          break;
        }

      case 2:
        {
          lines = [[{
            x: srcAnglePoint.x,
            y: 10000
          }, srcAnglePoint], [{
            x: 10000,
            y: srcAnglePoint.y
          }, srcAnglePoint]];
          directions = ["r", "rd", "d"];
          break;
        }

      default:
        {
          lines = [[{
            x: srcAnglePoint.x,
            y: 10000
          }, srcAnglePoint], [{
            x: 0,
            y: srcAnglePoint.y
          }, srcAnglePoint]];
          directions = ["l", "ld", "d"];
          break;
        }
    }

    for (var _i = 0, _a = nodes.filter(function (internalNode) {
      return internalNode.id !== node.id;
    }); _i < _a.length; _i++) {
      var destination = _a[_i];
      var line = null;

      for (var _b = 0, _c = locateAngle(destination); _b < _c.length; _b++) {
        var destPoint = _c[_b];
        var direction = calcDirection(srcAnglePoint, destPoint);

        if (directions.indexOf(direction) > -1 && (distanceOfP2L(destPoint, lines[0]) < 5 || distanceOfP2L(destPoint, lines[1]) < 5)) {
          if (line === null || distanceOfP2P(destPoint, srcAnglePoint) < distanceOfP2P(line[0], line[1])) {
            line = [destPoint, srcAnglePoint];
          }
        }
      }

      if (line) {
        guidelines.push(line);
      }
    }
  }

  return guidelines;
}

var jsxRuntime = {
  exports: {}
};
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var f = require$$0,
    k = Symbol["for"]("react.element"),
    l = Symbol["for"]("react.fragment"),
    m = Object.prototype.hasOwnProperty,
    n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function q(c, a, g) {
  var b,
      d = {},
      e = null,
      h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);

  for (b in a) {
    m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  }

  if (c && c.defaultProps) for (b in a = c.defaultProps, a) {
    void 0 === d[b] && (d[b] = a[b]);
  }
  return {
    $$typeof: k,
    type: c,
    key: e,
    ref: h,
    props: d,
    _owner: n.current
  };
}

reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== "production") {
  (function () {
    var React = require$$0; // ATTENTION
    // When adding new symbols to this file,
    // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
    // The Symbol used to tag the ReactElement-like types.

    var REACT_ELEMENT_TYPE = Symbol["for"]('react.element');
    var REACT_PORTAL_TYPE = Symbol["for"]('react.portal');
    var REACT_FRAGMENT_TYPE = Symbol["for"]('react.fragment');
    var REACT_STRICT_MODE_TYPE = Symbol["for"]('react.strict_mode');
    var REACT_PROFILER_TYPE = Symbol["for"]('react.profiler');
    var REACT_PROVIDER_TYPE = Symbol["for"]('react.provider');
    var REACT_CONTEXT_TYPE = Symbol["for"]('react.context');
    var REACT_FORWARD_REF_TYPE = Symbol["for"]('react.forward_ref');
    var REACT_SUSPENSE_TYPE = Symbol["for"]('react.suspense');
    var REACT_SUSPENSE_LIST_TYPE = Symbol["for"]('react.suspense_list');
    var REACT_MEMO_TYPE = Symbol["for"]('react.memo');
    var REACT_LAZY_TYPE = Symbol["for"]('react.lazy');
    var REACT_OFFSCREEN_TYPE = Symbol["for"]('react.offscreen');
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || _typeof(maybeIterable) !== 'object') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }

    var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    function error(format) {
      {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          printWarning('error', format, args);
        }
      }
    }

    function printWarning(level, format, args) {
      // When changing this logic, you might want to also
      // update consoleWithStackDev.www.js as well.
      {
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame.getStackAddendum();

        if (stack !== '') {
          format += '%s';
          args = args.concat([stack]);
        } // eslint-disable-next-line react-internal/safe-string-coercion


        var argsWithFormat = args.map(function (item) {
          return String(item);
        }); // Careful: RN currently depends on this prefix

        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        // eslint-disable-next-line react-internal/no-production-logging

        Function.prototype.apply.call(console[level], console, argsWithFormat);
      }
    } // -----------------------------------------------------------------------------


    var enableScopeAPI = false; // Experimental Create Event Handle API.

    var enableCacheElement = false;
    var enableTransitionTracing = false; // No known bugs, but needs performance testing

    var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
    // stuff. Intended to enable React core members to more easily debug scheduling
    // issues in DEV builds.

    var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

    var REACT_MODULE_REFERENCE;
    {
      REACT_MODULE_REFERENCE = Symbol["for"]('react.module.reference');
    }

    function isValidElementType(type) {
      if (typeof type === 'string' || typeof type === 'function') {
        return true;
      } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


      if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
        return true;
      }

      if (_typeof(type) === 'object' && type !== null) {
        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
          return true;
        }
      }

      return false;
    }

    function getWrappedName(outerType, innerType, wrapperName) {
      var displayName = outerType.displayName;

      if (displayName) {
        return displayName;
      }

      var functionName = innerType.displayName || innerType.name || '';
      return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
    } // Keep in sync with react-reconciler/getComponentNameFromFiber


    function getContextName(type) {
      return type.displayName || 'Context';
    } // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


    function getComponentNameFromType(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case REACT_PROFILER_TYPE:
          return 'Profiler';

        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';

        case REACT_SUSPENSE_TYPE:
          return 'Suspense';

        case REACT_SUSPENSE_LIST_TYPE:
          return 'SuspenseList';
      }

      if (_typeof(type) === 'object') {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            var context = type;
            return getContextName(context) + '.Consumer';

          case REACT_PROVIDER_TYPE:
            var provider = type;
            return getContextName(provider._context) + '.Provider';

          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, 'ForwardRef');

          case REACT_MEMO_TYPE:
            var outerName = type.displayName || null;

            if (outerName !== null) {
              return outerName;
            }

            return getComponentNameFromType(type.type) || 'Memo';

          case REACT_LAZY_TYPE:
            {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          // eslint-disable-next-line no-fallthrough
        }
      }

      return null;
    }

    var assign = Object.assign; // Helpers to patch console.logs to avoid logging during side-effect free
    // replaying on render function. This currently only patches the object
    // lazily which won't cover if the log function was extracted eagerly.
    // We could also eagerly patch the method.

    var disabledDepth = 0;
    var prevLog;
    var prevInfo;
    var prevWarn;
    var prevError;
    var prevGroup;
    var prevGroupCollapsed;
    var prevGroupEnd;

    function disabledLog() {}

    disabledLog.__reactDisabledLog = true;

    function disableLogs() {
      {
        if (disabledDepth === 0) {
          /* eslint-disable react-internal/no-production-logging */
          prevLog = console.log;
          prevInfo = console.info;
          prevWarn = console.warn;
          prevError = console.error;
          prevGroup = console.group;
          prevGroupCollapsed = console.groupCollapsed;
          prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

          var props = {
            configurable: true,
            enumerable: true,
            value: disabledLog,
            writable: true
          }; // $FlowFixMe Flow thinks console is immutable.

          Object.defineProperties(console, {
            info: props,
            log: props,
            warn: props,
            error: props,
            group: props,
            groupCollapsed: props,
            groupEnd: props
          });
          /* eslint-enable react-internal/no-production-logging */
        }

        disabledDepth++;
      }
    }

    function reenableLogs() {
      {
        disabledDepth--;

        if (disabledDepth === 0) {
          /* eslint-disable react-internal/no-production-logging */
          var props = {
            configurable: true,
            enumerable: true,
            writable: true
          }; // $FlowFixMe Flow thinks console is immutable.

          Object.defineProperties(console, {
            log: assign({}, props, {
              value: prevLog
            }),
            info: assign({}, props, {
              value: prevInfo
            }),
            warn: assign({}, props, {
              value: prevWarn
            }),
            error: assign({}, props, {
              value: prevError
            }),
            group: assign({}, props, {
              value: prevGroup
            }),
            groupCollapsed: assign({}, props, {
              value: prevGroupCollapsed
            }),
            groupEnd: assign({}, props, {
              value: prevGroupEnd
            })
          });
          /* eslint-enable react-internal/no-production-logging */
        }

        if (disabledDepth < 0) {
          error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
        }
      }
    }

    var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
    var prefix;

    function describeBuiltInComponentFrame(name, source, ownerFn) {
      {
        if (prefix === undefined) {
          // Extract the VM specific prefix used by each line.
          try {
            throw Error();
          } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || '';
          }
        } // We use the prefix to ensure our stacks line up with native stack frames.


        return '\n' + prefix + name;
      }
    }

    var reentry = false;
    var componentFrameCache;
    {
      var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
      componentFrameCache = new PossiblyWeakMap();
    }

    function describeNativeComponentFrame(fn, construct) {
      // If something asked for a stack inside a fake render, it should get ignored.
      if (!fn || reentry) {
        return '';
      }

      {
        var frame = componentFrameCache.get(fn);

        if (frame !== undefined) {
          return frame;
        }
      }
      var control;
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

      Error.prepareStackTrace = undefined;
      var previousDispatcher;
      {
        previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
        // for warnings.

        ReactCurrentDispatcher.current = null;
        disableLogs();
      }

      try {
        // This should throw.
        if (construct) {
          // Something should be setting the props in the constructor.
          var Fake = function Fake() {
            throw Error();
          }; // $FlowFixMe


          Object.defineProperty(Fake.prototype, 'props', {
            set: function set() {
              // We use a throwing setter instead of frozen or non-writable props
              // because that won't throw in a non-strict mode function.
              throw Error();
            }
          });

          if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === 'object' && Reflect.construct) {
            // We construct a different control for this case to include any extra
            // frames added by the construct call.
            try {
              Reflect.construct(Fake, []);
            } catch (x) {
              control = x;
            }

            Reflect.construct(fn, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (x) {
              control = x;
            }

            fn.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            control = x;
          }

          fn();
        }
      } catch (sample) {
        // This is inlined manually because closure doesn't do it for us.
        if (sample && control && typeof sample.stack === 'string') {
          // This extracts the first frame from the sample that isn't also in the control.
          // Skipping one frame that we assume is the frame that calls the two.
          var sampleLines = sample.stack.split('\n');
          var controlLines = control.stack.split('\n');
          var s = sampleLines.length - 1;
          var c = controlLines.length - 1;

          while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
            // We expect at least one stack frame to be shared.
            // Typically this will be the root most one. However, stack frames may be
            // cut off due to maximum stack limits. In this case, one maybe cut off
            // earlier than the other. We assume that the sample is longer or the same
            // and there for cut off earlier. So we should find the root most frame in
            // the sample somewhere in the control.
            c--;
          }

          for (; s >= 1 && c >= 0; s--, c--) {
            // Next we find the first one that isn't the same which should be the
            // frame that called our sample function and the control.
            if (sampleLines[s] !== controlLines[c]) {
              // In V8, the first line is describing the message but other VMs don't.
              // If we're about to return the first line, and the control is also on the same
              // line, that's a pretty good indicator that our sample threw at same line as
              // the control. I.e. before we entered the sample frame. So we ignore this result.
              // This can happen if you passed a class to function component, or non-function.
              if (s !== 1 || c !== 1) {
                do {
                  s--;
                  c--; // We may still have similar intermediate frames from the construct call.
                  // The next one that isn't the same should be our match though.

                  if (c < 0 || sampleLines[s] !== controlLines[c]) {
                    // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                    var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                    // but we have a user-provided "displayName"
                    // splice it in to make the stack more readable.


                    if (fn.displayName && _frame.includes('<anonymous>')) {
                      _frame = _frame.replace('<anonymous>', fn.displayName);
                    }

                    {
                      if (typeof fn === 'function') {
                        componentFrameCache.set(fn, _frame);
                      }
                    } // Return the line we found.

                    return _frame;
                  }
                } while (s >= 1 && c >= 0);
              }

              break;
            }
          }
        }
      } finally {
        reentry = false;
        {
          ReactCurrentDispatcher.current = previousDispatcher;
          reenableLogs();
        }
        Error.prepareStackTrace = previousPrepareStackTrace;
      } // Fallback to just using the name if we couldn't make it throw.


      var name = fn ? fn.displayName || fn.name : '';
      var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
      {
        if (typeof fn === 'function') {
          componentFrameCache.set(fn, syntheticFrame);
        }
      }
      return syntheticFrame;
    }

    function describeFunctionComponentFrame(fn, source, ownerFn) {
      {
        return describeNativeComponentFrame(fn, false);
      }
    }

    function shouldConstruct(Component) {
      var prototype = Component.prototype;
      return !!(prototype && prototype.isReactComponent);
    }

    function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
      if (type == null) {
        return '';
      }

      if (typeof type === 'function') {
        {
          return describeNativeComponentFrame(type, shouldConstruct(type));
        }
      }

      if (typeof type === 'string') {
        return describeBuiltInComponentFrame(type);
      }

      switch (type) {
        case REACT_SUSPENSE_TYPE:
          return describeBuiltInComponentFrame('Suspense');

        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame('SuspenseList');
      }

      if (_typeof(type) === 'object') {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeFunctionComponentFrame(type.render);

          case REACT_MEMO_TYPE:
            // Memo may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

          case REACT_LAZY_TYPE:
            {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                // Lazy may contain any component type so we recursively resolve it.
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {}
            }
        }
      }

      return '';
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var loggedTypeFailures = {};
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

    function setCurrentlyValidatingElement(element) {
      {
        if (element) {
          var owner = element._owner;
          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else {
          ReactDebugCurrentFrame.setExtraStackFrame(null);
        }
      }
    }

    function checkPropTypes(typeSpecs, values, location, componentName, element) {
      {
        // $FlowFixMe This is okay but Flow doesn't know it.
        var has = Function.call.bind(hasOwnProperty);

        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.

            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              if (typeof typeSpecs[typeSpecName] !== 'function') {
                // eslint-disable-next-line react-internal/prod-error-codes
                var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof(typeSpecs[typeSpecName]) + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                err.name = 'Invariant Violation';
                throw err;
              }

              error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
            } catch (ex) {
              error$1 = ex;
            }

            if (error$1 && !(error$1 instanceof Error)) {
              setCurrentlyValidatingElement(element);
              error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, _typeof(error$1));
              setCurrentlyValidatingElement(null);
            }

            if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error$1.message] = true;
              setCurrentlyValidatingElement(element);
              error('Failed %s type: %s', location, error$1.message);
              setCurrentlyValidatingElement(null);
            }
          }
        }
      }
    }

    var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

    function isArray(a) {
      return isArrayImpl(a);
    }
    /*
     * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
     * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
     *
     * The functions in this module will throw an easier-to-understand,
     * easier-to-debug exception with a clear errors message message explaining the
     * problem. (Instead of a confusing exception thrown inside the implementation
     * of the `value` object).
     */
    // $FlowFixMe only called in DEV, so void return is not possible.


    function typeName(value) {
      {
        // toStringTag is needed for namespaced types like Temporal.Instant
        var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
        var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
        return type;
      }
    } // $FlowFixMe only called in DEV, so void return is not possible.


    function willCoercionThrow(value) {
      {
        try {
          testStringCoercion(value);
          return false;
        } catch (e) {
          return true;
        }
      }
    }

    function testStringCoercion(value) {
      // If you ended up here by following an exception call stack, here's what's
      // happened: you supplied an object or symbol value to React (as a prop, key,
      // DOM attribute, CSS property, string ref, etc.) and when React tried to
      // coerce it to a string using `'' + value`, an exception was thrown.
      //
      // The most common types that will cause this exception are `Symbol` instances
      // and Temporal objects like `Temporal.Instant`. But any object that has a
      // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
      // exception. (Library authors do this to prevent users from using built-in
      // numeric operators like `+` or comparison operators like `>=` because custom
      // methods are needed to perform accurate arithmetic or comparison.)
      //
      // To fix the problem, coerce this object or symbol value to a string before
      // passing it to React. The most reliable way is usually `String(value)`.
      //
      // To find which value is throwing, check the browser or debugger console.
      // Before this exception was thrown, there should be `console.error` output
      // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
      // problem and how that type was used: key, atrribute, input value prop, etc.
      // In most cases, this console output also shows the component and its
      // ancestor components where the exception happened.
      //
      // eslint-disable-next-line react-internal/safe-string-coercion
      return '' + value;
    }

    function checkKeyStringCoercion(value) {
      {
        if (willCoercionThrow(value)) {
          error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));
          return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
        }
      }
    }

    var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;
    var didWarnAboutStringRefs;
    {
      didWarnAboutStringRefs = {};
    }

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function warnIfStringRefCannotBeAutoConverted(config, self) {
      {
        if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
          var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

          if (!didWarnAboutStringRefs[componentName]) {
            error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
            didWarnAboutStringRefs[componentName] = true;
          }
        }
      }
    }

    function defineKeyPropWarningGetter(props, displayName) {
      {
        var warnAboutAccessingKey = function warnAboutAccessingKey() {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
          }
        };

        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
    }

    function defineRefPropWarningGetter(props, displayName) {
      {
        var warnAboutAccessingRef = function warnAboutAccessingRef() {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
          }
        };

        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, instanceof check
     * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} props
     * @param {*} key
     * @param {string|object} ref
     * @param {*} owner
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @internal
     */


    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * https://github.com/reactjs/rfcs/pull/107
     * @param {*} type
     * @param {object} props
     * @param {string} key
     */


    function jsxDEV(type, config, maybeKey, source, self) {
      {
        var propName; // Reserved names are extracted

        var props = {};
        var key = null;
        var ref = null; // Currently, key can be spread in as a prop. This causes a potential
        // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
        // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
        // but as an intermediary step, we will use jsxDEV for everything except
        // <div {...props} key="Hi" />, because we aren't currently able to tell if
        // key is explicitly declared to be undefined or not.

        if (maybeKey !== undefined) {
          {
            checkKeyStringCoercion(maybeKey);
          }
          key = '' + maybeKey;
        }

        if (hasValidKey(config)) {
          {
            checkKeyStringCoercion(config.key);
          }
          key = '' + config.key;
        }

        if (hasValidRef(config)) {
          ref = config.ref;
          warnIfStringRefCannotBeAutoConverted(config, self);
        } // Remaining properties are added to a new props object


        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        } // Resolve default props


        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;

          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }

        if (key || ref) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }

          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }

        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      }
    }

    var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
    var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

    function setCurrentlyValidatingElement$1(element) {
      {
        if (element) {
          var owner = element._owner;
          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else {
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
        }
      }
    }

    var propTypesMisspellWarningShown;
    {
      propTypesMisspellWarningShown = false;
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a ReactElement.
     * @final
     */

    function isValidElement(object) {
      {
        return _typeof(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
    }

    function getDeclarationErrorAddendum() {
      {
        if (ReactCurrentOwner$1.current) {
          var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

          if (name) {
            return '\n\nCheck the render method of `' + name + '`.';
          }
        }

        return '';
      }
    }

    function getSourceInfoErrorAddendum(source) {
      {
        if (source !== undefined) {
          var fileName = source.fileName.replace(/^.*[\\\/]/, '');
          var lineNumber = source.lineNumber;
          return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
        }

        return '';
      }
    }
    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */


    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      {
        var info = getDeclarationErrorAddendum();

        if (!info) {
          var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

          if (parentName) {
            info = "\n\nCheck the top-level render call using <" + parentName + ">.";
          }
        }

        return info;
      }
    }
    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */


    function validateExplicitKey(element, parentType) {
      {
        if (!element._store || element._store.validated || element.key != null) {
          return;
        }

        element._store.validated = true;
        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }

        ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
        // property, it may be the creator of the child that's responsible for
        // assigning it a key.

        var childOwner = '';

        if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
          // Give the component that originally created this child.
          childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
        }

        setCurrentlyValidatingElement$1(element);
        error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
        setCurrentlyValidatingElement$1(null);
      }
    }
    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */


    function validateChildKeys(node, parentType) {
      {
        if (_typeof(node) !== 'object') {
          return;
        }

        if (isArray(node)) {
          for (var i = 0; i < node.length; i++) {
            var child = node[i];

            if (isValidElement(child)) {
              validateExplicitKey(child, parentType);
            }
          }
        } else if (isValidElement(node)) {
          // This element was passed in a valid location.
          if (node._store) {
            node._store.validated = true;
          }
        } else if (node) {
          var iteratorFn = getIteratorFn(node);

          if (typeof iteratorFn === 'function') {
            // Entry iterators used to provide implicit keys,
            // but now we print a separate warning for them later.
            if (iteratorFn !== node.entries) {
              var iterator = iteratorFn.call(node);
              var step;

              while (!(step = iterator.next()).done) {
                if (isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          }
        }
      }
    }
    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */


    function validatePropTypes(element) {
      {
        var type = element.type;

        if (type === null || type === undefined || typeof type === 'string') {
          return;
        }

        var propTypes;

        if (typeof type === 'function') {
          propTypes = type.propTypes;
        } else if (_typeof(type) === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        type.$$typeof === REACT_MEMO_TYPE)) {
          propTypes = type.propTypes;
        } else {
          return;
        }

        if (propTypes) {
          // Intentionally inside to avoid triggering lazy initializers:
          var name = getComponentNameFromType(type);
          checkPropTypes(propTypes, element.props, 'prop', name, element);
        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

          var _name = getComponentNameFromType(type);

          error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
        }

        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
          error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
        }
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      {
        var keys = Object.keys(fragment.props);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];

          if (key !== 'children' && key !== 'key') {
            setCurrentlyValidatingElement$1(fragment);
            error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
            setCurrentlyValidatingElement$1(null);
            break;
          }
        }

        if (fragment.ref !== null) {
          setCurrentlyValidatingElement$1(fragment);
          error('Invalid attribute `ref` supplied to `React.Fragment`.');
          setCurrentlyValidatingElement$1(null);
        }
      }
    }

    function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
      {
        var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
        // succeed and there will likely be errors in render.

        if (!validType) {
          var info = '';

          if (type === undefined || _typeof(type) === 'object' && type !== null && Object.keys(type).length === 0) {
            info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
          }

          var sourceInfo = getSourceInfoErrorAddendum(source);

          if (sourceInfo) {
            info += sourceInfo;
          } else {
            info += getDeclarationErrorAddendum();
          }

          var typeString;

          if (type === null) {
            typeString = 'null';
          } else if (isArray(type)) {
            typeString = 'array';
          } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
            typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
            info = ' Did you accidentally export a JSX literal instead of a component?';
          } else {
            typeString = _typeof(type);
          }

          error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
        }

        var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
        // TODO: Drop this when these are no longer allowed as the type argument.

        if (element == null) {
          return element;
        } // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing errors.
        // We don't want exception behavior to differ between dev and prod.
        // (Rendering will throw with a helpful message and as soon as the type is
        // fixed, the key warnings will appear.)


        if (validType) {
          var children = props.children;

          if (children !== undefined) {
            if (isStaticChildren) {
              if (isArray(children)) {
                for (var i = 0; i < children.length; i++) {
                  validateChildKeys(children[i], type);
                }

                if (Object.freeze) {
                  Object.freeze(children);
                }
              } else {
                error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
              }
            } else {
              validateChildKeys(children, type);
            }
          }
        }

        if (type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        } else {
          validatePropTypes(element);
        }

        return element;
      }
    } // These two functions exist to still get child warnings in dev
    // even with the prod transform. This means that jsxDEV is purely
    // opt-in behavior for better messages but that we won't stop
    // giving you warnings if you use production apis.


    function jsxWithValidationStatic(type, props, key) {
      {
        return jsxWithValidation(type, props, key, true);
      }
    }

    function jsxWithValidationDynamic(type, props, key) {
      {
        return jsxWithValidation(type, props, key, false);
      }
    }

    var jsx = jsxWithValidationDynamic; // we may want to special case jsxs internally to take advantage of static children.
    // for now we can ship identical prod functions

    var jsxs = jsxWithValidationStatic;
    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_development.jsx = jsx;
    reactJsxRuntime_development.jsxs = jsxs;
  })();
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = reactJsxRuntime_production_min;
} else {
  jsxRuntime.exports = reactJsxRuntime_development;
}

var Text = function Text(_a) {
  var data = _a.data;
  var text = typeof data.title === "function" && data.title() || data.title;
  return /*#__PURE__*/jsxRuntime.exports.jsx("foreignObject", _objectSpread(_objectSpread({
    className: "pointer-events-none",
    x: data.x,
    y: data.y,
    width: data.width || 120,
    height: data.height || 60
  }, data.textProps), {}, {
    children: /*#__PURE__*/jsxRuntime.exports.jsx("div", {
      style: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        wordBreak: "break-word",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        lineHeight: "18px"
      },
      children: text
    })
  }));
};

var StartEndNode = function StartEndNode(_a) {
  var data = _a.data,
      _b = _a.isSelected,
      isSelected = _b === void 0 ? false : _b,
      _c = _a.color,
      color = _c === void 0 ? "white" : _c;
  var borderColor = isSelected ? "#666666" : "#bbbbbb";
  var halfWidth = (data.width || 120) / 2;
  var halfHeight = (data.height || 60) / 2;
  return /*#__PURE__*/jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.exports.jsx("ellipse", _objectSpread({
      cx: data.x + halfWidth,
      cy: data.y + halfHeight,
      rx: halfWidth,
      ry: halfHeight,
      fill: color,
      strokeWidth: 1,
      stroke: borderColor
    }, data.containerProps)), /*#__PURE__*/jsxRuntime.exports.jsx(Text, {
      data: data
    })]
  });
};

function G(props) {
  return /*#__PURE__*/jsxRuntime.exports.jsx("g", _objectSpread({
    className: "g " + (props.className || "")
  }, props));
}

function Circle(props) {
  var style = useMemo(function () {
    if (!props.isConnecting) {
      return {};
    }

    return {
      opacity: 1
    };
  }, [props.isConnecting]);
  return /*#__PURE__*/jsxRuntime.exports.jsx("circle", _objectSpread({
    className: "circle",
    style: Object.assign(style, props.style)
  }, props));
}

var strokeProps = {
  strokeWidth: 1,
  stroke: "lightblue"
};

var props = _assign({
  width: 6,
  height: 6,
  fill: "white"
}, strokeProps);

var Resizer = function Resizer(_a) {
  var data = _a.data,
      _onMouseDown = _a.onMouseDown;
  return /*#__PURE__*/jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.exports.jsx("rect", _objectSpread({
      x: data.x,
      y: data.y,
      width: data.width,
      height: data.height,
      fill: "transparent"
    }, strokeProps)), /*#__PURE__*/jsxRuntime.exports.jsx("rect", _objectSpread(_objectSpread({
      className: "cursor-nw-resize",
      x: data.x - 3,
      y: data.y - 3
    }, props), {}, {
      onMouseDown: function onMouseDown(event) {
        event.stopPropagation();

        _onMouseDown("lu");
      }
    })), /*#__PURE__*/jsxRuntime.exports.jsx("rect", _objectSpread(_objectSpread({
      className: "cursor-sw-resize",
      x: data.x - 3,
      y: data.y + (data.height || 60) - 3
    }, props), {}, {
      onMouseDown: function onMouseDown(event) {
        event.stopPropagation();

        _onMouseDown("ld");
      }
    })), /*#__PURE__*/jsxRuntime.exports.jsx("rect", _objectSpread(_objectSpread({
      className: "cursor-ne-resize",
      x: data.x + (data.width || 120) - 3,
      y: data.y - 3
    }, props), {}, {
      onMouseDown: function onMouseDown(event) {
        event.stopPropagation();

        _onMouseDown("ru");
      }
    })), /*#__PURE__*/jsxRuntime.exports.jsx("rect", _objectSpread(_objectSpread({
      className: "cursor-se-resize",
      x: data.x + (data.width || 120) - 3,
      y: data.y + (data.height || 60) - 3
    }, props), {}, {
      onMouseDown: function onMouseDown(event) {
        event.stopPropagation();

        _onMouseDown("rd");
      }
    }))]
  });
};

var Node = function Node(_a) {
  var data = _a.data,
      isSelected = _a.isSelected,
      isConnecting = _a.isConnecting,
      onDoubleClick = _a.onDoubleClick,
      onMouseDown = _a.onMouseDown,
      onConnectorMouseDown = _a.onConnectorMouseDown,
      onResizerMouseDown = _a.onResizerMouseDown,
      readonly = _a.readonly;
  var position = useMemo(function () {
    return locateConnector(data);
  }, [data]);
  return /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {
    children: /*#__PURE__*/jsxRuntime.exports.jsxs(G, {
      onDoubleClick: onDoubleClick,
      onMouseDown: onMouseDown,
      children: [data.type === "operation" ?
      /*#__PURE__*/
      // <OperationNode data={data} isSelected={isSelected} />
      jsxRuntime.exports.jsx(StartEndNode, {
        color: "blue",
        data: data,
        isSelected: isSelected
      }) : data.type === "start" || data.type === "end" ? /*#__PURE__*/jsxRuntime.exports.jsx(StartEndNode, {
        color: "yellow",
        data: data,
        isSelected: isSelected
      }) : /*#__PURE__*/jsxRuntime.exports.jsx(StartEndNode, {
        color: "green",
        data: data,
        isSelected: isSelected
      }) // <DecisionNode data={data} isSelected={isSelected} />
      , !readonly && Object.keys(position).map(function (key) {
        return /*#__PURE__*/jsxRuntime.exports.jsx(Circle, {
          isConnecting: isConnecting,
          cx: position[key].x,
          cy: position[key].y,
          r: 4,
          onMouseDown: function onMouseDown(event) {
            event.stopPropagation();
            onConnectorMouseDown(key);
          }
        }, key);
      }), isSelected && !readonly ? /*#__PURE__*/jsxRuntime.exports.jsx(Resizer, {
        onMouseDown: onResizerMouseDown,
        data: data
      }) : /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {})]
    })
  });
};

var defaultConnectionColors = {
  success: "#52c41a",
  fail: "red"
};
var selectedConnectionColors = {
  success: "#12640a",
  fail: "darkred"
};

function Connection(_a) {
  var data = _a.data,
      nodes = _a.nodes,
      isSelected = _a.isSelected,
      onMouseDown = _a.onMouseDown,
      _onDoubleClick = _a.onDoubleClick;
  var getNodeConnectorOffset = useCallback(function (nodeId, connectorPosition) {
    var node = nodes.filter(function (item) {
      return item.id === nodeId;
    })[0];
    return locateConnector(node)[connectorPosition];
  }, [nodes]);
  var points = pathing(getNodeConnectorOffset(data.source.id, data.source.position), getNodeConnectorOffset(data.destination.id, data.destination.position), data.source.position, data.destination.position);
  var colors = useMemo(function () {
    return isSelected ? selectedConnectionColors : defaultConnectionColors;
  }, [isSelected]);
  var center;

  if (points.length % 2 === 0) {
    var start = points[points.length / 2 - 1];
    var end = points[points.length / 2];
    center = [Math.min(start[0], end[0]) + Math.abs(end[0] - start[0]) / 2, Math.min(start[1], end[1]) + Math.abs(end[1] - start[1]) / 2];
  } else {
    center = points[(points.length - 1) / 2];
  }

  return /*#__PURE__*/jsxRuntime.exports.jsx("g", {
    children: points.map(function (point, i) {
      if (i > points.length - 2) {
        return /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {});
      }

      var source = points[i];
      var destination = points[i + 1];
      var isLast = i === points.length - 2;
      var color = colors[data.type];
      var id = "arrow".concat(color.replace("#", ""));
      return /*#__PURE__*/jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
          stroke: colors[data.type],
          strokeWidth: 1,
          fill: "none",
          d: "M ".concat(source[0], " ").concat(source[1], " L ").concat(destination[0], " ").concat(destination[1]),
          markerEnd: isLast ? "url(#".concat(id, ")") : undefined
        }), isLast && /*#__PURE__*/jsxRuntime.exports.jsx("marker", {
          id: id,
          markerUnits: "strokeWidth",
          viewBox: "0 0 12 12",
          refX: 9,
          refY: 6,
          markerWidth: 12,
          markerHeight: 12,
          orient: "auto",
          children: /*#__PURE__*/jsxRuntime.exports.jsx("path", {
            d: "M2,2 L10,6 L2,10 L6,6 L2,2",
            fill: color
          })
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          onMouseDown: onMouseDown,
          onDoubleClick: function onDoubleClick(event) {
            event.stopPropagation();
            _onDoubleClick === null || _onDoubleClick === void 0 ? void 0 : _onDoubleClick(event);
          },
          stroke: "transparent",
          strokeWidth: 5,
          fill: "none",
          d: "M ".concat(source[0], " ").concat(source[1], " L ").concat(destination[0], " ").concat(destination[1])
        }), data.title ? /*#__PURE__*/jsxRuntime.exports.jsx("text", {
          fontSize: 12,
          textAnchor: "middle",
          dominantBaseline: "middle",
          x: center[0],
          y: center[1],
          children: data.title
        }) : /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {})]
      });
    })
  });
}

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".flowchart-container {\n  position: relative;\n}\n.flowchart-container text {\n  moz-user-select: -moz-none;\n  -moz-user-select: none;\n  -o-user-select: none;\n  -khtml-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.flowchart-toolbar {\n  width: 48px;\n  height: 100%;\n  border-left: 1px solid #dfdfdf;\n  border-top: 1px solid #dfdfdf;\n  border-bottom: 1px solid #dfdfdf;\n}\n.flowchart-toolbar-item {\n  width: 48px;\n  height: 24px;\n}\n.flowchart-svg {\n  height: 100%;\n  width: 100%;\n  border: 1px solid #dfdfdf;\n  background-color: #f3f3f3;\n}\n.circle {\n  fill: white;\n  stroke-width: 1px;\n  stroke: #bbbbbb;\n  cursor: crosshair;\n  opacity: 0;\n}\n.circle:hover {\n  opacity: 1;\n}\n.g:hover .circle {\n  opacity: 1;\n}";
styleInject(css_248z$1);
var css_248z = "*, ::before, ::after {\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  \n}\n\n.pointer-events-none {\n  pointer-events: none\n}\n\n.absolute {\n  position: absolute\n}\n\n.top-2 {\n  top: 0.5rem\n}\n\n.right-2 {\n  right: 0.5rem\n}\n\n.flex {\n  display: flex\n}\n\n.inline-flex {\n  display: inline-flex\n}\n\n.h-full {\n  height: 100%\n}\n\n.w-full {\n  width: 100%\n}\n\n.cursor-nw-resize {\n  cursor: nw-resize\n}\n\n.cursor-sw-resize {\n  cursor: sw-resize\n}\n\n.cursor-ne-resize {\n  cursor: ne-resize\n}\n\n.cursor-se-resize {\n  cursor: se-resize\n}\n\n.border-none {\n  border-style: none\n}\n\n.bg-transparent {\n  background-color: transparent\n}\n\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)\n}\n";
styleInject(css_248z);

var OperationNode = function OperationNode(_a) {
  var data = _a.data,
      _b = _a.isSelected,
      isSelected = _b === void 0 ? false : _b;
  var borderColor = isSelected ? "#666666" : "#bbbbbb";
  return /*#__PURE__*/jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.exports.jsx("rect", _objectSpread({
      width: data.width || 120,
      height: data.height || 60,
      fill: "white",
      x: data.x,
      y: data.y,
      strokeWidth: 1,
      stroke: borderColor
    }, data.containerProps)), /*#__PURE__*/jsxRuntime.exports.jsx(Text, {
      data: data
    })]
  });
};

var newNode = {
  id: 0,
  title: "New Item",
  type: "start",
  x: 0,
  y: 0
};
var templateNode = {
  id: 0,
  title: "",
  type: "start",
  x: 8,
  y: 8,
  width: 32,
  height: 16
};
var iconAlign = /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
  viewBox: "64 64 896 896",
  focusable: "false",
  "data-icon": "align-center",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  children: /*#__PURE__*/jsxRuntime.exports.jsx("path", {
    d: "M264 230h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm496 424c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496zm144 140H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
  })
});

function GuideLine(_a) {
  var line = _a.line;
  return /*#__PURE__*/jsxRuntime.exports.jsx("g", {
    children: /*#__PURE__*/jsxRuntime.exports.jsx("line", {
      strokeDasharray: "3 3",
      stroke: "#666666",
      strokeWidth: 1,
      fill: "none",
      x1: line[0].x,
      y1: line[0].y,
      x2: line[1].x,
      y2: line[1].y
    })
  });
}

function Marker(_a) {
  var id = _a.id,
      color = _a.color;
  return /*#__PURE__*/jsxRuntime.exports.jsx("marker", {
    id: id,
    markerUnits: "strokeWidth",
    viewBox: "0 0 12 12",
    refX: 9,
    refY: 6,
    markerWidth: 12,
    markerHeight: 12,
    orient: "auto",
    children: /*#__PURE__*/jsxRuntime.exports.jsx("path", {
      d: "M2,2 L10,6 L2,10 L6,6 L2,2",
      fill: color
    })
  });
}

function PendingConnection(_a) {
  var points = _a.points;
  return /*#__PURE__*/jsxRuntime.exports.jsx("g", {
    children: points.map(function (point, i) {
      if (i > points.length - 2) {
        return /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {});
      }

      var source = points[i];
      var destination = points[i + 1];
      var isLast = i === points.length - 2;
      var color = defaultConnectionColors.success;
      var id = "arrow".concat(color.replace("#", ""));
      return /*#__PURE__*/jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, {
        children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
          stroke: defaultConnectionColors.success,
          strokeWidth: 1,
          fill: "none",
          d: "M ".concat(source[0], " ").concat(source[1], " L ").concat(destination[0], " ").concat(destination[1]),
          markerEnd: isLast ? "url(#".concat(id, ")") : undefined
        }), isLast && /*#__PURE__*/jsxRuntime.exports.jsx(Marker, {
          id: id,
          color: color
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          stroke: "transparent",
          strokeWidth: 5,
          fill: "none",
          d: "M ".concat(source.join(" "), " L ").concat(destination.join(" "))
        })]
      });
    })
  });
}

var DecisionNode = function DecisionNode(_a) {
  var data = _a.data,
      isSelected = _a.isSelected;
  var borderColor = isSelected ? "#666666" : "#bbbbbb";
  var width = data.width || 120;
  var halfWidth = width / 2;
  var height = data.height || 60;
  var halfHeight = height / 2;
  var top = "".concat(data.x + halfWidth, ",").concat(data.y);
  var bottom = "".concat(data.x + halfWidth, ",").concat(data.y + height);
  var left = "".concat(data.x, ",").concat(data.y + halfHeight);
  var right = "".concat(data.x + width, ",").concat(data.y + halfHeight);
  return /*#__PURE__*/jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.exports.jsx("polygon", _objectSpread({
      points: "".concat(left, " ").concat(top, " ").concat(right, " ").concat(bottom),
      fill: "white",
      strokeWidth: 1,
      stroke: borderColor
    }, data.containerProps)), /*#__PURE__*/jsxRuntime.exports.jsx(Text, {
      data: data
    })]
  });
};

var Flowchart = /*#__PURE__*/forwardRef(function (_a, ref) {
  var nodes = _a.nodes,
      connections = _a.connections,
      _b = _a.readonly,
      readonly = _b === void 0 ? false : _b,
      onNodeDoubleClick = _a.onNodeDoubleClick,
      onConnDoubleClick = _a.onConnectionDoubleClick,
      onDoubleClick = _a.onDoubleClick,
      onChange = _a.onChange,
      onMouseUp = _a.onMouseUp,
      style = _a.style,
      _c = _a.defaultNodeSize,
      defaultNodeSize = _c === void 0 ? {
    width: 120,
    height: 60
  } : _c,
      showToolbar = _a.showToolbar,
      _d = _a.connectionPosition,
      connectionPosition = _d === void 0 ? "top" : _d;
  var svgRef = useRef(null);
  var containerRef = useRef(null);

  var _e = useState([]),
      selectedNodeIds = _e[0],
      setSelectedNodeIds = _e[1];

  var _f = useState([]),
      selectedConnIds = _f[0],
      setSelectedConnIds = _f[1];

  var _g = useState(),
      selectingInfo = _g[0],
      setSelectingInfo = _g[1];

  var _h = useState(),
      connectingInfo = _h[0],
      setConnectingInfo = _h[1];

  var _j = useState(),
      resizingInfo = _j[0],
      setResizingInfo = _j[1];

  var _k = useState(),
      movingInfo = _k[0],
      setMovingInfo = _k[1];

  var _l = useState(),
      creatingInfo = _l[0],
      setCreatingInfo = _l[1];

  var _m = useState(1),
      zoom = _m[0],
      setZoom = _m[1];

  var internalCenter = useCallback(function () {
    if (!svgRef.current) {
      return;
    }

    onChange === null || onChange === void 0 ? void 0 : onChange(center(nodes, svgRef.current.clientWidth, svgRef.current.clientHeight), connections);
  }, [connections, nodes, onChange]);
  var zoomIn = useCallback(function () {
    setZoom(function (prevState) {
      var number = Number((prevState - 0.1).toFixed(1));
      return number < 0.6 ? 0.6 : number;
    });
  }, []);
  var zoomOut = useCallback(function () {
    setZoom(function (prevState) {
      var number = Number((prevState + 0.1).toFixed(1));
      return number > 1 ? 1 : number;
    });
  }, []);

  var _o = useState({
    x: 0,
    y: 0
  }),
      offsetOfCursorToSVG = _o[0],
      setOffsetOfCursorToSVG = _o[1];

  var handleWheel = useCallback(function (event) {
    event.stopPropagation();
    event.preventDefault();

    if (event.ctrlKey || event.metaKey) {
      if (event.deltaY > 0 && zoom === 0.1) {
        return;
      }

      setZoom(function (prev) {
        var number = Number((prev - event.deltaY / 100 / 10).toFixed(1));
        return number < 0.6 ? 0.6 : number > 1 ? 1 : number;
      });
    }
  }, [zoom]);
  var handleSVGDoubleClick = useCallback(function (event) {
    return onDoubleClick === null || onDoubleClick === void 0 ? void 0 : onDoubleClick(event, zoom);
  }, [onDoubleClick, zoom]);
  var handleSVGMouseDown = useCallback(function (event) {
    if (event.ctrlKey || event.metaKey || event.target.tagName !== "svg") {
      // ignore propagation
      return;
    }

    if (event.nativeEvent.button !== 0) {
      return;
    }

    var point = {
      x: event.nativeEvent.offsetX / zoom,
      y: event.nativeEvent.offsetY / zoom
    };
    setSelectingInfo({
      start: point,
      end: point
    });
    setSelectedNodeIds([]);
    setSelectedConnIds([]);
  }, [zoom]);
  var moveTo = useCallback(function (nodes, id, x, y) {
    var _a;

    var index = nodes.findIndex(function (internalNode) {
      return internalNode.id === id;
    });
    return update(nodes, (_a = {}, _a[index] = {
      x: {
        $set: x
      },
      y: {
        $set: y
      }
    }, _a));
  }, []);
  var move = useCallback(function (nodeIds, x, y) {
    var _a;

    if (readonly) {
      return;
    }

    var indexes = nodeIds.map(function (currentNode) {
      return nodes.findIndex(function (internalNode) {
        return internalNode.id === currentNode;
      });
    });
    var tempState = nodes;

    for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
      var index = indexes_1[_i];
      tempState = update(tempState, (_a = {}, _a[index] = {
        x: {
          $apply: function $apply(prev) {
            return prev + x;
          }
        },
        y: {
          $apply: function $apply(prev) {
            return prev + y;
          }
        }
      }, _a));
    }

    onChange === null || onChange === void 0 ? void 0 : onChange(tempState, connections);
  }, [connections, nodes, onChange, readonly]);
  var handleSVGMouseMove = useCallback(function (event) {
    var _a;

    var newOffsetOfCursorToSVG = {
      x: event.nativeEvent.offsetX / zoom,
      y: event.nativeEvent.offsetY / zoom
    };
    setOffsetOfCursorToSVG(newOffsetOfCursorToSVG);

    if (selectingInfo) {
      setSelectingInfo(function (prevState) {
        return {
          start: prevState.start,
          end: newOffsetOfCursorToSVG
        };
      });
      var edge = calcCorners([selectingInfo.start, newOffsetOfCursorToSVG]);
      setSelectedNodeIds(calcIntersectedNodes(nodes, edge).map(function (item) {
        return item.id;
      }));
      setSelectedConnIds(calcIntersectedConnections(nodes, connections, edge).map(function (item, index) {
        return index;
      }));
    } else if (movingInfo) {
      var currentNodes = nodes;

      for (var i = 0; i < movingInfo.targetIds.length; i++) {
        var t = movingInfo.targetIds[i];
        var delta = movingInfo.deltas[i];
        currentNodes = moveTo(currentNodes, t, newOffsetOfCursorToSVG.x - delta.x, newOffsetOfCursorToSVG.y - delta.y);
      }

      onChange === null || onChange === void 0 ? void 0 : onChange(currentNodes, connections);
      setMovingInfo(function (prevState) {
        return _assign(_assign({}, prevState), {
          moved: true
        });
      });
    } else if (resizingInfo) {
      var index = nodes.findIndex(function (it) {
        return it.id === resizingInfo.targetId;
      });
      var node = nodes[index];
      var patch = void 0;
      var finalWidth = node.width || 120;
      var finalHeight = node.height || 60;
      var maxX = node.x + finalWidth;
      var maxY = node.y + finalHeight;

      switch (resizingInfo.direction) {
        case "lu":
          patch = {
            x: newOffsetOfCursorToSVG.x,
            y: newOffsetOfCursorToSVG.y,
            width: maxX - newOffsetOfCursorToSVG.x,
            height: maxY - newOffsetOfCursorToSVG.y
          };
          break;

        case "ru":
          patch = {
            x: node.x,
            y: newOffsetOfCursorToSVG.y,
            width: newOffsetOfCursorToSVG.x - node.x,
            height: maxY - newOffsetOfCursorToSVG.y
          };
          break;

        case "ld":
          patch = {
            x: newOffsetOfCursorToSVG.x,
            y: node.y,
            width: maxX - newOffsetOfCursorToSVG.x,
            height: newOffsetOfCursorToSVG.y - node.y
          };
          break;

        default:
          patch = {
            x: node.x,
            y: node.y,
            width: newOffsetOfCursorToSVG.x - node.x,
            height: newOffsetOfCursorToSVG.y - node.y
          };
          break;
      }

      if (patch.x >= maxX) {
        patch.x = maxX - 10;
        patch.width = 10;
      }

      if (patch.y >= maxY) {
        patch.y = maxY - 10;
        patch.height = 10;
      }

      if (patch.width <= 0) {
        patch.width = 10;
      }

      if (patch.height <= 0) {
        patch.height = 10;
      }

      onChange === null || onChange === void 0 ? void 0 : onChange(update(nodes, (_a = {}, _a[index] = {
        $set: _assign(_assign({}, node), patch)
      }, _a)), connections);
    }
  }, [zoom, selectingInfo, movingInfo, resizingInfo, nodes, connections, onChange, moveTo]);
  var moveSelected = useCallback(function (x, y) {
    move(selectedNodeIds, x, y);
  }, [move, selectedNodeIds]);
  var remove = useCallback(function () {
    if (readonly) return; // Splice arguments of selected connections

    var list1 = selectedConnIds.map(function (currentConn) {
      return [connections.findIndex(function (interConn, index) {
        return index === currentConn;
      }), 1];
    }); // Splice arguments of connections of selected nodes

    var list2 = selectedNodeIds.map(function (item) {
      return connections.filter(function (interConn) {
        return interConn.source.id === item || interConn.destination.id === item;
      });
    }).flat().map(function (currentConn) {
      return [connections.findIndex(function (interConn) {
        return interConn === currentConn;
      }), 1];
    });
    var restConnections = update(connections, {
      $splice: __spreadArray(__spreadArray([], list1, true), list2, true).sort(function (a, b) {
        return b[0] - a[0];
      })
    });
    var restNodes = update(nodes, {
      $splice: selectedNodeIds.map(function (currNode) {
        return [nodes.findIndex(function (interNode) {
          return interNode.id === currNode;
        }), 1];
      }).sort(function (a, b) {
        return b[0] - a[0];
      })
    });
    onChange === null || onChange === void 0 ? void 0 : onChange(restNodes, restConnections);
  }, [readonly, selectedConnIds, selectedNodeIds, connections, nodes, onChange]);
  var handleSVGKeyDown = useCallback(function (event) {
    switch (event.keyCode) {
      case 37:
        moveSelected(-10, 0);
        break;

      case 38:
        moveSelected(0, -10);
        break;

      case 39:
        moveSelected(10, 0);
        break;

      case 40:
        moveSelected(0, 10);
        break;

      case 27:
        setSelectedNodeIds([]);
        setSelectedConnIds([]);
        break;

      case 65:
        if ((event.ctrlKey || event.metaKey) && document.activeElement === document.getElementById("chart")) {
          setSelectedNodeIds([]);
          setSelectedConnIds([]);
          setSelectedNodeIds(nodes.map(function (item) {
            return item.id;
          }));
          setSelectedConnIds(__spreadArray([], selectedConnIds, true));
        }

        break;

      case 46:
      case 8:
        remove();
        break;
    }
  }, [moveSelected, remove, nodes, selectedConnIds]);
  var handleSVGMouseUp = useCallback(function (event) {
    var _a, _b, _c, _d;

    setSelectingInfo(undefined);
    setConnectingInfo(undefined);
    setMovingInfo(undefined);
    setResizingInfo(undefined); // Align dragging node

    if (movingInfo) {
      var result = nodes;

      var _loop_1 = function _loop_1(t) {
        var _g;

        result = update(result, (_g = {}, _g[result.findIndex(function (item) {
          return item.id === t;
        })] = {
          x: {
            $apply: roundTo10
          },
          y: {
            $apply: roundTo10
          }
        }, _g));
      };

      for (var _i = 0, _e = movingInfo.targetIds; _i < _e.length; _i++) {
        var t = _e[_i];

        _loop_1(t);
      }

      onChange === null || onChange === void 0 ? void 0 : onChange(result, connections);
    } // Connect nodes


    if (connectingInfo) {
      var node_1 = null;
      var position_1 = null;

      for (var _f = 0, nodes_1 = nodes; _f < nodes_1.length; _f++) {
        var internalNode = nodes_1[_f];
        var locations = locateConnector(internalNode);

        for (var prop in locations) {
          var entry = locations[prop];

          if (distanceOfP2P(entry, offsetOfCursorToSVG) < 6) {
            node_1 = internalNode;
            position_1 = prop;
          }
        }
      }

      if (!node_1 || !position_1) {
        return;
      }

      if (connectingInfo.source.id === node_1.id) {
        // Node can not connect to itself
        return;
      }

      if (connections.find(function (item) {
        return item.source.id === connectingInfo.source.id && item.source.position === connectingInfo.sourcePosition && item.destination.id === node_1.id && item.destination.position === position_1;
      })) {
        return;
      }

      var newConnection = createConnection(connectingInfo.source.id, connectingInfo.sourcePosition, node_1.id, position_1);
      onChange === null || onChange === void 0 ? void 0 : onChange(nodes, __spreadArray(__spreadArray([], connections, true), [newConnection], false));
      onMouseUp === null || onMouseUp === void 0 ? void 0 : onMouseUp(event, zoom);
    }

    if (creatingInfo) {
      var nativeEvent = event.nativeEvent;
      var point = {
        x: roundTo10(nativeEvent.offsetX - defaultNodeSize.width / 2) / zoom,
        y: roundTo10(nativeEvent.offsetY - defaultNodeSize.height / 2) / zoom,
        id: +new Date(),
        title: "New Item"
      };
      onChange === null || onChange === void 0 ? void 0 : onChange(__spreadArray(__spreadArray([], nodes, true), [_assign({
        type: creatingInfo.type
      }, point)], false), connections);
    }

    if (resizingInfo) {
      var index = nodes.findIndex(function (it) {
        return it.id === resizingInfo.targetId;
      });

      switch (resizingInfo.direction) {
        case "lu":
          onChange === null || onChange === void 0 ? void 0 : onChange(update(nodes, (_a = {}, _a[index] = {
            $apply: function $apply(it) {
              var newX = roundTo10(it.x);
              var newY = roundTo10(it.y);
              var maxX = it.width + it.x;
              var maxY = it.height + it.y;
              return _assign(_assign({}, it), {
                x: newX,
                y: newY,
                width: maxX - newX,
                height: maxY - newY
              });
            }
          }, _a)), connections);
          break;

        case "ru":
          onChange === null || onChange === void 0 ? void 0 : onChange(update(nodes, (_b = {}, _b[index] = {
            $apply: function $apply(it) {
              var newY = roundTo10(it.y);
              var maxY = it.height + it.y;
              return _assign(_assign({}, it), {
                y: newY,
                width: roundTo10(it.width),
                height: maxY - newY
              });
            }
          }, _b)), connections);
          break;

        case "ld":
          onChange === null || onChange === void 0 ? void 0 : onChange(update(nodes, (_c = {}, _c[index] = {
            $apply: function $apply(it) {
              var newX = roundTo10(it.x);
              var maxX = it.width + it.x;
              return _assign(_assign({}, it), {
                x: newX,
                width: maxX - newX,
                height: roundTo10(it.height)
              });
            }
          }, _c)), connections);
          break;

        case "rd":
          onChange === null || onChange === void 0 ? void 0 : onChange(update(nodes, (_d = {}, _d[index] = {
            $apply: function $apply(it) {
              return _assign(_assign({}, it), {
                width: roundTo10(it.width),
                height: roundTo10(it.height)
              });
            }
          }, _d)), connections);
          break;
      }
    }
  }, [movingInfo, connectingInfo, creatingInfo, resizingInfo, nodes, onChange, connections, onMouseUp, zoom, offsetOfCursorToSVG, defaultNodeSize.width, defaultNodeSize.height]);
  /**
   * Points of connecting line
   */

  var points = useMemo(function () {
    var points = [];

    if (connectingInfo) {
      var endPosition = null;

      for (var _i = 0, nodes_2 = nodes; _i < nodes_2.length; _i++) {
        var internalNode = nodes_2[_i];
        var locations = locateConnector(internalNode);

        for (var prop in locations) {
          var entry = locations[prop];

          if (distanceOfP2P(entry, offsetOfCursorToSVG) < 6) {
            endPosition = prop;
          }
        }
      }

      points = pathing(locateConnector(connectingInfo.source)[connectingInfo.sourcePosition], offsetOfCursorToSVG, connectingInfo.sourcePosition, endPosition);
    }

    return points;
  }, [nodes, connectingInfo, offsetOfCursorToSVG]);
  var guidelines = useMemo(function () {
    var guidelines = [];

    if (movingInfo) {
      var _loop_2 = function _loop_2(source) {
        guidelines.push.apply(guidelines, calcGuidelines(nodes.find(function (item) {
          return item.id === source;
        }), nodes));
      };

      for (var _i = 0, _a = movingInfo.targetIds; _i < _a.length; _i++) {
        var source = _a[_i];

        _loop_2(source);
      }
    } else if (creatingInfo) {
      guidelines.push.apply(guidelines, calcGuidelines({
        id: +new Date(),
        x: offsetOfCursorToSVG.x - defaultNodeSize.width / 2,
        y: offsetOfCursorToSVG.y - defaultNodeSize.height / 2
      }, nodes));
    } else if (resizingInfo) {
      guidelines.push.apply(guidelines, calcGuidelines(nodes.find(function (item) {
        return item.id === resizingInfo.targetId;
      }), nodes));
    }

    return guidelines;
  }, [movingInfo, creatingInfo, resizingInfo, nodes, offsetOfCursorToSVG.x, offsetOfCursorToSVG.y, defaultNodeSize.width, defaultNodeSize.height]);
  useImperativeHandle(ref, function () {
    return {
      getData: function getData() {
        return {
          nodes: nodes,
          connections: connections
        };
      }
    };
  });
  var selectionAreaCorners = useMemo(function () {
    return selectingInfo ? calcCorners([selectingInfo.start, selectingInfo.end]) : undefined;
  }, [selectingInfo]);
  var zoomStyle = useMemo(function () {
    return {
      zoom: zoom
    };
  }, [zoom]);
  var nodeElements = useMemo(function () {
    return nodes === null || nodes === void 0 ? void 0 : nodes.map(function (node) {
      var formattedNode = _assign(_assign({}, node), {
        width: node.width || defaultNodeSize.width,
        height: node.height || defaultNodeSize.height
      });

      return /*#__PURE__*/jsxRuntime.exports.jsx(Node, {
        readonly: readonly,
        isSelected: selectedNodeIds.some(function (item) {
          return item === formattedNode.id;
        }),
        isConnecting: !!connectingInfo,
        data: formattedNode,
        onDoubleClick: function onDoubleClick(event) {
          event.stopPropagation();

          if (readonly) {
            return;
          }

          onNodeDoubleClick === null || onNodeDoubleClick === void 0 ? void 0 : onNodeDoubleClick(formattedNode);
        },
        onMouseDown: function onMouseDown(event) {
          if (event.nativeEvent.button !== 0) {
            return;
          }

          if (event.ctrlKey || event.metaKey) {
            var index = selectedNodeIds.findIndex(function (item) {
              return item === formattedNode.id;
            });

            if (index === -1) {
              setSelectedNodeIds(__spreadArray(__spreadArray([], selectedNodeIds, true), [formattedNode.id], false));
            } else {
              setSelectedNodeIds(update(selectedNodeIds, {
                $splice: [[index, 1]]
              }));
            }
          } else {
            var tempCurrentNodes = selectedNodeIds;

            if (!selectedNodeIds.some(function (id) {
              return id === formattedNode.id;
            })) {
              tempCurrentNodes = [formattedNode.id];
              setSelectedNodeIds(tempCurrentNodes);
            }

            setSelectedConnIds([]);

            if (readonly) {
              return;
            }

            setMovingInfo({
              targetIds: tempCurrentNodes,
              deltas: tempCurrentNodes.map(function (tempCurrentNode) {
                var find = nodes.find(function (item) {
                  return item.id === tempCurrentNode;
                });
                return {
                  x: offsetOfCursorToSVG.x - find.x,
                  y: offsetOfCursorToSVG.y - find.y
                };
              })
            });
          }
        },
        onConnectorMouseDown: function onConnectorMouseDown(position) {
          if (formattedNode.type === "end") {
            return;
          }

          setConnectingInfo({
            source: formattedNode,
            sourcePosition: position
          });
        },
        onResizerMouseDown: function onResizerMouseDown(direction) {
          setResizingInfo({
            direction: direction,
            targetId: formattedNode.id
          });
        }
      }, formattedNode.id);
    });
  }, [nodes, defaultNodeSize.width, defaultNodeSize.height, readonly, selectedNodeIds, connectingInfo, onNodeDoubleClick, offsetOfCursorToSVG.x, offsetOfCursorToSVG.y]);
  var connectionElements = useMemo(function () {
    return connections === null || connections === void 0 ? void 0 : connections.map(function (conn, index) {
      return /*#__PURE__*/jsxRuntime.exports.jsx(Connection, {
        isSelected: selectedConnIds.some(function (item) {
          return index === item;
        }),
        onDoubleClick: function onDoubleClick() {
          return onConnDoubleClick === null || onConnDoubleClick === void 0 ? void 0 : onConnDoubleClick(conn);
        },
        onMouseDown: function onMouseDown(event) {
          if (event.ctrlKey || event.metaKey) {
            var i_1 = selectedConnIds.findIndex(function (item) {
              return item === index;
            });

            if (i_1 === -1) {
              setSelectedConnIds(function (prevState) {
                return __spreadArray(__spreadArray([], prevState, true), [index], false);
              });
            } else {
              setSelectedConnIds(function (prev) {
                return update(prev, {
                  $splice: [[i_1, 1]]
                });
              });
            }
          } else {
            setSelectedNodeIds([]);
            setSelectedConnIds([index]);
          }
        },
        data: conn,
        nodes: nodes
      }, conn.source.id + conn.source.position + conn.destination.id + conn.destination.position);
    });
  }, [connections, selectedConnIds, nodes, onConnDoubleClick]);
  var handleToolbarMouseDown = useCallback(function (type, event) {
    var rect = containerRef.current.getBoundingClientRect();
    setCreatingInfo({
      type: type,
      x: event.clientX - rect.x - defaultNodeSize.width * zoom / 2,
      y: event.clientY - rect.y - defaultNodeSize.height * zoom / 2
    });
  }, [defaultNodeSize.height, defaultNodeSize.width, zoom]);
  var handleContainerMouseUp = useCallback(function () {
    setCreatingInfo(undefined);
  }, []);
  var handleContainerMouseMove = useCallback(function (event) {
    if (!event || !creatingInfo) {
      return;
    }

    var rect = containerRef.current.getBoundingClientRect();
    setCreatingInfo(_assign(_assign({}, creatingInfo), {
      x: event.clientX - rect.x - defaultNodeSize.width * zoom / 2,
      y: event.clientY - rect.y - defaultNodeSize.height * zoom / 2
    }));
  }, [defaultNodeSize.height, defaultNodeSize.width, creatingInfo, zoom]);
  return /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("div", {
      style: style,
      ref: containerRef,
      className: "flowchart-container",
      onMouseUp: handleContainerMouseUp,
      onMouseMove: handleContainerMouseMove,
      children: [/*#__PURE__*/jsxRuntime.exports.jsxs("div", {
        className: "absolute top-2 right-2",
        children: [/*#__PURE__*/jsxRuntime.exports.jsx("button", {
          className: "border-none bg-transparent",
          onClick: zoomIn,
          children: "-"
        }), /*#__PURE__*/jsxRuntime.exports.jsxs("button", {
          className: "border-none bg-transparent",
          children: [zoom * 100, "%"]
        }), /*#__PURE__*/jsxRuntime.exports.jsx("button", {
          className: "border-none bg-transparent",
          onClick: zoomOut,
          children: "+"
        }), !readonly && /*#__PURE__*/jsxRuntime.exports.jsx("button", {
          className: "border-none bg-transparent",
          onClick: internalCenter,
          children: iconAlign
        })]
      }), /*#__PURE__*/jsxRuntime.exports.jsxs("div", {
        className: "w-full h-full inline-flex",
        children: [readonly || showToolbar === false ? /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {}) : /*#__PURE__*/jsxRuntime.exports.jsxs("div", {
          className: "flowchart-toolbar",
          children: [showToolbar === true || Array.isArray(showToolbar) && showToolbar.includes("start-end") ? /*#__PURE__*/jsxRuntime.exports.jsx("div", {
            onMouseDown: function onMouseDown(event) {
              return handleToolbarMouseDown("start", event);
            },
            children: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
              className: "flowchart-toolbar-item",
              children: /*#__PURE__*/jsxRuntime.exports.jsx(StartEndNode, {
                data: templateNode
              })
            })
          }) : /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {}), showToolbar === true || Array.isArray(showToolbar) && showToolbar.includes("operation") ? /*#__PURE__*/jsxRuntime.exports.jsx("div", {
            onMouseDown: function onMouseDown(event) {
              return handleToolbarMouseDown("operation", event);
            },
            children: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
              className: "flowchart-toolbar-item",
              children: /*#__PURE__*/jsxRuntime.exports.jsx(OperationNode, {
                data: templateNode
              })
            })
          }) : /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {}), showToolbar === true || Array.isArray(showToolbar) && showToolbar.includes("decision") ? /*#__PURE__*/jsxRuntime.exports.jsx("div", {
            onMouseDown: function onMouseDown(event) {
              return handleToolbarMouseDown("decision", event);
            },
            children: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
              className: "flowchart-toolbar-item",
              children: /*#__PURE__*/jsxRuntime.exports.jsx(DecisionNode, {
                data: templateNode
              })
            })
          }) : /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {})]
        }), /*#__PURE__*/jsxRuntime.exports.jsxs("svg", {
          ref: svgRef,
          className: "flowchart-svg",
          style: zoomStyle,
          id: "chart",
          tabIndex: 0,
          onKeyDown: handleSVGKeyDown,
          onWheel: handleWheel,
          onDoubleClick: handleSVGDoubleClick,
          onMouseUp: handleSVGMouseUp,
          onMouseDown: handleSVGMouseDown,
          onMouseMove: handleSVGMouseMove,
          children: [connectionPosition === "bottom" ? connectionElements : /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {}), nodeElements, connectionPosition === "top" || !connectionPosition ? connectionElements : /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {}), selectionAreaCorners && /*#__PURE__*/jsxRuntime.exports.jsx("rect", {
            stroke: "lightblue",
            fill: "lightblue",
            fillOpacity: 0.8,
            x: selectionAreaCorners.start.x,
            y: selectionAreaCorners.start.y,
            width: selectionAreaCorners.end.x - selectionAreaCorners.start.x,
            height: selectionAreaCorners.end.y - selectionAreaCorners.start.y
          }), /*#__PURE__*/jsxRuntime.exports.jsx(PendingConnection, {
            points: points
          }), guidelines.map(function (guideline, index) {
            return /*#__PURE__*/jsxRuntime.exports.jsx(GuideLine, {
              line: guideline
            }, index);
          })]
        })]
      }), creatingInfo ? /*#__PURE__*/jsxRuntime.exports.jsx("div", {
        className: "pointer-events-none absolute",
        style: {
          left: creatingInfo.x,
          top: creatingInfo.y,
          width: defaultNodeSize.width * zoom,
          height: defaultNodeSize.height * zoom
        },
        children: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
          style: zoomStyle,
          children: creatingInfo.type === "start" ? /*#__PURE__*/jsxRuntime.exports.jsx(StartEndNode, {
            data: newNode
          }) : creatingInfo.type === "decision" ? /*#__PURE__*/jsxRuntime.exports.jsx(DecisionNode, {
            data: newNode
          }) : /*#__PURE__*/jsxRuntime.exports.jsx(OperationNode, {
            data: newNode
          })
        })
      }) : /*#__PURE__*/jsxRuntime.exports.jsx(jsxRuntime.exports.Fragment, {})]
    })
  });
});
export { Flowchart as default };
