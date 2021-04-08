import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import styles from 'rollup-plugin-styles';

export default {
    input: 'src/index.js', // Path relative to package.json
    output: {
        name: 'Slate',
        exports: 'named',
    },
    plugins: [
        commonjs(),
        styles(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
    ],
};