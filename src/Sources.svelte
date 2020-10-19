<script>
    //NOTE even though we are calling CrComLib in more than one file, RollUp will only include it once for us
    //also notice we didn't need to attach CrComLib to the window a second time like we had to in the main App.svelte
    import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js'
    import Btn from './SVUG-Btn.svelte'

    let laptopVal = ''
    let desktopVal = ''
    let bluVal = ''
    let vtcVal = ''

    //source subscriptions and publish
    CrComLib.subscribeState('b', '3', (data)=>laptopVal = data)
    CrComLib.subscribeState('b', '4', (data)=>desktopVal = data)
    CrComLib.subscribeState('b', '5', (data)=>bluVal = data)
    CrComLib.subscribeState('b', '6', (data)=>vtcVal = data)
        
    $: CrComLib.publishEvent('b', '3', laptopVal)
    $: CrComLib.publishEvent('b', '4', desktopVal)
    $: CrComLib.publishEvent('b', '5', bluVal)
    $: CrComLib.publishEvent('b', '6', vtcVal)

</script>

<div>
    <Btn class='stnd' type='lock-high' bind:value={laptopVal}><img src="images/laptop.svg">Laptop</Btn>
    <Btn class='stnd' type='lock-high' bind:value={desktopVal}><img src="images/desktop.svg">Desktop</Btn>
    <Btn class='stnd' type='lock-high' bind:value={bluVal}><img src="images/blu-ray.svg">Blu-Ray</Btn>
    <Btn class='stnd' type='lock-high' bind:value={vtcVal}><img src="images/vtc.svg">VTC</Btn>
</div>

<style>
    /* Styles are scoped to the component so we can re-use the 'div' selector across files*/ 
    /* This means this 'div' selector only effects divs in this component*/
	div {
		display: grid;
		gap: 1em;
		grid-template-rows: repeat(auto-fill, 3em);
		grid-auto-flow: row;
		width: 100%;
		height: 100%;
	}
</style>