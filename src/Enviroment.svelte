<script>
    import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js'
    import Btn from './SVUG-Btn.svelte'
    import Slider from './SVUG-Slider.svelte'
    import { tweened } from 'svelte/motion'

    let scrnUpVal = ''
    let scrnDownVal = ''
    let lightVal = 80
    let publishVal = 0
    let min = 0
    let max = 100
    let pub = false
    const tweenVal = tweened(0, {
		duration: 500
    });
    
    //convert user friendly slider values to full range Crestron analog join
    $:{
        let OldRange = (max- min)
        if(pub) publishVal = (((lightVal - min) * 65535) / OldRange)
    }

    //Enviroment subscriptions
    $: CrComLib.publishEvent('b', '7', scrnUpVal)
    $: CrComLib.publishEvent('b', '8', scrnDownVal)

    //light subscription and publish
    CrComLib.subscribeState('n', '2', (data)=>{
        //convert full range Crestron Analog Join to user values
        pub = false
        tweenVal.set((data * max) / 65535)
    })
    $: lightVal = $tweenVal 
    $: CrComLib.publishEvent('n', '2', publishVal)

</script>

<div id='enviroment'>
    <div id="screen">
        Screen
        <Btn class='boxed' bind:value={scrnUpVal}><img src="images/arrow-up.svg"></Btn>
        <Btn class='boxed' bind:value={scrnDownVal}><img src="images/arrow-down.svg"></Btn>
    </div>
    <div id="lights">
        Lights
        <Slider class='light' type='vert' bind:value={lightVal} min={min} max={max} on:clicked={()=>pub=true}></Slider>
    </div>
</div>

<style>
	#enviroment {
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(auto-fill, 50%);
		grid-auto-flow: column;
		width: 100%;
		height: 100%;
		font-family: arial;
	}

	#screen {
		display: grid;
		gap: 0.5em;
		grid-template-rows: 1em min-content min-content;
		grid-auto-flow: row;
		align-items: center;
		justify-items: center;
    	justify-content: center;
    	align-content: center;
		color: #b7b5b3;
	}

	#lights {
		display: grid;
		gap: 1em;
		grid-template-rows: 1em 0.8fr;
		grid-auto-flow: row;
		justify-items: center;
		align-content: center;
		color: #b7b5b3;
	}
</style>