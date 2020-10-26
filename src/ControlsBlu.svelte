<script>
    import Btn from './SVUG-Btn.svelte'
    //quick easy animations when component created/destoryed
    import { fly } from 'svelte/transition'

    let transIn = {delay: 200, y: 100, duration: 200 }
    let transOut = {y:-100, duration: 200}
</script>

<div class='wrap' in:fly={transIn} out:fly={transOut}>
    <div class='dpad-wrap'>
        <div class='dpad'>
            <Btn class='dpad-btn up'><img src="images/arrow-up.svg"></Btn>
            <Btn class='dpad-btn right'><img src="images/arrow-right.svg"></Btn>
            <Btn class='dpad-btn left'><img src="images/arrow-left.svg"></Btn>
            <Btn class='dpad-btn down'><img src="images/arrow-down.svg"></Btn>
        </div>
        <Btn class='dpad-btn center'></Btn>
    </div>
    <div class='controls'>
        <div class='controls-sub'>
            <Btn class='blu'><img src="images/skip-rw.svg"></Btn>
            <Btn class='blu'><img src="images/rw.svg"></Btn>
            <Btn class='blu'><img src="images/play.svg"></Btn>
            <Btn class='blu'><img src="images/ffw.svg"></Btn>
            <Btn class='blu'><img src="images/skip-ffw.svg"></Btn>
        </div>
        <div class='controls-sub'>
            <Btn class='blu'><img src="images/stop.svg"></Btn>
            <Btn class='blu'><img src="images/menu.svg"></Btn>
            <Btn class='blu'><img src="images/eject.svg"></Btn>
        </div>
    </div>
</div>

<style>
    .wrap {
        display: grid;
        grid-template-rows: 50% 50%;
        align-items: center;
        justify-items: center;
        gap: 1em;
        --btn: rgba(63, 62, 72, 1)
    }
    .controls {
        display: grid;
        grid-template-rows: auto;
        grid-auto-flow: row;
        justify-items: center;
        gap: 1em;
        background-color: var(--btn);
        border-radius: 25px;
        padding: 1em;
    }
    .controls-sub {
        display: grid;
        grid-auto-columns: auto;
        grid-auto-flow: column;
        gap: 2em;
        margin-left: 12px;
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
    :global(.dpad-btn) {
        border-style: none;
        overflow: hidden;
    }

    :global(.dpad-btn img){
        filter: invert(0.5);
    	padding: 0.5em;
		width: 3em;
        transform: rotate(-45deg);
    }

    :global(.dpad-btn.true img){
        filter: invert(0.4) sepia(1) saturate(50);
    }

    :global(.up) {
        background: radial-gradient(ellipse at right bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 30%,var(--btn) 31%,var(--btn) 0%)
    }

    :global(.down) {
        background: radial-gradient(ellipse at left top,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 30%,var(--btn) 31%,var(--btn) 0%)
    }

    :global(.left) {
        background: radial-gradient(ellipse at right top,rgba(0,0,0,0) 0%,rgba(0,0,0,0) 30%,var(--btn) 31%,var(--btn) 0%)
    }

    :global(.right) {
        background: radial-gradient(ellipse at left bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 30%,var(--btn) 31%,var(--btn) 0%)
    }

    :global(.center) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--btn);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: inset 0px 0px 0px 5px var(--color-icon-def);
    }

    :global(.center.true){
        box-shadow: inset 0px 0px 0px 5px var(--color-highlight-1);
    }

    /* Blu Btn */
	:global(.blu) {
		display: flex;
		justify-content: start;
		align-items: center;
		border-style: none;
		font-size: 1em;
	}

	:global(.blu img){
		filter: invert(0.5);
		width: 3em;
	}

	:global(.blu.true img){
		filter: invert(.5) sepia(1) saturate(5) hue-rotate(175deg);
	}

	:global(.blu.true) {
		color: var(--color-main);
		background-color: var(--color-highlight);
		border-color: var(--color-highlight);;
	}

	:global(.blu.false) {
		color: #b7b5b3;
		background-color: rgba(201, 212, 217, 0);
	}
</style>