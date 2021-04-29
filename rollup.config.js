import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from "rollup-plugin-terser";
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		json(),
		production && replace({
			'eruda': ``,
			exclude: 'node_modules/**',
			delimiters: ['import * as eruda from \'', '\'']
		}),
		production && replace({
			'eruda': ``,
			exclude: 'node_modules/**',
			delimiters: ['', '.init()']
		}),
		css({ output: 'bundle.css' }),
		resolve({ browser: true }),
		commonjs(),

		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
