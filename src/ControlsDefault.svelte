<script>
    //quick easy animations when component created/destoryed
    import { fly } from 'svelte/transition'

    let transIn = {delay: 200, y: 100, duration: 200 }
    let transOut = {y:-100, duration: 200}
</script>

<div in:fly={transIn} out:fly={transOut}>
    <img src="images/ch5-logo.svg" class='logo'>
    <img src="images/plus.svg" class='logo math'>
    <img src="images/svelte-logo.svg" class='logo'>
    <img src="images/equal.svg" class='logo math'>
    <img src="images/heart.svg" class='logo'>
</div>

<style>
    div {
		display: grid;
		gap: 1em;
		grid-template-columns: minmax(0,90%);
		grid-auto-flow: column;
		justify-items: center;
		align-items: center;
	}

    @media screen and (max-aspect-ratio:1/1){
		img {
			width: 40%;
		}
		.math {
			width: 15%;
		}
	}

    .logo {
		width: 100%;
	}

	.math {
		width: 50%;
	}
</style>