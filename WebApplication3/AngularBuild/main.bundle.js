webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The whole content below can be removed with the new code.-->\r\n<div style=\"text-align:center\">\r\n  <h1>\r\n    {{connectionStatus}}\r\n  </h1>\r\n\r\n</div>\r\n\r\n<h1>Direct chat</h1>\r\n<div class=\"container\">\r\n  <div class=\"form-group\">\r\n    <a class=\"btn btn-info\" target=\"_blank\" href=\"/\">Open Another Chat</a>\r\n  </div>\r\n\r\n  <div class=\"form-group\">\r\n    <label for=\"name\">Name</label>\r\n    <input type=\"text\" id=\"name\" name=\"name\" class=\"form-control\" #dataName placeholder=\"your name\" value=\"user 1\" required/>\r\n  </div>\r\n  <div class=\"form-group\">\r\n    <label for=\"text\">Message</label>\r\n    <textarea type=\"text\" id=\"text\" class=\"form-control\" name=\"text\" #dataText placeholder=\"text ...\" required></textarea>\r\n  </div>\r\n  <button type=\"submit\" class=\"btn btn-success\" (click)=\"onSubmit(dataName.value,dataText.value); \">Submit</button>\r\n\r\n\r\n\r\n</div>\r\n\r\n\r\n<h2>Join to the group</h2>\r\n<div class=\"container\">\r\n\r\n  <div *ngIf=\"!groupName\">\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"groupName\">Group Name</label>\r\n      <input type=\"text\" id=\"groupName\" name=\"groupName\" class=\"form-control\" #dataGroupName placeholder=\"your group name\" value=\"group 1\"\r\n        required/>\r\n    </div>\r\n    <button type=\"submit\" class=\"btn btn-success\" (click)=\"joniGroup(dataGroupName.value); \">Join</button>\r\n  </div>\r\n  <div *ngIf=\"groupName\">\r\n\r\n    <div class=\"form-group\">\r\n      <label for=\"groupText\">Message</label>\r\n      <textarea type=\"text\" id=\"groupText\" class=\"form-control\" name=\"groupText\" #dataGroupText placeholder=\"text ...\" required></textarea>\r\n    </div>\r\n    <button type=\"submit\" class=\"btn btn-success\" (click)=\"sendToGroup(dataGroupText.value); \">Send To Group</button>\r\n    <button type=\"submit\" class=\"btn btn-danger\" (click)=\"leaveRoom(); \">Leave Room</button>\r\n\r\n  </div>\r\n\r\n\r\n\r\n</div>\r\n<div>\r\n  <div *ngFor=\"let item of messages\">\r\n    &bull; {{item.Name}}: {{item.Message}}\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_signalr__ = __webpack_require__("../../../../ng2-signalr/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(_signalR) {
        var _this = this;
        this._signalR = _signalR;
        this.title = 'app';
        this.connectionStatus = 'none';
        this.messages = [];
        var o = {};
        var conx = this._signalR.createConnection(o);
        conx.status.subscribe(function (status) {
            _this.connectionStatus = status.name;
        });
        conx.start().then(function (c) {
            _this.connectionSignalR = c;
            // 1.create a listener object
            // const onMessageSent$ = new BroadcastEventListener<ChatMessage>('addChatMessage');
            // // 2.register the listener
            // c.listen(onMessageSent$);
            // // 3.subscribe for incoming messages
            // onMessageSent$.subscribe((chatMessage: ChatMessage) => {
            //   console.log('listener  ', chatMessage);
            //   this.title += '  ' + chatMessage.name + '  ' + chatMessage.text;
            // });
            var listener = c.listenFor('addChatMessage');
            listener.subscribe(function (a) {
                _this.messages.push(a);
            });
        });
    }
    AppComponent.prototype.onSubmit = function (name, text) {
        this.connectionSignalR.invoke('Send', name, text).then(function () {
            console.log('message submit');
        });
    };
    AppComponent.prototype.joniGroup = function (groupName) {
        var _this = this;
        this.connectionSignalR.invoke('JoinRoom', groupName).then(function () {
            _this.groupName = groupName;
            console.log('Join Room');
        });
    };
    AppComponent.prototype.sendToGroup = function (text) {
        var _this = this;
        this.connectionSignalR.invoke('SendToGroup', this.groupName, text).then(function () {
            console.log(text + " sent to " + _this.groupName);
        });
    };
    AppComponent.prototype.leaveRoom = function () {
        var _this = this;
        this.connectionSignalR.invoke('LeaveRoom', this.groupName).then(function () {
            console.log("Leave Room " + _this.groupName);
            _this.groupName = null;
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_signalr__["c" /* SignalR */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_signalr__["c" /* SignalR */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_signalr__ = __webpack_require__("../../../../ng2-signalr/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* unused harmony export createConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





function createConfig() {
    var c = new __WEBPACK_IMPORTED_MODULE_2_ng2_signalr__["a" /* SignalRConfiguration */]();
    c.hubName = 'ChatHub';
    c.qs = { user: 'donald' };
    c.url = 'http://localhost:2162';
    // c.logging = true;
    return c;
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ng2_signalr__["b" /* SignalRModule */].forRoot(createConfig)
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map