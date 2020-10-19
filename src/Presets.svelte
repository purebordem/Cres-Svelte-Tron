<script>
    import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js'

    //Import the Store so we can share data back and forth
    import { presetShow } from './AppState.js'
	import Btn from './SVUG-Btn.svelte'

    let pres1Val = ''
	let pres2Val = ''
	let pres3Val = ''
    let pres4Val = ''

	//Preset subscriptions and publish
	CrComLib.subscribeState('b', '9', (data)=>pres1Val = data)
	CrComLib.subscribeState('b', '10', (data)=>pres2Val = data)
	CrComLib.subscribeState('b', '11', (data)=>pres3Val = data)
    CrComLib.subscribeState('b', '12', (data)=>pres4Val = data)
    
    $: CrComLib.publishEvent('b', '9', pres1Val)
	$: CrComLib.publishEvent('b', '10', pres2Val)
	$: CrComLib.publishEvent('b', '11', pres3Val)
	$: CrComLib.publishEvent('b', '12', pres4Val)
</script>

<!-- Note the special $ syntax on the variable, this only works with stores -->
<div id="presets" class:showPresets={$presetShow} class:hidePresets={!$presetShow}>
    <Btn class='preset' type='lock-high' bind:value={pres1Val}>Preset 1</Btn>
    <Btn class='preset' type='lock-high' bind:value={pres2Val}>Preset 2</Btn>
    <Btn class='preset' type='lock-high' bind:value={pres3Val}>Preset 3</Btn>
    <Btn class='preset' type='lock-high' bind:value={pres4Val}>Preset 4</Btn>
</div>

<style>
	#presets {
		position: absolute;
		background-color: #233867;
		width: 100%;
		display: grid;
		grid-auto-flow: row;
		grid-auto-rows: 4em;
	}

	.hidePresets {
		bottom: -1000px;
		transition: bottom 1s;
	}

	.showPresets {
		bottom: 0;
		transition: bottom 0.5s;
	}
</style>