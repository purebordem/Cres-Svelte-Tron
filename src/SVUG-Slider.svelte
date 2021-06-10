<script>
	import {onMount} from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	export let type = 'horiz'
	export let value = 70
	export let copy = 70
	export let inv = 30
	export let min = 0
	export let max = 100
	export let res = 2
	export {styleType as class}
	export let hovering = false

	let styleType = 'svug-slider';
	let position;
	let barDir;
	let progDir;
	let box;
	let boxWidth;
	let boxHeight;
	let bounds = 0;
	let offset = 0;
	let isClicked = false
	let slotWidth;
	let slotHeight;
	
	barDir = "M 0 0.5, l 1 0"
	$:progDir = "M 0 0.5, l " + offset + " 0"

	$:if(type){
		updatePosition()
	}
	
	$:min = parseFloat(min)
	$:max = parseFloat(max)

	$:offset = ((value - min) / (max - min));
	
	$:{
		offset
		updatePosition()
	}
	
	$:if(isClicked){
		dispatch('clicked', true)
	}
	$:{
		if(value < min) {value = min}
		else if(value > max) {value = max}
		else{value = roundTo(value, res)}
		
		dispatch('change', true)
		
		if(value == max){
			dispatch('max',true)
		}
		if(value == min){
			dispatch('min', true)
		}
	}

	$:copy = value
	$:inv = max - value
	
	$:if(hovering){
		dispatch('enter', true)
	} else dispatch('exit', true)
	
	function calc(mouse){
		if(mouse.__proto__.constructor.name == "TouchEvent"){
			mouse = mouse.touches[0]
		}

		if(isClicked){
			if(type == 'horiz') {
				position = mouse.clientX - bounds.left
				offset = position / (bounds.width)
			}
			else if(type == 'horiz-inv') {
				position = bounds.right - mouse.clientX
				offset = position / (bounds.width)
			}
			else if(type == 'vert'){
				position = bounds.bottom - mouse.clientY
				offset = position / (bounds.height)
			}
			else if(type == 'vert-inv'){
				position = mouse.clientY - bounds.top
				offset = position / (bounds.height)
			}
			
			if(offset < 0){
				offset = 0
				updatePosition()
			}
			if(offset > 1){
				offset = 1
				updatePosition()
			}
			value = ((offset * (max - min))) + min;
		}
	}

	function start(event){
		isClicked = true;
		bounds = box.getBoundingClientRect();
		calc(event);
	}
	
	function end(event){
		isClicked = false;
	}
	
	function roundTo(num, digits){
		let negative = false;
        if (digits === undefined) {
            digits = 0;
        }
        if( num < 0) {
            negative = true;
            num = num * -1;
        }

        let multiplicator = Math.pow(10, digits);
        num = parseFloat((num * multiplicator).toFixed(11));
        num = (Math.round(num) / multiplicator).toFixed(digits);
        
        if(negative){    
            num = (num * -1).toFixed(digits);
        }
        return parseFloat(num);
    }
	
	function updatePosition(){
		if(type == 'horiz' || type =='horiz-inv') {
			position = bounds.width * offset
		}
		else if(type == 'vert' || type == 'vert-inv'){
			position = bounds.height * offset
		}
	}
	
	onMount(()=>{
		bounds = box.getBoundingClientRect()
		updatePosition()
	})
	
</script>

<div 
	class={styleType}
	class:container={true} 
	bind:this={box}
	bind:clientWidth={boxWidth}
	bind:clientHeight={boxHeight}
	>
	

	<svg 
		class:horiz={type == 'horiz' ? true: false}
		class:horiz-inv={type == 'horiz-inv' ? true: false}
		class:vert={type == 'vert' ? true: false}
		class:vert-inv={type == 'vert-inv' ? true: false}
		class:hover={hovering}
		
		viewBox="0,0,1,1" preserveAspectRatio="none" height="10" width={type == 'vert' || type == 'vert-inv' ? boxHeight: '100%'}
		
		on:touchmove|preventDefault={calc}
		on:touchend|preventDefault={end}
		on:touchcancel|preventDefault={end}	

		on:mousemove={calc} 
		on:mouseup={end} 
		on:mouseleave={end} 
	>
    	<path class="bar" d={barDir}/>
		<path class="prog" d={progDir}/>
		<path class="clickable" pointer-events="stroke"
			on:touchstart|preventDefault={start}
			on:touchstart|preventDefault={()=>hovering = true}
			on:touchend|preventDefault={()=>hovering = false}
			on:touchcancel|preventDefault={()=>hovering = false}	

			on:mousedown={start} 
			on:mouseenter={()=>hovering = true} 
			on:mouseleave={()=>hovering = false} 

      		d={barDir}
     	/>
    </svg>
		<div 
		class='slotWrap' 
		style='--pos:{position}px; --slotW:{slotWidth}px; --slotH:{slotHeight}px'
		class:slotHoriz={type == 'horiz' ? true: false}
		class:slotHoriz-inv={type == 'horiz-inv' ? true: false}
		class:slotVert={type == 'vert' ? true: false}
		class:slotVert-inv={type == 'vert-inv' ? true: false} 
		bind:clientWidth={slotWidth}
		bind:clientHeight={slotHeight}
		>
			<slot></slot>
		</div>
</div>

<style>
	.container {
		width: inherit;
		height: inherit;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.slotWrap{
		position: absolute;
		pointer-events:none;
	}

	svg {
		overflow: visible;
		fill:none;
	} 

  .bar{
		stroke:#3f4e66;
		fill:none;
		stroke-width:1;
	}
	
	.prog{
		stroke: red;
		fill:none;
        stroke-width:1;
	}
	
	.clickable{
        fill:none;
        stroke-width:1.1;
	}

	.hover {	
	}
	
	.horiz{
	}
	
	.horiz-inv{
		transform: rotateY(180deg)
	}
	
	.vert{
		position: absolute;
		transform: rotate(-90deg);
		transform-origin: center;
	}
	
	.vert-inv {
		position: absolute;
		transform: rotate(90deg);
		transform-origin: center;
	}
	
	.slotHoriz{
		left: calc(var(--pos) - var(--slotH)/2);
	}
	
	.slotHoriz-inv{
		right: calc(var(--pos) - var(--slotH)/2);
		transform: rotateY(180deg)
	}
	
	.slotVert{
		bottom: var(--pos);
		transform: rotate(-90deg) translate(0px, calc(var(--slotH)/2));
		transform-origin: bottom;
	}
	
	.slotVert-inv {
		top: calc(var(--pos) - var(--slotH)/2);
		transform: rotate(90deg);
		transform-origin: center;
	}

</style>