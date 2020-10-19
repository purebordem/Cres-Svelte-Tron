<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let type = 'momentary'
	export let value = false
	export let hovering = false
	export let holdDelay = 0
	export let holdRepeat = 50
	export {styleType as class} 
	
	let styleType = 'svug-btn'
	let timer
	let interval

	$: if(value){
		dispatch('high', true)
	} else dispatch('low', true)

	$: if(hovering){
		dispatch('hovering', true)
		dispatch('enter', true)
	} else {
		dispatch('hovering', false)
		dispatch('exit', true)
	}

	//hold detection
	function hold(){
		dispatch('hold', true)
		timer = setTimeout(()=>{
			dispatch('holdStart', true)
			interval = setInterval(()=>{dispatch('holdRep', true)}, holdRepeat)
		}, holdDelay)
	}

	function clearHold(){
		clearTimeout(timer)
		clearInterval(interval)
		dispatch('holdEnd', true)
	}
	
	function buttonEvent(event){
		switch(event){
			case 'high':{
				if(type == 'momentary'){
					value = true
					break;
				}
				else if(type =='toggle'){
					value = !value
					break;
				}
				else if(type == 'lock-high'){
					value = true
					break;
				}
				else if(type == 'lock-low'){
					value = false
					break;
				}
			}
			case 'low':{
				if(type == 'momentary'){
					value = false;
					break;
				}
				else {
					break;
				}
			}
			case 'enter':{
				hovering = true;
				break;
			}
			case 'leave':{
				hovering = false;
				break;
			}
		}
	}
</script>

<button class={styleType}
	on:touchstart|preventDefault={()=>{buttonEvent('high'); hold(); dispatch('clicked', true)}}
	on:touchend|preventDefault={()=>{buttonEvent('low'); clearHold()}}	
	on:touchcancel|preventDefault={()=>{buttonEvent('low'); clearHold()}}		

	on:mousedown={()=>{buttonEvent('high'); hold(); dispatch('clicked', true)}}
	on:mouseup={()=>{buttonEvent('low'); clearHold()}}	
	on:mouseleave={()=>{buttonEvent('low'); clearHold()}}	

	on:mouseenter={()=>buttonEvent('enter')}
	on:mouseleave={()=> buttonEvent('leave')}

	class:true={value}
	class:false={!value}
	class:hover={hovering && !value}
>
	<slot></slot>
</button>

<style>
    button {
	}

	.true {
	}

	.false {
	}

	.hover {
	}
</style>