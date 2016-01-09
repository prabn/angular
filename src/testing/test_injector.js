'use strict';var core_1 = require('angular2/core');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var animation_builder_mock_1 = require('angular2/src/mock/animation_builder_mock');
var resolved_metadata_cache_1 = require('angular2/src/core/linker/resolved_metadata_cache');
var reflection_1 = require('angular2/src/core/reflection/reflection');
var change_detection_1 = require('angular2/src/core/change_detection/change_detection');
var exceptions_1 = require('angular2/src/facade/exceptions');
var pipe_resolver_1 = require('angular2/src/core/linker/pipe_resolver');
var xhr_1 = require('angular2/src/compiler/xhr');
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var directive_resolver_mock_1 = require('angular2/src/mock/directive_resolver_mock');
var view_resolver_mock_1 = require('angular2/src/mock/view_resolver_mock');
var mock_location_strategy_1 = require('angular2/src/mock/mock_location_strategy');
var location_strategy_1 = require('angular2/src/router/location_strategy');
var ng_zone_mock_1 = require('angular2/src/mock/ng_zone_mock');
var test_component_builder_1 = require('./test_component_builder');
var common_dom_1 = require('angular2/platform/common_dom');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var api_1 = require('angular2/src/core/render/api');
var dom_tokens_1 = require('angular2/src/platform/dom/dom_tokens');
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
var shared_styles_host_1 = require('angular2/src/platform/dom/shared_styles_host');
var shared_styles_host_2 = require('angular2/src/platform/dom/shared_styles_host');
var dom_events_1 = require('angular2/src/platform/dom/events/dom_events');
var serializer_1 = require("angular2/src/web_workers/shared/serializer");
var utils_1 = require('./utils');
var compiler_1 = require('angular2/src/compiler/compiler');
var dynamic_component_loader_1 = require("angular2/src/core/linker/dynamic_component_loader");
var view_manager_1 = require("angular2/src/core/linker/view_manager");
/**
 * Returns the root injector providers.
 *
 * This must be kept in sync with the _rootBindings in application.js
 *
 * @returns {any[]}
 */
function _getRootProviders() {
    return [core_1.provide(reflection_1.Reflector, { useValue: reflection_1.reflector })];
}
/**
 * Returns the application injector providers.
 *
 * This must be kept in sync with _injectorBindings() in application.js
 *
 * @returns {any[]}
 */
function _getAppBindings() {
    var appDoc;
    // The document is only available in browser environment
    try {
        appDoc = dom_adapter_1.DOM.defaultDoc();
    }
    catch (e) {
        appDoc = null;
    }
    return [
        core_1.APPLICATION_COMMON_PROVIDERS,
        core_1.provide(change_detection_1.ChangeDetectorGenConfig, { useValue: new change_detection_1.ChangeDetectorGenConfig(true, false, false) }),
        core_1.provide(dom_tokens_1.DOCUMENT, { useValue: appDoc }),
        core_1.provide(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
        core_1.provide(api_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
        core_1.provide(core_1.APP_ID, { useValue: 'a' }),
        shared_styles_host_1.DomSharedStylesHost,
        core_1.provide(shared_styles_host_2.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
        core_1.provide(core_1.AppViewManager, { useClass: view_manager_1.AppViewManager_ }),
        serializer_1.Serializer,
        common_dom_1.ELEMENT_PROBE_PROVIDERS,
        resolved_metadata_cache_1.ResolvedMetadataCache,
        core_1.provide(core_1.DirectiveResolver, { useClass: directive_resolver_mock_1.MockDirectiveResolver }),
        core_1.provide(core_1.ViewResolver, { useClass: view_resolver_mock_1.MockViewResolver }),
        core_1.provide(change_detection_1.IterableDiffers, { useValue: change_detection_1.defaultIterableDiffers }),
        core_1.provide(change_detection_1.KeyValueDiffers, { useValue: change_detection_1.defaultKeyValueDiffers }),
        utils_1.Log,
        core_1.provide(core_1.DynamicComponentLoader, { useClass: dynamic_component_loader_1.DynamicComponentLoader_ }),
        pipe_resolver_1.PipeResolver,
        core_1.provide(exceptions_1.ExceptionHandler, { useValue: new exceptions_1.ExceptionHandler(dom_adapter_1.DOM) }),
        core_1.provide(location_strategy_1.LocationStrategy, { useClass: mock_location_strategy_1.MockLocationStrategy }),
        core_1.provide(xhr_1.XHR, { useClass: dom_adapter_1.DOM.getXHR() }),
        test_component_builder_1.TestComponentBuilder,
        core_1.provide(core_1.NgZone, { useClass: ng_zone_mock_1.MockNgZone }),
        core_1.provide(animation_builder_1.AnimationBuilder, { useClass: animation_builder_mock_1.MockAnimationBuilder }),
        common_dom_1.EventManager,
        new core_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true })
    ];
}
function _runtimeCompilerBindings() {
    return [
        core_1.provide(xhr_1.XHR, { useClass: dom_adapter_1.DOM.getXHR() }),
        compiler_1.COMPILER_PROVIDERS,
    ];
}
var TestInjector = (function () {
    function TestInjector() {
        this._instantiated = false;
        this._injector = null;
        this._providers = [];
    }
    TestInjector.prototype.reset = function () {
        this._injector = null;
        this._providers = [];
        this._instantiated = false;
    };
    TestInjector.prototype.addProviders = function (providers) {
        if (this._instantiated) {
            throw new exceptions_1.BaseException('Cannot add providers after test injector is instantiated');
        }
        this._providers = collection_1.ListWrapper.concat(this._providers, providers);
    };
    TestInjector.prototype.createInjector = function () {
        var rootInjector = core_1.Injector.resolveAndCreate(_getRootProviders());
        this._injector = rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(collection_1.ListWrapper.concat(_getAppBindings(), _runtimeCompilerBindings()), this._providers));
        this._instantiated = true;
        return this._injector;
    };
    TestInjector.prototype.execute = function (fn) {
        if (!this._instantiated) {
            this.createInjector();
        }
        return fn.execute(this._injector);
    };
    return TestInjector;
})();
exports.TestInjector = TestInjector;
var _testInjector = null;
function getTestInjector() {
    if (_testInjector == null) {
        _testInjector = new TestInjector();
    }
    return _testInjector;
}
exports.getTestInjector = getTestInjector;
/**
 * @deprecated Use TestInjector#createInjector() instead.
 */
function createTestInjector(providers) {
    var rootInjector = core_1.Injector.resolveAndCreate(_getRootProviders());
    return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), providers));
}
exports.createTestInjector = createTestInjector;
/**
 * @deprecated Use TestInjector#createInjector() instead.
 */
function createTestInjectorWithRuntimeCompiler(providers) {
    return createTestInjector(collection_1.ListWrapper.concat(_runtimeCompilerBindings(), providers));
}
exports.createTestInjectorWithRuntimeCompiler = createTestInjectorWithRuntimeCompiler;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @param {Array} tokens
 * @param {Function} fn
 * @return {FunctionWithParamTokens}
 */
function inject(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn, false);
}
exports.inject = inject;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`. The test must return
 * a promise which will resolve when all asynchronous activity is complete.
 *
 * Example:
 *
 * ```
 * it('...', injectAsync([AClass], (object) => {
 *   return object.doSomething().then(() => {
 *     expect(...);
 *   });
 * })
 * ```
 *
 * @param {Array} tokens
 * @param {Function} fn
 * @return {FunctionWithParamTokens}
 */
function injectAsync(tokens, fn) {
    return new FunctionWithParamTokens(tokens, fn, true);
}
exports.injectAsync = injectAsync;
var FunctionWithParamTokens = (function () {
    function FunctionWithParamTokens(_tokens, _fn, isAsync) {
        this._tokens = _tokens;
        this._fn = _fn;
        this.isAsync = isAsync;
    }
    /**
     * Returns the value of the executed function.
     */
    FunctionWithParamTokens.prototype.execute = function (injector) {
        var params = this._tokens.map(function (t) { return injector.get(t); });
        return lang_1.FunctionWrapper.apply(this._fn, params);
    };
    FunctionWithParamTokens.prototype.hasToken = function (token) { return this._tokens.indexOf(token) > -1; };
    return FunctionWithParamTokens;
})();
exports.FunctionWithParamTokens = FunctionWithParamTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9pbmplY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFuZ3VsYXIyL3NyYy90ZXN0aW5nL3Rlc3RfaW5qZWN0b3IudHMiXSwibmFtZXMiOlsiX2dldFJvb3RQcm92aWRlcnMiLCJfZ2V0QXBwQmluZGluZ3MiLCJfcnVudGltZUNvbXBpbGVyQmluZGluZ3MiLCJUZXN0SW5qZWN0b3IiLCJUZXN0SW5qZWN0b3IuY29uc3RydWN0b3IiLCJUZXN0SW5qZWN0b3IucmVzZXQiLCJUZXN0SW5qZWN0b3IuYWRkUHJvdmlkZXJzIiwiVGVzdEluamVjdG9yLmNyZWF0ZUluamVjdG9yIiwiVGVzdEluamVjdG9yLmV4ZWN1dGUiLCJnZXRUZXN0SW5qZWN0b3IiLCJjcmVhdGVUZXN0SW5qZWN0b3IiLCJjcmVhdGVUZXN0SW5qZWN0b3JXaXRoUnVudGltZUNvbXBpbGVyIiwiaW5qZWN0IiwiaW5qZWN0QXN5bmMiLCJGdW5jdGlvbldpdGhQYXJhbVRva2VucyIsIkZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zLmNvbnN0cnVjdG9yIiwiRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnMuZXhlY3V0ZSIsIkZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zLmhhc1Rva2VuIl0sIm1hcHBpbmdzIjoiQUFBQSxxQkFZTyxlQUFlLENBQUMsQ0FBQTtBQUN2QixrQ0FBK0Isd0NBQXdDLENBQUMsQ0FBQTtBQUN4RSx1Q0FBbUMsMENBQTBDLENBQUMsQ0FBQTtBQUU5RSx3Q0FBb0Msa0RBQWtELENBQUMsQ0FBQTtBQUN2RiwyQkFBbUMseUNBQXlDLENBQUMsQ0FBQTtBQUM3RSxpQ0FNTyxxREFBcUQsQ0FBQyxDQUFBO0FBQzdELDJCQUE4QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQy9FLDhCQUEyQix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3BFLG9CQUFrQiwyQkFBMkIsQ0FBQyxDQUFBO0FBRTlDLDRCQUFrQix1Q0FBdUMsQ0FBQyxDQUFBO0FBRTFELHdDQUFvQywyQ0FBMkMsQ0FBQyxDQUFBO0FB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Q0EsQ0FBQ0E7SUFDNUVILDhCQUFDQTtBQUFEQSxDQUFDQSxBQVpELElBWUM7QUFaWSwrQkFBdUIsMEJBWW5DLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBUFBfSUQsXG4gIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsXG4gIEFwcFZpZXdNYW5hZ2VyLFxuICBEaXJlY3RpdmVSZXNvbHZlcixcbiAgRHluYW1pY0NvbXBvbmVudExvYWRlcixcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbiAgUmVuZGVyZXIsXG4gIFByb3ZpZGVyLFxuICBWaWV3UmVzb2x2ZXIsXG4gIHByb3ZpZGVcbn0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9hbmltYXRlL2FuaW1hdGlvbl9idWlsZGVyJztcbmltcG9ydCB7TW9ja0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2FuaW1hdGlvbl9idWlsZGVyX21vY2snO1xuXG5pbXBvcnQge1Jlc29sdmVkTWV0YWRhdGFDYWNoZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3Jlc29sdmVkX21ldGFkYXRhX2NhY2hlJztcbmltcG9ydCB7UmVmbGVjdG9yLCByZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5pbXBvcnQge1xuICBJdGVyYWJsZURpZmZlcnMsXG4gIGRlZmF1bHRJdGVyYWJsZURpZmZlcnMsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgZGVmYXVsdEtleVZhbHVlRGlmZmVycyxcbiAgQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWdcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgRXhjZXB0aW9uSGFuZGxlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UGlwZVJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvcGlwZV9yZXNvbHZlcic7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5cbmltcG9ydCB7RE9NfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9hZGFwdGVyJztcblxuaW1wb3J0IHtNb2NrRGlyZWN0aXZlUmVzb2x2ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL2RpcmVjdGl2ZV9yZXNvbHZlcl9tb2NrJztcbmltcG9ydCB7TW9ja1ZpZXdSZXNvbHZlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svdmlld19yZXNvbHZlcl9tb2NrJztcbmltcG9ydCB7TW9ja0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gJ2FuZ3VsYXIyL3NyYy9tb2NrL21vY2tfbG9jYXRpb25fc3RyYXRlZ3knO1xuaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uX3N0cmF0ZWd5JztcbmltcG9ydCB7TW9ja05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL21vY2svbmdfem9uZV9tb2NrJztcblxuaW1wb3J0IHtUZXN0Q29tcG9uZW50QnVpbGRlcn0gZnJvbSAnLi90ZXN0X2NvbXBvbmVudF9idWlsZGVyJztcblxuaW1wb3J0IHtcbiAgRXZlbnRNYW5hZ2VyLFxuICBFVkVOVF9NQU5BR0VSX1BMVUdJTlMsXG4gIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTXG59IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbl9kb20nO1xuXG5pbXBvcnQge0xpc3RXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtGdW5jdGlvbldyYXBwZXIsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7Um9vdFJlbmRlcmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZW5kZXIvYXBpJztcblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmltcG9ydCB7RG9tUm9vdFJlbmRlcmVyLCBEb21Sb290UmVuZGVyZXJffSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcbmltcG9ydCB7U2hhcmVkU3R5bGVzSG9zdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9zaGFyZWRfc3R5bGVzX2hvc3QnO1xuaW1wb3J0IHtEb21FdmVudHNQbHVnaW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2RvbV9ldmVudHMnO1xuXG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXJcIjtcbmltcG9ydCB7TG9nfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7Q09NUElMRVJfUFJPVklERVJTfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvY29tcGlsZXInO1xuaW1wb3J0IHtEeW5hbWljQ29tcG9uZW50TG9hZGVyX30gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9keW5hbWljX2NvbXBvbmVudF9sb2FkZXJcIjtcbmltcG9ydCB7QXBwVmlld01hbmFnZXJffSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3ZpZXdfbWFuYWdlclwiO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHJvb3QgaW5qZWN0b3IgcHJvdmlkZXJzLlxuICpcbiAqIFRoaXMgbXVzdCBiZSBrZXB0IGluIHN5bmMgd2l0aCB0aGUgX3Jvb3RCaW5kaW5ncyBpbiBhcHBsaWNhdGlvbi5qc1xuICpcbiAqIEByZXR1cm5zIHthbnlbXX1cbiAqL1xuZnVuY3Rpb24gX2dldFJvb3RQcm92aWRlcnMoKSB7XG4gIHJldHVybiBbcHJvdmlkZShSZWZsZWN0b3IsIHt1c2VWYWx1ZTogcmVmbGVjdG9yfSldO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFwcGxpY2F0aW9uIGluamVjdG9yIHByb3ZpZGVycy5cbiAqXG4gKiBUaGlzIG11c3QgYmUga2VwdCBpbiBzeW5jIHdpdGggX2luamVjdG9yQmluZGluZ3MoKSBpbiBhcHBsaWNhdGlvbi5qc1xuICpcbiAqIEByZXR1cm5zIHthbnlbXX1cbiAqL1xuZnVuY3Rpb24gX2dldEFwcEJpbmRpbmdzKCkge1xuICB2YXIgYXBwRG9jO1xuXG4gIC8vIFRoZSBkb2N1bWVudCBpcyBvbmx5IGF2YWlsYWJsZSBpbiBicm93c2VyIGVudmlyb25tZW50XG4gIHRyeSB7XG4gICAgYXBwRG9jID0gRE9NLmRlZmF1bHREb2MoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGFwcERvYyA9IG51bGw7XG4gIH1cblxuICByZXR1cm4gW1xuICAgIEFQUExJQ0FUSU9OX0NPTU1PTl9QUk9WSURFUlMsXG4gICAgcHJvdmlkZShDaGFuZ2VEZXRlY3RvckdlbkNvbmZpZywge3VzZVZhbHVlOiBuZXcgQ2hhbmdlRGV0ZWN0b3JHZW5Db25maWcodHJ1ZSwgZmFsc2UsIGZhbHNlKX0pLFxuICAgIHByb3ZpZGUoRE9DVU1FTlQsIHt1c2VWYWx1ZTogYXBwRG9jfSksXG4gICAgcHJvdmlkZShEb21Sb290UmVuZGVyZXIsIHt1c2VDbGFzczogRG9tUm9vdFJlbmRlcmVyX30pLFxuICAgIHByb3ZpZGUoUm9vdFJlbmRlcmVyLCB7dXNlRXhpc3Rpbmc6IERvbVJvb3RSZW5kZXJlcn0pLFxuICAgIHByb3ZpZGUoQVBQX0lELCB7dXNlVmFsdWU6ICdhJ30pLFxuICAgIERvbVNoYXJlZFN0eWxlc0hvc3QsXG4gICAgcHJvdmlkZShTaGFyZWRTdHlsZXNIb3N0LCB7dXNlRXhpc3Rpbmc6IERvbVNoYXJlZFN0eWxlc0hvc3R9KSxcbiAgICBwcm92aWRlKEFwcFZpZXdNYW5hZ2VyLCB7dXNlQ2xhc3M6IEFwcFZpZXdNYW5hZ2VyX30pLFxuICAgIFNlcmlhbGl6ZXIsXG4gICAgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlMsXG4gICAgUmVzb2x2ZWRNZXRhZGF0YUNhY2hlLFxuICAgIHByb3ZpZGUoRGlyZWN0aXZlUmVzb2x2ZXIsIHt1c2VDbGFzczogTW9ja0RpcmVjdGl2ZVJlc29sdmVyfSksXG4gICAgcHJvdmlkZShWaWV3UmVzb2x2ZXIsIHt1c2VDbGFzczogTW9ja1ZpZXdSZXNvbHZlcn0pLFxuICAgIHByb3ZpZGUoSXRlcmFibGVEaWZmZXJzLCB7dXNlVmFsdWU6IGRlZmF1bHRJdGVyYWJsZURpZmZlcnN9KSxcbiAgICBwcm92aWRlKEtleVZhbHVlRGlmZmVycywge3VzZVZhbHVlOiBkZWZhdWx0S2V5VmFsdWVEaWZmZXJzfSksXG4gICAgTG9nLFxuICAgIHByb3ZpZGUoRHluYW1pY0NvbXBvbmVudExvYWRlciwge3VzZUNsYXNzOiBEeW5hbWljQ29tcG9uZW50TG9hZGVyX30pLFxuICAgIFBpcGVSZXNvbHZlcixcbiAgICBwcm92aWRlKEV4Y2VwdGlvbkhhbmRsZXIsIHt1c2VWYWx1ZTogbmV3IEV4Y2VwdGlvbkhhbmRsZXIoRE9NKX0pLFxuICAgIHByb3ZpZGUoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOiBNb2NrTG9jYXRpb25TdHJhdGVneX0pLFxuICAgIHByb3ZpZGUoWEhSLCB7dXNlQ2xhc3M6IERPTS5nZXRYSFIoKX0pLFxuICAgIFRlc3RDb21wb25lbnRCdWlsZGVyLFxuICAgIHByb3ZpZGUoTmdab25lLCB7dXNlQ2xhc3M6IE1vY2tOZ1pvbmV9KSxcbiAgICBwcm92aWRlKEFuaW1hdGlvbkJ1aWxkZXIsIHt1c2VDbGFzczogTW9ja0FuaW1hdGlvbkJ1aWxkZXJ9KSxcbiAgICBFdmVudE1hbmFnZXIsXG4gICAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBEb21FdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSlcbiAgXTtcbn1cblxuZnVuY3Rpb24gX3J1bnRpbWVDb21waWxlckJpbmRpbmdzKCkge1xuICByZXR1cm4gW1xuICAgIHByb3ZpZGUoWEhSLCB7dXNlQ2xhc3M6IERPTS5nZXRYSFIoKX0pLFxuICAgIENPTVBJTEVSX1BST1ZJREVSUyxcbiAgXTtcbn1cblxuZXhwb3J0IGNsYXNzIFRlc3RJbmplY3RvciB7XG4gIHByaXZhdGUgX2luc3RhbnRpYXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvciA9IG51bGw7XG5cbiAgcHJpdmF0ZSBfcHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBbXTtcblxuICByZXNldCgpIHtcbiAgICB0aGlzLl9pbmplY3RvciA9IG51bGw7XG4gICAgdGhpcy5fcHJvdmlkZXJzID0gW107XG4gICAgdGhpcy5faW5zdGFudGlhdGVkID0gZmFsc2U7XG4gIH1cblxuICBhZGRQcm92aWRlcnMocHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pIHtcbiAgICBpZiAodGhpcy5faW5zdGFudGlhdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbignQ2Fubm90IGFkZCBwcm92aWRlcnMgYWZ0ZXIgdGVzdCBpbmplY3RvciBpcyBpbnN0YW50aWF0ZWQnKTtcbiAgICB9XG4gICAgdGhpcy5fcHJvdmlkZXJzID0gTGlzdFdyYXBwZXIuY29uY2F0KHRoaXMuX3Byb3ZpZGVycywgcHJvdmlkZXJzKTtcbiAgfVxuXG4gIGNyZWF0ZUluamVjdG9yKCkge1xuICAgIHZhciByb290SW5qZWN0b3IgPSBJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlKF9nZXRSb290UHJvdmlkZXJzKCkpO1xuICAgIHRoaXMuX2luamVjdG9yID0gcm9vdEluamVjdG9yLnJlc29sdmVBbmRDcmVhdGVDaGlsZChMaXN0V3JhcHBlci5jb25jYXQoXG4gICAgICAgIExpc3RXcmFwcGVyLmNvbmNhdChfZ2V0QXBwQmluZGluZ3MoKSwgX3J1bnRpbWVDb21waWxlckJpbmRpbmdzKCkpLCB0aGlzLl9wcm92aWRlcnMpKTtcbiAgICB0aGlzLl9pbnN0YW50aWF0ZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzLl9pbmplY3RvcjtcbiAgfVxuXG4gIGV4ZWN1dGUoZm46IEZ1bmN0aW9uV2l0aFBhcmFtVG9rZW5zKTogYW55IHtcbiAgICBpZiAoIXRoaXMuX2luc3RhbnRpYXRlZCkge1xuICAgICAgdGhpcy5jcmVhdGVJbmplY3RvcigpO1xuICAgIH1cbiAgICByZXR1cm4gZm4uZXhlY3V0ZSh0aGlzLl9pbmplY3Rvcik7XG4gIH1cbn1cblxudmFyIF90ZXN0SW5qZWN0b3I6IFRlc3RJbmplY3RvciA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXN0SW5qZWN0b3IoKSB7XG4gIGlmIChfdGVzdEluamVjdG9yID09IG51bGwpIHtcbiAgICBfdGVzdEluamVjdG9yID0gbmV3IFRlc3RJbmplY3RvcigpO1xuICB9XG4gIHJldHVybiBfdGVzdEluamVjdG9yO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSBUZXN0SW5qZWN0b3IjY3JlYXRlSW5qZWN0b3IoKSBpbnN0ZWFkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVzdEluamVjdG9yKHByb3ZpZGVyczogQXJyYXk8VHlwZSB8IFByb3ZpZGVyIHwgYW55W10+KTogSW5qZWN0b3Ige1xuICB2YXIgcm9vdEluamVjdG9yID0gSW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZShfZ2V0Um9vdFByb3ZpZGVycygpKTtcbiAgcmV0dXJuIHJvb3RJbmplY3Rvci5yZXNvbHZlQW5kQ3JlYXRlQ2hpbGQoTGlzdFdyYXBwZXIuY29uY2F0KF9nZXRBcHBCaW5kaW5ncygpLCBwcm92aWRlcnMpKTtcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgVGVzdEluamVjdG9yI2NyZWF0ZUluamVjdG9yKCkgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRlc3RJbmplY3RvcldpdGhSdW50aW1lQ29tcGlsZXIoXG4gICAgcHJvdmlkZXJzOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4pOiBJbmplY3RvciB7XG4gIHJldHVybiBjcmVhdGVUZXN0SW5qZWN0b3IoTGlzdFdyYXBwZXIuY29uY2F0KF9ydW50aW1lQ29tcGlsZXJCaW5kaW5ncygpLCBwcm92aWRlcnMpKTtcbn1cblxuLyoqXG4gKiBBbGxvd3MgaW5qZWN0aW5nIGRlcGVuZGVuY2llcyBpbiBgYmVmb3JlRWFjaCgpYCBhbmQgYGl0KClgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiBiZWZvcmVFYWNoKGluamVjdChbRGVwZW5kZW5jeSwgQUNsYXNzXSwgKGRlcCwgb2JqZWN0KSA9PiB7XG4gKiAgIC8vIHNvbWUgY29kZSB0aGF0IHVzZXMgYGRlcGAgYW5kIGBvYmplY3RgXG4gKiAgIC8vIC4uLlxuICogfSkpO1xuICpcbiAqIGl0KCcuLi4nLCBpbmplY3QoW0FDbGFzc10sIChvYmplY3QpID0+IHtcbiAqICAgb2JqZWN0LmRvU29tZXRoaW5nKCk7XG4gKiAgIGV4cGVjdCguLi4pO1xuICogfSlcbiAqIGBgYFxuICpcbiAqIE5vdGVzOlxuICogLSBpbmplY3QgaXMgY3VycmVudGx5IGEgZnVuY3Rpb24gYmVjYXVzZSBvZiBzb21lIFRyYWNldXIgbGltaXRhdGlvbiB0aGUgc3ludGF4IHNob3VsZFxuICogZXZlbnR1YWxseVxuICogICBiZWNvbWVzIGBpdCgnLi4uJywgQEluamVjdCAob2JqZWN0OiBBQ2xhc3MsIGFzeW5jOiBBc3luY1Rlc3RDb21wbGV0ZXIpID0+IHsgLi4uIH0pO2BcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtGdW5jdGlvbldpdGhQYXJhbVRva2Vuc31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluamVjdCh0b2tlbnM6IGFueVtdLCBmbjogRnVuY3Rpb24pOiBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB7XG4gIHJldHVybiBuZXcgRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnModG9rZW5zLCBmbiwgZmFsc2UpO1xufVxuXG4vKipcbiAqIEFsbG93cyBpbmplY3RpbmcgZGVwZW5kZW5jaWVzIGluIGBiZWZvcmVFYWNoKClgIGFuZCBgaXQoKWAuIFRoZSB0ZXN0IG11c3QgcmV0dXJuXG4gKiBhIHByb21pc2Ugd2hpY2ggd2lsbCByZXNvbHZlIHdoZW4gYWxsIGFzeW5jaHJvbm91cyBhY3Rpdml0eSBpcyBjb21wbGV0ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogaXQoJy4uLicsIGluamVjdEFzeW5jKFtBQ2xhc3NdLCAob2JqZWN0KSA9PiB7XG4gKiAgIHJldHVybiBvYmplY3QuZG9Tb21ldGhpbmcoKS50aGVuKCgpID0+IHtcbiAqICAgICBleHBlY3QoLi4uKTtcbiAqICAgfSk7XG4gKiB9KVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtBcnJheX0gdG9rZW5zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnN9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmplY3RBc3luYyh0b2tlbnM6IGFueVtdLCBmbjogRnVuY3Rpb24pOiBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB7XG4gIHJldHVybiBuZXcgRnVuY3Rpb25XaXRoUGFyYW1Ub2tlbnModG9rZW5zLCBmbiwgdHJ1ZSk7XG59XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbldpdGhQYXJhbVRva2VucyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Rva2VuczogYW55W10sIHByaXZhdGUgX2ZuOiBGdW5jdGlvbiwgcHVibGljIGlzQXN5bmM6IGJvb2xlYW4pIHt9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBleGVjdXRlZCBmdW5jdGlvbi5cbiAgICovXG4gIGV4ZWN1dGUoaW5qZWN0b3I6IEluamVjdG9yKTogYW55IHtcbiAgICB2YXIgcGFyYW1zID0gdGhpcy5fdG9rZW5zLm1hcCh0ID0+IGluamVjdG9yLmdldCh0KSk7XG4gICAgcmV0dXJuIEZ1bmN0aW9uV3JhcHBlci5hcHBseSh0aGlzLl9mbiwgcGFyYW1zKTtcbiAgfVxuXG4gIGhhc1Rva2VuKHRva2VuOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Rva2Vucy5pbmRleE9mKHRva2VuKSA+IC0xOyB9XG59XG4iXX0=