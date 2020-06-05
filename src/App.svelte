<script>
	//import a library like CH5 CrComLib
	import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js'

	//eruda creates a mimic of Chrome Dev Tools on mobile/touch panels, this is automatically 
	//removed if you use 'npm run ch5-build' or 'node ch5-run --host XXX.XXX.XXX.XXX --dev'
	import * as eruda from 'eruda';
	eruda.init();

	//import a svelte compontent from another file
	import Attributes from './Attributes.svelte';

	//this variable is accessible to the JS and HTML inside this file, don't worry about the odd
	//use of 'let', it is how Svelte handles variables for compiling
	let popup = false;

</script>

<Attributes bind:value={popup}></Attributes>
<div id="main">
	<img src="images/ch5-logo.svg">
	<img src="images/plus.svg" class="math">
	<img src="images/svelte-logo.svg">
	<img src="images/equal.svg" class="math">
	<img src="images/heart.svg">
</div>

<div id="footer">
	<button on:click={()=>popup=!popup}><img src="images/gear.svg"></button>
</div>
<style>
	:root {
		--color-main: #fffcf8;
		--color-contrast: #2b2522;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 100vh;
		user-select: none;
		box-sizing: border-box;
		display: grid;
		grid-template-rows: 90%;
		background-color: var(--color-main);
	}

	#main {
		display:grid;
		gap: 1em;
		grid-template-columns: minmax(0,90%);
		grid-auto-flow: column;
		justify-items: center;
		align-items: center;
		padding: 25px;
	}

	#footer{
		display: flex;
		justify-content: flex-end;
		background-color: var(--color-contrast);
    	color: #cecece;
	}

	button {
		display: flex;
		align-items: center;
		margin-right: 10px;
		background-color: rgba(0,0,0,0);
		color: inherit;
		border: none;
	}

	button > img {
		width: 3em;
	}

	img {
		width: 100%;
	}

	.math {
		width: 50%;
	}

	@media screen and (max-aspect-ratio:1/1){
		#main {
			grid-auto-flow: row;
		}
		img {
			width: 40%;
		}
		.math {
			width: 15%;
		}
	}
</style>