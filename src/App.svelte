<script>
	//import a library like CH5 CrComLib or the WebXpanel
	//Note WebXPanel MUST be loaded first per Crestron if used
	import * as WebXPanel from '@crestron/ch5-webxpanel/dist/cjs/index.js'
	import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib'

	//attach required CrComLib functions so Svelte can communicate with CH5
	window.CrComLib = CrComLib
	window.bridgeReceiveIntegerFromNative = CrComLib.bridgeReceiveIntegerFromNative
	window.bridgeReceiveBooleanFromNative = CrComLib.bridgeReceiveBooleanFromNative
	window.bridgeReceiveStringFromNative = CrComLib.bridgeReceiveStringFromNative
	window.bridgeReceiveObjectFromNative = CrComLib.bridgeReceiveObjectFromNative

	//xpanel configuration options
	const configuration = { 
		host: '', // XXX.XXX.XXX.XXX defaults to window.location.host 
		ipId: '0x04', // string representing a hex value. Might contain "0x" or not. Defaults to "0x03" 
		//see https://www.npmjs.com/package/@crestron/ch5-webxpanel for more details
	}

	//if running as an xpanel, launch service
	if (WebXPanel.isActive){ 
		WebXPanel.default.initialize(configuration)
	}

	//eruda creates a mimic of Chrome Dev Tools on mobile/touch panels, this is automatically 
	//removed if you use 'npm run ch5-build' or do not build for Dev
	import * as eruda from 'eruda'
	eruda.init()

	//import a svelte compontent from another file
	import Btn from './SVUG-Btn.svelte'
	import Attributes from './Attributes.svelte'
	import ProgAud from './ProgAud.svelte'
	import Sources from './Sources.svelte'
	import Enviroment from './Enviroment.svelte'
	import Presets from './Presets.svelte'
	import ControlsDefault from './ControlsDefault.svelte'
	import ControlsBlu from './ControlsBlu.svelte'
	import ControlsVTC from './ControlsVTC.svelte'

	//import a Store to allow sharing of variables across components
	import { presetShow } from './AppStore.js'

	//these variables are accessible to the JS and HTML inside this file, don't worry about the odd
	//use of 'let', it is how Svelte handles variables for compiling
	let popup = false
	let pwrVal = ''
	let controls = ControlsDefault

	//Subcribe to listen for join feedback from the control system
	CrComLib.subscribeState('b', '1', (data)=>{
		pwrVal = data
	})
	CrComLib.subscribeState('n', '3', (data)=>{
		if(data == 3) controls = ControlsBlu
		else if(data == 4) controls = ControlsVTC
		else controls = ControlsDefault
	})

	//the $: makes this a reactive statement so whenever a value changes, the function is automatically called
	$: CrComLib.publishEvent('b', '1', pwrVal)
	$: CrComLib.publishEvent('b', '2', !pwrVal)

	//progmatically set the Store value
	$:if(!pwrVal){
		presetShow.set(false)
	}

</script>

<!--Add your HTML or Custom Conmponents here-->
<Attributes bind:value={popup}></Attributes>
<div id="main">
	<div id='nav'>
		<Btn class='pwr' type='toggle' bind:value={pwrVal}><img src="images/power.svg">
			{#if pwrVal}
				<p>System On</p>
			{:else}
				<p>System Off</p>
			{/if}
		</Btn>
		<Sources></Sources>
		<Enviroment></Enviroment>
		<Presets></Presets>
	</div>
	<!-- 
		We can dynamically replace a component using the special svelte:component
		Changing the value of Controls will destory the current component and create the new one
	-->
	<svelte:component this={controls}/>
</div>
<div id="footer">
	<!-- 
		Note the special $ syntax on the variable, this only works with stores
		The Set method is not required here and the value is automatically fetched for rendering
	-->
	<Btn class='presetSel' type='toggle' bind:value={$presetShow}>Presets</Btn>
	<ProgAud></ProgAud>
	<button id="popupButton" on:click={()=>popup=!popup}><img src="images/gear.svg"></button>
</div>

<!--
	Add your styles here *NOTE* Styling can also be done inside the component
	The ':global()' selector is special to Svelte and allows those styles to be accessible from any component/svelte file
	This is used to style the custom 'Btn' and 'Slider' components for technical reasons
-->
<style>

	:global(html){
		overflow:hidden;
  		touch-action: manipulation;
		transform: translateZ(0);
	}
	:root {
		--color-main: rgba(255, 252, 248, 1);
		--color-contrast: rgba(43, 37, 34, 1);
		--color-icon-def: rgba(128, 128, 128, 1);
		--color-highlight-1: rgba(255, 62, 0, 1);
		--color-highlight-2: rgba(58, 171, 255, 1);
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
		overflow: hidden;
	}

	#main {
		display: grid;
		gap: 1em;
		grid-template-columns: 15% 1fr 1em;
		grid-auto-flow: column;
		justify-items: center;
		align-items: center;
	}

	#footer{
		display: grid;
		grid-auto-columns: 15% 1fr 5%;
		gap: 1em;
		grid-auto-flow: column;
		align-items: center;
		background-color: var(--color-contrast);
		color: #cecece;
		z-index: 1;
	}

	#popupButton {
		display: flex;
		align-items: center;
		margin-right: 10px;
		background-color: rgba(0,0,0,0);
		color: inherit;
		border: none;
	}

	#popupButton > img {
		width: 3em;
	}

	#nav {
		position: relative;
		display: grid;
		gap: 1.5em;
		grid-template-rows: 10% 1fr 30%;
		grid-auto-flow: row;
		width: 100%;
		height: 100%;
		background-color: #3f3e48;
	}

	@media screen and (max-aspect-ratio:1/1){
		#main {
			grid-auto-flow: row;
		}
	}

	/* Stnd Btn */
	:global(.stnd) {
		display: flex;
		justify-content: start;
		align-items: center;
		border-style: none;
		font-size: 1em;
	}

	:global(.stnd img){
		filter: invert(0.5);
		width: 3em;
		margin-right: 1em;
	}

	:global(.stnd.true img){
		filter: invert(1);
	}

	:global(.stnd.true) {
		color: var(--color-main);
		background-color: var(--color-highlight);
		border-color: var(--color-highlight);;
	}

	:global(.stnd.false) {
		color: #b7b5b3;
		background-color: rgba(201, 212, 217, 0);
	}

	/* Boxed Btn */
	:global(.boxed) {
		display: flex;
		justify-content: start;
		align-items: center;
		border-style: none;
		font-size: 1em;
	}

	:global(.boxed img){
		filter: invert(0.5);
		border: solid;
    	padding: 0.5em;
    	border-radius: 25%;
		width: 3em;
	}

	:global(.boxed.true img){
		filter: invert(1);
		border-color: black;
	}

	:global(.boxed.true) {
		color: var(--color-main);
		background-color: var(--color-highlight);
		border-color: var(--color-highlight);;
	}

	:global(.boxed.false) {
		color: #b7b5b3;
		background-color: rgba(201, 212, 217, 0);
	}

	/* Pwr Btn */
	:global(.pwr) {
		display: flex;
		justify-content: start;
		align-items: center;
		border-style: none;
		font-size: 1em;
	}

	:global(.pwr img){
		filter: invert(0.5);
		width: 3em;
		margin-right: 1em;
	}

	:global(.pwr.true img){
		filter: invert(1);
	}

	:global(.pwr.true) {
		color: var(--color-main);
		background-color: var(--color-highlight);
		border-color: var(--color-highlight);;
	}

	:global(.pwr.false) {
		color: #b7b5b3;
		background-color: rgba(201, 212, 217, 0);
	}

	:global(.pwr.true img){
		filter: invert(.5) sepia(1) saturate(5) hue-rotate(175deg)
	}

	/* presetSel Btn */
	:global(.presetSel) {
		justify-self: center;
		width: 85%;
		height: 70%;
		border-style: solid;
	}

	:global(.presetSel.true) {
		color: var(--color-main);
		background-color: var(--color-highlight);
		border-color: var(--color-highlight);
	}

	:global(.presetSel.false) {
		color: #b7b5b3;
		background-color: rgba(201, 212, 217, 0);
		border-color: #b7b5b3;
	}

	/* Preset Btn */
	:global(.preset) {
		display: flex;
		justify-content: start;
		align-items: center;
		border-style: none;
		font-size: 1em;
	}

	:global(.preset.true) {
		color: var(--color-main);
		background-color: #196998;
	}

	:global(.preset.false) {
		color: #b7b5b3;
		background-color: rgba(201, 212, 217, 0);
	}

	/*Light Slider*/
	:global(.light) {
	}

	:global(.light > svg .bar){
		stroke-width: 3;
	}

	:global(.light > svg .prog){
		stroke: #b7b5b3;
		stroke-width: 3;
	}

	:global(.light > svg .handle){
		stroke-linecap: round;
		stroke: var(--color-main)
	}

	:global(.light > svg .clickable){
		stroke-width: 3.1
	}
</style>