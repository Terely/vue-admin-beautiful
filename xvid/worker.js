/* eslint-disable */
var key, Module = 'undefined' == typeof Module ? {} : Module,
    moduleOverrides = {};
for (key in Module) Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);
Module.arguments = [], Module.thisProgram = './this.program', Module.quit = function (a, b) {
    throw b;
}, Module.preRun = [], Module.postRun = [];
var ENVIRONMENT_IS_WEB = !1,
    ENVIRONMENT_IS_WORKER = !1,
    ENVIRONMENT_IS_NODE = !1,
    ENVIRONMENT_IS_SHELL = !1;
ENVIRONMENT_IS_WEB = 'object' == typeof window, ENVIRONMENT_IS_WORKER = 'function' == typeof importScripts,
    ENVIRONMENT_IS_NODE = 'object' == typeof process && 'function' == typeof require && !ENVIRONMENT_IS_WEB && !
        ENVIRONMENT_IS_WORKER, ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
var scriptDirectory = '';

function locateFile(a) {
    return Module.locateFile ? Module.locateFile(a, scriptDirectory) : scriptDirectory + a;
}

if (ENVIRONMENT_IS_NODE) {
    scriptDirectory = __dirname + '/';
    var nodeFS, nodePath;
    Module.read = function (a, b) {
        var c;
        return nodeFS || (nodeFS = require('fs')), nodePath || (nodePath = require('path')), a = nodePath.normalize(a), c =
            nodeFS.readFileSync(a), b ? c : c.toString();
    }, Module.readBinary = function (a) {
        var b = Module.read(a, !0);
        return b.buffer || (b = new Uint8Array(b)), assert(b.buffer), b;
    }, 1 < process.argv.length && (Module.thisProgram = process.argv[1].replace(/\\/g, '/')), Module.arguments =
        process.argv.slice(2), 'undefined' != typeof module && (module.exports = Module), process.on('uncaughtException',
        function (a) {
            if (!(a instanceof ExitStatus)) throw a;
        }), process.on('unhandledRejection', abort), Module.quit = function (a) {
        process.exit(a);
    }, Module.inspect = function () {
        return '[Emscripten Module object]';
    };
} else if (ENVIRONMENT_IS_SHELL) 'undefined' != typeof read && (Module.read = function (a) {
    return read(a);
}), Module.readBinary = function (a) {
    var b;
    return 'function' == typeof readbuffer ? new Uint8Array(readbuffer(a)) : (b = read(a, 'binary'), assert('object' ==
        typeof b), b);
}, 'undefined' == typeof scriptArgs ? 'undefined' != typeof arguments && (Module.arguments = arguments) : Module.arguments =
    scriptArgs, 'function' == typeof quit && (Module.quit = function (a) {
    quit(a);
});
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href :
    document.currentScript && (scriptDirectory = document.currentScript.src), scriptDirectory = 0 === scriptDirectory.indexOf(
    'blob:') ? '' : scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/') + 1), Module.read = function (a) {
    var b = new XMLHttpRequest;
    return b.open('GET', a, !1), b.send(null), b.responseText;
}, ENVIRONMENT_IS_WORKER && (Module.readBinary = function (a) {
    var b = new XMLHttpRequest;
    return b.open('GET', a, !1), b.responseType = 'arraybuffer', b.send(null), new Uint8Array(b.response);
}), Module.readAsync = function (a, b, c) {
    var d = new XMLHttpRequest;
    d.open('GET', a, !0), d.responseType = 'arraybuffer', d.onload = function () {
        return 200 == d.status || 0 == d.status && d.response ? void b(d.response) : void c();
    }, d.onerror = c, d.send(null);
}, Module.setWindowTitle = function (a) {
    document.title = a;
};
else ;
var out = Module.print || ('undefined' == typeof console ? 'undefined' == typeof print ? null : print : console.log.bind(
    console)),
    err = Module.printErr || ('undefined' == typeof printErr ? 'undefined' != typeof console && console.warn.bind(console) ||
        out : printErr);
for (key in moduleOverrides) moduleOverrides.hasOwnProperty(key) && (Module[key] = moduleOverrides[key]);
moduleOverrides = void 0;
var STACK_ALIGN = 16;

function staticAlloc(a) {
    var b = STATICTOP;
    return STATICTOP = -16 & STATICTOP + a + 15, b;
}

function dynamicAlloc(a) {
    var b = HEAP32[DYNAMICTOP_PTR >> 2],
        c = -16 & b + a + 15;
    if (HEAP32[DYNAMICTOP_PTR >> 2] = c, c >= TOTAL_MEMORY) {
        var d = enlargeMemory();
        if (!d) return HEAP32[DYNAMICTOP_PTR >> 2] = b, 0;
    }
    return b;
}

function alignMemory(a, b) {
    b || (b = STACK_ALIGN);
    var c = a = Math.ceil(a / b) * b;
    return c;
}

function getNativeTypeSize(a) {
    switch (a) {
        case 'i1':
        case 'i8':
            return 1;
        case 'i16':
            return 2;
        case 'i32':
            return 4;
        case 'i64':
            return 8;
        case 'float':
            return 4;
        case 'double':
            return 8;
        default: {
            if ('*' === a[a.length - 1]) return 4;
            if ('i' === a[0]) {
                var b = parseInt(a.substr(1));
                return assert(0 == b % 8), b / 8;
            }
            return 0;
        }
    }
}

function warnOnce(a) {
    warnOnce.shown || (warnOnce.shown = {}), warnOnce.shown[a] || (warnOnce.shown[a] = 1, err(a));
}

var asm2wasmImports = {
        'f64-rem': function (a, b) {
            return a % b;
        },
        debugger: function () {
            debugger
        }
    },
    jsCallStartIndex = 1,
    functionPointers = [],
    funcWrappers = {};

function dynCall(a, b, c) {
    return c && c.length ? Module['dynCall_' + a].apply(null, [b].concat(c)) : Module['dynCall_' + a].call(null, b);
}

var tempRet0 = 0,
    setTempRet0 = function (a) {
        tempRet0 = a;
    },
    getTempRet0 = function () {
        return tempRet0;
    },
    GLOBAL_BASE = 1024,
    ABORT = !1,
    EXITSTATUS = 0;

function assert(a, b) {
    a || abort('Assertion failed: ' + b);
}

function getCFunc(a) {
    var b = Module['_' + a];
    return assert(b, 'Cannot call unknown function ' + a + ', make sure it is exported'), b;
}

var JSfuncs = {
        stackSave: function () {
            stackSave();
        },
        stackRestore: function () {
            stackRestore();
        },
        arrayToC: function (a) {
            var b = stackAlloc(a.length);
            return writeArrayToMemory(a, b), b;
        },
        stringToC: function (a) {
            var b = 0;
            if (null !== a && a !== void 0 && 0 !== a) {
                var c = (a.length << 2) + 1;
                b = stackAlloc(c), stringToUTF8(a, b, c);
            }
            return b;
        }
    },
    toC = {
        string: JSfuncs.stringToC,
        array: JSfuncs.arrayToC
    };

function ccall(a, b, c, d) {
    function e(a) {
        return 'string' === b ? Pointer_stringify(a) : 'boolean' === b ? !!a : a;
    }

    var f = getCFunc(a),
        g = [],
        h = 0;
    if (d)
        for (var j, k = 0; k < d.length; k++) j = toC[c[k]], j ? (0 === h && (h = stackSave()), g[k] = j(d[k])) : g[k] = d[
            k];
    var l = f.apply(null, g);
    return l = e(l), 0 !== h && stackRestore(h), l;
}

function setValue(a, b, c) {
    c = c || 'i8', '*' === c.charAt(c.length - 1) && (c = 'i32');
    'i1' === c ? HEAP8[a >> 0] = b : 'i8' === c ? HEAP8[a >> 0] = b : 'i16' === c ? HEAP16[a >> 1] = b : 'i32' === c ?
        HEAP32[a >> 2] = b : 'i64' === c ? (tempI64 = [b >>> 0, (tempDouble = b, 1 <= +Math_abs(tempDouble) ? 0 <
        tempDouble ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((
            tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[a >> 2] = tempI64[0], HEAP32[a + 4 >> 2] =
            tempI64[1]) : 'float' === c ? HEAPF32[a >> 2] = b : 'double' === c ? HEAPF64[a >> 3] = b : abort(
            'invalid type for setValue: ' + c);
}

var ALLOC_STATIC = 2,
    ALLOC_NONE = 4;

function Pointer_stringify(a, b) {
    if (0 === b || !a) return '';
    for (var c, d = 0, e = 0;
         (c = HEAPU8[a + e >> 0], d |= c, 0 != c || b) && !(e++, b && e == b);) ;
    b || (b = e);
    var f = '';
    if (128 > d) {
        for (var g, h = 1024; 0 < b;) g = String.fromCharCode.apply(String, HEAPU8.subarray(a, a + Math.min(b, h))), f = f ?
            f + g : g, a += h, b -= h;
        return f;
    }
    return UTF8ToString(a);
}

var UTF8Decoder = 'undefined' == typeof TextDecoder ? void 0 : new TextDecoder('utf8');

function UTF8ArrayToString(a, b) {
    for (var c = String.fromCharCode, d = b; a[d];) ++d;
    if (16 < d - b && a.subarray && UTF8Decoder) return UTF8Decoder.decode(a.subarray(b, d));
    for (var e, f, g, h, i, j, k = ''; ;) {
        if (e = a[b++], !e) return k;
        if (!(128 & e)) {
            k += c(e);
            continue;
        }
        if (f = 63 & a[b++], 192 == (224 & e)) {
            k += c((31 & e) << 6 | f);
            continue;
        }
        if (g = 63 & a[b++], 224 == (240 & e) ? e = (15 & e) << 12 | f << 6 | g : (h = 63 & a[b++], 240 == (248 & e) ? e =
            (7 & e) << 18 | f << 12 | g << 6 | h : (i = 63 & a[b++], 248 == (252 & e) ? e = (3 & e) << 24 | f << 18 | g <<
            12 | h << 6 | i : (j = 63 & a[b++], e = (1 & e) << 30 | f << 24 | g << 18 | h << 12 | i << 6 | j))), 65536 >
        e) k += c(e);
        else {
            var l = e - 65536;
            k += c(55296 | l >> 10, 56320 | 1023 & l);
        }
    }
}

function UTF8ToString(a) {
    return UTF8ArrayToString(HEAPU8, a);
}

function stringToUTF8Array(a, b, c, d) {
    if (!(0 < d)) return 0;
    for (var e, f = c, g = c + d - 1, h = 0; h < a.length; ++h) {
        if (e = a.charCodeAt(h), 55296 <= e && 57343 >= e) {
            var j = a.charCodeAt(++h);
            e = 65536 + ((1023 & e) << 10) | 1023 & j;
        }
        if (127 >= e) {
            if (c >= g) break;
            b[c++] = e;
        } else if (2047 >= e) {
            if (c + 1 >= g) break;
            b[c++] = 192 | e >> 6, b[c++] = 128 | 63 & e;
        } else if (65535 >= e) {
            if (c + 2 >= g) break;
            b[c++] = 224 | e >> 12, b[c++] = 128 | 63 & e >> 6, b[c++] = 128 | 63 & e;
        } else if (2097151 >= e) {
            if (c + 3 >= g) break;
            b[c++] = 240 | e >> 18, b[c++] = 128 | 63 & e >> 12, b[c++] = 128 | 63 & e >> 6, b[c++] = 128 | 63 & e;
        } else if (67108863 >= e) {
            if (c + 4 >= g) break;
            b[c++] = 248 | e >> 24, b[c++] = 128 | 63 & e >> 18, b[c++] = 128 | 63 & e >> 12, b[c++] = 128 | 63 & e >> 6, b[c++] =
                128 | 63 & e;
        } else {
            if (c + 5 >= g) break;
            b[c++] = 252 | e >> 30, b[c++] = 128 | 63 & e >> 24, b[c++] = 128 | 63 & e >> 18, b[c++] = 128 | 63 & e >> 12, b[
                c++] = 128 | 63 & e >> 6, b[c++] = 128 | 63 & e;
        }
    }
    return b[c] = 0, c - f;
}

function stringToUTF8(a, b, c) {
    return stringToUTF8Array(a, HEAPU8, b, c);
}

function lengthBytesUTF8(a) {
    for (var b, c = 0, d = 0; d < a.length; ++d) b = a.charCodeAt(d), 55296 <= b && 57343 >= b && (b = 65536 + ((1023 & b) <<
        10) | 1023 & a.charCodeAt(++d)), 127 >= b ? ++c : 2047 >= b ? c += 2 : 65535 >= b ? c += 3 : 2097151 >= b ? c +=
        4 : 67108863 >= b ? c += 5 : c += 6;
    return c;
}

var UTF16Decoder = 'undefined' == typeof TextDecoder ? void 0 : new TextDecoder('utf-16le');

function demangle(a) {
    return a;
}

function demangleAll(a) {
    var b = /__Z[\w\d_]+/g;
    return a.replace(b, function (a) {
        var b = demangle(a);
        return a === b ? a : b + ' [' + a + ']';
    });
}

function jsStackTrace() {
    var a = new Error;
    if (!a.stack) {
        try {
            throw new Error(0);
        } catch (b) {
            a = b;
        }
        if (!a.stack) return '(no stack trace available)';
    }
    return a.stack.toString();
}

var PAGE_SIZE = 16384,
    WASM_PAGE_SIZE = 65536,
    ASMJS_PAGE_SIZE = 16777216;

function alignUp(a, b) {
    return 0 < a % b && (a += b - a % b), a;
}

var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBuffer(a) {
    Module.buffer = buffer = a;
}

function updateGlobalBufferViews() {
    Module.HEAP8 = HEAP8 = new Int8Array(buffer), Module.HEAP16 = HEAP16 = new Int16Array(buffer), Module.HEAP32 = HEAP32 =
        new Int32Array(buffer), Module.HEAPU8 = HEAPU8 = new Uint8Array(buffer), Module.HEAPU16 = HEAPU16 = new Uint16Array(
        buffer), Module.HEAPU32 = HEAPU32 = new Uint32Array(buffer), Module.HEAPF32 = HEAPF32 = new Float32Array(buffer),
        Module.HEAPF64 = HEAPF64 = new Float64Array(buffer);
}

var STATIC_BASE, STATICTOP, staticSealed, STACK_BASE, STACKTOP, STACK_MAX, DYNAMIC_BASE, DYNAMICTOP_PTR;
STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0, staticSealed = !1;

function abortOnCannotGrowMemory() {
    abort(
        'Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' +
        TOTAL_MEMORY +
        ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 '
    );
}

function enlargeMemory() {
    abortOnCannotGrowMemory();
}

var TOTAL_STACK = Module.TOTAL_STACK || 5242880,
    TOTAL_MEMORY = Module.TOTAL_MEMORY || 67108864;
TOTAL_MEMORY < TOTAL_STACK && err('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + TOTAL_MEMORY +
    '! (TOTAL_STACK=' + TOTAL_STACK + ')'), Module.buffer ? buffer = Module.buffer : ('object' == typeof WebAssembly &&
'function' == typeof WebAssembly.Memory ? (Module.wasmMemory = new WebAssembly.Memory({
    initial: TOTAL_MEMORY / WASM_PAGE_SIZE,
    maximum: TOTAL_MEMORY / WASM_PAGE_SIZE
}), buffer = Module.wasmMemory.buffer) : buffer = new ArrayBuffer(TOTAL_MEMORY), Module.buffer = buffer),
    updateGlobalBufferViews();

function getTotalMemory() {
    return TOTAL_MEMORY;
}

function callRuntimeCallbacks(a) {
    for (; 0 < a.length;) {
        var b = a.shift();
        if ('function' == typeof b) {
            b();
            continue;
        }
        var c = b.func;
        'number' == typeof c ? b.arg === void 0 ? Module.dynCall_v(c) : Module.dynCall_vi(c, b.arg) : c(b.arg === void 0 ?
            null : b.arg);
    }
}

var __ATPRERUN__ = [],
    __ATINIT__ = [],
    __ATMAIN__ = [],
    __ATEXIT__ = [],
    __ATPOSTRUN__ = [],
    runtimeInitialized = !1,
    runtimeExited = !1;

function preRun() {
    if (Module.preRun)
        for ('function' == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length;) addOnPreRun(
            Module.preRun.shift());
    callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
    runtimeInitialized || (runtimeInitialized = !0, callRuntimeCallbacks(__ATINIT__));
}

function preMain() {
    callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
    callRuntimeCallbacks(__ATEXIT__), runtimeExited = !0;
}

function postRun() {
    if (Module.postRun)
        for ('function' == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length;)
            addOnPostRun(Module.postRun.shift());
    callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(a) {
    __ATPRERUN__.unshift(a);
}

function addOnPostRun(a) {
    __ATPOSTRUN__.unshift(a);
}

function writeArrayToMemory(a, b) {
    HEAP8.set(a, b);
}

function writeAsciiToMemory(a, b, c) {
    for (var d = 0; d < a.length; ++d) HEAP8[b++ >> 0] = a.charCodeAt(d);
    c || (HEAP8[b >> 0] = 0);
}

var Math_abs = Math.abs,
    Math_ceil = Math.ceil,
    Math_floor = Math.floor,
    Math_min = Math.min,
    runDependencies = 0,
    runDependencyWatcher = null,
    dependenciesFulfilled = null;

function addRunDependency() {
    runDependencies++, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies);
}

function removeRunDependency() {
    if (runDependencies--, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies), 0 ==
    runDependencies && (null !== runDependencyWatcher && (clearInterval(runDependencyWatcher), runDependencyWatcher =
        null), dependenciesFulfilled)) {
        var a = dependenciesFulfilled;
        dependenciesFulfilled = null, a();
    }
}

Module.preloadedImages = {}, Module.preloadedAudios = {};
var dataURIPrefix = 'data:application/octet-stream;base64,';

function isDataURI(a) {
    return String.prototype.startsWith ? a.startsWith(dataURIPrefix) : 0 === a.indexOf(dataURIPrefix);
}

function integrateWasmJS() {
    function a(a) {
        var b = Module.buffer;
        a.byteLength < b.byteLength && err(
            'the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here');
        var c = new Int8Array(b),
            d = new Int8Array(a);
        d.set(c), updateGlobalBuffer(a), updateGlobalBufferViews();
    }

    function b() {
        try {
            if (Module.wasmBinary) return new Uint8Array(Module.wasmBinary);
            if (Module.readBinary) return Module.readBinary(f);
            throw 'both async and sync fetching of the wasm failed';
        } catch (a) {
            abort(a);
        }
    }

    function c() {
        return !Module.wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && 'function' == typeof fetch ? fetch(f, {
            credentials: 'same-origin'
        }).then(function (a) {
            if (!a.ok) throw 'failed to load wasm binary file at \'' + f + '\'';
            return a.arrayBuffer();
        }).catch(function () {
            return b();
        }) : new Promise(function (a) {
            a(b());
        });
    }

    function d(b, d) {
        function e(b) {
            i = b.exports, i.memory && a(i.memory), Module.asm = i, Module.usingWasm = !0, removeRunDependency(
                'wasm-instantiate');
        }

        function g(a) {
            e(a.instance, a.module);
        }

        function j(a) {
            c().then(function (a) {
                return WebAssembly.instantiate(a, h);
            }).then(a, function (a) {
                err('failed to asynchronously prepare wasm: ' + a), abort(a);
            });
        }

        if ('object' != typeof WebAssembly) return err('no native wasm support detected'), !1;
        if (!(Module.wasmMemory instanceof WebAssembly.Memory)) return err('no native wasm Memory in use'), !1;
        if (d.memory = Module.wasmMemory, h.global = {
            NaN: NaN,
            Infinity: 1 / 0
        }, h['global.Math'] = Math, h.env = d, addRunDependency('wasm-instantiate'), Module.instantiateWasm) try {
            return Module.instantiateWasm(h, e);
        } catch (a) {
            return err('Module.instantiateWasm callback failed with error: ' + a), !1;
        }
        return Module.wasmBinary || 'function' != typeof WebAssembly.instantiateStreaming || isDataURI(f) || 'function' !=
        typeof fetch ? j(g) : WebAssembly.instantiateStreaming(fetch(f, {
            credentials: 'same-origin'
        }), h).then(g, function (a) {
            j(g);
        }), {};
    }

    var e = 'xvid.wast',
        f = 'xvid.wasm',
        g = 'xvid.temp.asm.js';
    isDataURI(e) || (e = locateFile(e)), isDataURI(f) || (f = locateFile(f)), isDataURI(g) || (g = locateFile(g));
    var h = {
            global: null,
            env: null,
            asm2wasm: asm2wasmImports,
            parent: Module
        },
        i = null;
    Module.asmPreload = Module.asm;
    var j = Module.reallocBuffer,
        k = function (a) {
            var b = Module.usingWasm ? WASM_PAGE_SIZE : ASMJS_PAGE_SIZE;
            a = alignUp(a, b);
            var c = Module.buffer,
                d = c.byteLength;
            if (Module.usingWasm) try {
                var e = Module.wasmMemory.grow((a - d) / 65536);
                return -1 === e ? null : Module.buffer = Module.wasmMemory.buffer;
            } catch (a) {
                return null;
            }
        };
    Module.reallocBuffer = function (a) {
        return 'asmjs' === l ? j(a) : k(a);
    };
    var l = '';
    Module.asm = function (a, b, c) {
        if (!b.table) {
            var e = Module.wasmTableSize;
            void 0 === e && (e = 1024);
            var f = Module.wasmMaxTableSize;
            b.table = 'object' == typeof WebAssembly && 'function' == typeof WebAssembly.Table ? void 0 === f ? new WebAssembly
                .Table({
                    initial: e,
                    element: 'anyfunc'
                }) : new WebAssembly.Table({
                initial: e,
                maximum: f,
                element: 'anyfunc'
            }) : Array(e), Module.wasmTable = b.table;
        }
        b.__memory_base || (b.__memory_base = Module.STATIC_BASE), b.__table_base || (b.__table_base = 0);
        var g;
        return g = d(a, b, c), assert(g, 'no binaryen method succeeded.'), g;
    };
}

integrateWasmJS(), STATIC_BASE = GLOBAL_BASE, STATICTOP = STATIC_BASE + 184608, __ATINIT__.push();
var STATIC_BUMP = 184608;
Module.STATIC_BASE = STATIC_BASE, Module.STATIC_BUMP = 184608;
var tempDoublePtr = STATICTOP;
STATICTOP += 16;

function _emscripten_memcpy_big(a, b, c) {
    return HEAPU8.set(HEAPU8.subarray(b, b + c), a), a;
}

function ___setErrNo(a) {
    return Module.___errno_location && (HEAP32[Module.___errno_location() >> 2] = a), a;
}

var ERRNO_CODES = {
    EPERM: 1,
    ENOENT: 2,
    ESRCH: 3,
    EINTR: 4,
    EIO: 5,
    ENXIO: 6,
    E2BIG: 7,
    ENOEXEC: 8,
    EBADF: 9,
    ECHILD: 10,
    EAGAIN: 11,
    EWOULDBLOCK: 11,
    ENOMEM: 12,
    EACCES: 13,
    EFAULT: 14,
    ENOTBLK: 15,
    EBUSY: 16,
    EEXIST: 17,
    EXDEV: 18,
    ENODEV: 19,
    ENOTDIR: 20,
    EISDIR: 21,
    EINVAL: 22,
    ENFILE: 23,
    EMFILE: 24,
    ENOTTY: 25,
    ETXTBSY: 26,
    EFBIG: 27,
    ENOSPC: 28,
    ESPIPE: 29,
    EROFS: 30,
    EMLINK: 31,
    EPIPE: 32,
    EDOM: 33,
    ERANGE: 34,
    ENOMSG: 42,
    EIDRM: 43,
    ECHRNG: 44,
    EL2NSYNC: 45,
    EL3HLT: 46,
    EL3RST: 47,
    ELNRNG: 48,
    EUNATCH: 49,
    ENOCSI: 50,
    EL2HLT: 51,
    EDEADLK: 35,
    ENOLCK: 37,
    EBADE: 52,
    EBADR: 53,
    EXFULL: 54,
    ENOANO: 55,
    EBADRQC: 56,
    EBADSLT: 57,
    EDEADLOCK: 35,
    EBFONT: 59,
    ENOSTR: 60,
    ENODATA: 61,
    ETIME: 62,
    ENOSR: 63,
    ENONET: 64,
    ENOPKG: 65,
    EREMOTE: 66,
    ENOLINK: 67,
    EADV: 68,
    ESRMNT: 69,
    ECOMM: 70,
    EPROTO: 71,
    EMULTIHOP: 72,
    EDOTDOT: 73,
    EBADMSG: 74,
    ENOTUNIQ: 76,
    EBADFD: 77,
    EREMCHG: 78,
    ELIBACC: 79,
    ELIBBAD: 80,
    ELIBSCN: 81,
    ELIBMAX: 82,
    ELIBEXEC: 83,
    ENOSYS: 38,
    ENOTEMPTY: 39,
    ENAMETOOLONG: 36,
    ELOOP: 40,
    EOPNOTSUPP: 95,
    EPFNOSUPPORT: 96,
    ECONNRESET: 104,
    ENOBUFS: 105,
    EAFNOSUPPORT: 97,
    EPROTOTYPE: 91,
    ENOTSOCK: 88,
    ENOPROTOOPT: 92,
    ESHUTDOWN: 108,
    ECONNREFUSED: 111,
    EADDRINUSE: 98,
    ECONNABORTED: 103,
    ENETUNREACH: 101,
    ENETDOWN: 100,
    ETIMEDOUT: 110,
    EHOSTDOWN: 112,
    EHOSTUNREACH: 113,
    EINPROGRESS: 115,
    EALREADY: 114,
    EDESTADDRREQ: 89,
    EMSGSIZE: 90,
    EPROTONOSUPPORT: 93,
    ESOCKTNOSUPPORT: 94,
    EADDRNOTAVAIL: 99,
    ENETRESET: 102,
    EISCONN: 106,
    ENOTCONN: 107,
    ETOOMANYREFS: 109,
    EUSERS: 87,
    EDQUOT: 122,
    ESTALE: 116,
    ENOTSUP: 95,
    ENOMEDIUM: 123,
    EILSEQ: 84,
    EOVERFLOW: 75,
    ECANCELED: 125,
    ENOTRECOVERABLE: 131,
    EOWNERDEAD: 130,
    ESTRPIPE: 86
};

function _sysconf(a) {
    switch (a) {
        case 30:
            return PAGE_SIZE;
        case 85:
            var b = 2147418112;
            return b = HEAPU8.length, b / PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
            return 200809;
        case 79:
            return 0;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
            return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
            return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
            return 1024;
        case 31:
        case 42:
        case 72:
            return 32;
        case 87:
        case 26:
        case 33:
            return 2147483647;
        case 34:
        case 1:
            return 47839;
        case 38:
        case 36:
            return 99;
        case 43:
        case 37:
            return 2048;
        case 0:
            return 2097152;
        case 3:
            return 65536;
        case 28:
            return 32768;
        case 44:
            return 32767;
        case 75:
            return 16384;
        case 39:
            return 1e3;
        case 89:
            return 700;
        case 71:
            return 256;
        case 40:
            return 255;
        case 2:
            return 100;
        case 180:
            return 64;
        case 25:
            return 20;
        case 5:
            return 16;
        case 6:
            return 6;
        case 73:
            return 4;
        case 84:
            return 'object' == typeof navigator ? navigator.hardwareConcurrency || 1 : 1;
    }
    return ___setErrNo(ERRNO_CODES.EINVAL), -1;
}

DYNAMICTOP_PTR = staticAlloc(4), STACK_BASE = STACKTOP = alignMemory(STATICTOP), STACK_MAX = STACK_BASE + TOTAL_STACK,
    DYNAMIC_BASE = alignMemory(STACK_MAX), HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE, staticSealed = !0;
var ASSERTIONS = !1;
Module.wasmTableSize = 50, Module.wasmMaxTableSize = 50, Module.asmGlobalArg = {}, Module.asmLibraryArg = {
    abort: abort,
    assert: assert,
    enlargeMemory: enlargeMemory,
    getTotalMemory: getTotalMemory,
    setTempRet0: setTempRet0,
    getTempRet0: getTempRet0,
    abortOnCannotGrowMemory: abortOnCannotGrowMemory,
    ___setErrNo: ___setErrNo,
    _emscripten_memcpy_big: _emscripten_memcpy_big,
    _sysconf: _sysconf,
    DYNAMICTOP_PTR: DYNAMICTOP_PTR,
    tempDoublePtr: tempDoublePtr,
    STACKTOP: STACKTOP,
    STACK_MAX: STACK_MAX
};
var asm = Module.asm(Module.asmGlobalArg, Module.asmLibraryArg, buffer);
Module.asm = asm;
var ___errno_location = Module.___errno_location = function () {
        return Module.asm.___errno_location.apply(null, arguments);
    },
    _free = Module._free = function () {
        return Module.asm._free.apply(null, arguments);
    },
    _llvm_bswap_i32 = Module._llvm_bswap_i32 = function () {
        return Module.asm._llvm_bswap_i32.apply(null, arguments);
    },
    _malloc = Module._malloc = function () {
        return Module.asm._malloc.apply(null, arguments);
    },
    _memcpy = Module._memcpy = function () {
        return Module.asm._memcpy.apply(null, arguments);
    },
    _memset = Module._memset = function () {
        return Module.asm._memset.apply(null, arguments);
    },
    _sbrk = Module._sbrk = function () {
        return Module.asm._sbrk.apply(null, arguments);
    },
    _xvd_create = Module._xvd_create = function () {
        return Module.asm._xvd_create.apply(null, arguments);
    },
    _xvd_decode_rgba = Module._xvd_decode_rgba = function () {
        return Module.asm._xvd_decode_rgba.apply(null, arguments);
    },
    _xvd_frame_data = Module._xvd_frame_data = function () {
        return Module.asm._xvd_frame_data.apply(null, arguments);
    },
    _xvd_free = Module._xvd_free = function () {
        return Module.asm._xvd_free.apply(null, arguments);
    },
    _xvd_global_init = Module._xvd_global_init = function () {
        return Module.asm._xvd_global_init.apply(null, arguments);
    },
    _xvd_test_rgba = Module._xvd_test_rgba = function () {
        return Module.asm._xvd_test_rgba.apply(null, arguments);
    },
    establishStackSpace = Module.establishStackSpace = function () {
        return Module.asm.establishStackSpace.apply(null, arguments);
    },
    setThrew = Module.setThrew = function () {
        return Module.asm.setThrew.apply(null, arguments);
    },
    stackAlloc = Module.stackAlloc = function () {
        return Module.asm.stackAlloc.apply(null, arguments);
    },
    stackRestore = Module.stackRestore = function () {
        return Module.asm.stackRestore.apply(null, arguments);
    },
    stackSave = Module.stackSave = function () {
        return Module.asm.stackSave.apply(null, arguments);
    },
    dynCall_iiii = Module.dynCall_iiii = function () {
        return Module.asm.dynCall_iiii.apply(null, arguments);
    },
    dynCall_v = Module.dynCall_v = function () {
        return Module.asm.dynCall_v.apply(null, arguments);
    },
    dynCall_viiiii = Module.dynCall_viiiii = function () {
        return Module.asm.dynCall_viiiii.apply(null, arguments);
    },
    dynCall_viiiiiiii = Module.dynCall_viiiiiiii = function () {
        return Module.asm.dynCall_viiiiiiii.apply(null, arguments);
    },
    dynCall_viiiiiiiiii = Module.dynCall_viiiiiiiiii = function () {
        return Module.asm.dynCall_viiiiiiiiii.apply(null, arguments);
    };
Module.asm = asm;

function ExitStatus(a) {
    this.name = 'ExitStatus', this.message = 'Program terminated with exit(' + a + ')', this.status = a;
}

ExitStatus.prototype = new Error, ExitStatus.prototype.constructor = ExitStatus;
var initialStackTop;
dependenciesFulfilled = function a() {
    Module.calledRun || run(), Module.calledRun || (dependenciesFulfilled = a);
};

function run(a) {
    function b() {
        Module.calledRun || (Module.calledRun = !0, ABORT || (ensureInitRuntime(), preMain(), Module.onRuntimeInitialized &&
        Module.onRuntimeInitialized(), postRun()));
    }

    (a = a || Module.arguments, !(0 < runDependencies)) && (preRun(), 0 < runDependencies || Module.calledRun || (Module
        .setStatus ? (Module.setStatus('Running...'), setTimeout(function () {
        setTimeout(function () {
            Module.setStatus('');
        }, 1), b();
    }, 1)) : b()));
}

Module.run = run;

function abort(a) {
    throw Module.onAbort && Module.onAbort(a), void 0 === a ? a = '' : (out(a), err(a), a = JSON.stringify(a)), ABORT = !
        0, EXITSTATUS = 1, 'abort(' + a + '). Build with -s ASSERTIONS=1 for more info.';
}

if (Module.abort = abort, Module.preInit)
    for ('function' == typeof Module.preInit && (Module.preInit = [Module.preInit]); 0 < Module.preInit.length;) Module.preInit
        .pop()();
Module.noExitRuntime = !0, run();
let imgw, imgh, hdl = null,
    pm = null,
    subd = null,
    arrPool = [];
Module.onRuntimeInitialized = () => {
    Module._xvd_global_init(), postMessage({
        cmd: 'wasmLoaded'
    });
}, onmessage = function (a) {
    switch (a.data.cmd) {
        case 'init':
            imgw = a.data.w, imgh = a.data.h, hdl = Module._xvd_create(imgw, imgh), pm = Module._xvd_frame_data(hdl), subd =
                Module.HEAPU8.subarray(pm, pm + 4 * (imgw * imgh));
            break;
        case 'close':
            Module._xvd_free(hdl), close();
            break;
        case 'frame': {
            const b = new Uint8Array(a.data.data);
            let c = null;
            try {
                c = Module._malloc(b.byteLength), Module.HEAPU8.set(b, c);
                Module._xvd_decode_rgba(hdl, c, b.byteLength);
                let a = arrPool.pop();
                if (!a) a = Module.buffer.slice(pm, pm + 4 * (imgw * imgh));
                else {
                    let b = new Uint8Array(a);
                    b.set(subd), b = null;
                }
                postMessage({
                    cmd: 'decode_image',
                    data: a
                }, [a]);
            } finally {
                Module._free(c);
            }
        }
            break;
        case 'bufback':
            6 > arrPool.length && (arrPool.push(a.data.data), delete a.data.data);
    }
};
