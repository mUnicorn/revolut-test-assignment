import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "babel-polyfill";

configure({adapter: new Adapter()});
global.React = require("react");
global.PropTypes = require("prop-types");

global.fetch = jest.fn(() => Promise.resolve({
    json: () => ({}),
}));
