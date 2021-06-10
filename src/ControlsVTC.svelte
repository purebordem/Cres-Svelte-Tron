<script>
    import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js'
    import Btn from './SVUG-Btn.svelte'
    //quick easy animations when component created/destoryed
    import { fly } from 'svelte/transition'

    let transInDpad = {delay: 200, x: -300, duration: 200 }
    let transOutDpad = {x:300, duration: 200}
    let transInCtrls = {delay: 200, x: 300, duration: 200 }
    let transOutCtrls = {x:-300, duration: 200}

    let vtcUp = false
    let vtcDown = false
    let vtcLeft = false
    let vtcRight = false
    let vtcEnter = false

    let address = ''

    $: CrComLib.publishEvent('s', '1', address)

</script>

<div class='wrap'>
    <div class='wrap-input'>
        <input bind:value={address}>
        <Btn class='vtc-btn vtc-end'>X</Btn>
    </div>
    <div class='wrap-sub'>
        <div class='dpad-wrap' in:fly={transInDpad} out:fly={transOutDpad}>
            <div class='dpad'>
                <!-- 
                    because we used :global for dpad-btn we can borrow those classes from ControlsBlu
                    Probably not a good idea long term, but we can do it
                -->
                <Btn class='dpad-btn up' bind:value={vtcUp}><img src="images/arrow-up.svg"></Btn>
                <Btn class='dpad-btn right' bind:value={vtcRight}><img src="images/arrow-right.svg"></Btn>
                <Btn class='dpad-btn left' bind:value={vtcLeft}><img src="images/arrow-left.svg"></Btn>
                <Btn class='dpad-btn down' bind:value={vtcDown}><img src="images/arrow-down.svg"></Btn>
            </div>
            <Btn class='dpad-btn center' bind:value={vtcEnter}></Btn>
        </div>
        <div class='controls-wrap' in:fly={transInCtrls} out:fly={transOutCtrls}>
            <div class='mute-wrap'>
                <Btn class='vtc-btn vtc-reg' type='toggle'>Audio Mute</Btn>
                <Btn class='vtc-btn vtc-reg' type='toggle'>Video Mute</Btn>
            </div>
            <Btn class='vtc-btn vtc-reg' type='toggle'>Share</Btn>
            <Btn class='vtc-btn vtc-reg'>Connect</Btn>
        </div>
    </div>
</div>

<style>
    :global(.vtc-btn){
        border-style: none;
        color: white;
        border-radius: 10px;
        -webkit-box-shadow: 0px 17px 6px -7px rgba(0,0,0,0.15); 
        box-shadow: 0px 17px 6px -7px rgba(0,0,0,0.15);
    }
    :global(.vtc-reg.true) {
		background-color: var(--color-highlight-1);
	}
	:global(.vtc-reg.false) {
		background-color: var(--color-highlight-2);
	}
    :global(.vtc-end.true) {
		background-color: var(--color-highlight-2);
	}
	:global(.vtc-end.false) {
		background-color: var(--color-highlight-1);
	}

    .wrap {
        display: grid;
        grid-template-rows: 20% 80%;
        gap: 1em;
        width: 75%;
        --btn: rgba(63, 62, 72, 1)
    }
    .wrap-sub{
        display: grid;
        grid-template-columns: 50% 50%;
        align-items: center;
        justify-items: center;
        gap: 1em;
    }
    .wrap-input{
        display: grid;
        grid-template-columns: 1fr 10%;
        gap: 1em;
    }
    input {
        width: 100%;
        height: 100%;
        font-size: 100%;
        border: none;
        border-radius: 10px;
        background-color: #e2e2e2;
        color: #5d5d5d;
        font-size: xx-large;
        text-indent: 10px;
        -webkit-box-shadow: inset 0px 4px 6px 2px rgba(0,0,0,0.51); 
        box-shadow: inset 0px 4px 6px 2px rgba(0,0,0,0.51);
    }
    .controls-wrap {
        display: grid;
        gap: 1em;
        justify-self: baseline;
        height: 100%;
    }
    .mute-wrap {
        display: grid;
        grid-auto-flow: column;
        justify-items: center;
        gap: 1em;
    }
    .dpad-wrap{
        position: relative;
    }
    .dpad {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 5px;
        padding: 0;
        width: 205px;
        height: 205px;
        border: 1px;
        border-radius: 50%;
        overflow: hidden;
        transform: rotate(45deg);
    }
</style>