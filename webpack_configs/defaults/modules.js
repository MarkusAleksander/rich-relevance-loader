/* eslint-disable no-undef */
// * Custom JSON parsers
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

// *** MODULES ***//

const HTML_module = {
    test: /\.html$/i,
    loader: 'html-loader',
};

// * JS
const JS_module = {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: ['babel-loader']
};

// * Typescript
const TS_module = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
};

// * Images
const image_module = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
};

// * svgs
const svg_module = {
    test: /\.svg?$/,
    type: 'asset/inline',
}

// * Fonts
const font_module = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
};

// * CSV/TSV config
const CSVTSV_module = {
    test: /\.(csv|tsv)$/i,
    use: ['csv-loader'],
};

// * XML config
const XML_module = {
    test: /\.xml$/i,
    use: ['xml-loader'],
};

// * TOML config
const TOML_module = {
    test: /\.toml$/i,
    type: 'json',
    parser: {
        parse: toml.parse,
    },
};

// * YAML config
const YAML_module = {
    test: /\.yaml$/i,
    type: 'json',
    parser: {
        parse: yaml.parse,
    },
};

// * JSON5 config
const JSON5_module = {
    test: /\.json5$/i,
    type: 'json',
    parser: {
        parse: json5.parse,
    },
};

// * module config
const modules_config = {
    rules: [
        HTML_module,
        JS_module,
        TS_module,
        image_module,
        svg_module,
        font_module,
        CSVTSV_module,
        XML_module,
        TOML_module,
        YAML_module,
        JSON5_module,
    ],
};

module.exports = modules_config;