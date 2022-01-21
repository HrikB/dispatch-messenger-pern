"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var type_graphql_1 = require("type-graphql");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createdAt = new Date();
        _this.updatedAt = new Date();
        return _this;
    }
    __decorate([
        (0, type_graphql_1.Field)(function () { return type_graphql_1.ID; }),
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return String; }),
        (0, typeorm_1.CreateDateColumn)({ type: "date" }),
        __metadata("design:type", Object)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return String; }),
        (0, typeorm_1.UpdateDateColumn)({ type: "date", onUpdate: new Date().toDateString() }),
        __metadata("design:type", Object)
    ], User.prototype, "updatedAt", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return String; }),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return String; }),
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return String; }),
        (0, typeorm_1.Column)({ unique: true, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return String; }),
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "profilePic", void 0);
    __decorate([
        (0, type_graphql_1.Field)(function () { return [String]; }),
        (0, typeorm_1.Column)("varchar", { array: true, default: [] }),
        __metadata("design:type", Array)
    ], User.prototype, "friendsList", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)(),
        (0, type_graphql_1.ObjectType)()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.default = User;
