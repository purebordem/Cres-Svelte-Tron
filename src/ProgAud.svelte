<script>
    import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js'
    import Btn from './SVUG-Btn.svelte'
    import Slider from './SVUG-Slider.svelte'
    import { tweened } from 'svelte/motion'

    //move all the GUI logic for program audio to the front-end and away from SIMPL (because we can)
    let progVal = 0
    let muteVal
    let min = 0
    let max = 100
    let mute = false
    let showHint
    let hintTimer
    let repeat = 20
    let publishVal = 0
    let pub = false
    const tweenedVal = tweened(0,{
        duration: 500
    })

    function Volume(state){
        pub = true
        if(mute) Mute(false)

        if(state) progVal = progVal + 1
        else progVal = progVal - 1
    }

    function SlideClicked(){
        pub = true
        if(mute){
            muteVal = progVal
            Mute(false)
        }
    }

    function ShowHint(){
        showHint = true
        clearTimeout(hintTimer)
        hintTimer = setTimeout(()=>{
            showHint = false
        }, 2500)
    }

    function Mute(state){
        pub = true
        if(state){
            mute = true
            muteVal = progVal
            progVal = min
        }
        else {
            mute = false
            progVal = muteVal
        }
    }

    //convert user friendly slider values to full range Crestron analog join
    $:{
        let OldRange = max - min 
        if(pub) publishVal = (((progVal - min) * 65535) / OldRange)
    }

    //audio subscription and publish
    CrComLib.subscribeState('n', '1', (data)=>{
        //convert full range Crestron Analog Join to user values
        pub = false
        tweenedVal.set((data * max) / 65535)
    })
    
    $: progVal = $tweenedVal
    $: CrComLib.publishEvent('n', '1', publishVal)

</script>

<div id='progAudio'>
    <Btn class='btnAud mute' type='toggle' value={mute} on:high={()=>{Mute(true)}} on:low={()=>{Mute(false)}}>Mute</Btn>
    <Btn class='btnAud txt-large' holdDelay='500' on:high={()=>{Volume(false)}} on:holdRep={()=>Volume(false)} holdRepeat={repeat}>-</Btn>
    <Slider class='slide' type='horiz' bind:value={progVal} min={min} max={max} on:change={()=>{ShowHint()}} on:clicked={()=>{SlideClicked()}}>
        <div class='handle'>
            <div class='hint' class:showHint={showHint} class:hideHint={!showHint}>
                {progVal}
            </div>
        </div>
    </Slider>
    <Btn class='btnAud txt-large' on:high={()=>{Volume(true)}} holdDelay='500' on:holdRep={()=>Volume(true)} holdRepeat={repeat}>+</Btn>
</div>

<style>
    .handle{
        width:15px;
        height:30px;
        background-color: white;
        border-radius: 25%;
    }

    .hint {
        position: absolute;
        top: -40px;
        background-color: #233867;
        padding: 8px;
        border-radius: 25%;
        -webkit-box-shadow: 0px 10px 18px 0px rgba(0,0,0,0.3);
        -moz-box-shadow: 0px 10px 18px 0px rgba(0,0,0,0.3);
        box-shadow: 0px 10px 18px 0px rgba(0,0,0,0.3);
        font-family: Arial, Helvetica, sans-serif;
    }

    .hideHint {
        opacity: 0;
        transition: opacity 1s;
    }
    .showHint {
        opacity: 1;
        transition: opacity 0s;
    }

    :global(.txt-large){
		font-size: xxx-large;
	}

	#progAudio {
		display: grid;
		grid-auto-columns: 8% 5% 1fr 5%;
		grid-auto-flow: column;
		align-items: center;
		gap: 1em;
		height: 100%;
	}

    /* Aud Btn */
	:global(.btnAud){
		height: 100%;
		background-color: rgba(0,0,0,0);
		border: none;
		color: white;
		font-size: larger;
	}

	:global(.btnAud.true){
		text-shadow: 0px 0px 10px rgba(255, 255, 255, 1);
	}

    	/*Slider*/
	:global(.slide) {
	}

	:global(.slide > svg .bar){
	}

	:global(.slide > svg .prog){
		stroke: #ff3e00;
	}

	:global(.slide > svg .handle){
		stroke-linecap: round;
		stroke: var(--color-main)
	}

    /*Mute Btn*/
    :global(.mute.true){
        color: red;
        text-shadow: 0px 0px 10px rgba(255, 0, 0, 1);
    }
</style>