<script>
    import CrComLib from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib.js'
    import Btn from './SVUG-Btn.svelte'
    import Slider from './SVUG-Slider.svelte'
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

</script>

<div class='wrap'>
    <div class='wrap-input'>
        <input>
        <Btn>X</Btn>
    </div>
    <div class='wrap-sub'>
        <div class='dpad-wrap' in:fly={transInDpad} out:fly={transOutDpad}>
            <div class='dpad'>
                <Btn class='dpad-btn up' bind:value={vtcUp}><img src="images/arrow-up.svg"></Btn>
                <Btn class='dpad-btn right' bind:value={vtcRight}><img src="images/arrow-right.svg"></Btn>
                <Btn class='dpad-btn left' bind:value={vtcLeft}><img src="images/arrow-left.svg"></Btn>
                <Btn class='dpad-btn down' bind:value={vtcDown}><img src="images/arrow-down.svg"></Btn>
            </div>
            <Btn class='dpad-btn center' bind:value={vtcEnter}></Btn>
        </div>
        <div class='controls-wrap' in:fly={transInCtrls} out:fly={transOutCtrls}>
            <div class='mute-wrap'>
                <Btn>Audio Mute</Btn>
                <Btn>Video Mute</Btn>
            </div>
            <Btn>Share</Btn>
            <Btn>Connect</Btn>
        </div>
        <Slider type='vert'></Slider>
    </div>
</div>

<style>
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
        background-color: grey;
        color: white
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