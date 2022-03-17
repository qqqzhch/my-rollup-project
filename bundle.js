
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var myBundle = (function () {
  'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var runtime = {exports: {}};

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  (function (module) {
  !(function(global) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }

    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = module.exports ;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    runtime.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    runtime.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    runtime.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            resolve(result);
          }, reject);
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    runtime.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return runtime.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };
  })(
    // In sloppy mode, unbound `this` refers to the global object, fallback to
    // Function constructor if we're in global strict mode. That is sadly a form
    // of indirect eval which violates Content Security Policy.
    (function() { return this })() || Function("return this")()
  );
  }(runtime));

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$D =
    // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func -- fallback
    (function () { return this; })() || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$b = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$a = fails$b;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$a(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var fails$9 = fails$b;

  var functionBindNative = !fails$9(function () {
    var test = (function () { /* empty */ }).bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;

  var call$b = Function.prototype.call;

  var functionCall = NATIVE_BIND$3 ? call$b.bind(call$b) : function () {
    return call$b.apply(call$b, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable;

  var createPropertyDescriptor$4 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var NATIVE_BIND$2 = functionBindNative;

  var FunctionPrototype$2 = Function.prototype;
  var bind$7 = FunctionPrototype$2.bind;
  var call$a = FunctionPrototype$2.call;
  var uncurryThis$f = NATIVE_BIND$2 && bind$7.bind(call$a, call$a);

  var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
    return fn && uncurryThis$f(fn);
  } : function (fn) {
    return fn && function () {
      return call$a.apply(fn, arguments);
    };
  };

  var uncurryThis$e = functionUncurryThis;

  var toString$5 = uncurryThis$e({}.toString);
  var stringSlice$1 = uncurryThis$e(''.slice);

  var classofRaw$1 = function (it) {
    return stringSlice$1(toString$5(it), 8, -1);
  };

  var global$C = global$D;
  var uncurryThis$d = functionUncurryThis;
  var fails$8 = fails$b;
  var classof$7 = classofRaw$1;

  var Object$5 = global$C.Object;
  var split = uncurryThis$d(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$8(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$5('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$7(it) == 'String' ? split(it, '') : Object$5(it);
  } : Object$5;

  var global$B = global$D;

  var TypeError$e = global$B.TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$3 = function (it) {
    if (it == undefined) throw TypeError$e("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$1 = indexedObject;
  var requireObjectCoercible$2 = requireObjectCoercible$3;

  var toIndexedObject$4 = function (it) {
    return IndexedObject$1(requireObjectCoercible$2(it));
  };

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$h = function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$g = isCallable$h;

  var isObject$8 = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$g(it);
  };

  var global$A = global$D;
  var isCallable$f = isCallable$h;

  var aFunction = function (argument) {
    return isCallable$f(argument) ? argument : undefined;
  };

  var getBuiltIn$7 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$A[namespace]) : global$A[namespace] && global$A[namespace][method];
  };

  var uncurryThis$c = functionUncurryThis;

  var objectIsPrototypeOf = uncurryThis$c({}.isPrototypeOf);

  var getBuiltIn$6 = getBuiltIn$7;

  var engineUserAgent = getBuiltIn$6('navigator', 'userAgent') || '';

  var global$z = global$D;
  var userAgent$3 = engineUserAgent;

  var process$4 = global$z.process;
  var Deno = global$z.Deno;
  var versions = process$4 && process$4.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version$g;

  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version$g = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version$g && userAgent$3) {
    match = userAgent$3.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$3.match(/Chrome\/(\d+)/);
      if (match) version$g = +match[1];
    }
  }

  var engineV8Version = version$g;

  /* eslint-disable es/no-symbol -- required for testing */

  var V8_VERSION$1 = engineV8Version;
  var fails$7 = fails$b;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$7(function () {
    var symbol = Symbol();
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */

  var NATIVE_SYMBOL$1 = nativeSymbol;

  var useSymbolAsUid = NATIVE_SYMBOL$1
    && !Symbol.sham
    && typeof Symbol.iterator == 'symbol';

  var global$y = global$D;
  var getBuiltIn$5 = getBuiltIn$7;
  var isCallable$e = isCallable$h;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

  var Object$4 = global$y.Object;

  var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$5('Symbol');
    return isCallable$e($Symbol) && isPrototypeOf$2($Symbol.prototype, Object$4(it));
  };

  var global$x = global$D;

  var String$5 = global$x.String;

  var tryToString$4 = function (argument) {
    try {
      return String$5(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var global$w = global$D;
  var isCallable$d = isCallable$h;
  var tryToString$3 = tryToString$4;

  var TypeError$d = global$w.TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$5 = function (argument) {
    if (isCallable$d(argument)) return argument;
    throw TypeError$d(tryToString$3(argument) + ' is not a function');
  };

  var aCallable$4 = aCallable$5;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$3 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$4(func);
  };

  var global$v = global$D;
  var call$9 = functionCall;
  var isCallable$c = isCallable$h;
  var isObject$7 = isObject$8;

  var TypeError$c = global$v.TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$c(fn = input.toString) && !isObject$7(val = call$9(fn, input))) return val;
    if (isCallable$c(fn = input.valueOf) && !isObject$7(val = call$9(fn, input))) return val;
    if (pref !== 'string' && isCallable$c(fn = input.toString) && !isObject$7(val = call$9(fn, input))) return val;
    throw TypeError$c("Can't convert object to primitive value");
  };

  var shared$3 = {exports: {}};

  var global$u = global$D;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$1 = Object.defineProperty;

  var setGlobal$3 = function (key, value) {
    try {
      defineProperty$1(global$u, key, { value: value, configurable: true, writable: true });
    } catch (error) {
      global$u[key] = value;
    } return value;
  };

  var global$t = global$D;
  var setGlobal$2 = setGlobal$3;

  var SHARED = '__core-js_shared__';
  var store$3 = global$t[SHARED] || setGlobal$2(SHARED, {});

  var sharedStore = store$3;

  var store$2 = sharedStore;

  (shared$3.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.21.1',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var global$s = global$D;
  var requireObjectCoercible$1 = requireObjectCoercible$3;

  var Object$3 = global$s.Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$4 = function (argument) {
    return Object$3(requireObjectCoercible$1(argument));
  };

  var uncurryThis$b = functionUncurryThis;
  var toObject$3 = toObject$4;

  var hasOwnProperty = uncurryThis$b({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$3(it), key);
  };

  var uncurryThis$a = functionUncurryThis;

  var id$1 = 0;
  var postfix = Math.random();
  var toString$4 = uncurryThis$a(1.0.toString);

  var uid$2 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$4(++id$1 + postfix, 36);
  };

  var global$r = global$D;
  var shared$2 = shared$3.exports;
  var hasOwn$9 = hasOwnProperty_1;
  var uid$1 = uid$2;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;

  var WellKnownSymbolsStore = shared$2('wks');
  var Symbol$1 = global$r.Symbol;
  var symbolFor = Symbol$1 && Symbol$1['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

  var wellKnownSymbol$e = function (name) {
    if (!hasOwn$9(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
      var description = 'Symbol.' + name;
      if (NATIVE_SYMBOL && hasOwn$9(Symbol$1, name)) {
        WellKnownSymbolsStore[name] = Symbol$1[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
      }
    } return WellKnownSymbolsStore[name];
  };

  var global$q = global$D;
  var call$8 = functionCall;
  var isObject$6 = isObject$8;
  var isSymbol$1 = isSymbol$2;
  var getMethod$2 = getMethod$3;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$d = wellKnownSymbol$e;

  var TypeError$b = global$q.TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$d('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$1 = function (input, pref) {
    if (!isObject$6(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$8(exoticToPrim, input, pref);
      if (!isObject$6(result) || isSymbol$1(result)) return result;
      throw TypeError$b("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol = isSymbol$2;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$3 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol(key) ? key : key + '';
  };

  var global$p = global$D;
  var isObject$5 = isObject$8;

  var document$3 = global$p.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$5(document$3) && isObject$5(document$3.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS$1 ? document$3.createElement(it) : {};
  };

  var DESCRIPTORS$7 = descriptors;
  var fails$6 = fails$b;
  var createElement$2 = documentCreateElement$1;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$7 && !fails$6(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement$2('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var DESCRIPTORS$6 = descriptors;
  var call$7 = functionCall;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createPropertyDescriptor$3 = createPropertyDescriptor$4;
  var toIndexedObject$3 = toIndexedObject$4;
  var toPropertyKey$2 = toPropertyKey$3;
  var hasOwn$8 = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$3(O);
    P = toPropertyKey$2(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) { /* empty */ }
    if (hasOwn$8(O, P)) return createPropertyDescriptor$3(!call$7(propertyIsEnumerableModule.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$5 = descriptors;
  var fails$5 = fails$b;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$5 && fails$5(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () { /* empty */ }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var global$o = global$D;
  var isObject$4 = isObject$8;

  var String$4 = global$o.String;
  var TypeError$a = global$o.TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$b = function (argument) {
    if (isObject$4(argument)) return argument;
    throw TypeError$a(String$4(argument) + ' is not an object');
  };

  var global$n = global$D;
  var DESCRIPTORS$4 = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$a = anObject$b;
  var toPropertyKey$1 = toPropertyKey$3;

  var TypeError$9 = global$n.TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$a(O);
    P = toPropertyKey$1(P);
    anObject$a(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    } return $defineProperty(O, P, Attributes);
  } : $defineProperty : function defineProperty(O, P, Attributes) {
    anObject$a(O);
    P = toPropertyKey$1(P);
    anObject$a(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$9('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$3 = descriptors;
  var definePropertyModule$5 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$4;

  var createNonEnumerableProperty$4 = DESCRIPTORS$3 ? function (object, key, value) {
    return definePropertyModule$5.f(object, key, createPropertyDescriptor$2(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$6 = {exports: {}};

  var uncurryThis$9 = functionUncurryThis;
  var isCallable$b = isCallable$h;
  var store$1 = sharedStore;

  var functionToString = uncurryThis$9(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$b(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$4 = store$1.inspectSource;

  var global$m = global$D;
  var isCallable$a = isCallable$h;
  var inspectSource$3 = inspectSource$4;

  var WeakMap$1 = global$m.WeakMap;

  var nativeWeakMap = isCallable$a(WeakMap$1) && /native code/.test(inspectSource$3(WeakMap$1));

  var shared$1 = shared$3.exports;
  var uid = uid$2;

  var keys = shared$1('keys');

  var sharedKey$3 = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys$4 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$l = global$D;
  var uncurryThis$8 = functionUncurryThis;
  var isObject$3 = isObject$8;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
  var hasOwn$7 = hasOwnProperty_1;
  var shared = sharedStore;
  var sharedKey$2 = sharedKey$3;
  var hiddenKeys$3 = hiddenKeys$4;

  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$8 = global$l.TypeError;
  var WeakMap = global$l.WeakMap;
  var set$1, get, has;

  var enforce = function (it) {
    return has(it) ? get(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
        throw TypeError$8('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared.state) {
    var store = shared.state || (shared.state = new WeakMap());
    var wmget = uncurryThis$8(store.get);
    var wmhas = uncurryThis$8(store.has);
    var wmset = uncurryThis$8(store.set);
    set$1 = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget(store, it) || {};
    };
    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$2('state');
    hiddenKeys$3[STATE] = true;
    set$1 = function (it, metadata) {
      if (hasOwn$7(it, STATE)) throw new TypeError$8(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$3(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return hasOwn$7(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$7(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var DESCRIPTORS$2 = descriptors;
  var hasOwn$6 = hasOwnProperty_1;

  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor;

  var EXISTS = hasOwn$6(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || (DESCRIPTORS$2 && getDescriptor(FunctionPrototype$1, 'name').configurable));

  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var global$k = global$D;
  var isCallable$9 = isCallable$h;
  var hasOwn$5 = hasOwnProperty_1;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$2 = inspectSource$4;
  var InternalStateModule$2 = internalState;
  var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;

  var getInternalState$2 = InternalStateModule$2.get;
  var enforceInternalState = InternalStateModule$2.enforce;
  var TEMPLATE = String(String).split('String');

  (redefine$6.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;
    if (isCallable$9(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }
      if (!hasOwn$5(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
        createNonEnumerableProperty$2(value, 'name', name);
      }
      state = enforceInternalState(value);
      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }
    if (O === global$k) {
      if (simple) O[key] = value;
      else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty$2(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$9(this) && getInternalState$2(this).source || inspectSource$2(this);
  });

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$3 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- safe
    return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
  };

  var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$1 = function (index, length) {
    var integer = toIntegerOrInfinity$2(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$1 = function (argument) {
    return argument > 0 ? min(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength = toLength$1;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$4 = function (obj) {
    return toLength(obj.length);
  };

  var toIndexedObject$2 = toIndexedObject$4;
  var toAbsoluteIndex = toAbsoluteIndex$1;
  var lengthOfArrayLike$3 = lengthOfArrayLike$4;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$2 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$2($this);
      var length = lengthOfArrayLike$3(O);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$2(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$2(false)
  };

  var uncurryThis$7 = functionUncurryThis;
  var hasOwn$4 = hasOwnProperty_1;
  var toIndexedObject$1 = toIndexedObject$4;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$2 = hiddenKeys$4;

  var push$2 = uncurryThis$7([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$1(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$4(hiddenKeys$2, key) && hasOwn$4(O, key) && push$2(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$4(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$2(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;

  var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$1);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$4 = getBuiltIn$7;
  var uncurryThis$6 = functionUncurryThis;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var anObject$9 = anObject$b;

  var concat$2 = uncurryThis$6([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule.f(anObject$9(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return getOwnPropertySymbols ? concat$2(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$3 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule$4 = objectDefineProperty;

  var copyConstructorProperties$1 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$4.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$3(target, key) && !(exceptions && hasOwn$3(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$4 = fails$b;
  var isCallable$8 = isCallable$h;

  var replacement = /#|\.prototype\./;

  var isForced$2 = function (feature, detection) {
    var value = data$1[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : isCallable$8(detection) ? fails$4(detection)
      : !!detection;
  };

  var normalize = isForced$2.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data$1 = isForced$2.data = {};
  var NATIVE = isForced$2.NATIVE = 'N';
  var POLYFILL = isForced$2.POLYFILL = 'P';

  var isForced_1 = isForced$2;

  var global$j = global$D;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
  var redefine$5 = redefine$6.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties = copyConstructorProperties$1;
  var isForced$1 = isForced_1;

  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$j;
    } else if (STATIC) {
      target = global$j[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$j[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty$1(sourceProperty, 'sham', true);
      }
      // extend global
      redefine$5(target, key, sourceProperty, options);
    }
  };

  var uncurryThis$5 = functionUncurryThis;
  var aCallable$3 = aCallable$5;
  var NATIVE_BIND$1 = functionBindNative;

  var bind$6 = uncurryThis$5(uncurryThis$5.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$3(fn);
    return that === undefined ? fn : NATIVE_BIND$1 ? bind$6(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var classof$6 = classofRaw$1;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$2 = Array.isArray || function isArray(argument) {
    return classof$6(argument) == 'Array';
  };

  var wellKnownSymbol$c = wellKnownSymbol$e;

  var TO_STRING_TAG$2 = wellKnownSymbol$c('toStringTag');
  var test = {};

  test[TO_STRING_TAG$2] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var global$i = global$D;
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$7 = isCallable$h;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$b = wellKnownSymbol$e;

  var TO_STRING_TAG$1 = wellKnownSymbol$b('toStringTag');
  var Object$2 = global$i.Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$5 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object$2(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
  };

  var uncurryThis$4 = functionUncurryThis;
  var fails$3 = fails$b;
  var isCallable$6 = isCallable$h;
  var classof$4 = classof$5;
  var getBuiltIn$3 = getBuiltIn$7;
  var inspectSource$1 = inspectSource$4;

  var noop = function () { /* empty */ };
  var empty = [];
  var construct = getBuiltIn$3('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec = uncurryThis$4(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$6(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$6(argument)) return false;
    switch (classof$4(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction': return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource$1(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$3 = !construct || fails$3(function () {
    var called;
    return isConstructorModern(isConstructorModern.call)
      || !isConstructorModern(Object)
      || !isConstructorModern(function () { called = true; })
      || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var global$h = global$D;
  var isArray$1 = isArray$2;
  var isConstructor$2 = isConstructor$3;
  var isObject$2 = isObject$8;
  var wellKnownSymbol$a = wellKnownSymbol$e;

  var SPECIES$3 = wellKnownSymbol$a('species');
  var Array$2 = global$h.Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$1(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$2(C) && (C === Array$2 || isArray$1(C.prototype))) C = undefined;
      else if (isObject$2(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array$2 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$1 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$5 = functionBindContext;
  var uncurryThis$3 = functionUncurryThis;
  var IndexedObject = indexedObject;
  var toObject$2 = toObject$4;
  var lengthOfArrayLike$2 = lengthOfArrayLike$4;
  var arraySpeciesCreate = arraySpeciesCreate$1;

  var push$1 = uncurryThis$3([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$2($this);
      var self = IndexedObject(O);
      var boundFunction = bind$5(callbackfn, that);
      var length = lengthOfArrayLike$2(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push$1(target, value);      // filter
          } else switch (TYPE) {
            case 4: return false;             // every
            case 7: push$1(target, value);      // filterReject
          }
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$1(7)
  };

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$1 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$1 = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$3 = objectDefineProperty;
  var anObject$8 = anObject$b;
  var toIndexedObject = toIndexedObject$4;
  var objectKeys = objectKeys$1;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS$1 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$8(O);
    var props = toIndexedObject(Properties);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
    return O;
  };

  var getBuiltIn$2 = getBuiltIn$7;

  var html$3 = getBuiltIn$2('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */

  var anObject$7 = anObject$b;
  var definePropertiesModule = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys = hiddenKeys$4;
  var html$2 = html$3;
  var documentCreateElement = documentCreateElement$1;
  var sharedKey$1 = sharedKey$3;

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$1('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html$2.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = typeof document != 'undefined'
      ? document.domain && activeXDocument
        ? NullProtoObjectViaActiveX(activeXDocument) // old IE
        : NullProtoObjectViaIFrame()
      : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject$7(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  };

  var wellKnownSymbol$9 = wellKnownSymbol$e;
  var create$1 = objectCreate;
  var definePropertyModule$2 = objectDefineProperty;

  var UNSCOPABLES = wellKnownSymbol$9('unscopables');
  var ArrayPrototype$2 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$2[UNSCOPABLES] == undefined) {
    definePropertyModule$2.f(ArrayPrototype$2, UNSCOPABLES, {
      configurable: true,
      value: create$1(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$1 = function (key) {
    ArrayPrototype$2[UNSCOPABLES][key] = true;
  };

  var $$3 = _export;
  var $find = arrayIteration.find;
  var addToUnscopables = addToUnscopables$1;

  var FIND = 'find';
  var SKIPS_HOLES = true;

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  $$3({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$3 = classof$5;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$3(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$4 = redefine$6.exports;
  var toString$3 = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    redefine$4(Object.prototype, 'toString', toString$3, { unsafe: true });
  }

  var call$6 = functionCall;
  var anObject$6 = anObject$b;
  var getMethod$1 = getMethod$3;

  var iteratorClose$2 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$6(iterator);
    try {
      innerResult = getMethod$1(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$6(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$6(innerResult);
    return value;
  };

  var anObject$5 = anObject$b;
  var iteratorClose$1 = iteratorClose$2;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$5(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose$1(iterator, 'throw', error);
    }
  };

  var iterators = {};

  var wellKnownSymbol$8 = wellKnownSymbol$e;
  var Iterators$3 = iterators;

  var ITERATOR$4 = wellKnownSymbol$8('iterator');
  var ArrayPrototype$1 = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators$3.Array === it || ArrayPrototype$1[ITERATOR$4] === it);
  };

  var toPropertyKey = toPropertyKey$3;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$4;

  var createProperty$1 = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));
    else object[propertyKey] = value;
  };

  var classof$2 = classof$5;
  var getMethod = getMethod$3;
  var Iterators$2 = iterators;
  var wellKnownSymbol$7 = wellKnownSymbol$e;

  var ITERATOR$3 = wellKnownSymbol$7('iterator');

  var getIteratorMethod$3 = function (it) {
    if (it != undefined) return getMethod(it, ITERATOR$3)
      || getMethod(it, '@@iterator')
      || Iterators$2[classof$2(it)];
  };

  var global$g = global$D;
  var call$5 = functionCall;
  var aCallable$2 = aCallable$5;
  var anObject$4 = anObject$b;
  var tryToString$2 = tryToString$4;
  var getIteratorMethod$2 = getIteratorMethod$3;

  var TypeError$7 = global$g.TypeError;

  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$2(iteratorMethod)) return anObject$4(call$5(iteratorMethod, argument));
    throw TypeError$7(tryToString$2(argument) + ' is not iterable');
  };

  var global$f = global$D;
  var bind$4 = functionBindContext;
  var call$4 = functionCall;
  var toObject$1 = toObject$4;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var isConstructor$1 = isConstructor$3;
  var lengthOfArrayLike$1 = lengthOfArrayLike$4;
  var createProperty = createProperty$1;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;

  var Array$1 = global$f.Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$1(arrayLike);
    var IS_CONSTRUCTOR = isConstructor$1(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$4(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod$1(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this == Array$1 && isArrayIteratorMethod$1(iteratorMethod))) {
      iterator = getIterator$1(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = call$4(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$1(O);
      result = IS_CONSTRUCTOR ? new this(length) : Array$1(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var wellKnownSymbol$6 = wellKnownSymbol$e;

  var ITERATOR$2 = wellKnownSymbol$6('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$2] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$2] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var $$2 = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;

  var INCORRECT_ITERATION$1 = !checkCorrectnessOfIteration$1(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$2({ target: 'Array', stat: true, forced: INCORRECT_ITERATION$1 }, {
    from: from
  });

  var global$e = global$D;
  var classof$1 = classof$5;

  var String$3 = global$e.String;

  var toString$2 = function (argument) {
    if (classof$1(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$3(argument);
  };

  var uncurryThis$2 = functionUncurryThis;
  var toIntegerOrInfinity = toIntegerOrInfinity$3;
  var toString$1 = toString$2;
  var requireObjectCoercible = requireObjectCoercible$3;

  var charAt$1 = uncurryThis$2(''.charAt);
  var charCodeAt = uncurryThis$2(''.charCodeAt);
  var stringSlice = uncurryThis$2(''.slice);

  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$1(requireObjectCoercible($this));
      var position = toIntegerOrInfinity(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$1(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };

  var fails$2 = fails$b;

  var correctPrototypeGetter = !fails$2(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var global$d = global$D;
  var hasOwn$2 = hasOwnProperty_1;
  var isCallable$5 = isCallable$h;
  var toObject = toObject$4;
  var sharedKey = sharedKey$3;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

  var IE_PROTO = sharedKey('IE_PROTO');
  var Object$1 = global$d.Object;
  var ObjectPrototype = Object$1.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$1.getPrototypeOf : function (O) {
    var object = toObject(O);
    if (hasOwn$2(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$5(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof Object$1 ? ObjectPrototype : null;
  };

  var fails$1 = fails$b;
  var isCallable$4 = isCallable$h;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var redefine$3 = redefine$6.exports;
  var wellKnownSymbol$5 = wellKnownSymbol$e;

  var ITERATOR$1 = wellKnownSymbol$5('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
    else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$1(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$1].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$4(IteratorPrototype$2[ITERATOR$1])) {
    redefine$3(IteratorPrototype$2, ITERATOR$1, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty = objectDefineProperty.f;
  var hasOwn$1 = hasOwnProperty_1;
  var wellKnownSymbol$4 = wellKnownSymbol$e;

  var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');

  var setToStringTag$3 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$1(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create = objectCreate;
  var createPropertyDescriptor = createPropertyDescriptor$4;
  var setToStringTag$2 = setToStringTag$3;
  var Iterators$1 = iterators;

  var returnThis$1 = function () { return this; };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag$2(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$1[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var global$c = global$D;
  var isCallable$3 = isCallable$h;

  var String$2 = global$c.String;
  var TypeError$6 = global$c.TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$3(argument)) return argument;
    throw TypeError$6("Can't set " + String$2(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */

  var uncurryThis$1 = functionUncurryThis;
  var anObject$3 = anObject$b;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = uncurryThis$1(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject$3(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$1 = _export;
  var call$3 = functionCall;
  var FunctionName = functionName;
  var isCallable$2 = isCallable$h;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$1 = objectSetPrototypeOf;
  var setToStringTag$1 = setToStringTag$3;
  var createNonEnumerableProperty = createNonEnumerableProperty$4;
  var redefine$2 = redefine$6.exports;
  var wellKnownSymbol$3 = wellKnownSymbol$e;
  var Iterators = iterators;
  var IteratorsCore = iteratorsCore;

  var PROPER_FUNCTION_NAME = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR = wellKnownSymbol$3('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () { return this; };

  var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$1) {
            setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$2(CurrentIteratorPrototype[ITERATOR])) {
            redefine$2(CurrentIteratorPrototype, ITERATOR, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$1(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return call$3(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$2(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$1({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR] !== defaultIterator) {
      redefine$2(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
    }
    Iterators[NAME] = defaultIterator;

    return methods;
  };

  var charAt = stringMultibyte.charAt;
  var toString = toString$2;
  var InternalStateModule$1 = internalState;
  var defineIterator = defineIterator$1;

  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState$1 = InternalStateModule$1.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$1(this, {
      type: STRING_ITERATOR,
      string: toString(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var global$b = global$D;

  var nativePromiseConstructor = global$b.Promise;

  var redefine$1 = redefine$6.exports;

  var redefineAll$1 = function (target, src, options) {
    for (var key in src) redefine$1(target, key, src[key], options);
    return target;
  };

  var getBuiltIn$1 = getBuiltIn$7;
  var definePropertyModule = objectDefineProperty;
  var wellKnownSymbol$2 = wellKnownSymbol$e;
  var DESCRIPTORS = descriptors;

  var SPECIES$2 = wellKnownSymbol$2('species');

  var setSpecies$1 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule.f;

    if (DESCRIPTORS && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var global$a = global$D;
  var isPrototypeOf$1 = objectIsPrototypeOf;

  var TypeError$5 = global$a.TypeError;

  var anInstance$1 = function (it, Prototype) {
    if (isPrototypeOf$1(Prototype, it)) return it;
    throw TypeError$5('Incorrect invocation');
  };

  var global$9 = global$D;
  var bind$3 = functionBindContext;
  var call$2 = functionCall;
  var anObject$2 = anObject$b;
  var tryToString$1 = tryToString$4;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var lengthOfArrayLike = lengthOfArrayLike$4;
  var isPrototypeOf = objectIsPrototypeOf;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;
  var iteratorClose = iteratorClose$2;

  var TypeError$4 = global$9.TypeError;

  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var ResultPrototype = Result.prototype;

  var iterate$1 = function (iterable, unboundFunction, options) {
    var that = options && options.that;
    var AS_ENTRIES = !!(options && options.AS_ENTRIES);
    var IS_ITERATOR = !!(options && options.IS_ITERATOR);
    var INTERRUPTED = !!(options && options.INTERRUPTED);
    var fn = bind$3(unboundFunction, that);
    var iterator, iterFn, index, length, result, next, step;

    var stop = function (condition) {
      if (iterator) iteratorClose(iterator, 'normal', condition);
      return new Result(true, condition);
    };

    var callFn = function (value) {
      if (AS_ENTRIES) {
        anObject$2(value);
        return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
      } return INTERRUPTED ? fn(value, stop) : fn(value);
    };

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (!iterFn) throw TypeError$4(tryToString$1(iterable) + ' is not iterable');
      // optimisation for array iterators
      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
          result = callFn(iterable[index]);
          if (result && isPrototypeOf(ResultPrototype, result)) return result;
        } return new Result(false);
      }
      iterator = getIterator(iterable, iterFn);
    }

    next = iterator.next;
    while (!(step = call$2(next, iterator)).done) {
      try {
        result = callFn(step.value);
      } catch (error) {
        iteratorClose(iterator, 'throw', error);
      }
      if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
    } return new Result(false);
  };

  var global$8 = global$D;
  var isConstructor = isConstructor$3;
  var tryToString = tryToString$4;

  var TypeError$3 = global$8.TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$1 = function (argument) {
    if (isConstructor(argument)) return argument;
    throw TypeError$3(tryToString(argument) + ' is not a constructor');
  };

  var anObject$1 = anObject$b;
  var aConstructor = aConstructor$1;
  var wellKnownSymbol$1 = wellKnownSymbol$e;

  var SPECIES$1 = wellKnownSymbol$1('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$1 = function (O, defaultConstructor) {
    var C = anObject$1(O).constructor;
    var S;
    return C === undefined || (S = anObject$1(C)[SPECIES$1]) == undefined ? defaultConstructor : aConstructor(S);
  };

  var NATIVE_BIND = functionBindNative;

  var FunctionPrototype = Function.prototype;
  var apply$1 = FunctionPrototype.apply;
  var call$1 = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$1.bind(apply$1) : function () {
    return call$1.apply(apply$1, arguments);
  });

  var uncurryThis = functionUncurryThis;

  var arraySlice$1 = uncurryThis([].slice);

  var global$7 = global$D;

  var TypeError$2 = global$7.TypeError;

  var validateArgumentsLength$1 = function (passed, required) {
    if (passed < required) throw TypeError$2('Not enough arguments');
    return passed;
  };

  var userAgent$2 = engineUserAgent;

  var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

  var classof = classofRaw$1;
  var global$6 = global$D;

  var engineIsNode = classof(global$6.process) == 'process';

  var global$5 = global$D;
  var apply = functionApply;
  var bind$2 = functionBindContext;
  var isCallable$1 = isCallable$h;
  var hasOwn = hasOwnProperty_1;
  var fails = fails$b;
  var html$1 = html$3;
  var arraySlice = arraySlice$1;
  var createElement$1 = documentCreateElement$1;
  var validateArgumentsLength = validateArgumentsLength$1;
  var IS_IOS$1 = engineIsIos;
  var IS_NODE$2 = engineIsNode;

  var set = global$5.setImmediate;
  var clear = global$5.clearImmediate;
  var process$3 = global$5.process;
  var Dispatch = global$5.Dispatch;
  var Function$1 = global$5.Function;
  var MessageChannel = global$5.MessageChannel;
  var String$1 = global$5.String;
  var counter = 0;
  var queue$1 = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var location, defer, channel, port;

  try {
    // Deno throws a ReferenceError on `location` access without `--location` flag
    location = global$5.location;
  } catch (error) { /* empty */ }

  var run = function (id) {
    if (hasOwn(queue$1, id)) {
      var fn = queue$1[id];
      delete queue$1[id];
      fn();
    }
  };

  var runner = function (id) {
    return function () {
      run(id);
    };
  };

  var listener = function (event) {
    run(event.data);
  };

  var post = function (id) {
    // old engines have not location.origin
    global$5.postMessage(String$1(id), location.protocol + '//' + location.host);
  };

  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!set || !clear) {
    set = function setImmediate(handler) {
      validateArgumentsLength(arguments.length, 1);
      var fn = isCallable$1(handler) ? handler : Function$1(handler);
      var args = arraySlice(arguments, 1);
      queue$1[++counter] = function () {
        apply(fn, undefined, args);
      };
      defer(counter);
      return counter;
    };
    clear = function clearImmediate(id) {
      delete queue$1[id];
    };
    // Node.js 0.8-
    if (IS_NODE$2) {
      defer = function (id) {
        process$3.nextTick(runner(id));
      };
    // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(runner(id));
      };
    // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624
    } else if (MessageChannel && !IS_IOS$1) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = bind$2(port.postMessage, port);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (
      global$5.addEventListener &&
      isCallable$1(global$5.postMessage) &&
      !global$5.importScripts &&
      location && location.protocol !== 'file:' &&
      !fails(post)
    ) {
      defer = post;
      global$5.addEventListener('message', listener, false);
    // IE8-
    } else if (ONREADYSTATECHANGE in createElement$1('script')) {
      defer = function (id) {
        html$1.appendChild(createElement$1('script'))[ONREADYSTATECHANGE] = function () {
          html$1.removeChild(this);
          run(id);
        };
      };
    // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(runner(id), 0);
      };
    }
  }

  var task$1 = {
    set: set,
    clear: clear
  };

  var userAgent$1 = engineUserAgent;
  var global$4 = global$D;

  var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$4.Pebble !== undefined;

  var userAgent = engineUserAgent;

  var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

  var global$3 = global$D;
  var bind$1 = functionBindContext;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var macrotask = task$1.set;
  var IS_IOS = engineIsIos;
  var IS_IOS_PEBBLE = engineIsIosPebble;
  var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
  var IS_NODE$1 = engineIsNode;

  var MutationObserver = global$3.MutationObserver || global$3.WebKitMutationObserver;
  var document$2 = global$3.document;
  var process$2 = global$3.process;
  var Promise$1 = global$3.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$3, 'queueMicrotask');
  var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

  var flush, head, last, notify$1, toggle, node, promise, then;

  // modern engines have queueMicrotask method
  if (!queueMicrotask) {
    flush = function () {
      var parent, fn;
      if (IS_NODE$1 && (parent = process$2.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (error) {
          if (head) notify$1();
          else last = undefined;
          throw error;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
    // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
    if (!IS_IOS && !IS_NODE$1 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
      toggle = true;
      node = document$2.createTextNode('');
      new MutationObserver(flush).observe(node, { characterData: true });
      notify$1 = function () {
        node.data = toggle = !toggle;
      };
    // environments with maybe non-completely correct, but existent Promise
    } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      promise = Promise$1.resolve(undefined);
      // workaround of WebKit ~ iOS Safari 10.1 bug
      promise.constructor = Promise$1;
      then = bind$1(promise.then, promise);
      notify$1 = function () {
        then(flush);
      };
    // Node.js without promises
    } else if (IS_NODE$1) {
      notify$1 = function () {
        process$2.nextTick(flush);
      };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
    } else {
      // strange IE + webpack dev server bug - use .bind(global)
      macrotask = bind$1(macrotask, global$3);
      notify$1 = function () {
        macrotask(flush);
      };
    }
  }

  var microtask$1 = queueMicrotask || function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify$1();
    } last = task;
  };

  var newPromiseCapability$2 = {};

  var aCallable$1 = aCallable$5;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = aCallable$1(resolve);
    this.reject = aCallable$1(reject);
  };

  // `NewPromiseCapability` abstract operation
  // https://tc39.es/ecma262/#sec-newpromisecapability
  newPromiseCapability$2.f = function (C) {
    return new PromiseCapability(C);
  };

  var anObject = anObject$b;
  var isObject$1 = isObject$8;
  var newPromiseCapability$1 = newPromiseCapability$2;

  var promiseResolve$1 = function (C, x) {
    anObject(C);
    if (isObject$1(x) && x.constructor === C) return x;
    var promiseCapability = newPromiseCapability$1.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var global$2 = global$D;

  var hostReportErrors$1 = function (a, b) {
    var console = global$2.console;
    if (console && console.error) {
      arguments.length == 1 ? console.error(a) : console.error(a, b);
    }
  };

  var perform$1 = function (exec) {
    try {
      return { error: false, value: exec() };
    } catch (error) {
      return { error: true, value: error };
    }
  };

  var Queue$1 = function () {
    this.head = null;
    this.tail = null;
  };

  Queue$1.prototype = {
    add: function (item) {
      var entry = { item: item, next: null };
      if (this.head) this.tail.next = entry;
      else this.head = entry;
      this.tail = entry;
    },
    get: function () {
      var entry = this.head;
      if (entry) {
        this.head = entry.next;
        if (this.tail === entry) this.tail = null;
        return entry.item;
      }
    }
  };

  var queue = Queue$1;

  var engineIsBrowser = typeof window == 'object';

  var $ = _export;
  var global$1 = global$D;
  var getBuiltIn = getBuiltIn$7;
  var call = functionCall;
  var NativePromise = nativePromiseConstructor;
  var redefine = redefine$6.exports;
  var redefineAll = redefineAll$1;
  var setPrototypeOf = objectSetPrototypeOf;
  var setToStringTag = setToStringTag$3;
  var setSpecies = setSpecies$1;
  var aCallable = aCallable$5;
  var isCallable = isCallable$h;
  var isObject = isObject$8;
  var anInstance = anInstance$1;
  var inspectSource = inspectSource$4;
  var iterate = iterate$1;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
  var speciesConstructor = speciesConstructor$1;
  var task = task$1.set;
  var microtask = microtask$1;
  var promiseResolve = promiseResolve$1;
  var hostReportErrors = hostReportErrors$1;
  var newPromiseCapabilityModule = newPromiseCapability$2;
  var perform = perform$1;
  var Queue = queue;
  var InternalStateModule = internalState;
  var isForced = isForced_1;
  var wellKnownSymbol = wellKnownSymbol$e;
  var IS_BROWSER = engineIsBrowser;
  var IS_NODE = engineIsNode;
  var V8_VERSION = engineV8Version;

  var SPECIES = wellKnownSymbol('species');
  var PROMISE = 'Promise';

  var getInternalState = InternalStateModule.getterFor(PROMISE);
  var setInternalState = InternalStateModule.set;
  var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
  var NativePromisePrototype = NativePromise && NativePromise.prototype;
  var PromiseConstructor = NativePromise;
  var PromisePrototype = NativePromisePrototype;
  var TypeError$1 = global$1.TypeError;
  var document$1 = global$1.document;
  var process$1 = global$1.process;
  var newPromiseCapability = newPromiseCapabilityModule.f;
  var newGenericPromiseCapability = newPromiseCapability;

  var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$1.dispatchEvent);
  var NATIVE_REJECTION_EVENT = isCallable(global$1.PromiseRejectionEvent);
  var UNHANDLED_REJECTION = 'unhandledrejection';
  var REJECTION_HANDLED = 'rejectionhandled';
  var PENDING = 0;
  var FULFILLED = 1;
  var REJECTED = 2;
  var HANDLED = 1;
  var UNHANDLED = 2;
  var SUBCLASSING = false;

  var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

  var FORCED = isForced(PROMISE, function () {
    var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(PromiseConstructor);
    var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(PromiseConstructor);
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
    // We can't use @@species feature detection in V8 since it causes
    // deoptimization and performance degradation
    // https://github.com/zloirock/core-js/issues/679
    if (V8_VERSION >= 51 && /native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) return false;
    // Detect correctness of subclassing with @@species support
    var promise = new PromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
  });

  var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
    PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
  });

  // helpers
  var isThenable = function (it) {
    var then;
    return isObject(it) && isCallable(then = it.then) ? then : false;
  };

  var callReaction = function (reaction, state) {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var handler = ok ? reaction.ok : reaction.fail;
    var resolve = reaction.resolve;
    var reject = reaction.reject;
    var domain = reaction.domain;
    var result, then, exited;
    try {
      if (handler) {
        if (!ok) {
          if (state.rejection === UNHANDLED) onHandleUnhandled(state);
          state.rejection = HANDLED;
        }
        if (handler === true) result = value;
        else {
          if (domain) domain.enter();
          result = handler(value); // can throw
          if (domain) {
            domain.exit();
            exited = true;
          }
        }
        if (result === reaction.promise) {
          reject(TypeError$1('Promise-chain cycle'));
        } else if (then = isThenable(result)) {
          call(then, result, resolve, reject);
        } else resolve(result);
      } else reject(value);
    } catch (error) {
      if (domain && !exited) domain.exit();
      reject(error);
    }
  };

  var notify = function (state, isReject) {
    if (state.notified) return;
    state.notified = true;
    microtask(function () {
      var reactions = state.reactions;
      var reaction;
      while (reaction = reactions.get()) {
        callReaction(reaction, state);
      }
      state.notified = false;
      if (isReject && !state.rejection) onUnhandled(state);
    });
  };

  var dispatchEvent = function (name, promise, reason) {
    var event, handler;
    if (DISPATCH_EVENT) {
      event = document$1.createEvent('Event');
      event.promise = promise;
      event.reason = reason;
      event.initEvent(name, false, true);
      global$1.dispatchEvent(event);
    } else event = { promise: promise, reason: reason };
    if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);
    else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
  };

  var onUnhandled = function (state) {
    call(task, global$1, function () {
      var promise = state.facade;
      var value = state.value;
      var IS_UNHANDLED = isUnhandled(state);
      var result;
      if (IS_UNHANDLED) {
        result = perform(function () {
          if (IS_NODE) {
            process$1.emit('unhandledRejection', value, promise);
          } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
        if (result.error) throw result.value;
      }
    });
  };

  var isUnhandled = function (state) {
    return state.rejection !== HANDLED && !state.parent;
  };

  var onHandleUnhandled = function (state) {
    call(task, global$1, function () {
      var promise = state.facade;
      if (IS_NODE) {
        process$1.emit('rejectionHandled', promise);
      } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
    });
  };

  var bind = function (fn, state, unwrap) {
    return function (value) {
      fn(state, value, unwrap);
    };
  };

  var internalReject = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    state.value = value;
    state.state = REJECTED;
    notify(state, true);
  };

  var internalResolve = function (state, value, unwrap) {
    if (state.done) return;
    state.done = true;
    if (unwrap) state = unwrap;
    try {
      if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
      var then = isThenable(value);
      if (then) {
        microtask(function () {
          var wrapper = { done: false };
          try {
            call(then, value,
              bind(internalResolve, wrapper, state),
              bind(internalReject, wrapper, state)
            );
          } catch (error) {
            internalReject(wrapper, error, state);
          }
        });
      } else {
        state.value = value;
        state.state = FULFILLED;
        notify(state, false);
      }
    } catch (error) {
      internalReject({ done: false }, error, state);
    }
  };

  // constructor polyfill
  if (FORCED) {
    // 25.4.3.1 Promise(executor)
    PromiseConstructor = function Promise(executor) {
      anInstance(this, PromisePrototype);
      aCallable(executor);
      call(Internal, this);
      var state = getInternalState(this);
      try {
        executor(bind(internalResolve, state), bind(internalReject, state));
      } catch (error) {
        internalReject(state, error);
      }
    };
    PromisePrototype = PromiseConstructor.prototype;
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    Internal = function Promise(executor) {
      setInternalState(this, {
        type: PROMISE,
        done: false,
        notified: false,
        parent: false,
        reactions: new Queue(),
        rejection: false,
        state: PENDING,
        value: undefined
      });
    };
    Internal.prototype = redefineAll(PromisePrototype, {
      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      // eslint-disable-next-line unicorn/no-thenable -- safe
      then: function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
        state.parent = true;
        reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
        reaction.fail = isCallable(onRejected) && onRejected;
        reaction.domain = IS_NODE ? process$1.domain : undefined;
        if (state.state == PENDING) state.reactions.add(reaction);
        else microtask(function () {
          callReaction(reaction, state);
        });
        return reaction.promise;
      },
      // `Promise.prototype.catch` method
      // https://tc39.es/ecma262/#sec-promise.prototype.catch
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      var state = getInternalState(promise);
      this.promise = promise;
      this.resolve = bind(internalResolve, state);
      this.reject = bind(internalReject, state);
    };
    newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
      return C === PromiseConstructor || C === PromiseWrapper
        ? new OwnPromiseCapability(C)
        : newGenericPromiseCapability(C);
    };

    if (isCallable(NativePromise) && NativePromisePrototype !== Object.prototype) {
      nativeThen = NativePromisePrototype.then;

      if (!SUBCLASSING) {
        // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
        redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
          var that = this;
          return new PromiseConstructor(function (resolve, reject) {
            call(nativeThen, that, resolve, reject);
          }).then(onFulfilled, onRejected);
        // https://github.com/zloirock/core-js/issues/640
        }, { unsafe: true });

        // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
        redefine(NativePromisePrototype, 'catch', PromisePrototype['catch'], { unsafe: true });
      }

      // make `.constructor === Promise` work for native promise-based APIs
      try {
        delete NativePromisePrototype.constructor;
      } catch (error) { /* empty */ }

      // make `instanceof Promise` work for native promise-based APIs
      if (setPrototypeOf) {
        setPrototypeOf(NativePromisePrototype, PromisePrototype);
      }
    }
  }

  $({ global: true, wrap: true, forced: FORCED }, {
    Promise: PromiseConstructor
  });

  setToStringTag(PromiseConstructor, PROMISE, false);
  setSpecies(PROMISE);

  PromiseWrapper = getBuiltIn(PROMISE);

  // statics
  $({ target: PROMISE, stat: true, forced: FORCED }, {
    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      call(capability.reject, undefined, r);
      return capability.promise;
    }
  });

  $({ target: PROMISE, stat: true, forced: FORCED }, {
    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    resolve: function resolve(x) {
      return promiseResolve(this, x);
    }
  });

  $({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        var values = [];
        var counter = 0;
        var remaining = 1;
        iterate(iterable, function (promise) {
          var index = counter++;
          var alreadyCalled = false;
          remaining++;
          call($promiseResolve, C, promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.error) reject(result.value);
      return capability.promise;
    },
    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = perform(function () {
        var $promiseResolve = aCallable(C.resolve);
        iterate(iterable, function (promise) {
          call($promiseResolve, C, promise).then(capability.resolve, reject);
        });
      });
      if (result.error) reject(result.value);
      return capability.promise;
    }
  });

  /* MIT https://github.com/fabiospampinato/cash */
  const propMap = {
      /* GENERAL */
      class: 'className',
      contenteditable: 'contentEditable',
      /* LABEL */
      for: 'htmlFor',
      /* INPUT */
      readonly: 'readOnly',
      maxlength: 'maxLength',
      tabindex: 'tabIndex',
      /* TABLE */
      colspan: 'colSpan',
      rowspan: 'rowSpan',
      /* IMAGE */
      usemap: 'useMap'
  };
  function attempt(fn, arg) {
      try {
          return fn(arg);
      }
      catch (_a) {
          return arg;
      }
  }
  const doc = document, win = window, docEle = doc.documentElement, createElement = doc.createElement.bind(doc), div = createElement('div'), table = createElement('table'), tbody = createElement('tbody'), tr = createElement('tr'), { isArray, prototype: ArrayPrototype } = Array, { concat: concat$1, filter, indexOf, map, push, slice, some, splice } = ArrayPrototype;
  const idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/, classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/, htmlRe = /<.+>/, tagRe = /^\w+$/;
  // @require ./variables.ts
  function find(selector, context) {
      const isFragment = isDocumentFragment(context);
      return !selector || (!isFragment && !isDocument(context) && !isElement(context))
          ? []
          : !isFragment && classRe.test(selector)
              ? context.getElementsByClassName(selector.slice(1))
              : !isFragment && tagRe.test(selector)
                  ? context.getElementsByTagName(selector)
                  : context.querySelectorAll(selector);
  }
  // @require ./find.ts
  // @require ./variables.ts
  class Cash {
      constructor(selector, context) {
          if (!selector)
              return;
          if (isCash(selector))
              return selector;
          let eles = selector;
          if (isString(selector)) {
              const ctx = (isCash(context) ? context[0] : context) || doc;
              eles = idRe.test(selector) && 'getElementById' in ctx
                  ? ctx.getElementById(selector.slice(1))
                  : htmlRe.test(selector)
                      ? parseHTML(selector)
                      : find(selector, ctx);
              if (!eles)
                  return;
          }
          else if (isFunction(selector)) {
              return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
          }
          if (eles.nodeType || eles === win)
              eles = [eles];
          this.length = eles.length;
          for (let i = 0, l = this.length; i < l; i++) {
              this[i] = eles[i];
          }
      }
      init(selector, context) {
          return new Cash(selector, context);
      }
  }
  const fn = Cash.prototype, cash = fn.init;
  cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`
  fn.length = 0;
  fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools
  if (typeof Symbol === 'function') { // Ensuring a cash collection is iterable
      fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
  }
  fn.map = function (callback) {
      return cash(concat$1.apply([], map.call(this, (ele, i) => callback.call(ele, i, ele))));
  };
  fn.slice = function (start, end) {
      return cash(slice.call(this, start, end));
  };
  // @require ./cash.ts
  const dashAlphaRe = /-([a-z])/g;
  function camelCase(str) {
      return str.replace(dashAlphaRe, (match, letter) => letter.toUpperCase());
  }
  cash.guid = 1;
  // @require ./cash.ts
  function matches(ele, selector) {
      const matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
      return !!matches && !!selector && matches.call(ele, selector);
  }
  function isCash(x) {
      return x instanceof Cash;
  }
  function isWindow(x) {
      return !!x && x === x.window;
  }
  function isDocument(x) {
      return !!x && x.nodeType === 9;
  }
  function isDocumentFragment(x) {
      return !!x && x.nodeType === 11;
  }
  function isElement(x) {
      return !!x && x.nodeType === 1;
  }
  function isBoolean(x) {
      return typeof x === 'boolean';
  }
  function isFunction(x) {
      return typeof x === 'function';
  }
  function isString(x) {
      return typeof x === 'string';
  }
  function isUndefined(x) {
      return x === undefined;
  }
  function isNull(x) {
      return x === null;
  }
  function isNumeric(x) {
      return !isNaN(parseFloat(x)) && isFinite(x);
  }
  function isPlainObject(x) {
      if (typeof x !== 'object' || x === null)
          return false;
      const proto = Object.getPrototypeOf(x);
      return proto === null || proto === Object.prototype;
  }
  cash.isWindow = isWindow;
  cash.isFunction = isFunction;
  cash.isArray = isArray;
  cash.isNumeric = isNumeric;
  cash.isPlainObject = isPlainObject;
  fn.get = function (index) {
      if (isUndefined(index))
          return slice.call(this);
      index = Number(index);
      return this[index < 0 ? index + this.length : index];
  };
  fn.eq = function (index) {
      return cash(this.get(index));
  };
  fn.first = function () {
      return this.eq(0);
  };
  fn.last = function () {
      return this.eq(-1);
  };
  function each(arr, callback, _reverse) {
      if (_reverse) {
          let i = arr.length;
          while (i--) {
              if (callback.call(arr[i], i, arr[i]) === false)
                  return arr;
          }
      }
      else if (isPlainObject(arr)) {
          const keys = Object.keys(arr);
          for (let i = 0, l = keys.length; i < l; i++) {
              const key = keys[i];
              if (callback.call(arr[key], key, arr[key]) === false)
                  return arr;
          }
      }
      else {
          for (let i = 0, l = arr.length; i < l; i++) {
              if (callback.call(arr[i], i, arr[i]) === false)
                  return arr;
          }
      }
      return arr;
  }
  cash.each = each;
  fn.each = function (callback) {
      return each(this, callback);
  };
  fn.prop = function (prop, value) {
      if (!prop)
          return;
      if (isString(prop)) {
          prop = propMap[prop] || prop;
          if (arguments.length < 2)
              return this[0] && this[0][prop];
          return this.each((i, ele) => { ele[prop] = value; });
      }
      for (const key in prop) {
          this.prop(key, prop[key]);
      }
      return this;
  };
  fn.removeProp = function (prop) {
      return this.each((i, ele) => { delete ele[propMap[prop] || prop]; });
  };
  function extend(...sources) {
      const deep = isBoolean(sources[0]) ? sources.shift() : false, target = sources.shift(), length = sources.length;
      if (!target)
          return {};
      if (!length)
          return extend(deep, cash, target);
      for (let i = 0; i < length; i++) {
          const source = sources[i];
          for (const key in source) {
              if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
                  if (!target[key] || target[key].constructor !== source[key].constructor)
                      target[key] = new source[key].constructor();
                  extend(deep, target[key], source[key]);
              }
              else {
                  target[key] = source[key];
              }
          }
      }
      return target;
  }
  cash.extend = extend;
  fn.extend = function (plugins) {
      return extend(fn, plugins);
  };
  // @require ./matches.ts
  // @require ./type_checking.ts
  function getCompareFunction(comparator) {
      return isString(comparator)
          ? (i, ele) => matches(ele, comparator)
          : isFunction(comparator)
              ? comparator
              : isCash(comparator)
                  ? (i, ele) => comparator.is(ele)
                  : !comparator
                      ? () => false
                      : (i, ele) => ele === comparator;
  }
  fn.filter = function (comparator) {
      const compare = getCompareFunction(comparator);
      return cash(filter.call(this, (ele, i) => compare.call(ele, i, ele)));
  };
  // @require collection/filter.ts
  function filtered(collection, comparator) {
      return !comparator ? collection : collection.filter(comparator);
  }
  // @require ./type_checking.ts
  const splitValuesRe = /\S+/g;
  function getSplitValues(str) {
      return isString(str) ? str.match(splitValuesRe) || [] : [];
  }
  fn.hasClass = function (cls) {
      return !!cls && some.call(this, (ele) => isElement(ele) && ele.classList.contains(cls));
  };
  fn.removeAttr = function (attr) {
      const attrs = getSplitValues(attr);
      return this.each((i, ele) => {
          if (!isElement(ele))
              return;
          each(attrs, (i, a) => {
              ele.removeAttribute(a);
          });
      });
  };
  function attr(attr, value) {
      if (!attr)
          return;
      if (isString(attr)) {
          if (arguments.length < 2) {
              if (!this[0] || !isElement(this[0]))
                  return;
              const value = this[0].getAttribute(attr);
              return isNull(value) ? undefined : value;
          }
          if (isUndefined(value))
              return this;
          if (isNull(value))
              return this.removeAttr(attr);
          return this.each((i, ele) => {
              if (!isElement(ele))
                  return;
              ele.setAttribute(attr, value);
          });
      }
      for (const key in attr) {
          this.attr(key, attr[key]);
      }
      return this;
  }
  fn.attr = attr;
  fn.toggleClass = function (cls, force) {
      const classes = getSplitValues(cls), isForce = !isUndefined(force);
      return this.each((i, ele) => {
          if (!isElement(ele))
              return;
          each(classes, (i, c) => {
              if (isForce) {
                  force ? ele.classList.add(c) : ele.classList.remove(c);
              }
              else {
                  ele.classList.toggle(c);
              }
          });
      });
  };
  fn.addClass = function (cls) {
      return this.toggleClass(cls, true);
  };
  fn.removeClass = function (cls) {
      if (arguments.length)
          return this.toggleClass(cls, false);
      return this.attr('class', '');
  };
  function pluck(arr, prop, deep, until) {
      const plucked = [], isCallback = isFunction(prop), compare = until && getCompareFunction(until);
      for (let i = 0, l = arr.length; i < l; i++) {
          if (isCallback) {
              const val = prop(arr[i]);
              if (val.length)
                  push.apply(plucked, val);
          }
          else {
              let val = arr[i][prop];
              while (val != null) {
                  if (until && compare(-1, val))
                      break;
                  plucked.push(val);
                  val = deep ? val[prop] : null;
              }
          }
      }
      return plucked;
  }
  function unique(arr) {
      return arr.length > 1 ? filter.call(arr, (item, index, self) => indexOf.call(self, item) === index) : arr;
  }
  cash.unique = unique;
  fn.add = function (selector, context) {
      return cash(unique(this.get().concat(cash(selector, context).get())));
  };
  // @require core/type_checking.ts
  // @require core/variables.ts
  function computeStyle(ele, prop, isVariable) {
      if (!isElement(ele))
          return;
      const style = win.getComputedStyle(ele, null);
      return isVariable ? style.getPropertyValue(prop) || undefined : style[prop] || ele.style[prop];
  }
  // @require ./compute_style.ts
  function computeStyleInt(ele, prop) {
      return parseInt(computeStyle(ele, prop), 10) || 0;
  }
  const cssVariableRe = /^--/;
  // @require ./variables.ts
  function isCSSVariable(prop) {
      return cssVariableRe.test(prop);
  }
  // @require core/camel_case.ts
  // @require core/cash.ts
  // @require core/each.ts
  // @require core/variables.ts
  // @require ./is_css_variable.ts
  const prefixedProps = {}, { style } = div, vendorsPrefixes = ['webkit', 'moz', 'ms'];
  function getPrefixedProp(prop, isVariable = isCSSVariable(prop)) {
      if (isVariable)
          return prop;
      if (!prefixedProps[prop]) {
          const propCC = camelCase(prop), propUC = `${propCC[0].toUpperCase()}${propCC.slice(1)}`, props = (`${propCC} ${vendorsPrefixes.join(`${propUC} `)}${propUC}`).split(' ');
          each(props, (i, p) => {
              if (p in style) {
                  prefixedProps[prop] = p;
                  return false;
              }
          });
      }
      return prefixedProps[prop];
  }
  // @require core/type_checking.ts
  // @require ./is_css_variable.ts
  const numericProps = {
      animationIterationCount: true,
      columnCount: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      gridArea: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnStart: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowStart: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true
  };
  function getSuffixedValue(prop, value, isVariable = isCSSVariable(prop)) {
      return !isVariable && !numericProps[prop] && isNumeric(value) ? `${value}px` : value;
  }
  function css(prop, value) {
      if (isString(prop)) {
          const isVariable = isCSSVariable(prop);
          prop = getPrefixedProp(prop, isVariable);
          if (arguments.length < 2)
              return this[0] && computeStyle(this[0], prop, isVariable);
          if (!prop)
              return this;
          value = getSuffixedValue(prop, value, isVariable);
          return this.each((i, ele) => {
              if (!isElement(ele))
                  return;
              if (isVariable) {
                  ele.style.setProperty(prop, value);
              }
              else {
                  ele.style[prop] = value;
              }
          });
      }
      for (const key in prop) {
          this.css(key, prop[key]);
      }
      return this;
  }
  fn.css = css;
  // @optional ./css.ts
  // @require core/attempt.ts
  // @require core/camel_case.ts
  const JSONStringRe = /^\s+|\s+$/;
  function getData(ele, key) {
      const value = ele.dataset[key] || ele.dataset[camelCase(key)];
      if (JSONStringRe.test(value))
          return value;
      return attempt(JSON.parse, value);
  }
  // @require core/attempt.ts
  // @require core/camel_case.ts
  function setData(ele, key, value) {
      value = attempt(JSON.stringify, value);
      ele.dataset[camelCase(key)] = value;
  }
  function data(name, value) {
      if (!name) {
          if (!this[0])
              return;
          const datas = {};
          for (const key in this[0].dataset) {
              datas[key] = getData(this[0], key);
          }
          return datas;
      }
      if (isString(name)) {
          if (arguments.length < 2)
              return this[0] && getData(this[0], name);
          if (isUndefined(value))
              return this;
          return this.each((i, ele) => { setData(ele, name, value); });
      }
      for (const key in name) {
          this.data(key, name[key]);
      }
      return this;
  }
  fn.data = data;
  // @optional ./data.ts
  function getDocumentDimension(doc, dimension) {
      const docEle = doc.documentElement;
      return Math.max(doc.body[`scroll${dimension}`], docEle[`scroll${dimension}`], doc.body[`offset${dimension}`], docEle[`offset${dimension}`], docEle[`client${dimension}`]);
  }
  // @require css/helpers/compute_style_int.ts
  function getExtraSpace(ele, xAxis) {
      return computeStyleInt(ele, `border${xAxis ? 'Left' : 'Top'}Width`) + computeStyleInt(ele, `padding${xAxis ? 'Left' : 'Top'}`) + computeStyleInt(ele, `padding${xAxis ? 'Right' : 'Bottom'}`) + computeStyleInt(ele, `border${xAxis ? 'Right' : 'Bottom'}Width`);
  }
  each([true, false], (i, outer) => {
      each(['Width', 'Height'], (i, prop) => {
          const name = `${outer ? 'outer' : 'inner'}${prop}`;
          fn[name] = function (includeMargins) {
              if (!this[0])
                  return;
              if (isWindow(this[0]))
                  return outer ? this[0][`inner${prop}`] : this[0].document.documentElement[`client${prop}`];
              if (isDocument(this[0]))
                  return getDocumentDimension(this[0], prop);
              return this[0][`${outer ? 'offset' : 'client'}${prop}`] + (includeMargins && outer ? computeStyleInt(this[0], `margin${i ? 'Top' : 'Left'}`) + computeStyleInt(this[0], `margin${i ? 'Bottom' : 'Right'}`) : 0);
          };
      });
  });
  each(['Width', 'Height'], (index, prop) => {
      const propLC = prop.toLowerCase();
      fn[propLC] = function (value) {
          if (!this[0])
              return isUndefined(value) ? undefined : this;
          if (!arguments.length) {
              if (isWindow(this[0]))
                  return this[0].document.documentElement[`client${prop}`];
              if (isDocument(this[0]))
                  return getDocumentDimension(this[0], prop);
              return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
          }
          const valueNumber = parseInt(value, 10);
          return this.each((i, ele) => {
              if (!isElement(ele))
                  return;
              const boxSizing = computeStyle(ele, 'boxSizing');
              ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
          });
      };
  });
  // @optional ./inner_outer.ts
  // @optional ./normal.ts
  // @require css/helpers/compute_style.ts
  const defaultDisplay = {};
  function getDefaultDisplay(tagName) {
      if (defaultDisplay[tagName])
          return defaultDisplay[tagName];
      const ele = createElement(tagName);
      doc.body.insertBefore(ele, null);
      const display = computeStyle(ele, 'display');
      doc.body.removeChild(ele);
      return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
  }
  // @require css/helpers/compute_style.ts
  function isHidden(ele) {
      return computeStyle(ele, 'display') === 'none';
  }
  const displayProperty = '___cd';
  fn.toggle = function (force) {
      return this.each((i, ele) => {
          if (!isElement(ele))
              return;
          const show = isUndefined(force) ? isHidden(ele) : force;
          if (show) {
              ele.style.display = ele[displayProperty] || '';
              if (isHidden(ele)) {
                  ele.style.display = getDefaultDisplay(ele.tagName);
              }
          }
          else {
              ele[displayProperty] = computeStyle(ele, 'display');
              ele.style.display = 'none';
          }
      });
  };
  fn.hide = function () {
      return this.toggle(false);
  };
  fn.show = function () {
      return this.toggle(true);
  };
  // @optional ./hide.ts
  // @optional ./show.ts
  // @optional ./toggle.ts
  function hasNamespaces(ns1, ns2) {
      return !ns2 || !some.call(ns2, (ns) => ns1.indexOf(ns) < 0);
  }
  const eventsNamespace = '___ce', eventsNamespacesSeparator = '.', eventsFocus = { focus: 'focusin', blur: 'focusout' }, eventsHover = { mouseenter: 'mouseover', mouseleave: 'mouseout' }, eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
  // @require ./variables.ts
  function getEventNameBubbling(name) {
      return eventsHover[name] || eventsFocus[name] || name;
  }
  // @require ./variables.ts
  function getEventsCache(ele) {
      return ele[eventsNamespace] = (ele[eventsNamespace] || {});
  }
  // @require core/guid.ts
  // @require events/helpers/get_events_cache.ts
  function addEvent(ele, name, namespaces, selector, callback) {
      const eventCache = getEventsCache(ele);
      eventCache[name] = (eventCache[name] || []);
      eventCache[name].push([namespaces, selector, callback]);
      ele.addEventListener(name, callback);
  }
  // @require ./variables.ts
  function parseEventName(eventName) {
      const parts = eventName.split(eventsNamespacesSeparator);
      return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
  }
  // @require ./get_events_cache.ts
  // @require ./has_namespaces.ts
  // @require ./parse_event_name.ts
  function removeEvent(ele, name, namespaces, selector, callback) {
      const cache = getEventsCache(ele);
      if (!name) {
          for (name in cache) {
              removeEvent(ele, name, namespaces, selector, callback);
          }
      }
      else if (cache[name]) {
          cache[name] = cache[name].filter(([ns, sel, cb]) => {
              if ((callback && cb.guid !== callback.guid) || !hasNamespaces(ns, namespaces) || (selector && selector !== sel))
                  return true;
              ele.removeEventListener(name, cb);
          });
      }
  }
  fn.off = function (eventFullName, selector, callback) {
      if (isUndefined(eventFullName)) {
          this.each((i, ele) => {
              if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                  return;
              removeEvent(ele);
          });
      }
      else if (!isString(eventFullName)) {
          for (const key in eventFullName) {
              this.off(key, eventFullName[key]);
          }
      }
      else {
          if (isFunction(selector)) {
              callback = selector;
              selector = '';
          }
          each(getSplitValues(eventFullName), (i, eventFullName) => {
              const [nameOriginal, namespaces] = parseEventName(eventFullName), name = getEventNameBubbling(nameOriginal);
              this.each((i, ele) => {
                  if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                      return;
                  removeEvent(ele, name, namespaces, selector, callback);
              });
          });
      }
      return this;
  };
  function on(eventFullName, selector, data, callback, _one) {
      if (!isString(eventFullName)) {
          for (const key in eventFullName) {
              this.on(key, selector, data, eventFullName[key], _one);
          }
          return this;
      }
      if (!isString(selector)) {
          if (isUndefined(selector) || isNull(selector)) {
              selector = '';
          }
          else if (isUndefined(data)) {
              data = selector;
              selector = '';
          }
          else {
              callback = data;
              data = selector;
              selector = '';
          }
      }
      if (!isFunction(callback)) {
          callback = data;
          data = undefined;
      }
      if (!callback)
          return this;
      each(getSplitValues(eventFullName), (i, eventFullName) => {
          const [nameOriginal, namespaces] = parseEventName(eventFullName), name = getEventNameBubbling(nameOriginal), isEventHover = (nameOriginal in eventsHover), isEventFocus = (nameOriginal in eventsFocus);
          if (!name)
              return;
          this.each((i, ele) => {
              if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                  return;
              const finalCallback = function (event) {
                  if (event.target[`___i${event.type}`])
                      return event.stopImmediatePropagation(); // Ignoring native event in favor of the upcoming custom one
                  if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
                      return;
                  if (!selector && ((isEventFocus && (event.target !== ele || event.___ot === name)) || (isEventHover && event.relatedTarget && ele.contains(event.relatedTarget))))
                      return;
                  let thisArg = ele;
                  if (selector) {
                      let target = event.target;
                      while (!matches(target, selector)) {
                          if (target === ele)
                              return;
                          target = target.parentNode;
                          if (!target)
                              return;
                      }
                      thisArg = target;
                  }
                  Object.defineProperty(event, 'currentTarget', {
                      configurable: true,
                      get() {
                          return thisArg;
                      }
                  });
                  Object.defineProperty(event, 'delegateTarget', {
                      configurable: true,
                      get() {
                          return ele;
                      }
                  });
                  Object.defineProperty(event, 'data', {
                      configurable: true,
                      get() {
                          return data;
                      }
                  });
                  const returnValue = callback.call(thisArg, event, event.___td);
                  if (_one) {
                      removeEvent(ele, name, namespaces, selector, finalCallback);
                  }
                  if (returnValue === false) {
                      event.preventDefault();
                      event.stopPropagation();
                  }
              };
              finalCallback.guid = callback.guid = (callback.guid || cash.guid++);
              addEvent(ele, name, namespaces, selector, finalCallback);
          });
      });
      return this;
  }
  fn.on = on;
  function one(eventFullName, selector, data, callback) {
      return this.on(eventFullName, selector, data, callback, true);
  }
  fn.one = one;
  fn.ready = function (callback) {
      const cb = () => setTimeout(callback, 0, cash);
      if (doc.readyState !== 'loading') {
          cb();
      }
      else {
          doc.addEventListener('DOMContentLoaded', cb);
      }
      return this;
  };
  fn.trigger = function (event, data) {
      if (isString(event)) {
          const [nameOriginal, namespaces] = parseEventName(event), name = getEventNameBubbling(nameOriginal);
          if (!name)
              return this;
          const type = eventsMouseRe.test(name) ? 'MouseEvents' : 'HTMLEvents';
          event = doc.createEvent(type);
          event.initEvent(name, true, true);
          event.namespace = namespaces.join(eventsNamespacesSeparator);
          event.___ot = nameOriginal;
      }
      event.___td = data;
      const isEventFocus = (event.___ot in eventsFocus);
      return this.each((i, ele) => {
          if (isEventFocus && isFunction(ele[event.___ot])) {
              ele[`___i${event.type}`] = true; // Ensuring the native event is ignored
              ele[event.___ot]();
              ele[`___i${event.type}`] = false; // Ensuring the custom event is not ignored
          }
          ele.dispatchEvent(event);
      });
  };
  // @optional ./off.ts
  // @optional ./on.ts
  // @optional ./one.ts
  // @optional ./ready.ts
  // @optional ./trigger.ts
  // @require core/pluck.ts
  // @require core/variables.ts
  function getValue(ele) {
      if (ele.multiple && ele.options)
          return pluck(filter.call(ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled), 'value');
      return ele.value || '';
  }
  const queryEncodeSpaceRe = /%20/g, queryEncodeCRLFRe = /\r?\n/g;
  function queryEncode(prop, value) {
      return `&${encodeURIComponent(prop)}=${encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')).replace(queryEncodeSpaceRe, '+')}`;
  }
  const skippableRe = /file|reset|submit|button|image/i, checkableRe = /radio|checkbox/i;
  fn.serialize = function () {
      let query = '';
      this.each((i, ele) => {
          each(ele.elements || [ele], (i, ele) => {
              if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || (checkableRe.test(ele.type) && !ele.checked))
                  return;
              const value = getValue(ele);
              if (!isUndefined(value)) {
                  const values = isArray(value) ? value : [value];
                  each(values, (i, value) => {
                      query += queryEncode(ele.name, value);
                  });
              }
          });
      });
      return query.slice(1);
  };
  function val(value) {
      if (!arguments.length)
          return this[0] && getValue(this[0]);
      return this.each((i, ele) => {
          const isSelect = ele.multiple && ele.options;
          if (isSelect || checkableRe.test(ele.type)) {
              const eleValue = isArray(value) ? map.call(value, String) : (isNull(value) ? [] : [String(value)]);
              if (isSelect) {
                  each(ele.options, (i, option) => {
                      option.selected = eleValue.indexOf(option.value) >= 0;
                  }, true);
              }
              else {
                  ele.checked = eleValue.indexOf(ele.value) >= 0;
              }
          }
          else {
              ele.value = isUndefined(value) || isNull(value) ? '' : value;
          }
      });
  }
  fn.val = val;
  fn.clone = function () {
      return this.map((i, ele) => ele.cloneNode(true));
  };
  fn.detach = function (comparator) {
      filtered(this, comparator).each((i, ele) => {
          if (ele.parentNode) {
              ele.parentNode.removeChild(ele);
          }
      });
      return this;
  };
  const fragmentRe = /^\s*<(\w+)[^>]*>/, singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
  const containers = {
      '*': div,
      tr: tbody,
      td: tr,
      th: tr,
      thead: table,
      tbody: table,
      tfoot: table
  };
  //TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
  //TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably
  function parseHTML(html) {
      if (!isString(html))
          return [];
      if (singleTagRe.test(html))
          return [createElement(RegExp.$1)];
      const fragment = fragmentRe.test(html) && RegExp.$1, container = containers[fragment] || containers['*'];
      container.innerHTML = html;
      return cash(container.childNodes).detach().get();
  }
  cash.parseHTML = parseHTML;
  fn.empty = function () {
      return this.each((i, ele) => {
          while (ele.firstChild) {
              ele.removeChild(ele.firstChild);
          }
      });
  };
  function html(html) {
      if (!arguments.length)
          return this[0] && this[0].innerHTML;
      if (isUndefined(html))
          return this;
      return this.each((i, ele) => {
          if (!isElement(ele))
              return;
          ele.innerHTML = html;
      });
  }
  fn.html = html;
  fn.remove = function (comparator) {
      filtered(this, comparator).detach().off();
      return this;
  };
  function text(text) {
      if (isUndefined(text))
          return this[0] ? this[0].textContent : '';
      return this.each((i, ele) => {
          if (!isElement(ele))
              return;
          ele.textContent = text;
      });
  }
  fn.text = text;
  fn.unwrap = function () {
      this.parent().each((i, ele) => {
          if (ele.tagName === 'BODY')
              return;
          const $ele = cash(ele);
          $ele.replaceWith($ele.children());
      });
      return this;
  };
  fn.offset = function () {
      const ele = this[0];
      if (!ele)
          return;
      const rect = ele.getBoundingClientRect();
      return {
          top: rect.top + win.pageYOffset,
          left: rect.left + win.pageXOffset
      };
  };
  fn.offsetParent = function () {
      return this.map((i, ele) => {
          let offsetParent = ele.offsetParent;
          while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
              offsetParent = offsetParent.offsetParent;
          }
          return offsetParent || docEle;
      });
  };
  fn.position = function () {
      const ele = this[0];
      if (!ele)
          return;
      const isFixed = (computeStyle(ele, 'position') === 'fixed'), offset = isFixed ? ele.getBoundingClientRect() : this.offset();
      if (!isFixed) {
          const doc = ele.ownerDocument;
          let offsetParent = ele.offsetParent || doc.documentElement;
          while ((offsetParent === doc.body || offsetParent === doc.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
              offsetParent = offsetParent.parentNode;
          }
          if (offsetParent !== ele && isElement(offsetParent)) {
              const parentOffset = cash(offsetParent).offset();
              offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
              offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
          }
      }
      return {
          top: offset.top - computeStyleInt(ele, 'marginTop'),
          left: offset.left - computeStyleInt(ele, 'marginLeft')
      };
  };
  fn.children = function (comparator) {
      return filtered(cash(unique(pluck(this, ele => ele.children))), comparator);
  };
  fn.contents = function () {
      return cash(unique(pluck(this, ele => ele.tagName === 'IFRAME' ? [ele.contentDocument] : (ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes))));
  };
  fn.find = function (selector) {
      return cash(unique(pluck(this, ele => find(selector, ele))));
  };
  // @require core/variables.ts
  // @require collection/filter.ts
  // @require traversal/find.ts
  const HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, scriptTypeRe = /^$|^module$|\/(java|ecma)script/i, scriptAttributes = ['type', 'src', 'nonce', 'noModule'];
  function evalScripts(node, doc) {
      const collection = cash(node);
      collection.filter('script').add(collection.find('script')).each((i, ele) => {
          if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) { // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
              const script = createElement('script');
              script.text = ele.textContent.replace(HTMLCDATARe, '');
              each(scriptAttributes, (i, attr) => {
                  if (ele[attr])
                      script[attr] = ele[attr];
              });
              doc.head.insertBefore(script, null);
              doc.head.removeChild(script);
          }
      });
  }
  // @require ./eval_scripts.ts
  function insertElement(anchor, target, left, inside, evaluate) {
      if (inside) { // prepend/append
          anchor.insertBefore(target, left ? anchor.firstChild : null);
      }
      else { // before/after
          if (anchor.nodeName === 'HTML') {
              anchor.parentNode.replaceChild(target, anchor);
          }
          else {
              anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
          }
      }
      if (evaluate) {
          evalScripts(target, anchor.ownerDocument);
      }
  }
  // @require ./insert_element.ts
  function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
      each(selectors, (si, selector) => {
          each(cash(selector), (ti, target) => {
              each(cash(anchors), (ai, anchor) => {
                  const anchorFinal = inverse ? target : anchor, targetFinal = inverse ? anchor : target, indexFinal = inverse ? ti : ai;
                  insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
              }, reverseLoop3);
          }, reverseLoop2);
      }, reverseLoop1);
      return anchors;
  }
  fn.after = function () {
      return insertSelectors(arguments, this, false, false, false, true, true);
  };
  fn.append = function () {
      return insertSelectors(arguments, this, false, false, true);
  };
  fn.appendTo = function (selector) {
      return insertSelectors(arguments, this, true, false, true);
  };
  fn.before = function () {
      return insertSelectors(arguments, this, false, true);
  };
  fn.insertAfter = function (selector) {
      return insertSelectors(arguments, this, true, false, false, false, false, true);
  };
  fn.insertBefore = function (selector) {
      return insertSelectors(arguments, this, true, true);
  };
  fn.prepend = function () {
      return insertSelectors(arguments, this, false, true, true, true, true);
  };
  fn.prependTo = function (selector) {
      return insertSelectors(arguments, this, true, true, true, false, false, true);
  };
  fn.replaceWith = function (selector) {
      return this.before(selector).remove();
  };
  fn.replaceAll = function (selector) {
      cash(selector).replaceWith(this);
      return this;
  };
  fn.wrapAll = function (selector) {
      let structure = cash(selector), wrapper = structure[0];
      while (wrapper.children.length)
          wrapper = wrapper.firstElementChild;
      this.first().before(structure);
      return this.appendTo(wrapper);
  };
  fn.wrap = function (selector) {
      return this.each((i, ele) => {
          const wrapper = cash(selector)[0];
          cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
      });
  };
  fn.wrapInner = function (selector) {
      return this.each((i, ele) => {
          const $ele = cash(ele), contents = $ele.contents();
          contents.length ? contents.wrapAll(selector) : $ele.append(selector);
      });
  };
  fn.has = function (selector) {
      const comparator = isString(selector)
          ? (i, ele) => find(selector, ele).length
          : (i, ele) => ele.contains(selector);
      return this.filter(comparator);
  };
  fn.is = function (comparator) {
      const compare = getCompareFunction(comparator);
      return some.call(this, (ele, i) => compare.call(ele, i, ele));
  };
  fn.next = function (comparator, _all, _until) {
      return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
  };
  fn.nextAll = function (comparator) {
      return this.next(comparator, true);
  };
  fn.nextUntil = function (until, comparator) {
      return this.next(comparator, true, until);
  };
  fn.not = function (comparator) {
      const compare = getCompareFunction(comparator);
      return this.filter((i, ele) => (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele));
  };
  fn.parent = function (comparator) {
      return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
  };
  fn.index = function (selector) {
      const child = selector ? cash(selector)[0] : this[0], collection = selector ? this : cash(child).parent().children();
      return indexOf.call(collection, child);
  };
  fn.closest = function (comparator) {
      const filtered = this.filter(comparator);
      if (filtered.length)
          return filtered;
      const $parent = this.parent();
      if (!$parent.length)
          return filtered;
      return $parent.closest(comparator);
  };
  fn.parents = function (comparator, _until) {
      return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
  };
  fn.parentsUntil = function (until, comparator) {
      return this.parents(comparator, until);
  };
  fn.prev = function (comparator, _all, _until) {
      return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
  };
  fn.prevAll = function (comparator) {
      return this.prev(comparator, true);
  };
  fn.prevUntil = function (until, comparator) {
      return this.prev(comparator, true, until);
  };
  fn.siblings = function (comparator) {
      return filtered(cash(unique(pluck(this, ele => cash(ele).parent().children().not(ele)))), comparator);
  };

  function demoEjs(data) {
  var __t, __p = '';
  __p += '<div class="myplace"><span>1111 </span><button id="' +
  ((__t = ( data.baseclassorid )) == null ? '' : __t) +
  'btn">test</button></div><style type="text/css">.myplace{\n        \n        background-color:  brown;\n    }</style>';
  return __p
  }

  var bn = {exports: {}};

  (function (module) {
  (function (module, exports) {

    // Utils
    function assert (val, msg) {
      if (!val) throw new Error(msg || 'Assertion failed');
    }

    // Could use `inherits` module, but don't want to move from single file
    // architecture yet.
    function inherits (ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }

    // BN

    function BN (number, base, endian) {
      if (BN.isBN(number)) {
        return number;
      }

      this.negative = 0;
      this.words = null;
      this.length = 0;

      // Reduction context
      this.red = null;

      if (number !== null) {
        if (base === 'le' || base === 'be') {
          endian = base;
          base = 10;
        }

        this._init(number || 0, base || 10, endian || 'be');
      }
    }
    if (typeof module === 'object') {
      module.exports = BN;
    } else {
      exports.BN = BN;
    }

    BN.BN = BN;
    BN.wordSize = 26;

    var Buffer;
    try {
      if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
        Buffer = window.Buffer;
      } else {
        Buffer = require('buffer').Buffer;
      }
    } catch (e) {
    }

    BN.isBN = function isBN (num) {
      if (num instanceof BN) {
        return true;
      }

      return num !== null && typeof num === 'object' &&
        num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
    };

    BN.max = function max (left, right) {
      if (left.cmp(right) > 0) return left;
      return right;
    };

    BN.min = function min (left, right) {
      if (left.cmp(right) < 0) return left;
      return right;
    };

    BN.prototype._init = function init (number, base, endian) {
      if (typeof number === 'number') {
        return this._initNumber(number, base, endian);
      }

      if (typeof number === 'object') {
        return this._initArray(number, base, endian);
      }

      if (base === 'hex') {
        base = 16;
      }
      assert(base === (base | 0) && base >= 2 && base <= 36);

      number = number.toString().replace(/\s+/g, '');
      var start = 0;
      if (number[0] === '-') {
        start++;
        this.negative = 1;
      }

      if (start < number.length) {
        if (base === 16) {
          this._parseHex(number, start, endian);
        } else {
          this._parseBase(number, base, start);
          if (endian === 'le') {
            this._initArray(this.toArray(), base, endian);
          }
        }
      }
    };

    BN.prototype._initNumber = function _initNumber (number, base, endian) {
      if (number < 0) {
        this.negative = 1;
        number = -number;
      }
      if (number < 0x4000000) {
        this.words = [ number & 0x3ffffff ];
        this.length = 1;
      } else if (number < 0x10000000000000) {
        this.words = [
          number & 0x3ffffff,
          (number / 0x4000000) & 0x3ffffff
        ];
        this.length = 2;
      } else {
        assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
        this.words = [
          number & 0x3ffffff,
          (number / 0x4000000) & 0x3ffffff,
          1
        ];
        this.length = 3;
      }

      if (endian !== 'le') return;

      // Reverse the bytes
      this._initArray(this.toArray(), base, endian);
    };

    BN.prototype._initArray = function _initArray (number, base, endian) {
      // Perhaps a Uint8Array
      assert(typeof number.length === 'number');
      if (number.length <= 0) {
        this.words = [ 0 ];
        this.length = 1;
        return this;
      }

      this.length = Math.ceil(number.length / 3);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }

      var j, w;
      var off = 0;
      if (endian === 'be') {
        for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
          w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
          this.words[j] |= (w << off) & 0x3ffffff;
          this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      } else if (endian === 'le') {
        for (i = 0, j = 0; i < number.length; i += 3) {
          w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
          this.words[j] |= (w << off) & 0x3ffffff;
          this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
          off += 24;
          if (off >= 26) {
            off -= 26;
            j++;
          }
        }
      }
      return this.strip();
    };

    function parseHex4Bits (string, index) {
      var c = string.charCodeAt(index);
      // 'A' - 'F'
      if (c >= 65 && c <= 70) {
        return c - 55;
      // 'a' - 'f'
      } else if (c >= 97 && c <= 102) {
        return c - 87;
      // '0' - '9'
      } else {
        return (c - 48) & 0xf;
      }
    }

    function parseHexByte (string, lowerBound, index) {
      var r = parseHex4Bits(string, index);
      if (index - 1 >= lowerBound) {
        r |= parseHex4Bits(string, index - 1) << 4;
      }
      return r;
    }

    BN.prototype._parseHex = function _parseHex (number, start, endian) {
      // Create possibly bigger array to ensure that it fits the number
      this.length = Math.ceil((number.length - start) / 6);
      this.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        this.words[i] = 0;
      }

      // 24-bits chunks
      var off = 0;
      var j = 0;

      var w;
      if (endian === 'be') {
        for (i = number.length - 1; i >= start; i -= 2) {
          w = parseHexByte(number, start, i) << off;
          this.words[j] |= w & 0x3ffffff;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      } else {
        var parseLength = number.length - start;
        for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
          w = parseHexByte(number, start, i) << off;
          this.words[j] |= w & 0x3ffffff;
          if (off >= 18) {
            off -= 18;
            j += 1;
            this.words[j] |= w >>> 26;
          } else {
            off += 8;
          }
        }
      }

      this.strip();
    };

    function parseBase (str, start, end, mul) {
      var r = 0;
      var len = Math.min(str.length, end);
      for (var i = start; i < len; i++) {
        var c = str.charCodeAt(i) - 48;

        r *= mul;

        // 'a'
        if (c >= 49) {
          r += c - 49 + 0xa;

        // 'A'
        } else if (c >= 17) {
          r += c - 17 + 0xa;

        // '0' - '9'
        } else {
          r += c;
        }
      }
      return r;
    }

    BN.prototype._parseBase = function _parseBase (number, base, start) {
      // Initialize as zero
      this.words = [ 0 ];
      this.length = 1;

      // Find length of limb in base
      for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
        limbLen++;
      }
      limbLen--;
      limbPow = (limbPow / base) | 0;

      var total = number.length - start;
      var mod = total % limbLen;
      var end = Math.min(total, total - mod) + start;

      var word = 0;
      for (var i = start; i < end; i += limbLen) {
        word = parseBase(number, i, i + limbLen, base);

        this.imuln(limbPow);
        if (this.words[0] + word < 0x4000000) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }

      if (mod !== 0) {
        var pow = 1;
        word = parseBase(number, i, number.length, base);

        for (i = 0; i < mod; i++) {
          pow *= base;
        }

        this.imuln(pow);
        if (this.words[0] + word < 0x4000000) {
          this.words[0] += word;
        } else {
          this._iaddn(word);
        }
      }

      this.strip();
    };

    BN.prototype.copy = function copy (dest) {
      dest.words = new Array(this.length);
      for (var i = 0; i < this.length; i++) {
        dest.words[i] = this.words[i];
      }
      dest.length = this.length;
      dest.negative = this.negative;
      dest.red = this.red;
    };

    BN.prototype.clone = function clone () {
      var r = new BN(null);
      this.copy(r);
      return r;
    };

    BN.prototype._expand = function _expand (size) {
      while (this.length < size) {
        this.words[this.length++] = 0;
      }
      return this;
    };

    // Remove leading `0` from `this`
    BN.prototype.strip = function strip () {
      while (this.length > 1 && this.words[this.length - 1] === 0) {
        this.length--;
      }
      return this._normSign();
    };

    BN.prototype._normSign = function _normSign () {
      // -0 = 0
      if (this.length === 1 && this.words[0] === 0) {
        this.negative = 0;
      }
      return this;
    };

    BN.prototype.inspect = function inspect () {
      return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
    };

    /*

    var zeros = [];
    var groupSizes = [];
    var groupBases = [];

    var s = '';
    var i = -1;
    while (++i < BN.wordSize) {
      zeros[i] = s;
      s += '0';
    }
    groupSizes[0] = 0;
    groupSizes[1] = 0;
    groupBases[0] = 0;
    groupBases[1] = 0;
    var base = 2 - 1;
    while (++base < 36 + 1) {
      var groupSize = 0;
      var groupBase = 1;
      while (groupBase < (1 << BN.wordSize) / base) {
        groupBase *= base;
        groupSize += 1;
      }
      groupSizes[base] = groupSize;
      groupBases[base] = groupBase;
    }

    */

    var zeros = [
      '',
      '0',
      '00',
      '000',
      '0000',
      '00000',
      '000000',
      '0000000',
      '00000000',
      '000000000',
      '0000000000',
      '00000000000',
      '000000000000',
      '0000000000000',
      '00000000000000',
      '000000000000000',
      '0000000000000000',
      '00000000000000000',
      '000000000000000000',
      '0000000000000000000',
      '00000000000000000000',
      '000000000000000000000',
      '0000000000000000000000',
      '00000000000000000000000',
      '000000000000000000000000',
      '0000000000000000000000000'
    ];

    var groupSizes = [
      0, 0,
      25, 16, 12, 11, 10, 9, 8,
      8, 7, 7, 7, 7, 6, 6,
      6, 6, 6, 6, 6, 5, 5,
      5, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5
    ];

    var groupBases = [
      0, 0,
      33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
      43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
      16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
      6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
      24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
    ];

    BN.prototype.toString = function toString (base, padding) {
      base = base || 10;
      padding = padding | 0 || 1;

      var out;
      if (base === 16 || base === 'hex') {
        out = '';
        var off = 0;
        var carry = 0;
        for (var i = 0; i < this.length; i++) {
          var w = this.words[i];
          var word = (((w << off) | carry) & 0xffffff).toString(16);
          carry = (w >>> (24 - off)) & 0xffffff;
          if (carry !== 0 || i !== this.length - 1) {
            out = zeros[6 - word.length] + word + out;
          } else {
            out = word + out;
          }
          off += 2;
          if (off >= 26) {
            off -= 26;
            i--;
          }
        }
        if (carry !== 0) {
          out = carry.toString(16) + out;
        }
        while (out.length % padding !== 0) {
          out = '0' + out;
        }
        if (this.negative !== 0) {
          out = '-' + out;
        }
        return out;
      }

      if (base === (base | 0) && base >= 2 && base <= 36) {
        // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
        var groupSize = groupSizes[base];
        // var groupBase = Math.pow(base, groupSize);
        var groupBase = groupBases[base];
        out = '';
        var c = this.clone();
        c.negative = 0;
        while (!c.isZero()) {
          var r = c.modn(groupBase).toString(base);
          c = c.idivn(groupBase);

          if (!c.isZero()) {
            out = zeros[groupSize - r.length] + r + out;
          } else {
            out = r + out;
          }
        }
        if (this.isZero()) {
          out = '0' + out;
        }
        while (out.length % padding !== 0) {
          out = '0' + out;
        }
        if (this.negative !== 0) {
          out = '-' + out;
        }
        return out;
      }

      assert(false, 'Base should be between 2 and 36');
    };

    BN.prototype.toNumber = function toNumber () {
      var ret = this.words[0];
      if (this.length === 2) {
        ret += this.words[1] * 0x4000000;
      } else if (this.length === 3 && this.words[2] === 0x01) {
        // NOTE: at this stage it is known that the top bit is set
        ret += 0x10000000000000 + (this.words[1] * 0x4000000);
      } else if (this.length > 2) {
        assert(false, 'Number can only safely store up to 53 bits');
      }
      return (this.negative !== 0) ? -ret : ret;
    };

    BN.prototype.toJSON = function toJSON () {
      return this.toString(16);
    };

    BN.prototype.toBuffer = function toBuffer (endian, length) {
      assert(typeof Buffer !== 'undefined');
      return this.toArrayLike(Buffer, endian, length);
    };

    BN.prototype.toArray = function toArray (endian, length) {
      return this.toArrayLike(Array, endian, length);
    };

    BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
      var byteLength = this.byteLength();
      var reqLength = length || Math.max(1, byteLength);
      assert(byteLength <= reqLength, 'byte array longer than desired length');
      assert(reqLength > 0, 'Requested array length <= 0');

      this.strip();
      var littleEndian = endian === 'le';
      var res = new ArrayType(reqLength);

      var b, i;
      var q = this.clone();
      if (!littleEndian) {
        // Assume big-endian
        for (i = 0; i < reqLength - byteLength; i++) {
          res[i] = 0;
        }

        for (i = 0; !q.isZero(); i++) {
          b = q.andln(0xff);
          q.iushrn(8);

          res[reqLength - i - 1] = b;
        }
      } else {
        for (i = 0; !q.isZero(); i++) {
          b = q.andln(0xff);
          q.iushrn(8);

          res[i] = b;
        }

        for (; i < reqLength; i++) {
          res[i] = 0;
        }
      }

      return res;
    };

    if (Math.clz32) {
      BN.prototype._countBits = function _countBits (w) {
        return 32 - Math.clz32(w);
      };
    } else {
      BN.prototype._countBits = function _countBits (w) {
        var t = w;
        var r = 0;
        if (t >= 0x1000) {
          r += 13;
          t >>>= 13;
        }
        if (t >= 0x40) {
          r += 7;
          t >>>= 7;
        }
        if (t >= 0x8) {
          r += 4;
          t >>>= 4;
        }
        if (t >= 0x02) {
          r += 2;
          t >>>= 2;
        }
        return r + t;
      };
    }

    BN.prototype._zeroBits = function _zeroBits (w) {
      // Short-cut
      if (w === 0) return 26;

      var t = w;
      var r = 0;
      if ((t & 0x1fff) === 0) {
        r += 13;
        t >>>= 13;
      }
      if ((t & 0x7f) === 0) {
        r += 7;
        t >>>= 7;
      }
      if ((t & 0xf) === 0) {
        r += 4;
        t >>>= 4;
      }
      if ((t & 0x3) === 0) {
        r += 2;
        t >>>= 2;
      }
      if ((t & 0x1) === 0) {
        r++;
      }
      return r;
    };

    // Return number of used bits in a BN
    BN.prototype.bitLength = function bitLength () {
      var w = this.words[this.length - 1];
      var hi = this._countBits(w);
      return (this.length - 1) * 26 + hi;
    };

    function toBitArray (num) {
      var w = new Array(num.bitLength());

      for (var bit = 0; bit < w.length; bit++) {
        var off = (bit / 26) | 0;
        var wbit = bit % 26;

        w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
      }

      return w;
    }

    // Number of trailing zero bits
    BN.prototype.zeroBits = function zeroBits () {
      if (this.isZero()) return 0;

      var r = 0;
      for (var i = 0; i < this.length; i++) {
        var b = this._zeroBits(this.words[i]);
        r += b;
        if (b !== 26) break;
      }
      return r;
    };

    BN.prototype.byteLength = function byteLength () {
      return Math.ceil(this.bitLength() / 8);
    };

    BN.prototype.toTwos = function toTwos (width) {
      if (this.negative !== 0) {
        return this.abs().inotn(width).iaddn(1);
      }
      return this.clone();
    };

    BN.prototype.fromTwos = function fromTwos (width) {
      if (this.testn(width - 1)) {
        return this.notn(width).iaddn(1).ineg();
      }
      return this.clone();
    };

    BN.prototype.isNeg = function isNeg () {
      return this.negative !== 0;
    };

    // Return negative clone of `this`
    BN.prototype.neg = function neg () {
      return this.clone().ineg();
    };

    BN.prototype.ineg = function ineg () {
      if (!this.isZero()) {
        this.negative ^= 1;
      }

      return this;
    };

    // Or `num` with `this` in-place
    BN.prototype.iuor = function iuor (num) {
      while (this.length < num.length) {
        this.words[this.length++] = 0;
      }

      for (var i = 0; i < num.length; i++) {
        this.words[i] = this.words[i] | num.words[i];
      }

      return this.strip();
    };

    BN.prototype.ior = function ior (num) {
      assert((this.negative | num.negative) === 0);
      return this.iuor(num);
    };

    // Or `num` with `this`
    BN.prototype.or = function or (num) {
      if (this.length > num.length) return this.clone().ior(num);
      return num.clone().ior(this);
    };

    BN.prototype.uor = function uor (num) {
      if (this.length > num.length) return this.clone().iuor(num);
      return num.clone().iuor(this);
    };

    // And `num` with `this` in-place
    BN.prototype.iuand = function iuand (num) {
      // b = min-length(num, this)
      var b;
      if (this.length > num.length) {
        b = num;
      } else {
        b = this;
      }

      for (var i = 0; i < b.length; i++) {
        this.words[i] = this.words[i] & num.words[i];
      }

      this.length = b.length;

      return this.strip();
    };

    BN.prototype.iand = function iand (num) {
      assert((this.negative | num.negative) === 0);
      return this.iuand(num);
    };

    // And `num` with `this`
    BN.prototype.and = function and (num) {
      if (this.length > num.length) return this.clone().iand(num);
      return num.clone().iand(this);
    };

    BN.prototype.uand = function uand (num) {
      if (this.length > num.length) return this.clone().iuand(num);
      return num.clone().iuand(this);
    };

    // Xor `num` with `this` in-place
    BN.prototype.iuxor = function iuxor (num) {
      // a.length > b.length
      var a;
      var b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }

      for (var i = 0; i < b.length; i++) {
        this.words[i] = a.words[i] ^ b.words[i];
      }

      if (this !== a) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }

      this.length = a.length;

      return this.strip();
    };

    BN.prototype.ixor = function ixor (num) {
      assert((this.negative | num.negative) === 0);
      return this.iuxor(num);
    };

    // Xor `num` with `this`
    BN.prototype.xor = function xor (num) {
      if (this.length > num.length) return this.clone().ixor(num);
      return num.clone().ixor(this);
    };

    BN.prototype.uxor = function uxor (num) {
      if (this.length > num.length) return this.clone().iuxor(num);
      return num.clone().iuxor(this);
    };

    // Not ``this`` with ``width`` bitwidth
    BN.prototype.inotn = function inotn (width) {
      assert(typeof width === 'number' && width >= 0);

      var bytesNeeded = Math.ceil(width / 26) | 0;
      var bitsLeft = width % 26;

      // Extend the buffer with leading zeroes
      this._expand(bytesNeeded);

      if (bitsLeft > 0) {
        bytesNeeded--;
      }

      // Handle complete words
      for (var i = 0; i < bytesNeeded; i++) {
        this.words[i] = ~this.words[i] & 0x3ffffff;
      }

      // Handle the residue
      if (bitsLeft > 0) {
        this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
      }

      // And remove leading zeroes
      return this.strip();
    };

    BN.prototype.notn = function notn (width) {
      return this.clone().inotn(width);
    };

    // Set `bit` of `this`
    BN.prototype.setn = function setn (bit, val) {
      assert(typeof bit === 'number' && bit >= 0);

      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      this._expand(off + 1);

      if (val) {
        this.words[off] = this.words[off] | (1 << wbit);
      } else {
        this.words[off] = this.words[off] & ~(1 << wbit);
      }

      return this.strip();
    };

    // Add `num` to `this` in-place
    BN.prototype.iadd = function iadd (num) {
      var r;

      // negative + positive
      if (this.negative !== 0 && num.negative === 0) {
        this.negative = 0;
        r = this.isub(num);
        this.negative ^= 1;
        return this._normSign();

      // positive + negative
      } else if (this.negative === 0 && num.negative !== 0) {
        num.negative = 0;
        r = this.isub(num);
        num.negative = 1;
        return r._normSign();
      }

      // a.length > b.length
      var a, b;
      if (this.length > num.length) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }

      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
        this.words[i] = r & 0x3ffffff;
        carry = r >>> 26;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r = (a.words[i] | 0) + carry;
        this.words[i] = r & 0x3ffffff;
        carry = r >>> 26;
      }

      this.length = a.length;
      if (carry !== 0) {
        this.words[this.length] = carry;
        this.length++;
      // Copy the rest of the words
      } else if (a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }

      return this;
    };

    // Add `num` to `this`
    BN.prototype.add = function add (num) {
      var res;
      if (num.negative !== 0 && this.negative === 0) {
        num.negative = 0;
        res = this.sub(num);
        num.negative ^= 1;
        return res;
      } else if (num.negative === 0 && this.negative !== 0) {
        this.negative = 0;
        res = num.sub(this);
        this.negative = 1;
        return res;
      }

      if (this.length > num.length) return this.clone().iadd(num);

      return num.clone().iadd(this);
    };

    // Subtract `num` from `this` in-place
    BN.prototype.isub = function isub (num) {
      // this - (-num) = this + num
      if (num.negative !== 0) {
        num.negative = 0;
        var r = this.iadd(num);
        num.negative = 1;
        return r._normSign();

      // -this - num = -(this + num)
      } else if (this.negative !== 0) {
        this.negative = 0;
        this.iadd(num);
        this.negative = 1;
        return this._normSign();
      }

      // At this point both numbers are positive
      var cmp = this.cmp(num);

      // Optimization - zeroify
      if (cmp === 0) {
        this.negative = 0;
        this.length = 1;
        this.words[0] = 0;
        return this;
      }

      // a > b
      var a, b;
      if (cmp > 0) {
        a = this;
        b = num;
      } else {
        a = num;
        b = this;
      }

      var carry = 0;
      for (var i = 0; i < b.length; i++) {
        r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
        carry = r >> 26;
        this.words[i] = r & 0x3ffffff;
      }
      for (; carry !== 0 && i < a.length; i++) {
        r = (a.words[i] | 0) + carry;
        carry = r >> 26;
        this.words[i] = r & 0x3ffffff;
      }

      // Copy rest of the words
      if (carry === 0 && i < a.length && a !== this) {
        for (; i < a.length; i++) {
          this.words[i] = a.words[i];
        }
      }

      this.length = Math.max(this.length, i);

      if (a !== this) {
        this.negative = 1;
      }

      return this.strip();
    };

    // Subtract `num` from `this`
    BN.prototype.sub = function sub (num) {
      return this.clone().isub(num);
    };

    function smallMulTo (self, num, out) {
      out.negative = num.negative ^ self.negative;
      var len = (self.length + num.length) | 0;
      out.length = len;
      len = (len - 1) | 0;

      // Peel one iteration (compiler can't do it, because of code complexity)
      var a = self.words[0] | 0;
      var b = num.words[0] | 0;
      var r = a * b;

      var lo = r & 0x3ffffff;
      var carry = (r / 0x4000000) | 0;
      out.words[0] = lo;

      for (var k = 1; k < len; k++) {
        // Sum all words with the same `i + j = k` and accumulate `ncarry`,
        // note that ncarry could be >= 0x3ffffff
        var ncarry = carry >>> 26;
        var rword = carry & 0x3ffffff;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
          var i = (k - j) | 0;
          a = self.words[i] | 0;
          b = num.words[j] | 0;
          r = a * b + rword;
          ncarry += (r / 0x4000000) | 0;
          rword = r & 0x3ffffff;
        }
        out.words[k] = rword | 0;
        carry = ncarry | 0;
      }
      if (carry !== 0) {
        out.words[k] = carry | 0;
      } else {
        out.length--;
      }

      return out.strip();
    }

    // TODO(indutny): it may be reasonable to omit it for users who don't need
    // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
    // multiplication (like elliptic secp256k1).
    var comb10MulTo = function comb10MulTo (self, num, out) {
      var a = self.words;
      var b = num.words;
      var o = out.words;
      var c = 0;
      var lo;
      var mid;
      var hi;
      var a0 = a[0] | 0;
      var al0 = a0 & 0x1fff;
      var ah0 = a0 >>> 13;
      var a1 = a[1] | 0;
      var al1 = a1 & 0x1fff;
      var ah1 = a1 >>> 13;
      var a2 = a[2] | 0;
      var al2 = a2 & 0x1fff;
      var ah2 = a2 >>> 13;
      var a3 = a[3] | 0;
      var al3 = a3 & 0x1fff;
      var ah3 = a3 >>> 13;
      var a4 = a[4] | 0;
      var al4 = a4 & 0x1fff;
      var ah4 = a4 >>> 13;
      var a5 = a[5] | 0;
      var al5 = a5 & 0x1fff;
      var ah5 = a5 >>> 13;
      var a6 = a[6] | 0;
      var al6 = a6 & 0x1fff;
      var ah6 = a6 >>> 13;
      var a7 = a[7] | 0;
      var al7 = a7 & 0x1fff;
      var ah7 = a7 >>> 13;
      var a8 = a[8] | 0;
      var al8 = a8 & 0x1fff;
      var ah8 = a8 >>> 13;
      var a9 = a[9] | 0;
      var al9 = a9 & 0x1fff;
      var ah9 = a9 >>> 13;
      var b0 = b[0] | 0;
      var bl0 = b0 & 0x1fff;
      var bh0 = b0 >>> 13;
      var b1 = b[1] | 0;
      var bl1 = b1 & 0x1fff;
      var bh1 = b1 >>> 13;
      var b2 = b[2] | 0;
      var bl2 = b2 & 0x1fff;
      var bh2 = b2 >>> 13;
      var b3 = b[3] | 0;
      var bl3 = b3 & 0x1fff;
      var bh3 = b3 >>> 13;
      var b4 = b[4] | 0;
      var bl4 = b4 & 0x1fff;
      var bh4 = b4 >>> 13;
      var b5 = b[5] | 0;
      var bl5 = b5 & 0x1fff;
      var bh5 = b5 >>> 13;
      var b6 = b[6] | 0;
      var bl6 = b6 & 0x1fff;
      var bh6 = b6 >>> 13;
      var b7 = b[7] | 0;
      var bl7 = b7 & 0x1fff;
      var bh7 = b7 >>> 13;
      var b8 = b[8] | 0;
      var bl8 = b8 & 0x1fff;
      var bh8 = b8 >>> 13;
      var b9 = b[9] | 0;
      var bl9 = b9 & 0x1fff;
      var bh9 = b9 >>> 13;

      out.negative = self.negative ^ num.negative;
      out.length = 19;
      /* k = 0 */
      lo = Math.imul(al0, bl0);
      mid = Math.imul(al0, bh0);
      mid = (mid + Math.imul(ah0, bl0)) | 0;
      hi = Math.imul(ah0, bh0);
      var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
      w0 &= 0x3ffffff;
      /* k = 1 */
      lo = Math.imul(al1, bl0);
      mid = Math.imul(al1, bh0);
      mid = (mid + Math.imul(ah1, bl0)) | 0;
      hi = Math.imul(ah1, bh0);
      lo = (lo + Math.imul(al0, bl1)) | 0;
      mid = (mid + Math.imul(al0, bh1)) | 0;
      mid = (mid + Math.imul(ah0, bl1)) | 0;
      hi = (hi + Math.imul(ah0, bh1)) | 0;
      var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
      w1 &= 0x3ffffff;
      /* k = 2 */
      lo = Math.imul(al2, bl0);
      mid = Math.imul(al2, bh0);
      mid = (mid + Math.imul(ah2, bl0)) | 0;
      hi = Math.imul(ah2, bh0);
      lo = (lo + Math.imul(al1, bl1)) | 0;
      mid = (mid + Math.imul(al1, bh1)) | 0;
      mid = (mid + Math.imul(ah1, bl1)) | 0;
      hi = (hi + Math.imul(ah1, bh1)) | 0;
      lo = (lo + Math.imul(al0, bl2)) | 0;
      mid = (mid + Math.imul(al0, bh2)) | 0;
      mid = (mid + Math.imul(ah0, bl2)) | 0;
      hi = (hi + Math.imul(ah0, bh2)) | 0;
      var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
      w2 &= 0x3ffffff;
      /* k = 3 */
      lo = Math.imul(al3, bl0);
      mid = Math.imul(al3, bh0);
      mid = (mid + Math.imul(ah3, bl0)) | 0;
      hi = Math.imul(ah3, bh0);
      lo = (lo + Math.imul(al2, bl1)) | 0;
      mid = (mid + Math.imul(al2, bh1)) | 0;
      mid = (mid + Math.imul(ah2, bl1)) | 0;
      hi = (hi + Math.imul(ah2, bh1)) | 0;
      lo = (lo + Math.imul(al1, bl2)) | 0;
      mid = (mid + Math.imul(al1, bh2)) | 0;
      mid = (mid + Math.imul(ah1, bl2)) | 0;
      hi = (hi + Math.imul(ah1, bh2)) | 0;
      lo = (lo + Math.imul(al0, bl3)) | 0;
      mid = (mid + Math.imul(al0, bh3)) | 0;
      mid = (mid + Math.imul(ah0, bl3)) | 0;
      hi = (hi + Math.imul(ah0, bh3)) | 0;
      var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
      w3 &= 0x3ffffff;
      /* k = 4 */
      lo = Math.imul(al4, bl0);
      mid = Math.imul(al4, bh0);
      mid = (mid + Math.imul(ah4, bl0)) | 0;
      hi = Math.imul(ah4, bh0);
      lo = (lo + Math.imul(al3, bl1)) | 0;
      mid = (mid + Math.imul(al3, bh1)) | 0;
      mid = (mid + Math.imul(ah3, bl1)) | 0;
      hi = (hi + Math.imul(ah3, bh1)) | 0;
      lo = (lo + Math.imul(al2, bl2)) | 0;
      mid = (mid + Math.imul(al2, bh2)) | 0;
      mid = (mid + Math.imul(ah2, bl2)) | 0;
      hi = (hi + Math.imul(ah2, bh2)) | 0;
      lo = (lo + Math.imul(al1, bl3)) | 0;
      mid = (mid + Math.imul(al1, bh3)) | 0;
      mid = (mid + Math.imul(ah1, bl3)) | 0;
      hi = (hi + Math.imul(ah1, bh3)) | 0;
      lo = (lo + Math.imul(al0, bl4)) | 0;
      mid = (mid + Math.imul(al0, bh4)) | 0;
      mid = (mid + Math.imul(ah0, bl4)) | 0;
      hi = (hi + Math.imul(ah0, bh4)) | 0;
      var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
      w4 &= 0x3ffffff;
      /* k = 5 */
      lo = Math.imul(al5, bl0);
      mid = Math.imul(al5, bh0);
      mid = (mid + Math.imul(ah5, bl0)) | 0;
      hi = Math.imul(ah5, bh0);
      lo = (lo + Math.imul(al4, bl1)) | 0;
      mid = (mid + Math.imul(al4, bh1)) | 0;
      mid = (mid + Math.imul(ah4, bl1)) | 0;
      hi = (hi + Math.imul(ah4, bh1)) | 0;
      lo = (lo + Math.imul(al3, bl2)) | 0;
      mid = (mid + Math.imul(al3, bh2)) | 0;
      mid = (mid + Math.imul(ah3, bl2)) | 0;
      hi = (hi + Math.imul(ah3, bh2)) | 0;
      lo = (lo + Math.imul(al2, bl3)) | 0;
      mid = (mid + Math.imul(al2, bh3)) | 0;
      mid = (mid + Math.imul(ah2, bl3)) | 0;
      hi = (hi + Math.imul(ah2, bh3)) | 0;
      lo = (lo + Math.imul(al1, bl4)) | 0;
      mid = (mid + Math.imul(al1, bh4)) | 0;
      mid = (mid + Math.imul(ah1, bl4)) | 0;
      hi = (hi + Math.imul(ah1, bh4)) | 0;
      lo = (lo + Math.imul(al0, bl5)) | 0;
      mid = (mid + Math.imul(al0, bh5)) | 0;
      mid = (mid + Math.imul(ah0, bl5)) | 0;
      hi = (hi + Math.imul(ah0, bh5)) | 0;
      var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
      w5 &= 0x3ffffff;
      /* k = 6 */
      lo = Math.imul(al6, bl0);
      mid = Math.imul(al6, bh0);
      mid = (mid + Math.imul(ah6, bl0)) | 0;
      hi = Math.imul(ah6, bh0);
      lo = (lo + Math.imul(al5, bl1)) | 0;
      mid = (mid + Math.imul(al5, bh1)) | 0;
      mid = (mid + Math.imul(ah5, bl1)) | 0;
      hi = (hi + Math.imul(ah5, bh1)) | 0;
      lo = (lo + Math.imul(al4, bl2)) | 0;
      mid = (mid + Math.imul(al4, bh2)) | 0;
      mid = (mid + Math.imul(ah4, bl2)) | 0;
      hi = (hi + Math.imul(ah4, bh2)) | 0;
      lo = (lo + Math.imul(al3, bl3)) | 0;
      mid = (mid + Math.imul(al3, bh3)) | 0;
      mid = (mid + Math.imul(ah3, bl3)) | 0;
      hi = (hi + Math.imul(ah3, bh3)) | 0;
      lo = (lo + Math.imul(al2, bl4)) | 0;
      mid = (mid + Math.imul(al2, bh4)) | 0;
      mid = (mid + Math.imul(ah2, bl4)) | 0;
      hi = (hi + Math.imul(ah2, bh4)) | 0;
      lo = (lo + Math.imul(al1, bl5)) | 0;
      mid = (mid + Math.imul(al1, bh5)) | 0;
      mid = (mid + Math.imul(ah1, bl5)) | 0;
      hi = (hi + Math.imul(ah1, bh5)) | 0;
      lo = (lo + Math.imul(al0, bl6)) | 0;
      mid = (mid + Math.imul(al0, bh6)) | 0;
      mid = (mid + Math.imul(ah0, bl6)) | 0;
      hi = (hi + Math.imul(ah0, bh6)) | 0;
      var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
      w6 &= 0x3ffffff;
      /* k = 7 */
      lo = Math.imul(al7, bl0);
      mid = Math.imul(al7, bh0);
      mid = (mid + Math.imul(ah7, bl0)) | 0;
      hi = Math.imul(ah7, bh0);
      lo = (lo + Math.imul(al6, bl1)) | 0;
      mid = (mid + Math.imul(al6, bh1)) | 0;
      mid = (mid + Math.imul(ah6, bl1)) | 0;
      hi = (hi + Math.imul(ah6, bh1)) | 0;
      lo = (lo + Math.imul(al5, bl2)) | 0;
      mid = (mid + Math.imul(al5, bh2)) | 0;
      mid = (mid + Math.imul(ah5, bl2)) | 0;
      hi = (hi + Math.imul(ah5, bh2)) | 0;
      lo = (lo + Math.imul(al4, bl3)) | 0;
      mid = (mid + Math.imul(al4, bh3)) | 0;
      mid = (mid + Math.imul(ah4, bl3)) | 0;
      hi = (hi + Math.imul(ah4, bh3)) | 0;
      lo = (lo + Math.imul(al3, bl4)) | 0;
      mid = (mid + Math.imul(al3, bh4)) | 0;
      mid = (mid + Math.imul(ah3, bl4)) | 0;
      hi = (hi + Math.imul(ah3, bh4)) | 0;
      lo = (lo + Math.imul(al2, bl5)) | 0;
      mid = (mid + Math.imul(al2, bh5)) | 0;
      mid = (mid + Math.imul(ah2, bl5)) | 0;
      hi = (hi + Math.imul(ah2, bh5)) | 0;
      lo = (lo + Math.imul(al1, bl6)) | 0;
      mid = (mid + Math.imul(al1, bh6)) | 0;
      mid = (mid + Math.imul(ah1, bl6)) | 0;
      hi = (hi + Math.imul(ah1, bh6)) | 0;
      lo = (lo + Math.imul(al0, bl7)) | 0;
      mid = (mid + Math.imul(al0, bh7)) | 0;
      mid = (mid + Math.imul(ah0, bl7)) | 0;
      hi = (hi + Math.imul(ah0, bh7)) | 0;
      var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
      w7 &= 0x3ffffff;
      /* k = 8 */
      lo = Math.imul(al8, bl0);
      mid = Math.imul(al8, bh0);
      mid = (mid + Math.imul(ah8, bl0)) | 0;
      hi = Math.imul(ah8, bh0);
      lo = (lo + Math.imul(al7, bl1)) | 0;
      mid = (mid + Math.imul(al7, bh1)) | 0;
      mid = (mid + Math.imul(ah7, bl1)) | 0;
      hi = (hi + Math.imul(ah7, bh1)) | 0;
      lo = (lo + Math.imul(al6, bl2)) | 0;
      mid = (mid + Math.imul(al6, bh2)) | 0;
      mid = (mid + Math.imul(ah6, bl2)) | 0;
      hi = (hi + Math.imul(ah6, bh2)) | 0;
      lo = (lo + Math.imul(al5, bl3)) | 0;
      mid = (mid + Math.imul(al5, bh3)) | 0;
      mid = (mid + Math.imul(ah5, bl3)) | 0;
      hi = (hi + Math.imul(ah5, bh3)) | 0;
      lo = (lo + Math.imul(al4, bl4)) | 0;
      mid = (mid + Math.imul(al4, bh4)) | 0;
      mid = (mid + Math.imul(ah4, bl4)) | 0;
      hi = (hi + Math.imul(ah4, bh4)) | 0;
      lo = (lo + Math.imul(al3, bl5)) | 0;
      mid = (mid + Math.imul(al3, bh5)) | 0;
      mid = (mid + Math.imul(ah3, bl5)) | 0;
      hi = (hi + Math.imul(ah3, bh5)) | 0;
      lo = (lo + Math.imul(al2, bl6)) | 0;
      mid = (mid + Math.imul(al2, bh6)) | 0;
      mid = (mid + Math.imul(ah2, bl6)) | 0;
      hi = (hi + Math.imul(ah2, bh6)) | 0;
      lo = (lo + Math.imul(al1, bl7)) | 0;
      mid = (mid + Math.imul(al1, bh7)) | 0;
      mid = (mid + Math.imul(ah1, bl7)) | 0;
      hi = (hi + Math.imul(ah1, bh7)) | 0;
      lo = (lo + Math.imul(al0, bl8)) | 0;
      mid = (mid + Math.imul(al0, bh8)) | 0;
      mid = (mid + Math.imul(ah0, bl8)) | 0;
      hi = (hi + Math.imul(ah0, bh8)) | 0;
      var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
      w8 &= 0x3ffffff;
      /* k = 9 */
      lo = Math.imul(al9, bl0);
      mid = Math.imul(al9, bh0);
      mid = (mid + Math.imul(ah9, bl0)) | 0;
      hi = Math.imul(ah9, bh0);
      lo = (lo + Math.imul(al8, bl1)) | 0;
      mid = (mid + Math.imul(al8, bh1)) | 0;
      mid = (mid + Math.imul(ah8, bl1)) | 0;
      hi = (hi + Math.imul(ah8, bh1)) | 0;
      lo = (lo + Math.imul(al7, bl2)) | 0;
      mid = (mid + Math.imul(al7, bh2)) | 0;
      mid = (mid + Math.imul(ah7, bl2)) | 0;
      hi = (hi + Math.imul(ah7, bh2)) | 0;
      lo = (lo + Math.imul(al6, bl3)) | 0;
      mid = (mid + Math.imul(al6, bh3)) | 0;
      mid = (mid + Math.imul(ah6, bl3)) | 0;
      hi = (hi + Math.imul(ah6, bh3)) | 0;
      lo = (lo + Math.imul(al5, bl4)) | 0;
      mid = (mid + Math.imul(al5, bh4)) | 0;
      mid = (mid + Math.imul(ah5, bl4)) | 0;
      hi = (hi + Math.imul(ah5, bh4)) | 0;
      lo = (lo + Math.imul(al4, bl5)) | 0;
      mid = (mid + Math.imul(al4, bh5)) | 0;
      mid = (mid + Math.imul(ah4, bl5)) | 0;
      hi = (hi + Math.imul(ah4, bh5)) | 0;
      lo = (lo + Math.imul(al3, bl6)) | 0;
      mid = (mid + Math.imul(al3, bh6)) | 0;
      mid = (mid + Math.imul(ah3, bl6)) | 0;
      hi = (hi + Math.imul(ah3, bh6)) | 0;
      lo = (lo + Math.imul(al2, bl7)) | 0;
      mid = (mid + Math.imul(al2, bh7)) | 0;
      mid = (mid + Math.imul(ah2, bl7)) | 0;
      hi = (hi + Math.imul(ah2, bh7)) | 0;
      lo = (lo + Math.imul(al1, bl8)) | 0;
      mid = (mid + Math.imul(al1, bh8)) | 0;
      mid = (mid + Math.imul(ah1, bl8)) | 0;
      hi = (hi + Math.imul(ah1, bh8)) | 0;
      lo = (lo + Math.imul(al0, bl9)) | 0;
      mid = (mid + Math.imul(al0, bh9)) | 0;
      mid = (mid + Math.imul(ah0, bl9)) | 0;
      hi = (hi + Math.imul(ah0, bh9)) | 0;
      var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
      w9 &= 0x3ffffff;
      /* k = 10 */
      lo = Math.imul(al9, bl1);
      mid = Math.imul(al9, bh1);
      mid = (mid + Math.imul(ah9, bl1)) | 0;
      hi = Math.imul(ah9, bh1);
      lo = (lo + Math.imul(al8, bl2)) | 0;
      mid = (mid + Math.imul(al8, bh2)) | 0;
      mid = (mid + Math.imul(ah8, bl2)) | 0;
      hi = (hi + Math.imul(ah8, bh2)) | 0;
      lo = (lo + Math.imul(al7, bl3)) | 0;
      mid = (mid + Math.imul(al7, bh3)) | 0;
      mid = (mid + Math.imul(ah7, bl3)) | 0;
      hi = (hi + Math.imul(ah7, bh3)) | 0;
      lo = (lo + Math.imul(al6, bl4)) | 0;
      mid = (mid + Math.imul(al6, bh4)) | 0;
      mid = (mid + Math.imul(ah6, bl4)) | 0;
      hi = (hi + Math.imul(ah6, bh4)) | 0;
      lo = (lo + Math.imul(al5, bl5)) | 0;
      mid = (mid + Math.imul(al5, bh5)) | 0;
      mid = (mid + Math.imul(ah5, bl5)) | 0;
      hi = (hi + Math.imul(ah5, bh5)) | 0;
      lo = (lo + Math.imul(al4, bl6)) | 0;
      mid = (mid + Math.imul(al4, bh6)) | 0;
      mid = (mid + Math.imul(ah4, bl6)) | 0;
      hi = (hi + Math.imul(ah4, bh6)) | 0;
      lo = (lo + Math.imul(al3, bl7)) | 0;
      mid = (mid + Math.imul(al3, bh7)) | 0;
      mid = (mid + Math.imul(ah3, bl7)) | 0;
      hi = (hi + Math.imul(ah3, bh7)) | 0;
      lo = (lo + Math.imul(al2, bl8)) | 0;
      mid = (mid + Math.imul(al2, bh8)) | 0;
      mid = (mid + Math.imul(ah2, bl8)) | 0;
      hi = (hi + Math.imul(ah2, bh8)) | 0;
      lo = (lo + Math.imul(al1, bl9)) | 0;
      mid = (mid + Math.imul(al1, bh9)) | 0;
      mid = (mid + Math.imul(ah1, bl9)) | 0;
      hi = (hi + Math.imul(ah1, bh9)) | 0;
      var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
      w10 &= 0x3ffffff;
      /* k = 11 */
      lo = Math.imul(al9, bl2);
      mid = Math.imul(al9, bh2);
      mid = (mid + Math.imul(ah9, bl2)) | 0;
      hi = Math.imul(ah9, bh2);
      lo = (lo + Math.imul(al8, bl3)) | 0;
      mid = (mid + Math.imul(al8, bh3)) | 0;
      mid = (mid + Math.imul(ah8, bl3)) | 0;
      hi = (hi + Math.imul(ah8, bh3)) | 0;
      lo = (lo + Math.imul(al7, bl4)) | 0;
      mid = (mid + Math.imul(al7, bh4)) | 0;
      mid = (mid + Math.imul(ah7, bl4)) | 0;
      hi = (hi + Math.imul(ah7, bh4)) | 0;
      lo = (lo + Math.imul(al6, bl5)) | 0;
      mid = (mid + Math.imul(al6, bh5)) | 0;
      mid = (mid + Math.imul(ah6, bl5)) | 0;
      hi = (hi + Math.imul(ah6, bh5)) | 0;
      lo = (lo + Math.imul(al5, bl6)) | 0;
      mid = (mid + Math.imul(al5, bh6)) | 0;
      mid = (mid + Math.imul(ah5, bl6)) | 0;
      hi = (hi + Math.imul(ah5, bh6)) | 0;
      lo = (lo + Math.imul(al4, bl7)) | 0;
      mid = (mid + Math.imul(al4, bh7)) | 0;
      mid = (mid + Math.imul(ah4, bl7)) | 0;
      hi = (hi + Math.imul(ah4, bh7)) | 0;
      lo = (lo + Math.imul(al3, bl8)) | 0;
      mid = (mid + Math.imul(al3, bh8)) | 0;
      mid = (mid + Math.imul(ah3, bl8)) | 0;
      hi = (hi + Math.imul(ah3, bh8)) | 0;
      lo = (lo + Math.imul(al2, bl9)) | 0;
      mid = (mid + Math.imul(al2, bh9)) | 0;
      mid = (mid + Math.imul(ah2, bl9)) | 0;
      hi = (hi + Math.imul(ah2, bh9)) | 0;
      var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
      w11 &= 0x3ffffff;
      /* k = 12 */
      lo = Math.imul(al9, bl3);
      mid = Math.imul(al9, bh3);
      mid = (mid + Math.imul(ah9, bl3)) | 0;
      hi = Math.imul(ah9, bh3);
      lo = (lo + Math.imul(al8, bl4)) | 0;
      mid = (mid + Math.imul(al8, bh4)) | 0;
      mid = (mid + Math.imul(ah8, bl4)) | 0;
      hi = (hi + Math.imul(ah8, bh4)) | 0;
      lo = (lo + Math.imul(al7, bl5)) | 0;
      mid = (mid + Math.imul(al7, bh5)) | 0;
      mid = (mid + Math.imul(ah7, bl5)) | 0;
      hi = (hi + Math.imul(ah7, bh5)) | 0;
      lo = (lo + Math.imul(al6, bl6)) | 0;
      mid = (mid + Math.imul(al6, bh6)) | 0;
      mid = (mid + Math.imul(ah6, bl6)) | 0;
      hi = (hi + Math.imul(ah6, bh6)) | 0;
      lo = (lo + Math.imul(al5, bl7)) | 0;
      mid = (mid + Math.imul(al5, bh7)) | 0;
      mid = (mid + Math.imul(ah5, bl7)) | 0;
      hi = (hi + Math.imul(ah5, bh7)) | 0;
      lo = (lo + Math.imul(al4, bl8)) | 0;
      mid = (mid + Math.imul(al4, bh8)) | 0;
      mid = (mid + Math.imul(ah4, bl8)) | 0;
      hi = (hi + Math.imul(ah4, bh8)) | 0;
      lo = (lo + Math.imul(al3, bl9)) | 0;
      mid = (mid + Math.imul(al3, bh9)) | 0;
      mid = (mid + Math.imul(ah3, bl9)) | 0;
      hi = (hi + Math.imul(ah3, bh9)) | 0;
      var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
      w12 &= 0x3ffffff;
      /* k = 13 */
      lo = Math.imul(al9, bl4);
      mid = Math.imul(al9, bh4);
      mid = (mid + Math.imul(ah9, bl4)) | 0;
      hi = Math.imul(ah9, bh4);
      lo = (lo + Math.imul(al8, bl5)) | 0;
      mid = (mid + Math.imul(al8, bh5)) | 0;
      mid = (mid + Math.imul(ah8, bl5)) | 0;
      hi = (hi + Math.imul(ah8, bh5)) | 0;
      lo = (lo + Math.imul(al7, bl6)) | 0;
      mid = (mid + Math.imul(al7, bh6)) | 0;
      mid = (mid + Math.imul(ah7, bl6)) | 0;
      hi = (hi + Math.imul(ah7, bh6)) | 0;
      lo = (lo + Math.imul(al6, bl7)) | 0;
      mid = (mid + Math.imul(al6, bh7)) | 0;
      mid = (mid + Math.imul(ah6, bl7)) | 0;
      hi = (hi + Math.imul(ah6, bh7)) | 0;
      lo = (lo + Math.imul(al5, bl8)) | 0;
      mid = (mid + Math.imul(al5, bh8)) | 0;
      mid = (mid + Math.imul(ah5, bl8)) | 0;
      hi = (hi + Math.imul(ah5, bh8)) | 0;
      lo = (lo + Math.imul(al4, bl9)) | 0;
      mid = (mid + Math.imul(al4, bh9)) | 0;
      mid = (mid + Math.imul(ah4, bl9)) | 0;
      hi = (hi + Math.imul(ah4, bh9)) | 0;
      var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
      w13 &= 0x3ffffff;
      /* k = 14 */
      lo = Math.imul(al9, bl5);
      mid = Math.imul(al9, bh5);
      mid = (mid + Math.imul(ah9, bl5)) | 0;
      hi = Math.imul(ah9, bh5);
      lo = (lo + Math.imul(al8, bl6)) | 0;
      mid = (mid + Math.imul(al8, bh6)) | 0;
      mid = (mid + Math.imul(ah8, bl6)) | 0;
      hi = (hi + Math.imul(ah8, bh6)) | 0;
      lo = (lo + Math.imul(al7, bl7)) | 0;
      mid = (mid + Math.imul(al7, bh7)) | 0;
      mid = (mid + Math.imul(ah7, bl7)) | 0;
      hi = (hi + Math.imul(ah7, bh7)) | 0;
      lo = (lo + Math.imul(al6, bl8)) | 0;
      mid = (mid + Math.imul(al6, bh8)) | 0;
      mid = (mid + Math.imul(ah6, bl8)) | 0;
      hi = (hi + Math.imul(ah6, bh8)) | 0;
      lo = (lo + Math.imul(al5, bl9)) | 0;
      mid = (mid + Math.imul(al5, bh9)) | 0;
      mid = (mid + Math.imul(ah5, bl9)) | 0;
      hi = (hi + Math.imul(ah5, bh9)) | 0;
      var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
      w14 &= 0x3ffffff;
      /* k = 15 */
      lo = Math.imul(al9, bl6);
      mid = Math.imul(al9, bh6);
      mid = (mid + Math.imul(ah9, bl6)) | 0;
      hi = Math.imul(ah9, bh6);
      lo = (lo + Math.imul(al8, bl7)) | 0;
      mid = (mid + Math.imul(al8, bh7)) | 0;
      mid = (mid + Math.imul(ah8, bl7)) | 0;
      hi = (hi + Math.imul(ah8, bh7)) | 0;
      lo = (lo + Math.imul(al7, bl8)) | 0;
      mid = (mid + Math.imul(al7, bh8)) | 0;
      mid = (mid + Math.imul(ah7, bl8)) | 0;
      hi = (hi + Math.imul(ah7, bh8)) | 0;
      lo = (lo + Math.imul(al6, bl9)) | 0;
      mid = (mid + Math.imul(al6, bh9)) | 0;
      mid = (mid + Math.imul(ah6, bl9)) | 0;
      hi = (hi + Math.imul(ah6, bh9)) | 0;
      var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
      w15 &= 0x3ffffff;
      /* k = 16 */
      lo = Math.imul(al9, bl7);
      mid = Math.imul(al9, bh7);
      mid = (mid + Math.imul(ah9, bl7)) | 0;
      hi = Math.imul(ah9, bh7);
      lo = (lo + Math.imul(al8, bl8)) | 0;
      mid = (mid + Math.imul(al8, bh8)) | 0;
      mid = (mid + Math.imul(ah8, bl8)) | 0;
      hi = (hi + Math.imul(ah8, bh8)) | 0;
      lo = (lo + Math.imul(al7, bl9)) | 0;
      mid = (mid + Math.imul(al7, bh9)) | 0;
      mid = (mid + Math.imul(ah7, bl9)) | 0;
      hi = (hi + Math.imul(ah7, bh9)) | 0;
      var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
      w16 &= 0x3ffffff;
      /* k = 17 */
      lo = Math.imul(al9, bl8);
      mid = Math.imul(al9, bh8);
      mid = (mid + Math.imul(ah9, bl8)) | 0;
      hi = Math.imul(ah9, bh8);
      lo = (lo + Math.imul(al8, bl9)) | 0;
      mid = (mid + Math.imul(al8, bh9)) | 0;
      mid = (mid + Math.imul(ah8, bl9)) | 0;
      hi = (hi + Math.imul(ah8, bh9)) | 0;
      var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
      w17 &= 0x3ffffff;
      /* k = 18 */
      lo = Math.imul(al9, bl9);
      mid = Math.imul(al9, bh9);
      mid = (mid + Math.imul(ah9, bl9)) | 0;
      hi = Math.imul(ah9, bh9);
      var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
      c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
      w18 &= 0x3ffffff;
      o[0] = w0;
      o[1] = w1;
      o[2] = w2;
      o[3] = w3;
      o[4] = w4;
      o[5] = w5;
      o[6] = w6;
      o[7] = w7;
      o[8] = w8;
      o[9] = w9;
      o[10] = w10;
      o[11] = w11;
      o[12] = w12;
      o[13] = w13;
      o[14] = w14;
      o[15] = w15;
      o[16] = w16;
      o[17] = w17;
      o[18] = w18;
      if (c !== 0) {
        o[19] = c;
        out.length++;
      }
      return out;
    };

    // Polyfill comb
    if (!Math.imul) {
      comb10MulTo = smallMulTo;
    }

    function bigMulTo (self, num, out) {
      out.negative = num.negative ^ self.negative;
      out.length = self.length + num.length;

      var carry = 0;
      var hncarry = 0;
      for (var k = 0; k < out.length - 1; k++) {
        // Sum all words with the same `i + j = k` and accumulate `ncarry`,
        // note that ncarry could be >= 0x3ffffff
        var ncarry = hncarry;
        hncarry = 0;
        var rword = carry & 0x3ffffff;
        var maxJ = Math.min(k, num.length - 1);
        for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
          var i = k - j;
          var a = self.words[i] | 0;
          var b = num.words[j] | 0;
          var r = a * b;

          var lo = r & 0x3ffffff;
          ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
          lo = (lo + rword) | 0;
          rword = lo & 0x3ffffff;
          ncarry = (ncarry + (lo >>> 26)) | 0;

          hncarry += ncarry >>> 26;
          ncarry &= 0x3ffffff;
        }
        out.words[k] = rword;
        carry = ncarry;
        ncarry = hncarry;
      }
      if (carry !== 0) {
        out.words[k] = carry;
      } else {
        out.length--;
      }

      return out.strip();
    }

    function jumboMulTo (self, num, out) {
      var fftm = new FFTM();
      return fftm.mulp(self, num, out);
    }

    BN.prototype.mulTo = function mulTo (num, out) {
      var res;
      var len = this.length + num.length;
      if (this.length === 10 && num.length === 10) {
        res = comb10MulTo(this, num, out);
      } else if (len < 63) {
        res = smallMulTo(this, num, out);
      } else if (len < 1024) {
        res = bigMulTo(this, num, out);
      } else {
        res = jumboMulTo(this, num, out);
      }

      return res;
    };

    // Cooley-Tukey algorithm for FFT
    // slightly revisited to rely on looping instead of recursion

    function FFTM (x, y) {
      this.x = x;
      this.y = y;
    }

    FFTM.prototype.makeRBT = function makeRBT (N) {
      var t = new Array(N);
      var l = BN.prototype._countBits(N) - 1;
      for (var i = 0; i < N; i++) {
        t[i] = this.revBin(i, l, N);
      }

      return t;
    };

    // Returns binary-reversed representation of `x`
    FFTM.prototype.revBin = function revBin (x, l, N) {
      if (x === 0 || x === N - 1) return x;

      var rb = 0;
      for (var i = 0; i < l; i++) {
        rb |= (x & 1) << (l - i - 1);
        x >>= 1;
      }

      return rb;
    };

    // Performs "tweedling" phase, therefore 'emulating'
    // behaviour of the recursive algorithm
    FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
      for (var i = 0; i < N; i++) {
        rtws[i] = rws[rbt[i]];
        itws[i] = iws[rbt[i]];
      }
    };

    FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
      this.permute(rbt, rws, iws, rtws, itws, N);

      for (var s = 1; s < N; s <<= 1) {
        var l = s << 1;

        var rtwdf = Math.cos(2 * Math.PI / l);
        var itwdf = Math.sin(2 * Math.PI / l);

        for (var p = 0; p < N; p += l) {
          var rtwdf_ = rtwdf;
          var itwdf_ = itwdf;

          for (var j = 0; j < s; j++) {
            var re = rtws[p + j];
            var ie = itws[p + j];

            var ro = rtws[p + j + s];
            var io = itws[p + j + s];

            var rx = rtwdf_ * ro - itwdf_ * io;

            io = rtwdf_ * io + itwdf_ * ro;
            ro = rx;

            rtws[p + j] = re + ro;
            itws[p + j] = ie + io;

            rtws[p + j + s] = re - ro;
            itws[p + j + s] = ie - io;

            /* jshint maxdepth : false */
            if (j !== l) {
              rx = rtwdf * rtwdf_ - itwdf * itwdf_;

              itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
              rtwdf_ = rx;
            }
          }
        }
      }
    };

    FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
      var N = Math.max(m, n) | 1;
      var odd = N & 1;
      var i = 0;
      for (N = N / 2 | 0; N; N = N >>> 1) {
        i++;
      }

      return 1 << i + 1 + odd;
    };

    FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
      if (N <= 1) return;

      for (var i = 0; i < N / 2; i++) {
        var t = rws[i];

        rws[i] = rws[N - i - 1];
        rws[N - i - 1] = t;

        t = iws[i];

        iws[i] = -iws[N - i - 1];
        iws[N - i - 1] = -t;
      }
    };

    FFTM.prototype.normalize13b = function normalize13b (ws, N) {
      var carry = 0;
      for (var i = 0; i < N / 2; i++) {
        var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
          Math.round(ws[2 * i] / N) +
          carry;

        ws[i] = w & 0x3ffffff;

        if (w < 0x4000000) {
          carry = 0;
        } else {
          carry = w / 0x4000000 | 0;
        }
      }

      return ws;
    };

    FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
      var carry = 0;
      for (var i = 0; i < len; i++) {
        carry = carry + (ws[i] | 0);

        rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
        rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
      }

      // Pad with zeroes
      for (i = 2 * len; i < N; ++i) {
        rws[i] = 0;
      }

      assert(carry === 0);
      assert((carry & ~0x1fff) === 0);
    };

    FFTM.prototype.stub = function stub (N) {
      var ph = new Array(N);
      for (var i = 0; i < N; i++) {
        ph[i] = 0;
      }

      return ph;
    };

    FFTM.prototype.mulp = function mulp (x, y, out) {
      var N = 2 * this.guessLen13b(x.length, y.length);

      var rbt = this.makeRBT(N);

      var _ = this.stub(N);

      var rws = new Array(N);
      var rwst = new Array(N);
      var iwst = new Array(N);

      var nrws = new Array(N);
      var nrwst = new Array(N);
      var niwst = new Array(N);

      var rmws = out.words;
      rmws.length = N;

      this.convert13b(x.words, x.length, rws, N);
      this.convert13b(y.words, y.length, nrws, N);

      this.transform(rws, _, rwst, iwst, N, rbt);
      this.transform(nrws, _, nrwst, niwst, N, rbt);

      for (var i = 0; i < N; i++) {
        var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
        iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
        rwst[i] = rx;
      }

      this.conjugate(rwst, iwst, N);
      this.transform(rwst, iwst, rmws, _, N, rbt);
      this.conjugate(rmws, _, N);
      this.normalize13b(rmws, N);

      out.negative = x.negative ^ y.negative;
      out.length = x.length + y.length;
      return out.strip();
    };

    // Multiply `this` by `num`
    BN.prototype.mul = function mul (num) {
      var out = new BN(null);
      out.words = new Array(this.length + num.length);
      return this.mulTo(num, out);
    };

    // Multiply employing FFT
    BN.prototype.mulf = function mulf (num) {
      var out = new BN(null);
      out.words = new Array(this.length + num.length);
      return jumboMulTo(this, num, out);
    };

    // In-place Multiplication
    BN.prototype.imul = function imul (num) {
      return this.clone().mulTo(num, this);
    };

    BN.prototype.imuln = function imuln (num) {
      assert(typeof num === 'number');
      assert(num < 0x4000000);

      // Carry
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = (this.words[i] | 0) * num;
        var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
        carry >>= 26;
        carry += (w / 0x4000000) | 0;
        // NOTE: lo is 27bit maximum
        carry += lo >>> 26;
        this.words[i] = lo & 0x3ffffff;
      }

      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }

      return this;
    };

    BN.prototype.muln = function muln (num) {
      return this.clone().imuln(num);
    };

    // `this` * `this`
    BN.prototype.sqr = function sqr () {
      return this.mul(this);
    };

    // `this` * `this` in-place
    BN.prototype.isqr = function isqr () {
      return this.imul(this.clone());
    };

    // Math.pow(`this`, `num`)
    BN.prototype.pow = function pow (num) {
      var w = toBitArray(num);
      if (w.length === 0) return new BN(1);

      // Skip leading zeroes
      var res = this;
      for (var i = 0; i < w.length; i++, res = res.sqr()) {
        if (w[i] !== 0) break;
      }

      if (++i < w.length) {
        for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
          if (w[i] === 0) continue;

          res = res.mul(q);
        }
      }

      return res;
    };

    // Shift-left in-place
    BN.prototype.iushln = function iushln (bits) {
      assert(typeof bits === 'number' && bits >= 0);
      var r = bits % 26;
      var s = (bits - r) / 26;
      var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
      var i;

      if (r !== 0) {
        var carry = 0;

        for (i = 0; i < this.length; i++) {
          var newCarry = this.words[i] & carryMask;
          var c = ((this.words[i] | 0) - newCarry) << r;
          this.words[i] = c | carry;
          carry = newCarry >>> (26 - r);
        }

        if (carry) {
          this.words[i] = carry;
          this.length++;
        }
      }

      if (s !== 0) {
        for (i = this.length - 1; i >= 0; i--) {
          this.words[i + s] = this.words[i];
        }

        for (i = 0; i < s; i++) {
          this.words[i] = 0;
        }

        this.length += s;
      }

      return this.strip();
    };

    BN.prototype.ishln = function ishln (bits) {
      // TODO(indutny): implement me
      assert(this.negative === 0);
      return this.iushln(bits);
    };

    // Shift-right in-place
    // NOTE: `hint` is a lowest bit before trailing zeroes
    // NOTE: if `extended` is present - it will be filled with destroyed bits
    BN.prototype.iushrn = function iushrn (bits, hint, extended) {
      assert(typeof bits === 'number' && bits >= 0);
      var h;
      if (hint) {
        h = (hint - (hint % 26)) / 26;
      } else {
        h = 0;
      }

      var r = bits % 26;
      var s = Math.min((bits - r) / 26, this.length);
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      var maskedWords = extended;

      h -= s;
      h = Math.max(0, h);

      // Extended mode, copy masked part
      if (maskedWords) {
        for (var i = 0; i < s; i++) {
          maskedWords.words[i] = this.words[i];
        }
        maskedWords.length = s;
      }

      if (s === 0) ; else if (this.length > s) {
        this.length -= s;
        for (i = 0; i < this.length; i++) {
          this.words[i] = this.words[i + s];
        }
      } else {
        this.words[0] = 0;
        this.length = 1;
      }

      var carry = 0;
      for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
        var word = this.words[i] | 0;
        this.words[i] = (carry << (26 - r)) | (word >>> r);
        carry = word & mask;
      }

      // Push carried bits as a mask
      if (maskedWords && carry !== 0) {
        maskedWords.words[maskedWords.length++] = carry;
      }

      if (this.length === 0) {
        this.words[0] = 0;
        this.length = 1;
      }

      return this.strip();
    };

    BN.prototype.ishrn = function ishrn (bits, hint, extended) {
      // TODO(indutny): implement me
      assert(this.negative === 0);
      return this.iushrn(bits, hint, extended);
    };

    // Shift-left
    BN.prototype.shln = function shln (bits) {
      return this.clone().ishln(bits);
    };

    BN.prototype.ushln = function ushln (bits) {
      return this.clone().iushln(bits);
    };

    // Shift-right
    BN.prototype.shrn = function shrn (bits) {
      return this.clone().ishrn(bits);
    };

    BN.prototype.ushrn = function ushrn (bits) {
      return this.clone().iushrn(bits);
    };

    // Test if n bit is set
    BN.prototype.testn = function testn (bit) {
      assert(typeof bit === 'number' && bit >= 0);
      var r = bit % 26;
      var s = (bit - r) / 26;
      var q = 1 << r;

      // Fast case: bit is much higher than all existing words
      if (this.length <= s) return false;

      // Check bit and return
      var w = this.words[s];

      return !!(w & q);
    };

    // Return only lowers bits of number (in-place)
    BN.prototype.imaskn = function imaskn (bits) {
      assert(typeof bits === 'number' && bits >= 0);
      var r = bits % 26;
      var s = (bits - r) / 26;

      assert(this.negative === 0, 'imaskn works only with positive numbers');

      if (this.length <= s) {
        return this;
      }

      if (r !== 0) {
        s++;
      }
      this.length = Math.min(s, this.length);

      if (r !== 0) {
        var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
        this.words[this.length - 1] &= mask;
      }

      return this.strip();
    };

    // Return only lowers bits of number
    BN.prototype.maskn = function maskn (bits) {
      return this.clone().imaskn(bits);
    };

    // Add plain number `num` to `this`
    BN.prototype.iaddn = function iaddn (num) {
      assert(typeof num === 'number');
      assert(num < 0x4000000);
      if (num < 0) return this.isubn(-num);

      // Possible sign change
      if (this.negative !== 0) {
        if (this.length === 1 && (this.words[0] | 0) < num) {
          this.words[0] = num - (this.words[0] | 0);
          this.negative = 0;
          return this;
        }

        this.negative = 0;
        this.isubn(num);
        this.negative = 1;
        return this;
      }

      // Add without checks
      return this._iaddn(num);
    };

    BN.prototype._iaddn = function _iaddn (num) {
      this.words[0] += num;

      // Carry
      for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
        this.words[i] -= 0x4000000;
        if (i === this.length - 1) {
          this.words[i + 1] = 1;
        } else {
          this.words[i + 1]++;
        }
      }
      this.length = Math.max(this.length, i + 1);

      return this;
    };

    // Subtract plain number `num` from `this`
    BN.prototype.isubn = function isubn (num) {
      assert(typeof num === 'number');
      assert(num < 0x4000000);
      if (num < 0) return this.iaddn(-num);

      if (this.negative !== 0) {
        this.negative = 0;
        this.iaddn(num);
        this.negative = 1;
        return this;
      }

      this.words[0] -= num;

      if (this.length === 1 && this.words[0] < 0) {
        this.words[0] = -this.words[0];
        this.negative = 1;
      } else {
        // Carry
        for (var i = 0; i < this.length && this.words[i] < 0; i++) {
          this.words[i] += 0x4000000;
          this.words[i + 1] -= 1;
        }
      }

      return this.strip();
    };

    BN.prototype.addn = function addn (num) {
      return this.clone().iaddn(num);
    };

    BN.prototype.subn = function subn (num) {
      return this.clone().isubn(num);
    };

    BN.prototype.iabs = function iabs () {
      this.negative = 0;

      return this;
    };

    BN.prototype.abs = function abs () {
      return this.clone().iabs();
    };

    BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
      var len = num.length + shift;
      var i;

      this._expand(len);

      var w;
      var carry = 0;
      for (i = 0; i < num.length; i++) {
        w = (this.words[i + shift] | 0) + carry;
        var right = (num.words[i] | 0) * mul;
        w -= right & 0x3ffffff;
        carry = (w >> 26) - ((right / 0x4000000) | 0);
        this.words[i + shift] = w & 0x3ffffff;
      }
      for (; i < this.length - shift; i++) {
        w = (this.words[i + shift] | 0) + carry;
        carry = w >> 26;
        this.words[i + shift] = w & 0x3ffffff;
      }

      if (carry === 0) return this.strip();

      // Subtraction overflow
      assert(carry === -1);
      carry = 0;
      for (i = 0; i < this.length; i++) {
        w = -(this.words[i] | 0) + carry;
        carry = w >> 26;
        this.words[i] = w & 0x3ffffff;
      }
      this.negative = 1;

      return this.strip();
    };

    BN.prototype._wordDiv = function _wordDiv (num, mode) {
      var shift = this.length - num.length;

      var a = this.clone();
      var b = num;

      // Normalize
      var bhi = b.words[b.length - 1] | 0;
      var bhiBits = this._countBits(bhi);
      shift = 26 - bhiBits;
      if (shift !== 0) {
        b = b.ushln(shift);
        a.iushln(shift);
        bhi = b.words[b.length - 1] | 0;
      }

      // Initialize quotient
      var m = a.length - b.length;
      var q;

      if (mode !== 'mod') {
        q = new BN(null);
        q.length = m + 1;
        q.words = new Array(q.length);
        for (var i = 0; i < q.length; i++) {
          q.words[i] = 0;
        }
      }

      var diff = a.clone()._ishlnsubmul(b, 1, m);
      if (diff.negative === 0) {
        a = diff;
        if (q) {
          q.words[m] = 1;
        }
      }

      for (var j = m - 1; j >= 0; j--) {
        var qj = (a.words[b.length + j] | 0) * 0x4000000 +
          (a.words[b.length + j - 1] | 0);

        // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
        // (0x7ffffff)
        qj = Math.min((qj / bhi) | 0, 0x3ffffff);

        a._ishlnsubmul(b, qj, j);
        while (a.negative !== 0) {
          qj--;
          a.negative = 0;
          a._ishlnsubmul(b, 1, j);
          if (!a.isZero()) {
            a.negative ^= 1;
          }
        }
        if (q) {
          q.words[j] = qj;
        }
      }
      if (q) {
        q.strip();
      }
      a.strip();

      // Denormalize
      if (mode !== 'div' && shift !== 0) {
        a.iushrn(shift);
      }

      return {
        div: q || null,
        mod: a
      };
    };

    // NOTE: 1) `mode` can be set to `mod` to request mod only,
    //       to `div` to request div only, or be absent to
    //       request both div & mod
    //       2) `positive` is true if unsigned mod is requested
    BN.prototype.divmod = function divmod (num, mode, positive) {
      assert(!num.isZero());

      if (this.isZero()) {
        return {
          div: new BN(0),
          mod: new BN(0)
        };
      }

      var div, mod, res;
      if (this.negative !== 0 && num.negative === 0) {
        res = this.neg().divmod(num, mode);

        if (mode !== 'mod') {
          div = res.div.neg();
        }

        if (mode !== 'div') {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.iadd(num);
          }
        }

        return {
          div: div,
          mod: mod
        };
      }

      if (this.negative === 0 && num.negative !== 0) {
        res = this.divmod(num.neg(), mode);

        if (mode !== 'mod') {
          div = res.div.neg();
        }

        return {
          div: div,
          mod: res.mod
        };
      }

      if ((this.negative & num.negative) !== 0) {
        res = this.neg().divmod(num.neg(), mode);

        if (mode !== 'div') {
          mod = res.mod.neg();
          if (positive && mod.negative !== 0) {
            mod.isub(num);
          }
        }

        return {
          div: res.div,
          mod: mod
        };
      }

      // Both numbers are positive at this point

      // Strip both numbers to approximate shift value
      if (num.length > this.length || this.cmp(num) < 0) {
        return {
          div: new BN(0),
          mod: this
        };
      }

      // Very short reduction
      if (num.length === 1) {
        if (mode === 'div') {
          return {
            div: this.divn(num.words[0]),
            mod: null
          };
        }

        if (mode === 'mod') {
          return {
            div: null,
            mod: new BN(this.modn(num.words[0]))
          };
        }

        return {
          div: this.divn(num.words[0]),
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return this._wordDiv(num, mode);
    };

    // Find `this` / `num`
    BN.prototype.div = function div (num) {
      return this.divmod(num, 'div', false).div;
    };

    // Find `this` % `num`
    BN.prototype.mod = function mod (num) {
      return this.divmod(num, 'mod', false).mod;
    };

    BN.prototype.umod = function umod (num) {
      return this.divmod(num, 'mod', true).mod;
    };

    // Find Round(`this` / `num`)
    BN.prototype.divRound = function divRound (num) {
      var dm = this.divmod(num);

      // Fast case - exact division
      if (dm.mod.isZero()) return dm.div;

      var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

      var half = num.ushrn(1);
      var r2 = num.andln(1);
      var cmp = mod.cmp(half);

      // Round down
      if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

      // Round up
      return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
    };

    BN.prototype.modn = function modn (num) {
      assert(num <= 0x3ffffff);
      var p = (1 << 26) % num;

      var acc = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        acc = (p * acc + (this.words[i] | 0)) % num;
      }

      return acc;
    };

    // In-place division by number
    BN.prototype.idivn = function idivn (num) {
      assert(num <= 0x3ffffff);

      var carry = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var w = (this.words[i] | 0) + carry * 0x4000000;
        this.words[i] = (w / num) | 0;
        carry = w % num;
      }

      return this.strip();
    };

    BN.prototype.divn = function divn (num) {
      return this.clone().idivn(num);
    };

    BN.prototype.egcd = function egcd (p) {
      assert(p.negative === 0);
      assert(!p.isZero());

      var x = this;
      var y = p.clone();

      if (x.negative !== 0) {
        x = x.umod(p);
      } else {
        x = x.clone();
      }

      // A * x + B * y = x
      var A = new BN(1);
      var B = new BN(0);

      // C * x + D * y = y
      var C = new BN(0);
      var D = new BN(1);

      var g = 0;

      while (x.isEven() && y.isEven()) {
        x.iushrn(1);
        y.iushrn(1);
        ++g;
      }

      var yp = y.clone();
      var xp = x.clone();

      while (!x.isZero()) {
        for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
        if (i > 0) {
          x.iushrn(i);
          while (i-- > 0) {
            if (A.isOdd() || B.isOdd()) {
              A.iadd(yp);
              B.isub(xp);
            }

            A.iushrn(1);
            B.iushrn(1);
          }
        }

        for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
        if (j > 0) {
          y.iushrn(j);
          while (j-- > 0) {
            if (C.isOdd() || D.isOdd()) {
              C.iadd(yp);
              D.isub(xp);
            }

            C.iushrn(1);
            D.iushrn(1);
          }
        }

        if (x.cmp(y) >= 0) {
          x.isub(y);
          A.isub(C);
          B.isub(D);
        } else {
          y.isub(x);
          C.isub(A);
          D.isub(B);
        }
      }

      return {
        a: C,
        b: D,
        gcd: y.iushln(g)
      };
    };

    // This is reduced incarnation of the binary EEA
    // above, designated to invert members of the
    // _prime_ fields F(p) at a maximal speed
    BN.prototype._invmp = function _invmp (p) {
      assert(p.negative === 0);
      assert(!p.isZero());

      var a = this;
      var b = p.clone();

      if (a.negative !== 0) {
        a = a.umod(p);
      } else {
        a = a.clone();
      }

      var x1 = new BN(1);
      var x2 = new BN(0);

      var delta = b.clone();

      while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
        for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
        if (i > 0) {
          a.iushrn(i);
          while (i-- > 0) {
            if (x1.isOdd()) {
              x1.iadd(delta);
            }

            x1.iushrn(1);
          }
        }

        for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
        if (j > 0) {
          b.iushrn(j);
          while (j-- > 0) {
            if (x2.isOdd()) {
              x2.iadd(delta);
            }

            x2.iushrn(1);
          }
        }

        if (a.cmp(b) >= 0) {
          a.isub(b);
          x1.isub(x2);
        } else {
          b.isub(a);
          x2.isub(x1);
        }
      }

      var res;
      if (a.cmpn(1) === 0) {
        res = x1;
      } else {
        res = x2;
      }

      if (res.cmpn(0) < 0) {
        res.iadd(p);
      }

      return res;
    };

    BN.prototype.gcd = function gcd (num) {
      if (this.isZero()) return num.abs();
      if (num.isZero()) return this.abs();

      var a = this.clone();
      var b = num.clone();
      a.negative = 0;
      b.negative = 0;

      // Remove common factor of two
      for (var shift = 0; a.isEven() && b.isEven(); shift++) {
        a.iushrn(1);
        b.iushrn(1);
      }

      do {
        while (a.isEven()) {
          a.iushrn(1);
        }
        while (b.isEven()) {
          b.iushrn(1);
        }

        var r = a.cmp(b);
        if (r < 0) {
          // Swap `a` and `b` to make `a` always bigger than `b`
          var t = a;
          a = b;
          b = t;
        } else if (r === 0 || b.cmpn(1) === 0) {
          break;
        }

        a.isub(b);
      } while (true);

      return b.iushln(shift);
    };

    // Invert number in the field F(num)
    BN.prototype.invm = function invm (num) {
      return this.egcd(num).a.umod(num);
    };

    BN.prototype.isEven = function isEven () {
      return (this.words[0] & 1) === 0;
    };

    BN.prototype.isOdd = function isOdd () {
      return (this.words[0] & 1) === 1;
    };

    // And first word and num
    BN.prototype.andln = function andln (num) {
      return this.words[0] & num;
    };

    // Increment at the bit position in-line
    BN.prototype.bincn = function bincn (bit) {
      assert(typeof bit === 'number');
      var r = bit % 26;
      var s = (bit - r) / 26;
      var q = 1 << r;

      // Fast case: bit is much higher than all existing words
      if (this.length <= s) {
        this._expand(s + 1);
        this.words[s] |= q;
        return this;
      }

      // Add bit and propagate, if needed
      var carry = q;
      for (var i = s; carry !== 0 && i < this.length; i++) {
        var w = this.words[i] | 0;
        w += carry;
        carry = w >>> 26;
        w &= 0x3ffffff;
        this.words[i] = w;
      }
      if (carry !== 0) {
        this.words[i] = carry;
        this.length++;
      }
      return this;
    };

    BN.prototype.isZero = function isZero () {
      return this.length === 1 && this.words[0] === 0;
    };

    BN.prototype.cmpn = function cmpn (num) {
      var negative = num < 0;

      if (this.negative !== 0 && !negative) return -1;
      if (this.negative === 0 && negative) return 1;

      this.strip();

      var res;
      if (this.length > 1) {
        res = 1;
      } else {
        if (negative) {
          num = -num;
        }

        assert(num <= 0x3ffffff, 'Number is too big');

        var w = this.words[0] | 0;
        res = w === num ? 0 : w < num ? -1 : 1;
      }
      if (this.negative !== 0) return -res | 0;
      return res;
    };

    // Compare two numbers and return:
    // 1 - if `this` > `num`
    // 0 - if `this` == `num`
    // -1 - if `this` < `num`
    BN.prototype.cmp = function cmp (num) {
      if (this.negative !== 0 && num.negative === 0) return -1;
      if (this.negative === 0 && num.negative !== 0) return 1;

      var res = this.ucmp(num);
      if (this.negative !== 0) return -res | 0;
      return res;
    };

    // Unsigned comparison
    BN.prototype.ucmp = function ucmp (num) {
      // At this point both numbers have the same sign
      if (this.length > num.length) return 1;
      if (this.length < num.length) return -1;

      var res = 0;
      for (var i = this.length - 1; i >= 0; i--) {
        var a = this.words[i] | 0;
        var b = num.words[i] | 0;

        if (a === b) continue;
        if (a < b) {
          res = -1;
        } else if (a > b) {
          res = 1;
        }
        break;
      }
      return res;
    };

    BN.prototype.gtn = function gtn (num) {
      return this.cmpn(num) === 1;
    };

    BN.prototype.gt = function gt (num) {
      return this.cmp(num) === 1;
    };

    BN.prototype.gten = function gten (num) {
      return this.cmpn(num) >= 0;
    };

    BN.prototype.gte = function gte (num) {
      return this.cmp(num) >= 0;
    };

    BN.prototype.ltn = function ltn (num) {
      return this.cmpn(num) === -1;
    };

    BN.prototype.lt = function lt (num) {
      return this.cmp(num) === -1;
    };

    BN.prototype.lten = function lten (num) {
      return this.cmpn(num) <= 0;
    };

    BN.prototype.lte = function lte (num) {
      return this.cmp(num) <= 0;
    };

    BN.prototype.eqn = function eqn (num) {
      return this.cmpn(num) === 0;
    };

    BN.prototype.eq = function eq (num) {
      return this.cmp(num) === 0;
    };

    //
    // A reduce context, could be using montgomery or something better, depending
    // on the `m` itself.
    //
    BN.red = function red (num) {
      return new Red(num);
    };

    BN.prototype.toRed = function toRed (ctx) {
      assert(!this.red, 'Already a number in reduction context');
      assert(this.negative === 0, 'red works only with positives');
      return ctx.convertTo(this)._forceRed(ctx);
    };

    BN.prototype.fromRed = function fromRed () {
      assert(this.red, 'fromRed works only with numbers in reduction context');
      return this.red.convertFrom(this);
    };

    BN.prototype._forceRed = function _forceRed (ctx) {
      this.red = ctx;
      return this;
    };

    BN.prototype.forceRed = function forceRed (ctx) {
      assert(!this.red, 'Already a number in reduction context');
      return this._forceRed(ctx);
    };

    BN.prototype.redAdd = function redAdd (num) {
      assert(this.red, 'redAdd works only with red numbers');
      return this.red.add(this, num);
    };

    BN.prototype.redIAdd = function redIAdd (num) {
      assert(this.red, 'redIAdd works only with red numbers');
      return this.red.iadd(this, num);
    };

    BN.prototype.redSub = function redSub (num) {
      assert(this.red, 'redSub works only with red numbers');
      return this.red.sub(this, num);
    };

    BN.prototype.redISub = function redISub (num) {
      assert(this.red, 'redISub works only with red numbers');
      return this.red.isub(this, num);
    };

    BN.prototype.redShl = function redShl (num) {
      assert(this.red, 'redShl works only with red numbers');
      return this.red.shl(this, num);
    };

    BN.prototype.redMul = function redMul (num) {
      assert(this.red, 'redMul works only with red numbers');
      this.red._verify2(this, num);
      return this.red.mul(this, num);
    };

    BN.prototype.redIMul = function redIMul (num) {
      assert(this.red, 'redMul works only with red numbers');
      this.red._verify2(this, num);
      return this.red.imul(this, num);
    };

    BN.prototype.redSqr = function redSqr () {
      assert(this.red, 'redSqr works only with red numbers');
      this.red._verify1(this);
      return this.red.sqr(this);
    };

    BN.prototype.redISqr = function redISqr () {
      assert(this.red, 'redISqr works only with red numbers');
      this.red._verify1(this);
      return this.red.isqr(this);
    };

    // Square root over p
    BN.prototype.redSqrt = function redSqrt () {
      assert(this.red, 'redSqrt works only with red numbers');
      this.red._verify1(this);
      return this.red.sqrt(this);
    };

    BN.prototype.redInvm = function redInvm () {
      assert(this.red, 'redInvm works only with red numbers');
      this.red._verify1(this);
      return this.red.invm(this);
    };

    // Return negative clone of `this` % `red modulo`
    BN.prototype.redNeg = function redNeg () {
      assert(this.red, 'redNeg works only with red numbers');
      this.red._verify1(this);
      return this.red.neg(this);
    };

    BN.prototype.redPow = function redPow (num) {
      assert(this.red && !num.red, 'redPow(normalNum)');
      this.red._verify1(this);
      return this.red.pow(this, num);
    };

    // Prime numbers with efficient reduction
    var primes = {
      k256: null,
      p224: null,
      p192: null,
      p25519: null
    };

    // Pseudo-Mersenne prime
    function MPrime (name, p) {
      // P = 2 ^ N - K
      this.name = name;
      this.p = new BN(p, 16);
      this.n = this.p.bitLength();
      this.k = new BN(1).iushln(this.n).isub(this.p);

      this.tmp = this._tmp();
    }

    MPrime.prototype._tmp = function _tmp () {
      var tmp = new BN(null);
      tmp.words = new Array(Math.ceil(this.n / 13));
      return tmp;
    };

    MPrime.prototype.ireduce = function ireduce (num) {
      // Assumes that `num` is less than `P^2`
      // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
      var r = num;
      var rlen;

      do {
        this.split(r, this.tmp);
        r = this.imulK(r);
        r = r.iadd(this.tmp);
        rlen = r.bitLength();
      } while (rlen > this.n);

      var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
      if (cmp === 0) {
        r.words[0] = 0;
        r.length = 1;
      } else if (cmp > 0) {
        r.isub(this.p);
      } else {
        if (r.strip !== undefined) {
          // r is BN v4 instance
          r.strip();
        } else {
          // r is BN v5 instance
          r._strip();
        }
      }

      return r;
    };

    MPrime.prototype.split = function split (input, out) {
      input.iushrn(this.n, 0, out);
    };

    MPrime.prototype.imulK = function imulK (num) {
      return num.imul(this.k);
    };

    function K256 () {
      MPrime.call(
        this,
        'k256',
        'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
    }
    inherits(K256, MPrime);

    K256.prototype.split = function split (input, output) {
      // 256 = 9 * 26 + 22
      var mask = 0x3fffff;

      var outLen = Math.min(input.length, 9);
      for (var i = 0; i < outLen; i++) {
        output.words[i] = input.words[i];
      }
      output.length = outLen;

      if (input.length <= 9) {
        input.words[0] = 0;
        input.length = 1;
        return;
      }

      // Shift by 9 limbs
      var prev = input.words[9];
      output.words[output.length++] = prev & mask;

      for (i = 10; i < input.length; i++) {
        var next = input.words[i] | 0;
        input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
        prev = next;
      }
      prev >>>= 22;
      input.words[i - 10] = prev;
      if (prev === 0 && input.length > 10) {
        input.length -= 10;
      } else {
        input.length -= 9;
      }
    };

    K256.prototype.imulK = function imulK (num) {
      // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
      num.words[num.length] = 0;
      num.words[num.length + 1] = 0;
      num.length += 2;

      // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
      var lo = 0;
      for (var i = 0; i < num.length; i++) {
        var w = num.words[i] | 0;
        lo += w * 0x3d1;
        num.words[i] = lo & 0x3ffffff;
        lo = w * 0x40 + ((lo / 0x4000000) | 0);
      }

      // Fast length reduction
      if (num.words[num.length - 1] === 0) {
        num.length--;
        if (num.words[num.length - 1] === 0) {
          num.length--;
        }
      }
      return num;
    };

    function P224 () {
      MPrime.call(
        this,
        'p224',
        'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
    }
    inherits(P224, MPrime);

    function P192 () {
      MPrime.call(
        this,
        'p192',
        'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
    }
    inherits(P192, MPrime);

    function P25519 () {
      // 2 ^ 255 - 19
      MPrime.call(
        this,
        '25519',
        '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
    }
    inherits(P25519, MPrime);

    P25519.prototype.imulK = function imulK (num) {
      // K = 0x13
      var carry = 0;
      for (var i = 0; i < num.length; i++) {
        var hi = (num.words[i] | 0) * 0x13 + carry;
        var lo = hi & 0x3ffffff;
        hi >>>= 26;

        num.words[i] = lo;
        carry = hi;
      }
      if (carry !== 0) {
        num.words[num.length++] = carry;
      }
      return num;
    };

    // Exported mostly for testing purposes, use plain name instead
    BN._prime = function prime (name) {
      // Cached version of prime
      if (primes[name]) return primes[name];

      var prime;
      if (name === 'k256') {
        prime = new K256();
      } else if (name === 'p224') {
        prime = new P224();
      } else if (name === 'p192') {
        prime = new P192();
      } else if (name === 'p25519') {
        prime = new P25519();
      } else {
        throw new Error('Unknown prime ' + name);
      }
      primes[name] = prime;

      return prime;
    };

    //
    // Base reduction engine
    //
    function Red (m) {
      if (typeof m === 'string') {
        var prime = BN._prime(m);
        this.m = prime.p;
        this.prime = prime;
      } else {
        assert(m.gtn(1), 'modulus must be greater than 1');
        this.m = m;
        this.prime = null;
      }
    }

    Red.prototype._verify1 = function _verify1 (a) {
      assert(a.negative === 0, 'red works only with positives');
      assert(a.red, 'red works only with red numbers');
    };

    Red.prototype._verify2 = function _verify2 (a, b) {
      assert((a.negative | b.negative) === 0, 'red works only with positives');
      assert(a.red && a.red === b.red,
        'red works only with red numbers');
    };

    Red.prototype.imod = function imod (a) {
      if (this.prime) return this.prime.ireduce(a)._forceRed(this);
      return a.umod(this.m)._forceRed(this);
    };

    Red.prototype.neg = function neg (a) {
      if (a.isZero()) {
        return a.clone();
      }

      return this.m.sub(a)._forceRed(this);
    };

    Red.prototype.add = function add (a, b) {
      this._verify2(a, b);

      var res = a.add(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res._forceRed(this);
    };

    Red.prototype.iadd = function iadd (a, b) {
      this._verify2(a, b);

      var res = a.iadd(b);
      if (res.cmp(this.m) >= 0) {
        res.isub(this.m);
      }
      return res;
    };

    Red.prototype.sub = function sub (a, b) {
      this._verify2(a, b);

      var res = a.sub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res._forceRed(this);
    };

    Red.prototype.isub = function isub (a, b) {
      this._verify2(a, b);

      var res = a.isub(b);
      if (res.cmpn(0) < 0) {
        res.iadd(this.m);
      }
      return res;
    };

    Red.prototype.shl = function shl (a, num) {
      this._verify1(a);
      return this.imod(a.ushln(num));
    };

    Red.prototype.imul = function imul (a, b) {
      this._verify2(a, b);
      return this.imod(a.imul(b));
    };

    Red.prototype.mul = function mul (a, b) {
      this._verify2(a, b);
      return this.imod(a.mul(b));
    };

    Red.prototype.isqr = function isqr (a) {
      return this.imul(a, a.clone());
    };

    Red.prototype.sqr = function sqr (a) {
      return this.mul(a, a);
    };

    Red.prototype.sqrt = function sqrt (a) {
      if (a.isZero()) return a.clone();

      var mod3 = this.m.andln(3);
      assert(mod3 % 2 === 1);

      // Fast case
      if (mod3 === 3) {
        var pow = this.m.add(new BN(1)).iushrn(2);
        return this.pow(a, pow);
      }

      // Tonelli-Shanks algorithm (Totally unoptimized and slow)
      //
      // Find Q and S, that Q * 2 ^ S = (P - 1)
      var q = this.m.subn(1);
      var s = 0;
      while (!q.isZero() && q.andln(1) === 0) {
        s++;
        q.iushrn(1);
      }
      assert(!q.isZero());

      var one = new BN(1).toRed(this);
      var nOne = one.redNeg();

      // Find quadratic non-residue
      // NOTE: Max is such because of generalized Riemann hypothesis.
      var lpow = this.m.subn(1).iushrn(1);
      var z = this.m.bitLength();
      z = new BN(2 * z * z).toRed(this);

      while (this.pow(z, lpow).cmp(nOne) !== 0) {
        z.redIAdd(nOne);
      }

      var c = this.pow(z, q);
      var r = this.pow(a, q.addn(1).iushrn(1));
      var t = this.pow(a, q);
      var m = s;
      while (t.cmp(one) !== 0) {
        var tmp = t;
        for (var i = 0; tmp.cmp(one) !== 0; i++) {
          tmp = tmp.redSqr();
        }
        assert(i < m);
        var b = this.pow(c, new BN(1).iushln(m - i - 1));

        r = r.redMul(b);
        c = b.redSqr();
        t = t.redMul(c);
        m = i;
      }

      return r;
    };

    Red.prototype.invm = function invm (a) {
      var inv = a._invmp(this.m);
      if (inv.negative !== 0) {
        inv.negative = 0;
        return this.imod(inv).redNeg();
      } else {
        return this.imod(inv);
      }
    };

    Red.prototype.pow = function pow (a, num) {
      if (num.isZero()) return new BN(1).toRed(this);
      if (num.cmpn(1) === 0) return a.clone();

      var windowSize = 4;
      var wnd = new Array(1 << windowSize);
      wnd[0] = new BN(1).toRed(this);
      wnd[1] = a;
      for (var i = 2; i < wnd.length; i++) {
        wnd[i] = this.mul(wnd[i - 1], a);
      }

      var res = wnd[0];
      var current = 0;
      var currentLen = 0;
      var start = num.bitLength() % 26;
      if (start === 0) {
        start = 26;
      }

      for (i = num.length - 1; i >= 0; i--) {
        var word = num.words[i];
        for (var j = start - 1; j >= 0; j--) {
          var bit = (word >> j) & 1;
          if (res !== wnd[0]) {
            res = this.sqr(res);
          }

          if (bit === 0 && current === 0) {
            currentLen = 0;
            continue;
          }

          current <<= 1;
          current |= bit;
          currentLen++;
          if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

          res = this.mul(res, wnd[current]);
          currentLen = 0;
          current = 0;
        }
        start = 26;
      }

      return res;
    };

    Red.prototype.convertTo = function convertTo (num) {
      var r = num.umod(this.m);

      return r === num ? r.clone() : r;
    };

    Red.prototype.convertFrom = function convertFrom (num) {
      var res = num.clone();
      res.red = null;
      return res;
    };

    //
    // Montgomery method engine
    //

    BN.mont = function mont (num) {
      return new Mont(num);
    };

    function Mont (m) {
      Red.call(this, m);

      this.shift = this.m.bitLength();
      if (this.shift % 26 !== 0) {
        this.shift += 26 - (this.shift % 26);
      }

      this.r = new BN(1).iushln(this.shift);
      this.r2 = this.imod(this.r.sqr());
      this.rinv = this.r._invmp(this.m);

      this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
      this.minv = this.minv.umod(this.r);
      this.minv = this.r.sub(this.minv);
    }
    inherits(Mont, Red);

    Mont.prototype.convertTo = function convertTo (num) {
      return this.imod(num.ushln(this.shift));
    };

    Mont.prototype.convertFrom = function convertFrom (num) {
      var r = this.imod(num.mul(this.rinv));
      r.red = null;
      return r;
    };

    Mont.prototype.imul = function imul (a, b) {
      if (a.isZero() || b.isZero()) {
        a.words[0] = 0;
        a.length = 1;
        return a;
      }

      var t = a.imul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;

      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }

      return res._forceRed(this);
    };

    Mont.prototype.mul = function mul (a, b) {
      if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

      var t = a.mul(b);
      var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
      var u = t.isub(c).iushrn(this.shift);
      var res = u;
      if (u.cmp(this.m) >= 0) {
        res = u.isub(this.m);
      } else if (u.cmpn(0) < 0) {
        res = u.iadd(this.m);
      }

      return res._forceRed(this);
    };

    Mont.prototype.invm = function invm (a) {
      // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
      var res = this.imod(a._invmp(this.m).mul(this.r2));
      return res._forceRed(this);
    };
  })(module, commonjsGlobal);
  }(bn));

  var BN$1 = bn.exports;

  const version$f = "logger/5.5.0";

  let _permanentCensorErrors = false;
  let _censorErrors = false;
  const LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
  let _logLevel = LogLevels["default"];
  let _globalLogger = null;
  function _checkNormalize() {
      try {
          const missing = [];
          // Make sure all forms of normalization are supported
          ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
              try {
                  if ("test".normalize(form) !== "test") {
                      throw new Error("bad normalize");
                  }
                  ;
              }
              catch (error) {
                  missing.push(form);
              }
          });
          if (missing.length) {
              throw new Error("missing " + missing.join(", "));
          }
          if (String.fromCharCode(0xe9).normalize("NFD") !== String.fromCharCode(0x65, 0x0301)) {
              throw new Error("broken implementation");
          }
      }
      catch (error) {
          return error.message;
      }
      return null;
  }
  const _normalizeError = _checkNormalize();
  var LogLevel;
  (function (LogLevel) {
      LogLevel["DEBUG"] = "DEBUG";
      LogLevel["INFO"] = "INFO";
      LogLevel["WARNING"] = "WARNING";
      LogLevel["ERROR"] = "ERROR";
      LogLevel["OFF"] = "OFF";
  })(LogLevel || (LogLevel = {}));
  var ErrorCode;
  (function (ErrorCode) {
      ///////////////////
      // Generic Errors
      // Unknown Error
      ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
      // Not Implemented
      ErrorCode["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
      // Unsupported Operation
      //   - operation
      ErrorCode["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
      // Network Error (i.e. Ethereum Network, such as an invalid chain ID)
      //   - event ("noNetwork" is not re-thrown in provider.ready; otherwise thrown)
      ErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
      // Some sort of bad response from the server
      ErrorCode["SERVER_ERROR"] = "SERVER_ERROR";
      // Timeout
      ErrorCode["TIMEOUT"] = "TIMEOUT";
      ///////////////////
      // Operational  Errors
      // Buffer Overrun
      ErrorCode["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
      // Numeric Fault
      //   - operation: the operation being executed
      //   - fault: the reason this faulted
      ErrorCode["NUMERIC_FAULT"] = "NUMERIC_FAULT";
      ///////////////////
      // Argument Errors
      // Missing new operator to an object
      //  - name: The name of the class
      ErrorCode["MISSING_NEW"] = "MISSING_NEW";
      // Invalid argument (e.g. value is incompatible with type) to a function:
      //   - argument: The argument name that was invalid
      //   - value: The value of the argument
      ErrorCode["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
      // Missing argument to a function:
      //   - count: The number of arguments received
      //   - expectedCount: The number of arguments expected
      ErrorCode["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
      // Too many arguments
      //   - count: The number of arguments received
      //   - expectedCount: The number of arguments expected
      ErrorCode["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
      ///////////////////
      // Blockchain Errors
      // Call exception
      //  - transaction: the transaction
      //  - address?: the contract address
      //  - args?: The arguments passed into the function
      //  - method?: The Solidity method signature
      //  - errorSignature?: The EIP848 error signature
      //  - errorArgs?: The EIP848 error parameters
      //  - reason: The reason (only for EIP848 "Error(string)")
      ErrorCode["CALL_EXCEPTION"] = "CALL_EXCEPTION";
      // Insufficient funds (< value + gasLimit * gasPrice)
      //   - transaction: the transaction attempted
      ErrorCode["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
      // Nonce has already been used
      //   - transaction: the transaction attempted
      ErrorCode["NONCE_EXPIRED"] = "NONCE_EXPIRED";
      // The replacement fee for the transaction is too low
      //   - transaction: the transaction attempted
      ErrorCode["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
      // The gas limit could not be estimated
      //   - transaction: the transaction passed to estimateGas
      ErrorCode["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
      // The transaction was replaced by one with a higher gas price
      //   - reason: "cancelled", "replaced" or "repriced"
      //   - cancelled: true if reason == "cancelled" or reason == "replaced")
      //   - hash: original transaction hash
      //   - replacement: the full TransactionsResponse for the replacement
      //   - receipt: the receipt of the replacement
      ErrorCode["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
  })(ErrorCode || (ErrorCode = {}));
  const HEX = "0123456789abcdef";
  class Logger {
      constructor(version) {
          Object.defineProperty(this, "version", {
              enumerable: true,
              value: version,
              writable: false
          });
      }
      _log(logLevel, args) {
          const level = logLevel.toLowerCase();
          if (LogLevels[level] == null) {
              this.throwArgumentError("invalid log level name", "logLevel", logLevel);
          }
          if (_logLevel > LogLevels[level]) {
              return;
          }
          console.log.apply(console, args);
      }
      debug(...args) {
          this._log(Logger.levels.DEBUG, args);
      }
      info(...args) {
          this._log(Logger.levels.INFO, args);
      }
      warn(...args) {
          this._log(Logger.levels.WARNING, args);
      }
      makeError(message, code, params) {
          // Errors are being censored
          if (_censorErrors) {
              return this.makeError("censored error", code, {});
          }
          if (!code) {
              code = Logger.errors.UNKNOWN_ERROR;
          }
          if (!params) {
              params = {};
          }
          const messageDetails = [];
          Object.keys(params).forEach((key) => {
              const value = params[key];
              try {
                  if (value instanceof Uint8Array) {
                      let hex = "";
                      for (let i = 0; i < value.length; i++) {
                          hex += HEX[value[i] >> 4];
                          hex += HEX[value[i] & 0x0f];
                      }
                      messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
                  }
                  else {
                      messageDetails.push(key + "=" + JSON.stringify(value));
                  }
              }
              catch (error) {
                  messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
              }
          });
          messageDetails.push(`code=${code}`);
          messageDetails.push(`version=${this.version}`);
          const reason = message;
          if (messageDetails.length) {
              message += " (" + messageDetails.join(", ") + ")";
          }
          // @TODO: Any??
          const error = new Error(message);
          error.reason = reason;
          error.code = code;
          Object.keys(params).forEach(function (key) {
              error[key] = params[key];
          });
          return error;
      }
      throwError(message, code, params) {
          throw this.makeError(message, code, params);
      }
      throwArgumentError(message, name, value) {
          return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
              argument: name,
              value: value
          });
      }
      assert(condition, message, code, params) {
          if (!!condition) {
              return;
          }
          this.throwError(message, code, params);
      }
      assertArgument(condition, message, name, value) {
          if (!!condition) {
              return;
          }
          this.throwArgumentError(message, name, value);
      }
      checkNormalize(message) {
          if (_normalizeError) {
              this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: "String.prototype.normalize", form: _normalizeError
              });
          }
      }
      checkSafeUint53(value, message) {
          if (typeof (value) !== "number") {
              return;
          }
          if (message == null) {
              message = "value not safe";
          }
          if (value < 0 || value >= 0x1fffffffffffff) {
              this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                  operation: "checkSafeInteger",
                  fault: "out-of-safe-range",
                  value: value
              });
          }
          if (value % 1) {
              this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                  operation: "checkSafeInteger",
                  fault: "non-integer",
                  value: value
              });
          }
      }
      checkArgumentCount(count, expectedCount, message) {
          if (message) {
              message = ": " + message;
          }
          else {
              message = "";
          }
          if (count < expectedCount) {
              this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
                  count: count,
                  expectedCount: expectedCount
              });
          }
          if (count > expectedCount) {
              this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
                  count: count,
                  expectedCount: expectedCount
              });
          }
      }
      checkNew(target, kind) {
          if (target === Object || target == null) {
              this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
          }
      }
      checkAbstract(target, kind) {
          if (target === kind) {
              this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
          }
          else if (target === Object || target == null) {
              this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
          }
      }
      static globalLogger() {
          if (!_globalLogger) {
              _globalLogger = new Logger(version$f);
          }
          return _globalLogger;
      }
      static setCensorship(censorship, permanent) {
          if (!censorship && permanent) {
              this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: "setCensorship"
              });
          }
          if (_permanentCensorErrors) {
              if (!censorship) {
                  return;
              }
              this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: "setCensorship"
              });
          }
          _censorErrors = !!censorship;
          _permanentCensorErrors = !!permanent;
      }
      static setLogLevel(logLevel) {
          const level = LogLevels[logLevel.toLowerCase()];
          if (level == null) {
              Logger.globalLogger().warn("invalid log level - " + logLevel);
              return;
          }
          _logLevel = level;
      }
      static from(version) {
          return new Logger(version);
      }
  }
  Logger.errors = ErrorCode;
  Logger.levels = LogLevel;

  const version$e = "bytes/5.5.0";

  const logger$h = new Logger(version$e);
  ///////////////////////////////
  function isHexable(value) {
      return !!(value.toHexString);
  }
  function addSlice(array) {
      if (array.slice) {
          return array;
      }
      array.slice = function () {
          const args = Array.prototype.slice.call(arguments);
          return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
      };
      return array;
  }
  function isBytesLike(value) {
      return ((isHexString(value) && !(value.length % 2)) || isBytes(value));
  }
  function isInteger(value) {
      return (typeof (value) === "number" && value == value && (value % 1) === 0);
  }
  function isBytes(value) {
      if (value == null) {
          return false;
      }
      if (value.constructor === Uint8Array) {
          return true;
      }
      if (typeof (value) === "string") {
          return false;
      }
      if (!isInteger(value.length) || value.length < 0) {
          return false;
      }
      for (let i = 0; i < value.length; i++) {
          const v = value[i];
          if (!isInteger(v) || v < 0 || v >= 256) {
              return false;
          }
      }
      return true;
  }
  function arrayify(value, options) {
      if (!options) {
          options = {};
      }
      if (typeof (value) === "number") {
          logger$h.checkSafeUint53(value, "invalid arrayify value");
          const result = [];
          while (value) {
              result.unshift(value & 0xff);
              value = parseInt(String(value / 256));
          }
          if (result.length === 0) {
              result.push(0);
          }
          return addSlice(new Uint8Array(result));
      }
      if (options.allowMissingPrefix && typeof (value) === "string" && value.substring(0, 2) !== "0x") {
          value = "0x" + value;
      }
      if (isHexable(value)) {
          value = value.toHexString();
      }
      if (isHexString(value)) {
          let hex = value.substring(2);
          if (hex.length % 2) {
              if (options.hexPad === "left") {
                  hex = "0x0" + hex.substring(2);
              }
              else if (options.hexPad === "right") {
                  hex += "0";
              }
              else {
                  logger$h.throwArgumentError("hex data is odd-length", "value", value);
              }
          }
          const result = [];
          for (let i = 0; i < hex.length; i += 2) {
              result.push(parseInt(hex.substring(i, i + 2), 16));
          }
          return addSlice(new Uint8Array(result));
      }
      if (isBytes(value)) {
          return addSlice(new Uint8Array(value));
      }
      return logger$h.throwArgumentError("invalid arrayify value", "value", value);
  }
  function concat(items) {
      const objects = items.map(item => arrayify(item));
      const length = objects.reduce((accum, item) => (accum + item.length), 0);
      const result = new Uint8Array(length);
      objects.reduce((offset, object) => {
          result.set(object, offset);
          return offset + object.length;
      }, 0);
      return addSlice(result);
  }
  function stripZeros(value) {
      let result = arrayify(value);
      if (result.length === 0) {
          return result;
      }
      // Find the first non-zero entry
      let start = 0;
      while (start < result.length && result[start] === 0) {
          start++;
      }
      // If we started with zeros, strip them
      if (start) {
          result = result.slice(start);
      }
      return result;
  }
  function zeroPad(value, length) {
      value = arrayify(value);
      if (value.length > length) {
          logger$h.throwArgumentError("value out of range", "value", arguments[0]);
      }
      const result = new Uint8Array(length);
      result.set(value, length - value.length);
      return addSlice(result);
  }
  function isHexString(value, length) {
      if (typeof (value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
          return false;
      }
      if (length && value.length !== 2 + 2 * length) {
          return false;
      }
      return true;
  }
  const HexCharacters = "0123456789abcdef";
  function hexlify(value, options) {
      if (!options) {
          options = {};
      }
      if (typeof (value) === "number") {
          logger$h.checkSafeUint53(value, "invalid hexlify value");
          let hex = "";
          while (value) {
              hex = HexCharacters[value & 0xf] + hex;
              value = Math.floor(value / 16);
          }
          if (hex.length) {
              if (hex.length % 2) {
                  hex = "0" + hex;
              }
              return "0x" + hex;
          }
          return "0x00";
      }
      if (typeof (value) === "bigint") {
          value = value.toString(16);
          if (value.length % 2) {
              return ("0x0" + value);
          }
          return "0x" + value;
      }
      if (options.allowMissingPrefix && typeof (value) === "string" && value.substring(0, 2) !== "0x") {
          value = "0x" + value;
      }
      if (isHexable(value)) {
          return value.toHexString();
      }
      if (isHexString(value)) {
          if (value.length % 2) {
              if (options.hexPad === "left") {
                  value = "0x0" + value.substring(2);
              }
              else if (options.hexPad === "right") {
                  value += "0";
              }
              else {
                  logger$h.throwArgumentError("hex data is odd-length", "value", value);
              }
          }
          return value.toLowerCase();
      }
      if (isBytes(value)) {
          let result = "0x";
          for (let i = 0; i < value.length; i++) {
              let v = value[i];
              result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
          }
          return result;
      }
      return logger$h.throwArgumentError("invalid hexlify value", "value", value);
  }
  /*
  function unoddify(value: BytesLike | Hexable | number): BytesLike | Hexable | number {
      if (typeof(value) === "string" && value.length % 2 && value.substring(0, 2) === "0x") {
          return "0x0" + value.substring(2);
      }
      return value;
  }
  */
  function hexDataLength(data) {
      if (typeof (data) !== "string") {
          data = hexlify(data);
      }
      else if (!isHexString(data) || (data.length % 2)) {
          return null;
      }
      return (data.length - 2) / 2;
  }
  function hexDataSlice(data, offset, endOffset) {
      if (typeof (data) !== "string") {
          data = hexlify(data);
      }
      else if (!isHexString(data) || (data.length % 2)) {
          logger$h.throwArgumentError("invalid hexData", "value", data);
      }
      offset = 2 + 2 * offset;
      if (endOffset != null) {
          return "0x" + data.substring(offset, 2 + 2 * endOffset);
      }
      return "0x" + data.substring(offset);
  }
  function hexConcat(items) {
      let result = "0x";
      items.forEach((item) => {
          result += hexlify(item).substring(2);
      });
      return result;
  }
  function hexValue(value) {
      const trimmed = hexStripZeros(hexlify(value, { hexPad: "left" }));
      if (trimmed === "0x") {
          return "0x0";
      }
      return trimmed;
  }
  function hexStripZeros(value) {
      if (typeof (value) !== "string") {
          value = hexlify(value);
      }
      if (!isHexString(value)) {
          logger$h.throwArgumentError("invalid hex string", "value", value);
      }
      value = value.substring(2);
      let offset = 0;
      while (offset < value.length && value[offset] === "0") {
          offset++;
      }
      return "0x" + value.substring(offset);
  }
  function hexZeroPad(value, length) {
      if (typeof (value) !== "string") {
          value = hexlify(value);
      }
      else if (!isHexString(value)) {
          logger$h.throwArgumentError("invalid hex string", "value", value);
      }
      if (value.length > 2 * length + 2) {
          logger$h.throwArgumentError("value out of range", "value", arguments[1]);
      }
      while (value.length < 2 * length + 2) {
          value = "0x0" + value.substring(2);
      }
      return value;
  }
  function splitSignature(signature) {
      const result = {
          r: "0x",
          s: "0x",
          _vs: "0x",
          recoveryParam: 0,
          v: 0
      };
      if (isBytesLike(signature)) {
          const bytes = arrayify(signature);
          if (bytes.length !== 65) {
              logger$h.throwArgumentError("invalid signature string; must be 65 bytes", "signature", signature);
          }
          // Get the r, s and v
          result.r = hexlify(bytes.slice(0, 32));
          result.s = hexlify(bytes.slice(32, 64));
          result.v = bytes[64];
          // Allow a recid to be used as the v
          if (result.v < 27) {
              if (result.v === 0 || result.v === 1) {
                  result.v += 27;
              }
              else {
                  logger$h.throwArgumentError("signature invalid v byte", "signature", signature);
              }
          }
          // Compute recoveryParam from v
          result.recoveryParam = 1 - (result.v % 2);
          // Compute _vs from recoveryParam and s
          if (result.recoveryParam) {
              bytes[32] |= 0x80;
          }
          result._vs = hexlify(bytes.slice(32, 64));
      }
      else {
          result.r = signature.r;
          result.s = signature.s;
          result.v = signature.v;
          result.recoveryParam = signature.recoveryParam;
          result._vs = signature._vs;
          // If the _vs is available, use it to populate missing s, v and recoveryParam
          // and verify non-missing s, v and recoveryParam
          if (result._vs != null) {
              const vs = zeroPad(arrayify(result._vs), 32);
              result._vs = hexlify(vs);
              // Set or check the recid
              const recoveryParam = ((vs[0] >= 128) ? 1 : 0);
              if (result.recoveryParam == null) {
                  result.recoveryParam = recoveryParam;
              }
              else if (result.recoveryParam !== recoveryParam) {
                  logger$h.throwArgumentError("signature recoveryParam mismatch _vs", "signature", signature);
              }
              // Set or check the s
              vs[0] &= 0x7f;
              const s = hexlify(vs);
              if (result.s == null) {
                  result.s = s;
              }
              else if (result.s !== s) {
                  logger$h.throwArgumentError("signature v mismatch _vs", "signature", signature);
              }
          }
          // Use recid and v to populate each other
          if (result.recoveryParam == null) {
              if (result.v == null) {
                  logger$h.throwArgumentError("signature missing v and recoveryParam", "signature", signature);
              }
              else if (result.v === 0 || result.v === 1) {
                  result.recoveryParam = result.v;
              }
              else {
                  result.recoveryParam = 1 - (result.v % 2);
              }
          }
          else {
              if (result.v == null) {
                  result.v = 27 + result.recoveryParam;
              }
              else {
                  const recId = (result.v === 0 || result.v === 1) ? result.v : (1 - (result.v % 2));
                  if (result.recoveryParam !== recId) {
                      logger$h.throwArgumentError("signature recoveryParam mismatch v", "signature", signature);
                  }
              }
          }
          if (result.r == null || !isHexString(result.r)) {
              logger$h.throwArgumentError("signature missing or invalid r", "signature", signature);
          }
          else {
              result.r = hexZeroPad(result.r, 32);
          }
          if (result.s == null || !isHexString(result.s)) {
              logger$h.throwArgumentError("signature missing or invalid s", "signature", signature);
          }
          else {
              result.s = hexZeroPad(result.s, 32);
          }
          const vs = arrayify(result.s);
          if (vs[0] >= 128) {
              logger$h.throwArgumentError("signature s out of range", "signature", signature);
          }
          if (result.recoveryParam) {
              vs[0] |= 0x80;
          }
          const _vs = hexlify(vs);
          if (result._vs) {
              if (!isHexString(result._vs)) {
                  logger$h.throwArgumentError("signature invalid _vs", "signature", signature);
              }
              result._vs = hexZeroPad(result._vs, 32);
          }
          // Set or check the _vs
          if (result._vs == null) {
              result._vs = _vs;
          }
          else if (result._vs !== _vs) {
              logger$h.throwArgumentError("signature _vs mismatch v and s", "signature", signature);
          }
      }
      return result;
  }

  const version$d = "bignumber/5.5.0";

  var BN = BN$1.BN;
  const logger$g = new Logger(version$d);
  const _constructorGuard$1 = {};
  const MAX_SAFE = 0x1fffffffffffff;
  // Only warn about passing 10 into radix once
  let _warnedToStringRadix = false;
  class BigNumber {
      constructor(constructorGuard, hex) {
          logger$g.checkNew(new.target, BigNumber);
          if (constructorGuard !== _constructorGuard$1) {
              logger$g.throwError("cannot call constructor directly; use BigNumber.from", Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: "new (BigNumber)"
              });
          }
          this._hex = hex;
          this._isBigNumber = true;
          Object.freeze(this);
      }
      fromTwos(value) {
          return toBigNumber(toBN(this).fromTwos(value));
      }
      toTwos(value) {
          return toBigNumber(toBN(this).toTwos(value));
      }
      abs() {
          if (this._hex[0] === "-") {
              return BigNumber.from(this._hex.substring(1));
          }
          return this;
      }
      add(other) {
          return toBigNumber(toBN(this).add(toBN(other)));
      }
      sub(other) {
          return toBigNumber(toBN(this).sub(toBN(other)));
      }
      div(other) {
          const o = BigNumber.from(other);
          if (o.isZero()) {
              throwFault("division by zero", "div");
          }
          return toBigNumber(toBN(this).div(toBN(other)));
      }
      mul(other) {
          return toBigNumber(toBN(this).mul(toBN(other)));
      }
      mod(other) {
          const value = toBN(other);
          if (value.isNeg()) {
              throwFault("cannot modulo negative values", "mod");
          }
          return toBigNumber(toBN(this).umod(value));
      }
      pow(other) {
          const value = toBN(other);
          if (value.isNeg()) {
              throwFault("cannot raise to negative values", "pow");
          }
          return toBigNumber(toBN(this).pow(value));
      }
      and(other) {
          const value = toBN(other);
          if (this.isNegative() || value.isNeg()) {
              throwFault("cannot 'and' negative values", "and");
          }
          return toBigNumber(toBN(this).and(value));
      }
      or(other) {
          const value = toBN(other);
          if (this.isNegative() || value.isNeg()) {
              throwFault("cannot 'or' negative values", "or");
          }
          return toBigNumber(toBN(this).or(value));
      }
      xor(other) {
          const value = toBN(other);
          if (this.isNegative() || value.isNeg()) {
              throwFault("cannot 'xor' negative values", "xor");
          }
          return toBigNumber(toBN(this).xor(value));
      }
      mask(value) {
          if (this.isNegative() || value < 0) {
              throwFault("cannot mask negative values", "mask");
          }
          return toBigNumber(toBN(this).maskn(value));
      }
      shl(value) {
          if (this.isNegative() || value < 0) {
              throwFault("cannot shift negative values", "shl");
          }
          return toBigNumber(toBN(this).shln(value));
      }
      shr(value) {
          if (this.isNegative() || value < 0) {
              throwFault("cannot shift negative values", "shr");
          }
          return toBigNumber(toBN(this).shrn(value));
      }
      eq(other) {
          return toBN(this).eq(toBN(other));
      }
      lt(other) {
          return toBN(this).lt(toBN(other));
      }
      lte(other) {
          return toBN(this).lte(toBN(other));
      }
      gt(other) {
          return toBN(this).gt(toBN(other));
      }
      gte(other) {
          return toBN(this).gte(toBN(other));
      }
      isNegative() {
          return (this._hex[0] === "-");
      }
      isZero() {
          return toBN(this).isZero();
      }
      toNumber() {
          try {
              return toBN(this).toNumber();
          }
          catch (error) {
              throwFault("overflow", "toNumber", this.toString());
          }
          return null;
      }
      toBigInt() {
          try {
              return BigInt(this.toString());
          }
          catch (e) { }
          return logger$g.throwError("this platform does not support BigInt", Logger.errors.UNSUPPORTED_OPERATION, {
              value: this.toString()
          });
      }
      toString() {
          // Lots of people expect this, which we do not support, so check (See: #889)
          if (arguments.length > 0) {
              if (arguments[0] === 10) {
                  if (!_warnedToStringRadix) {
                      _warnedToStringRadix = true;
                      logger$g.warn("BigNumber.toString does not accept any parameters; base-10 is assumed");
                  }
              }
              else if (arguments[0] === 16) {
                  logger$g.throwError("BigNumber.toString does not accept any parameters; use bigNumber.toHexString()", Logger.errors.UNEXPECTED_ARGUMENT, {});
              }
              else {
                  logger$g.throwError("BigNumber.toString does not accept parameters", Logger.errors.UNEXPECTED_ARGUMENT, {});
              }
          }
          return toBN(this).toString(10);
      }
      toHexString() {
          return this._hex;
      }
      toJSON(key) {
          return { type: "BigNumber", hex: this.toHexString() };
      }
      static from(value) {
          if (value instanceof BigNumber) {
              return value;
          }
          if (typeof (value) === "string") {
              if (value.match(/^-?0x[0-9a-f]+$/i)) {
                  return new BigNumber(_constructorGuard$1, toHex$1(value));
              }
              if (value.match(/^-?[0-9]+$/)) {
                  return new BigNumber(_constructorGuard$1, toHex$1(new BN(value)));
              }
              return logger$g.throwArgumentError("invalid BigNumber string", "value", value);
          }
          if (typeof (value) === "number") {
              if (value % 1) {
                  throwFault("underflow", "BigNumber.from", value);
              }
              if (value >= MAX_SAFE || value <= -MAX_SAFE) {
                  throwFault("overflow", "BigNumber.from", value);
              }
              return BigNumber.from(String(value));
          }
          const anyValue = value;
          if (typeof (anyValue) === "bigint") {
              return BigNumber.from(anyValue.toString());
          }
          if (isBytes(anyValue)) {
              return BigNumber.from(hexlify(anyValue));
          }
          if (anyValue) {
              // Hexable interface (takes priority)
              if (anyValue.toHexString) {
                  const hex = anyValue.toHexString();
                  if (typeof (hex) === "string") {
                      return BigNumber.from(hex);
                  }
              }
              else {
                  // For now, handle legacy JSON-ified values (goes away in v6)
                  let hex = anyValue._hex;
                  // New-form JSON
                  if (hex == null && anyValue.type === "BigNumber") {
                      hex = anyValue.hex;
                  }
                  if (typeof (hex) === "string") {
                      if (isHexString(hex) || (hex[0] === "-" && isHexString(hex.substring(1)))) {
                          return BigNumber.from(hex);
                      }
                  }
              }
          }
          return logger$g.throwArgumentError("invalid BigNumber value", "value", value);
      }
      static isBigNumber(value) {
          return !!(value && value._isBigNumber);
      }
  }
  // Normalize the hex string
  function toHex$1(value) {
      // For BN, call on the hex string
      if (typeof (value) !== "string") {
          return toHex$1(value.toString(16));
      }
      // If negative, prepend the negative sign to the normalized positive value
      if (value[0] === "-") {
          // Strip off the negative sign
          value = value.substring(1);
          // Cannot have multiple negative signs (e.g. "--0x04")
          if (value[0] === "-") {
              logger$g.throwArgumentError("invalid hex", "value", value);
          }
          // Call toHex on the positive component
          value = toHex$1(value);
          // Do not allow "-0x00"
          if (value === "0x00") {
              return value;
          }
          // Negate the value
          return "-" + value;
      }
      // Add a "0x" prefix if missing
      if (value.substring(0, 2) !== "0x") {
          value = "0x" + value;
      }
      // Normalize zero
      if (value === "0x") {
          return "0x00";
      }
      // Make the string even length
      if (value.length % 2) {
          value = "0x0" + value.substring(2);
      }
      // Trim to smallest even-length string
      while (value.length > 4 && value.substring(0, 4) === "0x00") {
          value = "0x" + value.substring(4);
      }
      return value;
  }
  function toBigNumber(value) {
      return BigNumber.from(toHex$1(value));
  }
  function toBN(value) {
      const hex = BigNumber.from(value).toHexString();
      if (hex[0] === "-") {
          return (new BN("-" + hex.substring(3), 16));
      }
      return new BN(hex.substring(2), 16);
  }
  function throwFault(fault, operation, value) {
      const params = { fault: fault, operation: operation };
      if (value != null) {
          params.value = value;
      }
      return logger$g.throwError(fault, Logger.errors.NUMERIC_FAULT, params);
  }
  // value should have no prefix
  function _base36To16(value) {
      return (new BN(value, 36)).toString(16);
  }

  const version$c = "properties/5.5.0";

  var __awaiter$7 = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  const logger$f = new Logger(version$c);
  function defineReadOnly(object, name, value) {
      Object.defineProperty(object, name, {
          enumerable: true,
          value: value,
          writable: false,
      });
  }
  // Crawl up the constructor chain to find a static method
  function getStatic(ctor, key) {
      for (let i = 0; i < 32; i++) {
          if (ctor[key]) {
              return ctor[key];
          }
          if (!ctor.prototype || typeof (ctor.prototype) !== "object") {
              break;
          }
          ctor = Object.getPrototypeOf(ctor.prototype).constructor;
      }
      return null;
  }
  function resolveProperties(object) {
      return __awaiter$7(this, void 0, void 0, function* () {
          const promises = Object.keys(object).map((key) => {
              const value = object[key];
              return Promise.resolve(value).then((v) => ({ key: key, value: v }));
          });
          const results = yield Promise.all(promises);
          return results.reduce((accum, result) => {
              accum[(result.key)] = result.value;
              return accum;
          }, {});
      });
  }
  function checkProperties(object, properties) {
      if (!object || typeof (object) !== "object") {
          logger$f.throwArgumentError("invalid object", "object", object);
      }
      Object.keys(object).forEach((key) => {
          if (!properties[key]) {
              logger$f.throwArgumentError("invalid object key - " + key, "transaction:" + key, object);
          }
      });
  }
  function shallowCopy(object) {
      const result = {};
      for (const key in object) {
          result[key] = object[key];
      }
      return result;
  }
  const opaque = { bigint: true, boolean: true, "function": true, number: true, string: true };
  function _isFrozen(object) {
      // Opaque objects are not mutable, so safe to copy by assignment
      if (object === undefined || object === null || opaque[typeof (object)]) {
          return true;
      }
      if (Array.isArray(object) || typeof (object) === "object") {
          if (!Object.isFrozen(object)) {
              return false;
          }
          const keys = Object.keys(object);
          for (let i = 0; i < keys.length; i++) {
              let value = null;
              try {
                  value = object[keys[i]];
              }
              catch (error) {
                  // If accessing a value triggers an error, it is a getter
                  // designed to do so (e.g. Result) and is therefore "frozen"
                  continue;
              }
              if (!_isFrozen(value)) {
                  return false;
              }
          }
          return true;
      }
      return logger$f.throwArgumentError(`Cannot deepCopy ${typeof (object)}`, "object", object);
  }
  // Returns a new copy of object, such that no properties may be replaced.
  // New properties may be added only to objects.
  function _deepCopy(object) {
      if (_isFrozen(object)) {
          return object;
      }
      // Arrays are mutable, so we need to create a copy
      if (Array.isArray(object)) {
          return Object.freeze(object.map((item) => deepCopy(item)));
      }
      if (typeof (object) === "object") {
          const result = {};
          for (const key in object) {
              const value = object[key];
              if (value === undefined) {
                  continue;
              }
              defineReadOnly(result, key, deepCopy(value));
          }
          return result;
      }
      return logger$f.throwArgumentError(`Cannot deepCopy ${typeof (object)}`, "object", object);
  }
  function deepCopy(object) {
      return _deepCopy(object);
  }
  class Description {
      constructor(info) {
          for (const key in info) {
              this[key] = deepCopy(info[key]);
          }
      }
  }

  var sha3$1 = {exports: {}};

  /**
   * [js-sha3]{@link https://github.com/emn178/js-sha3}
   *
   * @version 0.8.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2015-2018
   * @license MIT
   */

  (function (module) {
  /*jslint bitwise: true */
  (function () {

    var INPUT_ERROR = 'input is invalid type';
    var FINALIZE_ERROR = 'finalize already called';
    var WINDOW = typeof window === 'object';
    var root = WINDOW ? window : {};
    if (root.JS_SHA3_NO_WINDOW) {
      WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === 'object';
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
    if (NODE_JS) {
      root = commonjsGlobal;
    } else if (WEB_WORKER) {
      root = self;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && 'object' === 'object' && module.exports;
    var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
    var HEX_CHARS = '0123456789abcdef'.split('');
    var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
    var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
    var KECCAK_PADDING = [1, 256, 65536, 16777216];
    var PADDING = [6, 1536, 393216, 100663296];
    var SHIFT = [0, 8, 16, 24];
    var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
      0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
      2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
      2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
      2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648];
    var BITS = [224, 256, 384, 512];
    var SHAKE_BITS = [128, 256];
    var OUTPUT_TYPES = ['hex', 'buffer', 'arrayBuffer', 'array', 'digest'];
    var CSHAKE_BYTEPAD = {
      '128': 168,
      '256': 136
    };

    if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
      Array.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      };
    }

    if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
      ArrayBuffer.isView = function (obj) {
        return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
      };
    }

    var createOutputMethod = function (bits, padding, outputType) {
      return function (message) {
        return new Keccak(bits, padding, bits).update(message)[outputType]();
      };
    };

    var createShakeOutputMethod = function (bits, padding, outputType) {
      return function (message, outputBits) {
        return new Keccak(bits, padding, outputBits).update(message)[outputType]();
      };
    };

    var createCshakeOutputMethod = function (bits, padding, outputType) {
      return function (message, outputBits, n, s) {
        return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
      };
    };

    var createKmacOutputMethod = function (bits, padding, outputType) {
      return function (key, message, outputBits, s) {
        return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
      };
    };

    var createOutputMethods = function (method, createMethod, bits, padding) {
      for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
        var type = OUTPUT_TYPES[i];
        method[type] = createMethod(bits, padding, type);
      }
      return method;
    };

    var createMethod = function (bits, padding) {
      var method = createOutputMethod(bits, padding, 'hex');
      method.create = function () {
        return new Keccak(bits, padding, bits);
      };
      method.update = function (message) {
        return method.create().update(message);
      };
      return createOutputMethods(method, createOutputMethod, bits, padding);
    };

    var createShakeMethod = function (bits, padding) {
      var method = createShakeOutputMethod(bits, padding, 'hex');
      method.create = function (outputBits) {
        return new Keccak(bits, padding, outputBits);
      };
      method.update = function (message, outputBits) {
        return method.create(outputBits).update(message);
      };
      return createOutputMethods(method, createShakeOutputMethod, bits, padding);
    };

    var createCshakeMethod = function (bits, padding) {
      var w = CSHAKE_BYTEPAD[bits];
      var method = createCshakeOutputMethod(bits, padding, 'hex');
      method.create = function (outputBits, n, s) {
        if (!n && !s) {
          return methods['shake' + bits].create(outputBits);
        } else {
          return new Keccak(bits, padding, outputBits).bytepad([n, s], w);
        }
      };
      method.update = function (message, outputBits, n, s) {
        return method.create(outputBits, n, s).update(message);
      };
      return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
    };

    var createKmacMethod = function (bits, padding) {
      var w = CSHAKE_BYTEPAD[bits];
      var method = createKmacOutputMethod(bits, padding, 'hex');
      method.create = function (key, outputBits, s) {
        return new Kmac(bits, padding, outputBits).bytepad(['KMAC', s], w).bytepad([key], w);
      };
      method.update = function (key, message, outputBits, s) {
        return method.create(key, outputBits, s).update(message);
      };
      return createOutputMethods(method, createKmacOutputMethod, bits, padding);
    };

    var algorithms = [
      { name: 'keccak', padding: KECCAK_PADDING, bits: BITS, createMethod: createMethod },
      { name: 'sha3', padding: PADDING, bits: BITS, createMethod: createMethod },
      { name: 'shake', padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
      { name: 'cshake', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
      { name: 'kmac', padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
    ];

    var methods = {}, methodNames = [];

    for (var i = 0; i < algorithms.length; ++i) {
      var algorithm = algorithms[i];
      var bits = algorithm.bits;
      for (var j = 0; j < bits.length; ++j) {
        var methodName = algorithm.name + '_' + bits[j];
        methodNames.push(methodName);
        methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
        if (algorithm.name !== 'sha3') {
          var newMethodName = algorithm.name + bits[j];
          methodNames.push(newMethodName);
          methods[newMethodName] = methods[methodName];
        }
      }
    }

    function Keccak(bits, padding, outputBits) {
      this.blocks = [];
      this.s = [];
      this.padding = padding;
      this.outputBits = outputBits;
      this.reset = true;
      this.finalized = false;
      this.block = 0;
      this.start = 0;
      this.blockCount = (1600 - (bits << 1)) >> 5;
      this.byteCount = this.blockCount << 2;
      this.outputBlocks = outputBits >> 5;
      this.extraBytes = (outputBits & 31) >> 3;

      for (var i = 0; i < 50; ++i) {
        this.s[i] = 0;
      }
    }

    Keccak.prototype.update = function (message) {
      if (this.finalized) {
        throw new Error(FINALIZE_ERROR);
      }
      var notString, type = typeof message;
      if (type !== 'string') {
        if (type === 'object') {
          if (message === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
            message = new Uint8Array(message);
          } else if (!Array.isArray(message)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var blocks = this.blocks, byteCount = this.byteCount, length = message.length,
        blockCount = this.blockCount, index = 0, s = this.s, i, code;

      while (index < length) {
        if (this.reset) {
          this.reset = false;
          blocks[0] = this.block;
          for (i = 1; i < blockCount + 1; ++i) {
            blocks[i] = 0;
          }
        }
        if (notString) {
          for (i = this.start; index < length && i < byteCount; ++index) {
            blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
          }
        } else {
          for (i = this.start; index < length && i < byteCount; ++index) {
            code = message.charCodeAt(index);
            if (code < 0x80) {
              blocks[i >> 2] |= code << SHIFT[i++ & 3];
            } else if (code < 0x800) {
              blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else if (code < 0xd800 || code >= 0xe000) {
              blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            } else {
              code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
              blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
              blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
            }
          }
        }
        this.lastByteIndex = i;
        if (i >= byteCount) {
          this.start = i - byteCount;
          this.block = blocks[blockCount];
          for (i = 0; i < blockCount; ++i) {
            s[i] ^= blocks[i];
          }
          f(s);
          this.reset = true;
        } else {
          this.start = i;
        }
      }
      return this;
    };

    Keccak.prototype.encode = function (x, right) {
      var o = x & 255, n = 1;
      var bytes = [o];
      x = x >> 8;
      o = x & 255;
      while (o > 0) {
        bytes.unshift(o);
        x = x >> 8;
        o = x & 255;
        ++n;
      }
      if (right) {
        bytes.push(n);
      } else {
        bytes.unshift(n);
      }
      this.update(bytes);
      return bytes.length;
    };

    Keccak.prototype.encodeString = function (str) {
      var notString, type = typeof str;
      if (type !== 'string') {
        if (type === 'object') {
          if (str === null) {
            throw new Error(INPUT_ERROR);
          } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
            str = new Uint8Array(str);
          } else if (!Array.isArray(str)) {
            if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
              throw new Error(INPUT_ERROR);
            }
          }
        } else {
          throw new Error(INPUT_ERROR);
        }
        notString = true;
      }
      var bytes = 0, length = str.length;
      if (notString) {
        bytes = length;
      } else {
        for (var i = 0; i < str.length; ++i) {
          var code = str.charCodeAt(i);
          if (code < 0x80) {
            bytes += 1;
          } else if (code < 0x800) {
            bytes += 2;
          } else if (code < 0xd800 || code >= 0xe000) {
            bytes += 3;
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++i) & 0x3ff));
            bytes += 4;
          }
        }
      }
      bytes += this.encode(bytes * 8);
      this.update(str);
      return bytes;
    };

    Keccak.prototype.bytepad = function (strs, w) {
      var bytes = this.encode(w);
      for (var i = 0; i < strs.length; ++i) {
        bytes += this.encodeString(strs[i]);
      }
      var paddingBytes = w - bytes % w;
      var zeros = [];
      zeros.length = paddingBytes;
      this.update(zeros);
      return this;
    };

    Keccak.prototype.finalize = function () {
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
      blocks[i >> 2] |= this.padding[i & 3];
      if (this.lastByteIndex === this.byteCount) {
        blocks[0] = blocks[blockCount];
        for (i = 1; i < blockCount + 1; ++i) {
          blocks[i] = 0;
        }
      }
      blocks[blockCount - 1] |= 0x80000000;
      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i];
      }
      f(s);
    };

    Keccak.prototype.toString = Keccak.prototype.hex = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var hex = '', block;
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          block = s[i];
          hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
            HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
            HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
            HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
        }
        if (j % blockCount === 0) {
          f(s);
          i = 0;
        }
      }
      if (extraBytes) {
        block = s[i];
        hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
        if (extraBytes > 1) {
          hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
        }
        if (extraBytes > 2) {
          hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
        }
      }
      return hex;
    };

    Keccak.prototype.arrayBuffer = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var bytes = this.outputBits >> 3;
      var buffer;
      if (extraBytes) {
        buffer = new ArrayBuffer((outputBlocks + 1) << 2);
      } else {
        buffer = new ArrayBuffer(bytes);
      }
      var array = new Uint32Array(buffer);
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          array[j] = s[i];
        }
        if (j % blockCount === 0) {
          f(s);
        }
      }
      if (extraBytes) {
        array[i] = s[i];
        buffer = buffer.slice(0, bytes);
      }
      return buffer;
    };

    Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;

    Keccak.prototype.digest = Keccak.prototype.array = function () {
      this.finalize();

      var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks,
        extraBytes = this.extraBytes, i = 0, j = 0;
      var array = [], offset, block;
      while (j < outputBlocks) {
        for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
          offset = j << 2;
          block = s[i];
          array[offset] = block & 0xFF;
          array[offset + 1] = (block >> 8) & 0xFF;
          array[offset + 2] = (block >> 16) & 0xFF;
          array[offset + 3] = (block >> 24) & 0xFF;
        }
        if (j % blockCount === 0) {
          f(s);
        }
      }
      if (extraBytes) {
        offset = j << 2;
        block = s[i];
        array[offset] = block & 0xFF;
        if (extraBytes > 1) {
          array[offset + 1] = (block >> 8) & 0xFF;
        }
        if (extraBytes > 2) {
          array[offset + 2] = (block >> 16) & 0xFF;
        }
      }
      return array;
    };

    function Kmac(bits, padding, outputBits) {
      Keccak.call(this, bits, padding, outputBits);
    }

    Kmac.prototype = new Keccak();

    Kmac.prototype.finalize = function () {
      this.encode(this.outputBits, true);
      return Keccak.prototype.finalize.call(this);
    };

    var f = function (s) {
      var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
        b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
        b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
        b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
      for (n = 0; n < 48; n += 2) {
        c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
        c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
        c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
        c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
        c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
        c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
        c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
        c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
        c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
        c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

        h = c8 ^ ((c2 << 1) | (c3 >>> 31));
        l = c9 ^ ((c3 << 1) | (c2 >>> 31));
        s[0] ^= h;
        s[1] ^= l;
        s[10] ^= h;
        s[11] ^= l;
        s[20] ^= h;
        s[21] ^= l;
        s[30] ^= h;
        s[31] ^= l;
        s[40] ^= h;
        s[41] ^= l;
        h = c0 ^ ((c4 << 1) | (c5 >>> 31));
        l = c1 ^ ((c5 << 1) | (c4 >>> 31));
        s[2] ^= h;
        s[3] ^= l;
        s[12] ^= h;
        s[13] ^= l;
        s[22] ^= h;
        s[23] ^= l;
        s[32] ^= h;
        s[33] ^= l;
        s[42] ^= h;
        s[43] ^= l;
        h = c2 ^ ((c6 << 1) | (c7 >>> 31));
        l = c3 ^ ((c7 << 1) | (c6 >>> 31));
        s[4] ^= h;
        s[5] ^= l;
        s[14] ^= h;
        s[15] ^= l;
        s[24] ^= h;
        s[25] ^= l;
        s[34] ^= h;
        s[35] ^= l;
        s[44] ^= h;
        s[45] ^= l;
        h = c4 ^ ((c8 << 1) | (c9 >>> 31));
        l = c5 ^ ((c9 << 1) | (c8 >>> 31));
        s[6] ^= h;
        s[7] ^= l;
        s[16] ^= h;
        s[17] ^= l;
        s[26] ^= h;
        s[27] ^= l;
        s[36] ^= h;
        s[37] ^= l;
        s[46] ^= h;
        s[47] ^= l;
        h = c6 ^ ((c0 << 1) | (c1 >>> 31));
        l = c7 ^ ((c1 << 1) | (c0 >>> 31));
        s[8] ^= h;
        s[9] ^= l;
        s[18] ^= h;
        s[19] ^= l;
        s[28] ^= h;
        s[29] ^= l;
        s[38] ^= h;
        s[39] ^= l;
        s[48] ^= h;
        s[49] ^= l;

        b0 = s[0];
        b1 = s[1];
        b32 = (s[11] << 4) | (s[10] >>> 28);
        b33 = (s[10] << 4) | (s[11] >>> 28);
        b14 = (s[20] << 3) | (s[21] >>> 29);
        b15 = (s[21] << 3) | (s[20] >>> 29);
        b46 = (s[31] << 9) | (s[30] >>> 23);
        b47 = (s[30] << 9) | (s[31] >>> 23);
        b28 = (s[40] << 18) | (s[41] >>> 14);
        b29 = (s[41] << 18) | (s[40] >>> 14);
        b20 = (s[2] << 1) | (s[3] >>> 31);
        b21 = (s[3] << 1) | (s[2] >>> 31);
        b2 = (s[13] << 12) | (s[12] >>> 20);
        b3 = (s[12] << 12) | (s[13] >>> 20);
        b34 = (s[22] << 10) | (s[23] >>> 22);
        b35 = (s[23] << 10) | (s[22] >>> 22);
        b16 = (s[33] << 13) | (s[32] >>> 19);
        b17 = (s[32] << 13) | (s[33] >>> 19);
        b48 = (s[42] << 2) | (s[43] >>> 30);
        b49 = (s[43] << 2) | (s[42] >>> 30);
        b40 = (s[5] << 30) | (s[4] >>> 2);
        b41 = (s[4] << 30) | (s[5] >>> 2);
        b22 = (s[14] << 6) | (s[15] >>> 26);
        b23 = (s[15] << 6) | (s[14] >>> 26);
        b4 = (s[25] << 11) | (s[24] >>> 21);
        b5 = (s[24] << 11) | (s[25] >>> 21);
        b36 = (s[34] << 15) | (s[35] >>> 17);
        b37 = (s[35] << 15) | (s[34] >>> 17);
        b18 = (s[45] << 29) | (s[44] >>> 3);
        b19 = (s[44] << 29) | (s[45] >>> 3);
        b10 = (s[6] << 28) | (s[7] >>> 4);
        b11 = (s[7] << 28) | (s[6] >>> 4);
        b42 = (s[17] << 23) | (s[16] >>> 9);
        b43 = (s[16] << 23) | (s[17] >>> 9);
        b24 = (s[26] << 25) | (s[27] >>> 7);
        b25 = (s[27] << 25) | (s[26] >>> 7);
        b6 = (s[36] << 21) | (s[37] >>> 11);
        b7 = (s[37] << 21) | (s[36] >>> 11);
        b38 = (s[47] << 24) | (s[46] >>> 8);
        b39 = (s[46] << 24) | (s[47] >>> 8);
        b30 = (s[8] << 27) | (s[9] >>> 5);
        b31 = (s[9] << 27) | (s[8] >>> 5);
        b12 = (s[18] << 20) | (s[19] >>> 12);
        b13 = (s[19] << 20) | (s[18] >>> 12);
        b44 = (s[29] << 7) | (s[28] >>> 25);
        b45 = (s[28] << 7) | (s[29] >>> 25);
        b26 = (s[38] << 8) | (s[39] >>> 24);
        b27 = (s[39] << 8) | (s[38] >>> 24);
        b8 = (s[48] << 14) | (s[49] >>> 18);
        b9 = (s[49] << 14) | (s[48] >>> 18);

        s[0] = b0 ^ (~b2 & b4);
        s[1] = b1 ^ (~b3 & b5);
        s[10] = b10 ^ (~b12 & b14);
        s[11] = b11 ^ (~b13 & b15);
        s[20] = b20 ^ (~b22 & b24);
        s[21] = b21 ^ (~b23 & b25);
        s[30] = b30 ^ (~b32 & b34);
        s[31] = b31 ^ (~b33 & b35);
        s[40] = b40 ^ (~b42 & b44);
        s[41] = b41 ^ (~b43 & b45);
        s[2] = b2 ^ (~b4 & b6);
        s[3] = b3 ^ (~b5 & b7);
        s[12] = b12 ^ (~b14 & b16);
        s[13] = b13 ^ (~b15 & b17);
        s[22] = b22 ^ (~b24 & b26);
        s[23] = b23 ^ (~b25 & b27);
        s[32] = b32 ^ (~b34 & b36);
        s[33] = b33 ^ (~b35 & b37);
        s[42] = b42 ^ (~b44 & b46);
        s[43] = b43 ^ (~b45 & b47);
        s[4] = b4 ^ (~b6 & b8);
        s[5] = b5 ^ (~b7 & b9);
        s[14] = b14 ^ (~b16 & b18);
        s[15] = b15 ^ (~b17 & b19);
        s[24] = b24 ^ (~b26 & b28);
        s[25] = b25 ^ (~b27 & b29);
        s[34] = b34 ^ (~b36 & b38);
        s[35] = b35 ^ (~b37 & b39);
        s[44] = b44 ^ (~b46 & b48);
        s[45] = b45 ^ (~b47 & b49);
        s[6] = b6 ^ (~b8 & b0);
        s[7] = b7 ^ (~b9 & b1);
        s[16] = b16 ^ (~b18 & b10);
        s[17] = b17 ^ (~b19 & b11);
        s[26] = b26 ^ (~b28 & b20);
        s[27] = b27 ^ (~b29 & b21);
        s[36] = b36 ^ (~b38 & b30);
        s[37] = b37 ^ (~b39 & b31);
        s[46] = b46 ^ (~b48 & b40);
        s[47] = b47 ^ (~b49 & b41);
        s[8] = b8 ^ (~b0 & b2);
        s[9] = b9 ^ (~b1 & b3);
        s[18] = b18 ^ (~b10 & b12);
        s[19] = b19 ^ (~b11 & b13);
        s[28] = b28 ^ (~b20 & b22);
        s[29] = b29 ^ (~b21 & b23);
        s[38] = b38 ^ (~b30 & b32);
        s[39] = b39 ^ (~b31 & b33);
        s[48] = b48 ^ (~b40 & b42);
        s[49] = b49 ^ (~b41 & b43);

        s[0] ^= RC[n];
        s[1] ^= RC[n + 1];
      }
    };

    if (COMMON_JS) {
      module.exports = methods;
    } else {
      for (i = 0; i < methodNames.length; ++i) {
        root[methodNames[i]] = methods[methodNames[i]];
      }
    }
  })();
  }(sha3$1));

  var sha3 = sha3$1.exports;

  function keccak256(data) {
      return '0x' + sha3.keccak_256(arrayify(data));
  }

  const version$b = "rlp/5.5.0";

  const logger$e = new Logger(version$b);
  function arrayifyInteger(value) {
      const result = [];
      while (value) {
          result.unshift(value & 0xff);
          value >>= 8;
      }
      return result;
  }
  function unarrayifyInteger(data, offset, length) {
      let result = 0;
      for (let i = 0; i < length; i++) {
          result = (result * 256) + data[offset + i];
      }
      return result;
  }
  function _encode(object) {
      if (Array.isArray(object)) {
          let payload = [];
          object.forEach(function (child) {
              payload = payload.concat(_encode(child));
          });
          if (payload.length <= 55) {
              payload.unshift(0xc0 + payload.length);
              return payload;
          }
          const length = arrayifyInteger(payload.length);
          length.unshift(0xf7 + length.length);
          return length.concat(payload);
      }
      if (!isBytesLike(object)) {
          logger$e.throwArgumentError("RLP object must be BytesLike", "object", object);
      }
      const data = Array.prototype.slice.call(arrayify(object));
      if (data.length === 1 && data[0] <= 0x7f) {
          return data;
      }
      else if (data.length <= 55) {
          data.unshift(0x80 + data.length);
          return data;
      }
      const length = arrayifyInteger(data.length);
      length.unshift(0xb7 + length.length);
      return length.concat(data);
  }
  function encode$2(object) {
      return hexlify(_encode(object));
  }
  function _decodeChildren(data, offset, childOffset, length) {
      const result = [];
      while (childOffset < offset + 1 + length) {
          const decoded = _decode(data, childOffset);
          result.push(decoded.result);
          childOffset += decoded.consumed;
          if (childOffset > offset + 1 + length) {
              logger$e.throwError("child data too short", Logger.errors.BUFFER_OVERRUN, {});
          }
      }
      return { consumed: (1 + length), result: result };
  }
  // returns { consumed: number, result: Object }
  function _decode(data, offset) {
      if (data.length === 0) {
          logger$e.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
      }
      // Array with extra length prefix
      if (data[offset] >= 0xf8) {
          const lengthLength = data[offset] - 0xf7;
          if (offset + 1 + lengthLength > data.length) {
              logger$e.throwError("data short segment too short", Logger.errors.BUFFER_OVERRUN, {});
          }
          const length = unarrayifyInteger(data, offset + 1, lengthLength);
          if (offset + 1 + lengthLength + length > data.length) {
              logger$e.throwError("data long segment too short", Logger.errors.BUFFER_OVERRUN, {});
          }
          return _decodeChildren(data, offset, offset + 1 + lengthLength, lengthLength + length);
      }
      else if (data[offset] >= 0xc0) {
          const length = data[offset] - 0xc0;
          if (offset + 1 + length > data.length) {
              logger$e.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
          }
          return _decodeChildren(data, offset, offset + 1, length);
      }
      else if (data[offset] >= 0xb8) {
          const lengthLength = data[offset] - 0xb7;
          if (offset + 1 + lengthLength > data.length) {
              logger$e.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
          }
          const length = unarrayifyInteger(data, offset + 1, lengthLength);
          if (offset + 1 + lengthLength + length > data.length) {
              logger$e.throwError("data array too short", Logger.errors.BUFFER_OVERRUN, {});
          }
          const result = hexlify(data.slice(offset + 1 + lengthLength, offset + 1 + lengthLength + length));
          return { consumed: (1 + lengthLength + length), result: result };
      }
      else if (data[offset] >= 0x80) {
          const length = data[offset] - 0x80;
          if (offset + 1 + length > data.length) {
              logger$e.throwError("data too short", Logger.errors.BUFFER_OVERRUN, {});
          }
          const result = hexlify(data.slice(offset + 1, offset + 1 + length));
          return { consumed: (1 + length), result: result };
      }
      return { consumed: 1, result: hexlify(data[offset]) };
  }
  function decode$2(data) {
      const bytes = arrayify(data);
      const decoded = _decode(bytes, 0);
      if (decoded.consumed !== bytes.length) {
          logger$e.throwArgumentError("invalid rlp data", "data", data);
      }
      return decoded.result;
  }

  const version$a = "address/5.5.0";

  const logger$d = new Logger(version$a);
  function getChecksumAddress(address) {
      if (!isHexString(address, 20)) {
          logger$d.throwArgumentError("invalid address", "address", address);
      }
      address = address.toLowerCase();
      const chars = address.substring(2).split("");
      const expanded = new Uint8Array(40);
      for (let i = 0; i < 40; i++) {
          expanded[i] = chars[i].charCodeAt(0);
      }
      const hashed = arrayify(keccak256(expanded));
      for (let i = 0; i < 40; i += 2) {
          if ((hashed[i >> 1] >> 4) >= 8) {
              chars[i] = chars[i].toUpperCase();
          }
          if ((hashed[i >> 1] & 0x0f) >= 8) {
              chars[i + 1] = chars[i + 1].toUpperCase();
          }
      }
      return "0x" + chars.join("");
  }
  // Shims for environments that are missing some required constants and functions
  const MAX_SAFE_INTEGER = 0x1fffffffffffff;
  function log10(x) {
      if (Math.log10) {
          return Math.log10(x);
      }
      return Math.log(x) / Math.LN10;
  }
  // See: https://en.wikipedia.org/wiki/International_Bank_Account_Number
  // Create lookup table
  const ibanLookup = {};
  for (let i = 0; i < 10; i++) {
      ibanLookup[String(i)] = String(i);
  }
  for (let i = 0; i < 26; i++) {
      ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
  }
  // How many decimal digits can we process? (for 64-bit float, this is 15)
  const safeDigits = Math.floor(log10(MAX_SAFE_INTEGER));
  function ibanChecksum(address) {
      address = address.toUpperCase();
      address = address.substring(4) + address.substring(0, 2) + "00";
      let expanded = address.split("").map((c) => { return ibanLookup[c]; }).join("");
      // Javascript can handle integers safely up to 15 (decimal) digits
      while (expanded.length >= safeDigits) {
          let block = expanded.substring(0, safeDigits);
          expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
      }
      let checksum = String(98 - (parseInt(expanded, 10) % 97));
      while (checksum.length < 2) {
          checksum = "0" + checksum;
      }
      return checksum;
  }
  function getAddress(address) {
      let result = null;
      if (typeof (address) !== "string") {
          logger$d.throwArgumentError("invalid address", "address", address);
      }
      if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
          // Missing the 0x prefix
          if (address.substring(0, 2) !== "0x") {
              address = "0x" + address;
          }
          result = getChecksumAddress(address);
          // It is a checksummed address with a bad checksum
          if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
              logger$d.throwArgumentError("bad address checksum", "address", address);
          }
          // Maybe ICAP? (we only support direct mode)
      }
      else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
          // It is an ICAP address with a bad checksum
          if (address.substring(2, 4) !== ibanChecksum(address)) {
              logger$d.throwArgumentError("bad icap checksum", "address", address);
          }
          result = _base36To16(address.substring(4));
          while (result.length < 40) {
              result = "0" + result;
          }
          result = getChecksumAddress("0x" + result);
      }
      else {
          logger$d.throwArgumentError("invalid address", "address", address);
      }
      return result;
  }
  // http://ethereum.stackexchange.com/questions/760/how-is-the-address-of-an-ethereum-contract-computed
  function getContractAddress(transaction) {
      let from = null;
      try {
          from = getAddress(transaction.from);
      }
      catch (error) {
          logger$d.throwArgumentError("missing from address", "transaction", transaction);
      }
      const nonce = stripZeros(arrayify(BigNumber.from(transaction.nonce).toHexString()));
      return getAddress(hexDataSlice(keccak256(encode$2([from, nonce])), 12));
  }

  const AddressZero = "0x0000000000000000000000000000000000000000";

  const Zero$1 = ( /*#__PURE__*/BigNumber.from(0));

  const HashZero = "0x0000000000000000000000000000000000000000000000000000000000000000";

  const version$9 = "strings/5.5.0";

  const logger$c = new Logger(version$9);
  ///////////////////////////////
  var UnicodeNormalizationForm;
  (function (UnicodeNormalizationForm) {
      UnicodeNormalizationForm["current"] = "";
      UnicodeNormalizationForm["NFC"] = "NFC";
      UnicodeNormalizationForm["NFD"] = "NFD";
      UnicodeNormalizationForm["NFKC"] = "NFKC";
      UnicodeNormalizationForm["NFKD"] = "NFKD";
  })(UnicodeNormalizationForm || (UnicodeNormalizationForm = {}));
  var Utf8ErrorReason;
  (function (Utf8ErrorReason) {
      // A continuation byte was present where there was nothing to continue
      // - offset = the index the codepoint began in
      Utf8ErrorReason["UNEXPECTED_CONTINUE"] = "unexpected continuation byte";
      // An invalid (non-continuation) byte to start a UTF-8 codepoint was found
      // - offset = the index the codepoint began in
      Utf8ErrorReason["BAD_PREFIX"] = "bad codepoint prefix";
      // The string is too short to process the expected codepoint
      // - offset = the index the codepoint began in
      Utf8ErrorReason["OVERRUN"] = "string overrun";
      // A missing continuation byte was expected but not found
      // - offset = the index the continuation byte was expected at
      Utf8ErrorReason["MISSING_CONTINUE"] = "missing continuation byte";
      // The computed code point is outside the range for UTF-8
      // - offset       = start of this codepoint
      // - badCodepoint = the computed codepoint; outside the UTF-8 range
      Utf8ErrorReason["OUT_OF_RANGE"] = "out of UTF-8 range";
      // UTF-8 strings may not contain UTF-16 surrogate pairs
      // - offset       = start of this codepoint
      // - badCodepoint = the computed codepoint; inside the UTF-16 surrogate range
      Utf8ErrorReason["UTF16_SURROGATE"] = "UTF-16 surrogate";
      // The string is an overlong representation
      // - offset       = start of this codepoint
      // - badCodepoint = the computed codepoint; already bounds checked
      Utf8ErrorReason["OVERLONG"] = "overlong representation";
  })(Utf8ErrorReason || (Utf8ErrorReason = {}));
  function errorFunc(reason, offset, bytes, output, badCodepoint) {
      return logger$c.throwArgumentError(`invalid codepoint at offset ${offset}; ${reason}`, "bytes", bytes);
  }
  function ignoreFunc(reason, offset, bytes, output, badCodepoint) {
      // If there is an invalid prefix (including stray continuation), skip any additional continuation bytes
      if (reason === Utf8ErrorReason.BAD_PREFIX || reason === Utf8ErrorReason.UNEXPECTED_CONTINUE) {
          let i = 0;
          for (let o = offset + 1; o < bytes.length; o++) {
              if (bytes[o] >> 6 !== 0x02) {
                  break;
              }
              i++;
          }
          return i;
      }
      // This byte runs us past the end of the string, so just jump to the end
      // (but the first byte was read already read and therefore skipped)
      if (reason === Utf8ErrorReason.OVERRUN) {
          return bytes.length - offset - 1;
      }
      // Nothing to skip
      return 0;
  }
  function replaceFunc(reason, offset, bytes, output, badCodepoint) {
      // Overlong representations are otherwise "valid" code points; just non-deistingtished
      if (reason === Utf8ErrorReason.OVERLONG) {
          output.push(badCodepoint);
          return 0;
      }
      // Put the replacement character into the output
      output.push(0xfffd);
      // Otherwise, process as if ignoring errors
      return ignoreFunc(reason, offset, bytes);
  }
  // Common error handing strategies
  const Utf8ErrorFuncs = Object.freeze({
      error: errorFunc,
      ignore: ignoreFunc,
      replace: replaceFunc
  });
  // http://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript#13691499
  function getUtf8CodePoints(bytes, onError) {
      if (onError == null) {
          onError = Utf8ErrorFuncs.error;
      }
      bytes = arrayify(bytes);
      const result = [];
      let i = 0;
      // Invalid bytes are ignored
      while (i < bytes.length) {
          const c = bytes[i++];
          // 0xxx xxxx
          if (c >> 7 === 0) {
              result.push(c);
              continue;
          }
          // Multibyte; how many bytes left for this character?
          let extraLength = null;
          let overlongMask = null;
          // 110x xxxx 10xx xxxx
          if ((c & 0xe0) === 0xc0) {
              extraLength = 1;
              overlongMask = 0x7f;
              // 1110 xxxx 10xx xxxx 10xx xxxx
          }
          else if ((c & 0xf0) === 0xe0) {
              extraLength = 2;
              overlongMask = 0x7ff;
              // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
          }
          else if ((c & 0xf8) === 0xf0) {
              extraLength = 3;
              overlongMask = 0xffff;
          }
          else {
              if ((c & 0xc0) === 0x80) {
                  i += onError(Utf8ErrorReason.UNEXPECTED_CONTINUE, i - 1, bytes, result);
              }
              else {
                  i += onError(Utf8ErrorReason.BAD_PREFIX, i - 1, bytes, result);
              }
              continue;
          }
          // Do we have enough bytes in our data?
          if (i - 1 + extraLength >= bytes.length) {
              i += onError(Utf8ErrorReason.OVERRUN, i - 1, bytes, result);
              continue;
          }
          // Remove the length prefix from the char
          let res = c & ((1 << (8 - extraLength - 1)) - 1);
          for (let j = 0; j < extraLength; j++) {
              let nextChar = bytes[i];
              // Invalid continuation byte
              if ((nextChar & 0xc0) != 0x80) {
                  i += onError(Utf8ErrorReason.MISSING_CONTINUE, i, bytes, result);
                  res = null;
                  break;
              }
              res = (res << 6) | (nextChar & 0x3f);
              i++;
          }
          // See above loop for invalid continuation byte
          if (res === null) {
              continue;
          }
          // Maximum code point
          if (res > 0x10ffff) {
              i += onError(Utf8ErrorReason.OUT_OF_RANGE, i - 1 - extraLength, bytes, result, res);
              continue;
          }
          // Reserved for UTF-16 surrogate halves
          if (res >= 0xd800 && res <= 0xdfff) {
              i += onError(Utf8ErrorReason.UTF16_SURROGATE, i - 1 - extraLength, bytes, result, res);
              continue;
          }
          // Check for overlong sequences (more bytes than needed)
          if (res <= overlongMask) {
              i += onError(Utf8ErrorReason.OVERLONG, i - 1 - extraLength, bytes, result, res);
              continue;
          }
          result.push(res);
      }
      return result;
  }
  // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
  function toUtf8Bytes(str, form = UnicodeNormalizationForm.current) {
      if (form != UnicodeNormalizationForm.current) {
          logger$c.checkNormalize();
          str = str.normalize(form);
      }
      let result = [];
      for (let i = 0; i < str.length; i++) {
          const c = str.charCodeAt(i);
          if (c < 0x80) {
              result.push(c);
          }
          else if (c < 0x800) {
              result.push((c >> 6) | 0xc0);
              result.push((c & 0x3f) | 0x80);
          }
          else if ((c & 0xfc00) == 0xd800) {
              i++;
              const c2 = str.charCodeAt(i);
              if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
                  throw new Error("invalid utf-8 string");
              }
              // Surrogate Pair
              const pair = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
              result.push((pair >> 18) | 0xf0);
              result.push(((pair >> 12) & 0x3f) | 0x80);
              result.push(((pair >> 6) & 0x3f) | 0x80);
              result.push((pair & 0x3f) | 0x80);
          }
          else {
              result.push((c >> 12) | 0xe0);
              result.push(((c >> 6) & 0x3f) | 0x80);
              result.push((c & 0x3f) | 0x80);
          }
      }
      return arrayify(result);
  }
  function _toUtf8String(codePoints) {
      return codePoints.map((codePoint) => {
          if (codePoint <= 0xffff) {
              return String.fromCharCode(codePoint);
          }
          codePoint -= 0x10000;
          return String.fromCharCode((((codePoint >> 10) & 0x3ff) + 0xd800), ((codePoint & 0x3ff) + 0xdc00));
      }).join("");
  }
  function toUtf8String(bytes, onError) {
      return _toUtf8String(getUtf8CodePoints(bytes, onError));
  }
  function toUtf8CodePoints(str, form = UnicodeNormalizationForm.current) {
      return getUtf8CodePoints(toUtf8Bytes(str, form));
  }

  function bytes2(data) {
      if ((data.length % 4) !== 0) {
          throw new Error("bad data");
      }
      let result = [];
      for (let i = 0; i < data.length; i += 4) {
          result.push(parseInt(data.substring(i, i + 4), 16));
      }
      return result;
  }
  function createTable(data, func) {
      if (!func) {
          func = function (value) { return [parseInt(value, 16)]; };
      }
      let lo = 0;
      let result = {};
      data.split(",").forEach((pair) => {
          let comps = pair.split(":");
          lo += parseInt(comps[0], 16);
          result[lo] = func(comps[1]);
      });
      return result;
  }
  function createRangeTable(data) {
      let hi = 0;
      return data.split(",").map((v) => {
          let comps = v.split("-");
          if (comps.length === 1) {
              comps[1] = "0";
          }
          else if (comps[1] === "") {
              comps[1] = "1";
          }
          let lo = hi + parseInt(comps[0], 16);
          hi = parseInt(comps[1], 16);
          return { l: lo, h: hi };
      });
  }
  function matchMap(value, ranges) {
      let lo = 0;
      for (let i = 0; i < ranges.length; i++) {
          let range = ranges[i];
          lo += range.l;
          if (value >= lo && value <= lo + range.h && ((value - lo) % (range.d || 1)) === 0) {
              if (range.e && range.e.indexOf(value - lo) !== -1) {
                  continue;
              }
              return range;
          }
      }
      return null;
  }
  const Table_A_1_ranges = createRangeTable("221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d");
  // @TODO: Make this relative...
  const Table_B_1_flags = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff".split(",").map((v) => parseInt(v, 16));
  const Table_B_2_ranges = [
      { h: 25, s: 32, l: 65 },
      { h: 30, s: 32, e: [23], l: 127 },
      { h: 54, s: 1, e: [48], l: 64, d: 2 },
      { h: 14, s: 1, l: 57, d: 2 },
      { h: 44, s: 1, l: 17, d: 2 },
      { h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2 },
      { h: 16, s: 1, l: 68, d: 2 },
      { h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2 },
      { h: 26, s: 32, e: [17], l: 435 },
      { h: 22, s: 1, l: 71, d: 2 },
      { h: 15, s: 80, l: 40 },
      { h: 31, s: 32, l: 16 },
      { h: 32, s: 1, l: 80, d: 2 },
      { h: 52, s: 1, l: 42, d: 2 },
      { h: 12, s: 1, l: 55, d: 2 },
      { h: 40, s: 1, e: [38], l: 15, d: 2 },
      { h: 14, s: 1, l: 48, d: 2 },
      { h: 37, s: 48, l: 49 },
      { h: 148, s: 1, l: 6351, d: 2 },
      { h: 88, s: 1, l: 160, d: 2 },
      { h: 15, s: 16, l: 704 },
      { h: 25, s: 26, l: 854 },
      { h: 25, s: 32, l: 55915 },
      { h: 37, s: 40, l: 1247 },
      { h: 25, s: -119711, l: 53248 },
      { h: 25, s: -119763, l: 52 },
      { h: 25, s: -119815, l: 52 },
      { h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52 },
      { h: 25, s: -119919, l: 52 },
      { h: 24, s: -119971, e: [2, 7, 8, 17], l: 52 },
      { h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52 },
      { h: 25, s: -120075, l: 52 },
      { h: 25, s: -120127, l: 52 },
      { h: 25, s: -120179, l: 52 },
      { h: 25, s: -120231, l: 52 },
      { h: 25, s: -120283, l: 52 },
      { h: 25, s: -120335, l: 52 },
      { h: 24, s: -119543, e: [17], l: 56 },
      { h: 24, s: -119601, e: [17], l: 58 },
      { h: 24, s: -119659, e: [17], l: 58 },
      { h: 24, s: -119717, e: [17], l: 58 },
      { h: 24, s: -119775, e: [17], l: 58 }
  ];
  const Table_B_2_lut_abs = createTable("b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3");
  const Table_B_2_lut_rel = createTable("179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7");
  const Table_B_2_complex = createTable("df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D", bytes2);
  const Table_C_ranges = createRangeTable("80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001");
  function flatten(values) {
      return values.reduce((accum, value) => {
          value.forEach((value) => { accum.push(value); });
          return accum;
      }, []);
  }
  function _nameprepTableA1(codepoint) {
      return !!matchMap(codepoint, Table_A_1_ranges);
  }
  function _nameprepTableB2(codepoint) {
      let range = matchMap(codepoint, Table_B_2_ranges);
      if (range) {
          return [codepoint + range.s];
      }
      let codes = Table_B_2_lut_abs[codepoint];
      if (codes) {
          return codes;
      }
      let shift = Table_B_2_lut_rel[codepoint];
      if (shift) {
          return [codepoint + shift[0]];
      }
      let complex = Table_B_2_complex[codepoint];
      if (complex) {
          return complex;
      }
      return null;
  }
  function _nameprepTableC(codepoint) {
      return !!matchMap(codepoint, Table_C_ranges);
  }
  function nameprep(value) {
      // This allows platforms with incomplete normalize to bypass
      // it for very basic names which the built-in toLowerCase
      // will certainly handle correctly
      if (value.match(/^[a-z0-9-]*$/i) && value.length <= 59) {
          return value.toLowerCase();
      }
      // Get the code points (keeping the current normalization)
      let codes = toUtf8CodePoints(value);
      codes = flatten(codes.map((code) => {
          // Substitute Table B.1 (Maps to Nothing)
          if (Table_B_1_flags.indexOf(code) >= 0) {
              return [];
          }
          if (code >= 0xfe00 && code <= 0xfe0f) {
              return [];
          }
          // Substitute Table B.2 (Case Folding)
          let codesTableB2 = _nameprepTableB2(code);
          if (codesTableB2) {
              return codesTableB2;
          }
          // No Substitution
          return [code];
      }));
      // Normalize using form KC
      codes = toUtf8CodePoints(_toUtf8String(codes), UnicodeNormalizationForm.NFKC);
      // Prohibit Tables C.1.2, C.2.2, C.3, C.4, C.5, C.6, C.7, C.8, C.9
      codes.forEach((code) => {
          if (_nameprepTableC(code)) {
              throw new Error("STRINGPREP_CONTAINS_PROHIBITED");
          }
      });
      // Prohibit Unassigned Code Points (Table A.1)
      codes.forEach((code) => {
          if (_nameprepTableA1(code)) {
              throw new Error("STRINGPREP_CONTAINS_UNASSIGNED");
          }
      });
      // IDNA extras
      let name = _toUtf8String(codes);
      // IDNA: 4.2.3.1
      if (name.substring(0, 1) === "-" || name.substring(2, 4) === "--" || name.substring(name.length - 1) === "-") {
          throw new Error("invalid hyphen");
      }
      // IDNA: 4.2.4
      if (name.length > 63) {
          throw new Error("too long");
      }
      return name;
  }

  function id(text) {
      return keccak256(toUtf8Bytes(text));
  }

  const version$8 = "hash/5.5.0";

  const logger$b = new Logger(version$8);
  const Zeros = new Uint8Array(32);
  Zeros.fill(0);
  const Partition = new RegExp("^((.*)\\.)?([^.]+)$");
  function namehash(name) {
      /* istanbul ignore if */
      if (typeof (name) !== "string") {
          logger$b.throwArgumentError("invalid ENS name; not a string", "name", name);
      }
      let current = name;
      let result = Zeros;
      while (current.length) {
          const partition = current.match(Partition);
          if (partition == null || partition[2] === "") {
              logger$b.throwArgumentError("invalid ENS address; missing component", "name", name);
          }
          const label = toUtf8Bytes(nameprep(partition[3]));
          result = keccak256(concat([result, keccak256(label)]));
          current = partition[2] || "";
      }
      return hexlify(result);
  }

  var __awaiter$6 = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  const logger$a = new Logger(version$8);
  const padding = new Uint8Array(32);
  padding.fill(0);
  const NegativeOne = BigNumber.from(-1);
  const Zero = BigNumber.from(0);
  const One = BigNumber.from(1);
  const MaxUint256 = BigNumber.from("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  function hexPadRight(value) {
      const bytes = arrayify(value);
      const padOffset = bytes.length % 32;
      if (padOffset) {
          return hexConcat([bytes, padding.slice(padOffset)]);
      }
      return hexlify(bytes);
  }
  const hexTrue = hexZeroPad(One.toHexString(), 32);
  const hexFalse = hexZeroPad(Zero.toHexString(), 32);
  const domainFieldTypes = {
      name: "string",
      version: "string",
      chainId: "uint256",
      verifyingContract: "address",
      salt: "bytes32"
  };
  const domainFieldNames = [
      "name", "version", "chainId", "verifyingContract", "salt"
  ];
  function checkString(key) {
      return function (value) {
          if (typeof (value) !== "string") {
              logger$a.throwArgumentError(`invalid domain value for ${JSON.stringify(key)}`, `domain.${key}`, value);
          }
          return value;
      };
  }
  const domainChecks = {
      name: checkString("name"),
      version: checkString("version"),
      chainId: function (value) {
          try {
              return BigNumber.from(value).toString();
          }
          catch (error) { }
          return logger$a.throwArgumentError(`invalid domain value for "chainId"`, "domain.chainId", value);
      },
      verifyingContract: function (value) {
          try {
              return getAddress(value).toLowerCase();
          }
          catch (error) { }
          return logger$a.throwArgumentError(`invalid domain value "verifyingContract"`, "domain.verifyingContract", value);
      },
      salt: function (value) {
          try {
              const bytes = arrayify(value);
              if (bytes.length !== 32) {
                  throw new Error("bad length");
              }
              return hexlify(bytes);
          }
          catch (error) { }
          return logger$a.throwArgumentError(`invalid domain value "salt"`, "domain.salt", value);
      }
  };
  function getBaseEncoder(type) {
      // intXX and uintXX
      {
          const match = type.match(/^(u?)int(\d*)$/);
          if (match) {
              const signed = (match[1] === "");
              const width = parseInt(match[2] || "256");
              if (width % 8 !== 0 || width > 256 || (match[2] && match[2] !== String(width))) {
                  logger$a.throwArgumentError("invalid numeric width", "type", type);
              }
              const boundsUpper = MaxUint256.mask(signed ? (width - 1) : width);
              const boundsLower = signed ? boundsUpper.add(One).mul(NegativeOne) : Zero;
              return function (value) {
                  const v = BigNumber.from(value);
                  if (v.lt(boundsLower) || v.gt(boundsUpper)) {
                      logger$a.throwArgumentError(`value out-of-bounds for ${type}`, "value", value);
                  }
                  return hexZeroPad(v.toTwos(256).toHexString(), 32);
              };
          }
      }
      // bytesXX
      {
          const match = type.match(/^bytes(\d+)$/);
          if (match) {
              const width = parseInt(match[1]);
              if (width === 0 || width > 32 || match[1] !== String(width)) {
                  logger$a.throwArgumentError("invalid bytes width", "type", type);
              }
              return function (value) {
                  const bytes = arrayify(value);
                  if (bytes.length !== width) {
                      logger$a.throwArgumentError(`invalid length for ${type}`, "value", value);
                  }
                  return hexPadRight(value);
              };
          }
      }
      switch (type) {
          case "address": return function (value) {
              return hexZeroPad(getAddress(value), 32);
          };
          case "bool": return function (value) {
              return ((!value) ? hexFalse : hexTrue);
          };
          case "bytes": return function (value) {
              return keccak256(value);
          };
          case "string": return function (value) {
              return id(value);
          };
      }
      return null;
  }
  function encodeType(name, fields) {
      return `${name}(${fields.map(({ name, type }) => (type + " " + name)).join(",")})`;
  }
  class TypedDataEncoder {
      constructor(types) {
          defineReadOnly(this, "types", Object.freeze(deepCopy(types)));
          defineReadOnly(this, "_encoderCache", {});
          defineReadOnly(this, "_types", {});
          // Link struct types to their direct child structs
          const links = {};
          // Link structs to structs which contain them as a child
          const parents = {};
          // Link all subtypes within a given struct
          const subtypes = {};
          Object.keys(types).forEach((type) => {
              links[type] = {};
              parents[type] = [];
              subtypes[type] = {};
          });
          for (const name in types) {
              const uniqueNames = {};
              types[name].forEach((field) => {
                  // Check each field has a unique name
                  if (uniqueNames[field.name]) {
                      logger$a.throwArgumentError(`duplicate variable name ${JSON.stringify(field.name)} in ${JSON.stringify(name)}`, "types", types);
                  }
                  uniqueNames[field.name] = true;
                  // Get the base type (drop any array specifiers)
                  const baseType = field.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
                  if (baseType === name) {
                      logger$a.throwArgumentError(`circular type reference to ${JSON.stringify(baseType)}`, "types", types);
                  }
                  // Is this a base encoding type?
                  const encoder = getBaseEncoder(baseType);
                  if (encoder) {
                      return;
                  }
                  if (!parents[baseType]) {
                      logger$a.throwArgumentError(`unknown type ${JSON.stringify(baseType)}`, "types", types);
                  }
                  // Add linkage
                  parents[baseType].push(name);
                  links[name][baseType] = true;
              });
          }
          // Deduce the primary type
          const primaryTypes = Object.keys(parents).filter((n) => (parents[n].length === 0));
          if (primaryTypes.length === 0) {
              logger$a.throwArgumentError("missing primary type", "types", types);
          }
          else if (primaryTypes.length > 1) {
              logger$a.throwArgumentError(`ambiguous primary types or unused types: ${primaryTypes.map((t) => (JSON.stringify(t))).join(", ")}`, "types", types);
          }
          defineReadOnly(this, "primaryType", primaryTypes[0]);
          // Check for circular type references
          function checkCircular(type, found) {
              if (found[type]) {
                  logger$a.throwArgumentError(`circular type reference to ${JSON.stringify(type)}`, "types", types);
              }
              found[type] = true;
              Object.keys(links[type]).forEach((child) => {
                  if (!parents[child]) {
                      return;
                  }
                  // Recursively check children
                  checkCircular(child, found);
                  // Mark all ancestors as having this decendant
                  Object.keys(found).forEach((subtype) => {
                      subtypes[subtype][child] = true;
                  });
              });
              delete found[type];
          }
          checkCircular(this.primaryType, {});
          // Compute each fully describe type
          for (const name in subtypes) {
              const st = Object.keys(subtypes[name]);
              st.sort();
              this._types[name] = encodeType(name, types[name]) + st.map((t) => encodeType(t, types[t])).join("");
          }
      }
      getEncoder(type) {
          let encoder = this._encoderCache[type];
          if (!encoder) {
              encoder = this._encoderCache[type] = this._getEncoder(type);
          }
          return encoder;
      }
      _getEncoder(type) {
          // Basic encoder type (address, bool, uint256, etc)
          {
              const encoder = getBaseEncoder(type);
              if (encoder) {
                  return encoder;
              }
          }
          // Array
          const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
          if (match) {
              const subtype = match[1];
              const subEncoder = this.getEncoder(subtype);
              const length = parseInt(match[3]);
              return (value) => {
                  if (length >= 0 && value.length !== length) {
                      logger$a.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
                  }
                  let result = value.map(subEncoder);
                  if (this._types[subtype]) {
                      result = result.map(keccak256);
                  }
                  return keccak256(hexConcat(result));
              };
          }
          // Struct
          const fields = this.types[type];
          if (fields) {
              const encodedType = id(this._types[type]);
              return (value) => {
                  const values = fields.map(({ name, type }) => {
                      const result = this.getEncoder(type)(value[name]);
                      if (this._types[type]) {
                          return keccak256(result);
                      }
                      return result;
                  });
                  values.unshift(encodedType);
                  return hexConcat(values);
              };
          }
          return logger$a.throwArgumentError(`unknown type: ${type}`, "type", type);
      }
      encodeType(name) {
          const result = this._types[name];
          if (!result) {
              logger$a.throwArgumentError(`unknown type: ${JSON.stringify(name)}`, "name", name);
          }
          return result;
      }
      encodeData(type, value) {
          return this.getEncoder(type)(value);
      }
      hashStruct(name, value) {
          return keccak256(this.encodeData(name, value));
      }
      encode(value) {
          return this.encodeData(this.primaryType, value);
      }
      hash(value) {
          return this.hashStruct(this.primaryType, value);
      }
      _visit(type, value, callback) {
          // Basic encoder type (address, bool, uint256, etc)
          {
              const encoder = getBaseEncoder(type);
              if (encoder) {
                  return callback(type, value);
              }
          }
          // Array
          const match = type.match(/^(.*)(\x5b(\d*)\x5d)$/);
          if (match) {
              const subtype = match[1];
              const length = parseInt(match[3]);
              if (length >= 0 && value.length !== length) {
                  logger$a.throwArgumentError("array length mismatch; expected length ${ arrayLength }", "value", value);
              }
              return value.map((v) => this._visit(subtype, v, callback));
          }
          // Struct
          const fields = this.types[type];
          if (fields) {
              return fields.reduce((accum, { name, type }) => {
                  accum[name] = this._visit(type, value[name], callback);
                  return accum;
              }, {});
          }
          return logger$a.throwArgumentError(`unknown type: ${type}`, "type", type);
      }
      visit(value, callback) {
          return this._visit(this.primaryType, value, callback);
      }
      static from(types) {
          return new TypedDataEncoder(types);
      }
      static getPrimaryType(types) {
          return TypedDataEncoder.from(types).primaryType;
      }
      static hashStruct(name, types, value) {
          return TypedDataEncoder.from(types).hashStruct(name, value);
      }
      static hashDomain(domain) {
          const domainFields = [];
          for (const name in domain) {
              const type = domainFieldTypes[name];
              if (!type) {
                  logger$a.throwArgumentError(`invalid typed-data domain key: ${JSON.stringify(name)}`, "domain", domain);
              }
              domainFields.push({ name, type });
          }
          domainFields.sort((a, b) => {
              return domainFieldNames.indexOf(a.name) - domainFieldNames.indexOf(b.name);
          });
          return TypedDataEncoder.hashStruct("EIP712Domain", { EIP712Domain: domainFields }, domain);
      }
      static encode(domain, types, value) {
          return hexConcat([
              "0x1901",
              TypedDataEncoder.hashDomain(domain),
              TypedDataEncoder.from(types).hash(value)
          ]);
      }
      static hash(domain, types, value) {
          return keccak256(TypedDataEncoder.encode(domain, types, value));
      }
      // Replaces all address types with ENS names with their looked up address
      static resolveNames(domain, types, value, resolveName) {
          return __awaiter$6(this, void 0, void 0, function* () {
              // Make a copy to isolate it from the object passed in
              domain = shallowCopy(domain);
              // Look up all ENS names
              const ensCache = {};
              // Do we need to look up the domain's verifyingContract?
              if (domain.verifyingContract && !isHexString(domain.verifyingContract, 20)) {
                  ensCache[domain.verifyingContract] = "0x";
              }
              // We are going to use the encoder to visit all the base values
              const encoder = TypedDataEncoder.from(types);
              // Get a list of all the addresses
              encoder.visit(value, (type, value) => {
                  if (type === "address" && !isHexString(value, 20)) {
                      ensCache[value] = "0x";
                  }
                  return value;
              });
              // Lookup each name
              for (const name in ensCache) {
                  ensCache[name] = yield resolveName(name);
              }
              // Replace the domain verifyingContract if needed
              if (domain.verifyingContract && ensCache[domain.verifyingContract]) {
                  domain.verifyingContract = ensCache[domain.verifyingContract];
              }
              // Replace all ENS names with their address
              value = encoder.visit(value, (type, value) => {
                  if (type === "address" && ensCache[value]) {
                      return ensCache[value];
                  }
                  return value;
              });
              return { domain, value };
          });
      }
      static getPayload(domain, types, value) {
          // Validate the domain fields
          TypedDataEncoder.hashDomain(domain);
          // Derive the EIP712Domain Struct reference type
          const domainValues = {};
          const domainTypes = [];
          domainFieldNames.forEach((name) => {
              const value = domain[name];
              if (value == null) {
                  return;
              }
              domainValues[name] = domainChecks[name](value);
              domainTypes.push({ name, type: domainFieldTypes[name] });
          });
          const encoder = TypedDataEncoder.from(types);
          const typesWithDomain = shallowCopy(types);
          if (typesWithDomain.EIP712Domain) {
              logger$a.throwArgumentError("types must not contain EIP712Domain type", "types.EIP712Domain", types);
          }
          else {
              typesWithDomain.EIP712Domain = domainTypes;
          }
          // Validate the data structures and types
          encoder.encode(value);
          return {
              types: typesWithDomain,
              domain: domainValues,
              primaryType: encoder.primaryType,
              message: encoder.visit(value, (type, value) => {
                  // bytes
                  if (type.match(/^bytes(\d*)/)) {
                      return hexlify(arrayify(value));
                  }
                  // uint or int
                  if (type.match(/^u?int/)) {
                      return BigNumber.from(value).toString();
                  }
                  switch (type) {
                      case "address":
                          return value.toLowerCase();
                      case "bool":
                          return !!value;
                      case "string":
                          if (typeof (value) !== "string") {
                              logger$a.throwArgumentError(`invalid string`, "value", value);
                          }
                          return value;
                  }
                  return logger$a.throwArgumentError("unsupported type", "type", type);
              })
          };
      }
  }

  const version$7 = "abstract-provider/5.5.1";

  var __awaiter$5 = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  const logger$9 = new Logger(version$7);
  //export type CallTransactionable = {
  //    call(transaction: TransactionRequest): Promise<TransactionResponse>;
  //};
  class ForkEvent extends Description {
      static isForkEvent(value) {
          return !!(value && value._isForkEvent);
      }
  }
  ///////////////////////////////
  // Exported Abstracts
  class Provider {
      constructor() {
          logger$9.checkAbstract(new.target, Provider);
          defineReadOnly(this, "_isProvider", true);
      }
      getFeeData() {
          return __awaiter$5(this, void 0, void 0, function* () {
              const { block, gasPrice } = yield resolveProperties({
                  block: this.getBlock("latest"),
                  gasPrice: this.getGasPrice().catch((error) => {
                      // @TODO: Why is this now failing on Calaveras?
                      //console.log(error);
                      return null;
                  })
              });
              let maxFeePerGas = null, maxPriorityFeePerGas = null;
              if (block && block.baseFeePerGas) {
                  // We may want to compute this more accurately in the future,
                  // using the formula "check if the base fee is correct".
                  // See: https://eips.ethereum.org/EIPS/eip-1559
                  maxPriorityFeePerGas = BigNumber.from("2500000000");
                  maxFeePerGas = block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas);
              }
              return { maxFeePerGas, maxPriorityFeePerGas, gasPrice };
          });
      }
      // Alias for "on"
      addListener(eventName, listener) {
          return this.on(eventName, listener);
      }
      // Alias for "off"
      removeListener(eventName, listener) {
          return this.off(eventName, listener);
      }
      static isProvider(value) {
          return !!(value && value._isProvider);
      }
  }

  const version$6 = "abstract-signer/5.5.0";

  var __awaiter$4 = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  const logger$8 = new Logger(version$6);
  const allowedTransactionKeys$1 = [
      "accessList", "chainId", "customData", "data", "from", "gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "to", "type", "value"
  ];
  const forwardErrors = [
      Logger.errors.INSUFFICIENT_FUNDS,
      Logger.errors.NONCE_EXPIRED,
      Logger.errors.REPLACEMENT_UNDERPRICED,
  ];
  class Signer {
      ///////////////////
      // Sub-classes MUST call super
      constructor() {
          logger$8.checkAbstract(new.target, Signer);
          defineReadOnly(this, "_isSigner", true);
      }
      ///////////////////
      // Sub-classes MAY override these
      getBalance(blockTag) {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("getBalance");
              return yield this.provider.getBalance(this.getAddress(), blockTag);
          });
      }
      getTransactionCount(blockTag) {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("getTransactionCount");
              return yield this.provider.getTransactionCount(this.getAddress(), blockTag);
          });
      }
      // Populates "from" if unspecified, and estimates the gas for the transaction
      estimateGas(transaction) {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("estimateGas");
              const tx = yield resolveProperties(this.checkTransaction(transaction));
              return yield this.provider.estimateGas(tx);
          });
      }
      // Populates "from" if unspecified, and calls with the transaction
      call(transaction, blockTag) {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("call");
              const tx = yield resolveProperties(this.checkTransaction(transaction));
              return yield this.provider.call(tx, blockTag);
          });
      }
      // Populates all fields in a transaction, signs it and sends it to the network
      sendTransaction(transaction) {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("sendTransaction");
              const tx = yield this.populateTransaction(transaction);
              const signedTx = yield this.signTransaction(tx);
              return yield this.provider.sendTransaction(signedTx);
          });
      }
      getChainId() {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("getChainId");
              const network = yield this.provider.getNetwork();
              return network.chainId;
          });
      }
      getGasPrice() {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("getGasPrice");
              return yield this.provider.getGasPrice();
          });
      }
      getFeeData() {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("getFeeData");
              return yield this.provider.getFeeData();
          });
      }
      resolveName(name) {
          return __awaiter$4(this, void 0, void 0, function* () {
              this._checkProvider("resolveName");
              return yield this.provider.resolveName(name);
          });
      }
      // Checks a transaction does not contain invalid keys and if
      // no "from" is provided, populates it.
      // - does NOT require a provider
      // - adds "from" is not present
      // - returns a COPY (safe to mutate the result)
      // By default called from: (overriding these prevents it)
      //   - call
      //   - estimateGas
      //   - populateTransaction (and therefor sendTransaction)
      checkTransaction(transaction) {
          for (const key in transaction) {
              if (allowedTransactionKeys$1.indexOf(key) === -1) {
                  logger$8.throwArgumentError("invalid transaction key: " + key, "transaction", transaction);
              }
          }
          const tx = shallowCopy(transaction);
          if (tx.from == null) {
              tx.from = this.getAddress();
          }
          else {
              // Make sure any provided address matches this signer
              tx.from = Promise.all([
                  Promise.resolve(tx.from),
                  this.getAddress()
              ]).then((result) => {
                  if (result[0].toLowerCase() !== result[1].toLowerCase()) {
                      logger$8.throwArgumentError("from address mismatch", "transaction", transaction);
                  }
                  return result[0];
              });
          }
          return tx;
      }
      // Populates ALL keys for a transaction and checks that "from" matches
      // this Signer. Should be used by sendTransaction but NOT by signTransaction.
      // By default called from: (overriding these prevents it)
      //   - sendTransaction
      //
      // Notes:
      //  - We allow gasPrice for EIP-1559 as long as it matches maxFeePerGas
      populateTransaction(transaction) {
          return __awaiter$4(this, void 0, void 0, function* () {
              const tx = yield resolveProperties(this.checkTransaction(transaction));
              if (tx.to != null) {
                  tx.to = Promise.resolve(tx.to).then((to) => __awaiter$4(this, void 0, void 0, function* () {
                      if (to == null) {
                          return null;
                      }
                      const address = yield this.resolveName(to);
                      if (address == null) {
                          logger$8.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
                      }
                      return address;
                  }));
                  // Prevent this error from causing an UnhandledPromiseException
                  tx.to.catch((error) => { });
              }
              // Do not allow mixing pre-eip-1559 and eip-1559 properties
              const hasEip1559 = (tx.maxFeePerGas != null || tx.maxPriorityFeePerGas != null);
              if (tx.gasPrice != null && (tx.type === 2 || hasEip1559)) {
                  logger$8.throwArgumentError("eip-1559 transaction do not support gasPrice", "transaction", transaction);
              }
              else if ((tx.type === 0 || tx.type === 1) && hasEip1559) {
                  logger$8.throwArgumentError("pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas", "transaction", transaction);
              }
              if ((tx.type === 2 || tx.type == null) && (tx.maxFeePerGas != null && tx.maxPriorityFeePerGas != null)) {
                  // Fully-formed EIP-1559 transaction (skip getFeeData)
                  tx.type = 2;
              }
              else if (tx.type === 0 || tx.type === 1) {
                  // Explicit Legacy or EIP-2930 transaction
                  // Populate missing gasPrice
                  if (tx.gasPrice == null) {
                      tx.gasPrice = this.getGasPrice();
                  }
              }
              else {
                  // We need to get fee data to determine things
                  const feeData = yield this.getFeeData();
                  if (tx.type == null) {
                      // We need to auto-detect the intended type of this transaction...
                      if (feeData.maxFeePerGas != null && feeData.maxPriorityFeePerGas != null) {
                          // The network supports EIP-1559!
                          // Upgrade transaction from null to eip-1559
                          tx.type = 2;
                          if (tx.gasPrice != null) {
                              // Using legacy gasPrice property on an eip-1559 network,
                              // so use gasPrice as both fee properties
                              const gasPrice = tx.gasPrice;
                              delete tx.gasPrice;
                              tx.maxFeePerGas = gasPrice;
                              tx.maxPriorityFeePerGas = gasPrice;
                          }
                          else {
                              // Populate missing fee data
                              if (tx.maxFeePerGas == null) {
                                  tx.maxFeePerGas = feeData.maxFeePerGas;
                              }
                              if (tx.maxPriorityFeePerGas == null) {
                                  tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
                              }
                          }
                      }
                      else if (feeData.gasPrice != null) {
                          // Network doesn't support EIP-1559...
                          // ...but they are trying to use EIP-1559 properties
                          if (hasEip1559) {
                              logger$8.throwError("network does not support EIP-1559", Logger.errors.UNSUPPORTED_OPERATION, {
                                  operation: "populateTransaction"
                              });
                          }
                          // Populate missing fee data
                          if (tx.gasPrice == null) {
                              tx.gasPrice = feeData.gasPrice;
                          }
                          // Explicitly set untyped transaction to legacy
                          tx.type = 0;
                      }
                      else {
                          // getFeeData has failed us.
                          logger$8.throwError("failed to get consistent fee data", Logger.errors.UNSUPPORTED_OPERATION, {
                              operation: "signer.getFeeData"
                          });
                      }
                  }
                  else if (tx.type === 2) {
                      // Explicitly using EIP-1559
                      // Populate missing fee data
                      if (tx.maxFeePerGas == null) {
                          tx.maxFeePerGas = feeData.maxFeePerGas;
                      }
                      if (tx.maxPriorityFeePerGas == null) {
                          tx.maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
                      }
                  }
              }
              if (tx.nonce == null) {
                  tx.nonce = this.getTransactionCount("pending");
              }
              if (tx.gasLimit == null) {
                  tx.gasLimit = this.estimateGas(tx).catch((error) => {
                      if (forwardErrors.indexOf(error.code) >= 0) {
                          throw error;
                      }
                      return logger$8.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
                          error: error,
                          tx: tx
                      });
                  });
              }
              if (tx.chainId == null) {
                  tx.chainId = this.getChainId();
              }
              else {
                  tx.chainId = Promise.all([
                      Promise.resolve(tx.chainId),
                      this.getChainId()
                  ]).then((results) => {
                      if (results[1] !== 0 && results[0] !== results[1]) {
                          logger$8.throwArgumentError("chainId address mismatch", "transaction", transaction);
                      }
                      return results[0];
                  });
              }
              return yield resolveProperties(tx);
          });
      }
      ///////////////////
      // Sub-classes SHOULD leave these alone
      _checkProvider(operation) {
          if (!this.provider) {
              logger$8.throwError("missing provider", Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: (operation || "_checkProvider")
              });
          }
      }
      static isSigner(value) {
          return !!(value && value._isSigner);
      }
  }

  var hash$1 = {};

  var utils$9 = {};

  var minimalisticAssert$1 = assert$b;

  function assert$b(val, msg) {
    if (!val)
      throw new Error(msg || 'Assertion failed');
  }

  assert$b.equal = function assertEqual(l, r, msg) {
    if (l != r)
      throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
  };

  var inherits$1 = {exports: {}};

  var inherits_browser$1 = {exports: {}};

  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    inherits_browser$1.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    // old school shim for old browsers
    inherits_browser$1.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }

  try {
    var util = require('util');
    /* istanbul ignore next */
    if (typeof util.inherits !== 'function') throw '';
    inherits$1.exports = util.inherits;
  } catch (e) {
    /* istanbul ignore next */
    inherits$1.exports = inherits_browser$1.exports;
  }

  var assert$a = minimalisticAssert$1;
  var inherits = inherits$1.exports;

  utils$9.inherits = inherits;

  function isSurrogatePair(msg, i) {
    if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
      return false;
    }
    if (i < 0 || i + 1 >= msg.length) {
      return false;
    }
    return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
  }

  function toArray(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg === 'string') {
      if (!enc) {
        // Inspired by stringToUtf8ByteArray() in closure-library by Google
        // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
        // Apache License 2.0
        // https://github.com/google/closure-library/blob/master/LICENSE
        var p = 0;
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          if (c < 128) {
            res[p++] = c;
          } else if (c < 2048) {
            res[p++] = (c >> 6) | 192;
            res[p++] = (c & 63) | 128;
          } else if (isSurrogatePair(msg, i)) {
            c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
            res[p++] = (c >> 18) | 240;
            res[p++] = ((c >> 12) & 63) | 128;
            res[p++] = ((c >> 6) & 63) | 128;
            res[p++] = (c & 63) | 128;
          } else {
            res[p++] = (c >> 12) | 224;
            res[p++] = ((c >> 6) & 63) | 128;
            res[p++] = (c & 63) | 128;
          }
        }
      } else if (enc === 'hex') {
        msg = msg.replace(/[^a-z0-9]+/ig, '');
        if (msg.length % 2 !== 0)
          msg = '0' + msg;
        for (i = 0; i < msg.length; i += 2)
          res.push(parseInt(msg[i] + msg[i + 1], 16));
      }
    } else {
      for (i = 0; i < msg.length; i++)
        res[i] = msg[i] | 0;
    }
    return res;
  }
  utils$9.toArray = toArray;

  function toHex(msg) {
    var res = '';
    for (var i = 0; i < msg.length; i++)
      res += zero2(msg[i].toString(16));
    return res;
  }
  utils$9.toHex = toHex;

  function htonl(w) {
    var res = (w >>> 24) |
              ((w >>> 8) & 0xff00) |
              ((w << 8) & 0xff0000) |
              ((w & 0xff) << 24);
    return res >>> 0;
  }
  utils$9.htonl = htonl;

  function toHex32(msg, endian) {
    var res = '';
    for (var i = 0; i < msg.length; i++) {
      var w = msg[i];
      if (endian === 'little')
        w = htonl(w);
      res += zero8(w.toString(16));
    }
    return res;
  }
  utils$9.toHex32 = toHex32;

  function zero2(word) {
    if (word.length === 1)
      return '0' + word;
    else
      return word;
  }
  utils$9.zero2 = zero2;

  function zero8(word) {
    if (word.length === 7)
      return '0' + word;
    else if (word.length === 6)
      return '00' + word;
    else if (word.length === 5)
      return '000' + word;
    else if (word.length === 4)
      return '0000' + word;
    else if (word.length === 3)
      return '00000' + word;
    else if (word.length === 2)
      return '000000' + word;
    else if (word.length === 1)
      return '0000000' + word;
    else
      return word;
  }
  utils$9.zero8 = zero8;

  function join32(msg, start, end, endian) {
    var len = end - start;
    assert$a(len % 4 === 0);
    var res = new Array(len / 4);
    for (var i = 0, k = start; i < res.length; i++, k += 4) {
      var w;
      if (endian === 'big')
        w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
      else
        w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
      res[i] = w >>> 0;
    }
    return res;
  }
  utils$9.join32 = join32;

  function split32(msg, endian) {
    var res = new Array(msg.length * 4);
    for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
      var m = msg[i];
      if (endian === 'big') {
        res[k] = m >>> 24;
        res[k + 1] = (m >>> 16) & 0xff;
        res[k + 2] = (m >>> 8) & 0xff;
        res[k + 3] = m & 0xff;
      } else {
        res[k + 3] = m >>> 24;
        res[k + 2] = (m >>> 16) & 0xff;
        res[k + 1] = (m >>> 8) & 0xff;
        res[k] = m & 0xff;
      }
    }
    return res;
  }
  utils$9.split32 = split32;

  function rotr32$1(w, b) {
    return (w >>> b) | (w << (32 - b));
  }
  utils$9.rotr32 = rotr32$1;

  function rotl32$2(w, b) {
    return (w << b) | (w >>> (32 - b));
  }
  utils$9.rotl32 = rotl32$2;

  function sum32$3(a, b) {
    return (a + b) >>> 0;
  }
  utils$9.sum32 = sum32$3;

  function sum32_3$1(a, b, c) {
    return (a + b + c) >>> 0;
  }
  utils$9.sum32_3 = sum32_3$1;

  function sum32_4$2(a, b, c, d) {
    return (a + b + c + d) >>> 0;
  }
  utils$9.sum32_4 = sum32_4$2;

  function sum32_5$2(a, b, c, d, e) {
    return (a + b + c + d + e) >>> 0;
  }
  utils$9.sum32_5 = sum32_5$2;

  function sum64$1(buf, pos, ah, al) {
    var bh = buf[pos];
    var bl = buf[pos + 1];

    var lo = (al + bl) >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    buf[pos] = hi >>> 0;
    buf[pos + 1] = lo;
  }
  utils$9.sum64 = sum64$1;

  function sum64_hi$1(ah, al, bh, bl) {
    var lo = (al + bl) >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    return hi >>> 0;
  }
  utils$9.sum64_hi = sum64_hi$1;

  function sum64_lo$1(ah, al, bh, bl) {
    var lo = al + bl;
    return lo >>> 0;
  }
  utils$9.sum64_lo = sum64_lo$1;

  function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
    var carry = 0;
    var lo = al;
    lo = (lo + bl) >>> 0;
    carry += lo < al ? 1 : 0;
    lo = (lo + cl) >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = (lo + dl) >>> 0;
    carry += lo < dl ? 1 : 0;

    var hi = ah + bh + ch + dh + carry;
    return hi >>> 0;
  }
  utils$9.sum64_4_hi = sum64_4_hi$1;

  function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
    var lo = al + bl + cl + dl;
    return lo >>> 0;
  }
  utils$9.sum64_4_lo = sum64_4_lo$1;

  function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var carry = 0;
    var lo = al;
    lo = (lo + bl) >>> 0;
    carry += lo < al ? 1 : 0;
    lo = (lo + cl) >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = (lo + dl) >>> 0;
    carry += lo < dl ? 1 : 0;
    lo = (lo + el) >>> 0;
    carry += lo < el ? 1 : 0;

    var hi = ah + bh + ch + dh + eh + carry;
    return hi >>> 0;
  }
  utils$9.sum64_5_hi = sum64_5_hi$1;

  function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var lo = al + bl + cl + dl + el;

    return lo >>> 0;
  }
  utils$9.sum64_5_lo = sum64_5_lo$1;

  function rotr64_hi$1(ah, al, num) {
    var r = (al << (32 - num)) | (ah >>> num);
    return r >>> 0;
  }
  utils$9.rotr64_hi = rotr64_hi$1;

  function rotr64_lo$1(ah, al, num) {
    var r = (ah << (32 - num)) | (al >>> num);
    return r >>> 0;
  }
  utils$9.rotr64_lo = rotr64_lo$1;

  function shr64_hi$1(ah, al, num) {
    return ah >>> num;
  }
  utils$9.shr64_hi = shr64_hi$1;

  function shr64_lo$1(ah, al, num) {
    var r = (ah << (32 - num)) | (al >>> num);
    return r >>> 0;
  }
  utils$9.shr64_lo = shr64_lo$1;

  var common$5 = {};

  var utils$8 = utils$9;
  var assert$9 = minimalisticAssert$1;

  function BlockHash$4() {
    this.pending = null;
    this.pendingTotal = 0;
    this.blockSize = this.constructor.blockSize;
    this.outSize = this.constructor.outSize;
    this.hmacStrength = this.constructor.hmacStrength;
    this.padLength = this.constructor.padLength / 8;
    this.endian = 'big';

    this._delta8 = this.blockSize / 8;
    this._delta32 = this.blockSize / 32;
  }
  common$5.BlockHash = BlockHash$4;

  BlockHash$4.prototype.update = function update(msg, enc) {
    // Convert message to array, pad it, and join into 32bit blocks
    msg = utils$8.toArray(msg, enc);
    if (!this.pending)
      this.pending = msg;
    else
      this.pending = this.pending.concat(msg);
    this.pendingTotal += msg.length;

    // Enough data, try updating
    if (this.pending.length >= this._delta8) {
      msg = this.pending;

      // Process pending data in blocks
      var r = msg.length % this._delta8;
      this.pending = msg.slice(msg.length - r, msg.length);
      if (this.pending.length === 0)
        this.pending = null;

      msg = utils$8.join32(msg, 0, msg.length - r, this.endian);
      for (var i = 0; i < msg.length; i += this._delta32)
        this._update(msg, i, i + this._delta32);
    }

    return this;
  };

  BlockHash$4.prototype.digest = function digest(enc) {
    this.update(this._pad());
    assert$9(this.pending === null);

    return this._digest(enc);
  };

  BlockHash$4.prototype._pad = function pad() {
    var len = this.pendingTotal;
    var bytes = this._delta8;
    var k = bytes - ((len + this.padLength) % bytes);
    var res = new Array(k + this.padLength);
    res[0] = 0x80;
    for (var i = 1; i < k; i++)
      res[i] = 0;

    // Append length
    len <<= 3;
    if (this.endian === 'big') {
      for (var t = 8; t < this.padLength; t++)
        res[i++] = 0;

      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = (len >>> 24) & 0xff;
      res[i++] = (len >>> 16) & 0xff;
      res[i++] = (len >>> 8) & 0xff;
      res[i++] = len & 0xff;
    } else {
      res[i++] = len & 0xff;
      res[i++] = (len >>> 8) & 0xff;
      res[i++] = (len >>> 16) & 0xff;
      res[i++] = (len >>> 24) & 0xff;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;

      for (t = 8; t < this.padLength; t++)
        res[i++] = 0;
    }

    return res;
  };

  var sha = {};

  var common$4 = {};

  var utils$7 = utils$9;
  var rotr32 = utils$7.rotr32;

  function ft_1$1(s, x, y, z) {
    if (s === 0)
      return ch32$1(x, y, z);
    if (s === 1 || s === 3)
      return p32(x, y, z);
    if (s === 2)
      return maj32$1(x, y, z);
  }
  common$4.ft_1 = ft_1$1;

  function ch32$1(x, y, z) {
    return (x & y) ^ ((~x) & z);
  }
  common$4.ch32 = ch32$1;

  function maj32$1(x, y, z) {
    return (x & y) ^ (x & z) ^ (y & z);
  }
  common$4.maj32 = maj32$1;

  function p32(x, y, z) {
    return x ^ y ^ z;
  }
  common$4.p32 = p32;

  function s0_256$1(x) {
    return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
  }
  common$4.s0_256 = s0_256$1;

  function s1_256$1(x) {
    return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
  }
  common$4.s1_256 = s1_256$1;

  function g0_256$1(x) {
    return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
  }
  common$4.g0_256 = g0_256$1;

  function g1_256$1(x) {
    return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
  }
  common$4.g1_256 = g1_256$1;

  var utils$6 = utils$9;
  var common$3 = common$5;
  var shaCommon$1 = common$4;

  var rotl32$1 = utils$6.rotl32;
  var sum32$2 = utils$6.sum32;
  var sum32_5$1 = utils$6.sum32_5;
  var ft_1 = shaCommon$1.ft_1;
  var BlockHash$3 = common$3.BlockHash;

  var sha1_K = [
    0x5A827999, 0x6ED9EBA1,
    0x8F1BBCDC, 0xCA62C1D6
  ];

  function SHA1() {
    if (!(this instanceof SHA1))
      return new SHA1();

    BlockHash$3.call(this);
    this.h = [
      0x67452301, 0xefcdab89, 0x98badcfe,
      0x10325476, 0xc3d2e1f0 ];
    this.W = new Array(80);
  }

  utils$6.inherits(SHA1, BlockHash$3);
  var _1 = SHA1;

  SHA1.blockSize = 512;
  SHA1.outSize = 160;
  SHA1.hmacStrength = 80;
  SHA1.padLength = 64;

  SHA1.prototype._update = function _update(msg, start) {
    var W = this.W;

    for (var i = 0; i < 16; i++)
      W[i] = msg[start + i];

    for(; i < W.length; i++)
      W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];

    for (i = 0; i < W.length; i++) {
      var s = ~~(i / 20);
      var t = sum32_5$1(rotl32$1(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
      e = d;
      d = c;
      c = rotl32$1(b, 30);
      b = a;
      a = t;
    }

    this.h[0] = sum32$2(this.h[0], a);
    this.h[1] = sum32$2(this.h[1], b);
    this.h[2] = sum32$2(this.h[2], c);
    this.h[3] = sum32$2(this.h[3], d);
    this.h[4] = sum32$2(this.h[4], e);
  };

  SHA1.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$6.toHex32(this.h, 'big');
    else
      return utils$6.split32(this.h, 'big');
  };

  var utils$5 = utils$9;
  var common$2 = common$5;
  var shaCommon = common$4;
  var assert$8 = minimalisticAssert$1;

  var sum32$1 = utils$5.sum32;
  var sum32_4$1 = utils$5.sum32_4;
  var sum32_5 = utils$5.sum32_5;
  var ch32 = shaCommon.ch32;
  var maj32 = shaCommon.maj32;
  var s0_256 = shaCommon.s0_256;
  var s1_256 = shaCommon.s1_256;
  var g0_256 = shaCommon.g0_256;
  var g1_256 = shaCommon.g1_256;

  var BlockHash$2 = common$2.BlockHash;

  var sha256_K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function SHA256$1() {
    if (!(this instanceof SHA256$1))
      return new SHA256$1();

    BlockHash$2.call(this);
    this.h = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    this.k = sha256_K;
    this.W = new Array(64);
  }
  utils$5.inherits(SHA256$1, BlockHash$2);
  var _256 = SHA256$1;

  SHA256$1.blockSize = 512;
  SHA256$1.outSize = 256;
  SHA256$1.hmacStrength = 192;
  SHA256$1.padLength = 64;

  SHA256$1.prototype._update = function _update(msg, start) {
    var W = this.W;

    for (var i = 0; i < 16; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i++)
      W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

    var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];
    var f = this.h[5];
    var g = this.h[6];
    var h = this.h[7];

    assert$8(this.k.length === W.length);
    for (i = 0; i < W.length; i++) {
      var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
      var T2 = sum32$1(s0_256(a), maj32(a, b, c));
      h = g;
      g = f;
      f = e;
      e = sum32$1(d, T1);
      d = c;
      c = b;
      b = a;
      a = sum32$1(T1, T2);
    }

    this.h[0] = sum32$1(this.h[0], a);
    this.h[1] = sum32$1(this.h[1], b);
    this.h[2] = sum32$1(this.h[2], c);
    this.h[3] = sum32$1(this.h[3], d);
    this.h[4] = sum32$1(this.h[4], e);
    this.h[5] = sum32$1(this.h[5], f);
    this.h[6] = sum32$1(this.h[6], g);
    this.h[7] = sum32$1(this.h[7], h);
  };

  SHA256$1.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$5.toHex32(this.h, 'big');
    else
      return utils$5.split32(this.h, 'big');
  };

  var utils$4 = utils$9;
  var SHA256 = _256;

  function SHA224() {
    if (!(this instanceof SHA224))
      return new SHA224();

    SHA256.call(this);
    this.h = [
      0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
      0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
  }
  utils$4.inherits(SHA224, SHA256);
  var _224 = SHA224;

  SHA224.blockSize = 512;
  SHA224.outSize = 224;
  SHA224.hmacStrength = 192;
  SHA224.padLength = 64;

  SHA224.prototype._digest = function digest(enc) {
    // Just truncate output
    if (enc === 'hex')
      return utils$4.toHex32(this.h.slice(0, 7), 'big');
    else
      return utils$4.split32(this.h.slice(0, 7), 'big');
  };

  var utils$3 = utils$9;
  var common$1 = common$5;
  var assert$7 = minimalisticAssert$1;

  var rotr64_hi = utils$3.rotr64_hi;
  var rotr64_lo = utils$3.rotr64_lo;
  var shr64_hi = utils$3.shr64_hi;
  var shr64_lo = utils$3.shr64_lo;
  var sum64 = utils$3.sum64;
  var sum64_hi = utils$3.sum64_hi;
  var sum64_lo = utils$3.sum64_lo;
  var sum64_4_hi = utils$3.sum64_4_hi;
  var sum64_4_lo = utils$3.sum64_4_lo;
  var sum64_5_hi = utils$3.sum64_5_hi;
  var sum64_5_lo = utils$3.sum64_5_lo;

  var BlockHash$1 = common$1.BlockHash;

  var sha512_K = [
    0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
    0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
    0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
    0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
    0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
    0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
    0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
    0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
    0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
    0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
    0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
    0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
    0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
    0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
    0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
    0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
    0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
    0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
    0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
    0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
    0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
    0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
    0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
    0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
    0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
    0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
    0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
    0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
    0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
    0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
    0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
    0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
    0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
    0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
    0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
    0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
    0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
  ];

  function SHA512$1() {
    if (!(this instanceof SHA512$1))
      return new SHA512$1();

    BlockHash$1.call(this);
    this.h = [
      0x6a09e667, 0xf3bcc908,
      0xbb67ae85, 0x84caa73b,
      0x3c6ef372, 0xfe94f82b,
      0xa54ff53a, 0x5f1d36f1,
      0x510e527f, 0xade682d1,
      0x9b05688c, 0x2b3e6c1f,
      0x1f83d9ab, 0xfb41bd6b,
      0x5be0cd19, 0x137e2179 ];
    this.k = sha512_K;
    this.W = new Array(160);
  }
  utils$3.inherits(SHA512$1, BlockHash$1);
  var _512 = SHA512$1;

  SHA512$1.blockSize = 1024;
  SHA512$1.outSize = 512;
  SHA512$1.hmacStrength = 192;
  SHA512$1.padLength = 128;

  SHA512$1.prototype._prepareBlock = function _prepareBlock(msg, start) {
    var W = this.W;

    // 32 x 32bit words
    for (var i = 0; i < 32; i++)
      W[i] = msg[start + i];
    for (; i < W.length; i += 2) {
      var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
      var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
      var c1_hi = W[i - 14];  // i - 7
      var c1_lo = W[i - 13];
      var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
      var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
      var c3_hi = W[i - 32];  // i - 16
      var c3_lo = W[i - 31];

      W[i] = sum64_4_hi(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo);
      W[i + 1] = sum64_4_lo(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo);
    }
  };

  SHA512$1.prototype._update = function _update(msg, start) {
    this._prepareBlock(msg, start);

    var W = this.W;

    var ah = this.h[0];
    var al = this.h[1];
    var bh = this.h[2];
    var bl = this.h[3];
    var ch = this.h[4];
    var cl = this.h[5];
    var dh = this.h[6];
    var dl = this.h[7];
    var eh = this.h[8];
    var el = this.h[9];
    var fh = this.h[10];
    var fl = this.h[11];
    var gh = this.h[12];
    var gl = this.h[13];
    var hh = this.h[14];
    var hl = this.h[15];

    assert$7(this.k.length === W.length);
    for (var i = 0; i < W.length; i += 2) {
      var c0_hi = hh;
      var c0_lo = hl;
      var c1_hi = s1_512_hi(eh, el);
      var c1_lo = s1_512_lo(eh, el);
      var c2_hi = ch64_hi(eh, el, fh, fl, gh);
      var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
      var c3_hi = this.k[i];
      var c3_lo = this.k[i + 1];
      var c4_hi = W[i];
      var c4_lo = W[i + 1];

      var T1_hi = sum64_5_hi(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo,
        c4_hi, c4_lo);
      var T1_lo = sum64_5_lo(
        c0_hi, c0_lo,
        c1_hi, c1_lo,
        c2_hi, c2_lo,
        c3_hi, c3_lo,
        c4_hi, c4_lo);

      c0_hi = s0_512_hi(ah, al);
      c0_lo = s0_512_lo(ah, al);
      c1_hi = maj64_hi(ah, al, bh, bl, ch);
      c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

      var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
      var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

      hh = gh;
      hl = gl;

      gh = fh;
      gl = fl;

      fh = eh;
      fl = el;

      eh = sum64_hi(dh, dl, T1_hi, T1_lo);
      el = sum64_lo(dl, dl, T1_hi, T1_lo);

      dh = ch;
      dl = cl;

      ch = bh;
      cl = bl;

      bh = ah;
      bl = al;

      ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
      al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
    }

    sum64(this.h, 0, ah, al);
    sum64(this.h, 2, bh, bl);
    sum64(this.h, 4, ch, cl);
    sum64(this.h, 6, dh, dl);
    sum64(this.h, 8, eh, el);
    sum64(this.h, 10, fh, fl);
    sum64(this.h, 12, gh, gl);
    sum64(this.h, 14, hh, hl);
  };

  SHA512$1.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$3.toHex32(this.h, 'big');
    else
      return utils$3.split32(this.h, 'big');
  };

  function ch64_hi(xh, xl, yh, yl, zh) {
    var r = (xh & yh) ^ ((~xh) & zh);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function ch64_lo(xh, xl, yh, yl, zh, zl) {
    var r = (xl & yl) ^ ((~xl) & zl);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function maj64_hi(xh, xl, yh, yl, zh) {
    var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function maj64_lo(xh, xl, yh, yl, zh, zl) {
    var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 28);
    var c1_hi = rotr64_hi(xl, xh, 2);  // 34
    var c2_hi = rotr64_hi(xl, xh, 7);  // 39

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 28);
    var c1_lo = rotr64_lo(xl, xh, 2);  // 34
    var c2_lo = rotr64_lo(xl, xh, 7);  // 39

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 14);
    var c1_hi = rotr64_hi(xh, xl, 18);
    var c2_hi = rotr64_hi(xl, xh, 9);  // 41

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function s1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 14);
    var c1_lo = rotr64_lo(xh, xl, 18);
    var c2_lo = rotr64_lo(xl, xh, 9);  // 41

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g0_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 1);
    var c1_hi = rotr64_hi(xh, xl, 8);
    var c2_hi = shr64_hi(xh, xl, 7);

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g0_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 1);
    var c1_lo = rotr64_lo(xh, xl, 8);
    var c2_lo = shr64_lo(xh, xl, 7);

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g1_512_hi(xh, xl) {
    var c0_hi = rotr64_hi(xh, xl, 19);
    var c1_hi = rotr64_hi(xl, xh, 29);  // 61
    var c2_hi = shr64_hi(xh, xl, 6);

    var r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  function g1_512_lo(xh, xl) {
    var c0_lo = rotr64_lo(xh, xl, 19);
    var c1_lo = rotr64_lo(xl, xh, 29);  // 61
    var c2_lo = shr64_lo(xh, xl, 6);

    var r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
      r += 0x100000000;
    return r;
  }

  var utils$2 = utils$9;

  var SHA512 = _512;

  function SHA384() {
    if (!(this instanceof SHA384))
      return new SHA384();

    SHA512.call(this);
    this.h = [
      0xcbbb9d5d, 0xc1059ed8,
      0x629a292a, 0x367cd507,
      0x9159015a, 0x3070dd17,
      0x152fecd8, 0xf70e5939,
      0x67332667, 0xffc00b31,
      0x8eb44a87, 0x68581511,
      0xdb0c2e0d, 0x64f98fa7,
      0x47b5481d, 0xbefa4fa4 ];
  }
  utils$2.inherits(SHA384, SHA512);
  var _384 = SHA384;

  SHA384.blockSize = 1024;
  SHA384.outSize = 384;
  SHA384.hmacStrength = 192;
  SHA384.padLength = 128;

  SHA384.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$2.toHex32(this.h.slice(0, 12), 'big');
    else
      return utils$2.split32(this.h.slice(0, 12), 'big');
  };

  sha.sha1 = _1;
  sha.sha224 = _224;
  sha.sha256 = _256;
  sha.sha384 = _384;
  sha.sha512 = _512;

  var ripemd = {};

  var utils$1 = utils$9;
  var common = common$5;

  var rotl32 = utils$1.rotl32;
  var sum32 = utils$1.sum32;
  var sum32_3 = utils$1.sum32_3;
  var sum32_4 = utils$1.sum32_4;
  var BlockHash = common.BlockHash;

  function RIPEMD160() {
    if (!(this instanceof RIPEMD160))
      return new RIPEMD160();

    BlockHash.call(this);

    this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
    this.endian = 'little';
  }
  utils$1.inherits(RIPEMD160, BlockHash);
  ripemd.ripemd160 = RIPEMD160;

  RIPEMD160.blockSize = 512;
  RIPEMD160.outSize = 160;
  RIPEMD160.hmacStrength = 192;
  RIPEMD160.padLength = 64;

  RIPEMD160.prototype._update = function update(msg, start) {
    var A = this.h[0];
    var B = this.h[1];
    var C = this.h[2];
    var D = this.h[3];
    var E = this.h[4];
    var Ah = A;
    var Bh = B;
    var Ch = C;
    var Dh = D;
    var Eh = E;
    for (var j = 0; j < 80; j++) {
      var T = sum32(
        rotl32(
          sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
          s[j]),
        E);
      A = E;
      E = D;
      D = rotl32(C, 10);
      C = B;
      B = T;
      T = sum32(
        rotl32(
          sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
          sh[j]),
        Eh);
      Ah = Eh;
      Eh = Dh;
      Dh = rotl32(Ch, 10);
      Ch = Bh;
      Bh = T;
    }
    T = sum32_3(this.h[1], C, Dh);
    this.h[1] = sum32_3(this.h[2], D, Eh);
    this.h[2] = sum32_3(this.h[3], E, Ah);
    this.h[3] = sum32_3(this.h[4], A, Bh);
    this.h[4] = sum32_3(this.h[0], B, Ch);
    this.h[0] = T;
  };

  RIPEMD160.prototype._digest = function digest(enc) {
    if (enc === 'hex')
      return utils$1.toHex32(this.h, 'little');
    else
      return utils$1.split32(this.h, 'little');
  };

  function f(j, x, y, z) {
    if (j <= 15)
      return x ^ y ^ z;
    else if (j <= 31)
      return (x & y) | ((~x) & z);
    else if (j <= 47)
      return (x | (~y)) ^ z;
    else if (j <= 63)
      return (x & z) | (y & (~z));
    else
      return x ^ (y | (~z));
  }

  function K(j) {
    if (j <= 15)
      return 0x00000000;
    else if (j <= 31)
      return 0x5a827999;
    else if (j <= 47)
      return 0x6ed9eba1;
    else if (j <= 63)
      return 0x8f1bbcdc;
    else
      return 0xa953fd4e;
  }

  function Kh(j) {
    if (j <= 15)
      return 0x50a28be6;
    else if (j <= 31)
      return 0x5c4dd124;
    else if (j <= 47)
      return 0x6d703ef3;
    else if (j <= 63)
      return 0x7a6d76e9;
    else
      return 0x00000000;
  }

  var r = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
    3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
    1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
    4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
  ];

  var rh = [
    5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
    6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
    15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
    8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
    12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
  ];

  var s = [
    11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
    7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
    11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
    11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
    9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
  ];

  var sh = [
    8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
    9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
    9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
    15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
    8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
  ];

  var utils = utils$9;
  var assert$6 = minimalisticAssert$1;

  function Hmac(hash, key, enc) {
    if (!(this instanceof Hmac))
      return new Hmac(hash, key, enc);
    this.Hash = hash;
    this.blockSize = hash.blockSize / 8;
    this.outSize = hash.outSize / 8;
    this.inner = null;
    this.outer = null;

    this._init(utils.toArray(key, enc));
  }
  var hmac = Hmac;

  Hmac.prototype._init = function init(key) {
    // Shorten key, if needed
    if (key.length > this.blockSize)
      key = new this.Hash().update(key).digest();
    assert$6(key.length <= this.blockSize);

    // Add padding to key
    for (var i = key.length; i < this.blockSize; i++)
      key.push(0);

    for (i = 0; i < key.length; i++)
      key[i] ^= 0x36;
    this.inner = new this.Hash().update(key);

    // 0x36 ^ 0x5c = 0x6a
    for (i = 0; i < key.length; i++)
      key[i] ^= 0x6a;
    this.outer = new this.Hash().update(key);
  };

  Hmac.prototype.update = function update(msg, enc) {
    this.inner.update(msg, enc);
    return this;
  };

  Hmac.prototype.digest = function digest(enc) {
    this.outer.update(this.inner.digest());
    return this.outer.digest(enc);
  };

  (function (exports) {
  var hash = exports;

  hash.utils = utils$9;
  hash.common = common$5;
  hash.sha = sha;
  hash.ripemd = ripemd;
  hash.hmac = hmac;

  // Proxy hash functions to the main object
  hash.sha1 = hash.sha.sha1;
  hash.sha256 = hash.sha.sha256;
  hash.sha224 = hash.sha.sha224;
  hash.sha384 = hash.sha.sha384;
  hash.sha512 = hash.sha.sha512;
  hash.ripemd160 = hash.ripemd.ripemd160;
  }(hash$1));

  var hash = hash$1;

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  		path: basedir,
  		exports: {},
  		require: function (path, base) {
  			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
  		}
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var minimalisticAssert = assert;

  function assert(val, msg) {
    if (!val)
      throw new Error(msg || 'Assertion failed');
  }

  assert.equal = function assertEqual(l, r, msg) {
    if (l != r)
      throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
  };

  var utils_1 = createCommonjsModule(function (module, exports) {

  var utils = exports;

  function toArray(msg, enc) {
    if (Array.isArray(msg))
      return msg.slice();
    if (!msg)
      return [];
    var res = [];
    if (typeof msg !== 'string') {
      for (var i = 0; i < msg.length; i++)
        res[i] = msg[i] | 0;
      return res;
    }
    if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (var i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    } else {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    }
    return res;
  }
  utils.toArray = toArray;

  function zero2(word) {
    if (word.length === 1)
      return '0' + word;
    else
      return word;
  }
  utils.zero2 = zero2;

  function toHex(msg) {
    var res = '';
    for (var i = 0; i < msg.length; i++)
      res += zero2(msg[i].toString(16));
    return res;
  }
  utils.toHex = toHex;

  utils.encode = function encode(arr, enc) {
    if (enc === 'hex')
      return toHex(arr);
    else
      return arr;
  };
  });

  var utils_1$1 = createCommonjsModule(function (module, exports) {

  var utils = exports;




  utils.assert = minimalisticAssert;
  utils.toArray = utils_1.toArray;
  utils.zero2 = utils_1.zero2;
  utils.toHex = utils_1.toHex;
  utils.encode = utils_1.encode;

  // Represent num in a w-NAF form
  function getNAF(num, w, bits) {
    var naf = new Array(Math.max(num.bitLength(), bits) + 1);
    naf.fill(0);

    var ws = 1 << (w + 1);
    var k = num.clone();

    for (var i = 0; i < naf.length; i++) {
      var z;
      var mod = k.andln(ws - 1);
      if (k.isOdd()) {
        if (mod > (ws >> 1) - 1)
          z = (ws >> 1) - mod;
        else
          z = mod;
        k.isubn(z);
      } else {
        z = 0;
      }

      naf[i] = z;
      k.iushrn(1);
    }

    return naf;
  }
  utils.getNAF = getNAF;

  // Represent k1, k2 in a Joint Sparse Form
  function getJSF(k1, k2) {
    var jsf = [
      [],
      [],
    ];

    k1 = k1.clone();
    k2 = k2.clone();
    var d1 = 0;
    var d2 = 0;
    var m8;
    while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {
      // First phase
      var m14 = (k1.andln(3) + d1) & 3;
      var m24 = (k2.andln(3) + d2) & 3;
      if (m14 === 3)
        m14 = -1;
      if (m24 === 3)
        m24 = -1;
      var u1;
      if ((m14 & 1) === 0) {
        u1 = 0;
      } else {
        m8 = (k1.andln(7) + d1) & 7;
        if ((m8 === 3 || m8 === 5) && m24 === 2)
          u1 = -m14;
        else
          u1 = m14;
      }
      jsf[0].push(u1);

      var u2;
      if ((m24 & 1) === 0) {
        u2 = 0;
      } else {
        m8 = (k2.andln(7) + d2) & 7;
        if ((m8 === 3 || m8 === 5) && m14 === 2)
          u2 = -m24;
        else
          u2 = m24;
      }
      jsf[1].push(u2);

      // Second phase
      if (2 * d1 === u1 + 1)
        d1 = 1 - d1;
      if (2 * d2 === u2 + 1)
        d2 = 1 - d2;
      k1.iushrn(1);
      k2.iushrn(1);
    }

    return jsf;
  }
  utils.getJSF = getJSF;

  function cachedProperty(obj, name, computer) {
    var key = '_' + name;
    obj.prototype[name] = function cachedProperty() {
      return this[key] !== undefined ? this[key] :
        this[key] = computer.call(this);
    };
  }
  utils.cachedProperty = cachedProperty;

  function parseBytes(bytes) {
    return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
      bytes;
  }
  utils.parseBytes = parseBytes;

  function intFromLE(bytes) {
    return new BN$1(bytes, 'hex', 'le');
  }
  utils.intFromLE = intFromLE;
  });



  var getNAF = utils_1$1.getNAF;
  var getJSF = utils_1$1.getJSF;
  var assert$1 = utils_1$1.assert;

  function BaseCurve(type, conf) {
    this.type = type;
    this.p = new BN$1(conf.p, 16);

    // Use Montgomery, when there is no fast reduction for the prime
    this.red = conf.prime ? BN$1.red(conf.prime) : BN$1.mont(this.p);

    // Useful for many curves
    this.zero = new BN$1(0).toRed(this.red);
    this.one = new BN$1(1).toRed(this.red);
    this.two = new BN$1(2).toRed(this.red);

    // Curve configuration, optional
    this.n = conf.n && new BN$1(conf.n, 16);
    this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

    // Temporary arrays
    this._wnafT1 = new Array(4);
    this._wnafT2 = new Array(4);
    this._wnafT3 = new Array(4);
    this._wnafT4 = new Array(4);

    this._bitLength = this.n ? this.n.bitLength() : 0;

    // Generalized Greg Maxwell's trick
    var adjustCount = this.n && this.p.div(this.n);
    if (!adjustCount || adjustCount.cmpn(100) > 0) {
      this.redN = null;
    } else {
      this._maxwellTrick = true;
      this.redN = this.n.toRed(this.red);
    }
  }
  var base = BaseCurve;

  BaseCurve.prototype.point = function point() {
    throw new Error('Not implemented');
  };

  BaseCurve.prototype.validate = function validate() {
    throw new Error('Not implemented');
  };

  BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
    assert$1(p.precomputed);
    var doubles = p._getDoubles();

    var naf = getNAF(k, 1, this._bitLength);
    var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
    I /= 3;

    // Translate into more windowed form
    var repr = [];
    var j;
    var nafW;
    for (j = 0; j < naf.length; j += doubles.step) {
      nafW = 0;
      for (var l = j + doubles.step - 1; l >= j; l--)
        nafW = (nafW << 1) + naf[l];
      repr.push(nafW);
    }

    var a = this.jpoint(null, null, null);
    var b = this.jpoint(null, null, null);
    for (var i = I; i > 0; i--) {
      for (j = 0; j < repr.length; j++) {
        nafW = repr[j];
        if (nafW === i)
          b = b.mixedAdd(doubles.points[j]);
        else if (nafW === -i)
          b = b.mixedAdd(doubles.points[j].neg());
      }
      a = a.add(b);
    }
    return a.toP();
  };

  BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
    var w = 4;

    // Precompute window
    var nafPoints = p._getNAFPoints(w);
    w = nafPoints.wnd;
    var wnd = nafPoints.points;

    // Get NAF form
    var naf = getNAF(k, w, this._bitLength);

    // Add `this`*(N+1) for every w-NAF index
    var acc = this.jpoint(null, null, null);
    for (var i = naf.length - 1; i >= 0; i--) {
      // Count zeroes
      for (var l = 0; i >= 0 && naf[i] === 0; i--)
        l++;
      if (i >= 0)
        l++;
      acc = acc.dblp(l);

      if (i < 0)
        break;
      var z = naf[i];
      assert$1(z !== 0);
      if (p.type === 'affine') {
        // J +- P
        if (z > 0)
          acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
        else
          acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
      } else {
        // J +- J
        if (z > 0)
          acc = acc.add(wnd[(z - 1) >> 1]);
        else
          acc = acc.add(wnd[(-z - 1) >> 1].neg());
      }
    }
    return p.type === 'affine' ? acc.toP() : acc;
  };

  BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
    points,
    coeffs,
    len,
    jacobianResult) {
    var wndWidth = this._wnafT1;
    var wnd = this._wnafT2;
    var naf = this._wnafT3;

    // Fill all arrays
    var max = 0;
    var i;
    var j;
    var p;
    for (i = 0; i < len; i++) {
      p = points[i];
      var nafPoints = p._getNAFPoints(defW);
      wndWidth[i] = nafPoints.wnd;
      wnd[i] = nafPoints.points;
    }

    // Comb small window NAFs
    for (i = len - 1; i >= 1; i -= 2) {
      var a = i - 1;
      var b = i;
      if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
        naf[a] = getNAF(coeffs[a], wndWidth[a], this._bitLength);
        naf[b] = getNAF(coeffs[b], wndWidth[b], this._bitLength);
        max = Math.max(naf[a].length, max);
        max = Math.max(naf[b].length, max);
        continue;
      }

      var comb = [
        points[a], /* 1 */
        null, /* 3 */
        null, /* 5 */
        points[b], /* 7 */
      ];

      // Try to avoid Projective points, if possible
      if (points[a].y.cmp(points[b].y) === 0) {
        comb[1] = points[a].add(points[b]);
        comb[2] = points[a].toJ().mixedAdd(points[b].neg());
      } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
        comb[1] = points[a].toJ().mixedAdd(points[b]);
        comb[2] = points[a].add(points[b].neg());
      } else {
        comb[1] = points[a].toJ().mixedAdd(points[b]);
        comb[2] = points[a].toJ().mixedAdd(points[b].neg());
      }

      var index = [
        -3, /* -1 -1 */
        -1, /* -1 0 */
        -5, /* -1 1 */
        -7, /* 0 -1 */
        0, /* 0 0 */
        7, /* 0 1 */
        5, /* 1 -1 */
        1, /* 1 0 */
        3,  /* 1 1 */
      ];

      var jsf = getJSF(coeffs[a], coeffs[b]);
      max = Math.max(jsf[0].length, max);
      naf[a] = new Array(max);
      naf[b] = new Array(max);
      for (j = 0; j < max; j++) {
        var ja = jsf[0][j] | 0;
        var jb = jsf[1][j] | 0;

        naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
        naf[b][j] = 0;
        wnd[a] = comb;
      }
    }

    var acc = this.jpoint(null, null, null);
    var tmp = this._wnafT4;
    for (i = max; i >= 0; i--) {
      var k = 0;

      while (i >= 0) {
        var zero = true;
        for (j = 0; j < len; j++) {
          tmp[j] = naf[j][i] | 0;
          if (tmp[j] !== 0)
            zero = false;
        }
        if (!zero)
          break;
        k++;
        i--;
      }
      if (i >= 0)
        k++;
      acc = acc.dblp(k);
      if (i < 0)
        break;

      for (j = 0; j < len; j++) {
        var z = tmp[j];
        if (z === 0)
          continue;
        else if (z > 0)
          p = wnd[j][(z - 1) >> 1];
        else if (z < 0)
          p = wnd[j][(-z - 1) >> 1].neg();

        if (p.type === 'affine')
          acc = acc.mixedAdd(p);
        else
          acc = acc.add(p);
      }
    }
    // Zeroify references
    for (i = 0; i < len; i++)
      wnd[i] = null;

    if (jacobianResult)
      return acc;
    else
      return acc.toP();
  };

  function BasePoint(curve, type) {
    this.curve = curve;
    this.type = type;
    this.precomputed = null;
  }
  BaseCurve.BasePoint = BasePoint;

  BasePoint.prototype.eq = function eq(/*other*/) {
    throw new Error('Not implemented');
  };

  BasePoint.prototype.validate = function validate() {
    return this.curve.validate(this);
  };

  BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
    bytes = utils_1$1.toArray(bytes, enc);

    var len = this.p.byteLength();

    // uncompressed, hybrid-odd, hybrid-even
    if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
        bytes.length - 1 === 2 * len) {
      if (bytes[0] === 0x06)
        assert$1(bytes[bytes.length - 1] % 2 === 0);
      else if (bytes[0] === 0x07)
        assert$1(bytes[bytes.length - 1] % 2 === 1);

      var res =  this.point(bytes.slice(1, 1 + len),
        bytes.slice(1 + len, 1 + 2 * len));

      return res;
    } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
                bytes.length - 1 === len) {
      return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
    }
    throw new Error('Unknown point format');
  };

  BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
    return this.encode(enc, true);
  };

  BasePoint.prototype._encode = function _encode(compact) {
    var len = this.curve.p.byteLength();
    var x = this.getX().toArray('be', len);

    if (compact)
      return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

    return [ 0x04 ].concat(x, this.getY().toArray('be', len));
  };

  BasePoint.prototype.encode = function encode(enc, compact) {
    return utils_1$1.encode(this._encode(compact), enc);
  };

  BasePoint.prototype.precompute = function precompute(power) {
    if (this.precomputed)
      return this;

    var precomputed = {
      doubles: null,
      naf: null,
      beta: null,
    };
    precomputed.naf = this._getNAFPoints(8);
    precomputed.doubles = this._getDoubles(4, power);
    precomputed.beta = this._getBeta();
    this.precomputed = precomputed;

    return this;
  };

  BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
    if (!this.precomputed)
      return false;

    var doubles = this.precomputed.doubles;
    if (!doubles)
      return false;

    return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
  };

  BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;

    var doubles = [ this ];
    var acc = this;
    for (var i = 0; i < power; i += step) {
      for (var j = 0; j < step; j++)
        acc = acc.dbl();
      doubles.push(acc);
    }
    return {
      step: step,
      points: doubles,
    };
  };

  BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;

    var res = [ this ];
    var max = (1 << wnd) - 1;
    var dbl = max === 1 ? null : this.dbl();
    for (var i = 1; i < max; i++)
      res[i] = res[i - 1].add(dbl);
    return {
      wnd: wnd,
      points: res,
    };
  };

  BasePoint.prototype._getBeta = function _getBeta() {
    return null;
  };

  BasePoint.prototype.dblp = function dblp(k) {
    var r = this;
    for (var i = 0; i < k; i++)
      r = r.dbl();
    return r;
  };

  var inherits_browser = createCommonjsModule(function (module) {
  if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function () {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
  });






  var assert$2 = utils_1$1.assert;

  function ShortCurve(conf) {
    base.call(this, 'short', conf);

    this.a = new BN$1(conf.a, 16).toRed(this.red);
    this.b = new BN$1(conf.b, 16).toRed(this.red);
    this.tinv = this.two.redInvm();

    this.zeroA = this.a.fromRed().cmpn(0) === 0;
    this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

    // If the curve is endomorphic, precalculate beta and lambda
    this.endo = this._getEndomorphism(conf);
    this._endoWnafT1 = new Array(4);
    this._endoWnafT2 = new Array(4);
  }
  inherits_browser(ShortCurve, base);
  var short_1 = ShortCurve;

  ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
    // No efficient endomorphism
    if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
      return;

    // Compute beta and lambda, that lambda * P = (beta * Px; Py)
    var beta;
    var lambda;
    if (conf.beta) {
      beta = new BN$1(conf.beta, 16).toRed(this.red);
    } else {
      var betas = this._getEndoRoots(this.p);
      // Choose the smallest beta
      beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
      beta = beta.toRed(this.red);
    }
    if (conf.lambda) {
      lambda = new BN$1(conf.lambda, 16);
    } else {
      // Choose the lambda that is matching selected beta
      var lambdas = this._getEndoRoots(this.n);
      if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
        lambda = lambdas[0];
      } else {
        lambda = lambdas[1];
        assert$2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
      }
    }

    // Get basis vectors, used for balanced length-two representation
    var basis;
    if (conf.basis) {
      basis = conf.basis.map(function(vec) {
        return {
          a: new BN$1(vec.a, 16),
          b: new BN$1(vec.b, 16),
        };
      });
    } else {
      basis = this._getEndoBasis(lambda);
    }

    return {
      beta: beta,
      lambda: lambda,
      basis: basis,
    };
  };

  ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
    // Find roots of for x^2 + x + 1 in F
    // Root = (-1 +- Sqrt(-3)) / 2
    //
    var red = num === this.p ? this.red : BN$1.mont(num);
    var tinv = new BN$1(2).toRed(red).redInvm();
    var ntinv = tinv.redNeg();

    var s = new BN$1(3).toRed(red).redNeg().redSqrt().redMul(tinv);

    var l1 = ntinv.redAdd(s).fromRed();
    var l2 = ntinv.redSub(s).fromRed();
    return [ l1, l2 ];
  };

  ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
    // aprxSqrt >= sqrt(this.n)
    var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

    // 3.74
    // Run EGCD, until r(L + 1) < aprxSqrt
    var u = lambda;
    var v = this.n.clone();
    var x1 = new BN$1(1);
    var y1 = new BN$1(0);
    var x2 = new BN$1(0);
    var y2 = new BN$1(1);

    // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
    var a0;
    var b0;
    // First vector
    var a1;
    var b1;
    // Second vector
    var a2;
    var b2;

    var prevR;
    var i = 0;
    var r;
    var x;
    while (u.cmpn(0) !== 0) {
      var q = v.div(u);
      r = v.sub(q.mul(u));
      x = x2.sub(q.mul(x1));
      var y = y2.sub(q.mul(y1));

      if (!a1 && r.cmp(aprxSqrt) < 0) {
        a0 = prevR.neg();
        b0 = x1;
        a1 = r.neg();
        b1 = x;
      } else if (a1 && ++i === 2) {
        break;
      }
      prevR = r;

      v = u;
      u = r;
      x2 = x1;
      x1 = x;
      y2 = y1;
      y1 = y;
    }
    a2 = r.neg();
    b2 = x;

    var len1 = a1.sqr().add(b1.sqr());
    var len2 = a2.sqr().add(b2.sqr());
    if (len2.cmp(len1) >= 0) {
      a2 = a0;
      b2 = b0;
    }

    // Normalize signs
    if (a1.negative) {
      a1 = a1.neg();
      b1 = b1.neg();
    }
    if (a2.negative) {
      a2 = a2.neg();
      b2 = b2.neg();
    }

    return [
      { a: a1, b: b1 },
      { a: a2, b: b2 },
    ];
  };

  ShortCurve.prototype._endoSplit = function _endoSplit(k) {
    var basis = this.endo.basis;
    var v1 = basis[0];
    var v2 = basis[1];

    var c1 = v2.b.mul(k).divRound(this.n);
    var c2 = v1.b.neg().mul(k).divRound(this.n);

    var p1 = c1.mul(v1.a);
    var p2 = c2.mul(v2.a);
    var q1 = c1.mul(v1.b);
    var q2 = c2.mul(v2.b);

    // Calculate answer
    var k1 = k.sub(p1).sub(p2);
    var k2 = q1.add(q2).neg();
    return { k1: k1, k2: k2 };
  };

  ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
    x = new BN$1(x, 16);
    if (!x.red)
      x = x.toRed(this.red);

    var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
    var y = y2.redSqrt();
    if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
      throw new Error('invalid point');

    // XXX Is there any way to tell if the number is odd without converting it
    // to non-red form?
    var isOdd = y.fromRed().isOdd();
    if (odd && !isOdd || !odd && isOdd)
      y = y.redNeg();

    return this.point(x, y);
  };

  ShortCurve.prototype.validate = function validate(point) {
    if (point.inf)
      return true;

    var x = point.x;
    var y = point.y;

    var ax = this.a.redMul(x);
    var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
    return y.redSqr().redISub(rhs).cmpn(0) === 0;
  };

  ShortCurve.prototype._endoWnafMulAdd =
      function _endoWnafMulAdd(points, coeffs, jacobianResult) {
        var npoints = this._endoWnafT1;
        var ncoeffs = this._endoWnafT2;
        for (var i = 0; i < points.length; i++) {
          var split = this._endoSplit(coeffs[i]);
          var p = points[i];
          var beta = p._getBeta();

          if (split.k1.negative) {
            split.k1.ineg();
            p = p.neg(true);
          }
          if (split.k2.negative) {
            split.k2.ineg();
            beta = beta.neg(true);
          }

          npoints[i * 2] = p;
          npoints[i * 2 + 1] = beta;
          ncoeffs[i * 2] = split.k1;
          ncoeffs[i * 2 + 1] = split.k2;
        }
        var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

        // Clean-up references to points and coefficients
        for (var j = 0; j < i * 2; j++) {
          npoints[j] = null;
          ncoeffs[j] = null;
        }
        return res;
      };

  function Point(curve, x, y, isRed) {
    base.BasePoint.call(this, curve, 'affine');
    if (x === null && y === null) {
      this.x = null;
      this.y = null;
      this.inf = true;
    } else {
      this.x = new BN$1(x, 16);
      this.y = new BN$1(y, 16);
      // Force redgomery representation when loading from JSON
      if (isRed) {
        this.x.forceRed(this.curve.red);
        this.y.forceRed(this.curve.red);
      }
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      this.inf = false;
    }
  }
  inherits_browser(Point, base.BasePoint);

  ShortCurve.prototype.point = function point(x, y, isRed) {
    return new Point(this, x, y, isRed);
  };

  ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
    return Point.fromJSON(this, obj, red);
  };

  Point.prototype._getBeta = function _getBeta() {
    if (!this.curve.endo)
      return;

    var pre = this.precomputed;
    if (pre && pre.beta)
      return pre.beta;

    var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
    if (pre) {
      var curve = this.curve;
      var endoMul = function(p) {
        return curve.point(p.x.redMul(curve.endo.beta), p.y);
      };
      pre.beta = beta;
      beta.precomputed = {
        beta: null,
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: pre.naf.points.map(endoMul),
        },
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: pre.doubles.points.map(endoMul),
        },
      };
    }
    return beta;
  };

  Point.prototype.toJSON = function toJSON() {
    if (!this.precomputed)
      return [ this.x, this.y ];

    return [ this.x, this.y, this.precomputed && {
      doubles: this.precomputed.doubles && {
        step: this.precomputed.doubles.step,
        points: this.precomputed.doubles.points.slice(1),
      },
      naf: this.precomputed.naf && {
        wnd: this.precomputed.naf.wnd,
        points: this.precomputed.naf.points.slice(1),
      },
    } ];
  };

  Point.fromJSON = function fromJSON(curve, obj, red) {
    if (typeof obj === 'string')
      obj = JSON.parse(obj);
    var res = curve.point(obj[0], obj[1], red);
    if (!obj[2])
      return res;

    function obj2point(obj) {
      return curve.point(obj[0], obj[1], red);
    }

    var pre = obj[2];
    res.precomputed = {
      beta: null,
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: [ res ].concat(pre.doubles.points.map(obj2point)),
      },
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: [ res ].concat(pre.naf.points.map(obj2point)),
      },
    };
    return res;
  };

  Point.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return '<EC Point Infinity>';
    return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
        ' y: ' + this.y.fromRed().toString(16, 2) + '>';
  };

  Point.prototype.isInfinity = function isInfinity() {
    return this.inf;
  };

  Point.prototype.add = function add(p) {
    // O + P = P
    if (this.inf)
      return p;

    // P + O = P
    if (p.inf)
      return this;

    // P + P = 2P
    if (this.eq(p))
      return this.dbl();

    // P + (-P) = O
    if (this.neg().eq(p))
      return this.curve.point(null, null);

    // P + Q = O
    if (this.x.cmp(p.x) === 0)
      return this.curve.point(null, null);

    var c = this.y.redSub(p.y);
    if (c.cmpn(0) !== 0)
      c = c.redMul(this.x.redSub(p.x).redInvm());
    var nx = c.redSqr().redISub(this.x).redISub(p.x);
    var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
    return this.curve.point(nx, ny);
  };

  Point.prototype.dbl = function dbl() {
    if (this.inf)
      return this;

    // 2P = O
    var ys1 = this.y.redAdd(this.y);
    if (ys1.cmpn(0) === 0)
      return this.curve.point(null, null);

    var a = this.curve.a;

    var x2 = this.x.redSqr();
    var dyinv = ys1.redInvm();
    var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

    var nx = c.redSqr().redISub(this.x.redAdd(this.x));
    var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
    return this.curve.point(nx, ny);
  };

  Point.prototype.getX = function getX() {
    return this.x.fromRed();
  };

  Point.prototype.getY = function getY() {
    return this.y.fromRed();
  };

  Point.prototype.mul = function mul(k) {
    k = new BN$1(k, 16);
    if (this.isInfinity())
      return this;
    else if (this._hasDoubles(k))
      return this.curve._fixedNafMul(this, k);
    else if (this.curve.endo)
      return this.curve._endoWnafMulAdd([ this ], [ k ]);
    else
      return this.curve._wnafMul(this, k);
  };

  Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
    var points = [ this, p2 ];
    var coeffs = [ k1, k2 ];
    if (this.curve.endo)
      return this.curve._endoWnafMulAdd(points, coeffs);
    else
      return this.curve._wnafMulAdd(1, points, coeffs, 2);
  };

  Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
    var points = [ this, p2 ];
    var coeffs = [ k1, k2 ];
    if (this.curve.endo)
      return this.curve._endoWnafMulAdd(points, coeffs, true);
    else
      return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
  };

  Point.prototype.eq = function eq(p) {
    return this === p ||
           this.inf === p.inf &&
               (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
  };

  Point.prototype.neg = function neg(_precompute) {
    if (this.inf)
      return this;

    var res = this.curve.point(this.x, this.y.redNeg());
    if (_precompute && this.precomputed) {
      var pre = this.precomputed;
      var negate = function(p) {
        return p.neg();
      };
      res.precomputed = {
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: pre.naf.points.map(negate),
        },
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: pre.doubles.points.map(negate),
        },
      };
    }
    return res;
  };

  Point.prototype.toJ = function toJ() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);

    var res = this.curve.jpoint(this.x, this.y, this.curve.one);
    return res;
  };

  function JPoint(curve, x, y, z) {
    base.BasePoint.call(this, curve, 'jacobian');
    if (x === null && y === null && z === null) {
      this.x = this.curve.one;
      this.y = this.curve.one;
      this.z = new BN$1(0);
    } else {
      this.x = new BN$1(x, 16);
      this.y = new BN$1(y, 16);
      this.z = new BN$1(z, 16);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);

    this.zOne = this.z === this.curve.one;
  }
  inherits_browser(JPoint, base.BasePoint);

  ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
    return new JPoint(this, x, y, z);
  };

  JPoint.prototype.toP = function toP() {
    if (this.isInfinity())
      return this.curve.point(null, null);

    var zinv = this.z.redInvm();
    var zinv2 = zinv.redSqr();
    var ax = this.x.redMul(zinv2);
    var ay = this.y.redMul(zinv2).redMul(zinv);

    return this.curve.point(ax, ay);
  };

  JPoint.prototype.neg = function neg() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  };

  JPoint.prototype.add = function add(p) {
    // O + P = P
    if (this.isInfinity())
      return p;

    // P + O = P
    if (p.isInfinity())
      return this;

    // 12M + 4S + 7A
    var pz2 = p.z.redSqr();
    var z2 = this.z.redSqr();
    var u1 = this.x.redMul(pz2);
    var u2 = p.x.redMul(z2);
    var s1 = this.y.redMul(pz2.redMul(p.z));
    var s2 = p.y.redMul(z2.redMul(this.z));

    var h = u1.redSub(u2);
    var r = s1.redSub(s2);
    if (h.cmpn(0) === 0) {
      if (r.cmpn(0) !== 0)
        return this.curve.jpoint(null, null, null);
      else
        return this.dbl();
    }

    var h2 = h.redSqr();
    var h3 = h2.redMul(h);
    var v = u1.redMul(h2);

    var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
    var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
    var nz = this.z.redMul(p.z).redMul(h);

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype.mixedAdd = function mixedAdd(p) {
    // O + P = P
    if (this.isInfinity())
      return p.toJ();

    // P + O = P
    if (p.isInfinity())
      return this;

    // 8M + 3S + 7A
    var z2 = this.z.redSqr();
    var u1 = this.x;
    var u2 = p.x.redMul(z2);
    var s1 = this.y;
    var s2 = p.y.redMul(z2).redMul(this.z);

    var h = u1.redSub(u2);
    var r = s1.redSub(s2);
    if (h.cmpn(0) === 0) {
      if (r.cmpn(0) !== 0)
        return this.curve.jpoint(null, null, null);
      else
        return this.dbl();
    }

    var h2 = h.redSqr();
    var h3 = h2.redMul(h);
    var v = u1.redMul(h2);

    var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
    var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
    var nz = this.z.redMul(h);

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype.dblp = function dblp(pow) {
    if (pow === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!pow)
      return this.dbl();

    var i;
    if (this.curve.zeroA || this.curve.threeA) {
      var r = this;
      for (i = 0; i < pow; i++)
        r = r.dbl();
      return r;
    }

    // 1M + 2S + 1A + N * (4S + 5M + 8A)
    // N = 1 => 6M + 6S + 9A
    var a = this.curve.a;
    var tinv = this.curve.tinv;

    var jx = this.x;
    var jy = this.y;
    var jz = this.z;
    var jz4 = jz.redSqr().redSqr();

    // Reuse results
    var jyd = jy.redAdd(jy);
    for (i = 0; i < pow; i++) {
      var jx2 = jx.redSqr();
      var jyd2 = jyd.redSqr();
      var jyd4 = jyd2.redSqr();
      var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

      var t1 = jx.redMul(jyd2);
      var nx = c.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var dny = c.redMul(t2);
      dny = dny.redIAdd(dny).redISub(jyd4);
      var nz = jyd.redMul(jz);
      if (i + 1 < pow)
        jz4 = jz4.redMul(jyd4);

      jx = nx;
      jz = nz;
      jyd = dny;
    }

    return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
  };

  JPoint.prototype.dbl = function dbl() {
    if (this.isInfinity())
      return this;

    if (this.curve.zeroA)
      return this._zeroDbl();
    else if (this.curve.threeA)
      return this._threeDbl();
    else
      return this._dbl();
  };

  JPoint.prototype._zeroDbl = function _zeroDbl() {
    var nx;
    var ny;
    var nz;
    // Z = 1
    if (this.zOne) {
      // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
      //     #doubling-mdbl-2007-bl
      // 1M + 5S + 14A

      // XX = X1^2
      var xx = this.x.redSqr();
      // YY = Y1^2
      var yy = this.y.redSqr();
      // YYYY = YY^2
      var yyyy = yy.redSqr();
      // S = 2 * ((X1 + YY)^2 - XX - YYYY)
      var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      s = s.redIAdd(s);
      // M = 3 * XX + a; a = 0
      var m = xx.redAdd(xx).redIAdd(xx);
      // T = M ^ 2 - 2*S
      var t = m.redSqr().redISub(s).redISub(s);

      // 8 * YYYY
      var yyyy8 = yyyy.redIAdd(yyyy);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      yyyy8 = yyyy8.redIAdd(yyyy8);

      // X3 = T
      nx = t;
      // Y3 = M * (S - T) - 8 * YYYY
      ny = m.redMul(s.redISub(t)).redISub(yyyy8);
      // Z3 = 2*Y1
      nz = this.y.redAdd(this.y);
    } else {
      // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
      //     #doubling-dbl-2009-l
      // 2M + 5S + 13A

      // A = X1^2
      var a = this.x.redSqr();
      // B = Y1^2
      var b = this.y.redSqr();
      // C = B^2
      var c = b.redSqr();
      // D = 2 * ((X1 + B)^2 - A - C)
      var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
      d = d.redIAdd(d);
      // E = 3 * A
      var e = a.redAdd(a).redIAdd(a);
      // F = E^2
      var f = e.redSqr();

      // 8 * C
      var c8 = c.redIAdd(c);
      c8 = c8.redIAdd(c8);
      c8 = c8.redIAdd(c8);

      // X3 = F - 2 * D
      nx = f.redISub(d).redISub(d);
      // Y3 = E * (D - X3) - 8 * C
      ny = e.redMul(d.redISub(nx)).redISub(c8);
      // Z3 = 2 * Y1 * Z1
      nz = this.y.redMul(this.z);
      nz = nz.redIAdd(nz);
    }

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype._threeDbl = function _threeDbl() {
    var nx;
    var ny;
    var nz;
    // Z = 1
    if (this.zOne) {
      // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
      //     #doubling-mdbl-2007-bl
      // 1M + 5S + 15A

      // XX = X1^2
      var xx = this.x.redSqr();
      // YY = Y1^2
      var yy = this.y.redSqr();
      // YYYY = YY^2
      var yyyy = yy.redSqr();
      // S = 2 * ((X1 + YY)^2 - XX - YYYY)
      var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      s = s.redIAdd(s);
      // M = 3 * XX + a
      var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
      // T = M^2 - 2 * S
      var t = m.redSqr().redISub(s).redISub(s);
      // X3 = T
      nx = t;
      // Y3 = M * (S - T) - 8 * YYYY
      var yyyy8 = yyyy.redIAdd(yyyy);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      yyyy8 = yyyy8.redIAdd(yyyy8);
      ny = m.redMul(s.redISub(t)).redISub(yyyy8);
      // Z3 = 2 * Y1
      nz = this.y.redAdd(this.y);
    } else {
      // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
      // 3M + 5S

      // delta = Z1^2
      var delta = this.z.redSqr();
      // gamma = Y1^2
      var gamma = this.y.redSqr();
      // beta = X1 * gamma
      var beta = this.x.redMul(gamma);
      // alpha = 3 * (X1 - delta) * (X1 + delta)
      var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
      alpha = alpha.redAdd(alpha).redIAdd(alpha);
      // X3 = alpha^2 - 8 * beta
      var beta4 = beta.redIAdd(beta);
      beta4 = beta4.redIAdd(beta4);
      var beta8 = beta4.redAdd(beta4);
      nx = alpha.redSqr().redISub(beta8);
      // Z3 = (Y1 + Z1)^2 - gamma - delta
      nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
      // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
      var ggamma8 = gamma.redSqr();
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ggamma8 = ggamma8.redIAdd(ggamma8);
      ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
    }

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype._dbl = function _dbl() {
    var a = this.curve.a;

    // 4M + 6S + 10A
    var jx = this.x;
    var jy = this.y;
    var jz = this.z;
    var jz4 = jz.redSqr().redSqr();

    var jx2 = jx.redSqr();
    var jy2 = jy.redSqr();

    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var jxd4 = jx.redAdd(jx);
    jxd4 = jxd4.redIAdd(jxd4);
    var t1 = jxd4.redMul(jy2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);

    var jyd8 = jy2.redSqr();
    jyd8 = jyd8.redIAdd(jyd8);
    jyd8 = jyd8.redIAdd(jyd8);
    jyd8 = jyd8.redIAdd(jyd8);
    var ny = c.redMul(t2).redISub(jyd8);
    var nz = jy.redAdd(jy).redMul(jz);

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype.trpl = function trpl() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);

    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
    // 5M + 10S + ...

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // ZZ = Z1^2
    var zz = this.z.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // M = 3 * XX + a * ZZ2; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // MM = M^2
    var mm = m.redSqr();
    // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
    var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    e = e.redIAdd(e);
    e = e.redAdd(e).redIAdd(e);
    e = e.redISub(mm);
    // EE = E^2
    var ee = e.redSqr();
    // T = 16*YYYY
    var t = yyyy.redIAdd(yyyy);
    t = t.redIAdd(t);
    t = t.redIAdd(t);
    t = t.redIAdd(t);
    // U = (M + E)^2 - MM - EE - T
    var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
    // X3 = 4 * (X1 * EE - 4 * YY * U)
    var yyu4 = yy.redMul(u);
    yyu4 = yyu4.redIAdd(yyu4);
    yyu4 = yyu4.redIAdd(yyu4);
    var nx = this.x.redMul(ee).redISub(yyu4);
    nx = nx.redIAdd(nx);
    nx = nx.redIAdd(nx);
    // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
    var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
    ny = ny.redIAdd(ny);
    ny = ny.redIAdd(ny);
    ny = ny.redIAdd(ny);
    // Z3 = (Z1 + E)^2 - ZZ - EE
    var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

    return this.curve.jpoint(nx, ny, nz);
  };

  JPoint.prototype.mul = function mul(k, kbase) {
    k = new BN$1(k, kbase);

    return this.curve._wnafMul(this, k);
  };

  JPoint.prototype.eq = function eq(p) {
    if (p.type === 'affine')
      return this.eq(p.toJ());

    if (this === p)
      return true;

    // x1 * z2^2 == x2 * z1^2
    var z2 = this.z.redSqr();
    var pz2 = p.z.redSqr();
    if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
      return false;

    // y1 * z2^3 == y2 * z1^3
    var z3 = z2.redMul(this.z);
    var pz3 = pz2.redMul(p.z);
    return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
  };

  JPoint.prototype.eqXToP = function eqXToP(x) {
    var zs = this.z.redSqr();
    var rx = x.toRed(this.curve.red).redMul(zs);
    if (this.x.cmp(rx) === 0)
      return true;

    var xc = x.clone();
    var t = this.curve.redN.redMul(zs);
    for (;;) {
      xc.iadd(this.curve.n);
      if (xc.cmp(this.curve.p) >= 0)
        return false;

      rx.redIAdd(t);
      if (this.x.cmp(rx) === 0)
        return true;
    }
  };

  JPoint.prototype.inspect = function inspect() {
    if (this.isInfinity())
      return '<EC JPoint Infinity>';
    return '<EC JPoint x: ' + this.x.toString(16, 2) +
        ' y: ' + this.y.toString(16, 2) +
        ' z: ' + this.z.toString(16, 2) + '>';
  };

  JPoint.prototype.isInfinity = function isInfinity() {
    // XXX This code assumes that zero is always zero in red
    return this.z.cmpn(0) === 0;
  };

  var curve_1 = createCommonjsModule(function (module, exports) {

  var curve = exports;

  curve.base = base;
  curve.short = short_1;
  curve.mont = /*RicMoo:ethers:require(./mont)*/(null);
  curve.edwards = /*RicMoo:ethers:require(./edwards)*/(null);
  });

  var curves_1 = createCommonjsModule(function (module, exports) {

  var curves = exports;





  var assert = utils_1$1.assert;

  function PresetCurve(options) {
    if (options.type === 'short')
      this.curve = new curve_1.short(options);
    else if (options.type === 'edwards')
      this.curve = new curve_1.edwards(options);
    else
      this.curve = new curve_1.mont(options);
    this.g = this.curve.g;
    this.n = this.curve.n;
    this.hash = options.hash;

    assert(this.g.validate(), 'Invalid curve');
    assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
  }
  curves.PresetCurve = PresetCurve;

  function defineCurve(name, options) {
    Object.defineProperty(curves, name, {
      configurable: true,
      enumerable: true,
      get: function() {
        var curve = new PresetCurve(options);
        Object.defineProperty(curves, name, {
          configurable: true,
          enumerable: true,
          value: curve,
        });
        return curve;
      },
    });
  }

  defineCurve('p192', {
    type: 'short',
    prime: 'p192',
    p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
    a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
    b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
    n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
    hash: hash.sha256,
    gRed: false,
    g: [
      '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
      '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811',
    ],
  });

  defineCurve('p224', {
    type: 'short',
    prime: 'p224',
    p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
    a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
    b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
    n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
    hash: hash.sha256,
    gRed: false,
    g: [
      'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
      'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34',
    ],
  });

  defineCurve('p256', {
    type: 'short',
    prime: null,
    p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
    a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
    b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
    n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
    hash: hash.sha256,
    gRed: false,
    g: [
      '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
      '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5',
    ],
  });

  defineCurve('p384', {
    type: 'short',
    prime: null,
    p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'fffffffe ffffffff 00000000 00000000 ffffffff',
    a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'fffffffe ffffffff 00000000 00000000 fffffffc',
    b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
       '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
    n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
       'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
    hash: hash.sha384,
    gRed: false,
    g: [
      'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
      '5502f25d bf55296c 3a545e38 72760ab7',
      '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
      '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f',
    ],
  });

  defineCurve('p521', {
    type: 'short',
    prime: null,
    p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff ffffffff ffffffff ffffffff',
    a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff ffffffff ffffffff fffffffc',
    b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
       '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
       '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
    n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
       'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
       'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
    hash: hash.sha512,
    gRed: false,
    g: [
      '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
      '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
      'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
      '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
      '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
      '3fad0761 353c7086 a272c240 88be9476 9fd16650',
    ],
  });

  defineCurve('curve25519', {
    type: 'mont',
    prime: 'p25519',
    p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
    a: '76d06',
    b: '1',
    n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
    hash: hash.sha256,
    gRed: false,
    g: [
      '9',
    ],
  });

  defineCurve('ed25519', {
    type: 'edwards',
    prime: 'p25519',
    p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
    a: '-1',
    c: '1',
    // -121665 * (121666^(-1)) (mod P)
    d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
    n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
    hash: hash.sha256,
    gRed: false,
    g: [
      '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

      // 4/5
      '6666666666666666666666666666666666666666666666666666666666666658',
    ],
  });

  var pre;
  try {
    pre = /*RicMoo:ethers:require(./precomputed/secp256k1)*/(null).crash();
  } catch (e) {
    pre = undefined;
  }

  defineCurve('secp256k1', {
    type: 'short',
    prime: 'k256',
    p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
    a: '0',
    b: '7',
    n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
    h: '1',
    hash: hash.sha256,

    // Precomputed endomorphism
    beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
    lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
    basis: [
      {
        a: '3086d221a7d46bcde86c90e49284eb15',
        b: '-e4437ed6010e88286f547fa90abfe4c3',
      },
      {
        a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
        b: '3086d221a7d46bcde86c90e49284eb15',
      },
    ],

    gRed: false,
    g: [
      '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
      '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
      pre,
    ],
  });
  });





  function HmacDRBG(options) {
    if (!(this instanceof HmacDRBG))
      return new HmacDRBG(options);
    this.hash = options.hash;
    this.predResist = !!options.predResist;

    this.outLen = this.hash.outSize;
    this.minEntropy = options.minEntropy || this.hash.hmacStrength;

    this._reseed = null;
    this.reseedInterval = null;
    this.K = null;
    this.V = null;

    var entropy = utils_1.toArray(options.entropy, options.entropyEnc || 'hex');
    var nonce = utils_1.toArray(options.nonce, options.nonceEnc || 'hex');
    var pers = utils_1.toArray(options.pers, options.persEnc || 'hex');
    minimalisticAssert(entropy.length >= (this.minEntropy / 8),
           'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
    this._init(entropy, nonce, pers);
  }
  var hmacDrbg = HmacDRBG;

  HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
    var seed = entropy.concat(nonce).concat(pers);

    this.K = new Array(this.outLen / 8);
    this.V = new Array(this.outLen / 8);
    for (var i = 0; i < this.V.length; i++) {
      this.K[i] = 0x00;
      this.V[i] = 0x01;
    }

    this._update(seed);
    this._reseed = 1;
    this.reseedInterval = 0x1000000000000;  // 2^48
  };

  HmacDRBG.prototype._hmac = function hmac() {
    return new hash.hmac(this.hash, this.K);
  };

  HmacDRBG.prototype._update = function update(seed) {
    var kmac = this._hmac()
                   .update(this.V)
                   .update([ 0x00 ]);
    if (seed)
      kmac = kmac.update(seed);
    this.K = kmac.digest();
    this.V = this._hmac().update(this.V).digest();
    if (!seed)
      return;

    this.K = this._hmac()
                 .update(this.V)
                 .update([ 0x01 ])
                 .update(seed)
                 .digest();
    this.V = this._hmac().update(this.V).digest();
  };

  HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
    // Optional entropy enc
    if (typeof entropyEnc !== 'string') {
      addEnc = add;
      add = entropyEnc;
      entropyEnc = null;
    }

    entropy = utils_1.toArray(entropy, entropyEnc);
    add = utils_1.toArray(add, addEnc);

    minimalisticAssert(entropy.length >= (this.minEntropy / 8),
           'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

    this._update(entropy.concat(add || []));
    this._reseed = 1;
  };

  HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
    if (this._reseed > this.reseedInterval)
      throw new Error('Reseed is required');

    // Optional encoding
    if (typeof enc !== 'string') {
      addEnc = add;
      add = enc;
      enc = null;
    }

    // Optional additional data
    if (add) {
      add = utils_1.toArray(add, addEnc || 'hex');
      this._update(add);
    }

    var temp = [];
    while (temp.length < len) {
      this.V = this._hmac().update(this.V).digest();
      temp = temp.concat(this.V);
    }

    var res = temp.slice(0, len);
    this._update(add);
    this._reseed++;
    return utils_1.encode(res, enc);
  };



  var assert$3 = utils_1$1.assert;

  function KeyPair(ec, options) {
    this.ec = ec;
    this.priv = null;
    this.pub = null;

    // KeyPair(ec, { priv: ..., pub: ... })
    if (options.priv)
      this._importPrivate(options.priv, options.privEnc);
    if (options.pub)
      this._importPublic(options.pub, options.pubEnc);
  }
  var key = KeyPair;

  KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
    if (pub instanceof KeyPair)
      return pub;

    return new KeyPair(ec, {
      pub: pub,
      pubEnc: enc,
    });
  };

  KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
    if (priv instanceof KeyPair)
      return priv;

    return new KeyPair(ec, {
      priv: priv,
      privEnc: enc,
    });
  };

  KeyPair.prototype.validate = function validate() {
    var pub = this.getPublic();

    if (pub.isInfinity())
      return { result: false, reason: 'Invalid public key' };
    if (!pub.validate())
      return { result: false, reason: 'Public key is not a point' };
    if (!pub.mul(this.ec.curve.n).isInfinity())
      return { result: false, reason: 'Public key * N != O' };

    return { result: true, reason: null };
  };

  KeyPair.prototype.getPublic = function getPublic(compact, enc) {
    // compact is optional argument
    if (typeof compact === 'string') {
      enc = compact;
      compact = null;
    }

    if (!this.pub)
      this.pub = this.ec.g.mul(this.priv);

    if (!enc)
      return this.pub;

    return this.pub.encode(enc, compact);
  };

  KeyPair.prototype.getPrivate = function getPrivate(enc) {
    if (enc === 'hex')
      return this.priv.toString(16, 2);
    else
      return this.priv;
  };

  KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
    this.priv = new BN$1(key, enc || 16);

    // Ensure that the priv won't be bigger than n, otherwise we may fail
    // in fixed multiplication method
    this.priv = this.priv.umod(this.ec.curve.n);
  };

  KeyPair.prototype._importPublic = function _importPublic(key, enc) {
    if (key.x || key.y) {
      // Montgomery points only have an `x` coordinate.
      // Weierstrass/Edwards points on the other hand have both `x` and
      // `y` coordinates.
      if (this.ec.curve.type === 'mont') {
        assert$3(key.x, 'Need x coordinate');
      } else if (this.ec.curve.type === 'short' ||
                 this.ec.curve.type === 'edwards') {
        assert$3(key.x && key.y, 'Need both x and y coordinate');
      }
      this.pub = this.ec.curve.point(key.x, key.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(key, enc);
  };

  // ECDH
  KeyPair.prototype.derive = function derive(pub) {
    if(!pub.validate()) {
      assert$3(pub.validate(), 'public point not validated');
    }
    return pub.mul(this.priv).getX();
  };

  // ECDSA
  KeyPair.prototype.sign = function sign(msg, enc, options) {
    return this.ec.sign(msg, this, enc, options);
  };

  KeyPair.prototype.verify = function verify(msg, signature) {
    return this.ec.verify(msg, signature, this);
  };

  KeyPair.prototype.inspect = function inspect() {
    return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
           ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
  };




  var assert$4 = utils_1$1.assert;

  function Signature(options, enc) {
    if (options instanceof Signature)
      return options;

    if (this._importDER(options, enc))
      return;

    assert$4(options.r && options.s, 'Signature without r or s');
    this.r = new BN$1(options.r, 16);
    this.s = new BN$1(options.s, 16);
    if (options.recoveryParam === undefined)
      this.recoveryParam = null;
    else
      this.recoveryParam = options.recoveryParam;
  }
  var signature = Signature;

  function Position() {
    this.place = 0;
  }

  function getLength(buf, p) {
    var initial = buf[p.place++];
    if (!(initial & 0x80)) {
      return initial;
    }
    var octetLen = initial & 0xf;

    // Indefinite length or overflow
    if (octetLen === 0 || octetLen > 4) {
      return false;
    }

    var val = 0;
    for (var i = 0, off = p.place; i < octetLen; i++, off++) {
      val <<= 8;
      val |= buf[off];
      val >>>= 0;
    }

    // Leading zeroes
    if (val <= 0x7f) {
      return false;
    }

    p.place = off;
    return val;
  }

  function rmPadding(buf) {
    var i = 0;
    var len = buf.length - 1;
    while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
      i++;
    }
    if (i === 0) {
      return buf;
    }
    return buf.slice(i);
  }

  Signature.prototype._importDER = function _importDER(data, enc) {
    data = utils_1$1.toArray(data, enc);
    var p = new Position();
    if (data[p.place++] !== 0x30) {
      return false;
    }
    var len = getLength(data, p);
    if (len === false) {
      return false;
    }
    if ((len + p.place) !== data.length) {
      return false;
    }
    if (data[p.place++] !== 0x02) {
      return false;
    }
    var rlen = getLength(data, p);
    if (rlen === false) {
      return false;
    }
    var r = data.slice(p.place, rlen + p.place);
    p.place += rlen;
    if (data[p.place++] !== 0x02) {
      return false;
    }
    var slen = getLength(data, p);
    if (slen === false) {
      return false;
    }
    if (data.length !== slen + p.place) {
      return false;
    }
    var s = data.slice(p.place, slen + p.place);
    if (r[0] === 0) {
      if (r[1] & 0x80) {
        r = r.slice(1);
      } else {
        // Leading zeroes
        return false;
      }
    }
    if (s[0] === 0) {
      if (s[1] & 0x80) {
        s = s.slice(1);
      } else {
        // Leading zeroes
        return false;
      }
    }

    this.r = new BN$1(r);
    this.s = new BN$1(s);
    this.recoveryParam = null;

    return true;
  };

  function constructLength(arr, len) {
    if (len < 0x80) {
      arr.push(len);
      return;
    }
    var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
    arr.push(octets | 0x80);
    while (--octets) {
      arr.push((len >>> (octets << 3)) & 0xff);
    }
    arr.push(len);
  }

  Signature.prototype.toDER = function toDER(enc) {
    var r = this.r.toArray();
    var s = this.s.toArray();

    // Pad values
    if (r[0] & 0x80)
      r = [ 0 ].concat(r);
    // Pad values
    if (s[0] & 0x80)
      s = [ 0 ].concat(s);

    r = rmPadding(r);
    s = rmPadding(s);

    while (!s[0] && !(s[1] & 0x80)) {
      s = s.slice(1);
    }
    var arr = [ 0x02 ];
    constructLength(arr, r.length);
    arr = arr.concat(r);
    arr.push(0x02);
    constructLength(arr, s.length);
    var backHalf = arr.concat(s);
    var res = [ 0x30 ];
    constructLength(res, backHalf.length);
    res = res.concat(backHalf);
    return utils_1$1.encode(res, enc);
  };





  var rand = /*RicMoo:ethers:require(brorand)*/(function() { throw new Error('unsupported'); });
  var assert$5 = utils_1$1.assert;




  function EC(options) {
    if (!(this instanceof EC))
      return new EC(options);

    // Shortcut `elliptic.ec(curve-name)`
    if (typeof options === 'string') {
      assert$5(Object.prototype.hasOwnProperty.call(curves_1, options),
        'Unknown curve ' + options);

      options = curves_1[options];
    }

    // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
    if (options instanceof curves_1.PresetCurve)
      options = { curve: options };

    this.curve = options.curve.curve;
    this.n = this.curve.n;
    this.nh = this.n.ushrn(1);
    this.g = this.curve.g;

    // Point on curve
    this.g = options.curve.g;
    this.g.precompute(options.curve.n.bitLength() + 1);

    // Hash for function for DRBG
    this.hash = options.hash || options.curve.hash;
  }
  var ec = EC;

  EC.prototype.keyPair = function keyPair(options) {
    return new key(this, options);
  };

  EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
    return key.fromPrivate(this, priv, enc);
  };

  EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
    return key.fromPublic(this, pub, enc);
  };

  EC.prototype.genKeyPair = function genKeyPair(options) {
    if (!options)
      options = {};

    // Instantiate Hmac_DRBG
    var drbg = new hmacDrbg({
      hash: this.hash,
      pers: options.pers,
      persEnc: options.persEnc || 'utf8',
      entropy: options.entropy || rand(this.hash.hmacStrength),
      entropyEnc: options.entropy && options.entropyEnc || 'utf8',
      nonce: this.n.toArray(),
    });

    var bytes = this.n.byteLength();
    var ns2 = this.n.sub(new BN$1(2));
    for (;;) {
      var priv = new BN$1(drbg.generate(bytes));
      if (priv.cmp(ns2) > 0)
        continue;

      priv.iaddn(1);
      return this.keyFromPrivate(priv);
    }
  };

  EC.prototype._truncateToN = function _truncateToN(msg, truncOnly) {
    var delta = msg.byteLength() * 8 - this.n.bitLength();
    if (delta > 0)
      msg = msg.ushrn(delta);
    if (!truncOnly && msg.cmp(this.n) >= 0)
      return msg.sub(this.n);
    else
      return msg;
  };

  EC.prototype.sign = function sign(msg, key, enc, options) {
    if (typeof enc === 'object') {
      options = enc;
      enc = null;
    }
    if (!options)
      options = {};

    key = this.keyFromPrivate(key, enc);
    msg = this._truncateToN(new BN$1(msg, 16));

    // Zero-extend key to provide enough entropy
    var bytes = this.n.byteLength();
    var bkey = key.getPrivate().toArray('be', bytes);

    // Zero-extend nonce to have the same byte size as N
    var nonce = msg.toArray('be', bytes);

    // Instantiate Hmac_DRBG
    var drbg = new hmacDrbg({
      hash: this.hash,
      entropy: bkey,
      nonce: nonce,
      pers: options.pers,
      persEnc: options.persEnc || 'utf8',
    });

    // Number of bytes to generate
    var ns1 = this.n.sub(new BN$1(1));

    for (var iter = 0; ; iter++) {
      var k = options.k ?
        options.k(iter) :
        new BN$1(drbg.generate(this.n.byteLength()));
      k = this._truncateToN(k, true);
      if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
        continue;

      var kp = this.g.mul(k);
      if (kp.isInfinity())
        continue;

      var kpX = kp.getX();
      var r = kpX.umod(this.n);
      if (r.cmpn(0) === 0)
        continue;

      var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
      s = s.umod(this.n);
      if (s.cmpn(0) === 0)
        continue;

      var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                          (kpX.cmp(r) !== 0 ? 2 : 0);

      // Use complement of `s`, if it is > `n / 2`
      if (options.canonical && s.cmp(this.nh) > 0) {
        s = this.n.sub(s);
        recoveryParam ^= 1;
      }

      return new signature({ r: r, s: s, recoveryParam: recoveryParam });
    }
  };

  EC.prototype.verify = function verify(msg, signature$1, key, enc) {
    msg = this._truncateToN(new BN$1(msg, 16));
    key = this.keyFromPublic(key, enc);
    signature$1 = new signature(signature$1, 'hex');

    // Perform primitive values validation
    var r = signature$1.r;
    var s = signature$1.s;
    if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
      return false;
    if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
      return false;

    // Validate signature
    var sinv = s.invm(this.n);
    var u1 = sinv.mul(msg).umod(this.n);
    var u2 = sinv.mul(r).umod(this.n);
    var p;

    if (!this.curve._maxwellTrick) {
      p = this.g.mulAdd(u1, key.getPublic(), u2);
      if (p.isInfinity())
        return false;

      return p.getX().umod(this.n).cmp(r) === 0;
    }

    // NOTE: Greg Maxwell's trick, inspired by:
    // https://git.io/vad3K

    p = this.g.jmulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    // Compare `p.x` of Jacobian point with `r`,
    // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
    // inverse of `p.z^2`
    return p.eqXToP(r);
  };

  EC.prototype.recoverPubKey = function(msg, signature$1, j, enc) {
    assert$5((3 & j) === j, 'The recovery param is more than two bits');
    signature$1 = new signature(signature$1, enc);

    var n = this.n;
    var e = new BN$1(msg);
    var r = signature$1.r;
    var s = signature$1.s;

    // A set LSB signifies that the y-coordinate is odd
    var isYOdd = j & 1;
    var isSecondKey = j >> 1;
    if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
      throw new Error('Unable to find sencond key candinate');

    // 1.1. Let x = r + jn.
    if (isSecondKey)
      r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
    else
      r = this.curve.pointFromX(r, isYOdd);

    var rInv = signature$1.r.invm(n);
    var s1 = n.sub(e).mul(rInv).umod(n);
    var s2 = s.mul(rInv).umod(n);

    // 1.6.1 Compute Q = r^-1 (sR -  eG)
    //               Q = r^-1 (sR + -eG)
    return this.g.mulAdd(s1, r, s2);
  };

  EC.prototype.getKeyRecoveryParam = function(e, signature$1, Q, enc) {
    signature$1 = new signature(signature$1, enc);
    if (signature$1.recoveryParam !== null)
      return signature$1.recoveryParam;

    for (var i = 0; i < 4; i++) {
      var Qprime;
      try {
        Qprime = this.recoverPubKey(e, signature$1, i);
      } catch (e) {
        continue;
      }

      if (Qprime.eq(Q))
        return i;
    }
    throw new Error('Unable to find valid recovery factor');
  };

  var elliptic_1 = createCommonjsModule(function (module, exports) {

  var elliptic = exports;

  elliptic.version = /*RicMoo:ethers*/{ version: "6.5.4" }.version;
  elliptic.utils = utils_1$1;
  elliptic.rand = /*RicMoo:ethers:require(brorand)*/(function() { throw new Error('unsupported'); });
  elliptic.curve = curve_1;
  elliptic.curves = curves_1;

  // Protocols
  elliptic.ec = ec;
  elliptic.eddsa = /*RicMoo:ethers:require(./elliptic/eddsa)*/(null);
  });

  var EC$1 = elliptic_1.ec;

  const version$5 = "signing-key/5.5.0";

  const logger$7 = new Logger(version$5);
  let _curve = null;
  function getCurve() {
      if (!_curve) {
          _curve = new EC$1("secp256k1");
      }
      return _curve;
  }
  class SigningKey {
      constructor(privateKey) {
          defineReadOnly(this, "curve", "secp256k1");
          defineReadOnly(this, "privateKey", hexlify(privateKey));
          const keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey));
          defineReadOnly(this, "publicKey", "0x" + keyPair.getPublic(false, "hex"));
          defineReadOnly(this, "compressedPublicKey", "0x" + keyPair.getPublic(true, "hex"));
          defineReadOnly(this, "_isSigningKey", true);
      }
      _addPoint(other) {
          const p0 = getCurve().keyFromPublic(arrayify(this.publicKey));
          const p1 = getCurve().keyFromPublic(arrayify(other));
          return "0x" + p0.pub.add(p1.pub).encodeCompressed("hex");
      }
      signDigest(digest) {
          const keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey));
          const digestBytes = arrayify(digest);
          if (digestBytes.length !== 32) {
              logger$7.throwArgumentError("bad digest length", "digest", digest);
          }
          const signature = keyPair.sign(digestBytes, { canonical: true });
          return splitSignature({
              recoveryParam: signature.recoveryParam,
              r: hexZeroPad("0x" + signature.r.toString(16), 32),
              s: hexZeroPad("0x" + signature.s.toString(16), 32),
          });
      }
      computeSharedSecret(otherKey) {
          const keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey));
          const otherKeyPair = getCurve().keyFromPublic(arrayify(computePublicKey(otherKey)));
          return hexZeroPad("0x" + keyPair.derive(otherKeyPair.getPublic()).toString(16), 32);
      }
      static isSigningKey(value) {
          return !!(value && value._isSigningKey);
      }
  }
  function recoverPublicKey(digest, signature) {
      const sig = splitSignature(signature);
      const rs = { r: arrayify(sig.r), s: arrayify(sig.s) };
      return "0x" + getCurve().recoverPubKey(arrayify(digest), rs, sig.recoveryParam).encode("hex", false);
  }
  function computePublicKey(key, compressed) {
      const bytes = arrayify(key);
      if (bytes.length === 32) {
          const signingKey = new SigningKey(bytes);
          if (compressed) {
              return "0x" + getCurve().keyFromPrivate(bytes).getPublic(true, "hex");
          }
          return signingKey.publicKey;
      }
      else if (bytes.length === 33) {
          if (compressed) {
              return hexlify(bytes);
          }
          return "0x" + getCurve().keyFromPublic(bytes).getPublic(false, "hex");
      }
      else if (bytes.length === 65) {
          if (!compressed) {
              return hexlify(bytes);
          }
          return "0x" + getCurve().keyFromPublic(bytes).getPublic(true, "hex");
      }
      return logger$7.throwArgumentError("invalid public or private key", "key", "[REDACTED]");
  }

  const version$4 = "transactions/5.5.0";

  const logger$6 = new Logger(version$4);
  var TransactionTypes;
  (function (TransactionTypes) {
      TransactionTypes[TransactionTypes["legacy"] = 0] = "legacy";
      TransactionTypes[TransactionTypes["eip2930"] = 1] = "eip2930";
      TransactionTypes[TransactionTypes["eip1559"] = 2] = "eip1559";
  })(TransactionTypes || (TransactionTypes = {}));
  ///////////////////////////////
  function handleAddress(value) {
      if (value === "0x") {
          return null;
      }
      return getAddress(value);
  }
  function handleNumber(value) {
      if (value === "0x") {
          return Zero$1;
      }
      return BigNumber.from(value);
  }
  function computeAddress(key) {
      const publicKey = computePublicKey(key);
      return getAddress(hexDataSlice(keccak256(hexDataSlice(publicKey, 1)), 12));
  }
  function recoverAddress(digest, signature) {
      return computeAddress(recoverPublicKey(arrayify(digest), signature));
  }
  function formatNumber(value, name) {
      const result = stripZeros(BigNumber.from(value).toHexString());
      if (result.length > 32) {
          logger$6.throwArgumentError("invalid length for " + name, ("transaction:" + name), value);
      }
      return result;
  }
  function accessSetify(addr, storageKeys) {
      return {
          address: getAddress(addr),
          storageKeys: (storageKeys || []).map((storageKey, index) => {
              if (hexDataLength(storageKey) !== 32) {
                  logger$6.throwArgumentError("invalid access list storageKey", `accessList[${addr}:${index}]`, storageKey);
              }
              return storageKey.toLowerCase();
          })
      };
  }
  function accessListify(value) {
      if (Array.isArray(value)) {
          return value.map((set, index) => {
              if (Array.isArray(set)) {
                  if (set.length > 2) {
                      logger$6.throwArgumentError("access list expected to be [ address, storageKeys[] ]", `value[${index}]`, set);
                  }
                  return accessSetify(set[0], set[1]);
              }
              return accessSetify(set.address, set.storageKeys);
          });
      }
      const result = Object.keys(value).map((addr) => {
          const storageKeys = value[addr].reduce((accum, storageKey) => {
              accum[storageKey] = true;
              return accum;
          }, {});
          return accessSetify(addr, Object.keys(storageKeys).sort());
      });
      result.sort((a, b) => (a.address.localeCompare(b.address)));
      return result;
  }
  function formatAccessList(value) {
      return accessListify(value).map((set) => [set.address, set.storageKeys]);
  }
  function _serializeEip1559(transaction, signature) {
      // If there is an explicit gasPrice, make sure it matches the
      // EIP-1559 fees; otherwise they may not understand what they
      // think they are setting in terms of fee.
      if (transaction.gasPrice != null) {
          const gasPrice = BigNumber.from(transaction.gasPrice);
          const maxFeePerGas = BigNumber.from(transaction.maxFeePerGas || 0);
          if (!gasPrice.eq(maxFeePerGas)) {
              logger$6.throwArgumentError("mismatch EIP-1559 gasPrice != maxFeePerGas", "tx", {
                  gasPrice, maxFeePerGas
              });
          }
      }
      const fields = [
          formatNumber(transaction.chainId || 0, "chainId"),
          formatNumber(transaction.nonce || 0, "nonce"),
          formatNumber(transaction.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
          formatNumber(transaction.maxFeePerGas || 0, "maxFeePerGas"),
          formatNumber(transaction.gasLimit || 0, "gasLimit"),
          ((transaction.to != null) ? getAddress(transaction.to) : "0x"),
          formatNumber(transaction.value || 0, "value"),
          (transaction.data || "0x"),
          (formatAccessList(transaction.accessList || []))
      ];
      if (signature) {
          const sig = splitSignature(signature);
          fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
          fields.push(stripZeros(sig.r));
          fields.push(stripZeros(sig.s));
      }
      return hexConcat(["0x02", encode$2(fields)]);
  }
  function _serializeEip2930(transaction, signature) {
      const fields = [
          formatNumber(transaction.chainId || 0, "chainId"),
          formatNumber(transaction.nonce || 0, "nonce"),
          formatNumber(transaction.gasPrice || 0, "gasPrice"),
          formatNumber(transaction.gasLimit || 0, "gasLimit"),
          ((transaction.to != null) ? getAddress(transaction.to) : "0x"),
          formatNumber(transaction.value || 0, "value"),
          (transaction.data || "0x"),
          (formatAccessList(transaction.accessList || []))
      ];
      if (signature) {
          const sig = splitSignature(signature);
          fields.push(formatNumber(sig.recoveryParam, "recoveryParam"));
          fields.push(stripZeros(sig.r));
          fields.push(stripZeros(sig.s));
      }
      return hexConcat(["0x01", encode$2(fields)]);
  }
  function _parseEipSignature(tx, fields, serialize) {
      try {
          const recid = handleNumber(fields[0]).toNumber();
          if (recid !== 0 && recid !== 1) {
              throw new Error("bad recid");
          }
          tx.v = recid;
      }
      catch (error) {
          logger$6.throwArgumentError("invalid v for transaction type: 1", "v", fields[0]);
      }
      tx.r = hexZeroPad(fields[1], 32);
      tx.s = hexZeroPad(fields[2], 32);
      try {
          const digest = keccak256(serialize(tx));
          tx.from = recoverAddress(digest, { r: tx.r, s: tx.s, recoveryParam: tx.v });
      }
      catch (error) {
          console.log(error);
      }
  }
  function _parseEip1559(payload) {
      const transaction = decode$2(payload.slice(1));
      if (transaction.length !== 9 && transaction.length !== 12) {
          logger$6.throwArgumentError("invalid component count for transaction type: 2", "payload", hexlify(payload));
      }
      const maxPriorityFeePerGas = handleNumber(transaction[2]);
      const maxFeePerGas = handleNumber(transaction[3]);
      const tx = {
          type: 2,
          chainId: handleNumber(transaction[0]).toNumber(),
          nonce: handleNumber(transaction[1]).toNumber(),
          maxPriorityFeePerGas: maxPriorityFeePerGas,
          maxFeePerGas: maxFeePerGas,
          gasPrice: null,
          gasLimit: handleNumber(transaction[4]),
          to: handleAddress(transaction[5]),
          value: handleNumber(transaction[6]),
          data: transaction[7],
          accessList: accessListify(transaction[8]),
      };
      // Unsigned EIP-1559 Transaction
      if (transaction.length === 9) {
          return tx;
      }
      tx.hash = keccak256(payload);
      _parseEipSignature(tx, transaction.slice(9), _serializeEip1559);
      return tx;
  }
  function _parseEip2930(payload) {
      const transaction = decode$2(payload.slice(1));
      if (transaction.length !== 8 && transaction.length !== 11) {
          logger$6.throwArgumentError("invalid component count for transaction type: 1", "payload", hexlify(payload));
      }
      const tx = {
          type: 1,
          chainId: handleNumber(transaction[0]).toNumber(),
          nonce: handleNumber(transaction[1]).toNumber(),
          gasPrice: handleNumber(transaction[2]),
          gasLimit: handleNumber(transaction[3]),
          to: handleAddress(transaction[4]),
          value: handleNumber(transaction[5]),
          data: transaction[6],
          accessList: accessListify(transaction[7])
      };
      // Unsigned EIP-2930 Transaction
      if (transaction.length === 8) {
          return tx;
      }
      tx.hash = keccak256(payload);
      _parseEipSignature(tx, transaction.slice(8), _serializeEip2930);
      return tx;
  }
  // Legacy Transactions and EIP-155
  function _parse(rawTransaction) {
      const transaction = decode$2(rawTransaction);
      if (transaction.length !== 9 && transaction.length !== 6) {
          logger$6.throwArgumentError("invalid raw transaction", "rawTransaction", rawTransaction);
      }
      const tx = {
          nonce: handleNumber(transaction[0]).toNumber(),
          gasPrice: handleNumber(transaction[1]),
          gasLimit: handleNumber(transaction[2]),
          to: handleAddress(transaction[3]),
          value: handleNumber(transaction[4]),
          data: transaction[5],
          chainId: 0
      };
      // Legacy unsigned transaction
      if (transaction.length === 6) {
          return tx;
      }
      try {
          tx.v = BigNumber.from(transaction[6]).toNumber();
      }
      catch (error) {
          console.log(error);
          return tx;
      }
      tx.r = hexZeroPad(transaction[7], 32);
      tx.s = hexZeroPad(transaction[8], 32);
      if (BigNumber.from(tx.r).isZero() && BigNumber.from(tx.s).isZero()) {
          // EIP-155 unsigned transaction
          tx.chainId = tx.v;
          tx.v = 0;
      }
      else {
          // Signed Transaction
          tx.chainId = Math.floor((tx.v - 35) / 2);
          if (tx.chainId < 0) {
              tx.chainId = 0;
          }
          let recoveryParam = tx.v - 27;
          const raw = transaction.slice(0, 6);
          if (tx.chainId !== 0) {
              raw.push(hexlify(tx.chainId));
              raw.push("0x");
              raw.push("0x");
              recoveryParam -= tx.chainId * 2 + 8;
          }
          const digest = keccak256(encode$2(raw));
          try {
              tx.from = recoverAddress(digest, { r: hexlify(tx.r), s: hexlify(tx.s), recoveryParam: recoveryParam });
          }
          catch (error) {
              console.log(error);
          }
          tx.hash = keccak256(rawTransaction);
      }
      tx.type = null;
      return tx;
  }
  function parse(rawTransaction) {
      const payload = arrayify(rawTransaction);
      // Legacy and EIP-155 Transactions
      if (payload[0] > 0x7f) {
          return _parse(payload);
      }
      // Typed Transaction (EIP-2718)
      switch (payload[0]) {
          case 1:
              return _parseEip2930(payload);
          case 2:
              return _parseEip1559(payload);
      }
      return logger$6.throwError(`unsupported transaction type: ${payload[0]}`, Logger.errors.UNSUPPORTED_OPERATION, {
          operation: "parseTransaction",
          transactionType: payload[0]
      });
  }

  /**
   * var basex = require("base-x");
   *
   * This implementation is heavily based on base-x. The main reason to
   * deviate was to prevent the dependency of Buffer.
   *
   * Contributors:
   *
   * base-x encoding
   * Forked from https://github.com/cryptocoinjs/bs58
   * Originally written by Mike Hearn for BitcoinJ
   * Copyright (c) 2011 Google Inc
   * Ported to JavaScript by Stefan Thomas
   * Merged Buffer refactorings from base58-native by Stephen Pair
   * Copyright (c) 2013 BitPay Inc
   *
   * The MIT License (MIT)
   *
   * Copyright base-x contributors (c) 2016
   *
   * Permission is hereby granted, free of charge, to any person obtaining a
   * copy of this software and associated documentation files (the "Software"),
   * to deal in the Software without restriction, including without limitation
   * the rights to use, copy, modify, merge, publish, distribute, sublicense,
   * and/or sell copies of the Software, and to permit persons to whom the
   * Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.

   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
   * IN THE SOFTWARE.
   *
   */
  class BaseX {
      constructor(alphabet) {
          defineReadOnly(this, "alphabet", alphabet);
          defineReadOnly(this, "base", alphabet.length);
          defineReadOnly(this, "_alphabetMap", {});
          defineReadOnly(this, "_leader", alphabet.charAt(0));
          // pre-compute lookup table
          for (let i = 0; i < alphabet.length; i++) {
              this._alphabetMap[alphabet.charAt(i)] = i;
          }
      }
      encode(value) {
          let source = arrayify(value);
          if (source.length === 0) {
              return "";
          }
          let digits = [0];
          for (let i = 0; i < source.length; ++i) {
              let carry = source[i];
              for (let j = 0; j < digits.length; ++j) {
                  carry += digits[j] << 8;
                  digits[j] = carry % this.base;
                  carry = (carry / this.base) | 0;
              }
              while (carry > 0) {
                  digits.push(carry % this.base);
                  carry = (carry / this.base) | 0;
              }
          }
          let string = "";
          // deal with leading zeros
          for (let k = 0; source[k] === 0 && k < source.length - 1; ++k) {
              string += this._leader;
          }
          // convert digits to a string
          for (let q = digits.length - 1; q >= 0; --q) {
              string += this.alphabet[digits[q]];
          }
          return string;
      }
      decode(value) {
          if (typeof (value) !== "string") {
              throw new TypeError("Expected String");
          }
          let bytes = [];
          if (value.length === 0) {
              return new Uint8Array(bytes);
          }
          bytes.push(0);
          for (let i = 0; i < value.length; i++) {
              let byte = this._alphabetMap[value[i]];
              if (byte === undefined) {
                  throw new Error("Non-base" + this.base + " character");
              }
              let carry = byte;
              for (let j = 0; j < bytes.length; ++j) {
                  carry += bytes[j] * this.base;
                  bytes[j] = carry & 0xff;
                  carry >>= 8;
              }
              while (carry > 0) {
                  bytes.push(carry & 0xff);
                  carry >>= 8;
              }
          }
          // deal with leading zeros
          for (let k = 0; value[k] === this._leader && k < value.length - 1; ++k) {
              bytes.push(0);
          }
          return arrayify(new Uint8Array(bytes.reverse()));
      }
  }
  new BaseX("abcdefghijklmnopqrstuvwxyz234567");
  const Base58 = new BaseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
  //console.log(Base58.decode("Qmd2V777o5XvJbYMeMb8k2nU5f8d3ciUQ5YpYuWhzv8iDj"))
  //console.log(Base58.encode(Base58.decode("Qmd2V777o5XvJbYMeMb8k2nU5f8d3ciUQ5YpYuWhzv8iDj")))

  const version$3 = "sha2/5.5.0";

  new Logger(version$3);
  function sha256(data) {
      return "0x" + (hash.sha256().update(arrayify(data)).digest("hex"));
  }

  const version$2 = "networks/5.5.2";

  const logger$5 = new Logger(version$2);
  function isRenetworkable(value) {
      return (value && typeof (value.renetwork) === "function");
  }
  function ethDefaultProvider(network) {
      const func = function (providers, options) {
          if (options == null) {
              options = {};
          }
          const providerList = [];
          if (providers.InfuraProvider) {
              try {
                  providerList.push(new providers.InfuraProvider(network, options.infura));
              }
              catch (error) { }
          }
          if (providers.EtherscanProvider) {
              try {
                  providerList.push(new providers.EtherscanProvider(network, options.etherscan));
              }
              catch (error) { }
          }
          if (providers.AlchemyProvider) {
              try {
                  providerList.push(new providers.AlchemyProvider(network, options.alchemy));
              }
              catch (error) { }
          }
          if (providers.PocketProvider) {
              // These networks are currently faulty on Pocket as their
              // network does not handle the Berlin hardfork, which is
              // live on these ones.
              // @TODO: This goes away once Pocket has upgraded their nodes
              const skip = ["goerli", "ropsten", "rinkeby"];
              try {
                  const provider = new providers.PocketProvider(network);
                  if (provider.network && skip.indexOf(provider.network.name) === -1) {
                      providerList.push(provider);
                  }
              }
              catch (error) { }
          }
          if (providers.CloudflareProvider) {
              try {
                  providerList.push(new providers.CloudflareProvider(network));
              }
              catch (error) { }
          }
          if (providerList.length === 0) {
              return null;
          }
          if (providers.FallbackProvider) {
              let quorum = 1;
              if (options.quorum != null) {
                  quorum = options.quorum;
              }
              else if (network === "homestead") {
                  quorum = 2;
              }
              return new providers.FallbackProvider(providerList, quorum);
          }
          return providerList[0];
      };
      func.renetwork = function (network) {
          return ethDefaultProvider(network);
      };
      return func;
  }
  function etcDefaultProvider(url, network) {
      const func = function (providers, options) {
          if (providers.JsonRpcProvider) {
              return new providers.JsonRpcProvider(url, network);
          }
          return null;
      };
      func.renetwork = function (network) {
          return etcDefaultProvider(url, network);
      };
      return func;
  }
  const homestead = {
      chainId: 1,
      ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      name: "homestead",
      _defaultProvider: ethDefaultProvider("homestead")
  };
  const ropsten = {
      chainId: 3,
      ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      name: "ropsten",
      _defaultProvider: ethDefaultProvider("ropsten")
  };
  const classicMordor = {
      chainId: 63,
      name: "classicMordor",
      _defaultProvider: etcDefaultProvider("https://www.ethercluster.com/mordor", "classicMordor")
  };
  // See: https://chainlist.org
  const networks = {
      unspecified: { chainId: 0, name: "unspecified" },
      homestead: homestead,
      mainnet: homestead,
      morden: { chainId: 2, name: "morden" },
      ropsten: ropsten,
      testnet: ropsten,
      rinkeby: {
          chainId: 4,
          ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          name: "rinkeby",
          _defaultProvider: ethDefaultProvider("rinkeby")
      },
      kovan: {
          chainId: 42,
          name: "kovan",
          _defaultProvider: ethDefaultProvider("kovan")
      },
      goerli: {
          chainId: 5,
          ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          name: "goerli",
          _defaultProvider: ethDefaultProvider("goerli")
      },
      kintsugi: { chainId: 1337702, name: "kintsugi" },
      // ETC (See: #351)
      classic: {
          chainId: 61,
          name: "classic",
          _defaultProvider: etcDefaultProvider("https:/\/www.ethercluster.com/etc", "classic")
      },
      classicMorden: { chainId: 62, name: "classicMorden" },
      classicMordor: classicMordor,
      classicTestnet: classicMordor,
      classicKotti: {
          chainId: 6,
          name: "classicKotti",
          _defaultProvider: etcDefaultProvider("https:/\/www.ethercluster.com/kotti", "classicKotti")
      },
      xdai: { chainId: 100, name: "xdai" },
      matic: { chainId: 137, name: "matic" },
      maticmum: { chainId: 80001, name: "maticmum" },
      optimism: { chainId: 10, name: "optimism" },
      "optimism-kovan": { chainId: 69, name: "optimism-kovan" },
      "optimism-goerli": { chainId: 420, name: "optimism-goerli" },
      arbitrum: { chainId: 42161, name: "arbitrum" },
      "arbitrum-rinkeby": { chainId: 421611, name: "arbitrum-rinkeby" },
      bnb: { chainId: 56, name: "bnb" },
      bnbt: { chainId: 97, name: "bnbt" },
  };
  /**
   *  getNetwork
   *
   *  Converts a named common networks or chain ID (network ID) to a Network
   *  and verifies a network is a valid Network..
   */
  function getNetwork(network) {
      // No network (null)
      if (network == null) {
          return null;
      }
      if (typeof (network) === "number") {
          for (const name in networks) {
              const standard = networks[name];
              if (standard.chainId === network) {
                  return {
                      name: standard.name,
                      chainId: standard.chainId,
                      ensAddress: (standard.ensAddress || null),
                      _defaultProvider: (standard._defaultProvider || null)
                  };
              }
          }
          return {
              chainId: network,
              name: "unknown"
          };
      }
      if (typeof (network) === "string") {
          const standard = networks[network];
          if (standard == null) {
              return null;
          }
          return {
              name: standard.name,
              chainId: standard.chainId,
              ensAddress: standard.ensAddress,
              _defaultProvider: (standard._defaultProvider || null)
          };
      }
      const standard = networks[network.name];
      // Not a standard network; check that it is a valid network in general
      if (!standard) {
          if (typeof (network.chainId) !== "number") {
              logger$5.throwArgumentError("invalid network chainId", "network", network);
          }
          return network;
      }
      // Make sure the chainId matches the expected network chainId (or is 0; disable EIP-155)
      if (network.chainId !== 0 && network.chainId !== standard.chainId) {
          logger$5.throwArgumentError("network chainId mismatch", "network", network);
      }
      // @TODO: In the next major version add an attach function to a defaultProvider
      // class and move the _defaultProvider internal to this file (extend Network)
      let defaultProvider = network._defaultProvider || null;
      if (defaultProvider == null && standard._defaultProvider) {
          if (isRenetworkable(standard._defaultProvider)) {
              defaultProvider = standard._defaultProvider.renetwork(network);
          }
          else {
              defaultProvider = standard._defaultProvider;
          }
      }
      // Standard Network (allow overriding the ENS address)
      return {
          name: network.name,
          chainId: standard.chainId,
          ensAddress: (network.ensAddress || standard.ensAddress || null),
          _defaultProvider: defaultProvider
      };
  }

  function decode$1(textData) {
      textData = atob(textData);
      const data = [];
      for (let i = 0; i < textData.length; i++) {
          data.push(textData.charCodeAt(i));
      }
      return arrayify(data);
  }
  function encode$1(data) {
      data = arrayify(data);
      let textData = "";
      for (let i = 0; i < data.length; i++) {
          textData += String.fromCharCode(data[i]);
      }
      return btoa(textData);
  }

  const version$1 = "web/5.5.1";

  var __awaiter$3 = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  function getUrl(href, options) {
      return __awaiter$3(this, void 0, void 0, function* () {
          if (options == null) {
              options = {};
          }
          const request = {
              method: (options.method || "GET"),
              headers: (options.headers || {}),
              body: (options.body || undefined),
          };
          if (options.skipFetchSetup !== true) {
              request.mode = "cors"; // no-cors, cors, *same-origin
              request.cache = "no-cache"; // *default, no-cache, reload, force-cache, only-if-cached
              request.credentials = "same-origin"; // include, *same-origin, omit
              request.redirect = "follow"; // manual, *follow, error
              request.referrer = "client"; // no-referrer, *client
          }
          const response = yield fetch(href, request);
          const body = yield response.arrayBuffer();
          const headers = {};
          if (response.headers.forEach) {
              response.headers.forEach((value, key) => {
                  headers[key.toLowerCase()] = value;
              });
          }
          else {
              ((response.headers).keys)().forEach((key) => {
                  headers[key.toLowerCase()] = response.headers.get(key);
              });
          }
          return {
              headers: headers,
              statusCode: response.status,
              statusMessage: response.statusText,
              body: arrayify(new Uint8Array(body)),
          };
      });
  }

  var __awaiter$2 = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  const logger$4 = new Logger(version$1);
  function staller(duration) {
      return new Promise((resolve) => {
          setTimeout(resolve, duration);
      });
  }
  function bodyify(value, type) {
      if (value == null) {
          return null;
      }
      if (typeof (value) === "string") {
          return value;
      }
      if (isBytesLike(value)) {
          if (type && (type.split("/")[0] === "text" || type.split(";")[0].trim() === "application/json")) {
              try {
                  return toUtf8String(value);
              }
              catch (error) { }
          }
          return hexlify(value);
      }
      return value;
  }
  // This API is still a work in progress; the future changes will likely be:
  // - ConnectionInfo => FetchDataRequest<T = any>
  // - FetchDataRequest.body? = string | Uint8Array | { contentType: string, data: string | Uint8Array }
  //   - If string => text/plain, Uint8Array => application/octet-stream (if content-type unspecified)
  // - FetchDataRequest.processFunc = (body: Uint8Array, response: FetchDataResponse) => T
  // For this reason, it should be considered internal until the API is finalized
  function _fetchData(connection, body, processFunc) {
      // How many times to retry in the event of a throttle
      const attemptLimit = (typeof (connection) === "object" && connection.throttleLimit != null) ? connection.throttleLimit : 12;
      logger$4.assertArgument((attemptLimit > 0 && (attemptLimit % 1) === 0), "invalid connection throttle limit", "connection.throttleLimit", attemptLimit);
      const throttleCallback = ((typeof (connection) === "object") ? connection.throttleCallback : null);
      const throttleSlotInterval = ((typeof (connection) === "object" && typeof (connection.throttleSlotInterval) === "number") ? connection.throttleSlotInterval : 100);
      logger$4.assertArgument((throttleSlotInterval > 0 && (throttleSlotInterval % 1) === 0), "invalid connection throttle slot interval", "connection.throttleSlotInterval", throttleSlotInterval);
      const headers = {};
      let url = null;
      // @TODO: Allow ConnectionInfo to override some of these values
      const options = {
          method: "GET",
      };
      let allow304 = false;
      let timeout = 2 * 60 * 1000;
      if (typeof (connection) === "string") {
          url = connection;
      }
      else if (typeof (connection) === "object") {
          if (connection == null || connection.url == null) {
              logger$4.throwArgumentError("missing URL", "connection.url", connection);
          }
          url = connection.url;
          if (typeof (connection.timeout) === "number" && connection.timeout > 0) {
              timeout = connection.timeout;
          }
          if (connection.headers) {
              for (const key in connection.headers) {
                  headers[key.toLowerCase()] = { key: key, value: String(connection.headers[key]) };
                  if (["if-none-match", "if-modified-since"].indexOf(key.toLowerCase()) >= 0) {
                      allow304 = true;
                  }
              }
          }
          options.allowGzip = !!connection.allowGzip;
          if (connection.user != null && connection.password != null) {
              if (url.substring(0, 6) !== "https:" && connection.allowInsecureAuthentication !== true) {
                  logger$4.throwError("basic authentication requires a secure https url", Logger.errors.INVALID_ARGUMENT, { argument: "url", url: url, user: connection.user, password: "[REDACTED]" });
              }
              const authorization = connection.user + ":" + connection.password;
              headers["authorization"] = {
                  key: "Authorization",
                  value: "Basic " + encode$1(toUtf8Bytes(authorization))
              };
          }
      }
      const reData = new RegExp("^data:([a-z0-9-]+/[a-z0-9-]+);base64,(.*)$", "i");
      const dataMatch = ((url) ? url.match(reData) : null);
      if (dataMatch) {
          try {
              const response = {
                  statusCode: 200,
                  statusMessage: "OK",
                  headers: { "content-type": dataMatch[1] },
                  body: decode$1(dataMatch[2])
              };
              let result = response.body;
              if (processFunc) {
                  result = processFunc(response.body, response);
              }
              return Promise.resolve(result);
          }
          catch (error) {
              logger$4.throwError("processing response error", Logger.errors.SERVER_ERROR, {
                  body: bodyify(dataMatch[1], dataMatch[2]),
                  error: error,
                  requestBody: null,
                  requestMethod: "GET",
                  url: url
              });
          }
      }
      if (body) {
          options.method = "POST";
          options.body = body;
          if (headers["content-type"] == null) {
              headers["content-type"] = { key: "Content-Type", value: "application/octet-stream" };
          }
          if (headers["content-length"] == null) {
              headers["content-length"] = { key: "Content-Length", value: String(body.length) };
          }
      }
      const flatHeaders = {};
      Object.keys(headers).forEach((key) => {
          const header = headers[key];
          flatHeaders[header.key] = header.value;
      });
      options.headers = flatHeaders;
      const runningTimeout = (function () {
          let timer = null;
          const promise = new Promise(function (resolve, reject) {
              if (timeout) {
                  timer = setTimeout(() => {
                      if (timer == null) {
                          return;
                      }
                      timer = null;
                      reject(logger$4.makeError("timeout", Logger.errors.TIMEOUT, {
                          requestBody: bodyify(options.body, flatHeaders["content-type"]),
                          requestMethod: options.method,
                          timeout: timeout,
                          url: url
                      }));
                  }, timeout);
              }
          });
          const cancel = function () {
              if (timer == null) {
                  return;
              }
              clearTimeout(timer);
              timer = null;
          };
          return { promise, cancel };
      })();
      const runningFetch = (function () {
          return __awaiter$2(this, void 0, void 0, function* () {
              for (let attempt = 0; attempt < attemptLimit; attempt++) {
                  let response = null;
                  try {
                      response = yield getUrl(url, options);
                      if (attempt < attemptLimit) {
                          if (response.statusCode === 301 || response.statusCode === 302) {
                              // Redirection; for now we only support absolute locataions
                              const location = response.headers.location || "";
                              if (options.method === "GET" && location.match(/^https:/)) {
                                  url = response.headers.location;
                                  continue;
                              }
                          }
                          else if (response.statusCode === 429) {
                              // Exponential back-off throttling
                              let tryAgain = true;
                              if (throttleCallback) {
                                  tryAgain = yield throttleCallback(attempt, url);
                              }
                              if (tryAgain) {
                                  let stall = 0;
                                  const retryAfter = response.headers["retry-after"];
                                  if (typeof (retryAfter) === "string" && retryAfter.match(/^[1-9][0-9]*$/)) {
                                      stall = parseInt(retryAfter) * 1000;
                                  }
                                  else {
                                      stall = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                                  }
                                  //console.log("Stalling 429");
                                  yield staller(stall);
                                  continue;
                              }
                          }
                      }
                  }
                  catch (error) {
                      response = error.response;
                      if (response == null) {
                          runningTimeout.cancel();
                          logger$4.throwError("missing response", Logger.errors.SERVER_ERROR, {
                              requestBody: bodyify(options.body, flatHeaders["content-type"]),
                              requestMethod: options.method,
                              serverError: error,
                              url: url
                          });
                      }
                  }
                  let body = response.body;
                  if (allow304 && response.statusCode === 304) {
                      body = null;
                  }
                  else if (response.statusCode < 200 || response.statusCode >= 300) {
                      runningTimeout.cancel();
                      logger$4.throwError("bad response", Logger.errors.SERVER_ERROR, {
                          status: response.statusCode,
                          headers: response.headers,
                          body: bodyify(body, ((response.headers) ? response.headers["content-type"] : null)),
                          requestBody: bodyify(options.body, flatHeaders["content-type"]),
                          requestMethod: options.method,
                          url: url
                      });
                  }
                  if (processFunc) {
                      try {
                          const result = yield processFunc(body, response);
                          runningTimeout.cancel();
                          return result;
                      }
                      catch (error) {
                          // Allow the processFunc to trigger a throttle
                          if (error.throttleRetry && attempt < attemptLimit) {
                              let tryAgain = true;
                              if (throttleCallback) {
                                  tryAgain = yield throttleCallback(attempt, url);
                              }
                              if (tryAgain) {
                                  const timeout = throttleSlotInterval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                                  //console.log("Stalling callback");
                                  yield staller(timeout);
                                  continue;
                              }
                          }
                          runningTimeout.cancel();
                          logger$4.throwError("processing response error", Logger.errors.SERVER_ERROR, {
                              body: bodyify(body, ((response.headers) ? response.headers["content-type"] : null)),
                              error: error,
                              requestBody: bodyify(options.body, flatHeaders["content-type"]),
                              requestMethod: options.method,
                              url: url
                          });
                      }
                  }
                  runningTimeout.cancel();
                  // If we had a processFunc, it either returned a T or threw above.
                  // The "body" is now a Uint8Array.
                  return body;
              }
              return logger$4.throwError("failed response", Logger.errors.SERVER_ERROR, {
                  requestBody: bodyify(options.body, flatHeaders["content-type"]),
                  requestMethod: options.method,
                  url: url
              });
          });
      })();
      return Promise.race([runningTimeout.promise, runningFetch]);
  }
  function fetchJson(connection, json, processFunc) {
      let processJsonFunc = (value, response) => {
          let result = null;
          if (value != null) {
              try {
                  result = JSON.parse(toUtf8String(value));
              }
              catch (error) {
                  logger$4.throwError("invalid JSON", Logger.errors.SERVER_ERROR, {
                      body: value,
                      error: error
                  });
              }
          }
          if (processFunc) {
              result = processFunc(result, response);
          }
          return result;
      };
      // If we have json to send, we must
      // - add content-type of application/json (unless already overridden)
      // - convert the json to bytes
      let body = null;
      if (json != null) {
          body = toUtf8Bytes(json);
          // Create a connection with the content-type set for JSON
          const updated = (typeof (connection) === "string") ? ({ url: connection }) : shallowCopy(connection);
          if (updated.headers) {
              const hasContentType = (Object.keys(updated.headers).filter((k) => (k.toLowerCase() === "content-type")).length) !== 0;
              if (!hasContentType) {
                  updated.headers = shallowCopy(updated.headers);
                  updated.headers["content-type"] = "application/json";
              }
          }
          else {
              updated.headers = { "content-type": "application/json" };
          }
          connection = updated;
      }
      return _fetchData(connection, body, processJsonFunc);
  }
  function poll(func, options) {
      if (!options) {
          options = {};
      }
      options = shallowCopy(options);
      if (options.floor == null) {
          options.floor = 0;
      }
      if (options.ceiling == null) {
          options.ceiling = 10000;
      }
      if (options.interval == null) {
          options.interval = 250;
      }
      return new Promise(function (resolve, reject) {
          let timer = null;
          let done = false;
          // Returns true if cancel was successful. Unsuccessful cancel means we're already done.
          const cancel = () => {
              if (done) {
                  return false;
              }
              done = true;
              if (timer) {
                  clearTimeout(timer);
              }
              return true;
          };
          if (options.timeout) {
              timer = setTimeout(() => {
                  if (cancel()) {
                      reject(new Error("timeout"));
                  }
              }, options.timeout);
          }
          const retryLimit = options.retryLimit;
          let attempt = 0;
          function check() {
              return func().then(function (result) {
                  // If we have a result, or are allowed null then we're done
                  if (result !== undefined) {
                      if (cancel()) {
                          resolve(result);
                      }
                  }
                  else if (options.oncePoll) {
                      options.oncePoll.once("poll", check);
                  }
                  else if (options.onceBlock) {
                      options.onceBlock.once("block", check);
                      // Otherwise, exponential back-off (up to 10s) our next request
                  }
                  else if (!done) {
                      attempt++;
                      if (attempt > retryLimit) {
                          if (cancel()) {
                              reject(new Error("retry limit reached"));
                          }
                          return;
                      }
                      let timeout = options.interval * parseInt(String(Math.random() * Math.pow(2, attempt)));
                      if (timeout < options.floor) {
                          timeout = options.floor;
                      }
                      if (timeout > options.ceiling) {
                          timeout = options.ceiling;
                      }
                      setTimeout(check, timeout);
                  }
                  return null;
              }, function (error) {
                  if (cancel()) {
                      reject(error);
                  }
              });
          }
          check();
      });
  }

  var ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

  // pre-compute lookup table
  var ALPHABET_MAP = {};
  for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z);

    if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
    ALPHABET_MAP[x] = z;
  }

  function polymodStep (pre) {
    var b = pre >> 25;
    return ((pre & 0x1FFFFFF) << 5) ^
      (-((b >> 0) & 1) & 0x3b6a57b2) ^
      (-((b >> 1) & 1) & 0x26508e6d) ^
      (-((b >> 2) & 1) & 0x1ea119fa) ^
      (-((b >> 3) & 1) & 0x3d4233dd) ^
      (-((b >> 4) & 1) & 0x2a1462b3)
  }

  function prefixChk (prefix) {
    var chk = 1;
    for (var i = 0; i < prefix.length; ++i) {
      var c = prefix.charCodeAt(i);
      if (c < 33 || c > 126) return 'Invalid prefix (' + prefix + ')'

      chk = polymodStep(chk) ^ (c >> 5);
    }
    chk = polymodStep(chk);

    for (i = 0; i < prefix.length; ++i) {
      var v = prefix.charCodeAt(i);
      chk = polymodStep(chk) ^ (v & 0x1f);
    }
    return chk
  }

  function encode (prefix, words, LIMIT) {
    LIMIT = LIMIT || 90;
    if ((prefix.length + 7 + words.length) > LIMIT) throw new TypeError('Exceeds length limit')

    prefix = prefix.toLowerCase();

    // determine chk mod
    var chk = prefixChk(prefix);
    if (typeof chk === 'string') throw new Error(chk)

    var result = prefix + '1';
    for (var i = 0; i < words.length; ++i) {
      var x = words[i];
      if ((x >> 5) !== 0) throw new Error('Non 5-bit word')

      chk = polymodStep(chk) ^ x;
      result += ALPHABET.charAt(x);
    }

    for (i = 0; i < 6; ++i) {
      chk = polymodStep(chk);
    }
    chk ^= 1;

    for (i = 0; i < 6; ++i) {
      var v = (chk >> ((5 - i) * 5)) & 0x1f;
      result += ALPHABET.charAt(v);
    }

    return result
  }

  function __decode (str, LIMIT) {
    LIMIT = LIMIT || 90;
    if (str.length < 8) return str + ' too short'
    if (str.length > LIMIT) return 'Exceeds length limit'

    // don't allow mixed case
    var lowered = str.toLowerCase();
    var uppered = str.toUpperCase();
    if (str !== lowered && str !== uppered) return 'Mixed-case string ' + str
    str = lowered;

    var split = str.lastIndexOf('1');
    if (split === -1) return 'No separator character for ' + str
    if (split === 0) return 'Missing prefix for ' + str

    var prefix = str.slice(0, split);
    var wordChars = str.slice(split + 1);
    if (wordChars.length < 6) return 'Data too short'

    var chk = prefixChk(prefix);
    if (typeof chk === 'string') return chk

    var words = [];
    for (var i = 0; i < wordChars.length; ++i) {
      var c = wordChars.charAt(i);
      var v = ALPHABET_MAP[c];
      if (v === undefined) return 'Unknown character ' + c
      chk = polymodStep(chk) ^ v;

      // not in the checksum?
      if (i + 6 >= wordChars.length) continue
      words.push(v);
    }

    if (chk !== 1) return 'Invalid checksum for ' + str
    return { prefix: prefix, words: words }
  }

  function decodeUnsafe () {
    var res = __decode.apply(null, arguments);
    if (typeof res === 'object') return res
  }

  function decode (str) {
    var res = __decode.apply(null, arguments);
    if (typeof res === 'object') return res

    throw new Error(res)
  }

  function convert (data, inBits, outBits, pad) {
    var value = 0;
    var bits = 0;
    var maxV = (1 << outBits) - 1;

    var result = [];
    for (var i = 0; i < data.length; ++i) {
      value = (value << inBits) | data[i];
      bits += inBits;

      while (bits >= outBits) {
        bits -= outBits;
        result.push((value >> bits) & maxV);
      }
    }

    if (pad) {
      if (bits > 0) {
        result.push((value << (outBits - bits)) & maxV);
      }
    } else {
      if (bits >= inBits) return 'Excess padding'
      if ((value << (outBits - bits)) & maxV) return 'Non-zero padding'
    }

    return result
  }

  function toWordsUnsafe (bytes) {
    var res = convert(bytes, 8, 5, true);
    if (Array.isArray(res)) return res
  }

  function toWords (bytes) {
    var res = convert(bytes, 8, 5, true);
    if (Array.isArray(res)) return res

    throw new Error(res)
  }

  function fromWordsUnsafe (words) {
    var res = convert(words, 5, 8, false);
    if (Array.isArray(res)) return res
  }

  function fromWords (words) {
    var res = convert(words, 5, 8, false);
    if (Array.isArray(res)) return res

    throw new Error(res)
  }

  var bech32 = {
    decodeUnsafe: decodeUnsafe,
    decode: decode,
    encode: encode,
    toWordsUnsafe: toWordsUnsafe,
    toWords: toWords,
    fromWordsUnsafe: fromWordsUnsafe,
    fromWords: fromWords
  };

  const version = "providers/5.5.3";

  const logger$3 = new Logger(version);
  class Formatter {
      constructor() {
          logger$3.checkNew(new.target, Formatter);
          this.formats = this.getDefaultFormats();
      }
      getDefaultFormats() {
          const formats = ({});
          const address = this.address.bind(this);
          const bigNumber = this.bigNumber.bind(this);
          const blockTag = this.blockTag.bind(this);
          const data = this.data.bind(this);
          const hash = this.hash.bind(this);
          const hex = this.hex.bind(this);
          const number = this.number.bind(this);
          const type = this.type.bind(this);
          const strictData = (v) => { return this.data(v, true); };
          formats.transaction = {
              hash: hash,
              type: type,
              accessList: Formatter.allowNull(this.accessList.bind(this), null),
              blockHash: Formatter.allowNull(hash, null),
              blockNumber: Formatter.allowNull(number, null),
              transactionIndex: Formatter.allowNull(number, null),
              confirmations: Formatter.allowNull(number, null),
              from: address,
              // either (gasPrice) or (maxPriorityFeePerGas + maxFeePerGas)
              // must be set
              gasPrice: Formatter.allowNull(bigNumber),
              maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
              maxFeePerGas: Formatter.allowNull(bigNumber),
              gasLimit: bigNumber,
              to: Formatter.allowNull(address, null),
              value: bigNumber,
              nonce: number,
              data: data,
              r: Formatter.allowNull(this.uint256),
              s: Formatter.allowNull(this.uint256),
              v: Formatter.allowNull(number),
              creates: Formatter.allowNull(address, null),
              raw: Formatter.allowNull(data),
          };
          formats.transactionRequest = {
              from: Formatter.allowNull(address),
              nonce: Formatter.allowNull(number),
              gasLimit: Formatter.allowNull(bigNumber),
              gasPrice: Formatter.allowNull(bigNumber),
              maxPriorityFeePerGas: Formatter.allowNull(bigNumber),
              maxFeePerGas: Formatter.allowNull(bigNumber),
              to: Formatter.allowNull(address),
              value: Formatter.allowNull(bigNumber),
              data: Formatter.allowNull(strictData),
              type: Formatter.allowNull(number),
              accessList: Formatter.allowNull(this.accessList.bind(this), null),
          };
          formats.receiptLog = {
              transactionIndex: number,
              blockNumber: number,
              transactionHash: hash,
              address: address,
              topics: Formatter.arrayOf(hash),
              data: data,
              logIndex: number,
              blockHash: hash,
          };
          formats.receipt = {
              to: Formatter.allowNull(this.address, null),
              from: Formatter.allowNull(this.address, null),
              contractAddress: Formatter.allowNull(address, null),
              transactionIndex: number,
              // should be allowNull(hash), but broken-EIP-658 support is handled in receipt
              root: Formatter.allowNull(hex),
              gasUsed: bigNumber,
              logsBloom: Formatter.allowNull(data),
              blockHash: hash,
              transactionHash: hash,
              logs: Formatter.arrayOf(this.receiptLog.bind(this)),
              blockNumber: number,
              confirmations: Formatter.allowNull(number, null),
              cumulativeGasUsed: bigNumber,
              effectiveGasPrice: Formatter.allowNull(bigNumber),
              status: Formatter.allowNull(number),
              type: type
          };
          formats.block = {
              hash: hash,
              parentHash: hash,
              number: number,
              timestamp: number,
              nonce: Formatter.allowNull(hex),
              difficulty: this.difficulty.bind(this),
              gasLimit: bigNumber,
              gasUsed: bigNumber,
              miner: address,
              extraData: data,
              transactions: Formatter.allowNull(Formatter.arrayOf(hash)),
              baseFeePerGas: Formatter.allowNull(bigNumber)
          };
          formats.blockWithTransactions = shallowCopy(formats.block);
          formats.blockWithTransactions.transactions = Formatter.allowNull(Formatter.arrayOf(this.transactionResponse.bind(this)));
          formats.filter = {
              fromBlock: Formatter.allowNull(blockTag, undefined),
              toBlock: Formatter.allowNull(blockTag, undefined),
              blockHash: Formatter.allowNull(hash, undefined),
              address: Formatter.allowNull(address, undefined),
              topics: Formatter.allowNull(this.topics.bind(this), undefined),
          };
          formats.filterLog = {
              blockNumber: Formatter.allowNull(number),
              blockHash: Formatter.allowNull(hash),
              transactionIndex: number,
              removed: Formatter.allowNull(this.boolean.bind(this)),
              address: address,
              data: Formatter.allowFalsish(data, "0x"),
              topics: Formatter.arrayOf(hash),
              transactionHash: hash,
              logIndex: number,
          };
          return formats;
      }
      accessList(accessList) {
          return accessListify(accessList || []);
      }
      // Requires a BigNumberish that is within the IEEE754 safe integer range; returns a number
      // Strict! Used on input.
      number(number) {
          if (number === "0x") {
              return 0;
          }
          return BigNumber.from(number).toNumber();
      }
      type(number) {
          if (number === "0x" || number == null) {
              return 0;
          }
          return BigNumber.from(number).toNumber();
      }
      // Strict! Used on input.
      bigNumber(value) {
          return BigNumber.from(value);
      }
      // Requires a boolean, "true" or  "false"; returns a boolean
      boolean(value) {
          if (typeof (value) === "boolean") {
              return value;
          }
          if (typeof (value) === "string") {
              value = value.toLowerCase();
              if (value === "true") {
                  return true;
              }
              if (value === "false") {
                  return false;
              }
          }
          throw new Error("invalid boolean - " + value);
      }
      hex(value, strict) {
          if (typeof (value) === "string") {
              if (!strict && value.substring(0, 2) !== "0x") {
                  value = "0x" + value;
              }
              if (isHexString(value)) {
                  return value.toLowerCase();
              }
          }
          return logger$3.throwArgumentError("invalid hash", "value", value);
      }
      data(value, strict) {
          const result = this.hex(value, strict);
          if ((result.length % 2) !== 0) {
              throw new Error("invalid data; odd-length - " + value);
          }
          return result;
      }
      // Requires an address
      // Strict! Used on input.
      address(value) {
          return getAddress(value);
      }
      callAddress(value) {
          if (!isHexString(value, 32)) {
              return null;
          }
          const address = getAddress(hexDataSlice(value, 12));
          return (address === AddressZero) ? null : address;
      }
      contractAddress(value) {
          return getContractAddress(value);
      }
      // Strict! Used on input.
      blockTag(blockTag) {
          if (blockTag == null) {
              return "latest";
          }
          if (blockTag === "earliest") {
              return "0x0";
          }
          if (blockTag === "latest" || blockTag === "pending") {
              return blockTag;
          }
          if (typeof (blockTag) === "number" || isHexString(blockTag)) {
              return hexValue(blockTag);
          }
          throw new Error("invalid blockTag");
      }
      // Requires a hash, optionally requires 0x prefix; returns prefixed lowercase hash.
      hash(value, strict) {
          const result = this.hex(value, strict);
          if (hexDataLength(result) !== 32) {
              return logger$3.throwArgumentError("invalid hash", "value", value);
          }
          return result;
      }
      // Returns the difficulty as a number, or if too large (i.e. PoA network) null
      difficulty(value) {
          if (value == null) {
              return null;
          }
          const v = BigNumber.from(value);
          try {
              return v.toNumber();
          }
          catch (error) { }
          return null;
      }
      uint256(value) {
          if (!isHexString(value)) {
              throw new Error("invalid uint256");
          }
          return hexZeroPad(value, 32);
      }
      _block(value, format) {
          if (value.author != null && value.miner == null) {
              value.miner = value.author;
          }
          // The difficulty may need to come from _difficulty in recursed blocks
          const difficulty = (value._difficulty != null) ? value._difficulty : value.difficulty;
          const result = Formatter.check(format, value);
          result._difficulty = ((difficulty == null) ? null : BigNumber.from(difficulty));
          return result;
      }
      block(value) {
          return this._block(value, this.formats.block);
      }
      blockWithTransactions(value) {
          return this._block(value, this.formats.blockWithTransactions);
      }
      // Strict! Used on input.
      transactionRequest(value) {
          return Formatter.check(this.formats.transactionRequest, value);
      }
      transactionResponse(transaction) {
          // Rename gas to gasLimit
          if (transaction.gas != null && transaction.gasLimit == null) {
              transaction.gasLimit = transaction.gas;
          }
          // Some clients (TestRPC) do strange things like return 0x0 for the
          // 0 address; correct this to be a real address
          if (transaction.to && BigNumber.from(transaction.to).isZero()) {
              transaction.to = "0x0000000000000000000000000000000000000000";
          }
          // Rename input to data
          if (transaction.input != null && transaction.data == null) {
              transaction.data = transaction.input;
          }
          // If to and creates are empty, populate the creates from the transaction
          if (transaction.to == null && transaction.creates == null) {
              transaction.creates = this.contractAddress(transaction);
          }
          if ((transaction.type === 1 || transaction.type === 2) && transaction.accessList == null) {
              transaction.accessList = [];
          }
          const result = Formatter.check(this.formats.transaction, transaction);
          if (transaction.chainId != null) {
              let chainId = transaction.chainId;
              if (isHexString(chainId)) {
                  chainId = BigNumber.from(chainId).toNumber();
              }
              result.chainId = chainId;
          }
          else {
              let chainId = transaction.networkId;
              // geth-etc returns chainId
              if (chainId == null && result.v == null) {
                  chainId = transaction.chainId;
              }
              if (isHexString(chainId)) {
                  chainId = BigNumber.from(chainId).toNumber();
              }
              if (typeof (chainId) !== "number" && result.v != null) {
                  chainId = (result.v - 35) / 2;
                  if (chainId < 0) {
                      chainId = 0;
                  }
                  chainId = parseInt(chainId);
              }
              if (typeof (chainId) !== "number") {
                  chainId = 0;
              }
              result.chainId = chainId;
          }
          // 0x0000... should actually be null
          if (result.blockHash && result.blockHash.replace(/0/g, "") === "x") {
              result.blockHash = null;
          }
          return result;
      }
      transaction(value) {
          return parse(value);
      }
      receiptLog(value) {
          return Formatter.check(this.formats.receiptLog, value);
      }
      receipt(value) {
          const result = Formatter.check(this.formats.receipt, value);
          // RSK incorrectly implemented EIP-658, so we munge things a bit here for it
          if (result.root != null) {
              if (result.root.length <= 4) {
                  // Could be 0x00, 0x0, 0x01 or 0x1
                  const value = BigNumber.from(result.root).toNumber();
                  if (value === 0 || value === 1) {
                      // Make sure if both are specified, they match
                      if (result.status != null && (result.status !== value)) {
                          logger$3.throwArgumentError("alt-root-status/status mismatch", "value", { root: result.root, status: result.status });
                      }
                      result.status = value;
                      delete result.root;
                  }
                  else {
                      logger$3.throwArgumentError("invalid alt-root-status", "value.root", result.root);
                  }
              }
              else if (result.root.length !== 66) {
                  // Must be a valid bytes32
                  logger$3.throwArgumentError("invalid root hash", "value.root", result.root);
              }
          }
          if (result.status != null) {
              result.byzantium = true;
          }
          return result;
      }
      topics(value) {
          if (Array.isArray(value)) {
              return value.map((v) => this.topics(v));
          }
          else if (value != null) {
              return this.hash(value, true);
          }
          return null;
      }
      filter(value) {
          return Formatter.check(this.formats.filter, value);
      }
      filterLog(value) {
          return Formatter.check(this.formats.filterLog, value);
      }
      static check(format, object) {
          const result = {};
          for (const key in format) {
              try {
                  const value = format[key](object[key]);
                  if (value !== undefined) {
                      result[key] = value;
                  }
              }
              catch (error) {
                  error.checkKey = key;
                  error.checkValue = object[key];
                  throw error;
              }
          }
          return result;
      }
      // if value is null-ish, nullValue is returned
      static allowNull(format, nullValue) {
          return (function (value) {
              if (value == null) {
                  return nullValue;
              }
              return format(value);
          });
      }
      // If value is false-ish, replaceValue is returned
      static allowFalsish(format, replaceValue) {
          return (function (value) {
              if (!value) {
                  return replaceValue;
              }
              return format(value);
          });
      }
      // Requires an Array satisfying check
      static arrayOf(format) {
          return (function (array) {
              if (!Array.isArray(array)) {
                  throw new Error("not an array");
              }
              const result = [];
              array.forEach(function (value) {
                  result.push(format(value));
              });
              return result;
          });
      }
  }

  var __awaiter$1 = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  const logger$2 = new Logger(version);
  //////////////////////////////
  // Event Serializeing
  function checkTopic(topic) {
      if (topic == null) {
          return "null";
      }
      if (hexDataLength(topic) !== 32) {
          logger$2.throwArgumentError("invalid topic", "topic", topic);
      }
      return topic.toLowerCase();
  }
  function serializeTopics(topics) {
      // Remove trailing null AND-topics; they are redundant
      topics = topics.slice();
      while (topics.length > 0 && topics[topics.length - 1] == null) {
          topics.pop();
      }
      return topics.map((topic) => {
          if (Array.isArray(topic)) {
              // Only track unique OR-topics
              const unique = {};
              topic.forEach((topic) => {
                  unique[checkTopic(topic)] = true;
              });
              // The order of OR-topics does not matter
              const sorted = Object.keys(unique);
              sorted.sort();
              return sorted.join("|");
          }
          else {
              return checkTopic(topic);
          }
      }).join("&");
  }
  function deserializeTopics(data) {
      if (data === "") {
          return [];
      }
      return data.split(/&/g).map((topic) => {
          if (topic === "") {
              return [];
          }
          const comps = topic.split("|").map((topic) => {
              return ((topic === "null") ? null : topic);
          });
          return ((comps.length === 1) ? comps[0] : comps);
      });
  }
  function getEventTag(eventName) {
      if (typeof (eventName) === "string") {
          eventName = eventName.toLowerCase();
          if (hexDataLength(eventName) === 32) {
              return "tx:" + eventName;
          }
          if (eventName.indexOf(":") === -1) {
              return eventName;
          }
      }
      else if (Array.isArray(eventName)) {
          return "filter:*:" + serializeTopics(eventName);
      }
      else if (ForkEvent.isForkEvent(eventName)) {
          logger$2.warn("not implemented");
          throw new Error("not implemented");
      }
      else if (eventName && typeof (eventName) === "object") {
          return "filter:" + (eventName.address || "*") + ":" + serializeTopics(eventName.topics || []);
      }
      throw new Error("invalid event - " + eventName);
  }
  //////////////////////////////
  // Helper Object
  function getTime() {
      return (new Date()).getTime();
  }
  function stall(duration) {
      return new Promise((resolve) => {
          setTimeout(resolve, duration);
      });
  }
  //////////////////////////////
  // Provider Object
  /**
   *  EventType
   *   - "block"
   *   - "poll"
   *   - "didPoll"
   *   - "pending"
   *   - "error"
   *   - "network"
   *   - filter
   *   - topics array
   *   - transaction hash
   */
  const PollableEvents = ["block", "network", "pending", "poll"];
  class Event {
      constructor(tag, listener, once) {
          defineReadOnly(this, "tag", tag);
          defineReadOnly(this, "listener", listener);
          defineReadOnly(this, "once", once);
      }
      get event() {
          switch (this.type) {
              case "tx":
                  return this.hash;
              case "filter":
                  return this.filter;
          }
          return this.tag;
      }
      get type() {
          return this.tag.split(":")[0];
      }
      get hash() {
          const comps = this.tag.split(":");
          if (comps[0] !== "tx") {
              return null;
          }
          return comps[1];
      }
      get filter() {
          const comps = this.tag.split(":");
          if (comps[0] !== "filter") {
              return null;
          }
          const address = comps[1];
          const topics = deserializeTopics(comps[2]);
          const filter = {};
          if (topics.length > 0) {
              filter.topics = topics;
          }
          if (address && address !== "*") {
              filter.address = address;
          }
          return filter;
      }
      pollable() {
          return (this.tag.indexOf(":") >= 0 || PollableEvents.indexOf(this.tag) >= 0);
      }
  }
  // https://github.com/satoshilabs/slips/blob/master/slip-0044.md
  const coinInfos = {
      "0": { symbol: "btc", p2pkh: 0x00, p2sh: 0x05, prefix: "bc" },
      "2": { symbol: "ltc", p2pkh: 0x30, p2sh: 0x32, prefix: "ltc" },
      "3": { symbol: "doge", p2pkh: 0x1e, p2sh: 0x16 },
      "60": { symbol: "eth", ilk: "eth" },
      "61": { symbol: "etc", ilk: "eth" },
      "700": { symbol: "xdai", ilk: "eth" },
  };
  function bytes32ify(value) {
      return hexZeroPad(BigNumber.from(value).toHexString(), 32);
  }
  // Compute the Base58Check encoded data (checksum is first 4 bytes of sha256d)
  function base58Encode(data) {
      return Base58.encode(concat([data, hexDataSlice(sha256(sha256(data)), 0, 4)]));
  }
  const matcherIpfs = new RegExp("^(ipfs):/\/(.*)$", "i");
  const matchers = [
      new RegExp("^(https):/\/(.*)$", "i"),
      new RegExp("^(data):(.*)$", "i"),
      matcherIpfs,
      new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i"),
  ];
  function _parseString(result) {
      try {
          return toUtf8String(_parseBytes(result));
      }
      catch (error) { }
      return null;
  }
  function _parseBytes(result) {
      if (result === "0x") {
          return null;
      }
      const offset = BigNumber.from(hexDataSlice(result, 0, 32)).toNumber();
      const length = BigNumber.from(hexDataSlice(result, offset, offset + 32)).toNumber();
      return hexDataSlice(result, offset + 32, offset + 32 + length);
  }
  // Trim off the ipfs:// prefix and return the default gateway URL
  function getIpfsLink(link) {
      if (link.match(/^ipfs:\/\/ipfs\//i)) {
          link = link.substring(12);
      }
      else if (link.match(/^ipfs:\/\//i)) {
          link = link.substring(7);
      }
      else {
          logger$2.throwArgumentError("unsupported IPFS format", "link", link);
      }
      return `https:/\/gateway.ipfs.io/ipfs/${link}`;
  }
  class Resolver {
      // The resolvedAddress is only for creating a ReverseLookup resolver
      constructor(provider, address, name, resolvedAddress) {
          defineReadOnly(this, "provider", provider);
          defineReadOnly(this, "name", name);
          defineReadOnly(this, "address", provider.formatter.address(address));
          defineReadOnly(this, "_resolvedAddress", resolvedAddress);
      }
      _fetchBytes(selector, parameters) {
          return __awaiter$1(this, void 0, void 0, function* () {
              // e.g. keccak256("addr(bytes32,uint256)")
              const tx = {
                  to: this.address,
                  data: hexConcat([selector, namehash(this.name), (parameters || "0x")])
              };
              try {
                  return _parseBytes(yield this.provider.call(tx));
              }
              catch (error) {
                  if (error.code === Logger.errors.CALL_EXCEPTION) {
                      return null;
                  }
                  return null;
              }
          });
      }
      _getAddress(coinType, hexBytes) {
          const coinInfo = coinInfos[String(coinType)];
          if (coinInfo == null) {
              logger$2.throwError(`unsupported coin type: ${coinType}`, Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: `getAddress(${coinType})`
              });
          }
          if (coinInfo.ilk === "eth") {
              return this.provider.formatter.address(hexBytes);
          }
          const bytes = arrayify(hexBytes);
          // P2PKH: OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
          if (coinInfo.p2pkh != null) {
              const p2pkh = hexBytes.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
              if (p2pkh) {
                  const length = parseInt(p2pkh[1], 16);
                  if (p2pkh[2].length === length * 2 && length >= 1 && length <= 75) {
                      return base58Encode(concat([[coinInfo.p2pkh], ("0x" + p2pkh[2])]));
                  }
              }
          }
          // P2SH: OP_HASH160 <scriptHash> OP_EQUAL
          if (coinInfo.p2sh != null) {
              const p2sh = hexBytes.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
              if (p2sh) {
                  const length = parseInt(p2sh[1], 16);
                  if (p2sh[2].length === length * 2 && length >= 1 && length <= 75) {
                      return base58Encode(concat([[coinInfo.p2sh], ("0x" + p2sh[2])]));
                  }
              }
          }
          // Bech32
          if (coinInfo.prefix != null) {
              const length = bytes[1];
              // https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki#witness-program
              let version = bytes[0];
              if (version === 0x00) {
                  if (length !== 20 && length !== 32) {
                      version = -1;
                  }
              }
              else {
                  version = -1;
              }
              if (version >= 0 && bytes.length === 2 + length && length >= 1 && length <= 75) {
                  const words = bech32.toWords(bytes.slice(2));
                  words.unshift(version);
                  return bech32.encode(coinInfo.prefix, words);
              }
          }
          return null;
      }
      getAddress(coinType) {
          return __awaiter$1(this, void 0, void 0, function* () {
              if (coinType == null) {
                  coinType = 60;
              }
              // If Ethereum, use the standard `addr(bytes32)`
              if (coinType === 60) {
                  try {
                      // keccak256("addr(bytes32)")
                      const transaction = {
                          to: this.address,
                          data: ("0x3b3b57de" + namehash(this.name).substring(2))
                      };
                      const hexBytes = yield this.provider.call(transaction);
                      // No address
                      if (hexBytes === "0x" || hexBytes === HashZero) {
                          return null;
                      }
                      return this.provider.formatter.callAddress(hexBytes);
                  }
                  catch (error) {
                      if (error.code === Logger.errors.CALL_EXCEPTION) {
                          return null;
                      }
                      throw error;
                  }
              }
              // keccak256("addr(bytes32,uint256")
              const hexBytes = yield this._fetchBytes("0xf1cb7e06", bytes32ify(coinType));
              // No address
              if (hexBytes == null || hexBytes === "0x") {
                  return null;
              }
              // Compute the address
              const address = this._getAddress(coinType, hexBytes);
              if (address == null) {
                  logger$2.throwError(`invalid or unsupported coin data`, Logger.errors.UNSUPPORTED_OPERATION, {
                      operation: `getAddress(${coinType})`,
                      coinType: coinType,
                      data: hexBytes
                  });
              }
              return address;
          });
      }
      getAvatar() {
          return __awaiter$1(this, void 0, void 0, function* () {
              const linkage = [{ type: "name", content: this.name }];
              try {
                  // test data for ricmoo.eth
                  //const avatar = "eip155:1/erc721:0x265385c7f4132228A0d54EB1A9e7460b91c0cC68/29233";
                  const avatar = yield this.getText("avatar");
                  if (avatar == null) {
                      return null;
                  }
                  for (let i = 0; i < matchers.length; i++) {
                      const match = avatar.match(matchers[i]);
                      if (match == null) {
                          continue;
                      }
                      const scheme = match[1].toLowerCase();
                      switch (scheme) {
                          case "https":
                              linkage.push({ type: "url", content: avatar });
                              return { linkage, url: avatar };
                          case "data":
                              linkage.push({ type: "data", content: avatar });
                              return { linkage, url: avatar };
                          case "ipfs":
                              linkage.push({ type: "ipfs", content: avatar });
                              return { linkage, url: getIpfsLink(avatar) };
                          case "erc721":
                          case "erc1155": {
                              // Depending on the ERC type, use tokenURI(uint256) or url(uint256)
                              const selector = (scheme === "erc721") ? "0xc87b56dd" : "0x0e89341c";
                              linkage.push({ type: scheme, content: avatar });
                              // The owner of this name
                              const owner = (this._resolvedAddress || (yield this.getAddress()));
                              const comps = (match[2] || "").split("/");
                              if (comps.length !== 2) {
                                  return null;
                              }
                              const addr = yield this.provider.formatter.address(comps[0]);
                              const tokenId = hexZeroPad(BigNumber.from(comps[1]).toHexString(), 32);
                              // Check that this account owns the token
                              if (scheme === "erc721") {
                                  // ownerOf(uint256 tokenId)
                                  const tokenOwner = this.provider.formatter.callAddress(yield this.provider.call({
                                      to: addr, data: hexConcat(["0x6352211e", tokenId])
                                  }));
                                  if (owner !== tokenOwner) {
                                      return null;
                                  }
                                  linkage.push({ type: "owner", content: tokenOwner });
                              }
                              else if (scheme === "erc1155") {
                                  // balanceOf(address owner, uint256 tokenId)
                                  const balance = BigNumber.from(yield this.provider.call({
                                      to: addr, data: hexConcat(["0x00fdd58e", hexZeroPad(owner, 32), tokenId])
                                  }));
                                  if (balance.isZero()) {
                                      return null;
                                  }
                                  linkage.push({ type: "balance", content: balance.toString() });
                              }
                              // Call the token contract for the metadata URL
                              const tx = {
                                  to: this.provider.formatter.address(comps[0]),
                                  data: hexConcat([selector, tokenId])
                              };
                              let metadataUrl = _parseString(yield this.provider.call(tx));
                              if (metadataUrl == null) {
                                  return null;
                              }
                              linkage.push({ type: "metadata-url-base", content: metadataUrl });
                              // ERC-1155 allows a generic {id} in the URL
                              if (scheme === "erc1155") {
                                  metadataUrl = metadataUrl.replace("{id}", tokenId.substring(2));
                                  linkage.push({ type: "metadata-url-expanded", content: metadataUrl });
                              }
                              // Transform IPFS metadata links
                              if (metadataUrl.match(/^ipfs:/i)) {
                                  metadataUrl = getIpfsLink(metadataUrl);
                              }
                              linkage.push({ type: "metadata-url", content: metadataUrl });
                              // Get the token metadata
                              const metadata = yield fetchJson(metadataUrl);
                              if (!metadata) {
                                  return null;
                              }
                              linkage.push({ type: "metadata", content: JSON.stringify(metadata) });
                              // Pull the image URL out
                              let imageUrl = metadata.image;
                              if (typeof (imageUrl) !== "string") {
                                  return null;
                              }
                              if (imageUrl.match(/^(https:\/\/|data:)/i)) {
                                  // Allow
                              }
                              else {
                                  // Transform IPFS link to gateway
                                  const ipfs = imageUrl.match(matcherIpfs);
                                  if (ipfs == null) {
                                      return null;
                                  }
                                  linkage.push({ type: "url-ipfs", content: imageUrl });
                                  imageUrl = getIpfsLink(imageUrl);
                              }
                              linkage.push({ type: "url", content: imageUrl });
                              return { linkage, url: imageUrl };
                          }
                      }
                  }
              }
              catch (error) { }
              return null;
          });
      }
      getContentHash() {
          return __awaiter$1(this, void 0, void 0, function* () {
              // keccak256("contenthash()")
              const hexBytes = yield this._fetchBytes("0xbc1c58d1");
              // No contenthash
              if (hexBytes == null || hexBytes === "0x") {
                  return null;
              }
              // IPFS (CID: 1, Type: DAG-PB)
              const ipfs = hexBytes.match(/^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/);
              if (ipfs) {
                  const length = parseInt(ipfs[3], 16);
                  if (ipfs[4].length === length * 2) {
                      return "ipfs:/\/" + Base58.encode("0x" + ipfs[1]);
                  }
              }
              // Swarm (CID: 1, Type: swarm-manifest; hash/length hard-coded to keccak256/32)
              const swarm = hexBytes.match(/^0xe40101fa011b20([0-9a-f]*)$/);
              if (swarm) {
                  if (swarm[1].length === (32 * 2)) {
                      return "bzz:/\/" + swarm[1];
                  }
              }
              return logger$2.throwError(`invalid or unsupported content hash data`, Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: "getContentHash()",
                  data: hexBytes
              });
          });
      }
      getText(key) {
          return __awaiter$1(this, void 0, void 0, function* () {
              // The key encoded as parameter to fetchBytes
              let keyBytes = toUtf8Bytes(key);
              // The nodehash consumes the first slot, so the string pointer targets
              // offset 64, with the length at offset 64 and data starting at offset 96
              keyBytes = concat([bytes32ify(64), bytes32ify(keyBytes.length), keyBytes]);
              // Pad to word-size (32 bytes)
              if ((keyBytes.length % 32) !== 0) {
                  keyBytes = concat([keyBytes, hexZeroPad("0x", 32 - (key.length % 32))]);
              }
              const hexBytes = yield this._fetchBytes("0x59d1d43c", hexlify(keyBytes));
              if (hexBytes == null || hexBytes === "0x") {
                  return null;
              }
              return toUtf8String(hexBytes);
          });
      }
  }
  let defaultFormatter = null;
  let nextPollId = 1;
  class BaseProvider extends Provider {
      /**
       *  ready
       *
       *  A Promise<Network> that resolves only once the provider is ready.
       *
       *  Sub-classes that call the super with a network without a chainId
       *  MUST set this. Standard named networks have a known chainId.
       *
       */
      constructor(network) {
          logger$2.checkNew(new.target, Provider);
          super();
          // Events being listened to
          this._events = [];
          this._emitted = { block: -2 };
          this.formatter = new.target.getFormatter();
          // If network is any, this Provider allows the underlying
          // network to change dynamically, and we auto-detect the
          // current network
          defineReadOnly(this, "anyNetwork", (network === "any"));
          if (this.anyNetwork) {
              network = this.detectNetwork();
          }
          if (network instanceof Promise) {
              this._networkPromise = network;
              // Squash any "unhandled promise" errors; that do not need to be handled
              network.catch((error) => { });
              // Trigger initial network setting (async)
              this._ready().catch((error) => { });
          }
          else {
              const knownNetwork = getStatic(new.target, "getNetwork")(network);
              if (knownNetwork) {
                  defineReadOnly(this, "_network", knownNetwork);
                  this.emit("network", knownNetwork, null);
              }
              else {
                  logger$2.throwArgumentError("invalid network", "network", network);
              }
          }
          this._maxInternalBlockNumber = -1024;
          this._lastBlockNumber = -2;
          this._pollingInterval = 4000;
          this._fastQueryDate = 0;
      }
      _ready() {
          return __awaiter$1(this, void 0, void 0, function* () {
              if (this._network == null) {
                  let network = null;
                  if (this._networkPromise) {
                      try {
                          network = yield this._networkPromise;
                      }
                      catch (error) { }
                  }
                  // Try the Provider's network detection (this MUST throw if it cannot)
                  if (network == null) {
                      network = yield this.detectNetwork();
                  }
                  // This should never happen; every Provider sub-class should have
                  // suggested a network by here (or have thrown).
                  if (!network) {
                      logger$2.throwError("no network detected", Logger.errors.UNKNOWN_ERROR, {});
                  }
                  // Possible this call stacked so do not call defineReadOnly again
                  if (this._network == null) {
                      if (this.anyNetwork) {
                          this._network = network;
                      }
                      else {
                          defineReadOnly(this, "_network", network);
                      }
                      this.emit("network", network, null);
                  }
              }
              return this._network;
          });
      }
      // This will always return the most recently established network.
      // For "any", this can change (a "network" event is emitted before
      // any change is reflected); otherwise this cannot change
      get ready() {
          return poll(() => {
              return this._ready().then((network) => {
                  return network;
              }, (error) => {
                  // If the network isn't running yet, we will wait
                  if (error.code === Logger.errors.NETWORK_ERROR && error.event === "noNetwork") {
                      return undefined;
                  }
                  throw error;
              });
          });
      }
      // @TODO: Remove this and just create a singleton formatter
      static getFormatter() {
          if (defaultFormatter == null) {
              defaultFormatter = new Formatter();
          }
          return defaultFormatter;
      }
      // @TODO: Remove this and just use getNetwork
      static getNetwork(network) {
          return getNetwork((network == null) ? "homestead" : network);
      }
      // Fetches the blockNumber, but will reuse any result that is less
      // than maxAge old or has been requested since the last request
      _getInternalBlockNumber(maxAge) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this._ready();
              // Allowing stale data up to maxAge old
              if (maxAge > 0) {
                  // While there are pending internal block requests...
                  while (this._internalBlockNumber) {
                      // ..."remember" which fetch we started with
                      const internalBlockNumber = this._internalBlockNumber;
                      try {
                          // Check the result is not too stale
                          const result = yield internalBlockNumber;
                          if ((getTime() - result.respTime) <= maxAge) {
                              return result.blockNumber;
                          }
                          // Too old; fetch a new value
                          break;
                      }
                      catch (error) {
                          // The fetch rejected; if we are the first to get the
                          // rejection, drop through so we replace it with a new
                          // fetch; all others blocked will then get that fetch
                          // which won't match the one they "remembered" and loop
                          if (this._internalBlockNumber === internalBlockNumber) {
                              break;
                          }
                      }
                  }
              }
              const reqTime = getTime();
              const checkInternalBlockNumber = resolveProperties({
                  blockNumber: this.perform("getBlockNumber", {}),
                  networkError: this.getNetwork().then((network) => (null), (error) => (error))
              }).then(({ blockNumber, networkError }) => {
                  if (networkError) {
                      // Unremember this bad internal block number
                      if (this._internalBlockNumber === checkInternalBlockNumber) {
                          this._internalBlockNumber = null;
                      }
                      throw networkError;
                  }
                  const respTime = getTime();
                  blockNumber = BigNumber.from(blockNumber).toNumber();
                  if (blockNumber < this._maxInternalBlockNumber) {
                      blockNumber = this._maxInternalBlockNumber;
                  }
                  this._maxInternalBlockNumber = blockNumber;
                  this._setFastBlockNumber(blockNumber); // @TODO: Still need this?
                  return { blockNumber, reqTime, respTime };
              });
              this._internalBlockNumber = checkInternalBlockNumber;
              // Swallow unhandled exceptions; if needed they are handled else where
              checkInternalBlockNumber.catch((error) => {
                  // Don't null the dead (rejected) fetch, if it has already been updated
                  if (this._internalBlockNumber === checkInternalBlockNumber) {
                      this._internalBlockNumber = null;
                  }
              });
              return (yield checkInternalBlockNumber).blockNumber;
          });
      }
      poll() {
          return __awaiter$1(this, void 0, void 0, function* () {
              const pollId = nextPollId++;
              // Track all running promises, so we can trigger a post-poll once they are complete
              const runners = [];
              let blockNumber = null;
              try {
                  blockNumber = yield this._getInternalBlockNumber(100 + this.pollingInterval / 2);
              }
              catch (error) {
                  this.emit("error", error);
                  return;
              }
              this._setFastBlockNumber(blockNumber);
              // Emit a poll event after we have the latest (fast) block number
              this.emit("poll", pollId, blockNumber);
              // If the block has not changed, meh.
              if (blockNumber === this._lastBlockNumber) {
                  this.emit("didPoll", pollId);
                  return;
              }
              // First polling cycle, trigger a "block" events
              if (this._emitted.block === -2) {
                  this._emitted.block = blockNumber - 1;
              }
              if (Math.abs((this._emitted.block) - blockNumber) > 1000) {
                  logger$2.warn(`network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${blockNumber})`);
                  this.emit("error", logger$2.makeError("network block skew detected", Logger.errors.NETWORK_ERROR, {
                      blockNumber: blockNumber,
                      event: "blockSkew",
                      previousBlockNumber: this._emitted.block
                  }));
                  this.emit("block", blockNumber);
              }
              else {
                  // Notify all listener for each block that has passed
                  for (let i = this._emitted.block + 1; i <= blockNumber; i++) {
                      this.emit("block", i);
                  }
              }
              // The emitted block was updated, check for obsolete events
              if (this._emitted.block !== blockNumber) {
                  this._emitted.block = blockNumber;
                  Object.keys(this._emitted).forEach((key) => {
                      // The block event does not expire
                      if (key === "block") {
                          return;
                      }
                      // The block we were at when we emitted this event
                      const eventBlockNumber = this._emitted[key];
                      // We cannot garbage collect pending transactions or blocks here
                      // They should be garbage collected by the Provider when setting
                      // "pending" events
                      if (eventBlockNumber === "pending") {
                          return;
                      }
                      // Evict any transaction hashes or block hashes over 12 blocks
                      // old, since they should not return null anyways
                      if (blockNumber - eventBlockNumber > 12) {
                          delete this._emitted[key];
                      }
                  });
              }
              // First polling cycle
              if (this._lastBlockNumber === -2) {
                  this._lastBlockNumber = blockNumber - 1;
              }
              // Find all transaction hashes we are waiting on
              this._events.forEach((event) => {
                  switch (event.type) {
                      case "tx": {
                          const hash = event.hash;
                          let runner = this.getTransactionReceipt(hash).then((receipt) => {
                              if (!receipt || receipt.blockNumber == null) {
                                  return null;
                              }
                              this._emitted["t:" + hash] = receipt.blockNumber;
                              this.emit(hash, receipt);
                              return null;
                          }).catch((error) => { this.emit("error", error); });
                          runners.push(runner);
                          break;
                      }
                      case "filter": {
                          const filter = event.filter;
                          filter.fromBlock = this._lastBlockNumber + 1;
                          filter.toBlock = blockNumber;
                          const runner = this.getLogs(filter).then((logs) => {
                              if (logs.length === 0) {
                                  return;
                              }
                              logs.forEach((log) => {
                                  this._emitted["b:" + log.blockHash] = log.blockNumber;
                                  this._emitted["t:" + log.transactionHash] = log.blockNumber;
                                  this.emit(filter, log);
                              });
                          }).catch((error) => { this.emit("error", error); });
                          runners.push(runner);
                          break;
                      }
                  }
              });
              this._lastBlockNumber = blockNumber;
              // Once all events for this loop have been processed, emit "didPoll"
              Promise.all(runners).then(() => {
                  this.emit("didPoll", pollId);
              }).catch((error) => { this.emit("error", error); });
              return;
          });
      }
      // Deprecated; do not use this
      resetEventsBlock(blockNumber) {
          this._lastBlockNumber = blockNumber - 1;
          if (this.polling) {
              this.poll();
          }
      }
      get network() {
          return this._network;
      }
      // This method should query the network if the underlying network
      // can change, such as when connected to a JSON-RPC backend
      detectNetwork() {
          return __awaiter$1(this, void 0, void 0, function* () {
              return logger$2.throwError("provider does not support network detection", Logger.errors.UNSUPPORTED_OPERATION, {
                  operation: "provider.detectNetwork"
              });
          });
      }
      getNetwork() {
          return __awaiter$1(this, void 0, void 0, function* () {
              const network = yield this._ready();
              // Make sure we are still connected to the same network; this is
              // only an external call for backends which can have the underlying
              // network change spontaneously
              const currentNetwork = yield this.detectNetwork();
              if (network.chainId !== currentNetwork.chainId) {
                  // We are allowing network changes, things can get complex fast;
                  // make sure you know what you are doing if you use "any"
                  if (this.anyNetwork) {
                      this._network = currentNetwork;
                      // Reset all internal block number guards and caches
                      this._lastBlockNumber = -2;
                      this._fastBlockNumber = null;
                      this._fastBlockNumberPromise = null;
                      this._fastQueryDate = 0;
                      this._emitted.block = -2;
                      this._maxInternalBlockNumber = -1024;
                      this._internalBlockNumber = null;
                      // The "network" event MUST happen before this method resolves
                      // so any events have a chance to unregister, so we stall an
                      // additional event loop before returning from /this/ call
                      this.emit("network", currentNetwork, network);
                      yield stall(0);
                      return this._network;
                  }
                  const error = logger$2.makeError("underlying network changed", Logger.errors.NETWORK_ERROR, {
                      event: "changed",
                      network: network,
                      detectedNetwork: currentNetwork
                  });
                  this.emit("error", error);
                  throw error;
              }
              return network;
          });
      }
      get blockNumber() {
          this._getInternalBlockNumber(100 + this.pollingInterval / 2).then((blockNumber) => {
              this._setFastBlockNumber(blockNumber);
          }, (error) => { });
          return (this._fastBlockNumber != null) ? this._fastBlockNumber : -1;
      }
      get polling() {
          return (this._poller != null);
      }
      set polling(value) {
          if (value && !this._poller) {
              this._poller = setInterval(() => { this.poll(); }, this.pollingInterval);
              if (!this._bootstrapPoll) {
                  this._bootstrapPoll = setTimeout(() => {
                      this.poll();
                      // We block additional polls until the polling interval
                      // is done, to prevent overwhelming the poll function
                      this._bootstrapPoll = setTimeout(() => {
                          // If polling was disabled, something may require a poke
                          // since starting the bootstrap poll and it was disabled
                          if (!this._poller) {
                              this.poll();
                          }
                          // Clear out the bootstrap so we can do another
                          this._bootstrapPoll = null;
                      }, this.pollingInterval);
                  }, 0);
              }
          }
          else if (!value && this._poller) {
              clearInterval(this._poller);
              this._poller = null;
          }
      }
      get pollingInterval() {
          return this._pollingInterval;
      }
      set pollingInterval(value) {
          if (typeof (value) !== "number" || value <= 0 || parseInt(String(value)) != value) {
              throw new Error("invalid polling interval");
          }
          this._pollingInterval = value;
          if (this._poller) {
              clearInterval(this._poller);
              this._poller = setInterval(() => { this.poll(); }, this._pollingInterval);
          }
      }
      _getFastBlockNumber() {
          const now = getTime();
          // Stale block number, request a newer value
          if ((now - this._fastQueryDate) > 2 * this._pollingInterval) {
              this._fastQueryDate = now;
              this._fastBlockNumberPromise = this.getBlockNumber().then((blockNumber) => {
                  if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
                      this._fastBlockNumber = blockNumber;
                  }
                  return this._fastBlockNumber;
              });
          }
          return this._fastBlockNumberPromise;
      }
      _setFastBlockNumber(blockNumber) {
          // Older block, maybe a stale request
          if (this._fastBlockNumber != null && blockNumber < this._fastBlockNumber) {
              return;
          }
          // Update the time we updated the blocknumber
          this._fastQueryDate = getTime();
          // Newer block number, use  it
          if (this._fastBlockNumber == null || blockNumber > this._fastBlockNumber) {
              this._fastBlockNumber = blockNumber;
              this._fastBlockNumberPromise = Promise.resolve(blockNumber);
          }
      }
      waitForTransaction(transactionHash, confirmations, timeout) {
          return __awaiter$1(this, void 0, void 0, function* () {
              return this._waitForTransaction(transactionHash, (confirmations == null) ? 1 : confirmations, timeout || 0, null);
          });
      }
      _waitForTransaction(transactionHash, confirmations, timeout, replaceable) {
          return __awaiter$1(this, void 0, void 0, function* () {
              const receipt = yield this.getTransactionReceipt(transactionHash);
              // Receipt is already good
              if ((receipt ? receipt.confirmations : 0) >= confirmations) {
                  return receipt;
              }
              // Poll until the receipt is good...
              return new Promise((resolve, reject) => {
                  const cancelFuncs = [];
                  let done = false;
                  const alreadyDone = function () {
                      if (done) {
                          return true;
                      }
                      done = true;
                      cancelFuncs.forEach((func) => { func(); });
                      return false;
                  };
                  const minedHandler = (receipt) => {
                      if (receipt.confirmations < confirmations) {
                          return;
                      }
                      if (alreadyDone()) {
                          return;
                      }
                      resolve(receipt);
                  };
                  this.on(transactionHash, minedHandler);
                  cancelFuncs.push(() => { this.removeListener(transactionHash, minedHandler); });
                  if (replaceable) {
                      let lastBlockNumber = replaceable.startBlock;
                      let scannedBlock = null;
                      const replaceHandler = (blockNumber) => __awaiter$1(this, void 0, void 0, function* () {
                          if (done) {
                              return;
                          }
                          // Wait 1 second; this is only used in the case of a fault, so
                          // we will trade off a little bit of latency for more consistent
                          // results and fewer JSON-RPC calls
                          yield stall(1000);
                          this.getTransactionCount(replaceable.from).then((nonce) => __awaiter$1(this, void 0, void 0, function* () {
                              if (done) {
                                  return;
                              }
                              if (nonce <= replaceable.nonce) {
                                  lastBlockNumber = blockNumber;
                              }
                              else {
                                  // First check if the transaction was mined
                                  {
                                      const mined = yield this.getTransaction(transactionHash);
                                      if (mined && mined.blockNumber != null) {
                                          return;
                                      }
                                  }
                                  // First time scanning. We start a little earlier for some
                                  // wiggle room here to handle the eventually consistent nature
                                  // of blockchain (e.g. the getTransactionCount was for a
                                  // different block)
                                  if (scannedBlock == null) {
                                      scannedBlock = lastBlockNumber - 3;
                                      if (scannedBlock < replaceable.startBlock) {
                                          scannedBlock = replaceable.startBlock;
                                      }
                                  }
                                  while (scannedBlock <= blockNumber) {
                                      if (done) {
                                          return;
                                      }
                                      const block = yield this.getBlockWithTransactions(scannedBlock);
                                      for (let ti = 0; ti < block.transactions.length; ti++) {
                                          const tx = block.transactions[ti];
                                          // Successfully mined!
                                          if (tx.hash === transactionHash) {
                                              return;
                                          }
                                          // Matches our transaction from and nonce; its a replacement
                                          if (tx.from === replaceable.from && tx.nonce === replaceable.nonce) {
                                              if (done) {
                                                  return;
                                              }
                                              // Get the receipt of the replacement
                                              const receipt = yield this.waitForTransaction(tx.hash, confirmations);
                                              // Already resolved or rejected (prolly a timeout)
                                              if (alreadyDone()) {
                                                  return;
                                              }
                                              // The reason we were replaced
                                              let reason = "replaced";
                                              if (tx.data === replaceable.data && tx.to === replaceable.to && tx.value.eq(replaceable.value)) {
                                                  reason = "repriced";
                                              }
                                              else if (tx.data === "0x" && tx.from === tx.to && tx.value.isZero()) {
                                                  reason = "cancelled";
                                              }
                                              // Explain why we were replaced
                                              reject(logger$2.makeError("transaction was replaced", Logger.errors.TRANSACTION_REPLACED, {
                                                  cancelled: (reason === "replaced" || reason === "cancelled"),
                                                  reason,
                                                  replacement: this._wrapTransaction(tx),
                                                  hash: transactionHash,
                                                  receipt
                                              }));
                                              return;
                                          }
                                      }
                                      scannedBlock++;
                                  }
                              }
                              if (done) {
                                  return;
                              }
                              this.once("block", replaceHandler);
                          }), (error) => {
                              if (done) {
                                  return;
                              }
                              this.once("block", replaceHandler);
                          });
                      });
                      if (done) {
                          return;
                      }
                      this.once("block", replaceHandler);
                      cancelFuncs.push(() => {
                          this.removeListener("block", replaceHandler);
                      });
                  }
                  if (typeof (timeout) === "number" && timeout > 0) {
                      const timer = setTimeout(() => {
                          if (alreadyDone()) {
                              return;
                          }
                          reject(logger$2.makeError("timeout exceeded", Logger.errors.TIMEOUT, { timeout: timeout }));
                      }, timeout);
                      if (timer.unref) {
                          timer.unref();
                      }
                      cancelFuncs.push(() => { clearTimeout(timer); });
                  }
              });
          });
      }
      getBlockNumber() {
          return __awaiter$1(this, void 0, void 0, function* () {
              return this._getInternalBlockNumber(0);
          });
      }
      getGasPrice() {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const result = yield this.perform("getGasPrice", {});
              try {
                  return BigNumber.from(result);
              }
              catch (error) {
                  return logger$2.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
                      method: "getGasPrice",
                      result, error
                  });
              }
          });
      }
      getBalance(addressOrName, blockTag) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const params = yield resolveProperties({
                  address: this._getAddress(addressOrName),
                  blockTag: this._getBlockTag(blockTag)
              });
              const result = yield this.perform("getBalance", params);
              try {
                  return BigNumber.from(result);
              }
              catch (error) {
                  return logger$2.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
                      method: "getBalance",
                      params, result, error
                  });
              }
          });
      }
      getTransactionCount(addressOrName, blockTag) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const params = yield resolveProperties({
                  address: this._getAddress(addressOrName),
                  blockTag: this._getBlockTag(blockTag)
              });
              const result = yield this.perform("getTransactionCount", params);
              try {
                  return BigNumber.from(result).toNumber();
              }
              catch (error) {
                  return logger$2.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
                      method: "getTransactionCount",
                      params, result, error
                  });
              }
          });
      }
      getCode(addressOrName, blockTag) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const params = yield resolveProperties({
                  address: this._getAddress(addressOrName),
                  blockTag: this._getBlockTag(blockTag)
              });
              const result = yield this.perform("getCode", params);
              try {
                  return hexlify(result);
              }
              catch (error) {
                  return logger$2.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
                      method: "getCode",
                      params, result, error
                  });
              }
          });
      }
      getStorageAt(addressOrName, position, blockTag) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const params = yield resolveProperties({
                  address: this._getAddress(addressOrName),
                  blockTag: this._getBlockTag(blockTag),
                  position: Promise.resolve(position).then((p) => hexValue(p))
              });
              const result = yield this.perform("getStorageAt", params);
              try {
                  return hexlify(result);
              }
              catch (error) {
                  return logger$2.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
                      method: "getStorageAt",
                      params, result, error
                  });
              }
          });
      }
      // This should be called by any subclass wrapping a TransactionResponse
      _wrapTransaction(tx, hash, startBlock) {
          if (hash != null && hexDataLength(hash) !== 32) {
              throw new Error("invalid response - sendTransaction");
          }
          const result = tx;
          // Check the hash we expect is the same as the hash the server reported
          if (hash != null && tx.hash !== hash) {
              logger$2.throwError("Transaction hash mismatch from Provider.sendTransaction.", Logger.errors.UNKNOWN_ERROR, { expectedHash: tx.hash, returnedHash: hash });
          }
          result.wait = (confirms, timeout) => __awaiter$1(this, void 0, void 0, function* () {
              if (confirms == null) {
                  confirms = 1;
              }
              if (timeout == null) {
                  timeout = 0;
              }
              // Get the details to detect replacement
              let replacement = undefined;
              if (confirms !== 0 && startBlock != null) {
                  replacement = {
                      data: tx.data,
                      from: tx.from,
                      nonce: tx.nonce,
                      to: tx.to,
                      value: tx.value,
                      startBlock
                  };
              }
              const receipt = yield this._waitForTransaction(tx.hash, confirms, timeout, replacement);
              if (receipt == null && confirms === 0) {
                  return null;
              }
              // No longer pending, allow the polling loop to garbage collect this
              this._emitted["t:" + tx.hash] = receipt.blockNumber;
              if (receipt.status === 0) {
                  logger$2.throwError("transaction failed", Logger.errors.CALL_EXCEPTION, {
                      transactionHash: tx.hash,
                      transaction: tx,
                      receipt: receipt
                  });
              }
              return receipt;
          });
          return result;
      }
      sendTransaction(signedTransaction) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const hexTx = yield Promise.resolve(signedTransaction).then(t => hexlify(t));
              const tx = this.formatter.transaction(signedTransaction);
              if (tx.confirmations == null) {
                  tx.confirmations = 0;
              }
              const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
              try {
                  const hash = yield this.perform("sendTransaction", { signedTransaction: hexTx });
                  return this._wrapTransaction(tx, hash, blockNumber);
              }
              catch (error) {
                  error.transaction = tx;
                  error.transactionHash = tx.hash;
                  throw error;
              }
          });
      }
      _getTransactionRequest(transaction) {
          return __awaiter$1(this, void 0, void 0, function* () {
              const values = yield transaction;
              const tx = {};
              ["from", "to"].forEach((key) => {
                  if (values[key] == null) {
                      return;
                  }
                  tx[key] = Promise.resolve(values[key]).then((v) => (v ? this._getAddress(v) : null));
              });
              ["gasLimit", "gasPrice", "maxFeePerGas", "maxPriorityFeePerGas", "value"].forEach((key) => {
                  if (values[key] == null) {
                      return;
                  }
                  tx[key] = Promise.resolve(values[key]).then((v) => (v ? BigNumber.from(v) : null));
              });
              ["type"].forEach((key) => {
                  if (values[key] == null) {
                      return;
                  }
                  tx[key] = Promise.resolve(values[key]).then((v) => ((v != null) ? v : null));
              });
              if (values.accessList) {
                  tx.accessList = this.formatter.accessList(values.accessList);
              }
              ["data"].forEach((key) => {
                  if (values[key] == null) {
                      return;
                  }
                  tx[key] = Promise.resolve(values[key]).then((v) => (v ? hexlify(v) : null));
              });
              return this.formatter.transactionRequest(yield resolveProperties(tx));
          });
      }
      _getFilter(filter) {
          return __awaiter$1(this, void 0, void 0, function* () {
              filter = yield filter;
              const result = {};
              if (filter.address != null) {
                  result.address = this._getAddress(filter.address);
              }
              ["blockHash", "topics"].forEach((key) => {
                  if (filter[key] == null) {
                      return;
                  }
                  result[key] = filter[key];
              });
              ["fromBlock", "toBlock"].forEach((key) => {
                  if (filter[key] == null) {
                      return;
                  }
                  result[key] = this._getBlockTag(filter[key]);
              });
              return this.formatter.filter(yield resolveProperties(result));
          });
      }
      call(transaction, blockTag) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const params = yield resolveProperties({
                  transaction: this._getTransactionRequest(transaction),
                  blockTag: this._getBlockTag(blockTag)
              });
              const result = yield this.perform("call", params);
              try {
                  return hexlify(result);
              }
              catch (error) {
                  return logger$2.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
                      method: "call",
                      params, result, error
                  });
              }
          });
      }
      estimateGas(transaction) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const params = yield resolveProperties({
                  transaction: this._getTransactionRequest(transaction)
              });
              const result = yield this.perform("estimateGas", params);
              try {
                  return BigNumber.from(result);
              }
              catch (error) {
                  return logger$2.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
                      method: "estimateGas",
                      params, result, error
                  });
              }
          });
      }
      _getAddress(addressOrName) {
          return __awaiter$1(this, void 0, void 0, function* () {
              addressOrName = yield addressOrName;
              if (typeof (addressOrName) !== "string") {
                  logger$2.throwArgumentError("invalid address or ENS name", "name", addressOrName);
              }
              const address = yield this.resolveName(addressOrName);
              if (address == null) {
                  logger$2.throwError("ENS name not configured", Logger.errors.UNSUPPORTED_OPERATION, {
                      operation: `resolveName(${JSON.stringify(addressOrName)})`
                  });
              }
              return address;
          });
      }
      _getBlock(blockHashOrBlockTag, includeTransactions) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              blockHashOrBlockTag = yield blockHashOrBlockTag;
              // If blockTag is a number (not "latest", etc), this is the block number
              let blockNumber = -128;
              const params = {
                  includeTransactions: !!includeTransactions
              };
              if (isHexString(blockHashOrBlockTag, 32)) {
                  params.blockHash = blockHashOrBlockTag;
              }
              else {
                  try {
                      params.blockTag = yield this._getBlockTag(blockHashOrBlockTag);
                      if (isHexString(params.blockTag)) {
                          blockNumber = parseInt(params.blockTag.substring(2), 16);
                      }
                  }
                  catch (error) {
                      logger$2.throwArgumentError("invalid block hash or block tag", "blockHashOrBlockTag", blockHashOrBlockTag);
                  }
              }
              return poll(() => __awaiter$1(this, void 0, void 0, function* () {
                  const block = yield this.perform("getBlock", params);
                  // Block was not found
                  if (block == null) {
                      // For blockhashes, if we didn't say it existed, that blockhash may
                      // not exist. If we did see it though, perhaps from a log, we know
                      // it exists, and this node is just not caught up yet.
                      if (params.blockHash != null) {
                          if (this._emitted["b:" + params.blockHash] == null) {
                              return null;
                          }
                      }
                      // For block tags, if we are asking for a future block, we return null
                      if (params.blockTag != null) {
                          if (blockNumber > this._emitted.block) {
                              return null;
                          }
                      }
                      // Retry on the next block
                      return undefined;
                  }
                  // Add transactions
                  if (includeTransactions) {
                      let blockNumber = null;
                      for (let i = 0; i < block.transactions.length; i++) {
                          const tx = block.transactions[i];
                          if (tx.blockNumber == null) {
                              tx.confirmations = 0;
                          }
                          else if (tx.confirmations == null) {
                              if (blockNumber == null) {
                                  blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                              }
                              // Add the confirmations using the fast block number (pessimistic)
                              let confirmations = (blockNumber - tx.blockNumber) + 1;
                              if (confirmations <= 0) {
                                  confirmations = 1;
                              }
                              tx.confirmations = confirmations;
                          }
                      }
                      const blockWithTxs = this.formatter.blockWithTransactions(block);
                      blockWithTxs.transactions = blockWithTxs.transactions.map((tx) => this._wrapTransaction(tx));
                      return blockWithTxs;
                  }
                  return this.formatter.block(block);
              }), { oncePoll: this });
          });
      }
      getBlock(blockHashOrBlockTag) {
          return (this._getBlock(blockHashOrBlockTag, false));
      }
      getBlockWithTransactions(blockHashOrBlockTag) {
          return (this._getBlock(blockHashOrBlockTag, true));
      }
      getTransaction(transactionHash) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              transactionHash = yield transactionHash;
              const params = { transactionHash: this.formatter.hash(transactionHash, true) };
              return poll(() => __awaiter$1(this, void 0, void 0, function* () {
                  const result = yield this.perform("getTransaction", params);
                  if (result == null) {
                      if (this._emitted["t:" + transactionHash] == null) {
                          return null;
                      }
                      return undefined;
                  }
                  const tx = this.formatter.transactionResponse(result);
                  if (tx.blockNumber == null) {
                      tx.confirmations = 0;
                  }
                  else if (tx.confirmations == null) {
                      const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                      // Add the confirmations using the fast block number (pessimistic)
                      let confirmations = (blockNumber - tx.blockNumber) + 1;
                      if (confirmations <= 0) {
                          confirmations = 1;
                      }
                      tx.confirmations = confirmations;
                  }
                  return this._wrapTransaction(tx);
              }), { oncePoll: this });
          });
      }
      getTransactionReceipt(transactionHash) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              transactionHash = yield transactionHash;
              const params = { transactionHash: this.formatter.hash(transactionHash, true) };
              return poll(() => __awaiter$1(this, void 0, void 0, function* () {
                  const result = yield this.perform("getTransactionReceipt", params);
                  if (result == null) {
                      if (this._emitted["t:" + transactionHash] == null) {
                          return null;
                      }
                      return undefined;
                  }
                  // "geth-etc" returns receipts before they are ready
                  if (result.blockHash == null) {
                      return undefined;
                  }
                  const receipt = this.formatter.receipt(result);
                  if (receipt.blockNumber == null) {
                      receipt.confirmations = 0;
                  }
                  else if (receipt.confirmations == null) {
                      const blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                      // Add the confirmations using the fast block number (pessimistic)
                      let confirmations = (blockNumber - receipt.blockNumber) + 1;
                      if (confirmations <= 0) {
                          confirmations = 1;
                      }
                      receipt.confirmations = confirmations;
                  }
                  return receipt;
              }), { oncePoll: this });
          });
      }
      getLogs(filter) {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              const params = yield resolveProperties({ filter: this._getFilter(filter) });
              const logs = yield this.perform("getLogs", params);
              logs.forEach((log) => {
                  if (log.removed == null) {
                      log.removed = false;
                  }
              });
              return Formatter.arrayOf(this.formatter.filterLog.bind(this.formatter))(logs);
          });
      }
      getEtherPrice() {
          return __awaiter$1(this, void 0, void 0, function* () {
              yield this.getNetwork();
              return this.perform("getEtherPrice", {});
          });
      }
      _getBlockTag(blockTag) {
          return __awaiter$1(this, void 0, void 0, function* () {
              blockTag = yield blockTag;
              if (typeof (blockTag) === "number" && blockTag < 0) {
                  if (blockTag % 1) {
                      logger$2.throwArgumentError("invalid BlockTag", "blockTag", blockTag);
                  }
                  let blockNumber = yield this._getInternalBlockNumber(100 + 2 * this.pollingInterval);
                  blockNumber += blockTag;
                  if (blockNumber < 0) {
                      blockNumber = 0;
                  }
                  return this.formatter.blockTag(blockNumber);
              }
              return this.formatter.blockTag(blockTag);
          });
      }
      getResolver(name) {
          return __awaiter$1(this, void 0, void 0, function* () {
              try {
                  const address = yield this._getResolver(name);
                  if (address == null) {
                      return null;
                  }
                  return new Resolver(this, address, name);
              }
              catch (error) {
                  if (error.code === Logger.errors.CALL_EXCEPTION) {
                      return null;
                  }
                  throw error;
              }
          });
      }
      _getResolver(name) {
          return __awaiter$1(this, void 0, void 0, function* () {
              // Get the resolver from the blockchain
              const network = yield this.getNetwork();
              // No ENS...
              if (!network.ensAddress) {
                  logger$2.throwError("network does not support ENS", Logger.errors.UNSUPPORTED_OPERATION, { operation: "ENS", network: network.name });
              }
              // keccak256("resolver(bytes32)")
              const transaction = {
                  to: network.ensAddress,
                  data: ("0x0178b8bf" + namehash(name).substring(2))
              };
              try {
                  return this.formatter.callAddress(yield this.call(transaction));
              }
              catch (error) {
                  if (error.code === Logger.errors.CALL_EXCEPTION) {
                      return null;
                  }
                  throw error;
              }
          });
      }
      resolveName(name) {
          return __awaiter$1(this, void 0, void 0, function* () {
              name = yield name;
              // If it is already an address, nothing to resolve
              try {
                  return Promise.resolve(this.formatter.address(name));
              }
              catch (error) {
                  // If is is a hexstring, the address is bad (See #694)
                  if (isHexString(name)) {
                      throw error;
                  }
              }
              if (typeof (name) !== "string") {
                  logger$2.throwArgumentError("invalid ENS name", "name", name);
              }
              // Get the addr from the resovler
              const resolver = yield this.getResolver(name);
              if (!resolver) {
                  return null;
              }
              return yield resolver.getAddress();
          });
      }
      lookupAddress(address) {
          return __awaiter$1(this, void 0, void 0, function* () {
              address = yield address;
              address = this.formatter.address(address);
              const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
              const resolverAddress = yield this._getResolver(reverseName);
              if (!resolverAddress) {
                  return null;
              }
              // keccak("name(bytes32)")
              let bytes = arrayify(yield this.call({
                  to: resolverAddress,
                  data: ("0x691f3431" + namehash(reverseName).substring(2))
              }));
              // Strip off the dynamic string pointer (0x20)
              if (bytes.length < 32 || !BigNumber.from(bytes.slice(0, 32)).eq(32)) {
                  return null;
              }
              bytes = bytes.slice(32);
              // Not a length-prefixed string
              if (bytes.length < 32) {
                  return null;
              }
              // Get the length of the string (from the length-prefix)
              const length = BigNumber.from(bytes.slice(0, 32)).toNumber();
              bytes = bytes.slice(32);
              // Length longer than available data
              if (length > bytes.length) {
                  return null;
              }
              const name = toUtf8String(bytes.slice(0, length));
              // Make sure the reverse record matches the foward record
              const addr = yield this.resolveName(name);
              if (addr != address) {
                  return null;
              }
              return name;
          });
      }
      getAvatar(nameOrAddress) {
          return __awaiter$1(this, void 0, void 0, function* () {
              let resolver = null;
              if (isHexString(nameOrAddress)) {
                  // Address; reverse lookup
                  const address = this.formatter.address(nameOrAddress);
                  const reverseName = address.substring(2).toLowerCase() + ".addr.reverse";
                  const resolverAddress = yield this._getResolver(reverseName);
                  if (!resolverAddress) {
                      return null;
                  }
                  resolver = new Resolver(this, resolverAddress, "_", address);
              }
              else {
                  // ENS name; forward lookup
                  resolver = yield this.getResolver(nameOrAddress);
                  if (!resolver) {
                      return null;
                  }
              }
              const avatar = yield resolver.getAvatar();
              if (avatar == null) {
                  return null;
              }
              return avatar.url;
          });
      }
      perform(method, params) {
          return logger$2.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
      }
      _startEvent(event) {
          this.polling = (this._events.filter((e) => e.pollable()).length > 0);
      }
      _stopEvent(event) {
          this.polling = (this._events.filter((e) => e.pollable()).length > 0);
      }
      _addEventListener(eventName, listener, once) {
          const event = new Event(getEventTag(eventName), listener, once);
          this._events.push(event);
          this._startEvent(event);
          return this;
      }
      on(eventName, listener) {
          return this._addEventListener(eventName, listener, false);
      }
      once(eventName, listener) {
          return this._addEventListener(eventName, listener, true);
      }
      emit(eventName, ...args) {
          let result = false;
          let stopped = [];
          let eventTag = getEventTag(eventName);
          this._events = this._events.filter((event) => {
              if (event.tag !== eventTag) {
                  return true;
              }
              setTimeout(() => {
                  event.listener.apply(this, args);
              }, 0);
              result = true;
              if (event.once) {
                  stopped.push(event);
                  return false;
              }
              return true;
          });
          stopped.forEach((event) => { this._stopEvent(event); });
          return result;
      }
      listenerCount(eventName) {
          if (!eventName) {
              return this._events.length;
          }
          let eventTag = getEventTag(eventName);
          return this._events.filter((event) => {
              return (event.tag === eventTag);
          }).length;
      }
      listeners(eventName) {
          if (eventName == null) {
              return this._events.map((event) => event.listener);
          }
          let eventTag = getEventTag(eventName);
          return this._events
              .filter((event) => (event.tag === eventTag))
              .map((event) => event.listener);
      }
      off(eventName, listener) {
          if (listener == null) {
              return this.removeAllListeners(eventName);
          }
          const stopped = [];
          let found = false;
          let eventTag = getEventTag(eventName);
          this._events = this._events.filter((event) => {
              if (event.tag !== eventTag || event.listener != listener) {
                  return true;
              }
              if (found) {
                  return true;
              }
              found = true;
              stopped.push(event);
              return false;
          });
          stopped.forEach((event) => { this._stopEvent(event); });
          return this;
      }
      removeAllListeners(eventName) {
          let stopped = [];
          if (eventName == null) {
              stopped = this._events;
              this._events = [];
          }
          else {
              const eventTag = getEventTag(eventName);
              this._events = this._events.filter((event) => {
                  if (event.tag !== eventTag) {
                      return true;
                  }
                  stopped.push(event);
                  return false;
              });
          }
          stopped.forEach((event) => { this._stopEvent(event); });
          return this;
      }
  }

  var __awaiter = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  const logger$1 = new Logger(version);
  const errorGas = ["call", "estimateGas"];
  function checkError(method, error, params) {
      // Undo the "convenience" some nodes are attempting to prevent backwards
      // incompatibility; maybe for v6 consider forwarding reverts as errors
      if (method === "call" && error.code === Logger.errors.SERVER_ERROR) {
          const e = error.error;
          if (e && e.message.match("reverted") && isHexString(e.data)) {
              return e.data;
          }
          logger$1.throwError("missing revert data in call exception", Logger.errors.CALL_EXCEPTION, {
              error, data: "0x"
          });
      }
      let message = error.message;
      if (error.code === Logger.errors.SERVER_ERROR && error.error && typeof (error.error.message) === "string") {
          message = error.error.message;
      }
      else if (typeof (error.body) === "string") {
          message = error.body;
      }
      else if (typeof (error.responseText) === "string") {
          message = error.responseText;
      }
      message = (message || "").toLowerCase();
      const transaction = params.transaction || params.signedTransaction;
      // "insufficient funds for gas * price + value + cost(data)"
      if (message.match(/insufficient funds|base fee exceeds gas limit/)) {
          logger$1.throwError("insufficient funds for intrinsic transaction cost", Logger.errors.INSUFFICIENT_FUNDS, {
              error, method, transaction
          });
      }
      // "nonce too low"
      if (message.match(/nonce too low/)) {
          logger$1.throwError("nonce has already been used", Logger.errors.NONCE_EXPIRED, {
              error, method, transaction
          });
      }
      // "replacement transaction underpriced"
      if (message.match(/replacement transaction underpriced/)) {
          logger$1.throwError("replacement fee too low", Logger.errors.REPLACEMENT_UNDERPRICED, {
              error, method, transaction
          });
      }
      // "replacement transaction underpriced"
      if (message.match(/only replay-protected/)) {
          logger$1.throwError("legacy pre-eip-155 transactions not supported", Logger.errors.UNSUPPORTED_OPERATION, {
              error, method, transaction
          });
      }
      if (errorGas.indexOf(method) >= 0 && message.match(/gas required exceeds allowance|always failing transaction|execution reverted/)) {
          logger$1.throwError("cannot estimate gas; transaction may fail or may require manual gas limit", Logger.errors.UNPREDICTABLE_GAS_LIMIT, {
              error, method, transaction
          });
      }
      throw error;
  }
  function timer(timeout) {
      return new Promise(function (resolve) {
          setTimeout(resolve, timeout);
      });
  }
  function getResult(payload) {
      if (payload.error) {
          // @TODO: not any
          const error = new Error(payload.error.message);
          error.code = payload.error.code;
          error.data = payload.error.data;
          throw error;
      }
      return payload.result;
  }
  function getLowerCase(value) {
      if (value) {
          return value.toLowerCase();
      }
      return value;
  }
  const _constructorGuard = {};
  class JsonRpcSigner extends Signer {
      constructor(constructorGuard, provider, addressOrIndex) {
          logger$1.checkNew(new.target, JsonRpcSigner);
          super();
          if (constructorGuard !== _constructorGuard) {
              throw new Error("do not call the JsonRpcSigner constructor directly; use provider.getSigner");
          }
          defineReadOnly(this, "provider", provider);
          if (addressOrIndex == null) {
              addressOrIndex = 0;
          }
          if (typeof (addressOrIndex) === "string") {
              defineReadOnly(this, "_address", this.provider.formatter.address(addressOrIndex));
              defineReadOnly(this, "_index", null);
          }
          else if (typeof (addressOrIndex) === "number") {
              defineReadOnly(this, "_index", addressOrIndex);
              defineReadOnly(this, "_address", null);
          }
          else {
              logger$1.throwArgumentError("invalid address or index", "addressOrIndex", addressOrIndex);
          }
      }
      connect(provider) {
          return logger$1.throwError("cannot alter JSON-RPC Signer connection", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "connect"
          });
      }
      connectUnchecked() {
          return new UncheckedJsonRpcSigner(_constructorGuard, this.provider, this._address || this._index);
      }
      getAddress() {
          if (this._address) {
              return Promise.resolve(this._address);
          }
          return this.provider.send("eth_accounts", []).then((accounts) => {
              if (accounts.length <= this._index) {
                  logger$1.throwError("unknown account #" + this._index, Logger.errors.UNSUPPORTED_OPERATION, {
                      operation: "getAddress"
                  });
              }
              return this.provider.formatter.address(accounts[this._index]);
          });
      }
      sendUncheckedTransaction(transaction) {
          transaction = shallowCopy(transaction);
          const fromAddress = this.getAddress().then((address) => {
              if (address) {
                  address = address.toLowerCase();
              }
              return address;
          });
          // The JSON-RPC for eth_sendTransaction uses 90000 gas; if the user
          // wishes to use this, it is easy to specify explicitly, otherwise
          // we look it up for them.
          if (transaction.gasLimit == null) {
              const estimate = shallowCopy(transaction);
              estimate.from = fromAddress;
              transaction.gasLimit = this.provider.estimateGas(estimate);
          }
          if (transaction.to != null) {
              transaction.to = Promise.resolve(transaction.to).then((to) => __awaiter(this, void 0, void 0, function* () {
                  if (to == null) {
                      return null;
                  }
                  const address = yield this.provider.resolveName(to);
                  if (address == null) {
                      logger$1.throwArgumentError("provided ENS name resolves to null", "tx.to", to);
                  }
                  return address;
              }));
          }
          return resolveProperties({
              tx: resolveProperties(transaction),
              sender: fromAddress
          }).then(({ tx, sender }) => {
              if (tx.from != null) {
                  if (tx.from.toLowerCase() !== sender) {
                      logger$1.throwArgumentError("from address mismatch", "transaction", transaction);
                  }
              }
              else {
                  tx.from = sender;
              }
              const hexTx = this.provider.constructor.hexlifyTransaction(tx, { from: true });
              return this.provider.send("eth_sendTransaction", [hexTx]).then((hash) => {
                  return hash;
              }, (error) => {
                  return checkError("sendTransaction", error, hexTx);
              });
          });
      }
      signTransaction(transaction) {
          return logger$1.throwError("signing transactions is unsupported", Logger.errors.UNSUPPORTED_OPERATION, {
              operation: "signTransaction"
          });
      }
      sendTransaction(transaction) {
          return __awaiter(this, void 0, void 0, function* () {
              // This cannot be mined any earlier than any recent block
              const blockNumber = yield this.provider._getInternalBlockNumber(100 + 2 * this.provider.pollingInterval);
              // Send the transaction
              const hash = yield this.sendUncheckedTransaction(transaction);
              try {
                  // Unfortunately, JSON-RPC only provides and opaque transaction hash
                  // for a response, and we need the actual transaction, so we poll
                  // for it; it should show up very quickly
                  return yield poll(() => __awaiter(this, void 0, void 0, function* () {
                      const tx = yield this.provider.getTransaction(hash);
                      if (tx === null) {
                          return undefined;
                      }
                      return this.provider._wrapTransaction(tx, hash, blockNumber);
                  }), { oncePoll: this.provider });
              }
              catch (error) {
                  error.transactionHash = hash;
                  throw error;
              }
          });
      }
      signMessage(message) {
          return __awaiter(this, void 0, void 0, function* () {
              const data = ((typeof (message) === "string") ? toUtf8Bytes(message) : message);
              const address = yield this.getAddress();
              return yield this.provider.send("personal_sign", [hexlify(data), address.toLowerCase()]);
          });
      }
      _legacySignMessage(message) {
          return __awaiter(this, void 0, void 0, function* () {
              const data = ((typeof (message) === "string") ? toUtf8Bytes(message) : message);
              const address = yield this.getAddress();
              // https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
              return yield this.provider.send("eth_sign", [address.toLowerCase(), hexlify(data)]);
          });
      }
      _signTypedData(domain, types, value) {
          return __awaiter(this, void 0, void 0, function* () {
              // Populate any ENS names (in-place)
              const populated = yield TypedDataEncoder.resolveNames(domain, types, value, (name) => {
                  return this.provider.resolveName(name);
              });
              const address = yield this.getAddress();
              return yield this.provider.send("eth_signTypedData_v4", [
                  address.toLowerCase(),
                  JSON.stringify(TypedDataEncoder.getPayload(populated.domain, types, populated.value))
              ]);
          });
      }
      unlock(password) {
          return __awaiter(this, void 0, void 0, function* () {
              const provider = this.provider;
              const address = yield this.getAddress();
              return provider.send("personal_unlockAccount", [address.toLowerCase(), password, null]);
          });
      }
  }
  class UncheckedJsonRpcSigner extends JsonRpcSigner {
      sendTransaction(transaction) {
          return this.sendUncheckedTransaction(transaction).then((hash) => {
              return {
                  hash: hash,
                  nonce: null,
                  gasLimit: null,
                  gasPrice: null,
                  data: null,
                  value: null,
                  chainId: null,
                  confirmations: 0,
                  from: null,
                  wait: (confirmations) => { return this.provider.waitForTransaction(hash, confirmations); }
              };
          });
      }
  }
  const allowedTransactionKeys = {
      chainId: true, data: true, gasLimit: true, gasPrice: true, nonce: true, to: true, value: true,
      type: true, accessList: true,
      maxFeePerGas: true, maxPriorityFeePerGas: true
  };
  class JsonRpcProvider extends BaseProvider {
      constructor(url, network) {
          logger$1.checkNew(new.target, JsonRpcProvider);
          let networkOrReady = network;
          // The network is unknown, query the JSON-RPC for it
          if (networkOrReady == null) {
              networkOrReady = new Promise((resolve, reject) => {
                  setTimeout(() => {
                      this.detectNetwork().then((network) => {
                          resolve(network);
                      }, (error) => {
                          reject(error);
                      });
                  }, 0);
              });
          }
          super(networkOrReady);
          // Default URL
          if (!url) {
              url = getStatic(this.constructor, "defaultUrl")();
          }
          if (typeof (url) === "string") {
              defineReadOnly(this, "connection", Object.freeze({
                  url: url
              }));
          }
          else {
              defineReadOnly(this, "connection", Object.freeze(shallowCopy(url)));
          }
          this._nextId = 42;
      }
      get _cache() {
          if (this._eventLoopCache == null) {
              this._eventLoopCache = {};
          }
          return this._eventLoopCache;
      }
      static defaultUrl() {
          return "http:/\/localhost:8545";
      }
      detectNetwork() {
          if (!this._cache["detectNetwork"]) {
              this._cache["detectNetwork"] = this._uncachedDetectNetwork();
              // Clear this cache at the beginning of the next event loop
              setTimeout(() => {
                  this._cache["detectNetwork"] = null;
              }, 0);
          }
          return this._cache["detectNetwork"];
      }
      _uncachedDetectNetwork() {
          return __awaiter(this, void 0, void 0, function* () {
              yield timer(0);
              let chainId = null;
              try {
                  chainId = yield this.send("eth_chainId", []);
              }
              catch (error) {
                  try {
                      chainId = yield this.send("net_version", []);
                  }
                  catch (error) { }
              }
              if (chainId != null) {
                  const getNetwork = getStatic(this.constructor, "getNetwork");
                  try {
                      return getNetwork(BigNumber.from(chainId).toNumber());
                  }
                  catch (error) {
                      return logger$1.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
                          chainId: chainId,
                          event: "invalidNetwork",
                          serverError: error
                      });
                  }
              }
              return logger$1.throwError("could not detect network", Logger.errors.NETWORK_ERROR, {
                  event: "noNetwork"
              });
          });
      }
      getSigner(addressOrIndex) {
          return new JsonRpcSigner(_constructorGuard, this, addressOrIndex);
      }
      getUncheckedSigner(addressOrIndex) {
          return this.getSigner(addressOrIndex).connectUnchecked();
      }
      listAccounts() {
          return this.send("eth_accounts", []).then((accounts) => {
              return accounts.map((a) => this.formatter.address(a));
          });
      }
      send(method, params) {
          const request = {
              method: method,
              params: params,
              id: (this._nextId++),
              jsonrpc: "2.0"
          };
          this.emit("debug", {
              action: "request",
              request: deepCopy(request),
              provider: this
          });
          // We can expand this in the future to any call, but for now these
          // are the biggest wins and do not require any serializing parameters.
          const cache = (["eth_chainId", "eth_blockNumber"].indexOf(method) >= 0);
          if (cache && this._cache[method]) {
              return this._cache[method];
          }
          const result = fetchJson(this.connection, JSON.stringify(request), getResult).then((result) => {
              this.emit("debug", {
                  action: "response",
                  request: request,
                  response: result,
                  provider: this
              });
              return result;
          }, (error) => {
              this.emit("debug", {
                  action: "response",
                  error: error,
                  request: request,
                  provider: this
              });
              throw error;
          });
          // Cache the fetch, but clear it on the next event loop
          if (cache) {
              this._cache[method] = result;
              setTimeout(() => {
                  this._cache[method] = null;
              }, 0);
          }
          return result;
      }
      prepareRequest(method, params) {
          switch (method) {
              case "getBlockNumber":
                  return ["eth_blockNumber", []];
              case "getGasPrice":
                  return ["eth_gasPrice", []];
              case "getBalance":
                  return ["eth_getBalance", [getLowerCase(params.address), params.blockTag]];
              case "getTransactionCount":
                  return ["eth_getTransactionCount", [getLowerCase(params.address), params.blockTag]];
              case "getCode":
                  return ["eth_getCode", [getLowerCase(params.address), params.blockTag]];
              case "getStorageAt":
                  return ["eth_getStorageAt", [getLowerCase(params.address), params.position, params.blockTag]];
              case "sendTransaction":
                  return ["eth_sendRawTransaction", [params.signedTransaction]];
              case "getBlock":
                  if (params.blockTag) {
                      return ["eth_getBlockByNumber", [params.blockTag, !!params.includeTransactions]];
                  }
                  else if (params.blockHash) {
                      return ["eth_getBlockByHash", [params.blockHash, !!params.includeTransactions]];
                  }
                  return null;
              case "getTransaction":
                  return ["eth_getTransactionByHash", [params.transactionHash]];
              case "getTransactionReceipt":
                  return ["eth_getTransactionReceipt", [params.transactionHash]];
              case "call": {
                  const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
                  return ["eth_call", [hexlifyTransaction(params.transaction, { from: true }), params.blockTag]];
              }
              case "estimateGas": {
                  const hexlifyTransaction = getStatic(this.constructor, "hexlifyTransaction");
                  return ["eth_estimateGas", [hexlifyTransaction(params.transaction, { from: true })]];
              }
              case "getLogs":
                  if (params.filter && params.filter.address != null) {
                      params.filter.address = getLowerCase(params.filter.address);
                  }
                  return ["eth_getLogs", [params.filter]];
          }
          return null;
      }
      perform(method, params) {
          return __awaiter(this, void 0, void 0, function* () {
              // Legacy networks do not like the type field being passed along (which
              // is fair), so we delete type if it is 0 and a non-EIP-1559 network
              if (method === "call" || method === "estimateGas") {
                  const tx = params.transaction;
                  if (tx && tx.type != null && BigNumber.from(tx.type).isZero()) {
                      // If there are no EIP-1559 properties, it might be non-EIP-a559
                      if (tx.maxFeePerGas == null && tx.maxPriorityFeePerGas == null) {
                          const feeData = yield this.getFeeData();
                          if (feeData.maxFeePerGas == null && feeData.maxPriorityFeePerGas == null) {
                              // Network doesn't know about EIP-1559 (and hence type)
                              params = shallowCopy(params);
                              params.transaction = shallowCopy(tx);
                              delete params.transaction.type;
                          }
                      }
                  }
              }
              const args = this.prepareRequest(method, params);
              if (args == null) {
                  logger$1.throwError(method + " not implemented", Logger.errors.NOT_IMPLEMENTED, { operation: method });
              }
              try {
                  return yield this.send(args[0], args[1]);
              }
              catch (error) {
                  return checkError(method, error, params);
              }
          });
      }
      _startEvent(event) {
          if (event.tag === "pending") {
              this._startPending();
          }
          super._startEvent(event);
      }
      _startPending() {
          if (this._pendingFilter != null) {
              return;
          }
          const self = this;
          const pendingFilter = this.send("eth_newPendingTransactionFilter", []);
          this._pendingFilter = pendingFilter;
          pendingFilter.then(function (filterId) {
              function poll() {
                  self.send("eth_getFilterChanges", [filterId]).then(function (hashes) {
                      if (self._pendingFilter != pendingFilter) {
                          return null;
                      }
                      let seq = Promise.resolve();
                      hashes.forEach(function (hash) {
                          // @TODO: This should be garbage collected at some point... How? When?
                          self._emitted["t:" + hash.toLowerCase()] = "pending";
                          seq = seq.then(function () {
                              return self.getTransaction(hash).then(function (tx) {
                                  self.emit("pending", tx);
                                  return null;
                              });
                          });
                      });
                      return seq.then(function () {
                          return timer(1000);
                      });
                  }).then(function () {
                      if (self._pendingFilter != pendingFilter) {
                          self.send("eth_uninstallFilter", [filterId]);
                          return;
                      }
                      setTimeout(function () { poll(); }, 0);
                      return null;
                  }).catch((error) => { });
              }
              poll();
              return filterId;
          }).catch((error) => { });
      }
      _stopEvent(event) {
          if (event.tag === "pending" && this.listenerCount("pending") === 0) {
              this._pendingFilter = null;
          }
          super._stopEvent(event);
      }
      // Convert an ethers.js transaction into a JSON-RPC transaction
      //  - gasLimit => gas
      //  - All values hexlified
      //  - All numeric values zero-striped
      //  - All addresses are lowercased
      // NOTE: This allows a TransactionRequest, but all values should be resolved
      //       before this is called
      // @TODO: This will likely be removed in future versions and prepareRequest
      //        will be the preferred method for this.
      static hexlifyTransaction(transaction, allowExtra) {
          // Check only allowed properties are given
          const allowed = shallowCopy(allowedTransactionKeys);
          if (allowExtra) {
              for (const key in allowExtra) {
                  if (allowExtra[key]) {
                      allowed[key] = true;
                  }
              }
          }
          checkProperties(transaction, allowed);
          const result = {};
          // Some nodes (INFURA ropsten; INFURA mainnet is fine) do not like leading zeros.
          ["gasLimit", "gasPrice", "type", "maxFeePerGas", "maxPriorityFeePerGas", "nonce", "value"].forEach(function (key) {
              if (transaction[key] == null) {
                  return;
              }
              const value = hexValue(transaction[key]);
              if (key === "gasLimit") {
                  key = "gas";
              }
              result[key] = value;
          });
          ["from", "to", "data"].forEach(function (key) {
              if (transaction[key] == null) {
                  return;
              }
              result[key] = hexlify(transaction[key]);
          });
          if (transaction.accessList) {
              result["accessList"] = accessListify(transaction.accessList);
          }
          return result;
      }
  }

  const logger = new Logger(version);
  let _nextId = 1;
  function buildWeb3LegacyFetcher(provider, sendFunc) {
      const fetcher = "Web3LegacyFetcher";
      return function (method, params) {
          const request = {
              method: method,
              params: params,
              id: (_nextId++),
              jsonrpc: "2.0"
          };
          return new Promise((resolve, reject) => {
              this.emit("debug", {
                  action: "request",
                  fetcher,
                  request: deepCopy(request),
                  provider: this
              });
              sendFunc(request, (error, response) => {
                  if (error) {
                      this.emit("debug", {
                          action: "response",
                          fetcher,
                          error,
                          request,
                          provider: this
                      });
                      return reject(error);
                  }
                  this.emit("debug", {
                      action: "response",
                      fetcher,
                      request,
                      response,
                      provider: this
                  });
                  if (response.error) {
                      const error = new Error(response.error.message);
                      error.code = response.error.code;
                      error.data = response.error.data;
                      return reject(error);
                  }
                  resolve(response.result);
              });
          });
      };
  }
  function buildEip1193Fetcher(provider) {
      return function (method, params) {
          if (params == null) {
              params = [];
          }
          const request = { method, params };
          this.emit("debug", {
              action: "request",
              fetcher: "Eip1193Fetcher",
              request: deepCopy(request),
              provider: this
          });
          return provider.request(request).then((response) => {
              this.emit("debug", {
                  action: "response",
                  fetcher: "Eip1193Fetcher",
                  request,
                  response,
                  provider: this
              });
              return response;
          }, (error) => {
              this.emit("debug", {
                  action: "response",
                  fetcher: "Eip1193Fetcher",
                  request,
                  error,
                  provider: this
              });
              throw error;
          });
      };
  }
  class Web3Provider extends JsonRpcProvider {
      constructor(provider, network) {
          logger.checkNew(new.target, Web3Provider);
          if (provider == null) {
              logger.throwArgumentError("missing provider", "provider", provider);
          }
          let path = null;
          let jsonRpcFetchFunc = null;
          let subprovider = null;
          if (typeof (provider) === "function") {
              path = "unknown:";
              jsonRpcFetchFunc = provider;
          }
          else {
              path = provider.host || provider.path || "";
              if (!path && provider.isMetaMask) {
                  path = "metamask";
              }
              subprovider = provider;
              if (provider.request) {
                  if (path === "") {
                      path = "eip-1193:";
                  }
                  jsonRpcFetchFunc = buildEip1193Fetcher(provider);
              }
              else if (provider.sendAsync) {
                  jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.sendAsync.bind(provider));
              }
              else if (provider.send) {
                  jsonRpcFetchFunc = buildWeb3LegacyFetcher(provider, provider.send.bind(provider));
              }
              else {
                  logger.throwArgumentError("unsupported provider", "provider", provider);
              }
              if (!path) {
                  path = "unknown:";
              }
          }
          super(path, network);
          defineReadOnly(this, "jsonRpcFetchFunc", jsonRpcFetchFunc);
          defineReadOnly(this, "provider", subprovider);
      }
      send(method, params) {
          return this.jsonRpcFetchFunc(method, params);
      }
  }

  // let $= require("cash-dom")

  var baseclassorid = "logo_";
  function makehtml() {
    // let dom = demoHtml;
    // var compiledDom = _.template(dom)
    // return  compiledDom({
    //     baseclassorid
    // });
    console.log(demoEjs);
    return demoEjs({
      baseclassorid: baseclassorid
    });
  }
  function showhtml(appclassname, html) {
    cash("." + appclassname).append(html);
  }
  function bindEvent(appclassname) {
    cash("." + appclassname).find("#" + baseclassorid + "btn").on("click", btnclick);
  }
  function btnclick() {
    console.log('click1112');
  }

  function Order(appclassname) {
    this.appclassname = appclassname;
  }

  Order.prototype.openPanel = function () {
    var html = makehtml();
    showhtml(this.appclassname, html);
    bindEvent(this.appclassname);
  };

  Order.prototype.addNft = function () {};

  Order.prototype.approve = function () {};

  Order.prototype.LinkWallet = function () {
    var web3Provider;

    if (window.ethereum) {
      web3Provider = window.ethereum;
    } else if (window.web3) {
      // 老版 MetaMask Legacy dapp browsers...
      web3Provider = window.web3.currentProvider;
    } else {
      console.log('not find wallet');
    }

    this.ethersprovider = new Web3Provider(web3Provider);
  };

  Order.prototype.testes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var index;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('---');

            index = function index() {
              var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
              return Array.from(arr).length;
            };

            _context.next = 4;
            return Promise(function (ok, file) {
              if (index) {
                ok();
              } else {
                file();
              }
            });

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  function openPanel(appclassname) {
    var html = makehtml();
    showhtml(appclassname, html);
    bindEvent(appclassname);
    var ss = new Order(appclassname);
    ss.testes();
    ss.LinkWallet();
  }

  var main = {
    testdom: openPanel
  };

  return main;

})();
