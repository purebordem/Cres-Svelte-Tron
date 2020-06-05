<script>
    export let value = false;
</script>

<div class={value}>
    <div id="modal">
        <div id="modalContent">
            <p>Plus, Equal, and Gear icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
            <p>Heart icon made by <a href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
            <p>Back icon made by <a href="https://www.flaticon.com/authors/becris" title="Becris">Becris</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
        </div>
        <div id="modalFooter">
            <p>"At the end of the day, we are either trying to hear something, see something, or control something"</p>
            <div>
                <button on:click={()=>value=false}><img src="images/back.svg"></button>
            </div>
        </div>
    </div>
</div>

<style>
    .true{
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.3);
    }
    .false{
        display: none;
    }

    #modal {
        display: grid;
        grid-template-rows: 90% 10%;
        padding: 30px;
        width: 80%;
        height: 80%;
        background-color: var(--color-main);
        border-radius: 10px;
        font-family: monospace;
        text-align: center;
        color: var(--color-contrast);
    }

    #modalContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #modalFooter {
        display: grid;
        grid-template-columns: 1fr;
        justify-content: center;
        align-items: center;
        font-size: 0.75em;
        font-style: italic;
    }

    #modalFooter > div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    button {
		display: flex;
		align-items: center;
		margin-right: 10px;
		background-color: rgba(0,0,0,0);
		color: inherit;
		border: none;
    }

    button > img {
		width: 2em;
	}
</style>