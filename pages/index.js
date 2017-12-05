"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const src_1 = require("../src");
const options = [
    'one', 'two', 'three'
];
exports.default = () => React.createElement("div", null,
    React.createElement("h1", null, "React Dropdown Demo"),
    React.createElement(src_1.default, { options: options }));
